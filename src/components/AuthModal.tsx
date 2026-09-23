import React, { useState, useEffect } from 'react';
import { useApp, UserProfile } from '../context/AppContext';
import {
  X,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  Building,
  KeyRound,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    lang,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setCurrentUser,
    setUserRole,
  } = useApp();

  const [mode, setMode] = useState<'login' | 'register' | 'otp'>(authModalMode);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [loginIdentifier, setLoginIdentifier] = useState('mohaimenhridoy@gmail.com');
  const [loginPassword, setLoginPassword] = useState('RentNest@2026');

  const [regName, setRegName] = useState('Mohaimen Hridoy');
  const [regPhone, setRegPhone] = useState('01711928374');
  const [regEmail, setRegEmail] = useState('mohaimenhridoy@gmail.com');
  const [regPassword, setRegPassword] = useState('RentNest@2026');
  const [regRole, setRegRole] = useState<'tenant' | 'landlord'>('tenant');
  const [regNid, setRegNid] = useState('199226928100049');
  const [agreedTerms, setAgreedTerms] = useState(true);

  // OTP step
  const [otpCode, setOtpCode] = useState(['5', '8', '2', '1']);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successToast, setSuccessToast] = useState('');

  useEffect(() => {
    setMode(authModalMode);
    setErrorMsg('');
    setSuccessToast('');
  }, [authModalMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  // Auto-fill Demo Data in Registration
  const handleFillDemoReg = (role: 'tenant' | 'landlord') => {
    if (role === 'tenant') {
      setRegRole('tenant');
      setRegName('Mohaimen Hridoy');
      setRegPhone('01711928374');
      setRegEmail('mohaimenhridoy@gmail.com');
      setRegNid('199226928100049');
      setRegPassword('RentNest@2026');
      setAgreedTerms(true);
      setSuccessToast(lang === 'bn' ? 'ডেমো ভাড়াটিয়া তথ্য সফলভাবে লোড হয়েছে!' : 'Demo Tenant data loaded!');
    } else {
      setRegRole('landlord');
      setRegName('Engr. Farhan Kabir');
      setRegPhone('01819283741');
      setRegEmail('farhan.kabir@lakeview.bd');
      setRegNid('198526928100088');
      setRegPassword('RentNest@2026');
      setAgreedTerms(true);
      setSuccessToast(lang === 'bn' ? 'ডেমো বাড়িওয়ালা তথ্য সফলভাবে লোড হয়েছে!' : 'Demo Landlord data loaded!');
    }
    setTimeout(() => setSuccessToast(''), 3000);
  };

  // Auto-fill Demo Login
  const handleFillDemoLogin = (role: 'tenant' | 'landlord') => {
    if (role === 'tenant') {
      setLoginIdentifier('mohaimenhridoy@gmail.com');
      setLoginPassword('RentNest@2026');
    } else {
      setLoginIdentifier('farhan.kabir@lakeview.bd');
      setLoginPassword('RentNest@2026');
    }
    setSuccessToast(lang === 'bn' ? 'ডেমো লগইন তথ্য লোড হয়েছে!' : 'Demo login credentials loaded!');
    setTimeout(() => setSuccessToast(''), 2500);
  };

  // Handle Instant 1-Click Demo Login
  const handleQuickDemoLogin = (role: 'tenant' | 'landlord') => {
    setIsLoading(true);
    setTimeout(() => {
      if (role === 'tenant') {
        const user: UserProfile = {
          id: 'user-mohaimen',
          name: 'Mohaimen Hridoy',
          email: 'mohaimenhridoy@gmail.com',
          phone: '01711928374',
          role: 'tenant',
          nidVerified: true,
          nidNumber: '199226928100049',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
        };
        setCurrentUser(user);
        setUserRole('tenant');
      } else {
        const user: UserProfile = {
          id: 'user-farhan',
          name: 'Engr. Farhan Kabir',
          email: 'farhan.kabir@lakeview.bd',
          phone: '01819283741',
          role: 'landlord',
          nidVerified: true,
          nidNumber: '198526928100088',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
        };
        setCurrentUser(user);
        setUserRole('landlord');
      }
      setIsLoading(false);
      setIsAuthModalOpen(false);
    }, 400);
  };

  // Submit Login
  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier) {
      setErrorMsg(lang === 'bn' ? 'ইমেইল বা মোবাইল নম্বর দিন' : 'Enter email or mobile number');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const isLandlord = loginIdentifier.toLowerCase().includes('farhan') || loginIdentifier.includes('landlord');
      const user: UserProfile = {
        id: `user-${Date.now()}`,
        name: isLandlord ? 'Engr. Farhan Kabir' : (loginIdentifier.includes('@') ? loginIdentifier.split('@')[0] : 'Mohaimen Hridoy'),
        email: loginIdentifier.includes('@') ? loginIdentifier : `${loginIdentifier}@rentnest.bd`,
        phone: loginIdentifier.startsWith('01') ? loginIdentifier : '01711928374',
        role: isLandlord ? 'landlord' : 'tenant',
        nidVerified: true,
        nidNumber: isLandlord ? '198526928100088' : '199226928100049',
        avatar: isLandlord
          ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
      };
      setCurrentUser(user);
      setUserRole(user.role);
      setIsLoading(false);
      setIsAuthModalOpen(false);
    }, 500);
  };

  // Submit Register
  const handleSubmitRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regPhone) {
      setErrorMsg(lang === 'bn' ? 'নাম এবং মোবাইল নম্বর দেওয়া আবশ্যক' : 'Name and mobile number are required');
      return;
    }
    // Proceed to OTP step
    setMode('otp');
  };

  // Verify OTP & Complete Register
  const handleVerifyOtp = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        name: regName,
        email: regEmail || `${regPhone}@rentnest.bd`,
        phone: regPhone,
        role: regRole,
        nidVerified: Boolean(regNid && regNid.length >= 10),
        nidNumber: regNid || '199226928100049',
        avatar: regRole === 'tenant'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80'
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
      };
      setCurrentUser(newUser);
      setUserRole(regRole);
      setIsLoading(false);
      setIsAuthModalOpen(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 space-y-4 shadow-2xl border border-slate-200 relative my-8">
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#004337] text-white shadow-md shadow-[#004337]/20 mb-1">
            <ShieldCheck className="w-6 h-6 text-[#aaf0dc]" />
          </div>
          <h2 className="text-xl font-extrabold text-[#0b1c30]">
            {mode === 'otp'
              ? (lang === 'bn' ? 'মোবাইল নম্বর যাচাই (OTP)' : 'Verify Mobile OTP')
              : mode === 'login'
              ? (lang === 'bn' ? 'RentNest অ্যাকাউন্টে লগইন' : 'Sign in to RentNest')
              : (lang === 'bn' ? 'নতুন অ্যাকাউন্ট খুলুন' : 'Create RentNest Account')}
          </h2>
          <p className="text-xs text-slate-500">
            {mode === 'otp'
              ? (lang === 'bn' ? `${regPhone} নম্বরে প্রেরিত ৪ সংখ্যার কোড দিন` : `Enter 4-digit code sent to ${regPhone}`)
              : (lang === 'bn' ? 'জাতীয় পরিচয়পত্র (NID) ও প্রাতিষ্ঠানিক এসক্রো প্রটেক্টেড' : 'National ID & Escrow Protected Rental System')}
          </p>
        </div>

        {/* Success / Info Toast */}
        {successToast && (
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Tab Switcher (if not in OTP mode) */}
        {mode !== 'otp' && (
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => {
                setMode('login');
                setErrorMsg('');
              }}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-white text-[#004337] shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {lang === 'bn' ? 'লগইন (Sign In)' : 'Sign In'}
            </button>
            <button
              onClick={() => {
                setMode('register');
                setErrorMsg('');
              }}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'register'
                  ? 'bg-white text-[#004337] shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {lang === 'bn' ? 'রেজিস্ট্রেশন (Register)' : 'Register'}
            </button>
          </div>
        )}

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {/* ===================== LOGIN FORM ===================== */}
        {mode === 'login' && (
          <form onSubmit={handleSubmitLogin} className="space-y-3.5">
            {/* 1-Click Instant Demo Login Banner */}
            <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold text-[#004337] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  {lang === 'bn' ? '১-ক্লিকে সরাসরি ডেমো লগইন:' : '1-Click Instant Demo Logins:'}
                </span>
                <span className="text-[10px] text-emerald-700 font-bold bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                  Ready to test
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('tenant')}
                  className="p-2 rounded-lg bg-white hover:bg-emerald-50/50 border border-emerald-200 text-left transition-all hover:scale-[1.02]"
                >
                  <span className="text-xs font-bold text-[#004337] block leading-tight">ভাড়াটিয়া ডেমো</span>
                  <span className="text-[10px] text-slate-500">Mohaimen Hridoy</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('landlord')}
                  className="p-2 rounded-lg bg-white hover:bg-emerald-50/50 border border-emerald-200 text-left transition-all hover:scale-[1.02]"
                >
                  <span className="text-xs font-bold text-[#004337] block leading-tight">বাড়িওয়ালা ডেমো</span>
                  <span className="text-[10px] text-slate-500">Engr. Farhan Kabir</span>
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">
                  {lang === 'bn' ? 'ইমেইল অথবা মোবাইল নম্বর' : 'Email or Phone'}
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleFillDemoLogin('tenant')}
                    className="text-[10px] text-[#004337] font-bold hover:underline"
                  >
                    + Tenant
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFillDemoLogin('landlord')}
                    className="text-[10px] text-[#004337] font-bold hover:underline"
                  >
                    + Landlord
                  </button>
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="01711XXXXXX or email@example.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#004337] focus:outline-none"
                  required
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">
                  {lang === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
                </label>
                <span className="text-[10px] text-slate-400 font-mono">RentNest@2026</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#004337] focus:outline-none"
                  required
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#004337] hover:bg-[#0d5c4d] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <span>লগইন হচ্ছে...</span>
              ) : (
                <>
                  <span>{lang === 'bn' ? 'লগইন করুন' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4 text-[#aaf0dc]" />
                </>
              )}
            </button>
          </form>
        )}

        {/* ===================== REGISTER FORM ===================== */}
        {mode === 'register' && (
          <form onSubmit={handleSubmitRegister} className="space-y-3">
            {/* Quick Demo Pre-fill Bar */}
            <div className="p-2.5 bg-amber-50/80 border border-amber-200 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  {lang === 'bn' ? '১-ক্লিকে ডেমো তথ্য পূরণ করুন:' : '1-Click Auto-fill Demo Data:'}
                </span>
                <span className="text-[9px] font-bold text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full">
                  Instant Test
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleFillDemoReg('tenant')}
                  className="py-1.5 px-2 bg-white hover:bg-amber-100 border border-amber-300 text-[#004337] text-[11px] font-bold rounded-lg transition-colors text-center"
                >
                  {lang === 'bn' ? '⚡ ভাড়াটিয়া ডেমো' : '⚡ Tenant Demo'}
                </button>
                <button
                  type="button"
                  onClick={() => handleFillDemoReg('landlord')}
                  className="py-1.5 px-2 bg-white hover:bg-amber-100 border border-amber-300 text-[#004337] text-[11px] font-bold rounded-lg transition-colors text-center"
                >
                  {lang === 'bn' ? '⚡ বাড়িওয়ালা ডেমো' : '⚡ Landlord Demo'}
                </button>
              </div>
            </div>

            {/* Role Radio Picker */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === 'bn' ? 'অ্যাকাউন্টের ধরণ' : 'Account Role'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRegRole('tenant')}
                  className={`p-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    regRole === 'tenant'
                      ? 'border-[#004337] bg-[#eff4ff] text-[#004337] ring-1 ring-[#004337]'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'ভাড়াটিয়া (Tenant)' : 'Tenant'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRegRole('landlord')}
                  className={`p-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    regRole === 'landlord'
                      ? 'border-[#004337] bg-[#eff4ff] text-[#004337] ring-1 ring-[#004337]'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'বাড়িওয়ালা (Landlord)' : 'Landlord'}</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === 'bn' ? 'সম্পূর্ণ নাম (ভোটার আইডি অনুযায়ী)' : 'Full Name (As per NID)'}
              </label>
              <input
                type="text"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="e.g. Mohaimen Hridoy"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#004337] focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'মোবাইল (+880)' : 'Phone (+880)'}
                </label>
                <input
                  type="tel"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="01711XXXXXX"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#004337] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'ইমেইল' : 'Email'}
                </label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#004337] focus:outline-none"
                />
              </div>
            </div>

            {/* NID Smart Card Input */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">
                  {lang === 'bn' ? 'জাতীয় পরিচয়পত্র (NID / Smart Card)' : 'National ID (NID)'}
                </label>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  EC Verified
                </span>
              </div>
              <input
                type="text"
                value={regNid}
                onChange={(e) => setRegNid(e.target.value)}
                placeholder="10 or 17 digit NID number"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#004337] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
              </label>
              <input
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#004337] focus:outline-none"
                required
              />
            </div>

            <label className="flex items-start gap-2 pt-1 text-slate-600 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-[#004337] cursor-pointer"
                required
              />
              <span className="text-[11px] leading-tight">
                {lang === 'bn'
                  ? 'আমি RentNest-এর প্রাতিষ্ঠানিক ব্যাংক এসক্রো এবং ভাড়াটিয়া নিরাপত্তা নীতিমালা মেনে নিচ্ছি।'
                  : 'I accept RentNest Bank Escrow and Tenancy Protection Terms.'}
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3 bg-[#004337] hover:bg-[#0d5c4d] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{lang === 'bn' ? 'পরবর্তী ধাপ (মোবাইল ওটিপি যাচাই)' : 'Continue to Phone OTP'}</span>
              <ArrowRight className="w-4 h-4 text-[#aaf0dc]" />
            </button>
          </form>
        )}

        {/* ===================== OTP VERIFICATION STEP ===================== */}
        {mode === 'otp' && (
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <KeyRound className="w-6 h-6" />
            </div>

            <p className="text-xs text-slate-600">
              {lang === 'bn'
                ? `আপনার ${regPhone} মোবাইলে প্রেরিত ৪ সংখ্যার ভেরিফিকেশন কোড:`
                : `Enter 4-digit code sent to ${regPhone}:`}
            </p>

            {/* 4 Digit Boxes */}
            <div className="flex justify-center gap-2.5">
              {otpCode.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newOtp = [...otpCode];
                    newOtp[index] = e.target.value;
                    setOtpCode(newOtp);
                  }}
                  className="w-12 h-12 text-center text-lg font-bold border-2 border-[#004337] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#aaf0dc] bg-slate-50 text-slate-900"
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setOtpCode(['5', '8', '2', '1']);
                setSuccessToast(lang === 'bn' ? 'ডেমো ওটিপি (5821) পূরণ করা হয়েছে!' : 'Demo OTP (5821) filled!');
                setTimeout(() => setSuccessToast(''), 2500);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg text-amber-900 text-xs font-bold transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>{lang === 'bn' ? '⚡ ডেমো ওটিপি পূরণ করুন (5821)' : '⚡ Auto-fill Demo OTP (5821)'}</span>
            </button>

            <button
              onClick={handleVerifyOtp}
              disabled={isLoading}
              className="w-full py-3 bg-[#004337] hover:bg-[#0d5c4d] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <span>যাচাই হচ্ছে...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#aaf0dc]" />
                  <span>{lang === 'bn' ? 'যাচাই ও অ্যাকাউন্ট চালু করুন' : 'Verify & Activate Account'}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
