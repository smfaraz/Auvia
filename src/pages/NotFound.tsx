import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Smile, Home, MapPin, Phone, HelpCircle } from 'lucide-react';
import { SEO } from '../components/SEO';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-brand-cream min-h-screen font-sans flex flex-col items-center justify-center relative overflow-hidden py-20 px-6">
      <SEO 
        title="Page Not Found | 404 | Auvia Behavior Centers"
        description="The page you are looking for does not exist. Let Auvie lead you back to our ABA therapy centers or support pages."
        keywords="404, page not found, Auvia error, navigation help"
        canonicalUrl="https://auviatherapy.com/404"
      />

      {/* Decorative blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-sky/30 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-peach/30 rounded-full blur-[120px] -z-10" />

      <div className="max-w-xl text-center z-10 flex flex-col items-center">
        
        {/* Animated Cute Mascot Visual */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="relative mb-10 group"
        >
          {/* Card with shadow */}
          <div className="w-40 h-40 sm:w-48 sm:h-48 bg-white rounded-[40px] shadow-2xl border-4 border-white flex items-center justify-center relative overflow-hidden premium-shadow">
            <div className="absolute inset-0 bg-brand-mint/20 group-hover:bg-brand-mint/45 transition-colors duration-500" />
            
            {/* Mascot SVG representation of Auvie */}
            <motion.svg
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-24 h-24 sm:w-32 sm:h-32 text-brand-teal relative z-10 drop-shadow-md"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <circle cx="50" cy="50" r="42" fill="#0f766e"/>
              <circle cx="50" cy="50" r="38" fill="none" stroke="#ccfbf1" strokeWidth="2.5"/>
              <circle cx="38" cy="42" r="4" fill="#ccfbf1"/>
              <circle cx="62" cy="42" r="4" fill="#ccfbf1"/>
              <path d="M35 56 C 35 68, 65 68, 65 56" fill="none" stroke="#ccfbf1" strokeWidth="4" strokeLinecap="round"/>
            </motion.svg>
          </div>
          
          {/* Decorative floating stars */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-4 -right-4 w-10 h-10 bg-brand-peach rounded-2xl flex items-center justify-center text-brand-teal shadow-md"
          >
            <Smile size={20} className="text-white" />
          </motion.div>
        </motion.div>

        {/* Brand Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="inline-block px-4 py-2 bg-brand-teal/10 text-brand-teal font-extrabold uppercase tracking-widest text-[10px] sm:text-xs rounded-full mb-6 border border-brand-teal/20">
            Error 404
          </span>
          
          <h1 className="text-display font-kids font-bold text-brand-ink mb-6 tracking-tight leading-none">
            Oops! Page <span className="text-brand-teal italic">Not Found.</span>
          </h1>
          
          <p className="text-body-main text-brand-sage max-w-md mx-auto mb-10 font-medium leading-relaxed">
            It looks like you've wandered into a quiet corner. Don't worry, Auvie is here to help you get back on track!
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => navigate('/')}
            className="btn-friendly-primary flex items-center justify-center gap-2"
          >
            <Home size={20} /> Return Home
          </button>
          
          <button
            onClick={() => navigate('/locations')}
            className="btn-friendly-outline flex items-center justify-center gap-2 bg-white"
          >
            <MapPin size={20} /> Explore Centers
          </button>
        </motion.div>

        {/* Small Help Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex items-center gap-6 text-xs font-bold text-brand-sage"
        >
          <button onClick={() => navigate('/contact')} className="hover:text-brand-teal transition-colors flex items-center gap-1.5">
            <Phone size={14} /> Contact Us
          </button>
          <span className="text-gray-300">|</span>
          <button onClick={() => navigate('/parent-help-center')} className="hover:text-brand-teal transition-colors flex items-center gap-1.5">
            <HelpCircle size={14} /> Parent Help Center
          </button>
        </motion.div>

      </div>
    </div>
  );
};
