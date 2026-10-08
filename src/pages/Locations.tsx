import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin, Phone, ArrowRight, ShieldCheck,
  Filter, Search, Info, Sparkles, ChevronRight,
  ListOrdered, Navigation, ChevronDown, Heart, Star
} from 'lucide-react';
import { GoogleCenterMap } from '../components/GoogleCenterMap';
import { useLocation as useRouterLocation, Link, useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, query as firestoreQuery, onSnapshot, orderBy } from 'firebase/firestore';
import { SEO } from '../components/SEO';
import { knownCenters } from '../data/known-centers';
import { normalizeCenter, centerAddress, centerSlug, type CenterRecord } from '../data/centers';
import '../styles/locations.css';
import { REVIEW_MODE } from '../lib/review';

// Preserve the locations list and map view; both use the selected center.
const InternalMap = ({ centers }: { centers: CenterRecord[] }) => {
  const [selected, setSelected] = useState('');
  const center = centers.find((item) => item.id === selected) || centers[0];
  if (!center) return <div className="h-full min-h-[400px] flex items-center justify-center bg-brand-sky/30 p-8 text-brand-sage">Choose a center from the locations list to view its map.</div>;
  return <div className="h-full flex flex-col">
    {centers.length > 1 && <label className="p-4 bg-white text-sm font-bold text-brand-ink">Map location<select value={center.id} onChange={(event) => setSelected(event.target.value)} className="ml-3 p-2 rounded-xl border border-brand-teal/20">{centers.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>}
    <div className="flex-grow"><GoogleCenterMap name={center.name} address={center.address ? centerAddress(center) : ''} /></div>
  </div>;
};

// Main Locations Page
export const Locations = () => {
  const navigate = useNavigate();
  const routerLocation = useRouterLocation();
  const initialQuery = (routerLocation.state as any)?.query || '';
  const [query, setQuery] = useState(initialQuery);
  const [program, setProgram] = useState('All');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [allCenters, setAllCenters] = useState<CenterRecord[]>(knownCenters);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (REVIEW_MODE) return;
    const q = firestoreQuery(collection(db, 'locations'), orderBy('name', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const centersData = snapshot.docs.map(doc => normalizeCenter(doc.id, doc.data()));
      setAllCenters(centersData.length ? centersData : knownCenters);
      setLoading(false);
    }, () => { setAllCenters(knownCenters); setLoading(false); });
    return () => unsubscribe();
  }, []);

  const filtered = useMemo(() => {
    return allCenters.filter(c => {
      const q = query.trim().toLowerCase();
      const matchesQuery = !q ||
        c.city.toLowerCase().includes(q) ||
        c.zip.includes(q) ||
        c.state.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q);
      const matchesProgram = program === 'All' || c.type === program;
      return matchesQuery && matchesProgram;
    });
  }, [query, program, allCenters]);

  const locationsSchema = useMemo(() => {
    if (!allCenters || allCenters.length === 0) return undefined;
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Auvia Behavior Centers Locations",
      "description": "Find an Auvia ABA center near you across Texas and beyond.",
      "itemListElement": allCenters.map((center, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "MedicalBusiness",
          "name": center.name,
          "image": center.image || "https://auviatherapy.com/favicon.svg",
          "telephone": center.phone,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": center.address,
            "addressLocality": center.city || undefined,
            "addressRegion": center.state || undefined,
            "postalCode": center.zip || "",
            "addressCountry": "US"
          },
          "geo": typeof center.lat === 'number' && typeof center.lng === 'number' ? {
            "@type": "GeoCoordinates",
            "latitude": center.lat,
            "longitude": center.lng
          } : undefined,
          "priceRange": "$$",
          "medicalSpecialty": "Pediatrics",
          "knowsAbout": "Applied Behavior Analysis, Autism Therapy, ASD Early Intervention"
        }
      }))
    };
  }, [allCenters]);

  const handleScheduleTour = (centerName: string) => {
    navigate('/contact', { state: { preferredCenter: centerName, intent: 'tour' } });
  };

  return (
    <div className="public-page auvia-locations bg-brand-cream min-h-screen font-sans flex flex-col overflow-x-hidden">
      <SEO
        title="Find an ABA Center Near You | Locations"
        description="Search for Auvia Behavior Centers across Texas and beyond. Find a sanctuary for center-based ABA therapy near your home."
        keywords="ABA therapy locations, autism center near me, Texas ABA therapy, finding an autism clinic, local BCBA services"
        canonicalUrl="https://auviatherapy.com/locations"
        jsonLd={locationsSchema}
      />

      {/* BRAND HERO */}
      <section className="pt-20 lg:pt-24 pb-16 px-6 lg:px-12 bg-gradient-to-br from-brand-sky via-brand-cream to-brand-peach/30 relative">
        <div className="max-w-[1400px] mx-auto">
          <motion.div className="route-title-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-section font-kids font-bold text-brand-ink mb-6 tracking-tight leading-none">
              Explore Our <br />
              <span className="text-brand-teal italic">Centers.</span>
            </h1>
          </motion.div>
        </div>
        {/* Decorative collage: photo stickers on a dotted route with dropped pins */}
        <div aria-hidden="true" className="loc-hero-art">
          <svg className="loc-hero-route" viewBox="0 0 520 220" fill="none" preserveAspectRatio="none"><path d="M6 176C70 86 150 206 230 126S350 16 420 86s60 70 94 30" /></svg>
          <span className="loc-hero-photo loc-hero-photo--a"><img src="/images/kids-team.webp" alt="" decoding="async" width={180} height={180} /></span>
          <span className="loc-hero-photo loc-hero-photo--b"><img src="/images/kids-hero.webp" alt="" decoding="async" width={140} height={170} /></span>
          <span className="loc-hero-pin loc-hero-pin--a"><MapPin size={22} strokeWidth={2.25} /></span>
          <span className="loc-hero-pin loc-hero-pin--b"><MapPin size={18} strokeWidth={2.25} /></span>
          <span className="loc-hero-bit loc-hero-bit--heart"><Heart size={26} strokeWidth={2.25} /></span>
          <span className="loc-hero-bit loc-hero-bit--star"><Star size={24} strokeWidth={2.25} /></span>
        </div>
      </section>

      {/* SPLIT-PANE HUB - RESPONSIVE ENHANCED */}
      <section className="auvia-hub flex-grow flex flex-col md:flex-row border-t border-gray-100 min-h-[500px] md:min-h-[600px] relative">

        {/* Mobile View Toggle */}
        <div className="auvia-view-toggle md:hidden flex bg-white border-b border-gray-100 p-2 sticky top-[72px] md:top-[80px] z-30">
          <button
            type="button" aria-pressed={viewMode === 'list'}
            onClick={() => setViewMode('list')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${viewMode === 'list' ? 'bg-brand-teal text-white shadow-lg' : 'text-brand-sage hover:bg-gray-50'}`}
          >
            <ListOrdered size={18} /> View List
          </button>
          <button
            type="button" aria-pressed={viewMode === 'map'}
            onClick={() => setViewMode('map')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${viewMode === 'map' ? 'bg-brand-teal text-white shadow-lg' : 'text-brand-sage hover:bg-gray-50'}`}
          >
            <MapPin size={18} /> View Map
          </button>
        </div>

        {/* LEFT PANE: SEARCH & RESULTS */}
        <div className={`auvia-list-pane w-full md:w-[40%] lg:w-[42%] shrink-0 bg-white md:border-r border-gray-100 flex flex-col ${viewMode === 'map' ? 'hidden md:flex' : 'flex'}`}>

          <div className="auvia-search-panel p-6 sticky top-0 bg-white/95 backdrop-blur-sm z-20 border-b border-gray-100">
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="center-search" className="text-brand-teal font-bold text-xs uppercase tracking-widest ml-1">Search Area</label>
                <div className="glass-input w-full flex items-center px-5 py-4 gap-3 rounded-2xl">
                  <Search className="text-brand-teal" size={20} />
                  <input
                    id="center-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)}
                    className="bg-transparent w-full min-w-0 text-brand-ink text-base outline-none"
                    placeholder="City, State, or Zip Code..."
                  />
                  {query && (
                    <button type="button" aria-label="Clear location search" onClick={() => setQuery('')} className="text-brand-sage hover:text-brand-teal transition-colors text-sm font-bold">
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="center-program" className="text-brand-teal font-bold text-xs uppercase tracking-widest ml-1">Program Type</label>
                <div className="glass-input w-full flex items-center px-5 py-4 gap-3 rounded-2xl">
                  <Filter className="text-brand-teal" size={20} />
                  <select
                    id="center-program" value={program} onChange={(e) => setProgram(e.target.value)}
                    className="bg-transparent w-full min-w-0 text-brand-ink text-base outline-none appearance-none cursor-pointer"
                  >
                    <option value="All">All Programs</option>
                    <option value="Center based care">In-Center Care</option>
                  </select>
                  <ChevronDown size={16} aria-hidden="true" />
                </div>
              </div>

              <p role="status" aria-live="polite" className="text-xs text-brand-sage font-semibold ml-1">{filtered.length} center{filtered.length !== 1 ? 's' : ''} found</p>
            </div>
          </div>

          <div className="auvia-results p-6 flex-grow overflow-y-auto">
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="auvia-empty text-center py-20 bg-gray-50 rounded-3xl"
                >
                  <Info size={40} className="mx-auto mb-4 text-brand-teal opacity-50" />
                  <p className="text-gray-500 font-medium mb-2">No centers found in this area.</p>
                  <button type="button" onClick={() => { setQuery(''); setProgram('All'); }} className="text-brand-teal font-bold text-sm hover:underline">
                    Show all centers
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {filtered.map((center) => (
                    <motion.div
                      key={center.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="auvia-center-card group p-6 glass-panel rounded-3xl transition-all border border-brand-teal/10 hover:border-brand-teal/25"
                    >
                      <div className="flex gap-5 mb-4">
                        <img src={center.image} loading="lazy" decoding="async" width={72} height={72} className="auvia-center-thumb w-18 h-18 shrink-0 rounded-2xl object-cover" alt={center.name} />
                        <div className="min-w-0">
                          <h3 className="text-xl font-bold text-brand-ink group-hover:text-brand-teal transition-colors">{center.name}</h3>
                          <div className="auvia-chip flex items-center gap-1.5 mt-1 text-brand-teal text-[10px] font-bold uppercase tracking-tighter">
                            <Sparkles size={12} /> Clinical Excellence
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2.5 mb-6 text-sm text-gray-600">
                        <div className="flex items-start gap-3">
                          <MapPin size={16} className="mt-0.5 text-brand-teal shrink-0" />
                          <span>{center.address}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone size={16} className="text-brand-teal shrink-0" />
                          {center.phone ? <a href={`tel:${center.phone.replace(/[^0-9]/g, '')}`} className="hover:text-brand-teal transition-colors font-medium">{center.phone}</a> : <Link to="/contact">Ask for contact details</Link>}
                        </div>
                        <div className="flex items-center gap-3">
                          <ShieldCheck size={16} className="text-brand-teal shrink-0" />
                          <span>Insurance: <b className="text-gray-900">{center.insurance}</b></span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2.5">
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleScheduleTour(center.name)}
                            className="flex-1 bg-brand-teal text-white py-3.5 rounded-xl font-bold hover:brightness-95 transition-all shadow-lg shadow-brand-teal/10 text-sm"
                          >
                            Schedule Tour
                          </button>
                          <a
                            href={center.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(centerAddress(center))}` : '/contact'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="auvia-directions px-5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center"
                            aria-label={center.address ? `Get directions to ${center.name} (new tab)` : 'Ask for location details'}
                          >
                            <Navigation size={18} className="text-brand-teal" />
                          </a>
                        </div>
                        <Link
                          to={centerSlug(center) ? `/locations/${centerSlug(center)}` : '/contact'}
                          className="auvia-details-link w-full text-center py-2.5 bg-brand-mint/20 hover:bg-brand-mint/40 text-brand-teal rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                        >
                          View Clinic & Insurance Details <ArrowRight size={14} />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT PANE: MAP */}
        <div className={`auvia-map-pane flex-grow h-[500px] md:h-auto relative ${viewMode === 'list' ? 'hidden md:block' : 'block'}`}>
          <InternalMap centers={filtered} />
          <span aria-hidden="true" className="loc-pin-drop"><i /></span>

          {/* FLOATING STATUS BADGE */}
          <div className="auvia-map-badge absolute top-6 right-6 z-20 hidden md:block">
            <div className="glass-panel px-5 py-3 rounded-2xl premium-shadow border border-white/60 flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-brand-teal rounded-full animate-pulse shadow-[0_0_8px_#4D9689]" />
              <span className="text-[11px] font-extrabold text-brand-ink uppercase tracking-widest">Center locations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative closing strip: shapes strolling along a dotted route */}
      <div aria-hidden="true" className="loc-parade">
        <span className="loc-parade-shape loc-parade-shape--a" />
        <span className="loc-parade-icon loc-parade-icon--a"><MapPin size={20} strokeWidth={2.25} /></span>
        <span className="loc-parade-shape loc-parade-shape--b" />
        <span className="loc-parade-icon loc-parade-icon--b"><Heart size={20} strokeWidth={2.25} /></span>
        <span className="loc-parade-shape loc-parade-shape--c" />
      </div>
    </div>
  );
};
