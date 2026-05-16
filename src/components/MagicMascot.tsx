import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smile, X, Send } from 'lucide-react';

export const MagicMascot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <>
      {/* Floating Mascot Button - Simple Smiley Only */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 bottom-24 sm:bottom-32 z-[100] cursor-pointer"
      >
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-brand-mint rounded-2xl flex items-center justify-center text-brand-teal shadow-2xl border-4 border-white group relative">
          <div className="absolute inset-0 bg-brand-teal rounded-xl opacity-0 group-hover:opacity-5 transition-opacity" />
          <Smile size={32} className={`${isOpen ? 'hidden' : 'block'} sm:w-10 sm:h-10 animate-bounce`} />
          <X size={32} className={`${isOpen ? 'block' : 'hidden'} sm:w-10 sm:h-10`} />
          
          {/* Tooltip */}
          {!isOpen && (
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-brand-ink text-white text-xs font-bold rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Chat with Auvie
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-brand-ink" />
            </div>
          )}
        </div>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50, x: 20 }}
            className="fixed right-6 bottom-40 sm:bottom-48 z-[101] w-[calc(100vw-48px)] sm:w-[400px] h-[500px] max-h-[60vh] flex flex-col glass-panel rounded-[40px] overflow-hidden premium-shadow border-2 border-white/50"
          >
            {/* Header */}
            <div className="bg-brand-teal p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                  <Smile size={24} />
                </div>
                <div>
                  <h3 className="font-kids font-bold leading-none">Auvie Chatbot</h3>
                  <p className="text-[10px] text-white/70 uppercase tracking-widest mt-1 font-bold">Online & Ready</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-grow p-6 overflow-y-auto bg-white/50 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-brand-mint text-brand-teal rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                  <Smile size={18} />
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 max-w-[80%]">
                  <p className="text-body-normal text-brand-ink font-medium">Hi there! I am Auvie chatbot, your Auvia assistant. How can I help you today?</p>
                  <p className="text-[10px] text-brand-sage mt-2 font-bold uppercase opacity-50">Auvie • Just now</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {['Find a Location', 'Insurance Info', 'ABA Therapy', 'Careers'].map(tag => (
                  <button key={tag} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 bg-brand-teal/5 text-brand-teal rounded-full border border-brand-teal/10 hover:bg-brand-teal hover:text-white transition-all">
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-3">
              <div className="flex-grow relative">
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-brand-teal focus:bg-white transition-all text-sm font-medium"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-teal text-white rounded-xl flex items-center justify-center hover:bg-brand-teal-light transition-all shadow-md">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
