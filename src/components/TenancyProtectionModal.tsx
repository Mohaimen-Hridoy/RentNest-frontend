import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ShieldCheck,
  Building2,
  FileCheck2,
  Scale,
  Lock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

interface TenancyProtectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TenancyProtectionModal: React.FC<TenancyProtectionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { lang, formatPrice } = useApp();
  const [calculatorRent, setCalculatorRent] = useState(80000);
  const [inquirySuccess, setInquirySuccess] = useState(false);

  if (!isOpen) return null;

  const escrowAmount = calculatorRent * 2;
  const stampFee = 1000;
  const serviceAuditFee = 0; // Free for tenants

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#004337] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#aaf0dc]/20 flex items-center justify-center text-[#aaf0dc]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">
                {lang === 'bn' ? 'রেন্টনেস্ট ভাড়াটিয়া ও এসক্রো সুরক্ষা' : 'RentNest Tenancy & Escrow Protection'}
              </h3>
              <p className="text-[11px] text-[#aaf0dc]">
                {lang === 'bn' ? 'প্রাতিষ্ঠানিক ব্যাংক এসক্রো ও লিগ্যাল অডিট নিশ্চিত' : 'Institutional Bank Escrow & Legal Audit'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top Trust Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 bg-[#eff4ff] rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                {lang === 'bn' ? 'সুরক্ষিত ডিপোজিট' : 'Protected Escrow Deposits'}
              </span>
              <p className="text-xl font-extrabold text-[#004337] mt-1 tabular-nums">
                ৳ ১২,৫০,০০,০০০+
              </p>
              <span className="text-[11px] text-slate-500">
                {lang === 'bn' ? 'সরাসরি পার্টনার ব্যাংকে সংরক্ষিত' : 'In Custodian Trust Banks'}
              </span>
            </div>

            <div className="p-3.5 bg-[#eff4ff] rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                {lang === 'bn' ? 'মালিকানা যাচাইকৃত' : 'Title Deed Audits'}
              </span>
              <p className="text-xl font-extrabold text-[#004337] mt-1">
                ১০০% ভেরিফাইড
              </p>
              <span className="text-[11px] text-slate-500">
                {lang === 'bn' ? 'রাজউক অনুমোদিত প্ল্যান চেক' : 'Zero Sublease Fraud'}
              </span>
            </div>

            <div className="p-3.5 bg-[#eff4ff] rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                {lang === 'bn' ? 'বিরোধ নিষ্পত্তি' : 'Dispute Resolution'}
              </span>
              <p className="text-xl font-extrabold text-[#004337] mt-1">
                ৪৮ ঘণ্টার মধ্যে
              </p>
              <span className="text-[11px] text-slate-500">
                {lang === 'bn' ? 'নিরপেক্ষ মধ্যস্থতা প্যানেল' : 'Neutral Mediation Board'}
              </span>
            </div>
          </div>

          {/* 3 Pillars of Escrow */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#0b1c30]">
              {lang === 'bn' ? 'রেন্টনেস্ট কেন শতভাগ নিরাপদ?' : 'How RentNest Protects Your Deposit'}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Lock className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-xs text-slate-900">
                  {lang === 'bn' ? '১. ব্যাংক এসক্রো ভল্ট' : '1. Institutional Bank Escrow'}
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'bn'
                    ? 'আপনার অগ্রিম ২ মাসের জামানত ব্র্যাক ব্যাংক বা সিটি ব্যাংকের এসক্রো ট্রাস্টে জমা থাকে। বাড়িওয়ালা ইচ্ছেমতো অর্থ আটকে রাখতে পারবে না।'
                    : 'Security deposit sits in an institutional trust account at BRAC/City Bank. Landlords cannot unilaterally withhold deposits.'}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-800">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-xs text-slate-900">
                  {lang === 'bn' ? '২. প্রমিত ডিজিটাল চুক্তি' : '2. Standard Digital Lease'}
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'bn'
                    ? 'বাংলাদেশ ভাড়াটিয়া আইন অনুযায়ী প্রস্তুতকৃত দ্বিপাক্ষিক ডিজিটাল চুক্তিপত্র। বাড়ি ছাড়ার সময় নোটিশ পিরিয়ড ও ডিপোজিট ফেরত সুস্পষ্ট।'
                    : 'Legally vetted bilateral tenancy agreement enforcing 30-day exit notices and guaranteed 7-day deposit return.'}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                  <Scale className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-xs text-slate-900">
                  {lang === 'bn' ? '৩. মুভ-ইন কন্ডিশন অডিট' : '3. Move-in Condition Audit'}
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'bn'
                    ? 'চাবি নেওয়ার পূর্বে ফ্ল্যাটের দেয়াল, সুইচ ও ফিটিংসের ডিজিটাল ফটো অডিট সংরক্ষণ করা হয়, যাতে বাসা ছাড়ার সময় অযৌক্তিক জরিমানা না হয়।'
                    : 'Digital walkthrough photo inspection log protects tenants from unwarranted maintenance claims at lease termination.'}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Escrow Simulator */}
          <div className="p-5 rounded-2xl bg-[#eff4ff] border border-[#aaf0dc] space-y-3">
            <h4 className="text-sm font-bold text-[#004337] flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>{lang === 'bn' ? 'এসক্রো ডিপোজিট ক্যালকুলেটর' : 'Escrow Deposit Estimator'}</span>
            </h4>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {lang === 'bn' ? 'মাসিক ভাড়া নির্বাচন করুন' : 'Simulate Monthly Rent'}:{' '}
                <span className="font-extrabold text-[#004337]">{formatPrice(calculatorRent)}</span>
              </label>
              <input
                type="range"
                min="30000"
                max="250000"
                step="5000"
                value={calculatorRent}
                onChange={(e) => setCalculatorRent(Number(e.target.value))}
                className="w-full accent-[#004337] cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-500 block">{lang === 'bn' ? 'এসক্রো ব্যাংক জামানত (২ মাস)' : 'Escrow Deposit (2 Mos)'}:</span>
                <span className="text-base font-bold text-[#004337] tabular-nums">{formatPrice(escrowAmount)}</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-500 block">{lang === 'bn' ? 'ডিজিটাল স্ট্যাম্প ফি' : 'Govt Stamp Fee'}:</span>
                <span className="text-base font-bold text-slate-800 tabular-nums">৳১,০০০</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-500 block">{lang === 'bn' ? 'ভাড়াটিয়া ব্রোকার কমিশন' : 'Broker Commission'}:</span>
                <span className="text-base font-bold text-emerald-600">৳০ (শতভাগ ফ্রি)</span>
              </div>
            </div>
          </div>

          {/* Custodian Banks */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              {lang === 'bn' ? 'অনুমোদিত এসক্রো ট্রাস্ট পার্টনার ব্যাংক' : 'Approved Custodian Trust Banks'}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {['BRAC Bank Limited', 'The City Bank Limited', 'Eastern Bank Limited (EBL)', 'Standard Chartered Bangladesh'].map(
                (bank, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{bank}</span>
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#004337] text-white text-xs font-bold hover:bg-[#0d5c4d] transition-colors"
          >
            {lang === 'bn' ? 'বুঝেছি (Close)' : 'Understood'}
          </button>
        </div>
      </div>
    </div>
  );
};
