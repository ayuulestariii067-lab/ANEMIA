import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  Check, 
  Search, 
  BatteryLow, 
  HelpCircle, 
  Beef, 
  Citrus, 
  Coffee, 
  Pill, 
  ShieldAlert, 
  Brain, 
  Eye, 
  BookOpen
} from 'lucide-react';
import { FLASHCARDS, Flashcard } from '../data/anemiaData';
import { playSound } from '../utils/audio';

export const FlashcardsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>({});

  const categories = [
    'Semua',
    'Gejala & Ciri',
    'Nutrisi & Makanan',
    'Mitos vs Fakta',
    'Tablet Tambah Darah',
    'Tips Remaja'
  ];

  const handleFlip = (id: string) => {
    playSound('flip');
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleMastered = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    playSound('collect');
    setMasteredCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'BatteryLow':
        return <BatteryLow className="w-6 h-6 text-rose-500" />;
      case 'HelpCircle':
        return <HelpCircle className="w-6 h-6 text-amber-500" />;
      case 'Beef':
        return <Beef className="w-6 h-6 text-red-600" />;
      case 'Citrus':
        return <Citrus className="w-6 h-6 text-orange-500" />;
      case 'Coffee':
        return <Coffee className="w-6 h-6 text-amber-700" />;
      case 'Pill':
        return <Pill className="w-6 h-6 text-rose-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-rose-500" />;
      case 'Brain':
        return <Brain className="w-6 h-6 text-indigo-500" />;
      case 'Eye':
        return <Eye className="w-6 h-6 text-teal-500" />;
      default:
        return <Sparkles className="w-6 h-6 text-rose-500" />;
    }
  };

  const filteredCards = FLASHCARDS.filter((card) => {
    const matchesCategory =
      selectedCategory === 'Semua' || card.category === selectedCategory;
    const matchesSearch =
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.frontContent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.backContent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.actionTip.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const masteredCount = Object.values(masteredCards).filter(Boolean).length;
  const progressPercent = Math.round((masteredCount / FLASHCARDS.length) * 100);

  return (
    <section id="cards" className="py-14 bg-rose-50/30 border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-600 mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Kartu Pintar 3D Interaktif</span>
              <span aria-hidden="true">·</span>
              <span>Klik kartu untuk membalikkan rahasianya</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Jelajahi Kartu Fakta & Rahasia Anemia
            </h2>
            <p className="mt-1 text-sm text-slate-600 max-w-xl">
              Pelajari konsep penting, bedakan mitos vs fakta, dan kuasai tips nutrisi dengan kartu interaktif yang dirancang khusus untuk remaja.
            </p>
          </div>

          {/* Progress Tracker */}
          <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-xs min-w-[240px]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-700">Kartu Dikuasai:</span>
              <span className="font-bold text-rose-600 tabular-nums">
                {masteredCount} / {FLASHCARDS.length} ({progressPercent}%)
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-rose-500 to-red-500 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Filter bar & Search */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playSound('pop');
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari kata kunci (cth: teh, 5L, mual)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
            />
          </div>
        </div>

        {/* Cards Grid */}
        {filteredCards.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-sm text-slate-500">Tidak ada kartu yang cocok dengan pencarianmu.</p>
            <button
              onClick={() => {
                setSelectedCategory('Semua');
                setSearchQuery('');
              }}
              className="mt-3 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:underline cursor-pointer"
            >
              Reset filter pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map((card: Flashcard) => {
              const isFlipped = !!flippedCards[card.id];
              const isMastered = !!masteredCards[card.id];

              return (
                <div
                  key={card.id}
                  onClick={() => handleFlip(card.id)}
                  className="perspective-1000 h-[340px] cursor-pointer group"
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-500 transform-style-3d rounded-2xl ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* Front Side */}
                    <div className="absolute inset-0 backface-hidden bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[11px] font-semibold text-slate-500">
                            {card.category}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={(e) => toggleMastered(e, card.id)}
                              className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                                isMastered
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-600'
                              }`}
                              title={isMastered ? 'Sudah paham' : 'Tandai sudah paham'}
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span className="text-[10px] font-medium">
                                {isMastered ? 'Paham' : 'Tandai'}
                              </span>
                            </button>
                          </div>
                        </div>

                        <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          {getCategoryIcon(card.frontIcon)}
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 font-display leading-snug">
                          {card.title}
                        </h3>
                        <p className="text-xs text-rose-600 font-medium mt-1">
                          {card.subtitle}
                        </p>

                        <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                          {card.frontContent}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                        <span className="flex items-center gap-1 text-[11px] text-rose-600 font-medium group-hover:underline">
                          <RotateCw className="w-3.5 h-3.5" />
                          Klik untuk membalik fakta
                        </span>
                        <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                          Kartu #{card.id.replace('fc-', '')}
                        </span>
                      </div>
                    </div>

                    {/* Back Side */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-rose-900 via-red-900 to-rose-950 text-white p-6 rounded-2xl border border-rose-800 shadow-md flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-rose-300">
                            Fakta Medis & Penjelasan
                          </span>
                          <button
                            onClick={(e) => toggleMastered(e, card.id)}
                            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 ${
                              isMastered
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                                : 'bg-white/10 text-white/70 border-white/20'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span className="text-[10px]">
                              {isMastered ? 'Paham' : 'Tandai'}
                            </span>
                          </button>
                        </div>

                        <p className="text-xs text-slate-100 leading-relaxed font-normal">
                          {card.backContent}
                        </p>

                        <div className="p-2.5 rounded-lg bg-white/10 border border-white/15 text-xs text-rose-100">
                          <strong className="text-amber-300 block text-[11px]">Tahukah Kamu?</strong>
                          {card.keyFact}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/15">
                        <p className="text-[11px] text-emerald-300 font-medium">
                          <strong>Tips Aksi:</strong> {card.actionTip}
                        </p>
                        <div className="mt-2 flex items-center justify-between text-[10px] text-rose-300/80">
                          <span className="flex items-center gap-1">
                            <RotateCw className="w-3 h-3" /> Klik untuk kembali ke depan
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
