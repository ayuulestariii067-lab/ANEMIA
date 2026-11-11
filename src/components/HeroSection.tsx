import React from 'react';
import { Sparkles, ArrowRight, Activity, Award, BookOpen } from 'lucide-react';
import { playSound } from '../utils/audio';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-14 bg-gradient-to-b from-rose-50/70 via-white to-rose-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-700">
              <span className="w-2 h-2 rounded-full bg-rose-600 inline-block"></span>
              <span>Gerakan Nasional Remaja Bebas Anemia</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 font-normal">Pedoman Kemenkes RI</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] font-display text-balance">
              Jangan Biarkan <span className="text-rose-600 underline decoration-rose-300 decoration-wavy decoration-2">Anemia</span> Renggut Semangat & Prestasi Belajarmu!
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Sering mengantuk di kelas, lemas pas olahraga, dan sulit konsentrasi? 
              Bisa jadi tubuhmu kekurangan sel darah merah. Yuk, pelajari cara kerja hemoglobin, uji wawasan lewat kuis seru, dan kenali makanan pencegah anemia bersama <strong>Hemakita</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  playSound('pop');
                  onNavigate('cycle');
                }}
                className="px-5 py-3 text-sm font-semibold text-white bg-rose-600 rounded-xl hover:bg-rose-700 transition-all shadow-md shadow-rose-600/20 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Cek Haid & Masa Subur</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  playSound('pop');
                  onNavigate('cards');
                }}
                className="px-4 py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-rose-600 transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-rose-500" />
                <span>Kartu Pintar</span>
              </button>

              <button
                onClick={() => {
                  playSound('pop');
                  onNavigate('quiz');
                }}
                className="px-4 py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-rose-600 transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-500" />
                <span>Kuis Remaja</span>
              </button>

              <button
                onClick={() => {
                  playSound('pop');
                  onNavigate('simulator');
                }}
                className="px-4 py-3 text-sm font-semibold text-slate-700 bg-rose-50 border border-rose-100 rounded-xl hover:bg-rose-100/70 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Activity className="w-4 h-4 text-rose-600" />
                <span>Simulasi Sel</span>
              </button>
            </div>

            {/* Quick Proof Strip */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-rose-100/80">
              <div>
                <p className="text-2xl font-bold text-rose-600 font-display tabular-nums">32%</p>
                <p className="text-xs text-slate-500 leading-tight">Remaja putri Indonesia alami anemia</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 font-display">5L</p>
                <p className="text-xs text-slate-500 leading-tight">Lemah, Letih, Lesu, Lelah, Lalai</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-600 font-display">1x/Mgg</p>
                <p className="text-xs text-slate-500 leading-tight">Rutin Tablet Tambah Darah (TTD)</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
              <img
                src="/src/assets/images/hero_teen_health_1794423878887.jpg"
                alt="Remaja Indonesia aktif dan ceria belajar di sekolah"
                className="w-full h-[360px] sm:h-[420px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <div className="flex items-center gap-2 text-xs font-medium text-rose-300">
                  <Sparkles className="w-4 h-4" />
                  <span>Kebugaran & Prestasi Remaja</span>
                </div>
                <h3 className="text-lg font-bold font-display mt-1 text-white">
                  Oksigen Lancar, Otak Cerdas, Prestasi Juara!
                </h3>
                <p className="text-xs text-slate-200 mt-1">
                  Cegah anemia sejak dini untuk masa depan yang produktif dan bebas lemas.
                </p>
              </div>
            </div>

            {/* Floating Quick Card */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white p-3.5 rounded-xl shadow-lg border border-rose-100 items-center gap-3 max-w-[260px]">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-sm">
                Hb
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Target Normal Hb</p>
                <p className="text-xs text-slate-500">≥ 12.0 g/dL untuk remaja putri</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
