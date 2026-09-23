import React from 'react';
import { Home, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { lang, setIsEscrowModalOpen } = useApp();

  return (
    <footer className="w-full bg-white text-[#0b1c30] border-t border-slate-200/80 shadow-[0_-1px_12px_rgba(15,23,42,0.03)] mt-8">
      <div className="max-w-360 mx-auto px-4 md:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 pr-0 lg:pr-8">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#004337] flex items-center justify-center text-white shadow-sm">
                <Home className="w-4 h-4 text-[#aaf0dc]" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-[#004337]">
                RentNest
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-4 leading-relaxed">
              {lang === 'bn'
                ? 'রেন্টনেস্ট বাংলাদেশের প্রথম প্রাতিষ্ঠানিক ডিজিটাল রেন্টাল মার্কেটপ্লেস—যেখানে ভেরিফাইড ফ্ল্যাট, ব্যাংকিং এসক্রো নিরাপত্তা ও নিখুঁত লিগ্যাল অডিটে বাসা ভাড়া নেওয়া হয়।'
                : 'RentNest is a transparent residential rental marketplace engineered for frictionless leasing, verified home listings, and institutional-grade tenant escrow security across urban hubs.'}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#eff4ff] text-[#004337] border border-[#aaf0dc]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#004337]" />
                <span>100% Verified Owners</span>
              </span>
              <button
                onClick={() => setIsEscrowModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#eff4ff] text-[#004337] border border-[#aaf0dc] hover:bg-[#aaf0dc]/40 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#004337]" />
                <span>Escrow Guard Active</span>
              </button>
            </div>
          </div>

          {/* Rental Hubs */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Rental Hubs
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <a href="#browse" className="hover:text-[#004337] transition-colors">
                  Dhaka Rentals (Gulshan, Banani, Baridhara)
                </a>
              </li>
              <li>
                <a href="#browse" className="hover:text-[#004337] transition-colors">
                  Dhanmondi & Lalmatia Family Flats
                </a>
              </li>
              <li>
                <a href="#browse" className="hover:text-[#004337] transition-colors">
                  Chattogram (Khulshi, Nasirabad, Agrabad)
                </a>
              </li>
              <li>
                <a href="#browse" className="hover:text-[#004337] transition-colors">
                  Sylhet Hub (Upashohor, Zindabazar)
                </a>
              </li>
              <li>
                <a href="#browse" className="hover:text-[#004337] transition-colors">
                  Diplomatic Penthouse Residences
                </a>
              </li>
            </ul>
          </div>

          {/* Renter Protection */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Renter Protection
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => setIsEscrowModalOpen(true)}
                  className="hover:text-[#004337] transition-colors text-left"
                >
                  Standard Digital Lease Agreement
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsEscrowModalOpen(true)}
                  className="hover:text-[#004337] transition-colors text-left"
                >
                  Deposit Escrow Guarantee
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsEscrowModalOpen(true)}
                  className="hover:text-[#004337] transition-colors text-left"
                >
                  Dispute Resolution Board
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsEscrowModalOpen(true)}
                  className="hover:text-[#004337] transition-colors text-left"
                >
                  Move-in Condition Audit
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsEscrowModalOpen(true)}
                  className="hover:text-[#004337] transition-colors text-left"
                >
                  Emergency Maintenance Protocol
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Trust & Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <a href="#terms" className="hover:text-[#004337] transition-colors">
                  Terms of Tenancy
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-[#004337] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#vetting" className="hover:text-[#004337] transition-colors">
                  Landlord Vetting Guidelines
                </a>
              </li>
              <li>
                <a href="#fair" className="hover:text-[#004337] transition-colors">
                  Fair Housing Statement
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#004337] transition-colors">
                  Support & Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2025-2026 RentNest Technologies Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-800 transition-colors">
              Privacy
            </a>
            <a href="#security" className="hover:text-slate-800 transition-colors">
              Security
            </a>
            <a href="#status" className="hover:text-slate-800 transition-colors">
              Platform Status
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
