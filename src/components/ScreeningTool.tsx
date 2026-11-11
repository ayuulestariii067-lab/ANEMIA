import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  RotateCcw, 
  Share2,
  Stethoscope
} from 'lucide-react';
import { SCREENING_QUESTIONS } from '../data/anemiaData';
import { playSound } from '../utils/audio';

export const ScreeningTool: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleSelectOption = (questionId: string, score: number) => {
    playSound('pop');
    setAnswers((prev) => ({
      ...prev,
      [questionId]: score
    }));
  };

  const isAllAnswered = SCREENING_QUESTIONS.every(
    (q) => answers[q.id] !== undefined
  );

  const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);

  const calculateRisk = () => {
    if (totalScore <= 3) {
      return {
        level: 'Risiko Rendah',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-300',
        badgeColor: 'bg-emerald-100 text-emerald-800',
        summary: 'Gejala dan pola makanmu saat ini menunjukkan risiko anemia yang relatif rendah.',
        advice: [
          'Pertahankan konsumsi lauk hewani (ikan, telur, ayam, daging) setiap hari.',
          'Bagi remaja putri, tetap minum Tablet Tambah Darah (TTD) 1 tablet per minggu sebagai perlindungan.',
          'Tetap batasi minum teh/kopi langsung sehabis makan makanan utama.'
        ]
      };
    } else if (totalScore <= 7.5) {
      return {
        level: 'Risiko Sedang (Waspada)',
        color: 'text-amber-800 bg-amber-50 border-amber-300',
        badgeColor: 'bg-amber-100 text-amber-800',
        summary: 'Terdapat beberapa indikasi defisiensi zat besi seperti kelelahan atau kebiasaan makan yang menghambat penyerapan.',
        advice: [
          'Tingkatkan lauk kaya zat besi hewani seperti hati ayam dan daging sapi 2-3x per minggu.',
          'Ganti minuman es teh saat makan dengan air putih, atau beri jeda minimal 2 jam.',
          'Pastikan rutin minum TTD seminggu sekali dan tingkatkan saat haid.',
          'Disarankan cek kadar Hb di ruang UKS sekolah atau Puskesmas saat ada kesempatan.'
        ]
      };
    } else {
      return {
        level: 'Risiko Tinggi (Perlu Evaluasi)',
        color: 'text-rose-800 bg-rose-50 border-rose-300',
        badgeColor: 'bg-rose-100 text-rose-800',
        summary: 'Kamu mengalami banyak tanda khas anemia (5L, pusing, konjungtiva pucat) dan/atau asupan zat besi yang sangat minim.',
        advice: [
          'Sangat disarankan segera memeriksakan diri ke Puskesmas, dokter, atau petugas UKS untuk tes kadar Hemoglobin darah.',
          'Konsultasikan suplementasi Tablet Tambah Darah dosis terapi sesuai resep tenaga medis.',
          'Perbanyak konsumsi makanan tinggi zat besi hewani yang dipadukan dengan buah tinggi vitamin C (jambu biji, jeruk).',
          'Hindari diet ketat tanpa pengawasan dokter atau ahli gizi.'
        ]
      };
    }
  };

  const handleReset = () => {
    playSound('pop');
    setAnswers({});
    setShowResult(false);
  };

  const handleShareResult = () => {
    playSound('collect');
    const result = calculateRisk();
    const text = `Hasil Cek Mandiri Anemia Hemakita:\nTingkat: ${result.level} (Skor: ${totalScore})\n${result.summary}\nYuk cek kondisimu di Hemakita!`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="screening" className="py-14 bg-rose-50/40 border-b border-rose-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-600 mb-2">
            <ClipboardCheck className="w-4 h-4" />
            <span>Skrining Mandiri Remaja</span>
            <span aria-hidden="true">·</span>
            <span>Deteksi Dini Gejala 5L & Faktor Risiko</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Cek Risiko Anemia Tubuhmu
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Jawab 7 pertanyaan singkat berdasarkan apa yang kamu rasakan dalam 1-2 bulan terakhir untuk melihat gambaran kondisi tubuhmu.
          </p>
        </div>

        {!showResult ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
              <span>Progres Skrining:</span>
              <span className="font-bold text-slate-900 tabular-nums">
                {Object.keys(answers).length} / {SCREENING_QUESTIONS.length} Terjawab
              </span>
            </div>

            <div className="space-y-6">
              {SCREENING_QUESTIONS.map((q, idx) => (
                <div key={q.id} className="space-y-2.5">
                  <p className="text-sm font-bold text-slate-900">
                    <span className="text-rose-600 mr-1.5">{idx + 1}.</span>
                    {q.question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = answers[q.id] === opt.score;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(q.id, opt.score)}
                          className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-rose-50 border-rose-500 text-rose-900 font-semibold shadow-xs'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                {!isAllAnswered ? '*Jawab seluruh pertanyaan untuk melihat hasil evaluasi' : 'Semua pertanyaan telah dijawab!'}
              </span>
              <button
                disabled={!isAllAnswered}
                onClick={() => {
                  playSound('victory');
                  setShowResult(true);
                }}
                className={`px-6 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  isAllAnswered
                    ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Lihat Hasil Evaluasi Risiko
              </button>
            </div>
          </div>
        ) : (
          /* Result View */
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            {(() => {
              const res = calculateRisk();
              return (
                <>
                  <div className={`p-5 rounded-2xl border ${res.color} space-y-3`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {totalScore <= 3 ? (
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-rose-600" />
                        )}
                        <h3 className="text-lg font-bold font-display">
                          Tingkat Risiko: {res.level}
                        </h3>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${res.badgeColor}`}>
                        Skor: {totalScore.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed">{res.summary}</p>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Stethoscope className="w-4 h-4 text-rose-600" />
                      <span>Langkah Rekomendasi Medis untukmu:</span>
                    </h4>
                    <ul className="space-y-2">
                      {res.advice.map((item, i) => (
                        <li key={i} className="text-xs text-slate-700 flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                            {i + 1}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Disclaimer notice */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
                    <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Catatan Edukasi:</strong> Skrining mandiri ini bertujuan untuk edukasi dan kesadaran dini, bukan pengganti diagnosis resmi laboratorium. Diagnosis definitif anemia hanya dapat ditegakkan melalui pemeriksaan darah (Hb) oleh tenaga medis di Puskesmas, Klinik, atau Rumah Sakit.
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Ulangi Skrining</span>
                    </button>

                    <button
                      onClick={handleShareResult}
                      className="px-4 py-2 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{copied ? 'Teks Tersalin!' : 'Salin Ringkasan Gejala'}</span>
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </section>
  );
};
