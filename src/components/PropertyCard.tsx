import React from 'react';
import { Property } from '../types/property';
import { useApp } from '../context/AppContext';
import {
  Bed,
  Bath,
  Maximize2,
  Heart,
  MapPin,
  Shield,
  CheckCircle2,
  Star,
  Calendar,
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onSelect: (prop: Property) => void;
  onScheduleVisit: (prop: Property) => void;
  variant?: 'default' | 'grid';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  onScheduleVisit,
  variant = 'default',
}) => {
  const { lang, formatPrice, isFavorite, toggleFavorite, activeMapPropertyId, setActiveMapPropertyId, t } = useApp();

  const isFav = isFavorite(property.id);
  const isActive = activeMapPropertyId === property.id;

  const title = lang === 'bn' ? property.titleBn : property.titleEn;
  const neighborhood = lang === 'bn' ? property.subAreaBn : property.subAreaEn;
  const address = lang === 'bn' ? property.addressBn : property.addressEn;

  return (
    <article
      onClick={() => {
        setActiveMapPropertyId(property.id);
      }}
      onMouseEnter={() => {
        setActiveMapPropertyId(property.id);
      }}
      className={`bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-0.5 p-3.5 flex gap-3.5 transition-all relative cursor-pointer border group ${
        variant === 'grid' ? 'flex-col' : 'flex-col sm:flex-row'
      } ${
        isActive
          ? 'border-[#004337] ring-2 ring-[#aaf0dc]/50 shadow-md scale-[1.005]'
          : 'border-slate-200/80 hover:border-[#004337]/40'
      }`}
    >
      {/* Active Marker Indicator Glow Strip */}
      {isActive && (
        <div className="absolute -left-1 top-4 bottom-4 w-1.5 bg-[#004337] rounded-full"></div>
      )}

      {/* Image Container (16:10 ratio) */}
      <div className={`relative w-full rounded-xl overflow-hidden shrink-0 bg-slate-100 ${variant === 'grid' ? 'h-52' : 'sm:w-48 sm:h-44 h-48'}`}>
        <img
          src={property.images[0]}
          alt={title}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // High-fidelity fallback container
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        {/* Badges on Image */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
          {property.rajukVerified && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-[#004337] text-white shadow-sm font-bold">
              <CheckCircle2 className="w-3 h-3 text-[#aaf0dc]" />
              <span>{lang === 'bn' ? 'রাজউক ভেরিফাইড' : 'RAJUK Verified'}</span>
            </span>
          )}
          {property.escrowProtected && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-white/95 backdrop-blur-md text-[#a13e28] font-bold shadow-sm border border-slate-100">
              <Shield className="w-3 h-3 text-[#a13e28]" />
              <span>{lang === 'bn' ? 'এসক্রো প্রোটেক্টেড' : 'Escrow Protected'}</span>
            </span>
          )}
          {property.instantBook && !property.escrowProtected && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-[#a13e28] text-white font-bold shadow-sm">
              <span>{lang === 'bn' ? 'তাত্ক্ষণিক বুকিং' : 'Instant Book'}</span>
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(property.id);
          }}
          className={`absolute bottom-2 right-2 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
            isFav
              ? 'bg-rose-50 text-rose-600 shadow-md'
              : 'bg-white/80 text-slate-600 hover:text-rose-500'
          }`}
          title={isFav ? 'Remove from favorites' : 'Save property'}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* Info Details Column */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          {/* Header row: Neighborhood tag + Rating */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-[#004337] tracking-wide uppercase truncate">
              {neighborhood}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] bg-[#aaf0dc]/40 text-[#004337] px-1.5 py-0.5 rounded font-bold shrink-0">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>
                {property.rating} ({property.reviewCount})
              </span>
            </span>
          </div>

          {/* Property Title */}
          <h3
            onClick={() => onSelect(property)}
            className="text-base font-bold text-[#0b1c30] leading-snug truncate group-hover:text-[#004337] transition-colors"
          >
            {title}
          </h3>

          {/* Location */}
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{address}</span>
          </p>

          {/* Specs Grid Row */}
          <div className="flex items-center gap-2 mt-2.5 py-1 px-2 rounded-md bg-[#eff4ff] text-slate-700 text-xs flex-wrap border border-slate-100">
            <span className="flex items-center gap-1 font-semibold text-[#0b1c30]">
              <Bed className="w-3.5 h-3.5 text-[#004337]" />
              <span>{property.bedrooms} {lang === 'bn' ? 'বেড' : 'Bed'}</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1 font-semibold text-[#0b1c30]">
              <Bath className="w-3.5 h-3.5 text-[#004337]" />
              <span>{property.bathrooms} {lang === 'bn' ? 'বাথ' : 'Bath'}</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1 font-semibold text-[#0b1c30]">
              <Maximize2 className="w-3.5 h-3.5 text-[#004337]" />
              <span>{property.sqft} sqft</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 text-[11px]">{property.floor}</span>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="mt-3 pt-2.5 flex items-end justify-between gap-2 border-t border-slate-100">
          <div>
            <span className="text-[11px] text-slate-500 block leading-tight">
              {lang === 'bn' ? 'মাসিক ভাড়া + সার্ভিস ফি' : 'Monthly Rent'}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-[#004337] tabular-nums">
                {formatPrice(property.rent)}
              </span>
              <span className="text-xs text-slate-500">{t('card.perMonth', '/মাস')}</span>
            </div>
            {property.serviceCharge > 0 && (
              <span className="text-[10px] text-slate-400 font-medium">
                + {lang === 'bn' ? 'সার্ভিস চার্জ ' : 'Service: '} {formatPrice(property.serviceCharge)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onScheduleVisit(property);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#004337] text-xs font-bold transition-colors border border-slate-200/80 flex items-center gap-1"
            >
              <Calendar className="w-3.5 h-3.5 text-[#004337]" />
              <span>{t('card.scheduleVisit', 'ভিজিট শিডিউল')}</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(property);
              }}
              className="px-3.5 py-1.5 rounded-lg bg-[#a13e28] text-white hover:bg-[#822714] transition-all text-xs font-bold shadow-sm"
            >
              {t('card.details', 'বিস্তারিত')}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
