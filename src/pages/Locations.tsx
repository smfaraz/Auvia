import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin, Phone, ArrowRight, ShieldCheck,
  Filter, Search, Info, Sparkles, ChevronRight, Globe
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useLocation as useRouterLocation } from 'react-router-dom';
import L from 'leaflet';

// Leaflet fix & custom icon
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const ALL_CENTERS = [
  {
    id: 1,
    name: "Blaine Johnsville Center",
    address: "11855 Ulysses Street Northeast, Suite 120, Blaine, MN 55434",
    city: "Blaine", zip: "55434", state: "Minnesota",
    lat: 45.1884, lng: -93.2285,
    phone: "(763) 555-0101",
    insurance: "Anthem, Cigna, +120 more",
    type: "Center based care",
    image: "https://images.unsplash.com/photo-1516533017015-fe5830e44189?w=400&q=80"
  },
  {
    id: 2,
    name: "Austin North Sanctuary",
    address: "4502 Burnet Rd, Austin, TX 78756",
    city: "Austin", zip: "78756", state: "Texas",
    lat: 30.3156, lng: -97.7392,
    phone: "(512) 555-0202",
    insurance: "BlueCross, Aetna, Medicaid",
    type: "Center based care",
    image: "https://images.unsplash.com/photo-1576091160550-2173bdd99625?w=400&q=80"
  },
  {
    id: 3,
    name: "Dallas Oakwood Center",
    address: "1200 E Mockingbird Ln, Suite 400, Dallas, TX 75201",
    city: "Dallas", zip: "75201", state: "Texas",
    lat: 32.8392, lng: -96.7730,
    phone: "(214) 555-0303",
    insurance: "Aetna, BCBS, Cigna, United",
    type: "Center based care",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80"
  },
  {
    id: 4,
    name: "Houston Heights Haven",
    address: "850 Yale St, Houston, TX 77007",
    city: "Houston", zip: "77007", state: "Texas",
    lat: 29.7907, lng: -95.3981,
    phone: "(713) 555-0404",
    insurance: "BlueCross, Cigna, TRICARE",
    type: "Center based care",
    image: "https://images.unsplash.com/photo-1564429238961-04ad3b6a4b6a?w=400&q=80"
  },
  {
    id: 5,
    name: "Denver Highlands Retreat",
    address: "2900 Zuni St, Denver, CO 80211",
    city: "Denver", zip: "80211", state: "Colorado",
    lat: 39.7605, lng: -105.0134,
    phone: "(303) 555-0505",
    insurance: "Anthem, Cigna, Magellan",
    type: "Center based care",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80"
  }
];

