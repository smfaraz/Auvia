import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Smile, Facebook, Instagram, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-brand-teal/5 pt-32 pb-16 relative overflow-hidden">
      <div className="blob-bg w-[300px] h-[300px] bg-brand-peach/20 bottom-[-5%] left-[-5%]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-brand-teal rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-300">
                <Smile size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-kids font-bold text-brand-ink tracking-tight leading-none">Auvia</span>
                <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest mt-1">Behavior Centers</span>
              </div>
            </Link>
            <p className="text-brand-sage text-sm leading-relaxed max-w-xs font-medium">
              A warm, playful sanctuary where clinical excellence meets the joy of childhood.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-2xl bg-brand-mint/30 text-brand-teal flex items-center justify-center hover:bg-brand-teal hover:text-white transition-all duration-300 cursor-pointer shadow-sm">
                <Facebook size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-2xl bg-brand-mint/30 text-brand-teal flex items-center justify-center hover:bg-brand-teal hover:text-white transition-all duration-300 cursor-pointer shadow-sm">
                <Instagram size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-2xl bg-brand-mint/30 text-brand-teal flex items-center justify-center hover:bg-brand-teal hover:text-white transition-all duration-300 cursor-pointer shadow-sm">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-brand-ink font-bold text-xs uppercase tracking-widest mb-8 font-kids">Our Programs</h4>
            <ul className="space-y-4 text-sm font-bold text-brand-sage font-kids">
              <li><Link to="/services" className="hover:text-brand-teal transition-colors">ABA Therapy</Link></li>
              <li><Link to="/services" className="hover:text-brand-teal transition-colors">Early Intervention</Link></li>
              <li><Link to="/services" className="hover:text-brand-teal transition-colors">Auvia at Home</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-ink font-bold text-xs uppercase tracking-widest mb-8 font-kids">Quick Links</h4>
            <ul className="space-y-4 text-sm font-bold text-brand-sage font-kids">
              <li><Link to="/about" className="hover:text-brand-teal transition-colors">Our Story</Link></li>
              <li><Link to="/locations" className="hover:text-brand-teal transition-colors">Locations</Link></li>
              <li><Link to="/careers" className="hover:text-brand-teal transition-colors">Join Our Family</Link></li>
              <li><Link to="/contact" className="hover:text-brand-teal transition-colors">Contact Us</Link></li>
              <li><Link to="/what-is-autism" className="hover:text-brand-teal transition-colors">What is Autism</Link></li>
              <li><Link to="/what-is-aba" className="hover:text-brand-teal transition-colors">What is ABA</Link></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-brand-ink font-bold text-xs uppercase tracking-widest mb-8 font-kids">Get in Touch</h4>
            <ul className="space-y-5 text-sm text-brand-sage font-medium">
              <li className="flex items-center gap-4">
                <Phone size={18} className="text-brand-teal" />
                <a href="tel:8883520091" className="hover:text-brand-teal transition-colors">888-352-0091</a>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={18} className="text-brand-teal" />
                <a href="mailto:admin@auviatherapy.com" className="hover:text-brand-teal transition-colors">admin@auviatherapy.com</a>
              </li>
              <li className="flex items-start gap-4">
                <MapPin size={18} className="text-brand-teal mt-1" />
                1212 Cabernet Dr <br />
                Allen, TX 75002-0981
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-brand-teal/10 flex flex-col md:flex-row justify-between items-center gap-8 text-xs font-bold text-brand-sage/60 font-kids">
          <p>© {new Date().getFullYear()} Auvia Behavior Centers. Built with Love.</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-brand-teal transition-colors">Privacy</Link>
            <Link to="/about" className="hover:text-brand-teal transition-colors">Terms</Link>
            <Link to="/about" className="hover:text-brand-teal transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
