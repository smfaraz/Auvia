import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, ArrowRight, Search, MapPin 
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
      logo: "https://www.wellpoint.com/themes/custom/wellpoint/logo.svg",
      abbr: "WP"
    },
    { 
      name: "Aetna Medicaid", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Aetna_logo.svg/2560px-Aetna_logo.svg.png",
      abbr: "Aetna"
    },
    { 
      name: "Superior Health", 
      logo: "https://www.superiorhealthplan.com/content/dam/centene/superior/images/logo/superior-healthplan-logo.png",
      abbr: "SH"
    },
    { 
      name: "Molina Healthcare", 
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Molina_Healthcare_Logo.svg/1200px-Molina_Healthcare_Logo.svg.png",
      abbr: "Molina"
    },
    { 
      name: "Carelon", 
      logo: "https://www.carelon.com/content/dam/carelon/common/images/logo/carelon-logo-horizontal.svg",
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
    <div className="bg-[#FCFAF7] selection:bg-brand-teal/20 text-[#1F2937] pt-32 lg:pt-44 font-sans min-h-screen">
      
      {/* 1. Functional Header Section (Based on image 2) */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-16">
        <div className="flex flex-col lg:flex-row justify-between gap-12 items-start">
          
          {/* Left Side: Title & Search */}
          <div className="flex-1 space-y-8">
            <div>
              <h1 className="text-6xl lg:text-[72px] font-kids font-bold text-[#1F2937] leading-none mb-4">
                Insurance accepted <br />
                <span className="text-brand-teal italic">by state.</span>
              </h1>
              <p className="text-lg text-brand-sage font-medium max-w-xl leading-relaxed">
                We are in-network with over 120+ providers nationwide. If you don't see your provider listed, contact us to verify your specific plan details.
              </p>
            </div>

            {/* Search Input Box */}
            <div className="relative max-w-2xl group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-teal transition-colors" size={24} />
              <input 
                type="text"
                placeholder="Search providers in your state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-8 py-6 bg-white border border-gray-100 rounded-[32px] shadow-sm focus:shadow-md focus:border-brand-teal outline-none transition-all text-xl"
              />
            </div>
          </div>

          {/* Right Side: Functional State Selector */}
          <div className="w-full lg:w-[380px] space-y-4">
            <label className="text-[13px] font-bold text-brand-sage uppercase tracking-[0.2em] ml-2">Select Your State:</label>
            
            {/* State Dropdown Container */}
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-teal">
                <MapPin size={22} />
              </div>
              <select 
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSearchQuery(""); // Clear search when state changes
                }}
                className="w-full pl-14 pr-12 py-5 bg-white border border-gray-100 rounded-[24px] appearance-none font-bold text-xl text-[#1F2937] shadow-sm hover:border-brand-teal focus:border-brand-teal outline-none transition-all cursor-pointer"
              >
                {Object.keys(insuranceData).map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-brand-teal transition-colors">
                <ChevronDown size={24} />
              </div>
            </div>

            {/* Find a Center Button */}
            <Link to="/contact" className="block">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-[#76B56B] text-white rounded-[24px] font-kids font-bold text-xl flex items-center justify-center gap-3 shadow-lg shadow-[#76B56B]/20 hover:bg-[#659e5a] transition-all"
              >
                Find a center <ArrowRight size={22} />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Providers Grid Section */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto pb-32">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                className="bg-white p-8 rounded-[32px] border border-gray-50 flex items-center gap-6 group hover:shadow-xl hover:border-brand-teal/10 transition-all cursor-default"
              >
                {/* Provider Logo */}
                <div className="w-24 h-16 bg-white rounded-2xl flex items-center justify-center shrink-0 p-2 border border-gray-100 group-hover:border-brand-teal/20 transition-all overflow-hidden">
                  {provider.logo ? (
                    <img 
                      src={provider.logo} 
                      alt={`${provider.name} logo`}
                      className="max-w-full max-h-full object-contain filter group-hover:brightness-105 transition-all"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${provider.abbr}&background=F0FDF4&color=0D9488&bold=true`;
                      }}
                    />
                  ) : (
                    <span className="text-xl font-bold text-brand-teal">{provider.abbr}</span>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#1F2937] leading-tight mb-2">
                    {provider.name}
                  </h3>
                  <div className="inline-flex px-3 py-1 bg-brand-mint/30 rounded-full text-[10px] font-bold text-brand-teal uppercase tracking-widest">
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 bg-white rounded-[40px] border-2 border-dashed border-gray-100"
          >
            <p className="text-brand-sage font-medium text-xl italic">
              No providers found matching "{searchQuery}" in {selectedState}.
            </p>
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-4 text-brand-teal font-bold hover:underline"
            >
              Clear search
            </button>
          </motion.div>
        )}
      </section>
    </div>
  );
};