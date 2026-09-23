import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Property } from '../types/property';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Phone,
  MessageSquare,
  ArrowLeft,
  Share2,
  Heart,
  FileCheck,
  Building,
  Sparkles,
  Lock,
  Compass,
  Video,
  Navigation,
  Car,
  Train,
  School,
  Activity,
  ShoppingCart,
  Star,
  Quote,
  ThumbsUp,
} from 'lucide-react';

interface PropertyDetailPageProps {
  properties: Property[];
}

interface CommuteDestination {
  id: string;
  nameBn: string;
  nameEn: string;
  distanceKm: number;
  peakTimeMins: number;
  offPeakTimeMins: number;
  bestTransportBn: string;
  bestTransportEn: string;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({ properties }) => {
  const {
    lang,
    formatPrice,
    selectedProperty,
    setActivePage,
    openScheduleModal,
    setIsEscrowModalOpen,
    isFavorite,
    toggleFavorite,
    t,
  } = useApp();

  const property = selectedProperty || properties[0];
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedDestinationId, setSelectedDestinationId] = useState('gulshan1');

  if (!property) return null;

  const title = lang === 'bn' ? property.titleBn : property.titleEn;
  const neighborhood = lang === 'bn' ? property.subAreaBn : property.subAreaEn;
  const address = lang === 'bn' ? property.addressBn : property.addressEn;
  const desc = lang === 'bn' ? property.descriptionBn : property.descriptionEn;
  const isFav = isFavorite(property.id);

  const advanceAmount = property.rent * property.advanceDepositMonths;
  const initialTotal = advanceAmount + property.rent + property.serviceCharge;

  const commuteDestinations: CommuteDestination[] = [
    {
      id: 'gulshan1',
      nameBn: 'গুলশান-১ গোলচত্বর',
      nameEn: 'Gulshan-1 Circle',
      distanceKm: 1.4,
      peakTimeMins: 10,
      offPeakTimeMins: 5,
      bestTransportBn: 'রিকশা অথবা ড্রাইভ (৫ মিনিট)',
      bestTransportEn: 'Direct Rickshaw / Drive (5 mins)',
    },
    {
      id: 'banani11',
      nameBn: 'বনানী ১১ শপিং ও ক্যাফে অ্যাভিনিউ',
      nameEn: 'Banani Road 11 Dining Hub',
      distanceKm: 2.1,
      peakTimeMins: 14,
      offPeakTimeMins: 8,
      bestTransportBn: 'কার অথবা লেক ব্রিজ ড্রাইভ',
      bestTransportEn: 'Car via Gulshan-Banani Bridge',
    },
    {
      id: 'karwanbazar',
      nameBn: 'কারওয়ান বাজার বাণিজ্যিক এলাকা',
      nameEn: 'Karwan Bazar Commercial Hub',
      distanceKm: 5.6,
      peakTimeMins: 24,
      offPeakTimeMins: 15,
      bestTransportBn: 'মহাখালী ফ্লাইওভার দিয়ে দ্রুত যাতায়াত',
      bestTransportEn: 'Via Mohakhali Flyover Expressway',
    },
    {
      id: 'motijheel',
      nameBn: 'মতিঝিল ব্যাংক পাড়া (CBD)',
      nameEn: 'Motijheel Financial District',
      distanceKm: 10.2,
      peakTimeMins: 38,
      offPeakTimeMins: 22,
      bestTransportBn: 'মহাখালী এলিভেটেড এক্সপ্রেসওয়ে',
      bestTransportEn: 'Via Dhaka Elevated Expressway',
    },
    {
      id: 'airport',
      nameBn: 'হযরত শাহজালাল বিমানবন্দর',
      nameEn: 'Hazrat Shahjalal Airport (DAC)',
      distanceKm: 8.8,
      peakTimeMins: 20,
      offPeakTimeMins: 12,
      bestTransportBn: 'এলিভেটেড এক্সপ্রেসওয়েতে মাত্র ১২ মিনিট',
      bestTransportEn: 'Elevated Expressway Ramp (12 mins)',
    },
  ];

