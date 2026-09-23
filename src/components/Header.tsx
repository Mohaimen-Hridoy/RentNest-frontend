import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Home,
  ShieldCheck,
  CalendarCheck,
  FileText,
  PlusCircle,
  User,
  Globe,
  DollarSign,
  Menu,
  X,
  Check,
  MessageSquare,
  LogOut,
  LogIn,
  UserPlus,
  BadgeCheck,
  MoreHorizontal,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    lang,
    setLang,
    currency,
    setCurrency,
    userRole,
    setUserRole,
    currentUser,
    openAuthModal,
    logout,
    activePage,
    setActivePage,
    bookings,
    t,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);

  const navigateTo = (page: any) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_1px_8px_rgba(15,23,42,0.04)]">
      <div className="h-20 max-w-360 mx-auto px-4 md:px-8 flex items-center justify-between gap-3">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('browse')}
            className="flex items-center gap-2.5 group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-[#004337] flex items-center justify-center text-white shadow-md shadow-[#004337]/20 group-hover:scale-105 transition-transform">
              <Home className="w-5 h-5 text-[#aaf0dc]" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-extrabold text-xl lg:text-2xl tracking-tight text-[#004337] leading-none">
                RentNest
              </span>
              <span className="text-[10px] font-semibold text-[#0d5c4d] tracking-wider uppercase mt-0.5">
                {lang === 'bn' ? 'ভেরিফাইড হোম রেন্টাল' : 'Verified Home Rentals'}
              </span>
            </div>
          </button>
        </div>

        {/* Navigation Links for All Stitch Pages */}
        <nav className="hidden xl:flex items-center gap-1">
          <button
            onClick={() => navigateTo('browse')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-colors ${
              activePage === 'browse'
                ? 'bg-[#eff4ff] text-[#004337] shadow-sm'
                : 'text-slate-600 hover:text-[#004337] hover:bg-[#eff4ff]'
            }`}
          >
            {t('nav.browse', 'Browse Homes')}
          </button>

          <button
            onClick={() => navigateTo('protection')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              activePage === 'protection'
                ? 'bg-[#eff4ff] text-[#004337] shadow-sm'
                : 'text-slate-600 hover:text-[#004337] hover:bg-[#eff4ff]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#004337]" />
            <span>{t('nav.protection', 'Tenancy Protection')}</span>
          </button>

          <button
            onClick={() => navigateTo('rent-payments')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              activePage === 'rent-payments'
                ? 'bg-[#eff4ff] text-[#004337] shadow-sm'
                : 'text-slate-600 hover:text-[#004337] hover:bg-[#eff4ff]'
            }`}
          >
            <FileText className="w-4 h-4 text-[#004337]" />
            <span>{t('nav.rentPayments', 'Rent & Utilities')}</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowMoreDropdown((open) => !open)}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                ['messages', 'digital-lease', 'my-bookings'].includes(activePage)
                  ? 'bg-[#eff4ff] text-[#004337] shadow-sm'
                  : 'text-slate-600 hover:text-[#004337] hover:bg-[#eff4ff]'
              }`}
              aria-expanded={showMoreDropdown}
            >
              <MoreHorizontal className="w-4 h-4 text-[#004337]" />
              <span>{lang === 'bn' ? 'আরও' : 'More'}</span>
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">
                {bookings.length + 2}
              </span>
            </button>

            {showMoreDropdown && (
              <div className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                <button
                  onClick={() => { navigateTo('messages'); setShowMoreDropdown(false); }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-left ${activePage === 'messages' ? 'bg-[#eff4ff] text-[#004337]' : 'text-slate-700 hover:bg-slate-50'}`}
                >
                  <MessageSquare className="w-4 h-4 text-[#004337]" />
                  <span className="flex-1">{t('nav.messages', 'Messages')}</span>
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center">2</span>
                </button>
                <button
                  onClick={() => { navigateTo('digital-lease'); setShowMoreDropdown(false); }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-left ${activePage === 'digital-lease' ? 'bg-[#eff4ff] text-[#004337]' : 'text-slate-700 hover:bg-slate-50'}`}
                >
                  <ShieldCheck className="w-4 h-4 text-[#004337]" />
                  <span>{t('nav.digitalLease', 'Digital Lease')}</span>
                </button>
                <button
                  onClick={() => { navigateTo('my-bookings'); setShowMoreDropdown(false); }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-left ${activePage === 'my-bookings' ? 'bg-[#eff4ff] text-[#004337]' : 'text-slate-700 hover:bg-slate-50'}`}
                >
                  <CalendarCheck className="w-4 h-4 text-[#004337]" />
                  <span className="flex-1">{t('nav.myBookings', 'My Bookings')}</span>
                  {bookings.length > 0 && <span className="w-4 h-4 rounded-full bg-[#a13e28] text-white text-[10px] flex items-center justify-center">{bookings.length}</span>}
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => navigateTo('post-listing')}
            className={`ml-2 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 border ${
              activePage === 'post-listing'
                ? 'bg-[#004337] text-white border-[#004337]'
                : 'text-[#004337] border-[#004337]/30 hover:border-[#004337] hover:bg-[#004337]/5'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{t('nav.addListing', 'Post Listing')}</span>
          </button>
        </nav>

        {/* Right Action Controls: Currency, Language & Auth State */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Currency Toggle */}
          <button
            onClick={() => setCurrency(currency === 'BDT' ? 'USD' : 'BDT')}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] text-xs font-semibold transition-colors border border-slate-200/50"
            title="Toggle Currency"
          >
            <DollarSign className="w-3.5 h-3.5 text-[#004337]" />
            <span className="tabular-nums">{currency === 'BDT' ? 'BDT (৳)' : 'USD ($)'}</span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] text-xs font-semibold transition-colors border border-slate-200/50"
            title="Language Selection"
          >
            <Globe className="w-3.5 h-3.5 text-[#004337]" />
            <span>{lang === 'bn' ? 'বাংলা' : 'EN'}</span>
          </button>

          {/* USER AUTHENTICATED STATE */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all text-left"
              >
                <div className="relative">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-[#aaf0dc]"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="text-xs font-bold text-[#004337] leading-tight">
                    {userRole === 'tenant' ? (lang === 'bn' ? 'ভাড়াটিয়া' : 'Tenant') : (lang === 'bn' ? 'বাড়িওয়ালা' : 'Landlord')}
                  </span>
                  <span className="text-[10px] text-slate-500 leading-tight truncate max-w-22.5">
                    {currentUser.name}
                  </span>
                </div>
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2.5 z-50 space-y-1">
                  <div className="px-3 py-2.5 border-b border-slate-100 mb-1 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-extrabold text-slate-800">{currentUser.name}</p>
                      {currentUser.nidVerified && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <BadgeCheck className="w-3 h-3 text-emerald-600" />
                          <span>EC NID</span>
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{currentUser.email}</p>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5">{currentUser.phone}</p>
                  </div>

                  <div className="space-y-0.5">
                    <button
                      onClick={() => {
                        setUserRole('tenant');
                        setShowProfileDropdown(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold ${
                        userRole === 'tenant' ? 'bg-[#eff4ff] text-[#004337]' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5" />
                        {lang === 'bn' ? 'ভাড়াটিয়া মোড (Tenant)' : 'Tenant Mode'}
                      </span>
                      {userRole === 'tenant' && <Check className="w-3.5 h-3.5 text-[#004337]" />}
                    </button>

                    <button
                      onClick={() => {
                        setUserRole('landlord');
                        setShowProfileDropdown(false);
                        navigateTo('post-listing');
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold ${
                        userRole === 'landlord' ? 'bg-[#eff4ff] text-[#004337]' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Home className="w-3.5 h-3.5" />
                        {lang === 'bn' ? 'বাড়িওয়ালা মোড (Landlord)' : 'Landlord Mode'}
                      </span>
                      {userRole === 'landlord' && <Check className="w-3.5 h-3.5 text-[#004337]" />}
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        navigateTo('rent-payments');
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      <span>{lang === 'bn' ? 'ভাড়া ও রসিদ ব্যবস্থাপনা' : 'Rent Receipts'}</span>
                    </button>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          logout();
                          setShowProfileDropdown(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>{lang === 'bn' ? 'লগআউট করুন (Log Out)' : 'Log Out'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* USER LOGGED OUT STATE: LOGIN & REGISTER BUTTONS */
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('login')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#004337] hover:bg-[#eff4ff] border border-[#004337]/30 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'লগইন' : 'Sign In'}</span>
              </button>

              <button
                onClick={() => openAuthModal('register')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#004337] hover:bg-[#0d5c4d] text-white shadow-sm transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5 text-[#aaf0dc]" />
                <span>{lang === 'bn' ? 'রেজিস্ট্রেশন' : 'Register'}</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 max-h-[calc(100vh-80px)] overflow-y-auto">
          {currentUser ? (
            <div className="p-3 bg-slate-50 rounded-xl mb-3 flex items-center justify-between border border-slate-200">
              <div className="flex items-center gap-2.5">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">{currentUser.name}</span>
                  <span className="text-[10px] text-slate-500">{currentUser.phone}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="text-xs font-bold text-rose-600 px-2 py-1 rounded-lg hover:bg-rose-50"
              >
                {lang === 'bn' ? 'লগআউট' : 'Log Out'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="w-full py-2 bg-slate-100 text-slate-800 text-xs font-bold rounded-lg text-center"
              >
                {lang === 'bn' ? 'লগইন' : 'Sign In'}
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openAuthModal('register');
                }}
                className="w-full py-2 bg-[#004337] text-white text-xs font-bold rounded-lg text-center"
              >
                {lang === 'bn' ? 'রেজিস্ট্রেশন' : 'Register'}
              </button>
            </div>
          )}

          <button
            onClick={() => navigateTo('browse')}
            className={`w-full text-left px-3 py-2 rounded-lg font-semibold text-xs ${
              activePage === 'browse' ? 'bg-[#eff4ff] text-[#004337]' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            {t('nav.browse', 'Browse Homes')}
          </button>

          <button
            onClick={() => navigateTo('protection')}
            className={`w-full text-left px-3 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 ${
              activePage === 'protection' ? 'bg-[#eff4ff] text-[#004337]' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#004337]" />
            <span>{t('nav.protection', 'Tenancy Protection')}</span>
          </button>

          <button
            onClick={() => navigateTo('rent-payments')}
            className={`w-full text-left px-3 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 ${
              activePage === 'rent-payments' ? 'bg-[#eff4ff] text-[#004337]' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4 text-[#004337]" />
            <span>{t('nav.rentPayments', 'Rent & Utilities')}</span>
          </button>

          <button
            onClick={() => navigateTo('messages')}
            className={`w-full text-left px-3 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 ${
              activePage === 'messages' ? 'bg-[#eff4ff] text-[#004337]' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-[#004337]" />
            <span>{t('nav.messages', 'Messages')}</span>
          </button>

          <button
            onClick={() => navigateTo('digital-lease')}
            className={`w-full text-left px-3 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 ${
              activePage === 'digital-lease' ? 'bg-[#eff4ff] text-[#004337]' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#004337]" />
            <span>{t('nav.digitalLease', 'Digital Lease')}</span>
          </button>

          <button
            onClick={() => navigateTo('my-bookings')}
            className={`w-full text-left px-3 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 ${
              activePage === 'my-bookings' ? 'bg-[#eff4ff] text-[#004337]' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <CalendarCheck className="w-4 h-4 text-[#004337]" />
            <span>{t('nav.myBookings', 'My Bookings')}</span>
          </button>

          <button
            onClick={() => navigateTo('post-listing')}
            className="w-full text-left px-3 py-2 rounded-lg font-bold text-xs text-[#004337] bg-[#aaf0dc]/40 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4 text-[#004337]" />
            <span>{t('nav.addListing', 'Post Listing')}</span>
          </button>
        </div>
      )}
    </header>
  );
};