// Internal Map Component
const InternalMap = ({ centers }: { centers: typeof ALL_CENTERS }) => {
  const mapCenter: [number, number] = centers.length > 0
    ? [centers[0].lat, centers[0].lng]
    : [39.8283, -98.5795];

  return (
    <div className="w-full h-full min-h-[400px]">
      <MapContainer
        center={mapCenter}
        zoom={centers.length === 1 ? 12 : 4}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {centers.map(center => (
          <Marker key={center.id} position={[center.lat, center.lng]} icon={customIcon}>
            <Popup>
              <div className="font-sans p-1">
                <p className="font-bold text-brand-teal">{center.name}</p>
                <p className="text-xs text-gray-600">{center.address}</p>
                <a href={`tel:${center.phone.replace(/[^0-9]/g, '')}`} className="text-xs text-brand-teal font-bold mt-1 block">{center.phone}</a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

// Main Locations Page
export const Locations = () => {
  const routerLocation = useRouterLocation();
  const initialQuery = (routerLocation.state as any)?.query || '';
  const [query, setQuery] = useState(initialQuery);
  const [program, setProgram] = useState('All');

  const filtered = useMemo(() => {
    return ALL_CENTERS.filter(c => {
      const q = query.toLowerCase();
      const matchesQuery = !q ||
        c.city.toLowerCase().includes(q) ||
        c.zip.includes(q) ||
        c.state.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q);
      const matchesProgram = program === 'All' || c.type === program;
      return matchesQuery && matchesProgram;
    });
  }, [query, program]);

  const handleScheduleTour = (centerName: string) => {
    alert(`Thank you for your interest in ${centerName}! A team member will contact you within 24 hours to schedule your tour.`);
  };

  return (
    <div className="bg-white min-h-screen font-sans flex flex-col overflow-x-hidden">

      {/* BRAND HERO */}
      <section className="pt-32 pb-16 px-6 lg:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-brand-teal/10 rounded-lg flex items-center justify-center text-brand-teal">
                <Globe size={18} />
              </div>
              <span className="text-brand-teal text-xs font-bold uppercase tracking-widest">
                Sanctuary Network
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-kids font-bold text-brand-ink mb-6 tracking-tight leading-none">
              Explore Our <br />
              <span className="text-brand-teal italic">Centers.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* SPLIT-PANE HUB */}
      <section className="flex-grow flex flex-col lg:flex-row border-t border-gray-100 min-h-[600px]">

        {/* LEFT PANE: SEARCH & RESULTS */}
        <div className="w-full lg:w-[500px] xl:w-[600px] bg-white lg:border-r border-gray-100 flex flex-col">

          <div className="p-8 sticky top-0 bg-white/95 backdrop-blur-sm z-20 border-b border-gray-100">
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-brand-teal font-bold text-[10px] uppercase tracking-widest ml-1">Search Area</label>
                <div className="bg-[#f8fbfa] border border-brand-teal/10 rounded-2xl flex items-center px-5 py-4 gap-3 focus-within:ring-2 ring-brand-teal/20 transition-all">
                  <MapPin className="text-brand-teal" size={20} />
                  <input
                    type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                    className="bg-transparent w-full text-brand-ink text-lg outline-none"
                    placeholder="City, State, or Zip Code..."
                  />
                  {query && (
                    <button onClick={() => setQuery('')} className="text-brand-sage hover:text-brand-teal transition-colors text-sm font-bold">
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-brand-teal font-bold text-[10px] uppercase tracking-widest ml-1">Program Type</label>
                <div className="bg-[#f8fbfa] border border-brand-teal/10 rounded-2xl flex items-center px-5 py-4 gap-3">
                  <Filter className="text-brand-teal" size={20} />
                  <select
                    value={program} onChange={(e) => setProgram(e.target.value)}
                    className="bg-transparent w-full text-brand-ink text-lg outline-none appearance-none cursor-pointer"
                  >
                    <option value="All">All Programs</option>
                    <option value="Center based care">In-Center Care</option>
                    <option value="ABC Academy">School-Based Care</option>
                  </select>
                </div>
              </div>

              <p className="text-xs text-brand-sage font-bold ml-1">{filtered.length} center{filtered.length !== 1 ? 's' : ''} found</p>
            </div>
          </div>

          <div className="p-6 flex-grow overflow-y-auto">
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center py-20 bg-gray-50 rounded-3xl"
                >
                  <Info size={40} className="mx-auto mb-4 text-brand-teal opacity-50" />
                  <p className="text-gray-500 font-medium mb-2">No centers found in this area.</p>
                  <button onClick={() => { setQuery(''); setProgram('All'); }} className="text-brand-teal font-bold text-sm hover:underline">
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
                      className="group p-6 bg-white border border-gray-100 rounded-[32px] hover:shadow-xl transition-all border-l-4 hover:border-l-brand-teal"
                    >
                      <div className="flex gap-5 mb-4">
                        <img src={center.image} className="w-20 h-20 rounded-2xl object-cover shadow-sm" alt={center.name} />
                        <div>
                          <h3 className="text-xl font-bold text-brand-ink group-hover:text-brand-teal transition-colors">{center.name}</h3>
                          <div className="flex items-center gap-1.5 mt-1 text-brand-teal text-[10px] font-bold uppercase tracking-tighter">
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
                          <a href={`tel:${center.phone.replace(/[^0-9]/g, '')}`} className="hover:text-brand-teal transition-colors font-medium">{center.phone}</a>
                        </div>
                        <div className="flex items-center gap-3">
                          <ShieldCheck size={16} className="text-brand-teal shrink-0" />
                          <span>Insurance: <b className="text-gray-900">{center.insurance}</b></span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleScheduleTour(center.name)}
                          className="flex-1 bg-brand-teal text-white py-3.5 rounded-xl font-bold hover:brightness-95 transition-all shadow-lg shadow-brand-teal/10"
                        >
                          Schedule Tour
                        </button>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(center.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center"
                          aria-label="Get directions"
                        >
                          <ChevronRight size={20} className="text-gray-400" />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT PANE: MAP */}
        <div className="flex-grow h-[450px] lg:h-auto relative">
          <InternalMap centers={filtered} />

          {/* FLOATING STATUS BADGE */}
          <div className="absolute top-6 right-6 z-[400] hidden md:block">
            <div className="bg-white/90 backdrop-blur px-5 py-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-brand-teal rounded-full animate-pulse shadow-[0_0_8px_#4D9689]" />
              <span className="text-[11px] font-extrabold text-brand-ink uppercase tracking-widest">Live System Active</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};