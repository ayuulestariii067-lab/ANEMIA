import React, { useState } from 'react';
import { 
  Utensils, 
  Plus, 
  Trash2, 
  AlertCircle, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  Info 
} from 'lucide-react';
import { FOOD_DATABASE, FoodItem } from '../data/anemiaData';
import { playSound } from '../utils/audio';

export const NutritionPlate: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<FoodItem[]>([
    FOOD_DATABASE[0], // Hati ayam default
    FOOD_DATABASE[4], // Sayur bayam
    FOOD_DATABASE[8]  // Jeruk manis
  ]);

  const handleAddItem = (item: FoodItem) => {
    playSound('collect');
    setSelectedItems((prev) => [...prev, item]);
  };

  const handleRemoveItem = (index: number) => {
    playSound('pop');
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleResetPlate = () => {
    playSound('pop');
    setSelectedItems([]);
  };

  // Calculations
  const totalIron = selectedItems.reduce((acc, curr) => acc + curr.ironContent, 0);
  const targetIron = 15.0; // mg per day for teen girls
  const ironPercentage = Math.min(100, Math.round((totalIron / targetIron) * 100));

  const hasEnhancer = selectedItems.some((item) => item.type === 'enhancer');
  const hasInhibitor = selectedItems.some((item) => item.type === 'inhibitor');
  const hasHeme = selectedItems.some((item) => item.type === 'heme');

  return (
    <section id="nutrition" className="py-14 bg-white border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-600 mb-2">
            <Utensils className="w-4 h-4" />
            <span>Laboratorium Nutrisi Remaja</span>
            <span aria-hidden="true">·</span>
            <span>Piring Gizi Seimbang & Kompas Zat Besi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Rakit Piring Makanmu: Apakah Cukup Zat Besi?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Tambahkan makanan ke piring untuk melihat kalkulasi zat besi (mg), pantau efek booster Vitamin C, dan waspadai penghambat seperti es teh!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Virtual Plate & Meter */}
          <div className="lg:col-span-7 bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Isi Piring Makanku Saat Ini
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedItems.length} jenis makanan/minuman terpilih
                </p>
              </div>
              {selectedItems.length > 0 && (
                <button
                  onClick={handleResetPlate}
                  className="text-xs font-medium text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Kosongkan Piring</span>
                </button>
              )}
            </div>

            {/* Visual Plate Surface */}
            <div className="relative min-h-[200px] p-4 bg-white rounded-2xl border-2 border-dashed border-rose-200 shadow-inner flex flex-wrap gap-2.5 items-center justify-center">
              {selectedItems.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <Utensils className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                  <p className="text-xs">Piring masih kosong. Pilih makanan dari daftar di samping!</p>
                </div>
              ) : (
                selectedItems.map((item, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    className="flex items-center gap-2 p-2 px-3 rounded-xl bg-slate-50 border border-slate-200 shadow-xs animate-scaleIn"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{item.name}</p>
                      <p className="text-[10px] text-slate-500">
                        {item.ironContent > 0 ? `${item.ironContent} mg Fe` : item.badgeText}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(idx)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      title="Hapus dari piring"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Iron Progress Meter */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-600" />
                  <span className="text-xs font-bold text-slate-800">
                    Total Asupan Zat Besi (Fe):
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-extrabold text-rose-600 font-display tabular-nums">
                    {totalIron.toFixed(1)}
                  </span>
                  <span className="text-xs text-slate-400">/ {targetIron} mg target harian</span>
                </div>
              </div>

              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    ironPercentage >= 70
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                      : ironPercentage >= 40
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${ironPercentage}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-500">
                {totalIron >= targetIron
                  ? 'Keren! Kebutuhan zat besi harianmu terpenuhi dari komposisi makanan ini.'
                  : `Tersisa ${(targetIron - totalIron).toFixed(1)} mg lagi untuk mencapai target harian remaja putri.`}
              </p>
            </div>

            {/* Absorption Feedback Banners */}
            <div className="space-y-2">
              {hasEnhancer && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2 text-xs text-emerald-800">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Booster Vitamin C Aktif!</strong> Ada buah kaya vitamin C di piringmu. Ini mengubah ion zat besi menjadi bentuk ferro yang mudah diserap hingga 3-4x lipat.
                  </div>
                </div>
              )}

              {hasInhibitor && (
                <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl flex items-start gap-2 text-xs text-rose-800">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Peringatan Penghambat (Inhibitor)!</strong> Ada teh/kopi di piringmu. Senyawa Tanin & Kafein mengikat zat besi dalam makanan hingga 64% gagal diserap dan terbuang sia-sia! Ganti dengan air putih saat makan.
                  </div>
                </div>
              )}

              {hasHeme && !hasInhibitor && (
                <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl flex items-start gap-2 text-xs text-sky-800">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Zat Besi Heme Hadir:</strong> Sumber hewani di piringmu memiliki bioavailabilitas tinggi (diserap langsung 20-30% oleh dinding usus).
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Food Database / Selector */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Pilih Makanan & Minuman
              </span>
              <span className="text-xs text-slate-400">Klik + untuk menambah</span>
            </div>

            <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
              {FOOD_DATABASE.map((food) => (
                <div
                  key={food.id}
                  className="p-3 bg-white rounded-xl border border-slate-200 hover:border-rose-300 transition-all flex items-center justify-between gap-3 shadow-2xs group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2 rounded-lg bg-slate-50 group-hover:scale-110 transition-transform">
                      {food.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-900">{food.name}</h4>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                          food.type === 'heme'
                            ? 'bg-rose-100 text-rose-700'
                            : food.type === 'non-heme'
                            ? 'bg-emerald-100 text-emerald-800'
                            : food.type === 'enhancer'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {food.badgeText}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Porsi: {food.portion} · {food.ironContent > 0 ? `${food.ironContent} mg Zat Besi` : '0 mg Fe'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddItem(food)}
                    className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer shrink-0"
                    title={`Tambahkan ${food.name}`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-3 bg-rose-50/70 rounded-xl border border-rose-100 text-[11px] text-slate-600 flex items-start gap-2">
              <Info className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>
                <strong>Aturan Emas:</strong> Pasangkan sumber zat besi (hati/ayam/bayam) dengan sumber Vitamin C (jeruk/jambu), dan hindari minum es teh saat makan untuk penyerapan terbaik!
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
