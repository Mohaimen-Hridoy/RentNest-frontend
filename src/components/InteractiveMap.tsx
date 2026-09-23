import React, { useState } from 'react';
import { Property } from '../types/property';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Layers,
  Crosshair,
  Plus,
  Minus,
  Edit3,
  Calendar,
  X,
  Shield,
  Star,
  Building,
} from 'lucide-react';

interface InteractiveMapProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onScheduleVisit: (property: Property) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  properties,
  onSelectProperty,
  onScheduleVisit,
}) => {
  const { lang, formatPrice, activeMapPropertyId, setActiveMapPropertyId, t } = useApp();

  const [searchOnMove, setSearchOnMove] = useState(true);
  const [mapType, setMapType] = useState<'vector' | 'satellite'>('vector');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDrawingPolygon, setIsDrawingPolygon] = useState(false);
  const [showLocationToast, setShowLocationToast] = useState(false);

  // Active property for preview card
  const activeProperty = properties.find((p) => p.id === activeMapPropertyId) || properties[0];

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.15, 1.6));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.15, 0.85));

  const handleCurrentLocation = () => {
    setShowLocationToast(true);
    setTimeout(() => setShowLocationToast(false), 3000);
  };

  return (
    <section className="h-[calc(100vh-260px)] min-h-130 sticky top-36 rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-[#e9f1f7] select-none">
      {/* Dynamic Vector Architectural Map Canvas */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden transition-transform duration-300 origin-center"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <svg
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1000 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="urbanGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d5e3ed" strokeWidth="0.7" />
            </pattern>
            <linearGradient id="lakeWater" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b6dcf3" />
              <stop offset="100%" stopColor="#93c5fd" />
            </linearGradient>
            <linearGradient id="lakeCanal" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>

          {/* Background Map Surface */}
          <rect
            width="1000"
            height="800"
            fill={mapType === 'vector' ? '#eef4f8' : '#1e293b'}
          />
          <rect
            width="1000"
            height="800"
            fill="url(#urbanGrid)"
            opacity={mapType === 'vector' ? 0.6 : 0.2}
          />

          {/* Green Zones & Parks */}
          <path
            d="M 120 180 Q 180 150 240 210 T 210 320 T 130 260 Z"
            fill="#dcfce7"
            opacity="0.85"
          />
          <path
            d="M 520 280 Q 580 260 620 310 T 590 400 T 500 340 Z"
            fill="#dcfce7"
            opacity="0.85"
          />
          <path
            d="M 720 120 Q 820 140 860 220 T 780 340 T 710 240 Z"
            fill="#dcfce7"
            opacity="0.85"
          />
          {/* Hatirjheel Park Area */}
          <path
            d="M 450 680 Q 600 660 750 720 T 600 780 Z"
            fill="#dcfce7"
            opacity="0.75"
          />

          {/* Gulshan Lake (Scenic Blue Water Body) */}
          <path
            d="M 380 -20 Q 420 120 370 250 T 430 450 T 400 620 T 470 820"
            fill="none"
            stroke="url(#lakeWater)"
            strokeWidth="34"
            strokeLinecap="round"
          />
          <path
            d="M 370 250 Q 320 340 330 460 T 360 600"
            fill="none"
            stroke="url(#lakeWater)"
            strokeWidth="22"
            strokeLinecap="round"
          />
          {/* Banani Lake Branch */}
          <path
            d="M 150 -20 Q 180 160 170 300 T 210 520 T 180 820"
            fill="none"
            stroke="url(#lakeCanal)"
            strokeWidth="24"
            strokeLinecap="round"
          />

          {/* Kemal Ataturk Avenue (Horizontal connection between Banani & Gulshan-2) */}
          <path
            d="M -50 280 L 1050 280"
            fill="none"
            stroke="#ffffff"
            strokeWidth="15"
            strokeLinecap="square"
          />
          <path
            d="M -50 280 L 1050 280"
            fill="none"
            stroke="#f1b09b"
            strokeWidth="3.5"
            strokeDasharray="8 6"
          />

          {/* Gulshan Avenue (North-South through Gulshan 1 & 2 circles) */}
          <path d="M 540 -50 L 540 850" fill="none" stroke="#ffffff" strokeWidth="18" />
          <path d="M 540 -50 L 540 850" fill="none" stroke="#d1d5db" strokeWidth="2.5" />

          {/* Madani Avenue (Baridhara to 100 Feet) */}
          <path
            d="M 540 180 Q 750 170 1050 210"
            fill="none"
            stroke="#ffffff"
            strokeWidth="13"
          />
          <path
            d="M 540 180 Q 750 170 1050 210"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="2"
          />

          {/* Secondary Arteries */}
          <path d="M 220 80 L 900 80" fill="none" stroke="#ffffff" strokeWidth="6" />
          <path d="M 100 420 L 850 420" fill="none" stroke="#ffffff" strokeWidth="8" />
          <path d="M 100 580 L 850 580" fill="none" stroke="#ffffff" strokeWidth="8" />
          <path d="M 260 -50 L 260 850" fill="none" stroke="#ffffff" strokeWidth="7" />
          <path d="M 700 -50 L 700 850" fill="none" stroke="#ffffff" strokeWidth="8" />
          <path d="M 850 -50 L 850 850" fill="none" stroke="#ffffff" strokeWidth="10" />

          {/* Gulshan Circle 2 Roundabout */}
          <circle cx="540" cy="280" r="28" fill="#ffffff" />
          <circle cx="540" cy="280" r="15" fill="#0d5c4d" opacity="0.35" />

          {/* Gulshan Circle 1 Roundabout */}
          <circle cx="540" cy="580" r="26" fill="#ffffff" />
          <circle cx="540" cy="580" r="14" fill="#0d5c4d" opacity="0.35" />

          {/* Landmark Text Labels */}
          <text
            x="565"
            y="270"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="13"
            fontWeight="800"
            fill="#2d3b4f"
          >
            {lang === 'bn' ? 'গুলশান-২ সার্কেল' : 'Gulshan-2 Circle'}
          </text>
          <text
            x="565"
            y="285"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="9"
            fontWeight="600"
            fill="#64748b"
          >
            Kemal Ataturk Ave Junction
          </text>

          <text
            x="565"
            y="570"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="13"
            fontWeight="800"
            fill="#2d3b4f"
          >
            {lang === 'bn' ? 'গুলশান-১ সার্কেল' : 'Gulshan-1 Circle'}
          </text>
          <text
            x="565"
            y="585"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="9"
            fontWeight="600"
            fill="#64748b"
          >
            Police Plaza / DCC Market
          </text>

          <text
            x="200"
            y="260"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="12"
            fontWeight="700"
            fill="#2d3b4f"
          >
            {lang === 'bn' ? 'বনানী ১১ (Banani 11)' : 'Banani Road 11'}
          </text>

          <text
            x="130"
            y="140"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="13"
            fontWeight="700"
            fill="#2d3b4f"
          >
            {lang === 'bn' ? 'বনানী ডিওএইচএস (Banani DOHS)' : 'Banani DOHS'}
          </text>

          <text
            x="740"
            y="160"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="13"
            fontWeight="700"
            fill="#2d3b4f"
          >
            {lang === 'bn' ? 'বারিধারা ডিপ্লোম্যাটিক জোন' : 'Baridhara Diplomatic Zone'}
          </text>

          <text
            x="395"
            y="160"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="11"
            fontStyle="italic"
            fontWeight="600"
            fill="#0284c7"
          >
            {lang === 'bn' ? 'গুলশান লেক (Gulshan Lake)' : 'Gulshan Lake'}
          </text>

          <text
            x="640"
            y="680"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="12"
            fontWeight="700"
            fill="#2d3b4f"
          >
            {lang === 'bn' ? 'নিকেতন (Niketan)' : 'Niketan Society'}
          </text>

          {/* Polygon Draw Simulation Overlay when triggered */}
          {isDrawingPolygon && (
            <polygon
              points="420,200 680,180 720,380 460,420"
              fill="#004337"
              fillOpacity="0.15"
              stroke="#004337"
              strokeWidth="2.5"
              strokeDasharray="6 4"
            />
          )}
        </svg>
      </div>

      {/* Floating Header Controls */}
      <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 z-20 pointer-events-none">
        {/* Area Search Checkbox Pill */}
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-slate-200 flex items-center gap-2">
          <input
            id="searchOnMove"
            type="checkbox"
            checked={searchOnMove}
            onChange={(e) => setSearchOnMove(e.target.checked)}
            className="w-4 h-4 accent-[#004337] rounded cursor-pointer"
          />
          <label
            htmlFor="searchOnMove"
            className="text-xs text-[#0b1c30] cursor-pointer select-none font-semibold"
          >
            {t('map.searchOnMove', 'ম্যাপ নড়াচড়া করলে পুনরায় সার্চ করুন (Search on move)')}
          </label>
        </div>

        {/* Polygon Draw Tool & Layer Switcher */}
        <div className="pointer-events-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsDrawingPolygon(!isDrawingPolygon)}
            className={`px-3 py-1.5 rounded-xl shadow-md text-xs font-bold flex items-center gap-1.5 transition-all border ${
              isDrawingPolygon
                ? 'bg-[#004337] text-white border-[#004337]'
                : 'bg-white/95 hover:bg-white text-[#004337] border-slate-200'
            }`}
            title="এলাকা চিহ্নিত করুন"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{t('map.drawArea', 'এরিয়া ড্র করুন (Polygon)')}</span>
          </button>

          <div className="bg-white/95 backdrop-blur-md rounded-xl p-1 shadow-md border border-slate-200 flex items-center gap-0.5">
            <button
              onClick={() => setMapType('vector')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                mapType === 'vector' ? 'bg-[#aaf0dc]/50 text-[#004337]' : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Vector Map View"
            >
              <MapPin className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMapType('satellite')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                mapType === 'satellite' ? 'bg-[#aaf0dc]/50 text-[#004337]' : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Satellite Layer"
            >
              <Layers className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Zoom & Geolocation Tool Buttons */}
      <div className="absolute right-3.5 bottom-12 flex flex-col gap-2 z-20">
        <div className="flex flex-col bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-2.5 text-slate-700 hover:bg-[#eff4ff] hover:text-[#004337] transition-colors"
            title="Zoom In"
          >
            <Plus className="w-4 h-4" />
          </button>
          <div className="h-px bg-slate-200"></div>
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-2.5 text-slate-700 hover:bg-[#eff4ff] hover:text-[#004337] transition-colors"
            title="Zoom Out"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleCurrentLocation}
          className="p-2.5 rounded-xl bg-white/95 backdrop-blur-md text-[#004337] hover:bg-[#eff4ff] shadow-lg border border-slate-200 transition-colors"
          title="আমার বর্তমান লোকেশন"
        >
          <Crosshair className="w-4 h-4 text-[#004337]" />
        </button>
      </div>

      {/* Location Toast Notification */}
      {showLocationToast && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-30 bg-[#004337] text-white text-xs px-4 py-2 rounded-xl shadow-xl animate-fade-in flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-[#aaf0dc]" />
          <span>{lang === 'bn' ? 'আপনার লোকেশন: গুলশান-২, ঢাকা' : 'Located at Gulshan-2, Dhaka'}</span>
        </div>
      )}

      {/* Bottom Neighborhood Safety Badge Legend */}
      <div className="absolute left-3.5 bottom-3.5 z-20 max-w-95">
        <div className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-slate-200/80 flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 animate-ping"></span>
          <div className="min-w-0">
            <p className="text-xs text-[#0b1c30] font-bold truncate">
              {t('map.safetyNote', 'গুলশান-২ জোন: ১০০% সার্বক্ষণিক নিরাপত্তা ও সিসিটিভি পরিবেষ্টিত')}
            </p>
            <p className="text-[11px] text-slate-500 truncate">
              {t('map.safetySub', 'ডিজিটাল এগ্রিমেন্ট ও ২৪/৭ লিগ্যাল এসক্রো প্রোটেকশন সক্রিয়')}
            </p>
          </div>
        </div>
      </div>

      {/* ================= INTERACTIVE MAP PRICE PINS ================= */}
      {properties.map((prop) => {
        const isSelected = activeMapPropertyId === prop.id;
        const coords = prop.mapCoords;

        return (
          <div
            key={prop.id}
            style={{
              top: `${coords.topPercent}%`,
              left: `${coords.leftPercent}%`,
            }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 ${
              isSelected ? 'z-30' : ''
            }`}
          >
            {/* If Selected: Display the Floating Property Preview Card above the pin */}
            {isSelected && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-full mb-1 w-64 bg-white rounded-xl shadow-2xl p-2.5 border border-slate-200 animate-in fade-in zoom-in-95 cursor-pointer">
                <div className="relative w-full h-24 rounded-lg overflow-hidden mb-2 bg-slate-100">
                  <img
                    src={prop.images[0]}
                    alt={prop.titleEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#004337] text-white">
                    {prop.bedrooms} {lang === 'bn' ? 'বেড' : 'Bed'} • {prop.sqft} sqft
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMapPropertyId(null);
                    }}
                    className="absolute top-1.5 right-1.5 text-slate-600 hover:text-slate-900 bg-white/80 p-0.5 rounded-full"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="px-0.5">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-base text-[#004337] font-extrabold tabular-nums">
                      {formatPrice(prop.rent)}
                      <span className="text-[11px] font-normal text-slate-500">
                        {t('card.perMonth', '/মাস')}
                      </span>
                    </span>
                    <span className="text-[11px] font-bold text-[#004337] flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {prop.rating}
                    </span>
                  </div>

                  <p
                    onClick={() => onSelectProperty(prop)}
                    className="text-xs font-bold text-slate-900 truncate hover:text-[#004337]"
                  >
                    {lang === 'bn' ? prop.titleBn : prop.titleEn}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate mb-2">
                    {lang === 'bn' ? prop.addressBn : prop.addressEn}
                  </p>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onScheduleVisit(prop);
                    }}
                    className="w-full py-1.5 rounded-lg bg-[#a13e28] text-white hover:bg-[#822714] transition-colors text-xs font-bold flex items-center justify-center gap-1 shadow-sm"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t('card.bookDirect', 'সরাসরি পরিদর্শন বুক করুন')}</span>
                  </button>
                </div>

                {/* Card Arrow Pointer */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-slate-200 rotate-45"></div>
              </div>
            )}

            {/* Marker Button */}
            <div className="relative group cursor-pointer">
              {isSelected && (
                <div className="absolute -inset-1 rounded-full bg-[#004337]/30 animate-ping"></div>
              )}
              <button
                type="button"
                onClick={() => {
                  setActiveMapPropertyId(prop.id);
                  onSelectProperty(prop);
                }}
                className={`px-3 py-1.5 rounded-full font-bold text-xs shadow-md flex items-center gap-1.5 transition-all ring-2 ${
                  isSelected
                    ? 'bg-[#004337] text-white ring-white shadow-xl scale-110'
                    : 'bg-white hover:bg-[#004337] text-[#004337] hover:text-white ring-slate-200 shadow-md'
                }`}
              >
                {isSelected ? (
                  <span className="w-2 h-2 rounded-full bg-[#aaf0dc]"></span>
                ) : (
                  <Building className="w-3.5 h-3.5 text-[#a13e28] group-hover:text-white" />
                )}
                <span className="tabular-nums">{formatPrice(prop.rent)}</span>
              </button>
            </div>
          </div>
        );
      })}

      {/* Niketan Hub Cluster Badge */}
      <div className="absolute top-[75%] left-[72%] -translate-x-1/2 -translate-y-1/2 z-20">
        <button
          type="button"
          onClick={() => {
            const niketan = properties.find((p) => p.neighborhoodEn.includes('Niketan'));
            if (niketan) {
              setActiveMapPropertyId(niketan.id);
            }
          }}
          className="w-12 h-12 rounded-full bg-[#2d3b4f] text-white hover:bg-[#445267] shadow-xl flex flex-col items-center justify-center transition-transform hover:scale-110 border-2 border-white"
          title="৭টি বাসা উপলব্ধ"
        >
          <span className="font-extrabold text-xs leading-tight">৭টি</span>
          <span className="text-[9px] uppercase tracking-tighter opacity-80 leading-tight">বাসা</span>
        </button>
      </div>
    </section>
  );
};
