import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Smile, ChevronDown, ArrowUpRight, Heart } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import '../styles/navigation.css';

export const Navbar = () => {
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const dropdownTriggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const hoverOpenedDropdown = useRef<string | null>(null);
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const timer = requestAnimationFrame(() => mobileMenuRef.current?.querySelector<HTMLButtonElement>('button')?.focus());
    return () => { cancelAnimationFrame(timer); previous?.focus(); };
  }, [isMobileMenuOpen]);
  useEffect(() => {
    if (!openDesktopDropdown) return;
    const close = (event: PointerEvent) => { if (!navRef.current?.contains(event.target as Node)) setOpenDesktopDropdown(null); };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [openDesktopDropdown]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1280px)');
    const handleResize = () => { if (desktop.matches) setIsMobileMenuOpen(false); };
    desktop.addEventListener('change', handleResize);
    return () => desktop.removeEventListener('change', handleResize);
  }, []);

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
    setOpenDesktopDropdown(null);
  }, [location.pathname]);

  const navItems = [
    {
      name: 'Services', href: '/services',
      type: 'dropdown',
      items: [
        { name: 'ABA Therapy', href: '/services' }
      ]
    },
    {
      name: 'Parent Resources', href: '/parent-help-center',
      type: 'dropdown',
      items: [
        { name: 'Parent Help Center', href: '/parent-help-center' },
        { name: 'What is Autism', href: '/what-is-autism' },
        { name: 'What is ABA Therapy', href: '/what-is-aba' },
      ]
    },
    {
      name: 'Insurance & Financial', href: '/insurance',
      type: 'dropdown',
      items: [
        { name: 'Insurance & Financial Assistance', href: '/insurance-financial-assistance' },
        { name: 'Insurance by State', href: '/insurance-by-state' },
      ]
    },
    { name: 'Locations', href: '/locations' },
    { name: 'Careers', href: '/careers' },
    { name: 'About Us', href: '/about' },
  ];

  const toggleMobileDropdown = (name: string) => {
    setOpenMobileDropdown(openMobileDropdown === name ? null : name);
  };

  const toggleDesktopDropdown = (name: string) => {
    // A first click commits a hover preview; subsequent clicks toggle it.
    if (hoverOpenedDropdown.current === name && openDesktopDropdown === name) {
      hoverOpenedDropdown.current = null;
      return;
    }
    hoverOpenedDropdown.current = null;
    setOpenDesktopDropdown(openDesktopDropdown === name ? null : name);
  };

  return (
    <nav ref={navRef} aria-label="Main navigation" onKeyDown={(event) => { if (event.key === "Escape") { if (openDesktopDropdown) dropdownTriggerRefs.current[openDesktopDropdown]?.focus(); setOpenDesktopDropdown(null); setIsMobileMenuOpen(false); } }} className="auvia-navigation fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className={`auvia-navigation-shell relative flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 rounded-[24px] transition-all duration-500 ${isScrolled ? 'glass-panel is-scrolled' : ''}`}>

          {/* Logo */}
          <Link to="/" aria-label="Auvia Behavior Centers home" className="auvia-logo flex items-center gap-3 group">
            <div className="w-10 h-10 bg-brand-teal rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-300">
              <Smile size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-kids font-semibold text-brand-ink tracking-tight leading-none">Auvia </span>
              <span className="text-[10px] font-medium text-brand-teal uppercase tracking-[0.2em] mt-1">Behavior Centers</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="auvia-desktop-nav hidden xl:flex items-center gap-1.5">
            {navItems.map((item) => (
              item.type === 'dropdown' ? (
                <div
                  key={item.name}
                  className="auvia-nav-group relative group"
                  onMouseEnter={() => { if (openDesktopDropdown !== item.name) { hoverOpenedDropdown.current = item.name; setOpenDesktopDropdown(item.name); } }}
                  onMouseLeave={(event) => { hoverOpenedDropdown.current = null; if (!event.currentTarget.contains(document.activeElement)) setOpenDesktopDropdown(null); }}
                  onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) { hoverOpenedDropdown.current = null; setOpenDesktopDropdown(null); } }}
                >
                  <div className="flex items-center gap-1 px-3 py-2 rounded-xl transition-colors hover:bg-brand-mint/25 cursor-pointer">
                    <Link
                      to={item.href!}
                      data-active={location.pathname === item.href || item.items?.some(subItem => subItem.href === location.pathname) || undefined}
                      aria-current={location.pathname === item.href ? 'page' : undefined}
                      className={`auvia-nav-link text-sm font-kids font-bold transition-colors ${location.pathname === item.href ? 'text-brand-teal font-extrabold' : 'text-brand-ink hover:text-brand-teal'}`}
                    >
                      {item.name}
                    </Link>
                    <button
                      ref={(node) => { dropdownTriggerRefs.current[item.name] = node; }}
                      type="button"
                      aria-label={`${openDesktopDropdown === item.name ? 'Hide' : 'Show'} ${item.name} submenu`}
                      aria-controls={`desktop-${item.href.slice(1)}`}
                      aria-expanded={openDesktopDropdown === item.name}
                      onClick={() => toggleDesktopDropdown(item.name)}
                      onKeyDown={(event) => { if (event.key === 'ArrowDown') { event.preventDefault(); hoverOpenedDropdown.current = null; setOpenDesktopDropdown(item.name); requestAnimationFrame(() => document.getElementById(`desktop-${item.href.slice(1)}`)?.querySelector<HTMLAnchorElement>('a')?.focus()); } }}
                      className="auvia-submenu-toggle p-0 text-brand-teal flex items-center justify-center"
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>
                  <div id={`desktop-${item.href.slice(1)}`} hidden={openDesktopDropdown !== item.name} className="auvia-desktop-submenu absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64">
                    <div className="bg-white rounded-2xl shadow-xl border border-brand-teal/10 p-2 flex flex-col">
                      {item.items?.map(subItem => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          aria-current={location.pathname === subItem.href ? 'page' : undefined}
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
                  aria-current={location.pathname === item.href ? 'page' : undefined}
                  className={`auvia-nav-link text-sm font-kids font-bold px-3 py-2 rounded-xl transition-all duration-200 hover:bg-brand-mint/25 hover:text-brand-teal ${location.pathname === item.href ? 'text-brand-teal font-extrabold' : 'text-brand-ink'}`}
                >
                  {item.name}
                </Link>
              )
            ))}

            <Link to="/contact" className="auvia-find-care bg-brand-ink text-white py-2.5 px-5 rounded-2xl font-kids font-semibold text-sm hover:bg-slate-700 transition-colors shadow-md ml-3">
              Find care <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button type="button" className="auvia-menu-toggle xl:hidden text-brand-ink p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Open navigation menu" aria-controls="mobile-navigation" aria-expanded={isMobileMenuOpen}>
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
              className="fixed inset-0 bg-brand-ink/20 backdrop-blur-sm z-[-1] xl:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              id="mobile-navigation" ref={mobileMenuRef} role="dialog" aria-modal="true" aria-label="Navigation menu"
              onKeyDown={(event) => {
                if (event.key !== 'Tab') return;
                const items = Array.from((event.currentTarget as HTMLDivElement).querySelectorAll<HTMLElement>('button, a[href]')).filter((item) => item.getClientRects().length);
                const first = items[0], last = items[items.length - 1];
                if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
                if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
              }}
              initial={{ x: reduceMotion ? 0 : '100%' }} animate={{ x: 0 }} exit={{ x: reduceMotion ? 0 : '100%' }}
              transition={reduceMotion ? { duration: 0 } : { type: 'spring', damping: 25, stiffness: 200 }}
              className="auvia-mobile-panel fixed top-0 right-0 bottom-0 w-[90%] max-w-sm bg-white shadow-2xl p-6 xl:hidden flex flex-col overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6 mt-4">
                <div><span className="text-2xl font-kids font-bold text-brand-ink">Explore Auvia</span><p className="auvia-menu-caption">Care for your family's next step.</p></div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-brand-ink p-2 bg-brand-cream rounded-full" aria-label="Close menu">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col">
                {navItems.map((item) => (
                  item.type === 'dropdown' ? (
                    <div key={item.name} className="flex flex-col border-b border-gray-100">
                      <div className="flex items-center justify-between min-h-[52px]">
                        <Link to={item.href!} data-active={location.pathname === item.href || item.items?.some(subItem => subItem.href === location.pathname) || undefined} aria-current={location.pathname === item.href ? 'page' : undefined} onClick={() => setIsMobileMenuOpen(false)} className="auvia-mobile-link text-lg font-kids font-semibold text-brand-ink flex-1 py-3 px-2">{item.name}</Link>
                        <button type="button" onClick={() => toggleMobileDropdown(item.name)} aria-controls={`mobile-${item.href.slice(1)}`} aria-label={`${openMobileDropdown === item.name ? 'Hide' : 'Show'} ${item.name} submenu`} aria-expanded={openMobileDropdown === item.name} className="auvia-submenu-toggle p-2 text-brand-teal"><ChevronDown size={18} /></button>
                      </div>
                      <AnimatePresence initial={false}>
                        {openMobileDropdown === item.name && (
                          <motion.div
                            id={`mobile-${item.href.slice(1)}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeInOut" }}
                            className="overflow-hidden flex flex-col gap-2 pb-3 pl-4 border-l-2 border-brand-mint"
                          >
                            {item.items?.map(sub => (
                              <Link
                                key={sub.name}
                                to={sub.href}
                                aria-current={location.pathname === sub.href ? 'page' : undefined}
                                className="py-2 px-2 text-base font-bold text-brand-sage hover:text-brand-teal active:text-brand-teal transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div key={item.name} className="flex flex-col border-b border-gray-100">
                      <div className="flex items-center justify-between min-h-[52px]">
                        <Link
                          to={item.href!}
                          aria-current={location.pathname === item.href ? 'page' : undefined}
                          className={`auvia-mobile-link text-lg font-kids font-semibold transition-colors flex-1 py-3 px-2 ${location.pathname === item.href ? 'text-brand-teal' : 'text-brand-ink'}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </div>
                    </div>
                  )
                ))}
              </div>

              <div className="mt-auto pt-10">
                <div className="auvia-menu-note"><Heart size={16} aria-hidden="true" /><span>A little support. A brighter tomorrow.</span></div>
                <Link to="/contact" className="auvia-find-care bg-brand-teal text-white w-full py-4 rounded-2xl font-kids font-bold text-xl flex justify-center shadow-xl shadow-brand-teal/20" onClick={() => setIsMobileMenuOpen(false)}>
                  Find care <ArrowUpRight size={20} aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};
