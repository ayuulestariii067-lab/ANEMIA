/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CycleTracker } from './components/CycleTracker';
import { BloodSimulator } from './components/BloodSimulator';
import { FlashcardsSection } from './components/FlashcardsSection';
import { QuizSection } from './components/QuizSection';
import { ScreeningTool } from './components/ScreeningTool';
import { NutritionPlate } from './components/NutritionPlate';
import { TTDTracker } from './components/TTDTracker';
import { MiniGameHero } from './components/MiniGameHero';
import { Footer } from './components/Footer';
import { PWAInstallModal } from './components/PWAInstallModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Download, Sparkles, X } from 'lucide-react';
import { usePWAInstall } from './hooks/usePWAInstall';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);
  const [dismissInstallBanner, setDismissInstallBanner] = useState<boolean>(false);
  const { isInstalled } = usePWAInstall();

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-rose-50/30 text-slate-800 antialiased selection:bg-rose-200 selection:text-rose-900 pb-16 lg:pb-0">
      {/* Top Mobile App Banner (if not standalone installed) */}
      {!isInstalled && !dismissInstallBanner && (
        <div className="bg-gradient-to-r from-rose-600 to-red-600 text-white px-3 py-2 text-xs flex items-center justify-between gap-2 shadow-sm">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="p-1 rounded bg-white/20 shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="truncate">
              <strong>Aplikasi Hemakita:</strong> Pasang di iPhone atau Android agar mudah dibuka kapan saja!
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsInstallModalOpen(true)}
              className="px-2.5 py-1 bg-white text-rose-700 font-bold rounded-md text-[11px] hover:bg-rose-50 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span>Pasang</span>
            </button>
            <button
              onClick={() => setDismissInstallBanner(true)}
              className="p-1 text-white/80 hover:text-white cursor-pointer"
              aria-label="Tutup pesan"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection onNavigate={handleNavigate} />
        <CycleTracker />
        <BloodSimulator />
        <FlashcardsSection />
        <QuizSection />
        <ScreeningTool />
        <NutritionPlate />
        <TTDTracker />
        <MiniGameHero />
      </main>

      {/* Footer */}
      <Footer />

      {/* PWA Install Modal Guide */}
      <PWAInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      {/* Mobile Native Bottom Navigation Bar */}
      <MobileBottomNav
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      />
    </div>
  );
}
