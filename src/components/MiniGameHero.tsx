import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Trophy, Sparkles, Heart } from 'lucide-react';
import { playSound } from '../utils/audio';

interface Item {
  x: number;
  y: number;
  type: 'iron' | 'vitc' | 'tannin' | 'fatigue';
  radius: number;
  speed: number;
  label: string;
}

export const MiniGameHero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [highScore, setHighScore] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const playerYRef = useRef<number>(120);
  const targetYRef = useRef<number>(120);
  const scoreRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);

  // Sync refs
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const startGame = () => {
    playSound('victory');
    setScore(0);
    setTimeLeft(45);
    setGameOver(false);
    setIsPlaying(true);
    playerYRef.current = 120;
    targetYRef.current = 120;
  };

  // Timer countdown
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPlaying(false);
          setGameOver(true);
          playSound('victory');
          confetti({
            particleCount: 70,
            spread: 70,
            origin: { y: 0.6 }
          });
          if (scoreRef.current > highScore) {
            setHighScore(scoreRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, highScore]);

  // Main canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = canvas.width;
    const height = canvas.height;

    const items: Item[] = [];
    let spawnTimer = 0;

    const spawnItem = () => {
      const rand = Math.random();
      let type: Item['type'] = 'iron';
      let label = 'Fe';

      if (rand < 0.45) {
        type = 'iron';
        label = 'Fe²⁺';
      } else if (rand < 0.65) {
        type = 'vitc';
        label = 'Vit C';
      } else if (rand < 0.85) {
        type = 'tannin';
        label = 'Teh (Tanin)';
      } else {
        type = 'fatigue';
        label = '5L Lelah';
      }

      items.push({
        x: width + 20,
        y: 25 + Math.random() * (height - 50),
        type,
        radius: type === 'vitc' ? 14 : 16,
        speed: 2.2 + Math.random() * 1.5,
        label
      });
    };

    const render = () => {
      // Smooth player interpolation toward target
      playerYRef.current += (targetYRef.current - playerYRef.current) * 0.15;
      const playerY = Math.max(25, Math.min(height - 25, playerYRef.current));
      const playerX = 55;
      const playerR = 18;

      ctx.clearRect(0, 0, width, height);

      // Blood vessel gradient background
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#ffe4e6');
      grad.addColorStop(0.5, '#fff1f2');
      grad.addColorStop(1, '#ffe4e6');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Capillary boundary
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 3);
      ctx.lineTo(width, 3);
      ctx.moveTo(0, height - 3);
      ctx.lineTo(width, height - 3);
      ctx.stroke();

      if (isPlayingRef.current) {
        // Spawn items
        spawnTimer++;
        if (spawnTimer > 35) {
          spawnItem();
          spawnTimer = 0;
        }

        // Update and draw items
        for (let i = items.length - 1; i >= 0; i--) {
          const item = items[i];
          item.x -= item.speed;

          // Check collision with player
          const dist = Math.hypot(item.x - playerX, item.y - playerY);
          if (dist < item.radius + playerR) {
            // Collided!
            if (item.type === 'iron') {
              playSound('collect');
              setScore((s) => s + 20);
            } else if (item.type === 'vitc') {
              playSound('correct');
              setScore((s) => s + 35);
            } else if (item.type === 'tannin') {
              playSound('wrong');
              setScore((s) => Math.max(0, s - 15));
            } else if (item.type === 'fatigue') {
              playSound('wrong');
              setScore((s) => Math.max(0, s - 20));
            }
            items.splice(i, 1);
            continue;
          }

          // Remove offscreen
          if (item.x < -30) {
            items.splice(i, 1);
            continue;
          }

          // Draw item
          ctx.save();
          ctx.beginPath();
          ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);

          if (item.type === 'iron') {
            ctx.fillStyle = '#f59e0b';
            ctx.shadowColor = '#f59e0b';
            ctx.shadowBlur = 8;
          } else if (item.type === 'vitc') {
            ctx.fillStyle = '#10b981';
            ctx.shadowColor = '#10b981';
            ctx.shadowBlur = 8;
          } else if (item.type === 'tannin') {
            ctx.fillStyle = '#78350f';
          } else {
            ctx.fillStyle = '#64748b';
          }
          ctx.fill();

          // Item text
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 9px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(item.label, item.x, item.y);
          ctx.restore();
        }
      }

      // Draw Player: Ksatria Sel Darah Merah
      ctx.save();
      ctx.beginPath();
      ctx.arc(playerX, playerY, playerR, 0, Math.PI * 2);
      ctx.fillStyle = '#e11d48';
      ctx.shadowColor = '#be123c';
      ctx.shadowBlur = 10;
      ctx.fill();

      // Inner biconcave depression
      ctx.beginPath();
      ctx.arc(playerX, playerY, playerR * 0.45, 0, Math.PI * 2);
      ctx.fillStyle = '#9f1239';
      ctx.fill();

      // Cute face on blood cell
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(playerX - 5, playerY - 3, 2.5, 0, Math.PI * 2);
      ctx.arc(playerX + 5, playerY - 3, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Smile
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(playerX, playerY + 3, 4, 0.2, Math.PI - 0.2);
      ctx.stroke();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  // Handle touch/mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleY = canvas.height / rect.height;
    targetYRef.current = (e.clientY - rect.top) * scaleY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !e.touches[0]) return;
    const rect = canvas.getBoundingClientRect();
    const scaleY = canvas.height / rect.height;
    targetYRef.current = (e.touches[0].clientY - rect.top) * scaleY;
  };

  return (
    <section id="game" className="py-14 bg-white border-b border-rose-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-600 mb-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Mini-Game Arkade Interaktif</span>
            <span aria-hidden="true">·</span>
            <span>Ksatria Hemoglobin 45 Detik</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Bantu Sel Darah Tangkap Zat Besi & Hindari Penghambat!
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Gerakkan kursor/jarimu ke atas dan ke bawah: Tangkap <strong>Zat Besi (Fe²⁺)</strong> dan <strong>Vitamin C</strong>, jauhi <strong>Tanin Teh</strong> dan <strong>Monster 5L</strong>!
          </p>
        </div>

        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
          {/* Game Status Bar */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
              <span>Skor: <strong className="text-rose-600 text-sm tabular-nums">{score}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span>Sisa Waktu: <strong className="text-slate-900 text-sm tabular-nums">{timeLeft}s</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-600">
              <Trophy className="w-4 h-4" />
              <span>Rekor: <strong className="tabular-nums">{highScore}</strong></span>
            </div>
          </div>

          {/* Interactive Game Canvas */}
          <div className="relative rounded-2xl overflow-hidden border border-rose-200 shadow-inner bg-rose-50 cursor-ns-resize">
            <canvas
              ref={canvasRef}
              width={700}
              height={260}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="w-full h-[220px] sm:h-[260px] block"
            />

            {/* Overlay if not playing */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-white text-center">
                {gameOver ? (
                  <div className="space-y-3 max-w-sm">
                    <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold font-display">
                      Misi Selesai! Skor: {score}
                    </h3>
                    <p className="text-xs text-slate-200">
                      {score >= 250
                        ? 'Luar biasa! Kadar hemoglobinmu terisi penuh, tubuh bertenaga dan siap juara kelas!'
                        : 'Bagus! Coba lagi dan hindari tanin teh agar zat besimu tidak berkurang.'}
                    </p>
                    <button
                      onClick={startGame}
                      className="px-5 py-2.5 text-xs font-semibold text-white bg-rose-600 rounded-xl hover:bg-rose-700 transition-colors flex items-center gap-2 mx-auto cursor-pointer shadow-md"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Main Lagi</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 max-w-sm">
                    <div className="w-12 h-12 mx-auto rounded-full bg-rose-600/30 text-rose-300 flex items-center justify-center">
                      <Heart className="w-6 h-6 fill-rose-500" />
                    </div>
                    <h3 className="text-xl font-bold font-display">
                      Ksatria Hemoglobin
                    </h3>
                    <p className="text-xs text-slate-200">
                      Gerakkan sel darah merah dengan sentuhan atau kursor mouse. Kumpulkan sebanyak mungkin ion Fe dan Vitamin C dalam 45 detik!
                    </p>
                    <button
                      onClick={startGame}
                      className="px-6 py-2.5 text-xs font-semibold text-white bg-rose-600 rounded-xl hover:bg-rose-700 transition-colors flex items-center gap-2 mx-auto cursor-pointer shadow-md"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Mulai Main Sekarang</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Game Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] text-slate-600">
            <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200">
              <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0"></span>
              <span><strong>Zat Besi (Fe):</strong> +20 poin</span>
            </div>
            <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0"></span>
              <span><strong>Vitamin C:</strong> +35 poin booster</span>
            </div>
            <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200">
              <span className="w-3 h-3 rounded-full bg-amber-900 shrink-0"></span>
              <span><strong>Tanin Teh:</strong> -15 poin inhibitor</span>
            </div>
            <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200">
              <span className="w-3 h-3 rounded-full bg-slate-500 shrink-0"></span>
              <span><strong>Monster 5L:</strong> -20 poin lelah</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
