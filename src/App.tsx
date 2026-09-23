import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { PropertyFeed } from './components/PropertyFeed';
import { InteractiveMap } from './components/InteractiveMap';
import { PropertyCard } from './components/PropertyCard';
import { ScheduleVisitModal } from './components/ScheduleVisitModal';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { TenancyProtectionModal } from './components/TenancyProtectionModal';
import { AddListingModal } from './components/AddListingModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { TenancyProtectionPage } from './pages/TenancyProtectionPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { DigitalLeasePage } from './pages/DigitalLeasePage';
import { PostListingPage } from './pages/PostListingPage';
import { RentUtilityDashboardPage } from './pages/RentUtilityDashboardPage';
import { MessagesPage } from './pages/MessagesPage';
import { Property, PropertyFilterParams } from './types/property';
import { useProperties } from './api/queries';
import { Map, Grid } from 'lucide-react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const MainDashboard: React.FC = () => {
  const {
    lang,
    activePage,
    setActivePage,
    selectedProperty,
    setSelectedProperty,
    viewPropertyDetail,
    isScheduleModalOpen,
    setIsScheduleModalOpen,
    scheduleTargetProperty,
    openScheduleModal,
    isAddListingOpen,
    setIsAddListingOpen,
    isEscrowModalOpen,
    setIsEscrowModalOpen,
  } = useApp();

  const [viewMode, setViewMode] = useState<'split' | 'grid'>('grid');
  const [filters, setFilters] = useState<PropertyFilterParams>({
    search: '',
    sortBy: 'featured',
  });

  // TanStack Query for property fetching & filtering
  const { data, isLoading } = useProperties(filters);
  const properties = data?.data || [];
  const totalCount = data?.total ?? properties.length;

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff]">
      {/* Top Header Navigation */}
      <Header />

      <main className="w-full pt-20 flex-1">
        {/* Render Active Stitch Page */}
        {activePage === 'browse' && (
          <>
            <section className="landing-hero overflow-hidden">
              <div className="max-w-360 mx-auto px-4 md:px-8 py-8 lg:py-12">
                <div className="grid lg:grid-cols-[1.02fr_0.98fr] items-center gap-8 lg:gap-14">
                  <div className="max-w-2xl">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#aaf0dc]/15 border border-[#aaf0dc]/35 text-[#d7fff2] text-[11px] font-bold uppercase tracking-[0.14em]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#aaf0dc]" />
                      {lang === 'bn' ? 'বাংলাদেশের ভেরিফাইড রেন্টাল প্ল্যাটফর্ম' : 'Bangladesh’s verified rental platform'}
                    </span>
                    <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-white">
                      {lang === 'bn' ? 'আপনার পরের বাসাটি খুঁজে নিন নিশ্চিন্তে' : 'Find a home that feels like yours'}
                    </h1>
                    <p className="mt-5 max-w-xl text-sm md:text-base leading-relaxed text-[#d7ebe5]">
                      {lang === 'bn'
                        ? 'ভেরিফাইড মালিক, স্বচ্ছ ভাড়া এবং নিরাপদ ডিজিটাল চুক্তির মাধ্যমে শহরে বাসা খোঁজা এখন আরও সহজ।'
                        : 'Discover verified homes with transparent pricing, trusted owners, and protected digital leasing across Dhaka.'}
                    </p>
                    <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-[#d7fff2]">
                      <span><strong className="text-lg text-white">100%</strong> Verified owners</span>
                      <span><strong className="text-lg text-white">৳0</strong> Hidden fees</span>
                      <span><strong className="text-lg text-white">24/7</strong> Support</span>
                    </div>
                  </div>
                  <div className="landing-hero__media relative min-h-62.5 lg:min-h-80 rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                    <img
                      src="/src/assets/images/rentnest_gulshan_lakeview_1790194743752.jpg"
                      alt={lang === 'bn' ? 'গুলশানের লেকভিউ ভেরিফাইড বাসা' : 'Verified lakeview home in Gulshan'}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#002d26]/80 via-transparent to-transparent" />
                    <div className="absolute left-5 right-5 bottom-5 flex items-end justify-between gap-4 text-white">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-[#aaf0dc] font-bold">Featured residence</p>
                        <p className="mt-1 text-base font-bold">Gulshan Lakeview Suite</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-white/15 backdrop-blur-md px-3 py-1.5 text-xs font-bold border border-white/20">৳৯৫,০০০ / মাস</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Search and filter controls */}
            <FilterBar
              filters={filters}
              onFilterChange={setFilters}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              totalHomesCount={totalCount}
            />

            {/* Content Container */}
            <div className="browse-canvas w-full max-w-360 mx-auto px-4 md:px-8 pt-5 pb-32 lg:pb-5">
              {viewMode === 'split' ? (
                /* Split View 50/50 Desktop Canvas: Feed on left + Vector Map on right */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                  <div className="lg:col-span-6 xl:col-span-5 min-w-0">
                    <PropertyFeed
                      properties={properties}
                      isLoading={isLoading}
                      filters={filters}
                      onFilterChange={setFilters}
                      onSelectProperty={(prop) => viewPropertyDetail(prop)}
                      onScheduleVisit={(prop) => openScheduleModal(prop)}
                    />
                  </div>

                  <div className="hidden lg:block lg:col-span-6 xl:col-span-7 min-w-0">
                    <InteractiveMap
                      properties={properties}
                      onSelectProperty={(prop) => viewPropertyDetail(prop)}
                      onScheduleVisit={(prop) => openScheduleModal(prop)}
                    />
                  </div>
                </div>
              ) : (
                /* Full Grid View: 3-column cards */
                <div className="space-y-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between pb-4 border-b border-slate-200/80">
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#0d5c4d] mb-1">
                        {lang === 'bn' ? 'কিউরেটেড রেন্টাল কালেকশন' : 'Curated rental collection'}
                      </p>
                      <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                        {lang === 'bn' ? 'ভেরিফাইড বাসা খুঁজে নিন' : 'Find a verified home'}
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        {lang === 'bn'
                          ? `${properties.length}টি নিরাপদ ও যাচাইকৃত প্রোপার্টি আপনার জন্য প্রস্তুত`
                          : `${properties.length} verified properties selected for your search`}
                      </p>
                    </div>
                    <button
                      onClick={() => setViewMode('split')}
                      className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[#004337] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#004337]/15 hover:bg-[#0d5c4d] transition-colors"
                    >
                      <Map className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? 'ম্যাপে দেখুন' : 'Switch to Split Map'}</span>
                    </button>
                  </div>

                  <div className="property-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {properties.map((prop) => (
                      <PropertyCard
                        key={prop.id}
                        property={prop}
                        variant="grid"
                        onSelect={(p) => viewPropertyDetail(p)}
                        onScheduleVisit={(p) => openScheduleModal(p)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Floating Sticky Switcher Drawer */}
            <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200 p-3 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-semibold text-slate-500 uppercase">
                  {lang === 'bn' ? 'নির্বাচিত এলাকা' : 'Active Area'}
                </span>
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  {filters.search || (lang === 'bn' ? 'গুলশান ও বনানী' : 'Gulshan & Banani')}
                </p>
                <span className="text-[#004337] font-bold text-[11px]">
                  {properties.length} {lang === 'bn' ? 'টি ভেরিফাইড বাসা' : 'Verified Homes'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode(viewMode === 'split' ? 'grid' : 'split')}
                  className="px-3.5 py-2 rounded-xl bg-[#004337] text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
                >
                  {viewMode === 'split' ? (
                    <>
                      <Grid className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? 'লিস্ট ভিউ' : 'List View'}</span>
                    </>
                  ) : (
                    <>
                      <Map className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? 'ম্যাপ ভিউ' : 'Map View'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}

        {/* Dedicated Full Page: Property Detail */}
        {activePage === 'property-detail' && (
          <div className="page-surface"><PropertyDetailPage properties={properties} /></div>
        )}

        {/* Dedicated Full Page: Tenancy Protection */}
        {activePage === 'protection' && (
          <div className="page-surface"><TenancyProtectionPage /></div>
        )}

        {/* Dedicated Full Page: My Bookings & Saved Homes */}
        {activePage === 'my-bookings' && (
          <div className="page-surface"><MyBookingsPage properties={properties} /></div>
        )}

        {/* Dedicated Full Page: Digital Lease & Escrow */}
        {activePage === 'digital-lease' && (
          <div className="page-surface"><DigitalLeasePage properties={properties} /></div>
        )}

        {/* Dedicated Full Page: Rent & Utility Split Dashboard */}
        {activePage === 'rent-payments' && (
          <div className="page-surface"><RentUtilityDashboardPage /></div>
        )}

        {/* Dedicated Full Page: Real-time Messages & Chat */}
        {activePage === 'messages' && (
          <div className="page-surface"><MessagesPage /></div>
        )}

        {/* Dedicated Full Page: Post a Listing */}
        {activePage === 'post-listing' && (
          <div className="page-surface"><PostListingPage /></div>
        )}
      </main>

      {/* Global Quick Action Modals */}
      <ScheduleVisitModal
        property={scheduleTargetProperty}
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />

      <PropertyDetailModal
        property={selectedProperty}
        isOpen={Boolean(selectedProperty && activePage === 'browse')}
        onClose={() => setSelectedProperty(null)}
        onScheduleVisit={(prop) => {
          setSelectedProperty(null);
          openScheduleModal(prop);
        }}
      />

      <TenancyProtectionModal
        isOpen={isEscrowModalOpen}
        onClose={() => setIsEscrowModalOpen(false)}
      />

      <AddListingModal
        isOpen={isAddListingOpen}
        onClose={() => setIsAddListingOpen(false)}
      />

      {/* Authentication Modal (Login / Register / OTP) */}
      <AuthModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <MainDashboard />
      </AppProvider>
    </QueryClientProvider>
  );
}
