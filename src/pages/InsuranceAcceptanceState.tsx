import '../styles/pages.css';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import {
  ChevronDown, ArrowRight, Search, MapPin, SearchX, BadgeCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

// --- DATA: Full List of Insurance Providers per State ---
const insuranceData: Record<string, any[]> = {
  "Texas": [
    {
      name: "Blue Cross Blue Shield of Texas (BCBS TX)",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Blue_Cross_Blue_Shield_logo.svg/2560px-Blue_Cross_Blue_Shield_logo.svg.png",
      abbr: "BCBS"
    },
    {
      name: "Aetna Commercial",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Aetna_logo.svg/2560px-Aetna_logo.svg.png",
      abbr: "Aetna"
    },
    {
      name: "Cigna",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Cigna_logo.svg/2560px-Cigna_logo.svg.png",
      abbr: "Cigna"
    },
    {
      name: "United Healthcare",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/UnitedHealthcare_logo.svg/2560px-UnitedHealthcare_logo.svg.png",
      abbr: "UHC"
    },
    {
      name: "Wellpoint Medicaid",
      logo: "/images/insurers/wellpoint-logo.webp",
      abbr: "WP"
    },
    {
      name: "Aetna Medicaid",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Aetna_logo.svg/2560px-Aetna_logo.svg.png",
      abbr: "Aetna"
    },
    {
      name: "Superior Health",
      logo: "/images/insurers/superior-health-logo.webp",
      abbr: "SH"
    },
    {
      name: "Molina Healthcare",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Molina_Healthcare_Logo.svg/1200px-Molina_Healthcare_Logo.svg.png",
      abbr: "Molina"
    },
    {
      name: "Carelon",
      logo: "/images/insurers/carelon-logo.webp",
      abbr: "Carelon"
    },
    {
      name: "Tricare",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/TRICARE_logo.svg/2560px-TRICARE_logo.svg.png",
      abbr: "Tricare"
    }
  ]
};

export const InsuranceAcceptanceState = () => {
  const [selectedState, setSelectedState] = useState("Texas");
  const [searchQuery, setSearchQuery] = useState("");

  // Functional filtering logic
  const filteredProviders = useMemo(() => {
    const providers = insuranceData[selectedState] || [];
    return providers.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedState, searchQuery]);

  return (
    <MotionConfig reducedMotion="user">
    <div className="inner-public-page public-page ic-page bg-brand-cream selection:bg-brand-teal/20 text-brand-ink pt-20 lg:pt-24 font-sans min-h-screen overflow-x-hidden">
      <SEO
        title="Insurance Accepted by State | Auvia"
        description="Search our nationwide directory of accepted insurance providers for ABA therapy. We are in-network with over 120+ providers."
        keywords="aba therapy insurance, autism insurance coverage, in network aba providers, BCBS aba therapy, medicaid aba therapy"
        canonicalUrl="https://auviatherapy.com/insurance-by-state"
      />

      {/* 1. Functional Header Section (Based on image 2) */}
      <section className="ic-state-hero px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 items-start">

          {/* Left Side: Title & Search */}
          <div className="flex-1 space-y-6 w-full">
            <div className="route-title-block">
              <h1 className="text-display font-kids font-bold text-brand-ink leading-none mb-4">
                Insurance accepted <br />
                <span className="text-brand-teal italic">by state.</span>
              </h1>
              <p className="text-lg text-brand-sage font-medium max-w-xl leading-relaxed">
                We are in-network with over 120+ providers nationwide. If you don't see your provider listed, contact us to verify your specific plan details.
              </p>
            </div>

            {/* Search Input Box */}
            <div className="ic-search relative max-w-2xl group">
              <Search strokeWidth={1.75} aria-hidden="true" className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-ink group-focus-within:text-brand-teal transition-colors" size={22} />
              <input
                type="text"
                aria-label="Search insurance providers in your selected state" placeholder="Search providers in your state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 outline-none text-lg"
              />
            </div>
          </div>

          {/* Right Side: Functional State Selector */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="ic-state-picker w-full lg:w-[380px] space-y-3">
            <label htmlFor="insurance-state" className="vform-label">Select Your State:</label>

            {/* State Dropdown Container */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-teal pointer-events-none">
                <MapPin strokeWidth={1.75} aria-hidden="true" size={20} />
              </div>
              <select id="insurance-state"
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSearchQuery(""); // Clear search when state changes
                }}
                className="w-full pl-12 pr-12 appearance-none font-bold text-lg text-brand-ink outline-none cursor-pointer"
              >
                {Object.keys(insuranceData).map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-teal">
                <ChevronDown strokeWidth={1.75} aria-hidden="true" size={20} />
              </div>
            </div>

            {/* Find a Center Button */}
            <Link to="/locations" className="block pt-1">
              <motion.span
                whileHover={{ y: -2 }}
                whileTap={{ y: 3 }}
                className="ic-pill-btn w-full py-4 bg-brand-teal text-white font-kids font-bold text-lg flex items-center justify-center gap-3"
              >
                Find a center <ArrowRight strokeWidth={1.75} aria-hidden="true" size={22} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Providers Grid Section */}
      <section className="ic-providers px-6 lg:px-12">
        <span aria-hidden="true" className="ic-deco ic-deco--flower ic-st-deco-a" />
        <span aria-hidden="true" className="ic-deco ic-deco--star ic-st-deco-b" />
        <span aria-hidden="true" className="ic-deco ic-deco--heart ic-st-deco-c" />
        <div className="max-w-7xl mx-auto relative">
        <motion.div
          layout
          className="ic-provider-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProviders.map((provider) => (
              <motion.div
                key={`${selectedState}-${provider.name}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="ic-provider bg-white p-5 lg:p-6 flex items-center gap-4 lg:gap-5 cursor-default"
              >
                {/* Provider Logo */}
                <div className="ic-provider__logo w-24 h-16 bg-white rounded-2xl flex items-center justify-center shrink-0 p-2 overflow-hidden">
                  {provider.logo ? (
                    <> <img
                      src={provider.logo}
                      alt={`${provider.name} logo`}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                      }}
                    /><span className="hidden text-brand-teal font-bold text-sm">{provider.abbr}</span></>
                  ) : (
                    <span className="text-xl font-bold text-brand-teal">{provider.abbr}</span>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-brand-ink leading-tight mb-2">
                    {provider.name}
                  </h3>
                  <div className="ic-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                    <BadgeCheck strokeWidth={2} aria-hidden="true" size={14} />
                    In-Network
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProviders.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.34, 1.4, 0.64, 1] }}
            className="ic-empty text-center py-14 px-6 bg-white rounded-[28px]"
          >
            <div aria-hidden="true" className="ic-empty__icon"><SearchX strokeWidth={1.75} size={34} /></div>
            <p className="text-brand-sage font-medium text-xl italic">
              No providers found matching "{searchQuery}" in {selectedState}.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="ic-empty__clear mt-4 px-4 text-brand-teal font-bold underline underline-offset-4"
            >
              Clear search
            </button>
          </motion.div>
        )}
        </div>
      </section>
    </div>
    </MotionConfig>
  );
};
