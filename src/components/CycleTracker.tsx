import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Heart, 
  Sparkles, 
  Info, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  Droplets, 
  Sun, 
  Moon,
  Clock,
  ShieldCheck,
  Check
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface CycleData {
  lastPeriodDate: string; // YYYY-MM-DD
  cycleLength: number; // usually 28
  periodDuration: number; // usually 5
}

export const CycleTracker: React.FC = () => {
  // Retrieve saved cycle or defaults
  const [cycleData, setCycleData] = useState<CycleData>(() => {
    try {
      const saved = localStorage.getItem('hemakita_cycle_data');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Default: 10 days ago
    const d = new Date();
    d.setDate(d.getDate() - 10);
    return {
      lastPeriodDate: d.toISOString().split('T')[0],
      cycleLength: 28,
      periodDuration: 5
    };
  });

  const [activeTab, setActiveTab] = useState<'kalkulator' | 'kalender' | 'edukasi'>('kalkulator');
  const [selectedDaySymptom, setSelectedDaySymptom] = useState<string[]>([]);
  const [calendarMonthOffset, setCalendarMonthOffset] = useState<number>(0);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('hemakita_cycle_data', JSON.stringify(cycleData));
    } catch {
      // ignore
    }
  }, [cycleData]);

  // Compute key dates
  const lastDate = new Date(cycleData.lastPeriodDate + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Next period date
  const nextPeriodDate = new Date(lastDate);
  nextPeriodDate.setDate(lastDate.getDate() + cycleData.cycleLength);

  // Days until next period
  const diffTime = nextPeriodDate.getTime() - today.getTime();
  const daysUntilNext = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Current cycle day
  const diffFromLast = today.getTime() - lastDate.getTime();
  const currentCycleDay = Math.floor(diffFromLast / (1000 * 60 * 60 * 24)) + 1;

  // Ovulation day: cycleLength - 14
  const ovulationDayNum = Math.max(1, cycleData.cycleLength - 14);
  const ovulationDate = new Date(lastDate);
  ovulationDate.setDate(lastDate.getDate() + (ovulationDayNum - 1));

  // Fertile window: 4 days before ovulation to 1 day after
  const fertileStart = new Date(ovulationDate);
  fertileStart.setDate(ovulationDate.getDate() - 4);
  const fertileEnd = new Date(ovulationDate);
  fertileEnd.setDate(ovulationDate.getDate() + 1);

  // Determine current phase
  const getPhaseInfo = () => {
    if (currentCycleDay <= 0) {
      return {
        name: 'Belum Dimulai',
        color: 'text-slate-700 bg-slate-100 border-slate-200',
        desc: 'Tanggal haid terakhir yang kamu pilih berada di masa depan.',
        ttdAdvice: 'Pastikan minum 1 Tablet Tambah Darah seminggu sekali.'
      };
    } else if (currentCycleDay <= cycleData.periodDuration) {
      return {
        name: 'Fase Menstruasi (Haid Sedang Berlangsung)',
        color: 'text-rose-700 bg-rose-50 border-rose-300',
        badge: 'Hari ke-' + currentCycleDay,
        desc: 'Pelepasan dinding rahim disertai pengeluaran darah haid. Tubuh kehilangan rata-rata 30-80 ml darah atau 15-40 mg zat besi!',
        ttdAdvice: 'PENTING: Minum 1 Tablet Tambah Darah (TTD) SETIAP HARI selama masa menstruasi untuk mencegah Hb drop dan rasa lemas 5L.'
      };
    } else if (currentCycleDay < ovulationDayNum - 4) {
      return {
        name: 'Fase Folikular (Pemulihan & Energi Naik)',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-300',
        badge: 'Hari ke-' + currentCycleDay,
        desc: 'Hormon estrogen mulai meningkat. Dinding rahim menebal kembali dan sel telur baru sedang dimatangkan di indung telur.',
        ttdAdvice: 'Kembali ke jadwal rutin TTD: 1 tablet seminggu sekali (misal setiap hari Jumat).'
      };
    } else if (currentCycleDay <= ovulationDayNum + 1) {
      return {
        name: 'Fase Subur & Ovulasi (Masa Subur)',
        color: 'text-indigo-700 bg-indigo-50 border-indigo-300',
        badge: 'Hari ke-' + currentCycleDay,
        desc: 'Sel telur matang dilepaskan ke tuba falopi. Ini adalah jendela masa subur paling optimal dalam siklus bulanan wanita.',
        ttdAdvice: 'Kondisi fisik dan daya serap nutrisi prima. Jaga asupan air putih dan gizi seimbang.'
      };
    } else if (currentCycleDay <= cycleData.cycleLength) {
      return {
        name: 'Fase Luteal (Pra-Menstruasi / Menuju Haid)',
        color: 'text-amber-800 bg-amber-50 border-amber-300',
        badge: 'Hari ke-' + currentCycleDay,
        desc: 'Hormon progesteron mendominasi. Mungkin muncul gejala PMS (kram ringan, jerawat, perubahan mood, perut kembung).',
        ttdAdvice: 'Kurangi konsumsi kafein/teh berlebih dan tidur cukup 7-8 jam untuk meredakan kram pra-haid.'
      };
    } else {
      return {
        name: 'Siklus Telat / Melebihi Perkiraan',
        color: 'text-orange-700 bg-orange-50 border-orange-300',
        badge: 'Hari ke-' + currentCycleDay,
        desc: 'Haid belum tiba melewati siklus biasanya. Pada remaja, ketidakteraturan siklus sering dipengaruhi stres sekolah, kelelahan, atau perubahan berat badan.',
        ttdAdvice: 'Tetap konsumsi makanan kaya zat besi dan konsultasikan ke dokter jika haid terlambat lebih dari 2-3 bulan.'
      };
    }
  };

  const phase = getPhaseInfo();

  // Helper date formatter
  const formatDateIndo = (d: Date) => {
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Generate calendar days for visual grid
  const currentMonthDate = new Date();
  currentMonthDate.setMonth(currentMonthDate.getMonth() + calendarMonthOffset);
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const toggleSymptom = (sym: string) => {
    playSound('pop');
    setSelectedDaySymptom((prev) =>
      prev.includes(sym) ? prev.filter((s) => s !== sym) : [...prev, sym]
    );
  };

  const commonSymptoms = [
    'Kram Perut Ringan',
    'Lemas / 5L',
    'Pusing / Berkunang',
    'Nyeri Punggung',
    'Jerawat Muncul',
    'Mood Berubah',
    'Payudara Nyeri'
  ];

  return (
    <section id="cycle" className="py-14 bg-gradient-to-b from-white via-rose-50/20 to-white border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-600 mb-2">
            <CalendarIcon className="w-4 h-4 text-rose-500" />
            <span>Kalkulator & Kalender Menstruasi Remaja</span>
            <span aria-hidden="true">·</span>
            <span>Ketahui Jadwal Haid, Masa Subur & Kebutuhan Zat Besi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Pantau Siklus Menstruasi & Cegah Anemia Saat Haid
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Remaja putri berisiko tinggi anemia karena kehilangan darah bulanan. Hitung kapan haid berikutnya tiba, kenali masa subur, dan dapatkan jadwal minum Tablet Tambah Darah (TTD).
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => {
                playSound('pop');
                setActiveTab('kalkulator');
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'kalkulator'
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kalkulator & Prediksi
            </button>
            <button
              onClick={() => {
                playSound('pop');
                setActiveTab('kalender');
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'kalender'
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kalender Visual Bulanan
            </button>
            <button
              onClick={() => {
                playSound('pop');
                setActiveTab('edukasi');
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'edukasi'
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Edukasi Haid & Anemia
            </button>
          </div>
        </div>

        {/* TAB 1: KALKULATOR & PREDIKSI */}
        {activeTab === 'kalkulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Form Controls */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-rose-100 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-rose-600" />
                <span>Pengaturan Siklus Menstruasi</span>
              </h3>

              {/* Input 1: Last Period Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Hari Pertama Haid Terakhir (HPHT):
                </label>
                <input
                  type="date"
                  value={cycleData.lastPeriodDate}
                  onChange={(e) => {
                    playSound('pop');
                    setCycleData({ ...cycleData, lastPeriodDate: e.target.value });
                  }}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500 font-medium text-slate-800"
                />
                <span className="text-[11px] text-slate-500">
                  Tanggal saat pertama kali darah haid keluar di siklus terakhir.
                </span>
              </div>

              {/* Input 2: Cycle Length */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    Rata-rata Panjang Siklus:
                  </label>
                  <span className="text-sm font-extrabold text-rose-600 tabular-nums">
                    {cycleData.cycleLength} Hari
                  </span>
                </div>
                <input
                  type="range"
                  min="21"
                  max="40"
                  step="1"
                  value={cycleData.cycleLength}
                  onChange={(e) => {
                    setCycleData({ ...cycleData, cycleLength: parseInt(e.target.value) });
                  }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>21 Hari (Pendek)</span>
                  <span className="font-semibold text-rose-600">28 Hari (Normal Rata-rata)</span>
                  <span>40 Hari (Panjang)</span>
                </div>
              </div>

              {/* Input 3: Period Duration */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    Lama Durasi Haid:
                  </label>
                  <span className="text-sm font-extrabold text-rose-600 tabular-nums">
                    {cycleData.periodDuration} Hari
                  </span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="10"
                  step="1"
                  value={cycleData.periodDuration}
                  onChange={(e) => {
                    setCycleData({ ...cycleData, periodDuration: parseInt(e.target.value) });
                  }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>3 Hari</span>
                  <span>5 Hari (Normal)</span>
                  <span>10 Hari</span>
                </div>
              </div>

              {/* Quick Today's Period Button */}
              <button
                type="button"
                onClick={() => {
                  playSound('collect');
                  setCycleData({
                    ...cycleData,
                    lastPeriodDate: new Date().toISOString().split('T')[0]
                  });
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Droplets className="w-3.5 h-3.5 text-rose-600" />
                <span>Saya Baru Mulai Haid Hari Ini!</span>
              </button>
            </div>

            {/* Right: Calculation Outputs */}
            <div className="lg:col-span-7 space-y-5">
              {/* Main Countdown & Status Card */}
              <div className={`p-6 rounded-2xl border ${phase.color} space-y-4`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Status Siklus Saat Ini:
                  </span>
                  {phase.badge && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-white/80 border border-current">
                      {phase.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-xl font-extrabold font-display leading-snug">
                    {phase.name}
                  </h4>
                  <p className="text-xs sm:text-sm mt-1 leading-relaxed">
                    {phase.desc}
                  </p>
                </div>

                {/* Important TTD Medical Alert */}
                <div className="p-3 bg-white/90 rounded-xl border border-current text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-rose-700">
                    <ShieldCheck className="w-4 h-4 text-rose-600" />
                    <span>Anjuran Tablet Tambah Darah (TTD):</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed font-normal">
                    {phase.ttdAdvice}
                  </p>
                </div>
              </div>

              {/* Metric Prediction Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Next Period Card */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 text-rose-600 text-xs font-semibold">
                    <Droplets className="w-4 h-4" />
                    <span>Perkiraan Haid Berikutnya</span>
                  </div>
                  <p className="text-lg font-bold text-slate-900 font-display">
                    {formatDateIndo(nextPeriodDate)}
                  </p>
                  <p className="text-xs text-slate-500">
                    {daysUntilNext > 0 ? (
                      <span className="text-rose-600 font-bold">
                        Tinggal {daysUntilNext} hari lagi
                      </span>
                    ) : daysUntilNext === 0 ? (
                      <span className="text-rose-600 font-bold">
                        Diprediksi tiba hari ini!
                      </span>
                    ) : (
                      <span className="text-amber-600 font-medium">
                        Sudah lewat {Math.abs(daysUntilNext)} hari
                      </span>
                    )}
                  </p>
                </div>

                {/* Fertile Window & Ovulation Card */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 text-indigo-600 text-xs font-semibold">
                    <Sun className="w-4 h-4" />
                    <span>Perkiraan Masa Subur</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">
                    {formatDateIndo(fertileStart)} s/d {formatDateIndo(fertileEnd)}
                  </p>
                  <p className="text-xs text-slate-500">
                    Puncak Ovulasi (Lepas Sel Telur): <strong>{formatDateIndo(ovulationDate)}</strong>
                  </p>
                </div>
              </div>

              {/* Daily Symptom Logger */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <span className="text-xs font-bold text-slate-900 block">
                  Catat Apa yang Kamu Rasakan Hari Ini:
                </span>
                <div className="flex flex-wrap gap-2">
                  {commonSymptoms.map((sym) => {
                    const isSelected = selectedDaySymptom.includes(sym);
                    return (
                      <button
                        key={sym}
                        type="button"
                        onClick={() => toggleSymptom(sym)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        <span>{sym}</span>
                      </button>
                    );
                  })}
                </div>
                {selectedDaySymptom.length > 0 && (
                  <p className="text-[11px] text-slate-500 italic pt-1">
                    Tersimpan: {selectedDaySymptom.length} gejala tercatat hari ini.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KALENDER VISUAL BULANAN */}
        {activeTab === 'kalender' && (
          <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  playSound('pop');
                  setCalendarMonthOffset(calendarMonthOffset - 1);
                }}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                title="Bulan sebelumnya"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold text-slate-900 font-display">
                {currentMonthDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
              </h3>

              <button
                onClick={() => {
                  playSound('pop');
                  setCalendarMonthOffset(calendarMonthOffset + 1);
                }}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                title="Bulan berikutnya"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Calendar Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 border-y border-slate-100 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
                <span>Prediksi Haid (Minum TTD Tiap Hari)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block"></span>
                <span>Masa Subur (Fertile Window)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                <span>Puncak Ovulasi</span>
              </div>
            </div>

            {/* Calendar Day Header */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-500">
              <span>Min</span>
              <span>Sen</span>
              <span>Sel</span>
              <span>Rab</span>
              <span>Kam</span>
              <span>Jum</span>
              <span>Sab</span>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {/* Empty leading days */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="h-10 sm:h-12" />
              ))}

              {/* Days of month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const dateObj = new Date(year, month, dayNum);
                dateObj.setHours(0, 0, 0, 0);

                const isToday = dateObj.getTime() === today.getTime();

                // Check if this date falls into period
                // We check relative to lastDate, cycle repeat
                const diffDaysFromLast = Math.round(
                  (dateObj.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
                );
                const dayInCycle = ((diffDaysFromLast % cycleData.cycleLength) + cycleData.cycleLength) % cycleData.cycleLength + 1;

                const isPeriod = dayInCycle <= cycleData.periodDuration;
                const isOvulation = dayInCycle === ovulationDayNum;
                const isFertile = dayInCycle >= ovulationDayNum - 4 && dayInCycle <= ovulationDayNum + 1 && !isOvulation;

                let bgClass = 'bg-slate-50 hover:bg-slate-100 text-slate-800';
                if (isPeriod) {
                  bgClass = 'bg-rose-100 text-rose-800 font-bold border border-rose-300';
                } else if (isOvulation) {
                  bgClass = 'bg-amber-100 text-amber-900 font-bold border border-amber-300';
                } else if (isFertile) {
                  bgClass = 'bg-indigo-100 text-indigo-900 font-medium border border-indigo-200';
                }

                return (
                  <div
                    key={dayNum}
                    className={`h-10 sm:h-12 rounded-xl flex flex-col items-center justify-center text-xs transition-all relative ${bgClass} ${
                      isToday ? 'ring-2 ring-rose-600 ring-offset-1 font-extrabold' : ''
                    }`}
                  >
                    <span>{dayNum}</span>
                    {isToday && (
                      <span className="text-[9px] text-rose-600 font-bold leading-none">
                        Hari ini
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: EDUKASI HAID & ANEMIA */}
        {activeTab === 'edukasi' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Mengapa Haid Memicu Anemia */}
              <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Droplets className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 font-display">
                  Mengapa Remaja Putri Rentan Anemia Saat Haid?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Setiap siklus menstruasi, remaja putri kehilangan sekitar <strong>30 hingga 80 mililiter darah</strong>. Di dalam darah tersebut terdapat zat besi yang terbuang. Jika asupan makanan harian tidak mencukupi, cadangan zat besi (feritin) di sumsum tulang akan terkuras habis, menyebabkan kadar hemoglobin (Hb) anjlok di bawah 12 g/dL.
                </p>
                <div className="p-3 bg-rose-50 rounded-xl text-xs text-rose-800">
                  <strong>Aturan TTD Rematri:</strong> Minum 1 tablet TTD setiap hari selama haid, dan 1 tablet per minggu di hari biasa!
                </div>
              </div>

              {/* Card 2: Tanda Haid Berlebih */}
              <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 font-display">
                  Waspada Haid Berlebih (Menorrhagia)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Kenali sinyal jika pendarahan haidmu sudah tidak wajar dan memicu anemia berat:
                </p>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Harus mengganti pembalut tiap 1–2 jam karena selalu penuh/tembus.</li>
                  <li>Terdapat gumpalan darah berukuran lebih besar dari koin 500 rupiah.</li>
                  <li>Durasi haid berlangsung lebih dari 7–8 hari berturut-turut.</li>
                  <li>Merasa pusing berputar, jantung berdebar, atau pingsan saat haid.</li>
                </ul>
              </div>

              {/* Card 3: Tips Alami Redakan Nyeri Haid (Dismenore) */}
              <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 font-display">
                  Tips Alami Redakan Kram & Nyeri Haid
                </h4>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span><strong>Kompres Hangat:</strong> Tempelkan botol air hangat atau heating pad di perut bagian bawah untuk merilekskan otot rahim.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span><strong>Minum Jahe / Kunyit Hangat:</strong> Senyawa kurkumin dan gingerol memiliki efek antiinflamasi alami yang ampuh redakan kram.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span><strong>Hindari Kafein & Es Teh:</strong> Kafein mempersempit pembuluh darah rahim, memperparah rasa kram.</span>
                  </li>
                </ul>
              </div>

              {/* Card 4: Memahami Masa Subur (Fertile Window) */}
              <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 font-display">
                  Edukasi Masa Subur untuk Remaja
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Masa subur adalah rentang waktu di mana indung telur melepaskan sel telur yang matang (ovulasi), umumnya terjadi sekitar <strong>14 hari sebelum hari pertama haid berikutnya</strong>. Sel telur bertahan hidup 12–24 jam, sedangkan sperma dapat bertahan 3–5 hari. Memahami siklus reproduksi membantu remaja mengenali kesehatan hormonal tubuh mereka sendiri secara ilmiah dan bertanggung jawab.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
