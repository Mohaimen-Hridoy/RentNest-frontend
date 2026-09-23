import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Property } from '../types/property';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Building,
  CreditCard,
  Download,
  Stamp,
  Printer,
  Sparkles,
} from 'lucide-react';

interface DigitalLeasePageProps {
  properties: Property[];
}

export const DigitalLeasePage: React.FC<DigitalLeasePageProps> = ({ properties }) => {
  const { lang, formatPrice, selectedProperty, setActivePage } = useApp();
  const property = selectedProperty || properties[0];

  const [hasSigned, setHasSigned] = useState(false);
  const [signatureName, setSignatureName] = useState('Mohaimen Hridoy');
  const [escrowPaid, setEscrowPaid] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'brac' | 'bkash' | 'ebl'>('brac');

  if (!property) return null;

  const advanceDeposit = property.rent * property.advanceDepositMonths;
  const firstMonthRent = property.rent + property.serviceCharge;
  const totalDue = advanceDeposit + firstMonthRent;

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
          <ShieldCheck className="w-4 h-4 text-[#004337]" />
          <span>{lang === 'bn' ? 'সরকারি নন-জুডিশিয়াল স্ট্যাম্প ফরম্যাট' : 'Govt Non-Judicial Standard Deed'}</span>
        </span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#0b1c30]">
          {lang === 'bn' ? 'ডিজিটাল বাড়িভাড়া চুক্তি ও এসক্রো ভল্ট' : 'Digital Lease Agreement & Escrow Deposit'}
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          {lang === 'bn'
            ? 'বাংলাদেশ ভাড়াটিয়া আইন অনুযায়ী আইনি সুরক্ষা নিশ্চিতকরণ ও ব্র্যাক ব্যাংক এসক্রো অ্যাকাউন্টে জামানত সংরক্ষণ।'
            : 'Legally compliant bilateral contract with institutional escrow deposit safeguard.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: The Formal Tenancy Agreement Document */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
          {/* Document Header Seal */}
          <div className="text-center pb-6 border-b border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
              GOVERNMENT OF BANGLADESH APPROVED TENANCY FRAMEWORK
            </span>
            <h2 className="text-lg font-bold text-[#004337]">
              {lang === 'bn' ? 'দ্বিপাক্ষিক আবাসিক বাড়িভাড়া চুক্তিপত্র' : 'RESIDENTIAL TENANCY LEASE DEED'}
            </h2>
            <p className="text-xs text-slate-500">
              Contract Ref: RN-LEASE-2026-DH-{property.id.toUpperCase().slice(-5)}
            </p>
          </div>

          {/* Parties Involved */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="font-bold text-[#004337] block uppercase text-[10px] tracking-wider">
                {lang === 'bn' ? '১ম পক্ষ (বাড়িওয়ালা / Landlord)' : 'First Party (Landlord)'}
              </span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{property.landlord.name}</p>
              <p className="text-slate-500">Verified National NID & Deed Owner</p>
              <p className="text-slate-500 mt-1">{property.landlord.phone}</p>
            </div>

            <div>
              <span className="font-bold text-[#004337] block uppercase text-[10px] tracking-wider">
                {lang === 'bn' ? '২য় পক্ষ (ভাড়াটিয়া / Tenant)' : 'Second Party (Tenant)'}
              </span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{signatureName}</p>
              <p className="text-slate-500">NID Verified Profile #BD-82019472</p>
              <p className="text-slate-500 mt-1">+8801711928374</p>
            </div>
          </div>

          {/* Property Subject */}
          <div className="text-xs space-y-2">
            <h4 className="font-bold text-slate-800 text-sm">
              {lang === 'bn' ? 'চুক্তির বিবরণ ও সম্পত্তি' : 'Demised Premises & Specs'}
            </h4>
            <div className="p-3 bg-[#eff4ff] rounded-xl border border-slate-200">
              <p className="font-bold text-slate-900">{lang === 'bn' ? property.titleBn : property.titleEn}</p>
              <p className="text-slate-600 mt-0.5">{lang === 'bn' ? property.addressBn : property.addressEn}</p>
              <p className="text-slate-500 text-[11px] mt-1">
                {property.bedrooms} Beds • {property.bathrooms} Baths • {property.sqft} sqft • Floor: {property.floor} • RAJUK Permit: {property.legalAudit.rajukPlanNo}
              </p>
            </div>
          </div>

          {/* Legal Clauses */}
          <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
            <h4 className="font-bold text-slate-800 text-sm">
              {lang === 'bn' ? 'শর্তাবলী ও নিয়মাবলি (Standard Clauses)' : 'Key Legal Clauses'}
            </h4>

            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                <span className="font-bold text-slate-900 block">
                  Clause 1: Duration of Lease & Exit Notice (মেয়াদ ও নোটিশ)
                </span>
                <p className="text-slate-600 mt-0.5">
                  The initial lease tenure is stipulated for 12 continuous months. Both tenant and landlord agree to provide a minimum 30 days formal written notice prior to vacation.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                <span className="font-bold text-slate-900 block">
                  Clause 2: Institutional Escrow Custody (এসক্রো ব্যাংক নিরাপত্তা)
                </span>
                <p className="text-slate-600 mt-0.5">
                  The security deposit amounting to {formatPrice(advanceDeposit)} (2 months rent) is held in an institutional escrow trust account at {property.legalAudit.escrowCustodianBank}. No deductions can be made without neutral photographic verification.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                <span className="font-bold text-slate-900 block">
                  Clause 3: Peaceful Tenancy & Maintenance (মেইনটেন্যান্স ও নাগরিক অধিকার)
                </span>
                <p className="text-slate-600 mt-0.5">
                  The landlord guarantees uninterrupted utilities (lift, generator, water supply, and building security). Routine structural maintenance remains the sole responsibility of the owner.
                </p>
              </div>
            </div>
          </div>

          {/* Digital Signature Box */}
          <div className="p-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Stamp className="w-5 h-5 text-[#004337]" />
                <span className="font-bold text-xs text-slate-800">
                  {lang === 'bn' ? 'ডিজিটাল স্বাক্ষর (Digital Signature Verification)' : 'Digital Signature Confirmation'}
                </span>
              </div>
              {hasSigned && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'স্বাক্ষরিত' : 'Signed & Validated'}</span>
                </span>
              )}
            </div>

            {!hasSigned ? (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">
                  {lang === 'bn'
                    ? 'আমি এই চুক্তির শর্তাবলীর সাথে একমত হয়ে ডিজিটালি স্বাক্ষর করছি।'
                    : 'I agree to the legally binding clauses and confirm my digital tenancy acceptance.'}
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={signatureName}
                    onChange={(e) => setSignatureName(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004337]"
                    placeholder="Enter full legal name"
                  />
                  <button
                    onClick={() => setHasSigned(true)}
                    className="px-5 py-2 bg-[#004337] text-white font-bold text-xs rounded-lg hover:bg-[#0d5c4d] shadow-sm transition-all"
                  >
                    {lang === 'bn' ? 'স্বাক্ষর করুন' : 'Sign Lease'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                <div>
                  <span className="font-serif italic text-base text-[#004337] font-bold block">
                    {signatureName}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Timestamp: {new Date().toLocaleString()} • Encrypted e-Hash
                  </span>
                </div>
                <button
                  onClick={() => setHasSigned(false)}
                  className="text-xs text-slate-400 hover:text-slate-700 underline"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Payment & Escrow Lock Checkout */}
        <div className="lg:col-span-4 space-y-4 sticky top-24">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg space-y-4">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#004337]" />
              <h3 className="font-bold text-base text-slate-900">
                {lang === 'bn' ? 'এসক্রো ডিপোজিট পেমেন্ট' : 'Escrow Deposit Lock'}
              </h3>
            </div>

            <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'bn' ? 'অগ্রিম জামানত (২ মাস)' : 'Advance Escrow (2 Mos)'}:</span>
                <span className="font-bold text-[#004337]">{formatPrice(advanceDeposit)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'bn' ? 'প্রথম মাসের ভাড়া ও সার্ভিস' : '1st Month + Service'}:</span>
                <span className="font-bold text-slate-800">{formatPrice(firstMonthRent)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'bn' ? 'ডিজিটাল স্ট্যাম্প ফি' : 'Stamp Duty'}:</span>
                <span className="font-bold text-slate-800">৳১,০০০</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                <span className="font-bold text-slate-900 text-sm">{lang === 'bn' ? 'মোট ডিপোজিট' : 'Total Escrow'}:</span>
                <span className="font-extrabold text-[#a13e28] text-xl tabular-nums">
                  {formatPrice(totalDue + 1000)}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-600 block">
                {lang === 'bn' ? 'পেমেন্ট চ্যানেল নির্বাচন করুন' : 'Select Custodian Gateway'}
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('brac')}
                  className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                    selectedPaymentMethod === 'brac'
                      ? 'border-[#004337] bg-[#eff4ff] text-[#004337] ring-1 ring-[#004337]'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  BRAC Bank
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('bkash')}
                  className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                    selectedPaymentMethod === 'bkash'
                      ? 'border-[#004337] bg-[#eff4ff] text-[#004337] ring-1 ring-[#004337]'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  bKash Escrow
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('ebl')}
                  className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                    selectedPaymentMethod === 'ebl'
                      ? 'border-[#004337] bg-[#eff4ff] text-[#004337] ring-1 ring-[#004337]'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  EBL Net
                </button>
              </div>
            </div>

            {/* Pay / Complete Button */}
            {!escrowPaid ? (
              <button
                disabled={!hasSigned}
                onClick={() => setEscrowPaid(true)}
                className="w-full py-3 bg-[#a13e28] text-white hover:bg-[#822714] font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Lock className="w-4 h-4" />
                <span>
                  {!hasSigned
                    ? (lang === 'bn' ? 'প্রথমে চুক্তিপত্রে স্বাক্ষর করুন' : 'Sign Lease to Proceed')
                    : (lang === 'bn' ? 'এসক্রো ব্যাংক ভল্টে ডিপোজিট লক করুন' : 'Lock Escrow Deposit')}
                </span>
              </button>
            ) : (
              <div className="space-y-3">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    {lang === 'bn'
                      ? 'ডিপোজিট সফলভাবে এসক্রো ট্রাস্টে লক হয়েছে!'
                      : 'Deposit Locked in Custodian Escrow!'}
                  </span>
                </div>

                <button
                  onClick={() => window.print()}
                  className="w-full py-2.5 bg-[#004337] text-white hover:bg-[#0d5c4d] font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'চুক্তিপত্র ডাউনলোড (PDF)' : 'Download Tenancy Deed'}</span>
                </button>
              </div>
            )}

            <p className="text-[11px] text-slate-400 text-center">
              Secured by 256-bit institutional banking encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
