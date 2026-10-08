import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  MapPin, Phone, ArrowRight, ShieldCheck,
  Sparkles, Mail, Clock, Calendar, Check, HelpCircle, ChevronDown, Blocks, GraduationCap, Users, Navigation, Heart, Star
} from 'lucide-react';
import { GoogleCenterMap } from '../components/GoogleCenterMap';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { SEO } from '../components/SEO';
import { knownCenters } from '../data/known-centers';
import { centerAddress, centerSlug, normalizeCenter, type CenterRecord } from '../data/centers';
import { REVIEW_MODE } from '../lib/review';
import '../styles/locations.css';


export const LocationDetail = () => {
  const { locationSlug } = useParams<{ locationSlug: string }>();
  const navigate = useNavigate();
  const [center, setCenter] = useState<CenterRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    const fallback = knownCenters.find((item) => centerSlug(item) === locationSlug);
    setCenter(fallback || null);
    setLoading(!fallback && !REVIEW_MODE);
    if (REVIEW_MODE) return () => { active = false; };
    const timeout = window.setTimeout(() => { if (active) setLoading(false); }, 5000);
    const fetchLocation = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'locations'));
        const centers = querySnapshot.docs.map(doc => normalizeCenter(doc.id, doc.data()));

        // Find the center matching the slug (e.g. "irving-tx")
        const matched = centers.find(c => {
          if (!c.city || !c.state) return false;
          const slug = centerSlug(c);
          return slug === locationSlug;
        });

        if (matched && active) {
          setCenter(matched);
        }
      } catch (err) {
        console.error('Error fetching location:', err);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchLocation();
    return () => { active = false; clearTimeout(timeout); };
  }, [locationSlug]);

  const localSchema = useMemo(() => {
    if (!center) return undefined;
    return {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      "name": `Auvia Behavior Centers - ${center.city}`,
      "alternateName": `Auvia Autism Therapy ${center.city}`,
      "description": `Auvia Behavior Centers in ${center.city}, ${center.state} provides high-quality, play-based Applied Behavior Analysis (ABA) and autism therapy for children.`,
      "telephone": center.phone,
      "url": `https://auviatherapy.com/locations/${locationSlug}`,
      "logo": "https://auviatherapy.com/favicon.svg",
      "image": center.image || "https://auviatherapy.com/images/about-kids.jpg",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": center.address,
        "addressLocality": center.city,
        "addressRegion": center.state,
        "postalCode": center.zip,
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": center.lat,
        "longitude": center.lng
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "18:00"
        }
      ],
      "medicalSpecialty": "PediatricBehavioralTherapy",
      "knowsAbout": ["Applied Behavior Analysis", "Autism Therapy", "Early Intervention Programs"]
    };
  }, [center, locationSlug]);

  const faqs = useMemo(() => {
    if (!center) return [];
    return [
      {
        question: `How do I start autism therapy at Auvia in ${center.city}?`,
        answer: `Starting is simple. Click the 'Verify Insurance' button to submit your details. Our clinical intake specialists in ${center.city} will contact your insurance provider, confirm benefits, and guide you through scheduling a comprehensive clinical intake evaluation.`
      },
      {
        question: `What ages do you serve at the ${center.city} sanctuary?`,
        answer: `We specialize in early intervention and serve children diagnosed with autism spectrum disorder (ASD) between the ages of 2 and 6. Our play-based environment is specifically built to support early childhood development.`
      },
      {
        question: `Is the ${center.city} autism clinic in-network with my insurance?`,
        answer: `Our ${center.city} center is in-network with major commercial providers including ${center.insurance || 'Aetna, Cigna, BCBS, and Humana'}. We handle all authorization filings directly so you can focus on your child's care.`
      },
      {
        question: `Do you offer center-based ABA therapy full-time?`,
        answer: `Yes! Our clinical sanctuaries offer both full-time (30-40 hours/week) and part-time (15-20 hours/week) center-based care, tailored to your child's developmental and behavioral assessment results.`
      }
    ];
  }, [center]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-teal border-t-transparent rounded-full animate-spin" />
          <p className="text-brand-sage font-bold text-sm">Loading clinic details...</p>
        </div>
      </div>
    );
  }

  if (!center && locationSlug === 'blaine-mn') return <div className="auvia-location-soon min-h-screen bg-brand-cream px-6 pb-20"><div className="route-title-block max-w-4xl mx-auto"><span aria-hidden="true" className="loc-pin-drop"><i /></span><h1>Blaine, Minnesota</h1><p className="text-brand-sage text-lg mb-8">This location is listed as coming soon. Please contact the Auvia team for current availability and location details.</p><div className="flex flex-wrap gap-4"><Link className="btn-friendly-primary" to="/contact">Ask about Blaine</Link><Link className="btn-friendly-outline" to="/locations">View locations</Link></div></div></div>;
  if (!center) {
    return (
      <div className="auvia-location-soon auvia-location-missing min-h-screen bg-brand-cream flex flex-col items-center justify-center font-sans px-6 text-center">
        <h2 className="text-3xl font-kids font-bold text-brand-ink mb-4">Location Not Found</h2>
        <p className="text-brand-sage max-w-md mb-8">
          The requested clinic landing page does not exist or may have moved.
        </p>
        <Link to="/locations" className="btn-friendly-primary">
          View All Active Centers
        </Link>
      </div>
    );
  }

  return (
    <div className="public-page auvia-location-detail bg-brand-cream min-h-screen font-sans flex flex-col overflow-x-hidden">
      <SEO
        title={`Autism Therapy in ${center.city}, ${center.state} | Auvia Behavior Centers`}
        description={`Auvia Behavior Centers in ${center.city}, ${center.state} provides compassionate, play-based ABA therapy and early intervention programs for children with autism.`}
        keywords={`autism therapy ${center.city}, ABA therapy ${center.city} ${center.state}, autism center ${center.city}, pediatric therapist ${center.city}, early intervention autism`}
        canonicalUrl={`https://auviatherapy.com/locations/${locationSlug}`}
        jsonLd={localSchema}
      />

      {/* BREADCRUMB */}


      {/* HERO SECTION */}
      <section className="pb-16 px-6 lg:px-12 relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="route-title-block">
            <div className="loc-eyebrow inline-flex items-center gap-2 px-3 py-1 bg-brand-mint/30 text-brand-teal rounded-full text-xs font-extrabold uppercase tracking-wider mb-6">
              <Sparkles size={14} /> Clinical Sanctuary
            </div>
            <h1 className="text-4xl md:text-5xl font-kids font-bold text-brand-ink mb-6 leading-tight">
              Autism Therapy & ABA Services in <span className="text-brand-teal italic">{center.city}, {center.state}</span>
            </h1>
      <nav aria-label="Breadcrumb" className="pt-0 pb-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-bold text-brand-sage uppercase tracking-wider">
          <Link to="/" className="hover:text-brand-teal transition-colors">Home</Link>
          <span>/</span>
          <Link to="/locations" className="hover:text-brand-teal transition-colors">Locations</Link>
          <span>/</span>
          <span aria-current="page" className="text-brand-teal">{center.city}</span>
        </div>
      </nav>
            <p className="text-brand-sage text-lg leading-relaxed mb-8 font-medium">
              Welcome to Auvia Behavior Centers in {center.city}. Our state-of-the-art center is a play-based developmental sanctuary built to provide early intervention and clinical excellence for children with autism.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="loc-fact-icon w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-teal shrink-0 border border-gray-100">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-ink text-sm uppercase tracking-wider">Address</h4>
                  <p className="text-gray-600 text-sm mt-0.5">{center.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="loc-fact-icon w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-teal shrink-0 border border-gray-100">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-ink text-sm uppercase tracking-wider">Contact Number</h4>
                  {center.phone ? <a href={`tel:${center.phone.replace(/[^0-9]/g, '')}`} className="text-brand-teal text-sm mt-0.5 font-bold hover:underline">
                    {center.phone}
                  </a> : <Link to="/contact" className="text-brand-teal text-sm">Ask for contact details</Link>}
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="loc-fact-icon w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-teal shrink-0 border border-gray-100">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-ink text-sm uppercase tracking-wider">Hours</h4>
                  <p className="text-gray-600 text-sm mt-0.5">Mon - Fri: 8:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-friendly-primary px-8 py-4 flex items-center gap-2">
                Verify Insurance Coverage <ArrowRight size={18} />
              </Link>
              <a
                href={center.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(centerAddress(center))}` : '/contact'}
                target="_blank"
                rel="noopener noreferrer"
                className="loc-directions px-8 py-4 bg-white hover:bg-gray-50 border border-gray-200 text-brand-ink rounded-[20px] font-bold transition-all flex items-center gap-2 shadow-sm"
              >
                <Navigation size={18} /> Get Directions
              </a>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="loc-hero-media relative">
            <div className="absolute inset-0 bg-brand-teal/5 rounded-[60px] blur-3xl transform rotate-3" />
            <div className="location-image-frame rounded-[28px] overflow-hidden border-[6px] border-white relative z-10 aspect-[4/3]">
              <img
                src={center.image || "/images/about-kids.webp"}
                alt={`Auvia Behavior Centers in ${center.city}`}
                decoding="async" width={800} height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <span aria-hidden="true" className="loc-sticker loc-sticker--pin"><MapPin size={26} strokeWidth={2.25} /></span>
            <span aria-hidden="true" className="loc-sticker loc-sticker--heart"><Heart size={22} strokeWidth={2.25} /></span>
            <span aria-hidden="true" className="loc-sticker loc-sticker--star"><Star size={20} strokeWidth={2.25} /></span>
          </motion.div>
        </div>
      </section>

      {/* CORE HIGHLIGHTS */}
      <section className="loc-why py-20 bg-white border-y border-brand-teal/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-kids font-bold text-brand-ink mb-4">
              Why Choose Our {center.city} Center?
            </h2>
            <p className="text-brand-sage font-medium">
              We design evidence-based therapies around the way children naturally learn—through play, discovery, and positive reinforcement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.00 }} className="loc-why-card p-8 rounded-[32px] bg-brand-cream/50 border border-brand-teal/5 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-sky flex items-center justify-center text-brand-teal">
                <Blocks size={22} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-brand-ink">Play-Based Therapy</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our clinical spaces are set up as play areas, allowing child-led growth that naturally reinforces social and learning skills.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.08 }} className="loc-why-card p-8 rounded-[32px] bg-brand-cream/50 border border-brand-teal/5 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-mint flex items-center justify-center text-brand-teal font-bold text-lg">
                <GraduationCap size={22} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-brand-ink">Dedicated BCBA Team</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Board Certified Behavior Analysts design, monitor, and adapt individual programs, assuring progress tracking on milestones.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.16 }} className="loc-why-card p-8 rounded-[32px] bg-brand-cream/50 border border-brand-teal/5 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-peach/80 flex items-center justify-center text-brand-ink font-bold text-lg">
                <Users size={22} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-brand-ink">Family-Focused Support</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We work directly with parents and families, offering training sessions to extend behavioral success from the center to your home.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* INSURANCE MAP */}
      <section className="loc-insurance py-20 px-6 lg:px-12 bg-gradient-to-br from-brand-sky/10 to-brand-peach/10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-kids font-bold text-brand-ink mb-6">
              In-Network Insurance Support
            </h2>
            <p className="text-brand-sage text-base leading-relaxed mb-8 font-medium">
              We make the insurance verification process easy and stress-free. Our team coordinates directly with your insurance coordinator to confirm your coverage criteria.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {['Blue Cross Blue Shield', 'Aetna', 'Cigna', 'UnitedHealthcare', 'Humana', 'Beacon Health'].map(ins => (
                <div key={ins} className="loc-insurer flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-brand-teal flex items-center justify-center text-white shrink-0">
                    <Check size={12} />
                  </div>
                  <span className="text-brand-ink font-bold text-sm">{ins}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-brand-sage font-medium italic">
              * Accepted plans may vary by location. Submit an inquiry to verify eligibility for your specific plan.
            </p>
          </div>

          <div className="loc-map-frame rounded-3xl overflow-hidden border-4 border-white h-[350px] z-0">
            <GoogleCenterMap name={center.name} address={center.address ? centerAddress(center) : ''} />
            <motion.span aria-hidden="true" className="loc-pin-drop" initial={{ y: -80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.8 }} transition={{ type: 'spring', stiffness: 260, damping: 13, delay: 0.25 }}><i /></motion.span>
          </div>
        </div>
      </section>

      {/* FAQ SECTION (FAQPage Schema compatible) */}
      <section className="loc-faq py-20 bg-white">
        <span aria-hidden="true" className="loc-faq-shape loc-faq-shape--a" />
        <span aria-hidden="true" className="loc-faq-shape loc-faq-shape--b" />
        <span aria-hidden="true" className="loc-faq-mark"><HelpCircle size={40} strokeWidth={2.25} /></span>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-kids font-bold text-brand-ink mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-brand-sage font-medium">
              Common questions from parents about our {center.city} clinic and autism services.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.07 }}
                className="loc-faq-item border border-gray-100 rounded-3xl overflow-hidden transition-all duration-300 bg-brand-cream/20"
              >
                <button
                  id={`location-question-${idx}`} type="button" aria-expanded={activeFaq === idx} aria-controls={`location-answer-${idx}`}
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left outline-none"
                >
                  <span className="text-lg font-bold text-brand-ink">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`text-brand-teal transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`}
                  />
                </button>
                {activeFaq === idx && (
                  <div id={`location-answer-${idx}`} role="region" aria-labelledby={`location-question-${idx}`} className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-gray-50/50 pt-4">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
