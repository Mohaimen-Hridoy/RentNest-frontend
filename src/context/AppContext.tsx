import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, BookingResponse } from '../types/property';

export type Language = 'bn' | 'en';
export type Currency = 'BDT' | 'USD';
export type UserRole = 'tenant' | 'landlord';
export type PageRoute = 'browse' | 'property-detail' | 'protection' | 'post-listing' | 'my-bookings' | 'digital-lease' | 'rent-payments' | 'messages';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  nidVerified: boolean;
  nidNumber?: string;
  avatar: string;
}

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
  openAuthModal: (mode?: 'login' | 'register') => void;
  logout: () => void;
  activePage: PageRoute;
  setActivePage: (page: PageRoute) => void;
  formatPrice: (amountInBdt: number) => string;
  savedFavorites: string[];
  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  selectedProperty: Property | null;
  setSelectedProperty: (prop: Property | null) => void;
  viewPropertyDetail: (prop: Property) => void;
  activeMapPropertyId: string | null;
  setActiveMapPropertyId: (id: string | null) => void;
  isScheduleModalOpen: boolean;
  setIsScheduleModalOpen: (open: boolean) => void;
  scheduleTargetProperty: Property | null;
  openScheduleModal: (prop: Property) => void;
  isAddListingOpen: boolean;
  setIsAddListingOpen: (open: boolean) => void;
  isEscrowModalOpen: boolean;
  setIsEscrowModalOpen: (open: boolean) => void;
  bookings: BookingResponse[];
  addBooking: (booking: BookingResponse) => void;
  unreadMessagesCount: number;
  setUnreadMessagesCount: (count: number) => void;
  t: (key: string, defaultVal?: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  bn: {
    'brand.name': 'RentNest',
    'nav.browse': 'বাসা খুঁজুন (Browse)',
    'nav.protection': 'ভাড়াটিয়া সুরক্ষা (Protection)',
    'nav.rentPayments': 'ভাড়া ও ইউটিলিটি বিল',
    'nav.messages': 'মেসেজ ও চ্যাট',
    'nav.myBookings': 'আমার বুকিং ও শিডিউল',
    'nav.digitalLease': 'ডিজিটাল লিজ ও চুক্তি',
    'nav.support': 'সাহায্য ও সাপোর্ট',
    'nav.addListing': 'লিস্টিং দিন',
    'role.tenant': 'ভাড়াটিয়া (Tenant)',
    'role.landlord': 'বাড়িওয়ালা (Landlord)',
    'search.locationPlaceholder': 'গুলশান, বনানী, বারিধারা, ঢাকা...',
    'search.locationLabel': 'অনুসন্ধান এলাকা • Location Focus',
    'search.clear': 'মুছে ফেলুন',
    'search.verifiedCount': '৪৮টি ভেরিফাইড বাসা উপলব্ধ',
    'search.verifiedSub': '48 Verified Homes',
    'view.grid': 'গ্রিড (Grid)',
    'view.splitMap': 'ম্যাপ ভিউ (Split Map)',
    'filter.rent': 'ভাড়া',
    'filter.bedrooms': 'বেডরুম',
    'filter.propType': 'প্রোপার্টি টাইপ',
    'filter.furnishing': 'ফার্নিশিং',
    'filter.escrowBadge': '১০০% ভেরিফাইড এসক্রো',
    'filter.escrowSub': 'Deposit Safe',
    'filter.more': 'অন্যান্য ফিল্টার',
    'filter.reset': 'ফিল্টার মুছুন (Reset)',
    'feed.title': 'গুলশান, বনানী ও বারিধারা ভেরিফাইড তালিকা',
    'feed.subtitle': 'নিরাপদ ডিজিটাল চুক্তি ও লিগ্যাল অডিট নিশ্চিত',
    'sort.popular': 'জনপ্রিয়তা ও ফিচারড',
    'sort.priceAsc': 'ভাড়া: কম থেকে বেশি',
    'sort.priceDesc': 'ভাড়া: বেশি থেকে কম',
    'sort.newest': 'সর্বশেষ যোগ করা',
    'card.perMonth': '/মাস',
    'card.serviceCharge': 'সার্ভিস চার্জ',
    'card.scheduleVisit': 'ভিজিট শিডিউল',
    'card.details': 'বিস্তারিত',
    'card.bookDirect': 'সরাসরি পরিদর্শন বুক করুন',
    'map.searchOnMove': 'ম্যাপ নড়াচড়া করলে পুনরায় সার্চ করুন (Search on move)',
    'map.drawArea': 'এরিয়া ড্র করুন (Polygon)',
    'map.safetyNote': 'গুলশান ও বারিধারা: ১০০% সার্বক্ষণিক নিরাপত্তা ও সিসিটিভি',
    'map.safetySub': 'ডিজিটাল এগ্রিমেন্ট ও ২৪/৭ লিগ্যাল এসক্রো প্রোটেকশন সক্রিয়',
    'details.advance': 'অগ্রিম জামানত',
    'details.escrowGuard': 'এসক্রো ব্যাংক নিরাপত্তা',
    'details.rajukStatus': 'রাজউক অনুমোদিত নকশা',
    'details.verifiedOwner': 'মালিকানা যাচাইকৃত',
  },
  en: {
    'brand.name': 'RentNest',
    'nav.browse': 'Browse Homes',
    'nav.protection': 'Tenancy Protection',
    'nav.rentPayments': 'Rent & Utilities',
    'nav.messages': 'Messages',
    'nav.myBookings': 'My Bookings',
    'nav.digitalLease': 'Digital Lease',
    'nav.support': 'Support & Help',
    'nav.addListing': 'Post Listing',
    'role.tenant': 'Tenant',
    'role.landlord': 'Landlord',
    'search.locationPlaceholder': 'Gulshan, Banani, Baridhara, Dhaka...',
    'search.locationLabel': 'LOCATION FOCUS',
    'search.clear': 'Clear',
    'search.verifiedCount': '48 Verified Homes Available',
    'search.verifiedSub': 'Escrow Protected',
    'view.grid': 'Grid View',
    'view.splitMap': 'Split Map',
    'filter.rent': 'Rent',
    'filter.bedrooms': 'Bedrooms',
    'filter.propType': 'Property Type',
    'filter.furnishing': 'Furnishing',
    'filter.escrowBadge': '100% Verified Escrow',
    'filter.escrowSub': 'Deposit Safe',
    'filter.more': 'More Filters',
    'filter.reset': 'Reset Filters',
    'feed.title': 'Gulshan, Banani & Baridhara Verified Homes',
    'feed.subtitle': 'Protected with digital lease contracts & title deed audits',
    'sort.popular': 'Featured & Popular',
    'sort.priceAsc': 'Rent: Low to High',
    'sort.priceDesc': 'Rent: High to Low',
    'sort.newest': 'Recently Added',
    'card.perMonth': '/mo',
    'card.serviceCharge': 'Service Charge',
    'card.scheduleVisit': 'Schedule Visit',
    'card.details': 'Details',
    'card.bookDirect': 'Book Direct Walkthrough',
    'map.searchOnMove': 'Search as map moves',
    'map.drawArea': 'Draw Polygon Area',
    'map.safetyNote': 'Diplomatic Zone: 24/7 Monitored CCTV & Security',
    'map.safetySub': 'Digital agreement & institutional bank escrow active',
    'details.advance': 'Advance Deposit',
    'details.escrowGuard': 'Escrow Bank Protection',
    'details.rajukStatus': 'RAJUK Approved Plan',
    'details.verifiedOwner': 'Verified Title Deed',
  },
};

