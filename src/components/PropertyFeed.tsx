import React from 'react';
import { Property, PropertyFilterParams } from '../types/property';
import { PropertyCard } from './PropertyCard';
import { useApp } from '../context/AppContext';
import { ChevronDown, ArrowDownCircle, SearchX } from 'lucide-react';

interface PropertyFeedProps {
  properties: Property[];
  isLoading: boolean;
  filters: PropertyFilterParams;
  onFilterChange: (filters: PropertyFilterParams) => void;
  onSelectProperty: (property: Property) => void;
  onScheduleVisit: (property: Property) => void;
}

export const PropertyFeed: React.FC<PropertyFeedProps> = ({
  properties,
  isLoading,
  filters,
  onFilterChange,
  onSelectProperty,
  onScheduleVisit,
}) => {
  const { lang, t } = useApp();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, sortBy: e.target.value as any });
  };

  return (
    <section className="flex flex-col gap-4 h-[calc(100vh-260px)] min-h-130 overflow-y-auto pr-1.5 scrollbar-thin">
      {/* Feed Subheader & Sorting */}
      <div className="flex items-center justify-between px-1 py-1 text-[#0b1c30]">
        <div>
          <h2 className="text-base font-bold text-[#0b1c30] tracking-tight">
            {t('feed.title', 'গুলশান ও বনানী এলাকার ভেরিফাইড তালিকা')}
          </h2>
          <p className="text-xs text-slate-500">
            {t('feed.subtitle', 'নিরাপদ ডিজিটাল চুক্তি ও লিগ্যাল অডিট নিশ্চিত')}
          </p>
        </div>

        <div className="relative shrink-0">
          <select
            value={filters.sortBy || 'featured'}
            onChange={handleSortChange}
            aria-label={lang === 'bn' ? 'বাছাইকরণ ক্রম' : 'Sort properties by'}
            className="bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] text-xs font-bold py-1.5 px-3 rounded-lg focus:outline-none cursor-pointer pr-7 appearance-none border border-slate-200 shadow-sm"
          >
            <option value="featured">{t('sort.popular', 'জনপ্রিয়তা ও ফিচারড')}</option>
            <option value="price_asc">{t('sort.priceAsc', 'ভাড়া: কম থেকে বেশি')}</option>
            <option value="price_desc">{t('sort.priceDesc', 'ভাড়া: বেশি থেকে কম')}</option>
            <option value="newest">{t('sort.newest', 'সর্বশেষ যোগ করা')}</option>
          </select>
          <ChevronDown className="w-4 h-4 absolute right-1.5 top-2 pointer-events-none text-slate-500" />
        </div>
      </div>

      {/* Loading Skeleton State */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-44 bg-white rounded-xl border border-slate-200 animate-pulse p-4 flex gap-4">
              <div className="w-48 bg-slate-200 rounded-lg shrink-0"></div>
              <div className="flex-1 space-y-3 py-2">
                <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                <div className="h-5 bg-slate-200 rounded w-2/3"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                <div className="h-8 bg-slate-200 rounded w-1/4 mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && properties.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center flex flex-col items-center justify-center my-6">
          <div className="w-14 h-14 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#004337] mb-3">
            <SearchX className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            {lang === 'bn' ? 'কোন প্রোপার্টি পাওয়া যায়নি' : 'No properties found'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mt-1 mb-4">
            {lang === 'bn'
              ? 'আপনার ফিল্টারের শর্তাবলী শিথিল করুন অথবা অনুসন্ধান এলাকা পরিবর্তন করুন।'
              : 'Try broadening your budget or resetting active filter criteria.'}
          </p>
          <button
            onClick={() =>
              onFilterChange({
                search: '',
                minPrice: undefined,
                maxPrice: undefined,
                bedrooms: undefined,
                propertyType: undefined,
                furnishing: undefined,
                escrowOnly: false,
              })
            }
            className="px-4 py-2 bg-[#004337] text-white rounded-lg text-xs font-bold hover:bg-[#0d5c4d] transition-colors"
          >
            {t('filter.reset', 'ফিল্টার মুছুন (Reset)')}
          </button>
        </div>
      )}

      {/* Feed Property Cards */}
      {!isLoading && (
        <div className="flex flex-col gap-3.5">
          {properties.map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              onSelect={onSelectProperty}
              onScheduleVisit={onScheduleVisit}
            />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {properties.length > 0 && (
        <div className="py-3 flex items-center justify-center">
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] text-[#004337] text-xs font-bold transition-all shadow-sm border border-slate-200 flex items-center gap-2 group"
          >
            <span>{lang === 'bn' ? 'আরও প্রোপার্টি দেখুন (Load More)' : 'Load More Homes'}</span>
            <ArrowDownCircle className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      )}
    </section>
  );
};
