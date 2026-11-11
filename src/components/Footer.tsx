import React from 'react';
import { Heart, ShieldCheck, Stethoscope } from 'lucide-react';
import { playSound } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    playSound('pop');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Wordmark & Purpose */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <span className="text-xl font-bold text-white font-display">
                Hemakita
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Platform edukasi interaktif kesehatan remaja untuk mencegah anemia defisiensi besi, meningkatkan konsentrasi belajar, dan mewujudkan generasi muda Indonesia yang sehat, aktif, dan berprestasi.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Berdasarkan Pedoman Resmi Kementerian Kesehatan RI & WHO</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Fitur Interaktif
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => scrollTo('simulator')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Simulasi Eritrosit & Oksigen
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('cards')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Kartu Pintar 3D & Fakta Medis
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('quiz')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Kuis Gamifikasi Berhadiah Badge
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('screening')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Cek Mandiri Risiko Gejala 5L
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('nutrition')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Piring Sehat Zat Besi & Booster Vit C
                </button>
              </li>
              <li>
                <a
                  href="/hemakita-standalone.html"
                  download="hemakita-anemia-remaja.html"
                  className="text-rose-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  Unduh File HTML Mandiri (.html)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Medical Disclaimer & Help */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-rose-400" />
              <span>Butuh Bantuan?</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Jika kamu sering pingsan, sesak napas, atau wajah sangat pucat, segera hubungi ruang UKS sekolah atau kunjungi Puskesmas terdekat untuk tes darah rutin.
            </p>
            <div className="p-3 bg-slate-800/80 rounded-xl text-[11px] text-slate-300 border border-slate-700/80">
              <strong className="text-white block">Halo Kemenkes:</strong> 1500-567
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© 2026 Hemakita. Edukasi Kesehatan Remaja Indonesia.</p>
          <p className="text-[11px]">
            Edukasi ini bukan pengganti nasihat medis profesional.
          </p>
        </div>
      </div>
    </footer>
  );
};
