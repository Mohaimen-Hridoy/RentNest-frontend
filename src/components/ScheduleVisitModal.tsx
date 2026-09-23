import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingFormSchema, BookingFormValues } from '../schemas/validation';
import { useCreateBooking } from '../api/queries';
import { Property, BookingResponse } from '../types/property';
import { useApp } from '../context/AppContext';
import {
  X,
  Calendar,
  Clock,
  Video,
  UserCheck,
  CheckCircle,
  ShieldCheck,
  Phone,
  Mail,
  User,
  FileText,
  Loader2,
} from 'lucide-react';

interface ScheduleVisitModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({
  property,
  isOpen,
  onClose,
}) => {
  const { lang, formatPrice, t } = useApp();
  const [confirmedBooking, setConfirmedBooking] = useState<BookingResponse | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      propertyId: property?.id || '',
      tenantName: 'Mohaimen Hridoy',
      tenantPhone: '01711928374',
      tenantEmail: 'mohaimenhridoy@gmail.com',
      visitDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      timeSlot: 'afternoon',
      visitType: 'in_person',
      notes: '',
    },
  });

  const selectedVisitType = watch('visitType');
  const selectedTimeSlot = watch('timeSlot');

  const createBookingMutation = useCreateBooking();

  if (!isOpen || !property) return null;

  const onSubmit = async (values: BookingFormValues) => {
    try {
      const res = await createBookingMutation.mutateAsync({
        ...values,
        propertyId: property.id,
      });
      setConfirmedBooking(res.data);
    } catch (err: any) {
      console.error('Booking failed:', err);
    }
  };

  const handleModalClose = () => {
    setConfirmedBooking(null);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#004337] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#aaf0dc]/20 flex items-center justify-center text-[#aaf0dc]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold leading-tight">
                {lang === 'bn' ? 'পরিদর্শন শিডিউল করুন' : 'Schedule Property Walkthrough'}
              </h3>
              <p className="text-[11px] text-[#aaf0dc]">
                {lang === 'bn' ? 'রাজউক ভেরিফাইড এজেন্ট দ্বারা পরিচালিত' : 'Hosted by RAJUK Verified Agent'}
              </p>
            </div>
          </div>
          <button
            onClick={handleModalClose}
            className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmed Success State */}
        {confirmedBooking ? (
          <div className="p-6 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-1">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              {lang === 'bn' ? 'পরিদর্শন সফলভাবে বুক করা হয়েছে!' : 'Visit Successfully Scheduled!'}
            </h4>
            <div className="bg-[#eff4ff] border border-slate-200 rounded-xl p-4 w-full text-left space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500">{lang === 'bn' ? 'কনফার্মেশন কোড' : 'Voucher Code'}:</span>
                <span className="font-mono font-bold text-[#004337] text-sm">
                  {confirmedBooking.verificationCode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'bn' ? 'প্রোপার্টি' : 'Property'}:</span>
                <span className="font-bold text-slate-800 text-right truncate max-w-[240px]">
                  {lang === 'bn' ? property.titleBn : property.titleEn}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'bn' ? 'তারিখ ও সময়' : 'Date & Slot'}:</span>
                <span className="font-bold text-slate-800">
                  {confirmedBooking.visitDate} (
                  {confirmedBooking.timeSlot === 'morning'
                    ? 'Morning 10-12'
                    : confirmedBooking.timeSlot === 'afternoon'
                    ? 'Afternoon 2-5'
                    : 'Evening 5-7'}
                  )
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'bn' ? 'ধরন' : 'Modality'}:</span>
                <span className="font-bold text-[#004337]">
                  {confirmedBooking.visitType === 'in_person'
                    ? lang === 'bn'
                      ? 'সরাসরি পরিদর্শন (In-Person)'
                      : 'In-Person Walkthrough'
                    : lang === 'bn'
                    ? 'লাইভ ভার্চুয়াল ট্যুর'
                    : 'Live Virtual 360 Tour'}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              {lang === 'bn'
                ? 'আমাদের ভেরিফাইড প্রোপার্টি ম্যানেজার আপনার নম্বরে এসএমএস ও কল করবেন।'
                : 'Our verified property manager will contact you via SMS & phone prior to arrival.'}
            </p>
            <button
              onClick={handleModalClose}
              className="w-full py-2.5 bg-[#004337] text-white rounded-xl font-bold text-xs hover:bg-[#0d5c4d] transition-colors"
            >
              {lang === 'bn' ? 'সম্পন্ন (Done)' : 'Close'}
            </button>
          </div>
        ) : (
          /* Form Content with React Hook Form + Zod */
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 overflow-y-auto space-y-4">
            {/* 1-Click Demo Fill Banner */}
            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-amber-900">
                {lang === 'bn' ? '⚡ টেস্ট শিডিউল ডাটা লোড করতে চান?' : '⚡ Want to test with demo schedule data?'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setValue('tenantName', 'Mohaimen Hridoy');
                  setValue('tenantPhone', '01711928374');
                  setValue('tenantEmail', 'mohaimenhridoy@gmail.com');
                  setValue('timeSlot', 'afternoon');
                  setValue('visitType', 'in_person');
                  setValue('notes', 'I would like to inspect the parking slot and lake view balcony.');
                }}
                className="px-2.5 py-1 bg-amber-200 hover:bg-amber-300 text-amber-900 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                {lang === 'bn' ? 'অটো-ফিল করুন' : 'Auto-fill'}
              </button>
            </div>

            {/* Property Snippet */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#eff4ff] border border-slate-200/80">
              <img
                src={property.images[0]}
                alt={property.titleEn}
                className="w-14 h-14 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {lang === 'bn' ? property.titleBn : property.titleEn}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {lang === 'bn' ? property.addressBn : property.addressEn}
                </p>
                <p className="text-xs font-extrabold text-[#004337] mt-0.5 tabular-nums">
                  {formatPrice(property.rent)} {t('card.perMonth', '/মাস')}
                </p>
              </div>
            </div>

            {/* Visit Modality Selector */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                {lang === 'bn' ? 'পরিদর্শনের মাধ্যম নির্বাচন করুন' : 'Select Visit Modality'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setValue('visitType', 'in_person')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${
                    selectedVisitType === 'in_person'
                      ? 'border-[#004337] bg-[#eff4ff] text-[#004337] ring-1 ring-[#004337]'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-[#004337]" />
                  <span>{lang === 'bn' ? 'সরাসরি পরিদর্শন' : 'In-Person Walkthrough'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setValue('visitType', 'virtual_tour')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${
                    selectedVisitType === 'virtual_tour'
                      ? 'border-[#004337] bg-[#eff4ff] text-[#004337] ring-1 ring-[#004337]'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Video className="w-4 h-4 text-[#004337]" />
                  <span>{lang === 'bn' ? 'লাইভ ভিডিও ট্যুর' : 'Live Virtual 360'}</span>
                </button>
              </div>
            </div>

            {/* Date & Time Slot Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === 'bn' ? 'তারিখ' : 'Date'}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    {...register('visitDate')}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004337] text-slate-800"
                  />
                </div>
                {errors.visitDate && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.visitDate.message}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === 'bn' ? 'সময় নির্বাচন' : 'Time Slot'}
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {(['morning', 'afternoon', 'evening'] as const).map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setValue('timeSlot', slot)}
                      className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border transition-all ${
                        selectedTimeSlot === slot
                          ? 'bg-[#004337] text-white border-[#004337]'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {slot === 'morning'
                        ? '10-12 AM'
                        : slot === 'afternoon'
                        ? '2-5 PM'
                        : '5-7 PM'}
                    </button>
                  ))}
                </div>
                {errors.timeSlot && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.timeSlot.message}</p>
                )}
              </div>
            </div>

            {/* Contact Details Fields */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === 'bn' ? 'আপনার নাম' : 'Full Name'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    {...register('tenantName')}
                    placeholder="e.g. Mohaimen Hridoy"
                    className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004337]"
                  />
                </div>
                {errors.tenantName && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.tenantName.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {lang === 'bn' ? 'মোবাইল নম্বর' : 'BD Phone (+880)'}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="tel"
                      {...register('tenantPhone')}
                      placeholder="01712345678"
                      className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004337]"
                    />
                  </div>
                  {errors.tenantPhone && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.tenantPhone.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {lang === 'bn' ? 'ইমেইল ঠিকানা' : 'Email Address'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="email"
                      {...register('tenantEmail')}
                      placeholder="you@domain.com"
                      className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004337]"
                    />
                  </div>
                  {errors.tenantEmail && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.tenantEmail.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === 'bn' ? 'বিশেষ দ্রষ্টব্য (ঐচ্ছিক)' : 'Special Requests (Optional)'}
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <textarea
                    rows={2}
                    {...register('notes')}
                    placeholder={
                      lang === 'bn'
                        ? 'গাড়ি পার্কিং স্পেস নিশ্চিত করা, পোষা প্রাণীর অনুমতি ইত্যাদি...'
                        : 'Parking confirmation, pet policy, preferred move-in window...'
                    }
                    className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004337]"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Escrow & Privacy Note */}
            <div className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {lang === 'bn'
                  ? 'আপনার তথ্য শতভাগ নিরাপদ। পরিদর্শন সম্পূর্ণ ফ্রি এবং কোনো ব্রোকার চার্জ নেই।'
                  : 'Zero broker fee. 100% verified directly with the genuine property deed owner.'}
              </span>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={createBookingMutation.isPending}
              className="w-full py-2.5 bg-[#a13e28] text-white hover:bg-[#822714] rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              {createBookingMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{lang === 'bn' ? 'বুকিং তৈরি হচ্ছে...' : 'Confirming Walkthrough...'}</span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>
                    {lang === 'bn'
                      ? 'পরিদর্শন কনফার্ম করুন (Free Booking)'
                      : 'Confirm Visit Walkthrough'}
                  </span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
