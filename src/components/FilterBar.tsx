import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyFilterParams } from '../types/property';
import {
  MapPin,
  X,
  Grid,
  Map as MapIcon,
  Banknote,
  Bed,
  Building,
  Armchair,
  ShieldCheck,
  SlidersHorizontal,
  ChevronDown,
  RotateCcw,
} from 'lucide-react';

interface FilterBarProps {
  filters: PropertyFilterParams;
  onFilterChange: (filters: PropertyFilterParams) => void;
  viewMode: 'split' | 'grid';
  onViewModeChange: (mode: 'split' | 'grid') => void;
  totalHomesCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  viewMode,
  onViewModeChange,
  totalHomesCount,
}) => {
  const { lang, t } = useApp();

  // Active Dropdowns state
  const [activeDropdown, setActiveDropdown] = useState<'price' | 'bedrooms' | 'propType' | 'furnishing' | 'more' | null>(null);

  const toggleDropdown = (name: 'price' | 'bedrooms' | 'propType' | 'furnishing' | 'more') => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const handleSearchChange = (val: string) => {
    onFilterChange({ ...filters, search: val });
  };

  const clearSearch = () => {
    onFilterChange({ ...filters, search: '' });
  };

  const handlePriceSelect = (min: number | undefined, max: number | undefined) => {
    onFilterChange({ ...filters, minPrice: min, maxPrice: max });
    setActiveDropdown(null);
  };

  const handleBedroomSelect = (beds: number | undefined) => {
    onFilterChange({ ...filters, bedrooms: beds });
    setActiveDropdown(null);
  };

  const handlePropTypeSelect = (type: string | undefined) => {
    onFilterChange({ ...filters, propertyType: type });
    setActiveDropdown(null);
  };

  const handleFurnishingSelect = (furn: string | undefined) => {
    onFilterChange({ ...filters, furnishing: furn });
    setActiveDropdown(null);
  };

  const handleEscrowToggle = () => {
    onFilterChange({ ...filters, escrowOnly: !filters.escrowOnly });
  };

  const handleResetFilters = () => {
    onFilterChange({
      search: '',
      minPrice: undefined,
      maxPrice: undefined,
      bedrooms: undefined,
      propertyType: undefined,
      furnishing: undefined,
      escrowOnly: false,
      sortBy: 'featured',
    });
    setActiveDropdown(null);
  };

  const activeFilterCount = [
    Boolean(filters.minPrice || filters.maxPrice),
    Boolean(filters.bedrooms),
    Boolean(filters.propertyType && filters.propertyType !== 'all'),
    Boolean(filters.furnishing && filters.furnishing !== 'all'),
    Boolean(filters.escrowOnly),
  ].filter(Boolean).length;

  return (
    <section className="w-full bg-white shadow-sm z-30 relative border-b border-slate-200/70 transition-all">
      <div className="max-w-360 mx-auto px-4 md:px-8 py-3 flex flex-col gap-3">
        {/* Search Input & Quick Controls Row */}
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-3">
          {/* Main Search Bar */}
          <div className="relative flex-1 min-w-70">
            <div className="flex items-center bg-[#eff4ff] hover:bg-[#e5eeff] rounded-xl px-4 py-2 transition-all border border-slate-200/60 shadow-inner">
              <MapPin className="w-5 h-5 text-[#004337] mr-2.5 shrink-0" />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {t('search.locationLabel', 'অনুসন্ধান এলাকা • LOCATION FOCUS')}
                </span>
                <input
                  type="text"
                  value={filters.search ?? ''}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder={
                    lang === 'bn'
                      ? 'গুলশান, বনানী, বারিধারা, ঢাকা...'
                      : 'Search by neighborhood (Gulshan, Banani, Baridhara)...'
                  }
                  className="bg-transparent text-sm md:text-base font-bold text-[#0b1c30] focus:outline-none w-full truncate placeholder:text-slate-400 placeholder:font-normal"
                />
              </div>
              {filters.search && (
                <button
                  onClick={clearSearch}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                  title="মুছে ফেলুন"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* View Switcher & Result Count */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Verified Count Pill */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#eff4ff] text-[#004337] text-xs font-semibold border border-[#aaf0dc]">
              <span className="w-2 h-2 rounded-full bg-[#004337] animate-pulse"></span>
              <span>
                {lang === 'bn'
                  ? `${totalHomesCount}টি ভেরিফাইড বাসা উপলব্ধ`
                  : `${totalHomesCount} Verified Homes Available`}
              </span>
              <span className="text-slate-400 font-normal">
                {lang === 'bn' ? '• Escrow Safe' : '• 100% Escrow'}
              </span>
            </div>

            {/* View Toggle Switcher */}
            <div className="flex items-center p-1 bg-[#eff4ff] rounded-xl border border-slate-200/60">
              <button
                type="button"
                onClick={() => onViewModeChange('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#004337] text-white shadow-sm'
                    : 'text-slate-600 hover:text-[#0b1c30]'
                }`}
                title="গ্রিড ভিউ"
              >
                <Grid className="w-4 h-4" />
                <span className="hidden sm:inline">{lang === 'bn' ? 'গ্রিড (Grid)' : 'Grid'}</span>
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange('split')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'split'
                    ? 'bg-[#004337] text-white shadow-sm'
                    : 'text-slate-600 hover:text-[#0b1c30]'
                }`}
                title="স্প্লিট ম্যাপ ভিউ"
              >
                <MapIcon className="w-4 h-4" />
                <span>{lang === 'bn' ? 'ম্যাপ ভিউ (Split Map)' : 'Split Map'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Chips & Fast Toggles Row */}
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-2 rounded-xl bg-slate-50/80 border border-slate-200/70 p-2">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <span className="hidden xl:inline-flex items-center px-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              {lang === 'bn' ? 'ফিল্টার করুন' : 'Refine'}
            </span>
            {/* Price Range Pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('price')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border shadow-sm ${
                  filters.minPrice || filters.maxPrice
                    ? 'bg-[#004337] text-white border-[#004337]'
                    : 'bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] border-slate-200/70'
                }`}
              >
                <Banknote className="w-4 h-4 text-[#004337]" />
                <span>
                  {lang === 'bn' ? 'ভাড়া: ' : 'Rent: '}
                  <strong className={filters.minPrice || filters.maxPrice ? 'text-white' : 'text-[#004337]'}>
                    {filters.minPrice && filters.maxPrice
                      ? `৳${(filters.minPrice / 1000).toFixed(0)}k - ৳${(filters.maxPrice / 1000).toFixed(0)}k`
                      : filters.minPrice
                      ? `> ৳${(filters.minPrice / 1000).toFixed(0)}k`
                      : filters.maxPrice
                      ? `< ৳${(filters.maxPrice / 1000).toFixed(0)}k`
                      : '৳৫০,০০০ - ৳১,৫০,০০০'}
                  </strong>
                </span>
                <ChevronDown className="w-3.5 h-3.5 ml-0.5 opacity-70" />
              </button>

              {activeDropdown === 'price' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 p-3 z-50">
                  <p className="text-xs font-bold text-slate-700 mb-2">
                    {lang === 'bn' ? 'ভাড়ার পরিমাণ নির্বাচন করুন' : 'Select Rent Range'}
                  </p>
                  <div className="space-y-1.5">
                    <button
                      onClick={() => handlePriceSelect(undefined, undefined)}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-[#eff4ff] text-slate-700"
                    >
                      {lang === 'bn' ? 'সব ভাড়া (All)' : 'All Prices'}
                    </button>
                    <button
                      onClick={() => handlePriceSelect(40000, 75000)}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-[#eff4ff] text-slate-700"
                    >
                      ৳৪০,০০০ – ৳৭৫,০০০ (Budget Friendly)
                    </button>
                    <button
                      onClick={() => handlePriceSelect(75000, 110000)}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-[#eff4ff] font-semibold text-[#004337]"
                    >
                      ৳৭৫,০০০ – ৳১,১০,০০০ (Standard Luxury)
                    </button>
                    <button
                      onClick={() => handlePriceSelect(110000, 200000)}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-[#eff4ff] text-slate-700 font-semibold"
                    >
                      ৳১,১০,০০০+ (Diplomatic Penthouse)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bedrooms Active Pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('bedrooms')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border shadow-sm ${
                  filters.bedrooms
                    ? 'bg-[#004337] text-white border-[#004337]'
                    : 'bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] border-slate-200/70'
                }`}
              >
                <Bed className={`w-4 h-4 ${filters.bedrooms ? 'text-[#aaf0dc]' : 'text-[#004337]'}`} />
                <span>
                  {lang === 'bn' ? 'বেডরুম: ' : 'Bedrooms: '}
                  <strong>
                    {filters.bedrooms
                      ? `${filters.bedrooms}+ ${lang === 'bn' ? 'বেডরুম (সক্রিয়)' : 'Beds (Active)'}`
                      : lang === 'bn'
                      ? 'সব বেডরুম'
                      : 'Any Beds'}
                  </strong>
                </span>
                <ChevronDown className="w-3.5 h-3.5 ml-0.5 opacity-70" />
              </button>

              {activeDropdown === 'bedrooms' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-200 p-2 z-50">
                  <p className="text-xs font-bold text-slate-700 mb-2 px-2">
                    {lang === 'bn' ? 'বেডরুম সংখ্যা' : 'Bedrooms'}
                  </p>
                  <div className="space-y-1">
                    {[
                      { label: lang === 'bn' ? 'সব বেডরুম (Any)' : 'Any', val: undefined },
                      { label: '২+ বেডরুম (2+ Bed)', val: 2 },
                      { label: '৩+ বেডরুম (3+ Bed)', val: 3 },
                      { label: '৪+ বেডরুম (4+ Bed)', val: 4 },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleBedroomSelect(item.val)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium ${
                          filters.bedrooms === item.val
                            ? 'bg-[#eff4ff] text-[#004337] font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Property Type Pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('propType')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border shadow-sm ${
                  filters.propertyType && filters.propertyType !== 'all'
                    ? 'bg-[#004337] text-white border-[#004337]'
                    : 'bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] border-slate-200/70'
                }`}
              >
                <Building className="w-4 h-4 text-[#004337]" />
                <span>
                  {lang === 'bn' ? 'প্রোপার্টি: ' : 'Type: '}
                  <strong>
                    {filters.propertyType === 'penthouse'
                      ? 'পেন্টহাউজ'
                      : filters.propertyType === 'duplex'
                      ? 'ডুপ্লেক্স'
                      : filters.propertyType === 'studio'
                      ? 'স্টুডিও'
                      : lang === 'bn'
                      ? 'অ্যাপার্টমেন্ট'
                      : 'Apartment'}
                  </strong>
                </span>
                <ChevronDown className="w-3.5 h-3.5 ml-0.5 opacity-70" />
              </button>

              {activeDropdown === 'propType' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-200 p-2 z-50">
                  <div className="space-y-1">
                    {[
                      { label: lang === 'bn' ? 'সকল টাইপ' : 'All Types', val: undefined },
                      { label: lang === 'bn' ? 'অ্যাপার্টমেন্ট' : 'Apartment', val: 'apartment' },
                      { label: lang === 'bn' ? 'পেন্টহাউজ' : 'Penthouse', val: 'penthouse' },
                      { label: lang === 'bn' ? 'ডুপ্লেক্স' : 'Duplex', val: 'duplex' },
                      { label: lang === 'bn' ? 'স্টুডিও' : 'Studio', val: 'studio' },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePropTypeSelect(item.val)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium ${
                          filters.propertyType === item.val
                            ? 'bg-[#eff4ff] text-[#004337] font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Furnishing Status */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('furnishing')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border shadow-sm ${
                  filters.furnishing && filters.furnishing !== 'all'
                    ? 'bg-[#004337] text-white border-[#004337]'
                    : 'bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] border-slate-200/70'
                }`}
              >
                <Armchair className="w-4 h-4 text-[#004337]" />
                <span>
                  {lang === 'bn' ? 'ফার্নিশিং: ' : 'Furnishing: '}
                  {filters.furnishing === 'fully_furnished'
                    ? lang === 'bn'
                      ? 'ফুললি ফার্নিশড'
                      : 'Fully Furnished'
                    : filters.furnishing === 'semi_furnished'
                    ? lang === 'bn'
                      ? 'সেমি ফার্নিশড'
                      : 'Semi Furnished'
                    : filters.furnishing === 'unfurnished'
                    ? lang === 'bn'
                      ? 'আনফার্নিশড'
                      : 'Unfurnished'
                    : lang === 'bn'
                    ? 'সেমি / ফুললি'
                    : 'Any'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 ml-0.5 opacity-70" />
              </button>

              {activeDropdown === 'furnishing' && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-slate-200 p-2 z-50">
                  <div className="space-y-1">
                    {[
                      { label: lang === 'bn' ? 'সব ফার্নিশিং' : 'All Furnishings', val: undefined },
                      { label: lang === 'bn' ? 'ফুললি ফার্নিশড' : 'Fully Furnished', val: 'fully_furnished' },
                      { label: lang === 'bn' ? 'সেমি ফার্নিশড' : 'Semi Furnished', val: 'semi_furnished' },
                      { label: lang === 'bn' ? 'আনফার্নিশড' : 'Unfurnished', val: 'unfurnished' },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleFurnishingSelect(item.val)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium ${
                          filters.furnishing === item.val
                            ? 'bg-[#eff4ff] text-[#004337] font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Escrow Shield Fast Toggle */}
            <div
              onClick={handleEscrowToggle}
              role="group"
              aria-label={lang === 'bn' ? 'এসক্রো সুরক্ষিত প্রোপার্টি' : 'Escrow protected properties'}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl cursor-pointer transition-all border shadow-sm ${
                filters.escrowOnly
                  ? 'bg-[#aaf0dc] border-[#004337]/30 text-[#004337]'
                  : 'bg-[#aaf0dc]/40 hover:bg-[#aaf0dc]/70 border-slate-200/50 text-[#004337]'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#004337] fill-[#004337]/10" />
              <div className="flex flex-col">
                <span className="text-xs font-bold leading-tight text-[#004337]">
                  {t('filter.escrowBadge', '১০০% ভেরিফাইড এসক্রো')}
                </span>
                <span className="text-[10px] text-slate-600 leading-tight">
                  {t('filter.escrowSub', 'Deposit Safe')}
                </span>
              </div>
              <input
                type="checkbox"
                checked={Boolean(filters.escrowOnly)}
                onChange={() => {}}
                className="w-3.5 h-3.5 accent-[#004337] rounded cursor-pointer ml-1"
              />
            </div>

            {/* More Filters Button */}
            <button
              type="button"
              onClick={() => toggleDropdown('more')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] text-slate-700 text-xs font-semibold transition-colors border border-slate-200/70"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{t('filter.more', 'অন্যান্য ফিল্টার')}</span>
              <span className="bg-[#004337] text-white rounded-full w-4 h-4 text-[10px] inline-flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            </button>

            {activeDropdown === 'more' && (
              <div className="absolute right-4 top-full mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 z-50">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      {lang === 'bn' ? 'অতিরিক্ত ফিল্টার' : 'More filters'}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {lang === 'bn' ? 'আপনার বর্তমান পছন্দগুলো এক জায়গায় দেখুন।' : 'Review and clear your active preferences.'}
                    </p>
                  </div>
                  <SlidersHorizontal className="w-4 h-4 text-[#004337] shrink-0" />
                </div>
                <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between">
                    <span>{lang === 'bn' ? 'এসক্রো সুরক্ষিত' : 'Escrow protected'}</span>
                    <span className={`font-bold ${filters.escrowOnly ? 'text-[#004337]' : 'text-slate-400'}`}>
                      {filters.escrowOnly ? 'On' : 'Any'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="w-full mt-2 px-3 py-2 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#004337] font-bold text-xs transition-colors"
                  >
                    {lang === 'bn' ? 'সব ফিল্টার মুছুন' : 'Clear all filters'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Reset Filters Link */}
          <button
            type="button"
            onClick={handleResetFilters}
            className="self-end lg:self-auto shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-[#a13e28] hover:bg-white text-xs font-semibold transition-colors border border-transparent hover:border-slate-200"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t('filter.reset', 'ফিল্টার মুছুন (Reset)')}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
