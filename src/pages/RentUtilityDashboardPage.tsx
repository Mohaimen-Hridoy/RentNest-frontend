import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CreditCard,
  FileText,
  Download,
  Printer,
  CheckCircle2,
  Clock,
  AlertCircle,
  Bell,
  MessageCircle,
  Zap,
  Droplet,
  Flame,
  Shield,
  ArrowLeft,
  Building,
  DollarSign,
  QrCode,
  Calendar,
  Send,
  X,
  Smartphone,
} from 'lucide-react';

interface UtilityItem {
  id: string;
  nameBn: string;
  nameEn: string;
  provider: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending';
  icon: 'electric' | 'water' | 'gas' | 'service';
  accountNo: string;
}

export const RentUtilityDashboardPage: React.FC = () => {
  const { lang, formatPrice, setActivePage } = useApp();

  const [activeMonth, setActiveMonth] = useState('October 2026');
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState<'bkash' | 'nagad' | 'card' | 'bank'>('bkash');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Auto SMS / WhatsApp Reminder state
  const [autoSmsEnabled, setAutoSmsEnabled] = useState(true);
  const [whatsAppReminder, setWhatsAppReminder] = useState(true);
  const [reminderDays, setReminderDays] = useState('3');
  const [reminderPhone, setReminderPhone] = useState('01711928374');
  const [reminderSavedToast, setReminderSavedToast] = useState(false);

  // Billing numbers
  const [flatRentPaid, setFlatRentPaid] = useState(false);
  const flatRent = 95000;
  const serviceCharge = 8500;
  const descoElectric = 4350;
  const wasaWater = 1850;
  const titasGas = 1080;

  const totalCurrentBill = flatRent + serviceCharge + descoElectric + wasaWater + titasGas;

  const utilities: UtilityItem[] = [
    {
      id: 'util-service',
      nameBn: 'বিল্ডিং মেইনটেন্যান্স ও সার্ভিস চার্জ',
      nameEn: 'Building Maintenance & Lift Service',
      provider: 'Lakeview Residence Society',
      amount: serviceCharge,
      dueDate: '10 Oct, 2026',
      status: flatRentPaid ? 'paid' : 'pending',
      icon: 'service',
      accountNo: 'LAKEVIEW-APT-5A',
    },
    {
      id: 'util-electric',
      nameBn: 'বিদ্যুৎ বিল (ডেসকো প্রিপেইড মিটার)',
      nameEn: 'Electricity (DESCO Smart Meter)',
      provider: 'DESCO Gulshan North',
      amount: descoElectric,
      dueDate: '12 Oct, 2026',
      status: flatRentPaid ? 'paid' : 'pending',
      icon: 'electric',
      accountNo: 'DESCO-MTR-8819203',
    },
    {
      id: 'util-water',
      nameBn: 'পানি ও স্যুয়ারেজ বিল (ঢাকা ওয়াসা)',
      nameEn: 'Water & Sewerage (Dhaka WASA)',
      provider: 'Dhaka WASA MODS Zone-5',
      amount: wasaWater,
      dueDate: '15 Oct, 2026',
      status: flatRentPaid ? 'paid' : 'pending',
      icon: 'water',
      accountNo: 'WASA-Z5-901847',
    },
    {
      id: 'util-gas',
      nameBn: 'গ্যাস লাইন বিল (তিতাস গ্যাস)',
      nameEn: 'Piped Gas (Titas Gas)',
      provider: 'Titas Gas T&D Co. Ltd.',
      amount: titasGas,
      dueDate: '18 Oct, 2026',
      status: flatRentPaid ? 'paid' : 'pending',
      icon: 'gas',
      accountNo: 'TITAS-DH-02914',
    },
  ];

  const handlePayRent = () => {
    setFlatRentPaid(true);
    setPaymentSuccess(true);
    setTimeout(() => setPaymentSuccess(false), 4000);
  };

  const handleSaveReminder = () => {
    setReminderSavedToast(true);
    setTimeout(() => setReminderSavedToast(false), 3000);
  };

  const openReceipt = () => {
    setSelectedReceipt({
      receiptNo: 'RN-NBR-2026-09-8812',
      month: 'September 2026',
      date: '02 September, 2026',
      tenantName: 'Mohaimen Hridoy',
      tenantNid: '199226928100049',
      tenantTin: '4819-2049-1192',
      landlordName: 'Engr. Farhan Kabir',
      landlordTin: '3910-8271-9921',
      propertyTitle: 'Lakeview Luxury Residence, Flat 5A',
      address: 'Road 71, Gulshan-2, Dhaka-1212',
      rentAmount: 95000,
      serviceCharge: 8500,
      totalPaid: 103500,
      paymentMethod: 'BRAC Bank Direct Transfer (Ref: TXN-992014)',
    });
    setShowReceiptModal(true);
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
          <FileText className="w-4 h-4 text-[#004337]" />
          <span>{lang === 'bn' ? 'এনবিআর স্বীকৃত ইনকাম ট্যাক্স রিবেট রশিদ' : 'NBR Tax Rebate Compliant'}</span>
        </span>
      </div>

      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b1c30]">
            {lang === 'bn' ? 'মাসিক ভাড়া ও ইউটিলিটি বিল ট্র্যাকার' : 'Rent & Utility Split Dashboard'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'bn'
              ? 'বিকাশ, নগদ ও ব্যাংকের মাধ্যমে ১-ক্লিকে ভাড়া পরিশোধ ও এনবিআর অফিসিয়াল রশিদ ডাউনলোড।'
              : '1-click rent & utilities clearance with instant official NBR tax rebate receipts.'}
          </p>
        </div>

        {/* Current Active Residence */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#004337] flex items-center justify-center text-white">
            <Building className="w-5 h-5 text-[#aaf0dc]" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Active Lease</span>
            <span className="text-xs font-bold text-slate-900 block">Lakeview Flat 5A, Gulshan-2</span>
            <span className="text-[11px] text-emerald-700 font-semibold">Lease Active until Aug 2027</span>
          </div>
        </div>
      </div>

      {/* Main Billing Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Current Due & 1-Click Pay Card */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                {lang === 'bn' ? 'চলতি মাসের প্রদেয় বিল' : 'Current Billing Period'}
              </span>
              <h2 className="text-lg font-bold text-slate-900">{activeMonth}</h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Due Date: 10th of every month</span>
              {flatRentPaid ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'পরিশোধিত' : 'Paid & Settled'}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'বকেয়া রয়েছে' : 'Payment Due'}</span>
                </span>
              )}
            </div>
          </div>

          {/* Amount Breakdown Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 block">{lang === 'bn' ? 'বাসা ভাড়া' : 'Apartment Rent'}</span>
              <span className="text-2xl font-extrabold text-[#004337] mt-1 block tabular-nums">
                {formatPrice(flatRent)}
              </span>
              <span className="text-[10px] text-slate-400">Lakeview Flat 5A</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 block">{lang === 'bn' ? 'ইউটিলিটি ও সার্ভিস বিল' : 'Split Utilities'}</span>
              <span className="text-2xl font-extrabold text-slate-800 mt-1 block tabular-nums">
                {formatPrice(serviceCharge + descoElectric + wasaWater + titasGas)}
              </span>
              <span className="text-[10px] text-slate-400">DESCO, WASA, Titas, Service</span>
            </div>

            <div className="p-4 bg-[#eff4ff] rounded-xl border border-[#aaf0dc]">
              <span className="text-xs text-[#004337] font-bold block">{lang === 'bn' ? 'সর্বমোট প্রদেয়' : 'Grand Total'}</span>
              <span className="text-2xl font-extrabold text-[#a13e28] mt-1 block tabular-nums">
                {formatPrice(totalCurrentBill)}
              </span>
              <span className="text-[10px] text-[#004337] font-medium">১-ক্লিকে যৌথ পরিশোধ</span>
            </div>
          </div>

          {/* Itemized Utility Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {lang === 'bn' ? 'বিলভিত্তিক সুনির্দিষ্ট হিসাব (Itemized Split Bills)' : 'Itemized Split Breakdown'}
            </h3>

            <div className="space-y-2">
              {utilities.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-wrap items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#004337]">
                      {item.icon === 'electric' && <Zap className="w-5 h-5 text-amber-500" />}
                      {item.icon === 'water' && <Droplet className="w-5 h-5 text-cyan-600" />}
                      {item.icon === 'gas' && <Flame className="w-5 h-5 text-rose-500" />}
                      {item.icon === 'service' && <Shield className="w-5 h-5 text-[#004337]" />}
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{lang === 'bn' ? item.nameBn : item.nameEn}</h4>
                      <p className="text-[11px] text-slate-400">
                        {item.provider} • Acc: <span className="font-mono">{item.accountNo}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs font-extrabold text-slate-900 tabular-nums block">
                        {formatPrice(item.amount)}
                      </span>
                      <span className="text-[10px] text-slate-400">Due: {item.dueDate}</span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.status === 'paid'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.status === 'paid' ? 'PAID' : 'PENDING'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Selection and Button */}
          {!flatRentPaid ? (
            <div className="pt-4 border-t border-slate-200 space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-2">
                  {lang === 'bn' ? 'পেমেন্ট মেথড নির্বাচন করুন:' : 'Select Instant Payment Gateway:'}
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => setSelectedPaymentGateway('bkash')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                      selectedPaymentGateway === 'bkash'
                        ? 'border-[#004337] bg-[#eff4ff] text-[#004337] ring-2 ring-[#004337]'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    bKash Direct
                  </button>

                  <button
                    onClick={() => setSelectedPaymentGateway('nagad')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                      selectedPaymentGateway === 'nagad'
                        ? 'border-[#004337] bg-[#eff4ff] text-[#004337] ring-2 ring-[#004337]'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Nagad Pay
                  </button>

                  <button
                    onClick={() => setSelectedPaymentGateway('bank')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                      selectedPaymentGateway === 'bank'
                        ? 'border-[#004337] bg-[#eff4ff] text-[#004337] ring-2 ring-[#004337]'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    BRAC / EBL Net
                  </button>

                  <button
                    onClick={() => setSelectedPaymentGateway('card')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                      selectedPaymentGateway === 'card'
                        ? 'border-[#004337] bg-[#eff4ff] text-[#004337] ring-2 ring-[#004337]'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Visa / Mastercard
                  </button>
                </div>
              </div>

              <button
                onClick={handlePayRent}
                className="w-full py-3.5 bg-[#004337] hover:bg-[#0d5c4d] text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4 text-[#aaf0dc]" />
                <span>
                  {lang === 'bn'
                    ? `১-ক্লিকে সর্বমোট ${formatPrice(totalCurrentBill)} পরিশোধ করুন`
                    : `Clear All (${formatPrice(totalCurrentBill)}) via ${selectedPaymentGateway.toUpperCase()}`}
                </span>
              </button>
            </div>
          ) : (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  {lang === 'bn'
                    ? 'অক্টোবর ২০২৬ মাসের বাসা ভাড়া ও সকল বিল সফলভাবে পরিশোধ হয়েছে।'
                    : 'October 2026 Rent and all Split Utilities cleared successfully.'}
                </span>
              </div>

              <button
                onClick={openReceipt}
                className="px-4 py-2 bg-[#004337] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm hover:bg-[#0d5c4d]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'ভাড়া রশিদ ডাউনলোড (PDF)' : 'Download Rent Receipt'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Sidebar: Auto Reminders & NBR Tax Rebate Box */}
        <div className="lg:col-span-4 space-y-6">
          {/* Auto WhatsApp / SMS Reminder Configuration */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                <MessageCircle className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">
                {lang === 'bn' ? 'স্বয়ংক্রিয় নোটিফিকেশন ও বিল এলার্ট' : 'Auto Reminders & SMS Alert'}
              </h3>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              {lang === 'bn'
                ? 'বিল পরিশোধের তারিখ আসার আগে সরাসরি আপনার মোবাইলে ফ্রি এসএমএস ও হোয়াটসঅ্যাপ রিমাইন্ডার পান।'
                : 'Get WhatsApp and SMS notifications before due dates to avoid penalty fees.'}
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <label className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <span className="font-semibold text-slate-800 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#004337]" />
                  <span>SMS Bill Reminders</span>
                </span>
                <input
                  type="checkbox"
                  checked={autoSmsEnabled}
                  onChange={(e) => setAutoSmsEnabled(e.target.checked)}
                  className="w-4 h-4 accent-[#004337] cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <span className="font-semibold text-slate-800 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Alerts</span>
                </span>
                <input
                  type="checkbox"
                  checked={whatsAppReminder}
                  onChange={(e) => setWhatsAppReminder(e.target.checked)}
                  className="w-4 h-4 accent-[#004337] cursor-pointer"
                />
              </label>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Alert Mobile Number (+880)
                </label>
                <input
                  type="tel"
                  value={reminderPhone}
                  onChange={(e) => setReminderPhone(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#004337] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Reminder Advance Notice
                </label>
                <select
                  value={reminderDays}
                  onChange={(e) => setReminderDays(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#004337] focus:outline-none"
                >
                  <option value="1">1 Day Before Due Date (১ দিন আগে)</option>
                  <option value="3">3 Days Before Due Date (৩ দিন আগে)</option>
                  <option value="5">5 Days Before Due Date (৫ দিন আগে)</option>
                </select>
              </div>

              <button
                onClick={handleSaveReminder}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors"
              >
                {reminderSavedToast ? 'Settings Saved! ✓' : (lang === 'bn' ? 'সেটিংস সংরক্ষণ করুন' : 'Save Reminder Preferences')}
              </button>
            </div>
          </div>

          {/* NBR Tax Rebate Box */}
          <div className="bg-[#eff4ff] p-5 rounded-2xl border border-[#aaf0dc] space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#004337]" />
              <h4 className="font-bold text-xs text-[#004337] uppercase tracking-wider">
                {lang === 'bn' ? 'ইনকাম ট্যাক্স রিবেট সার্টিফিকেট' : 'NBR Income Tax Filing'}
              </h4>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'বাৎসরিক বাড়িভাড়া প্রদান বাবদ জাতীয় রাজস্ব বোর্ডে (NBR) কর রেয়াত দাবির জন্য বৈধ ডিজিটাল রশিদ সংগ্রহ করুন।'
                : 'Claim your annual House Rent Allowance (HRA) tax exemption in Bangladesh using our audited receipts.'}
            </p>

            <button
              onClick={openReceipt}
              className="w-full py-2.5 bg-white border border-slate-200 text-[#004337] font-bold text-xs rounded-xl shadow-sm hover:bg-slate-50 flex items-center justify-center gap-2"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'সর্বশেষ রশিদ দেখুন (September)' : 'View Sept Tax Receipt'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Historical Payment Receipts */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#004337]" />
          <span>{lang === 'bn' ? 'পূর্ববর্তী মাসের ভাড়ার রেকর্ড ও চালান' : 'Past Payment History & Receipts'}</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Receipt ID</th>
                <th className="py-2.5 px-3">Billing Month</th>
                <th className="py-2.5 px-3">Payment Date</th>
                <th className="py-2.5 px-3">Total Paid</th>
                <th className="py-2.5 px-3">Method</th>
                <th className="py-2.5 px-3 text-right">Official Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { id: 'RN-NBR-2026-09-8812', month: 'September 2026', date: '02 Sep 2026', total: 103500, method: 'BRAC Bank Transfer' },
                { id: 'RN-NBR-2026-08-7201', month: 'August 2026', date: '03 Aug 2026', total: 103500, method: 'bKash Escrow' },
                { id: 'RN-NBR-2026-07-6119', month: 'July 2026', date: '01 Jul 2026', total: 103500, method: 'EBL Internet Banking' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60">
                  <td className="py-3 px-3 font-mono font-bold text-slate-700">{row.id}</td>
                  <td className="py-3 px-3 font-semibold text-slate-800">{row.month}</td>
                  <td className="py-3 px-3 text-slate-500">{row.date}</td>
                  <td className="py-3 px-3 font-extrabold text-[#004337] tabular-nums">{formatPrice(row.total)}</td>
                  <td className="py-3 px-3 text-slate-600">{row.method}</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={openReceipt}
                      className="inline-flex items-center gap-1 text-[#004337] font-bold hover:underline"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official NBR Tax Rebate Rent Receipt Modal */}
      {showReceiptModal && selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-bold text-[#004337] uppercase tracking-wider">
                Government of Bangladesh • NBR Format
              </span>
              <button
                onClick={() => setShowReceiptModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Receipt Body: Printed Style */}
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-300 space-y-5 print:p-0 print:border-none">
              {/* Document Title & Revenue Stamp Seal */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-extrabold text-[#004337]">HOUSE RENT RECEIPT</h2>
                  <p className="text-xs text-slate-600 mt-0.5">Under Section 53A of Income Tax Act 2023</p>
                  <p className="text-xs font-mono font-bold text-slate-700 mt-1">
                    Receipt No: {selectedReceipt.receiptNo}
                  </p>
                </div>

                <div className="w-20 h-20 border-2 border-emerald-700 rounded-lg p-1 text-center flex flex-col items-center justify-center bg-emerald-50">
                  <span className="text-[8px] font-bold uppercase text-emerald-900">REVENUE STAMP</span>
                  <span className="text-xs font-extrabold text-emerald-800">৳১০</span>
                  <span className="text-[7px] text-emerald-700">VALIDATED</span>
                </div>
              </div>

              {/* Tenant & Landlord Info */}
              <div className="grid grid-cols-2 gap-4 text-xs pt-3 border-t border-slate-200">
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">TENANT PARTICULARS</span>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">{selectedReceipt.tenantName}</p>
                  <p className="text-slate-600">NID: {selectedReceipt.tenantNid}</p>
                  <p className="text-slate-600">TIN: {selectedReceipt.tenantTin}</p>
                </div>

                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">LANDLORD PARTICULARS</span>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">{selectedReceipt.landlordName}</p>
                  <p className="text-slate-600">TIN: {selectedReceipt.landlordTin}</p>
                  <p className="text-slate-600">Lakeview Owner Society</p>
                </div>
              </div>

              {/* Rented Property */}
              <div className="text-xs bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-bold block uppercase text-[10px]">DEMISED APARTMENT</span>
                <p className="font-bold text-slate-800">{selectedReceipt.propertyTitle}</p>
                <p className="text-slate-500 mt-0.5">{selectedReceipt.address}</p>
              </div>

              {/* Amount Breakdown */}
              <div className="space-y-1.5 text-xs pt-2 border-t border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-600">Monthly House Rent ({selectedReceipt.month}):</span>
                  <span className="font-bold text-slate-800">{formatPrice(selectedReceipt.rentAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Society Maintenance & Lift Service:</span>
                  <span className="font-bold text-slate-800">{formatPrice(selectedReceipt.serviceCharge)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 font-extrabold text-sm text-[#004337]">
                  <span>Total Amount Paid:</span>
                  <span>{formatPrice(selectedReceipt.totalPaid)}</span>
                </div>
              </div>

              {/* Footer Signatures */}
              <div className="flex justify-between items-end pt-6 border-t border-slate-200 text-xs">
                <div>
                  <div className="w-32 border-b border-slate-400 pb-1 text-center font-serif italic text-sm text-[#004337]">
                    Farhan Kabir
                  </div>
                  <span className="text-[10px] text-slate-400 block text-center mt-1">Landlord Signature & Seal</span>
                </div>

                <div className="text-right">
                  <QrCode className="w-10 h-10 text-slate-700 ml-auto" />
                  <span className="text-[9px] text-slate-400 block mt-0.5">Encrypted e-Tax Hash: #BD-NBR-99214</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-[#004337] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-[#0d5c4d] shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>{lang === 'bn' ? 'প্রিন্ট / পিডিএফ ডাউনলোড' : 'Print / Save as PDF'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