  const activeDest = commuteDestinations.find((d) => d.id === selectedDestinationId) || commuteDestinations[0];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="w-full max-w-360 mx-auto px-4 md:px-8 py-6 space-y-6">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <button
          onClick={() => setActivePage('browse')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#004337] hover:text-[#0d5c4d] bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'bn' ? 'সকল তালিকায় ফিরে যান' : 'Back to All Listings'}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5 text-[#004337]" />
            <span>{copiedLink ? (lang === 'bn' ? 'লিংক কপি হয়েছে!' : 'Copied!') : (lang === 'bn' ? 'শেয়ার' : 'Share')}</span>
          </button>

          <button
            onClick={() => toggleFavorite(property.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold shadow-sm transition-colors ${
              isFav
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{isFav ? (lang === 'bn' ? 'সেভ করা' : 'Saved') : (lang === 'bn' ? 'সেভ করুন' : 'Save')}</span>
          </button>
        </div>
      </div>

      {/* Main Title Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-bold text-[#004337] bg-[#eff4ff] px-3 py-1 rounded-full uppercase tracking-wider border border-[#aaf0dc]">
              {neighborhood}
            </span>
            {property.rajukVerified && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-white bg-[#004337] px-3 py-1 rounded-full shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#aaf0dc]" />
                <span>{lang === 'bn' ? 'রাজউক অনুমোদিত' : 'RAJUK Verified Plan'}</span>
              </span>
            )}
            {property.escrowProtected && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#a13e28] bg-[#a13e28]/10 px-3 py-1 rounded-full border border-[#a13e28]/20">
                <ShieldCheck className="w-3.5 h-3.5 text-[#a13e28]" />
                <span>{lang === 'bn' ? '১০০% ব্যাংক এসক্রো' : '100% Escrow Protected'}</span>
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b1c30] tracking-tight">
            {title}
          </h1>
          <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1.5">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <span>{address}</span>
          </p>
        </div>

        {/* Top Price Badge */}
        <div className="bg-[#eff4ff] p-4 rounded-2xl border border-slate-200/80 shrink-0">
          <span className="text-xs text-slate-500 font-semibold block">
            {lang === 'bn' ? 'মাসিক ভাড়া' : 'Monthly Rent'}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-[#004337] tabular-nums">
              {formatPrice(property.rent)}
            </span>
            <span className="text-sm text-slate-600 font-semibold">{t('card.perMonth', '/মাস')}</span>
          </div>
          {property.serviceCharge > 0 && (
            <p className="text-xs text-slate-500 mt-0.5">
              + {lang === 'bn' ? 'সার্ভিস ফি' : 'Service'}: {formatPrice(property.serviceCharge)}
            </p>
          )}
        </div>
      </div>

      {/* High-Fidelity Photo Gallery Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        <div className="lg:col-span-3 h-80 sm:h-[450px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative group">
          <img
            src={property.images[activeImageIdx] || property.images[0]}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs font-semibold flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-[#aaf0dc]" />
            <span>{lang === 'bn' ? 'দক্ষিণ-পূর্বমুখী উন্মুক্ত আলো-বাতাস' : 'South-East Facing • Direct Daylight'}</span>
          </div>
        </div>

        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
          {property.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIdx(idx)}
              className={`h-24 lg:h-32 w-36 lg:w-full rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                activeImageIdx === idx
                  ? 'border-[#004337] ring-2 ring-[#aaf0dc] scale-102'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
          <div className="hidden lg:flex flex-col items-center justify-center p-4 rounded-xl bg-slate-100 border border-slate-200 text-center">
            <Video className="w-5 h-5 text-[#004337] mb-1" />
            <span className="text-[11px] font-bold text-slate-700">360° Virtual Tour</span>
            <span className="text-[10px] text-slate-500">Live Walkthrough</span>
          </div>
        </div>
      </div>

      {/* 2-Column Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Quick Specs Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-400 block">{lang === 'bn' ? 'বেডরুম' : 'Bedrooms'}</span>
              <div className="flex items-center gap-2 mt-1 font-bold text-slate-800 text-base">
                <Bed className="w-5 h-5 text-[#004337]" />
                <span>{property.bedrooms} Beds</span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-400 block">{lang === 'bn' ? 'বাথরুম' : 'Bathrooms'}</span>
              <div className="flex items-center gap-2 mt-1 font-bold text-slate-800 text-base">
                <Bath className="w-5 h-5 text-[#004337]" />
                <span>{property.bathrooms} Baths</span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-400 block">{lang === 'bn' ? 'আয়তন' : 'Size'}</span>
              <div className="flex items-center gap-2 mt-1 font-bold text-slate-800 text-base">
                <Maximize2 className="w-5 h-5 text-[#004337]" />
                <span>{property.sqft} sqft</span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-400 block">{lang === 'bn' ? 'তলা' : 'Floor'}</span>
              <div className="flex items-center gap-2 mt-1 font-bold text-slate-800 text-base">
                <Layers className="w-5 h-5 text-[#004337]" />
                <span>{property.floor}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-base font-bold text-slate-900">
              {lang === 'bn' ? 'বাসার বিস্তারিত বিবরণ' : 'About this Home'}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
          </div>

          {/* NEW FEATURE 1: Neighborhood & Commute Insights Calculator */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#004337] flex items-center justify-center text-white">
                  <Navigation className="w-5 h-5 text-[#aaf0dc]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {lang === 'bn' ? 'যাতায়াত ও যাতায়াত সময় ক্যালকুলেটর' : 'Commute & Traffic Calculator'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {lang === 'bn' ? 'পিক-আওয়ার ট্রাফিকে বিভিন্ন অফিসে যাতায়াতের আনুমানিক সময়' : 'Live Dhaka traffic insights from this address'}
                  </p>
                </div>
              </div>
            </div>

            {/* Destination Buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              {commuteDestinations.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDestinationId(d.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    selectedDestinationId === d.id
                      ? 'bg-[#004337] text-white border-[#004337] shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {lang === 'bn' ? d.nameBn : d.nameEn}
                </button>
              ))}
            </div>

            {/* Commute Result Card */}
            <div className="p-4 bg-[#eff4ff] rounded-xl border border-[#aaf0dc] grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase block">
                  {lang === 'bn' ? 'পিক আওয়ার ট্রাফিক' : 'Peak Traffic Time'}
                </span>
                <span className="text-xl font-extrabold text-[#a13e28] block tabular-nums">
                  ~{activeDest.peakTimeMins} mins
                </span>
                <span className="text-[10px] text-slate-500">অফিস সময়ে (8:30-10:00 AM)</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase block">
                  {lang === 'bn' ? 'স্বাভাবিক ড্রাইভ টাইম' : 'Off-Peak Time'}
                </span>
                <span className="text-xl font-extrabold text-[#004337] block tabular-nums">
                  ~{activeDest.offPeakTimeMins} mins
                </span>
                <span className="text-[10px] text-slate-500">দূরত্ব: {activeDest.distanceKm} km</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase block">
                  {lang === 'bn' ? 'সেরা যোগাযোগ মাধ্যম' : 'Fastest Commute'}
                </span>
                <span className="text-xs font-bold text-slate-800 block mt-1">
                  {lang === 'bn' ? activeDest.bestTransportBn : activeDest.bestTransportEn}
                </span>
              </div>
            </div>

            {/* Nearby Points of Interest */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                <School className="w-4 h-4 text-[#004337] shrink-0" />
                <div>
                  <span className="font-bold text-slate-800 block">ISD / Scholastica</span>
                  <span className="text-[10px] text-slate-500">1.2 km away</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                <Activity className="w-4 h-4 text-rose-600 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800 block">United Hospital</span>
                  <span className="text-[10px] text-slate-500">900m (4 mins)</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800 block">Unimart / Shwapno</span>
                  <span className="text-[10px] text-slate-500">400m walk</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                <Train className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800 block">MRT Line-6</span>
                  <span className="text-[10px] text-slate-500">8 mins by rickshaw</span>
                </div>
              </div>
            </div>
          </div>

          {/* NEW FEATURE 2: Verified Tenant & Floormate Reviews */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-white">
                  <Star className="w-5 h-5 fill-white text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {lang === 'bn' ? 'প্রাক্তন ভাড়াটিয়াদের অডিট ও ফ্লোরমেট রিভিউ' : 'Verified Resident & Floormate Reviews'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {lang === 'bn' ? 'শুধুমাত্র এই ভবনে বসবাসকারী পরীক্ষিত ভাড়াটিয়াদের অভিজ্ঞতা' : '100% genuine reviews from past lease holders'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span className="font-extrabold text-slate-900 text-sm">4.88 / 5.0</span>
                <span className="text-[11px] text-slate-500">(12 Reviews)</span>
              </div>
            </div>

            {/* Concrete Quality Metric Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>{lang === 'bn' ? 'পানির প্রেশার ও ওয়াটার কোয়ালিটি' : 'Water Pressure & Quality'}:</span>
                  <span className="font-bold text-[#004337]">4.9 / 5</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-[#004337] rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>{lang === 'bn' ? 'লিফট ও জেনারেটর সার্বক্ষণিক ব্যাকআপ' : 'Lift & Generator Backup'}:</span>
                  <span className="font-bold text-[#004337]">4.8 / 5</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-[#004337] rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>{lang === 'bn' ? 'দারোয়ান ও সিকিউরিটি ব্যবস্থাপনা' : 'Caretaker & Security Vigilance'}:</span>
                  <span className="font-bold text-[#004337]">5.0 / 5</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-[#004337] rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>{lang === 'bn' ? 'শান্ত পরিবেশ ও রাতের শব্দহীনতা' : 'Quiet Environment & Privacy'}:</span>
                  <span className="font-bold text-[#004337]">4.7 / 5</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-[#004337] rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>

            {/* Resident Testimonial Cards */}
            <div className="space-y-3 pt-2">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#004337] text-white flex items-center justify-center font-bold text-xs">
                      TR
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Tanzim Rahman (Ex-Resident Flat 4B)</span>
                      <span className="text-[10px] text-slate-500">Lease: Jan 2024 – Feb 2025 • Verified Lease Audit</span>
                    </div>
                  </div>
                  <div className="flex text-amber-500">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed italic">
                  {lang === 'bn'
                    ? '"লেকভিউ অ্যাপার্টমেন্টের পানির প্রেশার ও ওয়াটার ফিল্ট্রেশন দুর্দান্ত। বর্ষাকালেও রাস্তায় কোনো পানি জমে না। বাড়িওয়ালা প্রকৌশলী ফারহান সাহেব খুব মার্জিত ও দায়িত্বশীল মানুষ।"'
                    : '"Lived here for over a year. The 24/7 generator kicks in within 5 seconds of load shedding. Extremely peaceful residential road with no commercial noise."'}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#a13e28] text-white flex items-center justify-center font-bold text-xs">
                      SJ
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Sarah Jenkins (Embassy Expat, Flat 6A)</span>
                      <span className="text-[10px] text-slate-500">Lease: 2023 – 2025 • Verified Diplomats Enclave</span>
                    </div>
                  </div>
                  <div className="flex text-amber-500">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed italic">
                  "Safe, pristine building with reliable security guards. Walking distance to Gulshan Lake Park for morning jogging. The escrow refund was returned promptly without hassle."
                </p>
              </div>
            </div>
          </div>

          {/* Escrow Move-in Calculator Card */}
          <div className="bg-gradient-to-br from-[#eff4ff] to-white p-6 rounded-2xl border border-[#aaf0dc] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#004337] flex items-center justify-center text-white">
                  <ShieldCheck className="w-5 h-5 text-[#aaf0dc]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#004337]">
                    {lang === 'bn' ? 'প্রাতিষ্ঠানিক এসক্রো ও জামানত হিসাব' : 'Institutional Escrow & Move-In Breakdown'}
                  </h3>
                  <p className="text-xs text-slate-600">
                    {lang === 'bn' ? 'কাস্টোডিয়ান ব্যাংক: ' : 'Custodian Bank: '}
                    <strong>{property.legalAudit.escrowCustodianBank}</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsEscrowModalOpen(true)}
                className="text-xs font-bold text-[#004337] underline hover:text-[#0d5c4d]"
              >
                {lang === 'bn' ? 'নিয়মাবলী জানুন' : 'How it works'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-200">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block">
                  {lang === 'bn' ? 'অগ্রিম জামানত (২ মাস)' : 'Advance Escrow (2 Mos)'}:
                </span>
                <span className="text-lg font-extrabold text-[#004337] tabular-nums mt-1 block">
                  {formatPrice(advanceAmount)}
                </span>
                <span className="text-[10px] text-slate-400">ব্যাংক ভল্টে লক থাকে</span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block">
                  {lang === 'bn' ? '১ম মাসের ভাড়া ও সার্ভিস' : '1st Month + Service'}:
                </span>
                <span className="text-lg font-extrabold text-[#0b1c30] tabular-nums mt-1 block">
                  {formatPrice(property.rent + property.serviceCharge)}
                </span>
                <span className="text-[10px] text-slate-400">মুভ-ইন দিনে প্রযোজ্য</span>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="text-xs text-emerald-800 font-bold block">
                  {lang === 'bn' ? 'সর্বমোট প্রদেয় অর্থ' : 'Total Move-In'}:
                </span>
                <span className="text-xl font-extrabold text-[#a13e28] tabular-nums mt-1 block">
                  {formatPrice(initialTotal)}
                </span>
                <span className="text-[10px] text-emerald-700 font-medium">১০০% ফেরতযোগ্য জামানত</span>
              </div>
            </div>
          </div>

          {/* Legal Audit & Title Deed Certificate */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#004337]" />
              <span>{lang === 'bn' ? 'রাজউক অনুমোদন ও লিগ্যাল অডিট রেকর্ড' : 'RAJUK Plan & Legal Title Verification'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500 block">RAJUK Plan Permit No:</span>
                <span className="font-mono font-bold text-slate-800 text-sm mt-0.5 block">
                  {property.legalAudit.rajukPlanNo}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500 block">Title Deed Verification Date:</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">
                  {property.legalAudit.deedVerifiedDate}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500 block">Standard Bilateral Contract:</span>
                <span className="font-bold text-[#004337] mt-0.5 block">
                  {property.legalAudit.tenancyContractType}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500 block">Safety & Fire Exit:</span>
                <span className="font-bold text-emerald-700 mt-0.5 block">
                  Fire Safety Approved • 24/7 Monitored CCTV
                </span>
              </div>
            </div>
          </div>

          {/* Amenities Grid */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-slate-900">
              {lang === 'bn' ? 'সুবিধাসমূহ ও বৈশিষ্ট্য' : 'Amenities & Facilities'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {property.amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-[#eff4ff] border border-slate-200 text-xs font-semibold text-slate-800"
                >
                  <Sparkles className="w-4 h-4 text-[#004337] shrink-0" />
                  <span>{lang === 'bn' ? item.nameBn : item.nameEn}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Action & Landlord Box */}
        <div className="lg:col-span-4 space-y-4 sticky top-24">
          {/* Action Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg space-y-4">
            <div>
              <span className="text-xs text-slate-400 block">{lang === 'bn' ? 'মাসিক চুক্তিভিত্তিক ভাড়া' : 'Monthly Rent'}</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-extrabold text-[#004337] tabular-nums">
                  {formatPrice(property.rent)}
                </span>
                <span className="text-xs text-slate-500">{t('card.perMonth', '/মাস')}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => openScheduleModal(property)}
                className="w-full py-3 bg-[#a13e28] text-white hover:bg-[#822714] font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{lang === 'bn' ? 'সরাসরি পরিদর্শন শিডিউল করুন' : 'Schedule Walkthrough (Free)'}</span>
              </button>

              <button
                onClick={() => {
                  setActivePage('digital-lease');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-3 bg-[#004337] text-white hover:bg-[#0d5c4d] font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-[#aaf0dc]" />
                <span>{lang === 'bn' ? 'ডিজিটাল লিজ চুক্তি শুরু করুন' : 'Initiate Digital Lease & Escrow'}</span>
              </button>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{lang === 'bn' ? 'শূন্য ব্রোকার ফি। সরাসরি ভেরিফাইড ফ্ল্যাট মালিক।' : 'Zero broker commissions. Directly with verified landlord.'}</span>
            </div>
          </div>

          {/* Landlord Card with In-App Messaging Link */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={property.landlord.avatar}
                alt={property.landlord.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#aaf0dc]"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">{property.landlord.name}</h4>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <p className="text-[11px] text-slate-500">
                  {lang === 'bn' ? 'প্রতিক্রিয়ার সময়: ' : 'Response Time: '}
                  {property.landlord.responseTime}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <a
                href={`tel:${property.landlord.phone}`}
                className="py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#004337]" />
                <span>{lang === 'bn' ? 'কল দিন' : 'Call'}</span>
              </a>

              <button
                onClick={() => {
                  setActivePage('messages');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="py-2 px-3 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-xs font-bold text-[#004337] flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'বার্তা পাঠান' : 'Chat In-App'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
