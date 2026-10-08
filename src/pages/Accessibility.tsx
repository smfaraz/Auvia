import '../styles/pages.css';
import React from 'react';
import { motion } from 'motion/react';
import { Eye, Monitor, Volume2, MousePointer, Keyboard, Phone, Mail, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const Accessibility = () => {
  const features = [
    {
      icon: <Eye strokeWidth={1.75} aria-hidden="true" className="text-brand-teal" size={28} />,
      title: "Visual Accessibility",
      items: [
        "Color contrast ratio of at least 4.5:1 for all text",
        "Text can be resized up to 200% without loss of content",
        "All images have descriptive alt text",
        "No content relies on color alone to convey meaning",
        "Focus indicators are visible on all interactive elements"
      ]
    },
    {
      icon: <Keyboard strokeWidth={1.75} aria-hidden="true" className="text-brand-teal" size={28} />,
      title: "Keyboard Navigation",
      items: [
        "All functionality accessible via keyboard alone",
        "Logical tab order throughout all pages",
        "Skip navigation links available",
        "No keyboard traps on any page",
        "Dropdown menus fully keyboard operable"
      ]
    },
    {
      icon: <Volume2 strokeWidth={1.75} aria-hidden="true" className="text-brand-teal" size={28} />,
      title: "Screen Reader Support",
      items: [
        "Semantic HTML structure throughout",
        "ARIA labels on all interactive components",
        "Meaningful page titles and headings",
        "Form fields have associated labels",
        "Error messages are programmatically associated"
      ]
    },
    {
      icon: <Monitor strokeWidth={1.75} aria-hidden="true" className="text-brand-teal" size={28} />,
      title: "Responsive Design",
      items: [
        "Fully responsive across mobile, tablet, and desktop",
        "Touch targets minimum 44×44 pixels on mobile",
        "Content reflows at 320px viewport width",
        "No horizontal scrolling on standard viewports",
        "Videos do not autoplay with sound"
      ]
    }
  ];

  const assistiveTech = [
    "JAWS (Job Access With Speech)",
    "NVDA (NonVisual Desktop Access)",
    "VoiceOver (macOS and iOS)",
    "TalkBack (Android)",
    "Dragon NaturallySpeaking",
    "ZoomText",
    "Windows Magnifier",
    "iOS Zoom"
  ];

  return (
    <div className="legal-page inner-public-page public-page pt-20 lg:pt-24 pb-20 lg:pb-32 bg-[#FCFAF7] min-h-screen overflow-x-hidden">
      <SEO
        title="Accessibility Statement | Auvia Behavior Centers"
        description="Auvia Behavior Centers is committed to ensuring digital accessibility for people with disabilities. Learn about our WCAG 2.1 AA compliance and accessibility features."
        keywords="auvia accessibility, wcag compliance, aba therapy accessibility, accessible website autism"
        canonicalUrl="https://auviatherapy.com/accessibility"
      />

      {/* Background */}
      <div className="blob-bg w-[500px] h-[500px] bg-brand-mint/15 top-[-5%] right-[-10%]" />
      <div className="blob-bg w-[400px] h-[400px] bg-brand-peach/15 bottom-[10%] left-[-10%]" />

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="route-title-block mb-16"
        >
          <div className="legal-eyebrow inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-teal/10 text-brand-teal text-xs font-bold uppercase tracking-widest mb-6">
            <Eye strokeWidth={1.75} aria-hidden="true" size={14} />
            Accessibility
          </div>
          <h1 className="text-display font-kids font-bold text-brand-ink mb-6 leading-tight">
            Accessibility <span className="text-brand-teal italic">Statement.</span>
          </h1>
          <p className="text-lg text-brand-sage font-medium leading-relaxed max-w-2xl">
            Auvia Behavior Centers is committed to ensuring that our website is accessible to everyone, including people with disabilities. We strive to meet WCAG 2.1 Level AA standards.
          </p>
          <div className="legal-badge mt-6 inline-flex items-center gap-3 bg-brand-mint/20 px-5 py-3 rounded-2xl">
            <CheckCircle strokeWidth={1.75} aria-hidden="true" size={16} className="text-brand-teal" />
            <span className="text-sm font-bold text-brand-teal">WCAG 2.1 Level AA · Section 508 · ADA Compliant</span>
          </div>
        </motion.div>

        <nav aria-label="On this page" className="legal-toc">
          <ul>
            <li><a href="#our-commitment">Our Commitment</a></li>
            {features.map((feature, index) => (
              <li key={index}><a href={`#accessibility-feature-${index + 1}`}>{feature.title}</a></li>
            ))}
            <li><a href="#supported-assistive-technologies">Supported Assistive Technologies</a></li>
            <li><a href="#known-limitations">Known Limitations & Ongoing Work</a></li>
            <li><a href="#accessibility-feedback">Accessibility Feedback</a></li>
          </ul>
        </nav>

        {/* Our Commitment */}
        <motion.div
          id="our-commitment"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="legal-card bg-white rounded-[32px] p-8 border border-brand-teal/5 shadow-sm mb-8"
        >
          <h2 className="text-2xl font-kids font-bold text-brand-ink mb-4">Our Commitment</h2>
          <p className="text-brand-sage font-medium leading-relaxed">
            We serve children and families from all walks of life, many of whom may face their own accessibility challenges. It is especially important to us that every parent, caregiver, and family member can access information about autism therapy, insurance options, and our services without barriers. We are continuously working to improve the accessibility of our website and welcome your feedback.
          </p>
        </motion.div>

        {/* Accessibility Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              id={`accessibility-feature-${index + 1}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="legal-card bg-white rounded-[32px] p-8 border border-brand-teal/5 shadow-sm"
            >
              <div className="legal-feature-icon w-14 h-14 bg-brand-mint/20 rounded-2xl flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-kids font-bold text-brand-ink mb-4">{feature.title}</h3>
              <ul className="space-y-2">
                {feature.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-brand-sage font-medium text-sm">
                    <CheckCircle strokeWidth={1.75} aria-hidden="true" size={14} className="text-brand-teal mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Assistive Tech */}
        <motion.div
          id="supported-assistive-technologies"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="legal-card bg-white rounded-[32px] p-8 border border-brand-teal/5 shadow-sm mb-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <MousePointer strokeWidth={1.75} aria-hidden="true" size={22} className="text-brand-teal" />
            <h2 className="text-2xl font-kids font-bold text-brand-ink">Supported Assistive Technologies</h2>
          </div>
          <p className="text-brand-sage font-medium mb-6">Our website has been tested with the following assistive technologies:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {assistiveTech.map((tech, i) => (
              <div key={i} className="legal-tech bg-brand-mint/10 rounded-2xl px-4 py-3 text-sm font-bold text-brand-teal text-center">
                {tech}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Known Limitations */}
        <motion.div
          id="known-limitations"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="legal-card bg-white rounded-[32px] p-8 border border-brand-teal/5 shadow-sm mb-8"
        >
          <h2 className="text-2xl font-kids font-bold text-brand-ink mb-4">Known Limitations & Ongoing Work</h2>
          <p className="text-brand-sage font-medium leading-relaxed mb-4">
            While we strive for full accessibility, some areas of our website may not yet fully meet all WCAG 2.1 AA criteria. We are actively working to address:
          </p>
          <ul className="space-y-2">
            {[
              "Some embedded third-party map components may have limited screen reader support",
              "Certain PDF documents may not be fully accessible — contact us for alternative formats",
              "Some older video content may lack full captions — we are adding these progressively"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-brand-sage font-medium text-sm">
                <div className="w-2 h-2 rounded-full bg-brand-peach mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Feedback CTA */}
        <motion.div
          id="accessibility-feedback"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="legal-cta bg-brand-ink rounded-[32px] p-10 text-white"
        >
          <h3 className="text-2xl font-kids font-bold mb-4">Accessibility Feedback</h3>
          <p className="text-white/70 mb-6 leading-relaxed">
            We welcome your feedback on our accessibility. If you experience any barriers, please contact us and we will work to resolve the issue promptly and provide the information in an alternative format.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="tel:9457581087" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-3 rounded-2xl transition-all font-bold text-sm">
              <Phone strokeWidth={1.75} aria-hidden="true" size={16} className="text-brand-teal" /> (945) 758-1087
            </a>
            <a href="mailto:admin@auviatherapy.com" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-3 rounded-2xl transition-all font-bold text-sm">
              <Mail strokeWidth={1.75} aria-hidden="true" size={16} className="text-brand-teal" /> admin@auviatherapy.com
            </a>
          </div>
          <p className="text-white/40 text-xs mt-6">This statement was last reviewed and updated on January 1, 2026.</p>
        </motion.div>

        {/* Footer nav */}
        <div className="legal-footnav mt-12 pt-8 border-t border-brand-teal/10 flex flex-wrap gap-4 text-sm font-bold text-brand-sage">
          <Link to="/privacy" className="hover:text-brand-teal transition-colors">Privacy Policy</Link>
          <span className="text-brand-teal/30">·</span>
          <Link to="/terms" className="hover:text-brand-teal transition-colors">Terms of Service</Link>
          <span className="text-brand-teal/30">·</span>
          <Link to="/contact" className="hover:text-brand-teal transition-colors">Contact Us</Link>
        </div>
      </div>
    </div>
  );
};
