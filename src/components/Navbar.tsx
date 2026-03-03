import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Smile, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
  }, [location.pathname]);

  const navItems = [
    {
      name: 'Services',
      type: 'dropdown',
      items: [
        { name: 'ABA Therapy', href: '/services' },
        { name: 'ABC Academy', href: '/services' },
        { name: 'Assessments', href: '/services' },
      ]
    },
    {
      name: 'Parent Resources',
      type: 'dropdown',
      items: [
        { name: 'What is Autism', href: '/what-is-autism' },
        { name: 'What is ABA Therapy', href: '/what-is-aba' },
      ]
    },
    {
      name: 'Insurance & Financial',
      type: 'dropdown',
      items: [
        { name: 'Insurance & Financial Assistance', href: '/insurance-financial-assistance' },
        { name: 'Insurance by State', href: '/insurance-by-state' },
      ]
    },
    { name: 'Locations', href: '/locations' },
    { name: 'Careers', href: '/careers' },
    { name: 'About', href: '/about' },
  ];

  const toggleMobileDropdown = (name: string) => {
    setOpenMobileDropdown(openMobileDropdown === name ? null : name);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`relative flex items-center justify-between px-8 py-4 rounded-[32px] transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg border border-white/20' : 'bg-white/70 backdrop-blur-md'}`}>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-brand-teal rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-300">
              <Smile size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-kids font-bold text-brand-ink tracking-tight leading-none">Auvia Kids</span>
              <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest mt-1">Behavior Center</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              item.type === 'dropdown' ? (
                <div key={item.name} className="relative group">
                  <button className="flex items-center gap-1 text-sm font-kids font-bold text-brand-ink/70 hover:text-brand-teal transition-colors py-2">
                    {item.name} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-64">
                    <div className="bg-white rounded-2xl shadow-xl border border-brand-teal/10 p-2 flex flex-col">
                      {item.items?.map(subItem => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="px-4 py-3 text-sm font-bold text-brand-sage hover:text-brand-teal hover:bg-brand-mint/40 rounded-xl transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href!}
                  className={`text-sm font-kids font-bold transition-all duration-300 hover:text-brand-teal ${location.pathname === item.href ? 'text-brand-teal' : 'text-brand-ink/70'}`}
                >
                  {item.name}
                </Link>
              )
            ))}

            <Link to="/contact" className="bg-brand-teal text-white py-3 px-8 rounded-[20px] font-kids font-bold text-sm hover:bg-[#3d7a6f] transition-colors shadow-md ml-4">
              Find care
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-brand-ink p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-brand-ink/20 backdrop-blur-sm z-[-1] lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl p-8 lg:hidden flex flex-col overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-10 mt-4">
                <span className="text-2xl font-kids font-bold text-brand-ink">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-brand-ink p-2 bg-brand-cream rounded-full" aria-label="Close menu">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navItems.map((item) => (
                  item.type === 'dropdown' ? (
                    <div key={item.name} className="flex flex-col">
                      <button
                        onClick={() => toggleMobileDropdown(item.name)}
                        className="flex items-center justify-between text-2xl font-kids font-bold text-brand-ink text-left"
                      >
                        {item.name}
                        <ChevronDown size={20} className={`text-brand-teal transition-transform duration-300 ${openMobileDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openMobileDropdown === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden flex flex-col gap-4 mt-4 pl-4 border-l-2 border-brand-mint"
                          >
                            {item.items?.map(sub => (
                              <Link key={sub.name} to={sub.href} className="text-lg font-bold text-brand-sage hover:text-brand-teal" onClick={() => setIsMobileMenuOpen(false)}>
                                {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link key={item.name} to={item.href!} className={`text-2xl font-kids font-bold transition-colors ${location.pathname === item.href ? 'text-brand-teal' : 'text-brand-ink'}`} onClick={() => setIsMobileMenuOpen(false)}>
                      {item.name}
                    </Link>
                  )
                ))}
              </div>

              <div className="mt-auto pt-10">
                <Link to="/contact" className="bg-brand-teal text-white w-full py-4 rounded-2xl font-kids font-bold text-xl flex justify-center shadow-xl shadow-brand-teal/20" onClick={() => setIsMobileMenuOpen(false)}>
                  Find care
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};