const initialSampleBooking: BookingResponse = {
  id: 'book-sample-gulshan',
  propertyId: 'prop-gulshan-lakeview-1',
  tenantName: 'Mohaimen Hridoy',
  tenantPhone: '01711928374',
  tenantEmail: 'mohaimenhridoy@gmail.com',
  visitDate: '2026-09-25',
  timeSlot: 'afternoon',
  visitType: 'in_person',
  status: 'confirmed',
  verificationCode: 'RN-VISIT-829140',
  createdAt: new Date().toISOString(),
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('bn');
  const [currency, setCurrency] = useState<Currency>('BDT');
  const [userRole, setUserRole] = useState<UserRole>('tenant');
  const [activePage, setActivePage] = useState<PageRoute>('browse');

  const [savedFavorites, setSavedFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('rentnest_favorites');
      return stored ? JSON.parse(stored) : ['prop-gulshan-lakeview-1', 'prop-baridhara-penthouse-3'];
    } catch {
      return ['prop-gulshan-lakeview-1', 'prop-baridhara-penthouse-3'];
    }
  });

  const defaultUser: UserProfile = {
    id: 'user-mohaimen',
    name: 'Mohaimen Hridoy',
    email: 'mohaimenhridoy@gmail.com',
    phone: '01711928374',
    role: 'tenant',
    nidVerified: true,
    nidNumber: '199226928100049',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
  };

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem('rentnest_auth_user');
      return stored ? JSON.parse(stored) : defaultUser;
    } catch {
      return defaultUser;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('rentnest_auth_user');
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('rentnest_auth_user', JSON.stringify(currentUser));
        setUserRole(currentUser.role);
      } else {
        localStorage.removeItem('rentnest_auth_user');
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  const [bookings, setBookings] = useState<BookingResponse[]>([initialSampleBooking]);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState<number>(2);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeMapPropertyId, setActiveMapPropertyId] = useState<string | null>('prop-gulshan-lakeview-1');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleTargetProperty, setScheduleTargetProperty] = useState<Property | null>(null);
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [isEscrowModalOpen, setIsEscrowModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('rentnest_favorites', JSON.stringify(savedFavorites));
    } catch {
      // ignore
    }
  }, [savedFavorites]);

  const toggleFavorite = (propertyId: string) => {
    setSavedFavorites((prev) =>
      prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]
    );
  };

  const isFavorite = (propertyId: string) => savedFavorites.includes(propertyId);

  const openScheduleModal = (prop: Property) => {
    setScheduleTargetProperty(prop);
    setIsScheduleModalOpen(true);
  };

  const viewPropertyDetail = (prop: Property) => {
    setSelectedProperty(prop);
    setActivePage('property-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addBooking = (newBooking: BookingResponse) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const formatPrice = (amountInBdt: number): string => {
    if (currency === 'USD') {
      const usd = Math.round(amountInBdt / 120);
      return `$${usd.toLocaleString('en-US')}`;
    }
    if (lang === 'bn') {
      const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      const formatted = amountInBdt.toLocaleString('en-US');
      const bnFormatted = formatted.replace(/[0-9]/g, (d) => bnDigits[parseInt(d, 10)]);
      return `৳ ${bnFormatted}`;
    }
    return `৳ ${amountInBdt.toLocaleString('en-US')}`;
  };

  const t = (key: string, defaultVal = ''): string => {
    return translations[lang]?.[key] || translations['en']?.[key] || defaultVal || key;
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        currency,
        setCurrency,
        userRole,
        setUserRole,
        currentUser,
        setCurrentUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
        logout,
        activePage,
        setActivePage,
        formatPrice,
        savedFavorites,
        toggleFavorite,
        isFavorite,
        selectedProperty,
        setSelectedProperty,
        viewPropertyDetail,
        activeMapPropertyId,
        setActiveMapPropertyId,
        isScheduleModalOpen,
        setIsScheduleModalOpen,
        scheduleTargetProperty,
        openScheduleModal,
        isAddListingOpen,
        setIsAddListingOpen,
        isEscrowModalOpen,
        setIsEscrowModalOpen,
        bookings,
        addBooking,
        unreadMessagesCount,
        setUnreadMessagesCount,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
