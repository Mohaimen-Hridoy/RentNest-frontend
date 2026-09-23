import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { listingFormSchema, ListingFormValues } from '../schemas/validation';
import { useCreateListing } from '../api/queries';
import { useApp } from '../context/AppContext';
import {
  X,
  PlusCircle,
  Building,
  CheckCircle2,
  DollarSign,
  MapPin,
  FileText,
  ShieldCheck,
  Loader2,
} from 'lucide-react';

interface AddListingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddListingModal: React.FC<AddListingModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useApp();
  const [createdSuccess, setCreatedSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ListingFormValues>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      titleEn: '',
      titleBn: '',
      neighborhoodEn: 'Gulshan-2',
      neighborhoodBn: 'গুলশান-২',
      addressEn: '',
      rent: 85000,
      serviceCharge: 8000,
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2000,
      floor: '6th Floor (৬ষ্ঠ তলা)',
      furnishing: 'fully_furnished',
      propertyType: 'apartment',
      rajukVerified: true,
      escrowProtected: true,
      descriptionEn: 'Spacious luxury residential apartment in serene prime enclave with full generator backup and Otis elevators.',
      ownerPhone: '01711223344',
    },
  });

  const createListingMutation = useCreateListing();

  if (!isOpen) return null;

  const onSubmit = async (values: ListingFormValues) => {
    try {
      await createListingMutation.mutateAsync(values);
      setCreatedSuccess(true);
    } catch (err: any) {
      console.error('Failed to create listing:', err);
    }
  };

  const handleModalClose = () => {
    setCreatedSuccess(false);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#004337] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-[#aaf0dc]" />
            <div>
              <h3 className="text-base font-bold">
                {lang === 'bn' ? 'নতুন ভেরিফাইড প্রোপার্টি লিস্টিং' : 'Publish Verified Property'}
              </h3>
              <p className="text-[11px] text-[#aaf0dc]">
                {lang === 'bn' ? 'সরাসরি বাড়িওয়ালা পোর্টাল' : 'Direct Landlord Portal'}
              </p>
            </div>
          </div>
          <button
            onClick={handleModalClose}
            className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {createdSuccess ? (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              {lang === 'bn' ? 'লিস্টিং সফলভাবে যুক্ত হয়েছে!' : 'Listing Published Successfully!'}
            </h4>
            <p className="text-xs text-slate-600 max-w-md">
              {lang === 'bn'
                ? 'আপনার বাসাটি রেন্টনেস্ট ফিডে লাইভ করা হয়েছে এবং এসক্রো প্রটেকশন ব্যাজ সংযুক্ত হয়েছে।'
                : 'Your property is now live on the RentNest marketplace with verified escrow protection enabled.'}
            </p>
            <button
              onClick={handleModalClose}
              className="px-6 py-2.5 bg-[#004337] text-white text-xs font-bold rounded-xl hover:bg-[#0d5c4d]"
            >
              {lang === 'bn' ? 'ফিডে দেখুন (Back to Feed)' : 'Back to Listings'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 overflow-y-auto space-y-4 text-xs">
            {/* Titles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Title (English) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('titleEn')}
                  placeholder="e.g. Modern Lakefront Apartment"
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
                  placeholder="যেমন: লেকভিউ লাক্সারি ফ্ল্যাট"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004337] focus:outline-none"
                />
                {errors.titleBn && <p className="text-rose-500 text-[11px] mt-0.5">{errors.titleBn.message}</p>}
              </div>
            </div>

            {/* Neighborhood & Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {lang === 'bn' ? 'এলাকা (Neighborhood)' : 'Area / Neighborhood'}
                </label>
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
                  {lang === 'bn' ? 'সড়ক ও বাড়ির ঠিকানা' : 'Street Address'}
                </label>
                <input
                  type="text"
                  {...register('addressEn')}
                  placeholder="Road 11, House 24, Block D..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004337] focus:outline-none"
                />
                {errors.addressEn && <p className="text-rose-500 text-[11px] mt-0.5">{errors.addressEn.message}</p>}
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {lang === 'bn' ? 'মাসিক ভাড়া (BDT ৳)' : 'Monthly Rent (BDT ৳)'}
                </label>
                <input
                  type="number"
                  {...register('rent', { valueAsNumber: true })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004337] focus:outline-none"
                />
                {errors.rent && <p className="text-rose-500 text-[11px] mt-0.5">{errors.rent.message}</p>}
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {lang === 'bn' ? 'সার্ভিস চার্জ (BDT ৳)' : 'Service Charge (BDT ৳)'}
                </label>
                <input
                  type="number"
                  {...register('serviceCharge', { valueAsNumber: true })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004337] focus:outline-none"
                />
              </div>
            </div>

            {/* Specs */}
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
                <label className="font-bold text-slate-700 block mb-1">Floor</label>
                <input
                  type="text"
                  {...register('floor')}
                  placeholder="5th Floor"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004337] focus:outline-none"
                />
              </div>
            </div>

            {/* Type & Furnishing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

            {/* Phone */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {lang === 'bn' ? 'মালিকের যোগাযোগ নম্বর' : 'Owner Contact Phone (+880)'}
              </label>
              <input
                type="tel"
                {...register('ownerPhone')}
                placeholder="01711223344"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004337] focus:outline-none"
              />
              {errors.ownerPhone && <p className="text-rose-500 text-[11px] mt-0.5">{errors.ownerPhone.message}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {lang === 'bn' ? 'বাসার বিবরণ' : 'Description'}
              </label>
              <textarea
                rows={3}
                {...register('descriptionEn')}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#004337] focus:outline-none"
              ></textarea>
              {errors.descriptionEn && <p className="text-rose-500 text-[11px] mt-0.5">{errors.descriptionEn.message}</p>}
            </div>

            {/* Escrow & RAJUK Confirmation */}
            <div className="p-3 bg-[#eff4ff] rounded-xl border border-slate-200 space-y-1">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800">
                <input type="checkbox" {...register('escrowProtected')} className="accent-[#004337]" />
                <span>{lang === 'bn' ? 'রেন্টনেস্ট ব্যাংক এসক্রো সুরক্ষায় যুক্ত করুন' : 'Enroll in RentNest Escrow Deposit Guarantee'}</span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={createListingMutation.isPending}
              className="w-full py-2.5 bg-[#a13e28] text-white hover:bg-[#822714] font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              {createListingMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{lang === 'bn' ? 'লিস্টিং যুক্ত হচ্ছে...' : 'Publishing Listing...'}</span>
                </>
              ) : (
                <>
                  <Building className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'লিস্টিং পোস্ট করুন' : 'Publish Listing'}</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
