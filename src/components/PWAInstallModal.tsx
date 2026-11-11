import React, { useState } from 'react';
import { Download, Share, PlusSquare, X, Smartphone, CheckCircle } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { playSound } from '../utils/audio';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [installSuccess, setInstallSuccess] = useState(false);

  if (!isOpen) return null;

  const handleAndroidInstall = async () => {
    playSound('collect');
    const success = await install();
    if (success) {
      setInstallSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-rose-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white shadow-md">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Pasang Aplikasi Hemakita
            </h3>
            <p className="text-xs text-slate-500">
              Akses cepat tanpa buka browser di iOS & Android
            </p>
          </div>
        </div>

        {isInstalled ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
            <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-emerald-800">Aplikasi Sudah Terpasang!</h4>
            <p className="text-xs text-emerald-700">
              Kamu sudah menggunakan Hemakita dalam mode aplikasi mandiri.
            </p>
          </div>
        ) : installSuccess ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
            <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-emerald-800">Berhasil Memasang Aplikasi!</h4>
            <p className="text-xs text-emerald-700">
              Ikon Hemakita sekarang ada di layar utama ponselmu.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* If Android / Desktop with beforeinstallprompt */}
            {isInstallable ? (
              <div className="space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pasang Hemakita di smartphone Android atau tabletmu dengan satu klik. Hemat kuota dan bisa diakses lancar secara offline!
                </p>
                <button
                  onClick={handleAndroidInstall}
                  className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Pasang Aplikasi Sekarang</span>
                </button>
              </div>
            ) : isIOS ? (
              /* If iOS Safari instructions */
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-rose-600 block">
                  Panduan Pasang di iPhone / iPad (iOS Safari):
                </span>
                <ol className="text-xs text-slate-700 space-y-2.5 list-decimal list-inside">
                  <li className="leading-relaxed">
                    Tekan tombol <strong>Bagikan (Share)</strong> <Share className="w-3.5 h-3.5 inline mx-1 text-sky-600" /> di bilah bawah peramban Safari.
                  </li>
                  <li className="leading-relaxed">
                    Gulir ke bawah pada menu opsi, lalu pilih <strong>Tambah ke Layar Utama (Add to Home Screen)</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-slate-700" />.
                  </li>
                  <li className="leading-relaxed">
                    Tekan <strong>Tambah (Add)</strong> di pojok kanan atas. Selesai!
                  </li>
                </ol>
              </div>
            ) : (
              /* Fallback general instructions */
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600">
                <p>
                  <strong>Untuk Pengguna Android (Chrome):</strong> Tekan tombol menu titik tiga (⋮) di pojok kanan atas browser, lalu pilih <strong>"Instal aplikasi"</strong> atau <strong>"Tambahkan ke Layar Utama"</strong>.
                </p>
                <p className="pt-2 border-t border-slate-200">
                  <strong>Untuk Pengguna iPhone (Safari):</strong> Tekan tombol Share <Share className="w-3 h-3 inline text-sky-600" /> lalu pilih <strong>"Add to Home Screen"</strong>.
                </p>
              </div>
            )}

            {/* Standalone HTML download option */}
            <div className="pt-3 border-t border-slate-200">
              <a
                href="/hemakita-standalone.html"
                download="hemakita-anemia-remaja.html"
                onClick={() => playSound('collect')}
                className="w-full py-2.5 px-3 rounded-xl border border-rose-200 bg-rose-50/60 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer text-center block"
              >
                <span>Unduh Seluruh Aplikasi sebagai File .html Mandiri</span>
              </a>
              <span className="text-[10px] text-slate-500 block text-center mt-1">
                Bisa disimpan & dibuka langsung tanpa internet di HP/laptop.
              </span>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
