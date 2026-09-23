import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Send,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Lock,
  ArrowLeft,
  Building,
  Sparkles,
  User,
  Clock,
  CheckCheck,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'tenant' | 'landlord';
  text: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  landlordName: string;
  propertyTitle: string;
  neighborhood: string;
  avatar: string;
  unreadCount: number;
  online: boolean;
  messages: ChatMessage[];
}

export const MessagesPage: React.FC = () => {
  const { lang, setActivePage, openScheduleModal } = useApp();

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 'conv-farhan',
      landlordName: 'Engr. Farhan Kabir',
      propertyTitle: 'Lakeview Luxury Residence (Flat 5A)',
      neighborhood: 'Gulshan-2',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
      unreadCount: 2,
      online: true,
      messages: [
        {
          id: 'm1',
          sender: 'tenant',
          text: 'আসসালামু আলাইকুম। গুলশান-২ এর লেকভিউ ফ্ল্যাটটি কি এখনো খালি আছে?',
          timestamp: '11:20 AM',
        },
        {
          id: 'm2',
          sender: 'landlord',
          text: 'ওয়ালাইকুম আসসালাম। হ্যাঁ, ফ্ল্যাটটি সম্পূর্ণরূপে প্রস্তুত রয়েছে। আপনি কি সশরীরে পরিদর্শন করতে আগ্রহী?',
          timestamp: '11:22 AM',
        },
        {
          id: 'm3',
          sender: 'landlord',
          text: 'আমাদের ভবনে ২৪ ঘণ্টা ডিজেল জেনারেটর ব্যাকআপ ও সার্বক্ষণিক গার্ড সুবিধা রয়েছে।',
          timestamp: '11:23 AM',
        },
      ],
    },
    {
      id: 'conv-zahid',
      landlordName: 'Col. (Retd) Zahid Hossain',
      propertyTitle: 'Banani DOHS Furnished 3BR',
      neighborhood: 'Banani DOHS',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
      unreadCount: 0,
      online: false,
      messages: [
        {
          id: 'm20',
          sender: 'tenant',
          text: 'Sir, what is the visitor gate protocol in Banani DOHS?',
          timestamp: 'Yesterday',
        },
        {
          id: 'm21',
          sender: 'landlord',
          text: 'Resident RFID stickers are issued at the gate. Visitors are permitted smoothly after verification.',
          timestamp: 'Yesterday',
        },
      ],
    },
  ]);

  const [activeConvId, setActiveConvId] = useState<string>('conv-farhan');
  const [inputText, setInputText] = useState('');

  const activeConversation = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const quickChips = [
    lang === 'bn' ? 'কবে পরিদর্শন করা যাবে?' : 'When can I schedule a walkthrough?',
    lang === 'bn' ? 'গ্যাস লাইন কি নিরবচ্ছিন্ন?' : 'Is piped gas supply continuous?',
    lang === 'bn' ? 'কার পার্কিং কি বরাদ্দ আছে?' : 'Is dedicated covered car parking allocated?',
    lang === 'bn' ? 'সার্ভিস চার্জে কি কি অন্তর্ভুক্ত?' : 'What is included in the service charge?',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const content = textToSend || inputText;
    if (!content.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'tenant',
      text: content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConvId) {
          return {
            ...c,
            unreadCount: 0,
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );

    if (!textToSend) setInputText('');

    // Simulate instant automated reply from landlord
    setTimeout(() => {
      const landlordReply: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'landlord',
        text:
          lang === 'bn'
            ? 'ধন্যবাদ আপনার বার্তার জন্য। হ্যাঁ, নিশ্চিতভাবেই এই সুবিধাটি রয়েছে। আপনি চাইলে অ্যাপ থেকে সরাসরি একটি ফ্রি ওয়াকথ্রু টাইম স্লট বুক করতে পারেন।'
            : 'Thank you for asking. Yes, this facility is fully guaranteed. You are welcome to book a walkthrough anytime through the schedule button.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeConvId) {
            return {
              ...c,
              messages: [...c.messages, landlordReply],
            };
          }
          return c;
        })
      );
    }, 1200);
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
          <ShieldCheck className="w-4 h-4 text-[#004337]" />
          <span>{lang === 'bn' ? 'নম্বর গোপন রেখে নিরাপদ মেসেজিং' : 'Privacy Protected Direct Messaging'}</span>
        </span>
      </div>

      {/* Main Chat Layout */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
        {/* Left: Conversation List */}
        <div className="md:col-span-4 border-r border-slate-200 flex flex-col bg-slate-50/50">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-extrabold text-slate-900 text-sm">
              {lang === 'bn' ? 'বাড়িওয়ালাদের সাথে কথোপকথন' : 'Conversations'}
            </h2>
            <p className="text-[11px] text-slate-500">End-to-end encrypted tenant inquiries</p>
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => {
                  setActiveConvId(conv.id);
                  setConversations((prev) =>
                    prev.map((c) => (c.id === conv.id ? { ...c, unreadCount: 0 } : c))
                  );
                }}
                className={`w-full text-left p-3.5 flex items-center gap-3 transition-colors ${
                  activeConvId === conv.id ? 'bg-[#eff4ff]' : 'hover:bg-slate-50'
                }`}
              >
                <div className="relative">
                  <img
                    src={conv.avatar}
                    alt={conv.landlordName}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-white"
                  />
                  {conv.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-slate-900 truncate">{conv.landlordName}</h4>
                    {conv.unreadCount > 0 && (
                      <span className="w-4 h-4 rounded-full bg-[#004337] text-white text-[10px] font-bold flex items-center justify-center">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-medium text-[#004337] truncate">{conv.propertyTitle}</p>
                  <p className="text-[10px] text-slate-400 truncate">
                    {conv.messages[conv.messages.length - 1]?.text}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Active Chat Window */}
        <div className="md:col-span-8 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={activeConversation.avatar}
                alt={activeConversation.landlordName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#aaf0dc]"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-slate-900">{activeConversation.landlordName}</h3>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <p className="text-[11px] text-slate-500">
                  {activeConversation.propertyTitle} • {activeConversation.neighborhood}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Online
              </span>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[380px] bg-slate-50/30">
            {activeConversation.messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'tenant' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs ${
                    m.sender === 'tenant'
                      ? 'bg-[#004337] text-white rounded-br-none shadow-sm'
                      : 'bg-white text-slate-800 rounded-bl-none border border-slate-200 shadow-sm'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1 flex items-center gap-1">
                  <span>{m.timestamp}</span>
                  {m.sender === 'tenant' && <CheckCheck className="w-3 h-3 text-[#004337]" />}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Inquiry Chips */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
            <span className="text-[10px] font-bold text-slate-400 shrink-0 uppercase tracking-wider">
              Quick Inquiries:
            </span>
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[11px] text-slate-700 hover:border-[#004337] hover:text-[#004337] shrink-0 transition-colors shadow-2xs font-medium"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Message Input Box */}
          <div className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={
                lang === 'bn'
                  ? 'বাড়িওয়ালাকে বার্তা লিখুন (যেমন: সার্ভিস চার্জ বা পার্কিং সম্পর্কে)...'
                  : 'Type a message to the verified landlord...'
              }
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#004337] focus:outline-none"
            />
            <button
              onClick={() => handleSendMessage()}
              className="p-2.5 bg-[#004337] hover:bg-[#0d5c4d] text-white rounded-xl shadow-sm transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
