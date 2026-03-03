/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { InsuranceAcceptanceState } from './pages/InsuranceAcceptanceState';
import { Locations } from './pages/Locations';
import { About } from './pages/About';
import { Careers } from './pages/Careers';
import { Contact } from './pages/Contact';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { MagicMascot } from './components/MagicMascot';
import { InsuranceFinancialAssistance } from './pages/InsuranceFinancialAssistance';
import { WhatIsAutism } from './pages/WhatIsAutism';
import { WhatIsABA } from './pages/WhatIsABA';

// Scroll to top on route change
const ScrollToTopOnMount = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <Router>
      <ScrollToTopOnMount />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            
            {/* Parent Resources Section */}
            <Route path="/what-is-autism" element={<WhatIsAutism />} />
            <Route path="/what-is-aba" element={<WhatIsABA />} />
            {/* Insurance & Financial Section */}
            <Route path="/insurance-by-state" element={<InsuranceAcceptanceState />} />
            <Route path="/insurance-financial-assistance" element={<InsuranceFinancialAssistance />} />
            
            {/* Company & Support Section */}
            <Route path="/locations" element={<Locations />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTopButton />
        <MagicMascot />
      </div>
    </Router>
  );
}