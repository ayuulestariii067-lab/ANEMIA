import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Zap, 
  Lightbulb, 
  Trophy,
  HelpCircle
} from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/anemiaData';
import { playSound } from '../utils/audio';

export const QuizSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{
    questionId: number;
    chosen: number;
    isCorrect: boolean;
  }[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctIndex;

    if (isCorrect) {
      playSound('correct');
      const newScore = score + 100 + streak * 20;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      if (newStreak % 3 === 0) {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 }
        });
      }
    } else {
      playSound('wrong');
      setStreak(0);
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        chosen: index,
        isCorrect
      }
    ]);
  };

  const handleNext = () => {
    playSound('pop');
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Completed!
      setIsCompleted(true);
      playSound('victory');
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    playSound('pop');
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setUserAnswers([]);
    setIsCompleted(false);
    setShowReview(false);
  };

  const correctAnswersCount = userAnswers.filter((a) => a.isCorrect).length;
  const percentage = Math.round((correctAnswersCount / QUIZ_QUESTIONS.length) * 100);

  const getRankBadge = () => {
    if (percentage === 100) {
      return {
        title: 'Master Hemoglobin & Duta Remaja Sehat',
        desc: 'Sempurna! Kamu memiliki pemahaman medis luar biasa tentang pencegahan anemia, nutrisi zat besi, dan aturan TTD.',
        icon: '🏆',
        color: 'text-amber-600 bg-amber-50 border-amber-200'
      };
    } else if (percentage >= 75) {
      return {
        title: 'Pahlawan Zat Besi Unggul',
        desc: 'Keren banget! Pengetahuanmu tentang gejala 5L dan nutrisi penambah darah sudah sangat matang.',
        icon: '🥇',
        color: 'text-rose-600 bg-rose-50 border-rose-200'
      };
    } else if (percentage >= 50) {
      return {
        title: 'Pemerhati Kesehatan Muda',
        desc: 'Bagus! Kamu sudah memahami dasar-dasar anemia. Sedikit lagi asah tips seputar penyerapan zat besi dan TTD.',
        icon: '🥈',
        color: 'text-sky-600 bg-sky-50 border-sky-200'
      };
    } else {
      return {
        title: 'Pejuang Pemula Anti-5L',
        desc: 'Awal yang baik untuk belajar! Buka kembali Kartu Pintar Edukasi untuk memperkuat wawasanmu.',
        icon: '🌱',
        color: 'text-slate-700 bg-slate-50 border-slate-200'
      };
    }
  };

  return (
    <section id="quiz" className="py-14 bg-white border-b border-rose-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-600 mb-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Kuis Edukasi Gamifikasi</span>
            <span aria-hidden="true">·</span>
            <span>Uji Pengetahuanmu & Kumpulkan Badge</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Tantangan Juara: Seberapa Kenal Kamu dengan Anemia?
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Jawab 8 pertanyaan interaktif seputar gejala 5L, mitos teh, zat besi hewani vs nabati, dan aturan TTD.
          </p>
        </div>

        {!isCompleted ? (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            {/* Top Bar: Progress, Streak & Score */}
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Pertanyaan</span>
                <span className="text-sm font-bold text-slate-900 tabular-nums">
                  {currentIndex + 1} / {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 font-medium">
                  {currentQ.category}
                </span>
              </div>

              <div className="flex items-center gap-4">
                {streak > 1 && (
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 animate-pulse">
                    <Zap className="w-3.5 h-3.5 fill-amber-500" />
                    <span>Streak {streak}x!</span>
                  </div>
                )}
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block leading-tight">Total Skor</span>
                  <span className="text-base font-extrabold text-rose-600 font-display tabular-nums">
                    {score}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-rose-600 h-full transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`
                }}
              />
            </div>

            {/* Question Text */}
            <div className="pt-2">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {currentQ.question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let optionStyles = 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50';

                if (isAnswered) {
                  if (isCorrect) {
                    optionStyles = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-medium';
                  } else if (isSelected) {
                    optionStyles = 'bg-rose-50 border-rose-300 text-rose-900';
                  } else {
                    optionStyles = 'bg-white border-slate-200 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${optionStyles}`}
                  >
                    <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm flex-1">{option}</span>
                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after answer */}
            {isAnswered && (
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 animate-fadeIn">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>Penjelasan Medis:</span>
                  <span className="text-rose-600 font-medium">({currentQ.badge})</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {currentQ.explanation}
                </p>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNext}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span>
                      {currentIndex < QUIZ_QUESTIONS.length - 1
                        ? 'Lanjut ke Pertanyaan Berikutnya'
                        : 'Lihat Hasil Akhir'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Completion Screen */
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 flex items-center justify-center text-3xl shadow-xs">
              {getRankBadge().icon}
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider">
                Kuis Selesai!
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                {getRankBadge().title}
              </h3>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                {getRankBadge().desc}
              </p>
            </div>

            {/* Stats Breakdown */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-400 block">Jawaban Benar</span>
                <span className="text-xl font-bold text-emerald-600 tabular-nums">
                  {correctAnswersCount} / {QUIZ_QUESTIONS.length}
                </span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-400 block">Total Skor</span>
                <span className="text-xl font-bold text-rose-600 tabular-nums">
                  {score}
                </span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-400 block">Streak Terbaik</span>
                <span className="text-xl font-bold text-amber-600 tabular-nums">
                  {maxStreak}x
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="px-5 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi Kuis</span>
              </button>

              <button
                onClick={() => {
                  playSound('pop');
                  setShowReview(!showReview);
                }}
                className="px-5 py-2.5 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showReview ? 'Sembunyikan Pembahasan' : 'Lihat Pembahasan Lengkap'}</span>
              </button>
            </div>

            {/* Question Review Accordion */}
            {showReview && (
              <div className="text-left space-y-4 pt-6 border-t border-slate-200">
                <h4 className="text-sm font-bold text-slate-900">
                  Pembahasan Setiap Soal:
                </h4>
                {QUIZ_QUESTIONS.map((q) => {
                  const ans = userAnswers.find((a) => a.questionId === q.id);
                  const isUserCorrect = ans?.isCorrect ?? false;

                  return (
                    <div
                      key={q.id}
                      className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">
                          #{q.id}. {q.question}
                        </span>
                        {isUserCorrect ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold text-[10px]">
                            Benar
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-semibold text-[10px]">
                            Salah
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600">
                        <strong>Kunci Jawaban:</strong> {q.options[q.correctIndex]}
                      </p>
                      <p className="text-slate-500 italic">
                        {q.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
