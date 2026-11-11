import React, { useState, useEffect, useRef } from 'react';
import { Activity, Zap, Brain, ShieldAlert, CheckCircle, Info } from 'lucide-react';
import { playSound } from '../utils/audio';

export const BloodSimulator: React.FC = () => {
  const [hbLevel, setHbLevel] = useState<number>(13.5);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Status computation
  const getStatus = (hb: number) => {
    if (hb >= 12.0) {
      return {
        label: 'Normal & Prima',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        badge: 'Kondisi Sehat',
        desc: 'Eritrosit normositik-normokromik (ukuran dan warna normal). Jumlah hemoglobin melimpah, sel darah merah mengikat oksigen secara penuh untuk dialirkan ke otak dan seluruh otot tubuh.',
        brainEffect: 'Konsentrasi tinggi, daya tangkap memori tajam, tidak mudah mengantuk saat pelajaran berlangsung.',
        muscleEffect: 'Stamina stabil, tidak gampang ngos-ngosan saat naik tangga atau pelajaran olahraga.',
        oxygenSat: Math.min(100, Math.round(95 + (hb - 12) * 1.5))
      };
    } else if (hb >= 11.0) {
      return {
        label: 'Anemia Ringan',
        color: 'text-amber-700 bg-amber-50 border-amber-200',
        badge: 'Perlu Perhatian',
        desc: 'Kadar hemoglobin mulai menurun di bawah ambang sehat. Jumlah molekul pembawa oksigen berkurang, tubuh mulai mengompensasi dengan memprioritaskan organ vital.',
        brainEffect: 'Mulai sering menguap di jam sekolah siang, butuh waktu lebih lama untuk memproses materi baru.',
        muscleEffect: 'Cepat merasa capek setelah aktivitas fisik ringan, stamina agak menurun.',
        oxygenSat: Math.round(85 + (hb - 11) * 9)
      };
    } else if (hb >= 8.0) {
      return {
        label: 'Anemia Sedang',
        color: 'text-orange-700 bg-orange-50 border-orange-200',
        badge: 'Gejala 5L Nyata',
        desc: 'Eritrosit mengalami mikrositik dan hipokromik (sel darah merah menciut dan pucat). Jaringan tubuh mulai kelaparan oksigen.',
        brainEffect: 'Sindrom Lalai: Sering bengong, sakit kepala berdenyut, pandangan berkunang-kunang saat bangkit berdiri mendadak.',
        muscleEffect: '5L lengkap: Lemah, Letih, Lesu, Lelah! Otot terasa pegal dan lunglai sepanjang hari.',
        oxygenSat: Math.round(68 + (hb - 8) * 5.5)
      };
    } else {
      return {
        label: 'Anemia Berat',
        color: 'text-rose-700 bg-rose-50 border-rose-200',
        badge: 'Bahaya Medis',
        desc: 'Kadar Hb sangat rendah (<8 g/dL). Jantung harus memompa ekstra cepat untuk mengalirkan sedikit oksigen yang tersisa. Sangat berisiko pingsan.',
        brainEffect: 'Sering pingsan (sinkop), pusing hebat, konsentrasi belajar drop drastis, bibir dan kuku membiru/sangat pucat.',
        muscleEffect: 'Napas terengah-engah bahkan saat istirahat santai, detak jantung berdebar kencang (palpitasi).',
        oxygenSat: Math.max(45, Math.round(50 + (hb - 7) * 15))
      };
    }
  };

  const status = getStatus(hbLevel);

  // Canvas animation of blood stream
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = canvas.width;
    const height = canvas.height;

    // Generate cells proportional to Hb
    // Normal ~ 35 cells, Anemia severe ~ 12 cells
    const cellCount = Math.floor(10 + (hbLevel - 7) * 3);
    const cells: {
      x: number;
      y: number;
      speed: number;
      radius: number;
      opacity: number;
      hasO2: boolean;
      o2Offset: number;
    }[] = [];

    for (let i = 0; i < cellCount; i++) {
      const radiusBase = hbLevel >= 12 ? 14 : hbLevel >= 10 ? 11 : 8.5;
      cells.push({
        x: Math.random() * width,
        y: 15 + Math.random() * (height - 30),
        speed: 0.8 + Math.random() * 1.4,
        radius: radiusBase + (Math.random() * 3 - 1.5),
        opacity: hbLevel >= 12 ? 0.95 : hbLevel >= 10 ? 0.75 : 0.45,
        hasO2: Math.random() < status.oxygenSat / 100,
        o2Offset: Math.random() * Math.PI * 2
      });
    }

    let time = 0;

    const render = () => {
      time += 0.05;
      ctx.clearRect(0, 0, width, height);

      // Background lumen gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#ffe4e6');
      bgGrad.addColorStop(0.5, '#fff1f2');
      bgGrad.addColorStop(1, '#ffe4e6');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Capillary wall borders
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 2);
      ctx.lineTo(width, 2);
      ctx.moveTo(0, height - 2);
      ctx.lineTo(width, height - 2);
      ctx.stroke();

      // Endothelial cell marks along edges
      ctx.fillStyle = 'rgba(244, 63, 94, 0.2)';
      for (let x = 0; x < width; x += 36) {
        ctx.beginPath();
        ctx.ellipse(x + 18, 5, 14, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(x + 18, height - 5, 14, 3, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw red blood cells
      cells.forEach((cell) => {
        cell.x += cell.speed;
        cell.y += Math.sin(time + cell.o2Offset) * 0.4;

        if (cell.x > width + cell.radius * 2) {
          cell.x = -cell.radius * 2;
          cell.y = 15 + Math.random() * (height - 30);
          cell.hasO2 = Math.random() < status.oxygenSat / 100;
        }

        // Cell color based on Hb
        ctx.save();
        ctx.translate(cell.x, cell.y);

        // Erythrocyte biconcave disk
        ctx.beginPath();
        ctx.arc(0, 0, cell.radius, 0, Math.PI * 2);
        if (hbLevel >= 12) {
          ctx.fillStyle = `rgba(225, 29, 72, ${cell.opacity})`;
        } else if (hbLevel >= 10) {
          ctx.fillStyle = `rgba(244, 63, 94, ${cell.opacity})`;
        } else {
          ctx.fillStyle = `rgba(251, 113, 133, ${cell.opacity})`;
        }
        ctx.fill();

        // Inner biconcave depression
        ctx.beginPath();
        ctx.arc(0, 0, cell.radius * 0.48, 0, Math.PI * 2);
        ctx.fillStyle =
          hbLevel >= 12
            ? 'rgba(190, 18, 60, 0.45)'
            : 'rgba(244, 63, 94, 0.25)';
        ctx.fill();

        // Draw Oxygen dots attached to cell if carrying O2
        if (cell.hasO2) {
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(-cell.radius * 0.35, -cell.radius * 0.3, 2.2, 0, Math.PI * 2);
          ctx.arc(cell.radius * 0.35, cell.radius * 0.3, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [hbLevel, status.oxygenSat]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setHbLevel(val);
    playSound('pop');
  };

  return (
    <section id="simulator" className="py-14 bg-white border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-600 mb-2">
            <Activity className="w-4 h-4" />
            <span>Laboratorium Interaktif</span>
            <span aria-hidden="true">·</span>
            <span>Simulasi Hemoglobin & Oksigen Tubuh</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Lihat Langsung: Apa yang Terjadi di Pembuluh Darahmu?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Geser slider kadar Hemoglobin (Hb) di bawah untuk mengamati perubahan ukuran sel darah merah (eritrosit) dan dampaknya terhadap pasokan oksigen ke otak serta energimu.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Canvas & Slider */}
          <div className="lg:col-span-7 bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Aliran Pembuluh Kapiler Darah
                </span>
                <p className="text-sm font-bold text-slate-900">
                  Visualisasi Sel Darah Merah & Molekul Oksigen (O₂)
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500">Saturasi O₂ Relatif</span>
                <p className="text-base font-bold text-sky-600 tabular-nums">
                  {status.oxygenSat}%
                </p>
              </div>
            </div>

            {/* Canvas viewport */}
            <div className="relative rounded-xl overflow-hidden border border-rose-200 shadow-inner bg-rose-50">
              <canvas
                ref={canvasRef}
                width={640}
                height={220}
                className="w-full h-[180px] sm:h-[220px] block"
              />
              <div className="absolute top-2 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-700 shadow-xs border border-rose-100 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-600 inline-block"></span>
                <span>Titik Biru = Molekul Oksigen (O₂)</span>
              </div>
              <div className="absolute bottom-2 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-700 shadow-xs border border-rose-100">
                Mikroskop Aliran Darah 400x
              </div>
            </div>

            {/* Slider Control Deck */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="hb-slider" className="text-sm font-bold text-slate-800">
                  Kadar Hemoglobin (Hb):
                </label>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-rose-600 font-display tabular-nums">
                    {hbLevel.toFixed(1)}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">g/dL</span>
                </div>
              </div>

              <input
                id="hb-slider"
                type="range"
                min="7.0"
                max="16.0"
                step="0.1"
                value={hbLevel}
                onChange={handleSliderChange}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600 focus:outline-none"
              />

              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>7.0 g/dL (Berat)</span>
                <span>10.0 g/dL (Sedang)</span>
                <span className="text-rose-600 font-semibold">12.0 g/dL (Batas Normal)</span>
                <span>16.0 g/dL (Optimal)</span>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setHbLevel(7.8);
                    playSound('pop');
                  }}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 cursor-pointer"
                >
                  Contoh Anemia Berat (7.8)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHbLevel(9.8);
                    playSound('pop');
                  }}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200 cursor-pointer"
                >
                  Contoh Anemia Sedang (9.8)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHbLevel(11.4);
                    playSound('pop');
                  }}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 cursor-pointer"
                >
                  Contoh Anemia Ringan (11.4)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHbLevel(13.8);
                    playSound('pop');
                  }}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 cursor-pointer"
                >
                  Contoh Normal Sehat (13.8)
                </button>
              </div>
            </div>
          </div>

          {/* Right: Biological Insights & Clinical Comparison Image */}
          <div className="lg:col-span-5 space-y-4">
            {/* Status card */}
            <div className={`p-5 rounded-2xl border ${status.color} space-y-3`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {hbLevel >= 12 ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <ShieldAlert className="w-5 h-5 text-rose-600" />
                  )}
                  <h3 className="text-lg font-bold font-display">{status.label}</h3>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white/80 border border-current">
                  {status.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">{status.desc}</p>
            </div>

            {/* Impact Breakdown Cards */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-sky-50 text-sky-600 shrink-0">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Dampak Pada Otak & Konsentrasi:
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">{status.brainEffect}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-600 shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Dampak Pada Otot & Stamina Fisik:
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">{status.muscleEffect}</p>
                </div>
              </div>
            </div>

            {/* Medical Reference Visual */}
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
              <img
                src="/src/assets/images/anemia_blood_cells_1794423879283.jpg"
                alt="Perbandingan medis sel darah merah normal vs anemia defisiensi besi mikrositik"
                className="w-full h-44 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-3 bg-white border-t border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Perhatikan Bedanya:</strong> Pada anemia defisiensi zat besi, sel darah merah mengecil (<em>mikrositosis</em>) dan berwarna lebih pucat (<em>hipokromia</em>) karena minimnya molekul hemoglobin pengikat oksigen.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
