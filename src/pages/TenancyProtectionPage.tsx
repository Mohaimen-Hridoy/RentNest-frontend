import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Building2,
  FileCheck2,
  Scale,
  Lock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Banknote,
  Coins,
  FileText,
  UserCheck,
} from 'lucide-react';

export const TenancyProtectionPage: React.FC = () => {
  const { lang, formatPrice, setActivePage } = useApp();
  const [calculatorRent, setCalculatorRent] = useState(85000);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const escrowAmount = calculatorRent * 2;

  const faqs = [
    {
      qBn: 'রেন্টনেস্ট এসক্রো অ্যাকাউন্ট কিভাবে কাজ করে?',
      qEn: 'How does the RentNest Escrow Account work?',
      aBn: 'ভাড়াটিয়া হিসেবে আপনার ২ মাসের সিকিউরিটি ডিপোজিট সরাসরি বাড়িওয়ালার পকেটে যাওয়ার পরিবর্তে রেন্টনেস্টের পার্টনার ব্র্যাক ব্যাংক বা ইস্টার্ন ব্যাংকের ট্রাস্ট এসক্রো অ্যাকাউন্টে সংরক্ষিত থাকে। বাড়িওয়ালা বা ভাড়াটিয়া উভয়ের সম্মতি ছাড়া কোনো অর্থ ছাড় করা হয় না।',
      aEn: 'Instead of going directly to the landlord, your 2 months security deposit is held inside a licensed custodian trust bank account (BRAC Bank / Eastern Bank). Funds can only be released upon mutual move-in handover or legally mediated checkout.',
    },
    {
      qBn: 'বাসা ছাড়ার সময় জামানতের টাকা ফেরত পাওয়া কি নিশ্চিত?',
      qEn: 'Is my deposit refund guaranteed when moving out?',
      aBn: 'হ্যাঁ। প্রমিত ডিজিটাল চুক্তির শর্তানুযায়ী ৩০ দিনের নোটিশ এবং ডিজিটাল মুভ-আউট ফটো অডিট সম্পন্ন করার ৭ কার্যদিবসের মধ্যে আপনার ব্যাংক অ্যাকাউন্টে জামানত স্বয়ংক্রিয়ভাবে জমা হবে।',
      aEn: 'Yes. Upon standard 30-day notice and completion of the move-out inspection log, the bank releases your deposit directly to your bank account within 7 business days.',
    },
    {
      qBn: 'কোনো বিরোধ দেখা দিলে কে সমাধান করবে?',
      qEn: 'Who resolves disputes if any damages are contested?',
      aBn: 'রেন্টনেস্টের নিরপেক্ষ ডিসপিউট রেজোলিউশন বোর্ড (যাতে অভিজ্ঞ সিভিল আইনজীবী ও ইঞ্জিনিয়ার অন্তর্ভুক্ত) ৪৮ ঘণ্টার মধ্যে সাইট পরিদর্শন ও ডিজিটাল ইনস্পেকশন প্রুফের ভিত্তিতে সিদ্ধান্ত গ্রহণ করে।',
      aEn: 'RentNest’s neutral Dispute Resolution Board conducts an on-site audit against the initial digital move-in log within 48 hours to make a binding and transparent decision.',
    },
    {
      qBn: 'ভাড়াটিয়ার কাছ থেকে কোনো ব্রোকার ফি নেওয়া হয় কি?',
      qEn: 'Is there any broker fee charged to the tenant?',
      aBn: 'না। রেন্টনেস্টে ভাড়াটিয়াদের জন্য কোনো ধরনের ব্রোকার ফি বা মধ্যস্বত্বভোগীর খরচ নেই। পরিদর্শন এবং লিস্টিং ব্রাউজিং শতভাগ ফ্রি।',
      aEn: 'Zero broker commission is charged to tenants. Browsing, scheduling walkthroughs, and accessing verified listings is 100% free.',
    },
  ];

  return (
    <div className="w-full max-w-360 mx-auto px-4 md:px-8 py-6 space-y-8">
      {/* Top Navigation Back */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <button
          onClick={() => setActivePage('browse')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#004337] hover:text-[#0d5c4d] bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'bn' ? 'হোম পেজে ফিরে যান' : 'Back to Home'}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#004337] bg-[#aaf0dc]/50 px-3 py-1 rounded-full border border-[#004337]/20">
            {lang === 'bn' ? ' প্রাতিষ্ঠানিক ব্যাংক ট্রাস্ট সুরক্ষিত' : 'Institutional Bank Trust Active'}
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-[#004337] flex items-center justify-center text-white mx-auto shadow-md">
          <ShieldCheck className="w-8 h-8 text-[#aaf0dc]" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0b1c30] tracking-tight">
          {lang === 'bn' ? 'ভাড়াটিয়া সুরক্ষা ও ব্যাংক এসক্রো পলিসি' : 'Tenancy Protection & Escrow Guarantee'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {lang === 'bn'
            ? 'বাংলাদেশে প্রথমবার—অগ্রিম জামানত আত্মসাৎ ও অবৈধ বাড়িভাড়ার হয়রানি থেকে ভাড়াটিয়াদের শতভাগ আইনি ও আর্থিক নিরাপত্তা।'
            : 'For the first time in Bangladesh: institutional financial and legal protection against withheld deposits and non-standard leases.'}
        </p>
      </div>

      {/* Trust Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            {lang === 'bn' ? 'সুরক্ষিত ডিপোজিট ভল্ট' : 'Protected Deposit Vault'}
          </span>
          <p className="text-3xl font-extrabold text-[#004337] mt-1 tabular-nums">৳ ১২.৫ কোটি+</p>
          <span className="text-xs text-slate-500 mt-1 block">BRAC Bank & EBL Trust Custody</span>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            {lang === 'bn' ? 'দলিল অডিট ও মালিকানা যাচাই' : 'Deed Audits & RAJUK Plans'}
          </span>
          <p className="text-3xl font-extrabold text-[#004337] mt-1">১০০% ভেরিফাইড</p>
          <span className="text-xs text-slate-500 mt-1 block">Zero Sublease Fraud Guarantee</span>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            {lang === 'bn' ? 'বিরোধ মীমাংসা কার্যকারিতা' : 'Dispute Resolution'}
          </span>
          <p className="text-3xl font-extrabold text-[#004337] mt-1">৪৮ ঘণ্টার মধ্যে</p>
          <span className="text-xs text-slate-500 mt-1 block">Neutral Legal & Engineering Board</span>
        </div>
      </div>

      {/* 3 Pillars Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 text-center">
          {lang === 'bn' ? 'রেন্টনেস্টের ৩টি মৌলিক সুরক্ষা স্তম্ভ' : 'The 3 Pillars of Tenant Escrow'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {lang === 'bn' ? '১. প্রাতিষ্ঠানিক ব্যাংক এসক্রো' : '1. Institutional Bank Escrow'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'আপনার জামানতের অর্থ ব্র্যাক ব্যাংক বা ইস্টার্ন ব্যাংকের এসক্রো ট্রাস্টে জমা থাকে। কোনো বাড়িওয়ালা অযৌক্তিকভাবে টাকা কেটে রাখতে পারে না।'
                : 'Security deposits sit securely in a trust account until lease conclusion. Unilateral withholding is impossible.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-[#004337]">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {lang === 'bn' ? '২. প্রমিত ডিজিটাল আইনি চুক্তি' : '2. Standard Bilateral Lease'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'বাংলাদেশ বাড়িভাড়া আইন অনুযায়ী সুস্পষ্ট ও ভারসাম্যপূর্ণ চুক্তিপত্র। ভাড়া বৃদ্ধি, মেইনটেন্যান্স ও নোটিশ পিরিয়ডের নিয়ম শতভাগ স্বচ্ছ।'
                : 'Legally vetted bilateral tenancy deeds that clearly protect both tenant rights and property owner security.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {lang === 'bn' ? '৩. ডিজিটাল মুভ-ইন অডিট' : '3. Move-in Condition Audit'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'চাবি বুঝে নেওয়ার সময় দেয়াল, ফিটিংস ও ইলেকট্রিকের ডিজিটাল ফটো প্রমাণপত্র রেন্টনেস্টে স্টোর করা থাকে, ফলে বাসা ছাড়ার সময় কোনো মিথ্যা দাবি তোলা যায় না।'
                : 'Photographic condition logs at move-in protect tenants from unwarranted wear-and-tear deductions upon exit.'}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Simulator */}
      <div className="bg-[#eff4ff] p-6 sm:p-8 rounded-2xl border border-[#aaf0dc] max-w-3xl mx-auto space-y-4">
        <h3 className="text-lg font-bold text-[#004337] flex items-center gap-2">
          <Banknote className="w-5 h-5" />
          <span>{lang === 'bn' ? 'আপনার ফ্ল্যাটের এসক্রো হিসাব করুন' : 'Simulate Your Escrow Protection'}</span>
        </h3>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-700">
              {lang === 'bn' ? 'অনুমানকৃত মাসিক ভাড়া' : 'Simulate Monthly Rent'}:
            </span>
            <span className="text-lg font-extrabold text-[#004337]">{formatPrice(calculatorRent)}</span>
          </div>
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-xs text-slate-400 block">{lang === 'bn' ? 'এসক্রো ব্যাংক ভল্ট (২ মাস)' : 'Escrow Deposit'}</span>
            <span className="text-base font-bold text-[#004337] mt-0.5 block">{formatPrice(escrowAmount)}</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-xs text-slate-400 block">{lang === 'bn' ? 'ডিজিটাল স্ট্যাম্প ফি' : 'Govt Stamp Fee'}</span>
            <span className="text-base font-bold text-slate-800 mt-0.5 block">৳১,০০০</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-xs text-slate-400 block">{lang === 'bn' ? 'ব্রোকার চার্জ' : 'Broker Fee'}</span>
            <span className="text-base font-bold text-emerald-600 mt-0.5 block">৳০ (শতভাগ ফ্রি)</span>
          </div>
        </div>
      </div>

      {/* Partner Banks */}
      <div className="text-center space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {lang === 'bn' ? 'অনুমোদিত এসক্রো ট্রাস্ট পার্টনার ব্যাংকসমূহ' : 'Approved Custodian Trust Partners'}
        </h4>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {['BRAC Bank Limited', 'Eastern Bank Limited (EBL)', 'The City Bank Limited', 'Standard Chartered Bangladesh'].map(
            (bank, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{bank}</span>
              </span>
            )
          )}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-3">
        <h3 className="text-lg font-bold text-slate-900 text-center mb-4">
          {lang === 'bn' ? 'ভাড়াটিয়াদের সাধারণ প্রশ্ন ও উত্তর' : 'Frequently Asked Questions'}
        </h3>
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-all"
          >
            <button
              onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              className="w-full text-left p-4 font-bold text-xs sm:text-sm text-slate-900 flex justify-between items-center hover:bg-slate-50"
            >
              <span>{lang === 'bn' ? faq.qBn : faq.qEn}</span>
              <span className="text-[#004337] text-lg font-bold">{activeFaq === idx ? '−' : '+'}</span>
            </button>
            {activeFaq === idx && (
              <div className="px-4 pb-4 pt-1 text-xs text-slate-600 border-t border-slate-100 leading-relaxed">
                {lang === 'bn' ? faq.aBn : faq.aEn}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center py-6">
        <button
          onClick={() => setActivePage('browse')}
          className="px-8 py-3 bg-[#a13e28] text-white hover:bg-[#822714] text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all inline-flex items-center gap-2"
        >
          <span>{lang === 'bn' ? 'ভেরিফাইড বাসা খুঁজুন' : 'Browse Verified Homes Now'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
