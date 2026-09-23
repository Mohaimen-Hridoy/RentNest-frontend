import React, { useState } from 'react';
import { Property } from '../types/property';
import { useApp } from '../context/AppContext';
import {
  X,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Building,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Lock,
  Phone,
  MessageSquare,
  FileCheck,
  Star,
  Layers,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onScheduleVisit: (prop: Property) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  isOpen,
  onClose,
  onScheduleVisit,
}) => {
  const { lang, formatPrice, setIsEscrowModalOpen, t } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen || !property) return null;

  const title = lang === 'bn' ? property.titleBn : property.titleEn;
  const neighborhood = lang === 'bn' ? property.subAreaBn : property.subAreaEn;
  const address = lang === 'bn' ? property.addressBn : property.addressEn;
  const desc = lang === 'bn' ? property.descriptionBn : property.descriptionEn;

  // Move-in cost calculation
  const advanceAmount = property.rent * property.advanceDepositMonths;
  const initialTotal = advanceAmount + property.rent + property.serviceCharge;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="px-6 py-3.5 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#004337] bg-[#eff4ff] px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#aaf0dc]">
              {neighborhood}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              {property.rating} ({property.reviewCount} {lang === 'bn' ? 'রিভিউ' : 'reviews'})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Gallery Area */}
          <div className="space-y-2">
            <div className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={property.images[activeImageIndex] || property.images[0]}
                alt={title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all"
              />
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                {property.rajukVerified && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-[#004337] text-white font-bold shadow-md">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#aaf0dc]" />
                    <span>{lang === 'bn' ? 'রাজউক অনুমোদিত' : 'RAJUK Verified'}</span>
                  </span>
                )}
                {property.escrowProtected && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-white text-[#a13e28] font-bold shadow-md">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#a13e28]" />
                    <span>{lang === 'bn' ? 'ব্যাংক এসক্রো গ্যারান্টি' : 'Bank Escrow Protected'}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-[#004337] ring-2 ring-[#aaf0dc]'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Title, Address & Price Row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#0b1c30]">
                {title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{address}</span>
              </p>
            </div>

            <div className="bg-[#eff4ff] p-3.5 rounded-xl border border-slate-200/80 shrink-0">
              <span className="text-[11px] text-slate-500 font-semibold block">
                {lang === 'bn' ? 'নিট মাসিক ভাড়া' : 'Net Monthly Rent'}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-[#004337] tabular-nums">
                  {formatPrice(property.rent)}
                </span>
                <span className="text-xs text-slate-600 font-semibold">
                  {t('card.perMonth', '/মাস')}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {property.serviceCharge > 0
                  ? `+ সার্ভিস ফি ${formatPrice(property.serviceCharge)}/মাস`
                  : 'সার্ভিস চার্জ অন্তর্ভুক্ত'}
              </p>
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-[#eff4ff] rounded-xl border border-slate-200/60">
              <span className="text-[11px] text-slate-500 block">{lang === 'bn' ? 'বেডরুম' : 'Bedrooms'}</span>
              <div className="flex items-center gap-1.5 mt-1 font-bold text-slate-800 text-sm">
                <Bed className="w-4 h-4 text-[#004337]" />
                <span>{property.bedrooms} Bed</span>
              </div>
            </div>

            <div className="p-3 bg-[#eff4ff] rounded-xl border border-slate-200/60">
              <span className="text-[11px] text-slate-500 block">{lang === 'bn' ? 'বাথরুম' : 'Bathrooms'}</span>
              <div className="flex items-center gap-1.5 mt-1 font-bold text-slate-800 text-sm">
                <Bath className="w-4 h-4 text-[#004337]" />
                <span>{property.bathrooms} Bath</span>
              </div>
            </div>

            <div className="p-3 bg-[#eff4ff] rounded-xl border border-slate-200/60">
              <span className="text-[11px] text-slate-500 block">{lang === 'bn' ? 'আয়তন' : 'Size (sqft)'}</span>
              <div className="flex items-center gap-1.5 mt-1 font-bold text-slate-800 text-sm">
                <Maximize2 className="w-4 h-4 text-[#004337]" />
                <span>{property.sqft} sqft</span>
              </div>
            </div>

            <div className="p-3 bg-[#eff4ff] rounded-xl border border-slate-200/60">
              <span className="text-[11px] text-slate-500 block">{lang === 'bn' ? 'তলা' : 'Floor Level'}</span>
              <div className="flex items-center gap-1.5 mt-1 font-bold text-slate-800 text-sm">
                <Layers className="w-4 h-4 text-[#004337]" />
                <span className="truncate">{property.floor}</span>
              </div>
            </div>
          </div>

          {/* Institutional Escrow & Move-in Calculator */}
          <div className="bg-gradient-to-br from-[#eff4ff] to-white p-4 sm:p-5 rounded-2xl border border-[#aaf0dc]">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#004337]" />
                <h3 className="text-sm font-bold text-[#004337]">
                  {lang === 'bn' ? '১০০% এসক্রো ডিপোজিট ক্যালকুলেটর' : '100% Escrow Deposit Breakdown'}
                </h3>
              </div>
              <span className="text-[11px] font-bold text-[#004337] bg-[#aaf0dc] px-2.5 py-0.5 rounded-full">
                {property.legalAudit.escrowCustodianBank}
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-3">
              {lang === 'bn'
                ? 'আপনার জামানত বাড়িওয়ালার ব্যক্তিগত অ্যাকাউন্টে নয়, ব্র্যাক ব্যাংক ট্রাস্ট অ্যাকাউন্টে সংরক্ষিত থাকে এবং চাবি হস্তান্তরের পূর্বে কোনো অর্থ ছাড় করা হয় না।'
                : 'Your security deposit is locked in institutional escrow until official handover inspection.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-200 text-xs">
              <div className="flex justify-between sm:flex-col">
                <span className="text-slate-500">
                  {lang === 'bn' ? 'অগ্রিম জামানত (২ মাস)' : 'Advance Security (2 Mos)'}:
                </span>
                <span className="font-extrabold text-[#004337] text-sm tabular-nums mt-0.5">
                  {formatPrice(advanceAmount)}
                </span>
              </div>
              <div className="flex justify-between sm:flex-col">
                <span className="text-slate-500">
                  {lang === 'bn' ? 'প্রথম মাসের ভাড়া ও সার্ভিস' : '1st Month Rent + Service'}:
                </span>
                <span className="font-extrabold text-[#0b1c30] text-sm tabular-nums mt-0.5">
                  {formatPrice(property.rent + property.serviceCharge)}
                </span>
              </div>
              <div className="flex justify-between sm:flex-col bg-white p-2 rounded-lg border border-slate-200">
                <span className="text-slate-700 font-bold">
                  {lang === 'bn' ? 'মোট মুভ-ইন প্রাথমিক খরচ' : 'Total Move-in Cost'}:
                </span>
                <span className="font-extrabold text-[#a13e28] text-base tabular-nums mt-0.5">
                  {formatPrice(initialTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Legal Audit Details Box */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-[#004337]" />
              <span>{lang === 'bn' ? 'লিগ্যাল অডিট ও দলিল যাচাইকরণ' : 'Legal & Title Deed Audit'}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                <span className="text-slate-500">{lang === 'bn' ? 'রাজউক অনুমোদন নং' : 'RAJUK Plan Ref'}:</span>
                <span className="font-mono font-bold text-slate-800">{property.legalAudit.rajukPlanNo}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                <span className="text-slate-500">{lang === 'bn' ? 'দলিল অডিট তারিখ' : 'Deed Verified'}:</span>
                <span className="font-semibold text-slate-800">{property.legalAudit.deedVerifiedDate}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                <span className="text-slate-500">{lang === 'bn' ? 'চুক্তি ফরম্যাট' : 'Contract Type'}:</span>
                <span className="font-semibold text-[#004337] truncate">{property.legalAudit.tenancyContractType}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                <span className="text-slate-500">{lang === 'bn' ? 'সার্ভিল্যান্স' : 'Security'}:</span>
                <span className="font-semibold text-emerald-700">24/7 CCTV & Security Active</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-1.5">
              {lang === 'bn' ? 'বাসার বিস্তারিত বিবরণ' : 'Description'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{desc}</p>
          </div>

          {/* Amenities Grid */}
          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-2">
              {lang === 'bn' ? 'সুবিধাসমূহ (Amenities)' : 'Amenities & Facilities'}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {property.amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-[#eff4ff] border border-slate-200 text-xs font-semibold text-slate-700"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#004337] shrink-0" />
                  <span>{lang === 'bn' ? item.nameBn : item.nameEn}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Landlord Contact Card */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <img
                src={property.landlord.avatar}
                alt={property.landlord.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#aaf0dc]"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-900 text-sm">{property.landlord.name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <p className="text-[11px] text-slate-500">
                  {lang === 'bn' ? 'রেসপন্স রেট: ' : 'Response Time: '}
                  {property.landlord.responseTime}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={`tel:${property.landlord.phone}`}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#004337]" />
                <span>{property.landlord.phone}</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onScheduleVisit(property);
                }}
                className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-[#004337] text-white text-xs font-bold hover:bg-[#0d5c4d] flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'যোগাযোগ' : 'Inquire'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div>
            <span className="text-[11px] text-slate-400 block">{lang === 'bn' ? 'মাসিক ভাড়া' : 'Rent'}:</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-[#004337] tabular-nums">
                {formatPrice(property.rent)}
              </span>
              <span className="text-xs text-slate-500">{t('card.perMonth', '/মাস')}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                setIsEscrowModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl border border-[#004337] text-[#004337] text-xs font-bold hover:bg-[#eff4ff] transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-[#004337]" />
              <span>{lang === 'bn' ? 'এসক্রো চুক্তি দেখুন' : 'View Escrow Terms'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onScheduleVisit(property);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#a13e28] text-white hover:bg-[#822714] text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>{lang === 'bn' ? 'পরিদর্শন শিডিউল করুন' : 'Schedule Walkthrough'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
