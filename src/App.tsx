/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { REVIEW_MODE, preventReviewSubmission } from './lib/review';
import { MotionConfig } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { MagicMascot } from './components/MagicMascot';
import { NotFound } from './pages/NotFound';
const Services = React.lazy(() => import('./pages/Services').then(m => ({ default: m.Services })));
const InsuranceAcceptanceState = React.lazy(() => import('./pages/InsuranceAcceptanceState').then(m => ({ default: m.InsuranceAcceptanceState })));
const Locations = React.lazy(() => import('./pages/Locations').then(m => ({ default: m.Locations })));
const LocationDetail = React.lazy(() => import('./pages/LocationDetail').then(m => ({ default: m.LocationDetail })));
const About = React.lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Careers = React.lazy(() => import('./pages/Careers').then(m => ({ default: m.Careers })));
const Contact = React.lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const InsuranceFinancialAssistance = React.lazy(() => import('./pages/InsuranceFinancialAssistance').then(m => ({ default: m.InsuranceFinancialAssistance })));
const WhatIsAutism = React.lazy(() => import('./pages/WhatIsAutism').then(m => ({ default: m.WhatIsAutism })));
const WhatIsABA = React.lazy(() => import('./pages/WhatIsABA').then(m => ({ default: m.WhatIsABA })));
const ParentHelpCenter = React.lazy(() => import('./pages/ParentHelpCenter').then(m => ({ default: m.ParentHelpCenter })));
const AdminLogin = React.lazy(() => import('./pages/Admin/Login').then(m => ({ default: m.AdminLogin })));
const AdminDashboard = React.lazy(() => import('./pages/Admin/Dashboard').then(m => ({ default: m.AdminDashboard })));
const Terms = React.lazy(() => import('./pages/Terms').then(m => ({ default: m.Terms })));
const Accessibility = React.lazy(() => import('./pages/Accessibility').then(m => ({ default: m.Accessibility })));
const ParentGuide = React.lazy(() => import('./pages/ParentGuide').then(m => ({ default: m.ParentGuide })));
const Insurance = React.lazy(() => import('./pages/Insurance').then(m => ({ default: m.Insurance })));

class RouteBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  declare props: { children: React.ReactNode };
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (!this.state.failed) return this.props.children;
    return <section className="route-error" role="alert"><h1>This page couldn't load.</h1><p className="mt-4 mb-6">Please refresh to try again, or return to the homepage.</p><button type="button" className="btn-friendly-primary" onClick={() => window.location.reload()}>Refresh page</button> <a className="btn-friendly-outline inline-flex" href="/">Home</a></section>;
  }
}

function RouteLoading() {
  return <section className="route-loading" data-route-loading role="status" aria-label="Loading page"><span className="sr-only">Loading page</span><div aria-hidden="true"><div className="route-loading__line" /><div className="route-loading__line" /><div className="route-loading__line" /></div></section>;
}

// Hash targets and route focus must wait for lazy page content to mount.
const ScrollToTopOnMount = () => {
  const { pathname, hash } = useLocation();
  const visited = React.useRef(false);
  React.useEffect(() => {
    const shouldFocus = visited.current;
    visited.current = true;
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' });
    let observer: MutationObserver | undefined;
    let focusFrame = 0;
    const finish = () => {
      const main = document.getElementById('main-content');
      if (!main || main.querySelector('[data-route-loading]')) return false;
      let target: HTMLElement | null = main;
      if (hash) {
        try { target = document.getElementById(decodeURIComponent(hash.slice(1))); } catch { target = null; }
        if (!target) return false;
        target.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
      if (shouldFocus || hash) {
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        focusFrame = requestAnimationFrame(() => target?.focus({ preventScroll: true }));
      }
      observer?.disconnect();
      return true;
    };
    if (!finish()) {
      observer = new MutationObserver(finish);
      observer.observe(document.getElementById('root')!, { childList: true, subtree: true });
    }
    const timeout = window.setTimeout(() => observer?.disconnect(), 15000);
    return () => { observer?.disconnect(); clearTimeout(timeout); cancelAnimationFrame(focusFrame); };
  }, [pathname, hash]);
  return null;
};

import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  return (
    <MotionConfig reducedMotion="user"><HelmetProvider>
      <Router>
        <ScrollToTopOnMount />
        <AppContent />
      </Router>
    </HelmetProvider></MotionConfig>
  );
}

const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col" onSubmitCapture={preventReviewSubmission}>
      <a href="#main-content" className="skip-link">Skip to content</a>
      {REVIEW_MODE && <details className="review-preview-note"><summary>Review preview</summary><p>Forms, subscriptions, live chat and admin are disabled. Nothing is sent or saved. Managed content is unavailable; existing location fallback is shown.</p></details>}
      {!isAdminPage && <Navbar />}
      <main id="main-content" tabIndex={-1} className="flex-grow" data-route={location.pathname}>
        <RouteBoundary key={location.pathname}><React.Suspense fallback={<RouteLoading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />

          {/* Parent Resources Section */}
          <Route path="/parent-help-center" element={<ParentHelpCenter />} />
          <Route path="/what-is-autism" element={<WhatIsAutism />} />
          <Route path="/what-is-aba" element={<WhatIsABA />} />
          {/* Insurance & Financial Section */}
          <Route path="/insurance-by-state" element={<InsuranceAcceptanceState />} />
          <Route path="/insurance-financial-assistance" element={<InsuranceFinancialAssistance />} />
          {/* Company & Support Section */}
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/:locationSlug" element={<LocationDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

          {/* Legal & Info Pages */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/parent-guide" element={<ParentGuide />} />
          <Route path="/insurance" element={<Insurance />} />

          {/* Admin Section */}
          <Route path="/admin/login" element={REVIEW_MODE ? <NotFound /> : <AdminLogin />} />
          <Route path="/admin/dashboard" element={REVIEW_MODE ? <NotFound /> : <AdminDashboard />} />
          <Route path="/admin" element={REVIEW_MODE ? <NotFound /> : <AdminLogin />} />

          {/* Legacy route redirects to prevent duplicate indexing */}
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/home-based" element={<Navigate to="/services" replace />} />

          {/* Catch-all Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </React.Suspense></RouteBoundary>
      </main>
      {!isAdminPage && <Footer />}
      {!isAdminPage && <ScrollToTopButton />}
      {!isAdminPage && <MagicMascot />}
    </div>
  );
};
