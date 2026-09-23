import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Property } from '../types/property';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Heart,
  ArrowLeft,
  Phone,
  QrCode,
  Shield,
  Trash2,
  Building,
  UserCheck,
  Video,
} from 'lucide-react';

interface MyBookingsPageProps {
  properties: Property[];
}

export const MyBookingsPage: React.FC<MyBookingsPageProps> = ({ properties }) => {
  const {
    lang,
    formatPrice,
    setActivePage,
    bookings,
    savedFavorites,
    toggleFavorite,
    viewPropertyDetail,
    t,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'visits' | 'favorites'>('visits');

  const favoritedProperties = properties.filter((p) => savedFavorites.includes(p.id));

  return (
    <div className="w-full max-w-360 mx-auto px-4 md:px-8 py-6 space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <button
          onClick={() => setActivePage('browse')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#004337] hover:text-[#0d5c4d] bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'bn' ? 'তালিকায় ফিরে যান' : 'Back to Listings'}</span>
        </button>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-[#eff4ff] rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('visits')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'visits'
                ? 'bg-[#004337] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {lang === 'bn' ? `পরিদর্শন শিডিউল (${bookings.length})` : `Walkthroughs (${bookings.length})`}
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'favorites'
                ? 'bg-[#004337] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {lang === 'bn' ? `পছন্দের বাসা (${favoritedProperties.length})` : `Saved Homes (${favoritedProperties.length})`}
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#0b1c30]">
          {activeTab === 'visits'
            ? lang === 'bn'
              ? 'আমার শিডিউল ও পরিদর্শন ট্র্যাকার'
              : 'My Scheduled Property Walkthroughs'
            : lang === 'bn'
            ? 'পছন্দের সংরক্ষিত বাসা'
            : 'My Saved Properties'}
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          {activeTab === 'visits'
            ? lang === 'bn'
              ? 'রাজউক ভেরিফাইড প্রোপার্টি পরিদর্শন ভাউচার ও ডিজিটাল কনফার্মেশন কোড।'
              : 'Verified property walkthrough pass and QR confirmation codes.'
            : lang === 'bn'
            ? 'আপনার পছন্দ করা সেরা অ্যাপার্টমেন্ট ও পেন্টহাউজসমূহ।'
            : 'Homes you have shortlisted for inspection.'}
        </p>
      </div>

      {/* Visits Tab Content */}
      {activeTab === 'visits' && (
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="p-12 bg-white rounded-2xl border border-slate-200 text-center">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-700">
                {lang === 'bn' ? 'কোনো আসন্ন পরিদর্শন শিডিউল নেই' : 'No upcoming visits scheduled'}
              </p>
              <button
                onClick={() => setActivePage('browse')}
                className="mt-3 px-4 py-2 bg-[#004337] text-white text-xs font-bold rounded-xl"
              >
                {lang === 'bn' ? 'বাসা খুঁজুন' : 'Browse Homes'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookings.map((b) => {
                const prop = properties.find((p) => p.id === b.propertyId) || properties[0];
                return (
                  <div
                    key={b.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 hover:shadow-md transition-shadow relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 left-0 h-1 bg-[#004337]"></div>

                    {/* Top Row: Verification Voucher Code */}
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                          {lang === 'bn' ? 'কনফার্মড পরিদর্শন' : 'Confirmed Walkthrough'}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-extrabold bg-[#eff4ff] text-[#004337] px-2.5 py-1 rounded-md border border-slate-200">
                        {b.verificationCode}
                      </span>
                    </div>

                    {/* Property info */}
                    <div className="flex items-center gap-3">
                      <img
                        src={prop.images[0]}
                        alt={prop.titleEn}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4
                          onClick={() => viewPropertyDetail(prop)}
                          className="font-bold text-sm text-slate-900 truncate hover:text-[#004337] cursor-pointer"
                        >
                          {lang === 'bn' ? prop.titleBn : prop.titleEn}
                        </h4>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{lang === 'bn' ? prop.addressBn : prop.addressEn}</span>
                        </p>
                        <p className="text-xs font-extrabold text-[#004337] mt-1 tabular-nums">
                          {formatPrice(prop.rent)} {t('card.perMonth', '/মাস')}
                        </p>
                      </div>
                    </div>

                    {/* Booking Details Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#004337]" />
                        <div>
                          <span className="text-slate-400 block text-[10px]">{lang === 'bn' ? 'তারিখ' : 'Date'}</span>
                          <span className="font-bold text-slate-800">{b.visitDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#004337]" />
                        <div>
                          <span className="text-slate-400 block text-[10px]">{lang === 'bn' ? 'সময়' : 'Slot'}</span>
                          <span className="font-bold text-slate-800 capitalize">
                            {b.timeSlot === 'morning'
                              ? '10:00 - 12:00 AM'
                              : b.timeSlot === 'afternoon'
                              ? '02:00 - 05:00 PM'
                              : '05:00 - 07:30 PM'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 col-span-2 pt-1 border-t border-slate-200/60">
                        {b.visitType === 'in_person' ? (
                          <UserCheck className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Video className="w-4 h-4 text-emerald-600" />
                        )}
                        <span className="text-slate-700 font-medium">
                          {b.visitType === 'in_person'
                            ? lang === 'bn'
                              ? 'সরাসরি সাইট পরিদর্শন'
                              : 'In-Person Physical Visit'
                            : lang === 'bn'
                            ? 'লাইভ ভার্চুয়াল ৩৬০° ট্যুর'
                            : 'Live Virtual 360 Walkthrough'}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between gap-2 pt-2">
                      <button
                        onClick={() => viewPropertyDetail(prop)}
                        className="text-xs font-bold text-[#004337] hover:underline"
                      >
                        {lang === 'bn' ? 'বিস্তারিত ফ্ল্যাট তথ্য' : 'View Property Details'}
                      </button>

                      <a
                        href={`tel:${prop.landlord.phone}`}
                        className="px-3 py-1.5 bg-[#eff4ff] hover:bg-[#e5eeff] text-[#004337] rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-200"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{lang === 'bn' ? 'ম্যানেজারকে কল' : 'Call Manager'}</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Favorites Tab Content */}
      {activeTab === 'favorites' && (
        <div>
          {favoritedProperties.length === 0 ? (
            <div className="p-12 bg-white rounded-2xl border border-slate-200 text-center">
              <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-700">
                {lang === 'bn' ? 'পছন্দের তালিকায় কোনো বাসা নেই' : 'No properties saved yet'}
              </p>
              <button
                onClick={() => setActivePage('browse')}
                className="mt-3 px-4 py-2 bg-[#004337] text-white text-xs font-bold rounded-xl"
              >
                {lang === 'bn' ? 'লিস্টিং ব্রাউজ করুন' : 'Explore Homes'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {favoritedProperties.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all group"
                >
                  <div className="relative h-48 bg-slate-100">
                    <img src={p.images[0]} alt={p.titleEn} className="w-full h-full object-cover" />
                    <button
                      onClick={() => toggleFavorite(p.id)}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-full text-rose-500 hover:scale-110 transition-transform shadow-md"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[11px] font-bold text-[#004337] uppercase">
                        {lang === 'bn' ? p.subAreaBn : p.subAreaEn}
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        {p.bedrooms} {lang === 'bn' ? 'বেড' : 'Bed'} • {p.sqft} sqft
                      </span>
                    </div>
                    <h4
                      onClick={() => viewPropertyDetail(p)}
                      className="font-bold text-sm text-slate-900 truncate hover:text-[#004337] cursor-pointer"
                    >
                      {lang === 'bn' ? p.titleBn : p.titleEn}
                    </h4>
                    <p className="text-xs text-slate-500 truncate">
                      {lang === 'bn' ? p.addressBn : p.addressEn}
                    </p>
                    <div className="pt-2 flex justify-between items-center border-t border-slate-100">
                      <span className="font-extrabold text-[#004337] text-base tabular-nums">
                        {formatPrice(p.rent)}
                        <span className="text-[10px] text-slate-500 font-normal"> /মাস</span>
                      </span>
                      <button
                        onClick={() => viewPropertyDetail(p)}
                        className="px-3 py-1.5 bg-[#a13e28] text-white text-xs font-bold rounded-lg hover:bg-[#822714]"
                      >
                        {lang === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
