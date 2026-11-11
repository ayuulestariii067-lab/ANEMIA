import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Pill, 
  Check, 
  Calendar, 
  Sparkles, 
  Moon, 
  AlertCircle, 
  Smile, 
  ShieldCheck 
} from 'lucide-react';
import { playSound } from '../utils/audio';

export const TTDTracker: React.FC = () => {
  const [completedWeeks, setCompletedWeeks] = useState<Record<number, boolean>>({
    1: true,
    2: true
  });
  const [notificationDay, setNotificationDay] = useState<string>('Jumat');

  const weeks = [
    { num: 1, label: 'Minggu 1', date: 'Jumat, W1' },
    { num: 2, label: 'Minggu 2', date: 'Jumat, W2' },
    { num: 3, label: 'Minggu 3', date: 'Jumat, W3' },
    { num: 4, label: 'Minggu 4', date: 'Jumat, W4' }
  ];

  const handleToggleWeek = (num: number) => {
    const isNowDone = !completedWeeks[num];
    if (isNowDone) {
      playSound('correct');
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.8 }
      });
    } else {
      playSound('pop');
    }

    setCompletedWeeks((prev) => ({
      ...prev,
      [num]: isNowDone
    }));
  };

  const doneCount = Object.values(completedWeeks).filter(Boolean).length;

  return (
    <section className="py-14 bg-rose-50/20 border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-rose-100 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Tracker & Check-in */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-600 mb-2">
                  <Pill className="w-4 h-4" />
                  <span>Program Kemenkes RI</span>
                  <span aria-hidden="true">·</span>
                  <span>1 Tablet Seminggu Sekali</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  Jurnal Tablet Tambah Darah (TTD)
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Konsisten minum 1 tablet TTD setiap minggu untuk menggantikan kehilangan zat besi saat menstruasi dan menjaga fokus belajarmu di sekolah.
                </p>
              </div>

              {/* Weekly Tracker Bubbles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {weeks.map((w) => {
                  const isDone = !!completedWeeks[w.num];
                  return (
                    <button
                      key={w.num}
                      onClick={() => handleToggleWeek(w.num)}
                      className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                        isDone
                          ? 'bg-rose-50 border-rose-400 text-rose-900 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${
                        isDone ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {isDone ? <Check className="w-4 h-4" /> : <Pill className="w-4 h-4" />}
                      </div>
                      <span className="text-xs font-bold block">{w.label}</span>
                      <span className="text-[10px] text-slate-500">
                        {isDone ? 'Sudah Minum' : 'Belum Minum'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Streak info */}
              <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-rose-600" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Kepatuhan Bulan Ini: {doneCount} / 4 Pekan
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {doneCount === 4
                        ? 'Hebat! Kamu memenuhi komitmen TTD bulan ini.'
                        : 'Yuk teruskan sampai lengkap 4 pekan berturut-turut!'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <select
                    value={notificationDay}
                    onChange={(e) => setNotificationDay(e.target.value)}
                    className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700 font-medium focus:outline-none"
                  >
                    <option value="Senin">Hari: Senin</option>
                    <option value="Rabu">Hari: Rabu</option>
                    <option value="Jumat">Hari: Jumat (Rekomendasi)</option>
                    <option value="Minggu">Hari: Minggu</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right: Smart Tips & FAQ */}
            <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Tips Cerdas Minum TTD Bebas Mual:</span>
              </h4>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <Moon className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Minum Sebelum Tidur:</strong> Minum TTD 30 menit setelah makan malam sebelum tidur malam. Jika ada rasa mual ringan, tubuh akan melewatinya saat kamu terlelap tidur.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Smile className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Gunakan Air Jeruk:</strong> Telan tablet dengan air perasan jeruk atau air putih dingin. Vitamin C membantu lambung menyerap mineral besi secara optimal.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Feses Berwarna Gelap?</strong> Jangan panik! Perubahan warna kotoran (BAB) menjadi agak kehitaman setelah minum TTD adalah hal yang sangat normal dan membuktikan sisa mineral besi sedang dibersihkan dari saluran usus.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
