import React from 'react';
import { 
  Home, 
  Calendar, 
  BookOpen, 
  Award, 
  ClipboardCheck, 
  Download,
  Utensils
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface MobileBottomNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenInstallModal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeSection,
  onNavigate,
  onOpenInstallModal
}) => {
  const navItems = [
    { id: 'hero', label: 'Beranda', icon: Home },
    { id: 'cycle', label: 'Siklus Haid', icon: Calendar, highlight: true },
    { id: 'cards', label: 'Kartu', icon: BookOpen },
    { id: 'quiz', label: 'Kuis', icon: Award },
    { id: 'screening', label: 'Cek 5L', icon: ClipboardCheck },
    { id: 'nutrition', label: 'Gizi', icon: Utensils }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-rose-100 px-2 py-1 shadow-lg pb-[env(safe-area-inset-bottom,4px)]">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                playSound('pop');
                onNavigate(item.id);
              }}
              className={`flex flex-col items-center justify-center py-1 px-2 min-w-[50px] transition-colors cursor-pointer relative ${
                isActive
                  ? 'text-rose-600 font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${item.highlight && !isActive ? 'text-rose-500' : ''}`} />
                {item.highlight && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500" />
                )}
              </div>
              <span className="text-[10px] mt-0.5 whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}

        {/* Install App Quick Action */}
        <button
          onClick={() => {
            playSound('pop');
            onOpenInstallModal();
          }}
          className="flex flex-col items-center justify-center py-1 px-2 min-w-[50px] text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
          title="Pasang Aplikasi di HP"
        >
          <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center">
            <Download className="w-3.5 h-3.5 text-rose-600" />
          </div>
          <span className="text-[10px] font-semibold mt-0.5 whitespace-nowrap">Install</span>
        </button>
      </div>
    </nav>
  );
};
