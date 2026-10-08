import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, useReducedMotion } from 'motion/react';
import { Smile, X, Send, ArrowUpRight } from 'lucide-react';
import WelcomeCharacter from './WelcomeCharacter';
import { REVIEW_MODE } from '../lib/review';
import '../styles/auvie.css';

interface ChatMessage {
  sender: 'auvie' | 'user';
  text: string;
  time: string;
}

export const MagicMascot = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (!dialog.open) dialog.showModal();
    dialog.querySelector<HTMLElement>(REVIEW_MODE ? 'button[aria-label="Close chat"]' : 'input:not([disabled])')?.focus();
    return () => { dialog.close(); if (previousFocus.current?.isConnected) previousFocus.current.focus({ preventScroll: true }); };
  }, [isOpen]);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'auvie',
      text: REVIEW_MODE ? "Hi! I'm Auvie. Choose a topic below and I'll help you find the right place." : "Hi! I'm Auvie, your Auvia assistant. How can I help you today?",
      time: 'Just now'
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat body when messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'nearest' });
    }
  }, [messages, isTyping, reduced]);

  const getChatResponse = (input: string): string => {
    const query = input.toLowerCase();

    // 1. Careers / Jobs (evaluated early to prevent clinical/work collisions)
    if (query.includes('career') || query.includes('job') || query.includes('role') || query.includes('hiring') || query.includes('bcba') || query.includes('rbt') || query.includes('work') || query.includes('apply')) {
      return "Join the Auvia clinical family! We are actively recruiting BCBAs and RBTs. View open positions and apply at: /careers.";
    }
    // 2. Locations
    if (query.includes('location') || query.includes('center') || query.includes('irving') || query.includes('blaine') || query.includes('where')) {
      return "Auvia is actively operating at our Irving (TX) center. Additional locations (such as Blaine, MN) are coming soon! Please check our /locations page for the up-to-date listing of active and upcoming centers.";
    }
    // 3. Insurance
    if (query.includes('insurance') || query.includes('pay') || query.includes('bcbs') || query.includes('aetna') || query.includes('cigna') || query.includes('medicaid') || query.includes('tricare')) {
      return "Auvia is in-network with BCBS TX, Aetna, Cigna, United Healthcare, Medicaid, Molina, Superior Health, and Tricare. You can request direct insurance coverage details on our /insurance-financial-assistance page.";
    }
    // 4. Contact Info
    if (query.includes('contact') || query.includes('phone') || query.includes('call') || query.includes('number') || query.includes('email')) {
      return "You can reach our care coordination team at (945) 758-1087, email admin@auviatherapy.com, or submit a request on our /contact page.";
    }
    // 5. ABA / Autism / Clinical
    if (query.includes('aba') || query.includes('therapy') || query.includes('autism') || query.includes('treatment') || query.includes('clinical')) {
      return "We specialize in early-intervention, play-based ABA therapy to help children diagnosed with autism grow. Check out detailed clinical resources: /what-is-aba or learn about autism: /what-is-autism.";
    }

    return "I'd love to help you! You can ask about our clinical locations, insurance, ABA therapy, careers, or submit a message to our intake team at: /contact.";
  };

  const handleSendMessage = async (textToSend: string) => {
    if (REVIEW_MODE || isTyping || !textToSend.trim()) return;

    // 1. Add User Message
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      sender: 'user',
      text: textToSend,
      time: timestamp
    };

    setMessages(prev => [...prev, userMsg]);
    setMessage('');
    setIsTyping(true);

    // 2. Respond (ask the server endpoint first, fall back to the rule router if it is unavailable)
    try {
      const historyContents = messages
        .slice(1) // Skip the first welcome message to start history with 'user'
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }));

      historyContents.push({
        role: 'user',
        parts: [{ text: textToSend }]
      });

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: historyContents })
      });

      if (res.ok) {
        const data = await res.json();
        const responseText = data.text;

        if (responseText) {
          const botMsg: ChatMessage = {
            sender: 'auvie',
            text: responseText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, botMsg]);
          setIsTyping(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Chat request failed, falling back to local response router:', err);
    }

    // Fallback logic (runs if the endpoint is not configured or the request fails)
    setTimeout(() => {
      const responseText = getChatResponse(textToSend);
      const botMsg: ChatMessage = {
        sender: 'auvie',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 750);
  };

  // Parses route links like /locations in answers and displays them as beautiful internal Link tags
  const formatMessageText = (text: string) => {
    const linkRegex = /(\/[a-zA-Z0-9-/_]+)/g;
    const parts = text.split(linkRegex);
    return parts.map((part, i) => {
      if (part.startsWith('/')) {
        let linkLabel = part.replace('/', '').replace(/-/g, ' ');
        linkLabel = linkLabel.charAt(0).toUpperCase() + linkLabel.slice(1);
        if (!linkLabel) linkLabel = "Home";

        return (
          <Link
            key={i}
            to={part}
            onClick={() => setIsOpen(false)}
            className="inline-block px-3 py-1 bg-brand-teal/10 text-brand-teal font-bold text-xs rounded-xl underline decoration-brand-peach hover:bg-brand-teal hover:text-white transition-colors duration-300 mx-1"
          >
            {linkLabel}
          </Link>
        );
      }
      return part;
    });
  };

  return (
    <>
      <WelcomeCharacter chatOpen={isOpen} onChat={() => setIsOpen(true)} />

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <dialog ref={dialogRef} aria-label="Auvie Chatbot" aria-describedby="auvie-chat-mode" onKeyDown={(event) => {
            if (event.key !== 'Tab') return;
            const items = Array.from((event.currentTarget as HTMLDialogElement).querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), a[href]')).filter((item) => item.getClientRects().length);
            const first = items[0], last = items[items.length - 1];
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
            if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
          }} onCancel={() => setIsOpen(false)}
            className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-[101] w-[calc(100vw-32px)] sm:w-[400px] h-[620px] max-h-[82vh] flex flex-col glass-panel rounded-[40px] overflow-hidden premium-shadow border-2 border-white/50 auvie-chat-dialog">
            {/* Header */}
            <div className="bg-brand-teal p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                  <Smile size={24} />
                </div>
                <div>
                  <h3 className="font-kids font-bold leading-none">Auvie</h3>
                  <p id="auvie-chat-mode" className="text-[10px] text-white/70 uppercase tracking-widest mt-1 font-bold">{REVIEW_MODE ? 'Preview: navigation only' : 'Auvia assistant'}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-grow p-6 overflow-y-auto bg-white/50 space-y-4 flex flex-col">
              <div className="space-y-4 flex-1">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${msg.sender === 'user' ? 'bg-brand-peach text-brand-ink' : 'bg-brand-mint text-brand-teal'}`}>
                      <Smile size={18} />
                    </div>
                    <div className={`p-4 rounded-2xl shadow-sm border border-slate-100 max-w-[80%] ${msg.sender === 'user' ? 'bg-brand-peach/10 rounded-tr-none' : 'bg-white rounded-tl-none'}`}>
                      <p className="text-body-normal text-brand-ink font-medium leading-relaxed">
                        {formatMessageText(msg.text)}
                      </p>
                      <p className="text-[9px] text-brand-sage mt-2 font-bold uppercase opacity-50">
                        {msg.sender === 'user' ? 'You' : 'Auvie'} • {msg.time}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Simulated Typing Indicator */}
                {isTyping && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-brand-mint text-brand-teal rounded-lg flex items-center justify-center shrink-0 shadow-sm animate-pulse">
                      <Smile size={18} />
                    </div>
                    <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 max-w-[80%] flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-brand-teal rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-brand-teal rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-brand-teal rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Suggestion Chips */}
              <div className="auvie-chat__shortcuts flex flex-wrap gap-2 pt-4 border-t border-slate-100/50" aria-label="Explore Auvia">
                <p className="auvie-chat__prompt">Where would you like to start?</p>
                {[
                  { tag: 'Find a Location', href: '/locations' },
                  { tag: 'Insurance Info', href: '/insurance-financial-assistance' },
                  { tag: 'ABA Therapy', href: '/services' },
                  { tag: 'Careers', href: '/careers' }
                ].map(item => (
                  <Link
                    key={item.tag}
                    to={item.href} onClick={() => setIsOpen(false)}
                    className="text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 bg-brand-teal/5 text-brand-teal rounded-full border border-brand-teal/10 hover:bg-brand-teal hover:text-white transition-all cursor-pointer"
                  >
                    {item.tag}<ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(message);
              }}
              className="auvie-chat__input p-4 bg-white border-t border-slate-100 flex items-center gap-3"
            >
              <div className="flex-grow relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  aria-label="Your question for Auvie"
                  disabled={REVIEW_MODE}
                  aria-describedby={REVIEW_MODE ? 'auvie-preview-note' : undefined}
                  placeholder={REVIEW_MODE ? 'Live chat disabled in review' : 'Type your message...'}
                  className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-brand-teal focus:bg-white transition-all text-sm font-medium"
                />
                <button
                  type="submit"
                  aria-label="Send question" disabled={REVIEW_MODE || isTyping || !message.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-teal text-white rounded-xl flex items-center justify-center hover:bg-brand-teal-light transition-all shadow-md cursor-pointer"
                >
                  <Send size={16} />
                </button>
              </div>
              {REVIEW_MODE && <p id="auvie-preview-note">Use a topic above. Messages are not sent in this preview.</p>}
            </form>
          </dialog>
        )}
      </AnimatePresence>
    </>
  );
};
