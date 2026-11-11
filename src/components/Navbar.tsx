import React, { useState } from 'react';
import { Heart, Menu, X, Sparkles, Download, Calendar, FileCode } from 'lucide-react';
import { playSound } from '../utils/audio';
import { downloadStandaloneHtml } from '../utils/downloadHtml';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenInstallModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  onOpenInstallModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'cycle', label: 'Siklus Haid & Masa Subur', highlight: true },
    { id: 'simulator', label: 'Simulasi Sel Darah' },
    { id: 'cards', label: 'Kartu Edukasi' },
    { id: 'quiz', label: 'Kuis Pintar' },
    { id: 'screening', label: 'Cek Risiko 5L' },
    { id: 'nutrition', label: 'Piring Zat Besi' },
    { id: 'game', label: 'Mini Game' }
  ];

  const handleNavClick = (id: string) => {
    playSound('pop');
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 font-display whitespace-nowrap shrink-0">
                Hemakita
              </span>
            </div>
          </button>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-slate-600">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
                  activeSection === item.id
                    ? 'text-rose-600 font-semibold border-b-2 border-rose-600'
                    : item.highlight
                    ? 'text-rose-600 hover:text-rose-700 font-medium'
                    : 'hover:text-slate-900'
                }`}
              >
                {item.highlight && <Calendar className="w-3.5 h-3.5 text-rose-500" />}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 primary action (+ Install & Unduh HTML) */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                downloadStandaloneHtml();
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              title="Unduh seluruh aplikasi sebagai 1 file HTML mandiri"
            >
              <FileCode className="w-3.5 h-3.5 text-rose-600" />
              <span>Unduh HTML</span>
            </button>

            <button
              onClick={() => {
                playSound('pop');
                onOpenInstallModal();
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100/80 border border-rose-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              title="Pasang aplikasi di iPhone atau Android"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>

            <button
              onClick={() => handleNavClick('screening')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Skrining Sekarang</span>
            </button>
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => {
                playSound('pop');
                onOpenInstallModal();
              }}
              className="p-1.5 text-rose-600 bg-rose-50 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span className="text-[11px]">Install</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none cursor-pointer"
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-rose-100 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-rose-50 text-rose-600 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                downloadStandaloneHtml();
              }}
              className="w-full text-center px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
            >
              <FileCode className="w-4 h-4 text-rose-600" />
              <span>Unduh File HTML Mandiri (.html)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInstallModal();
              }}
              className="w-full text-center px-4 py-2.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Pasang Aplikasi di iOS / Android</span>
            </button>
            <button
              onClick={() => handleNavClick('screening')}
              className="w-full text-center px-4 py-2.5 text-xs font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors"
            >
              Mulai Skrining Risiko 5L
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
