import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { listingFormSchema, ListingFormValues } from '../schemas/validation';
import { uploadPropertyImages, useCreateListing } from '../api/queries';
import { useApp } from '../context/AppContext';
import {
  Building,
  CheckCircle2,
  MapPin,
  FileCheck,
  ShieldCheck,
  ArrowLeft,
  Loader2,
  DollarSign,
  Image as ImageIcon,
  Check,
} from 'lucide-react';

export const PostListingPage: React.FC = () => {
  const { lang, setActivePage, formatPrice } = useApp();
  const [createdSuccess, setCreatedSuccess] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ListingFormValues>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      titleEn: 'Executive High-Rise Apartment in Banani',
      titleBn: 'বনানী এক্সিকিউটিভ হাই-রাইজ অ্যাপার্টমেন্ট',
      neighborhoodEn: 'Banani',
      neighborhoodBn: 'বনানী',
      addressEn: 'Road 11, Block E, Banani, Dhaka',
      rent: 90000,
      serviceCharge: 9000,
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2100,
      floor: '7th Floor (৭ম তলা)',
      furnishing: 'fully_furnished',
      propertyType: 'apartment',
      rajukVerified: true,
      escrowProtected: true,
      descriptionEn: 'Luxury corner residence with panoramic skyline views, soundproof double-glazed windows, Otis elevator, and generator backup.',
      ownerPhone: '01711223344',
    },
  });

  const createListingMutation = useCreateListing();
  const currentRent = watch('rent') || 90000;
  const currentTitle = lang === 'bn' ? (watch('titleBn') || 'নতুন ফ্ল্যাট লিস্টিং') : (watch('titleEn') || 'New Home Listing');

  const handleLoadDemoListing = () => {
    reset({
      titleEn: 'Panoramic Lakeview Residence in Gulshan 2',
      titleBn: 'গুলশান ২ লেকভিউ প্যানোরামিক লাক্সারি রেসিডেন্স',
      neighborhoodEn: 'Gulshan-2',
      neighborhoodBn: 'গুলশান-২',
      addressEn: 'Road 83, Gulshan-2, Dhaka 1212',
      rent: 110000,
      serviceCharge: 12000,
      bedrooms: 4,
      bathrooms: 4,
      sqft: 2650,
      floor: '9th Floor (৯ম তলা)',
      furnishing: 'fully_furnished',
      propertyType: 'penthouse',
      rajukVerified: true,
      escrowProtected: true,
      descriptionEn: 'Spectacular 4-bedroom high-floor penthouse overlooking pristine Gulshan lake. Central VRF air conditioning, Italian marble flooring, 2 covered car parks, high-speed elevators, and 100% full generator backup.',
      ownerPhone: '01819283741',
    });
  };

  const onSubmit = async (values: ListingFormValues) => {
    try {
      const images = selectedImages.length > 0 ? await uploadPropertyImages(selectedImages) : undefined;
      await createListingMutation.mutateAsync({ ...values, images });
      setCreatedSuccess(true);
    } catch (err: any) {
      console.error('Failed to create listing:', err);
    }
  };

  return (
    <div className="w-full max-w-360 mx-auto px-4 md:px-8 py-6 space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <button
          onClick={() => setActivePage('browse')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#004337] hover:text-[#0d5c4d] bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'bn' ? 'হোমে ফিরে যান' : 'Back to Listings'}</span>
        </button>

        <span className="text-xs font-bold text-[#004337] bg-[#aaf0dc]/50 px-3 py-1 rounded-full border border-[#004337]/20 flex items-center gap-1.5">
          <Building className="w-4 h-4 text-[#004337]" />
          <span>{lang === 'bn' ? 'বাড়িওয়ালা ভেরিফিকেশন পোর্টাল' : 'Landlord Portal'}</span>
        </span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#0b1c30]">
          {lang === 'bn' ? 'নতুন ভেরিফাইড প্রোপার্টি লিস্টিং করুন' : 'List a Verified Home on RentNest'}
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          {lang === 'bn'
            ? 'সরাসরি বিশ্বস্ত ভাড়াটিয়া খুঁজুন। কোনো দালালি নেই এবং ব্যাংক এসক্রো সুরক্ষায় জামানত নিশ্চিত।'
            : 'Zero brokerage, direct tenant inquiries, and guaranteed institutional bank deposit custody.'}
        </p>
      </div>

      {createdSuccess ? (
        <div className="p-12 bg-white rounded-2xl border border-slate-200 shadow-md text-center max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            {lang === 'bn' ? 'লিস্টিং সফলভাবে লাইভ করা হয়েছে!' : 'Listing Successfully Published!'}
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {lang === 'bn'
              ? 'আপনার প্রোপার্টিটি রেন্টনেস্টের সার্চ ও ম্যাপ ফিডে অন্তর্ভুক্ত করা হয়েছে। আগ্রহী ভাড়াটিয়ারা সরাসরি আপনার নম্বরে বা অ্যাপে পরিদর্শন শিডিউল করতে পারবেন।'
              : 'Your property is now live with RAJUK and Escrow badges. Tenants can directly schedule walkthroughs.'}
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => setActivePage('browse')}
              className="px-6 py-2.5 bg-[#004337] text-white text-xs font-bold rounded-xl hover:bg-[#0d5c4d]"
            >
              {lang === 'bn' ? 'ফিডে দেখুন (View in Feed)' : 'View in Marketplace'}
            </button>
            <button
              onClick={() => {
                setCreatedSuccess(false);
                reset();
              }}
              className="px-5 py-2.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200"
            >
              {lang === 'bn' ? 'আরেকটি বাসা যুক্ত করুন' : 'Add Another'}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-xs"
          >
            {/* 1-Click Demo Fill Banner */}
            <div className="p-3.5 bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-emerald-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-extrabold text-[#004337] block">
                  {lang === 'bn' ? '⚡ টেস্ট করতে চান? ১-ক্লিকে ডেমো ডাটা লোড করুন' : '⚡ Want to test? 1-Click Auto-fill Demo Flat'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {lang === 'bn' ? 'গুলশান-২ লেকভিউ ৪ বেডরুম পেন্টহাউস তথ্য ও রাজউক ভেরিফিকেশন সেট হবে' : 'Pre-populates Gulshan 2 4-bed penthouse specifications'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleLoadDemoListing}
                className="px-3.5 py-2 bg-[#004337] hover:bg-[#0d5c4d] text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 flex-shrink-0 cursor-pointer"
              >
                <span>{lang === 'bn' ? 'ডেমো ডাটা পূরণ করুন' : 'Load Demo Data'}</span>
              </button>
            </div>

            {/* Titles */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                {lang === 'bn' ? '১. মৌলিক শিরোনাম ও তথ্য' : '1. Basic Information'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Title (English) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('titleEn')}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004337] focus:outline-none"
                  />
                  {errors.titleEn && <p className="text-rose-500 text-[11px] mt-0.5">{errors.titleEn.message}</p>}
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    শিরোনাম (বাংলা) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('titleBn')}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004337] focus:outline-none"
                  />
                  {errors.titleBn && <p className="text-rose-500 text-[11px] mt-0.5">{errors.titleBn.message}</p>}
                </div>
              </div>
            </div>

            {/* Location & Address */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                {lang === 'bn' ? '২. ঠিকানা ও এলাকা' : '2. Neighborhood & Location'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Neighborhood</label>
                  <select
                    {...register('neighborhoodEn')}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004337] focus:outline-none"
                  >
                    <option value="Gulshan-2">Gulshan-2 (গুলশান-২)</option>
                    <option value="Gulshan-1">Gulshan-1 (গুলশান-১)</option>
                    <option value="Banani">Banani (বনানী)</option>
                    <option value="Banani DOHS">Banani DOHS (বনানী ডিওএইচএস)</option>
                    <option value="Baridhara">Baridhara (বারিধারা)</option>
                    <option value="Niketan">Niketan (নিকেতন)</option>
                    <option value="Dhanmondi">Dhanmondi (ধানমন্ডি)</option>
                    <option value="Uttara">Uttara (উত্তরা)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Full Street Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('addressEn')}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004337] focus:outline-none"
                  />
                  {errors.addressEn && <p className="text-rose-500 text-[11px] mt-0.5">{errors.addressEn.message}</p>}
                </div>
              </div>
            </div>

            {/* Pricing & Deposit */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                {lang === 'bn' ? '৩. ভাড়া ও সার্ভিস চার্জ' : '3. Pricing & Financials'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Monthly Rent (BDT ৳) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    {...register('rent', { valueAsNumber: true })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004337] focus:outline-none"
                  />
                  {errors.rent && <p className="text-rose-500 text-[11px] mt-0.5">{errors.rent.message}</p>}
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Service Charge (BDT ৳)</label>
                  <input
                    type="number"
                    {...register('serviceCharge', { valueAsNumber: true })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004337] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Room Specs */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                {lang === 'bn' ? '৪. ফ্ল্যাটের আয়তন ও স্পেসিফিকেশন' : '4. Specs & Layout'}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Bedrooms</label>
                  <input
                    type="number"
                    {...register('bedrooms', { valueAsNumber: true })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004337] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Bathrooms</label>
                  <input
                    type="number"
                    {...register('bathrooms', { valueAsNumber: true })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004337] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Size (sqft)</label>
                  <input
                    type="number"
                    {...register('sqft', { valueAsNumber: true })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004337] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Floor Level</label>
                  <input
                    type="text"
                    {...register('floor')}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004337] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Property Type</label>
                  <select
                    {...register('propertyType')}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004337] focus:outline-none"
                  >
                    <option value="apartment">Apartment (অ্যাপার্টমেন্ট)</option>
                    <option value="penthouse">Penthouse (পেন্টহাউজ)</option>
                    <option value="duplex">Duplex (ডুপ্লেক্স)</option>
                    <option value="studio">Studio (স্টুডিও)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Furnishing</label>
                  <select
                    {...register('furnishing')}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004337] focus:outline-none"
                  >
                    <option value="fully_furnished">Fully Furnished</option>
                    <option value="semi_furnished">Semi Furnished</option>
                    <option value="unfurnished">Unfurnished</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Owner Details & Description */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                {lang === 'bn' ? '৫. মালিকের যোগাযোগ ও বিবরণ' : '5. Contact & Description'}
              </h3>
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Owner Bangladesh Phone (+880) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  {...register('ownerPhone')}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004337] focus:outline-none"
                />
                {errors.ownerPhone && <p className="text-rose-500 text-[11px] mt-0.5">{errors.ownerPhone.message}</p>}
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  {...register('descriptionEn')}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004337] focus:outline-none"
                ></textarea>
                {errors.descriptionEn && <p className="text-rose-500 text-[11px] mt-0.5">{errors.descriptionEn.message}</p>}
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Property Photos</label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={(event) => setSelectedImages(Array.from(event.target.files ?? []).slice(0, 8))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              />
              <p className="text-[11px] text-slate-500 mt-1">Up to 8 photos, 8 MB each.</p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={createListingMutation.isPending}
                className="w-full py-3 bg-[#a13e28] text-white hover:bg-[#822714] font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {createListingMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{lang === 'bn' ? 'পোস্ট সম্পন্ন হচ্ছে...' : 'Publishing Home...'}</span>
                  </>
                ) : (
                  <>
                    <Building className="w-4 h-4" />
                    <span>{lang === 'bn' ? 'ভেরিফাইড লিস্টিং প্রকাশ করুন' : 'Publish Verified Property'}</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Right: Live Preview Card */}
          <div className="lg:col-span-4 space-y-4 sticky top-24">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-md space-y-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                {lang === 'bn' ? 'লাইভ প্রিভিউ (Live Card Preview)' : 'Live Preview Card'}
              </span>

              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                <div className="h-44 bg-slate-200 relative">
                  <img
                    src="/images/rentnest_gulshan_lakeview_1790194743752.jpg"
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#004337] text-white font-bold rounded-full text-[10px]">
                    RAJUK Verified
                  </span>
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-white/90 backdrop-blur text-[#a13e28] font-bold rounded text-[10px]">
                    Escrow Protected
                  </span>
                </div>

                <div className="p-3 space-y-1.5">
                  <p className="font-bold text-xs text-slate-900 truncate">{currentTitle}</p>
                  <p className="text-[11px] text-slate-500">Dhaka, Bangladesh</p>
                  <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                    <span className="font-extrabold text-[#004337] text-sm tabular-nums">
                      {formatPrice(currentRent)} /মাস
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold">100% Direct</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
