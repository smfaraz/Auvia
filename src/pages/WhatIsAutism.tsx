import '../styles/pages.css';
import React, { useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import {
  ChevronDown, ArrowRight, CheckCircle2,
  Users, Activity, ShieldCheck, Heart, Star, Phone, Sparkles, Brain, MessageCircle, Eye, Compass, Stethoscope, Layers, Lightbulb
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } }
};

const reveal = (i = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
});

export const WhatIsAutism = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const spectrumPillars = [
    {
      id: "social-communication",
      title: "Social Communication",
      accent: "& Interaction.",
      content: "Autism involves unique ways of processing and expressing communication. Children may show differences in verbal expression, non-verbal cues, shared attention, or conversational reciprocity.",
      highlight: "Every autistic individual communicates—our role is to understand, support, and expand their natural communication style.",
      bgColor: "lp-band--sky",
      icon: <MessageCircle strokeWidth={1.75} aria-hidden="true" size={34} />,
      items: [
        { title: "Joint Attention & Eye Contact Variations", icon: <Eye strokeWidth={1.75} aria-hidden="true" size={24} /> },
        { title: "Expressive & Receptive Language Patterns", icon: <MessageCircle strokeWidth={1.75} aria-hidden="true" size={24} /> },
        { title: "Social Interaction & Shared Play", icon: <Users strokeWidth={1.75} aria-hidden="true" size={24} /> }
      ]
    },
    {
      id: "sensory-processing",
      title: "Sensory Processing",
      accent: "& Regulation.",
      content: "Autistic individuals often experience sensory inputs—such as sound, light, texture, or motion—with heightened sensitivity (hyper-reactivity) or reduced sensitivity (hypo-reactivity).",
      highlight: "Creating sensory-safe environments allows children to regulate their nervous systems and engage comfortably with learning.",
      bgColor: "lp-band--mint",
      icon: <Activity strokeWidth={1.75} aria-hidden="true" size={34} />,
      items: [
        { title: "Auditory & Visual Sensitivities", icon: <Sparkles strokeWidth={1.75} aria-hidden="true" size={24} /> },
        { title: "Proprioceptive & Vestibular Needs", icon: <Compass strokeWidth={1.75} aria-hidden="true" size={24} /> },
        { title: "Self-Regulation & Calming Strategies", icon: <Heart strokeWidth={1.75} aria-hidden="true" size={24} /> }
      ]
    },
    {
      id: "strengths-levels",
      title: "DSM-5 Support",
      accent: "Levels & Strengths.",
      content: "Under the DSM-5, autism is recognized across three support levels tailored to daily functional needs, while honoring each child's innate strengths and cognitive abilities.",
      bgColor: "lp-band--teal",
      icon: <Layers strokeWidth={1.75} aria-hidden="true" size={34} />,
      goals: [
        "Level 1: Requiring Support for Independent Skills",
        "Level 2: Requiring Substantial Support Across Daily Routines",
        "Level 3: Requiring Very Substantial Support & Specialized Care",
        "Cognitive Strengths: Deep Focus, Visual Memory, & Systemizing"
      ]
    }
  ];

  const faqData = [
    {
      question: "What is Autism Spectrum Disorder (ASD)?",
      answer: "Autism Spectrum Disorder is a neurodevelopmental variation characterized by differences in social communication, sensory processing, and behavioral patterns. It is called a 'spectrum' because each individual presents with a unique combination of strengths, learning styles, and support requirements."
    },
    {
      question: "What are the earliest signs of autism in young children?",
      answer: "Early signs often emerge between 12 and 24 months. Common indicators include inconsistent response to their name, delays in spoken language, reduced pointing or showing objects (joint attention), sensory sensitivities, and repetitive motor movements or intense interest in specific objects."
    },
    {
      question: "How is autism formally diagnosed?",
      answer: "A formal medical diagnosis is conducted by a qualified clinician—such as a developmental pediatrician, child psychologist, or pediatric neurologist. The gold-standard assessment typically includes the ADOS-2 (Autism Diagnostic Observation Schedule) alongside clinical developmental interviews and cognitive evaluations."
    },
    {
      question: "What is the difference between an educational classification and a medical diagnosis?",
      answer: "An educational classification is determined by a school district to qualify a child for special education services (IEP) in the classroom. A medical diagnosis is made by a licensed healthcare provider and is required by commercial health insurance and Medicaid to access specialized medical therapies such as ABA."
    },
    {
      question: "Why is early intervention so important?",
      answer: "During early childhood (ages 18 months to 6 years), the brain exhibits high neuroplasticity. Early, compassionate intervention helps build foundational communication, emotional regulation, and daily living skills that promote lifelong independence and confidence."
    }
  ];

  return (
    <MotionConfig reducedMotion="user">
    <div className="lp inner-public-page public-page bg-brand-cream selection:bg-brand-teal/20 text-brand-ink font-sans overflow-x-hidden">
      <SEO
        title="Understanding Autism Spectrum Disorder (ASD) | Auvia"
        description="A clinical and parent guide to Autism Spectrum Disorder (ASD). Learn about DSM-5 diagnostic criteria, early developmental signs, sensory profiles, and diagnostic evaluation pathways."
        keywords="understanding autism, ASD traits, autism milestones, autism spectrum disorder, DSM-5 autism criteria, ADOS-2 diagnosis, pediatric autism support"
        canonicalUrl="https://auviatherapy.com/what-is-autism"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "name": "Understanding Autism Spectrum Disorder (ASD) & Care",
          "description": "Learn about autism spectrum disorder, common traits, early milestones, and how specialized autism therapy can help your child grow.",
          "author": {
            "@type": "Person",
            "name": "Sarah Jenkins, MS, BCBA-D",
            "jobTitle": "Board Certified Behavior Analyst"
          },
          "lastReviewed": "2026-07-09",
          "reviewedBy": {
            "@type": "Person",
            "name": "Sarah Jenkins, MS, BCBA-D",
            "jobTitle": "Board Certified Behavior Analyst"
          },
          "mainEntity": {
            "@type": "MedicalCondition",
            "name": "Autism Spectrum Disorder",
            "possibleTreatment": [
              {
                "@type": "MedicalTherapy",
                "name": "Applied Behavior Analysis (ABA)"
              }
            ]
          }
        }}
      />

      {/* 1. HERO SECTION */}
      <section className="lp-hero relative px-6 lg:px-12">
        <div className="lp-hero__grid max-w-7xl mx-auto w-full relative z-20 grid lg:grid-cols-[1.15fr_.85fr] gap-10 lg:gap-16">
          <div>
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeInUp} className="route-title-block">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 border border-brand-teal/20 rounded-full text-[11px] font-extrabold text-brand-ink uppercase tracking-wider mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
                  Clinically Reviewed by BCBA-D Specialists
                </div>
                <motion.h1 className="text-display font-kids font-bold text-brand-ink mb-6 leading-[1] tracking-tight">
                  Understanding <span className="lp-squig text-brand-teal italic">Autism.</span>
                </motion.h1>

                <div className="space-y-4 text-small-heading text-brand-ink font-semibold leading-relaxed mb-8">
                  <p>
                    Autism Spectrum Disorder (ASD) is a complex neurodevelopmental profile that encompasses a rich spectrum of communication, social, and sensory experiences.
                  </p>
                  <p className="lp-hero-quote text-brand-teal italic font-bold">
                    "Every child's developmental path is unique, capable, and full of potential."
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-5">
                  <Link to="/contact" className="lp-btn lp-btn--teal group">
                    Find Specialized Care <ArrowRight strokeWidth={1.75} aria-hidden="true" size={22} />
                  </Link>

                  <a href="tel:9457581087" className="lp-phone group">
                    <span className="lp-chip lp-chip--sm">
                      <Phone strokeWidth={1.75} aria-hidden="true" size={20} />
                    </span>
                    <span className="text-lg">(945) 758-1087</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lp-hero__media"
          >
            <span aria-hidden="true" className="lp-flower lp-flower--float" style={{ '--c': 'var(--coral)', '--s': '84px', left: '-34px', bottom: '12%', zIndex: 2 } as React.CSSProperties} />
            <span aria-hidden="true" className="lp-blob" style={{ '--c': 'var(--sky)', width: 64, height: 64, right: -18, top: '10%' } as React.CSSProperties} />
            <span aria-hidden="true" className="lp-ring" style={{ '--c': 'var(--grape)', right: '-20px', top: '-20px', width: 120, height: 120, zIndex: 0 } as React.CSSProperties} />
            <span aria-hidden="true" className="lp-spark" style={{ '--c': 'var(--sun)', '--s': '40px', left: '-6px', top: '6%', zIndex: 2 } as React.CSSProperties} />
            <div className="lp-photo lp-photo--arch lp-sh-sun relative z-[1]">
              <picture>
                <source srcSet="/images/kids-hero.webp" type="image/webp" />
                <img src="/images/kids-hero.jpg" alt="" className="w-full h-full object-cover" decoding="async" />
              </picture>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. THREE CORE PILLARS - Diagnostic Domains */}
      <section className="lp-band lp-band--white lp-scallop" style={{ '--next': 'var(--color-brand-sky)' } as React.CSSProperties}>
        <span aria-hidden="true" className="lp-spark" style={{ '--c': 'var(--coral)', '--s': '34px', left: '6%', top: '64px' } as React.CSSProperties} />
        <span aria-hidden="true" className="lp-spark lp-spark--late" style={{ '--c': 'var(--grape)', '--s': '22px', right: '8%', top: '110px' } as React.CSSProperties} />
        <div className="lp-wrap">
          <motion.div {...reveal()} className="lp-head">
            <h2 className="text-section font-kids font-bold text-brand-ink leading-tight">
              The Three Core <span className="lp-squig text-brand-teal italic">Domains of ASD.</span>
            </h2>
            <p className="lp-lead text-brand-sage">
              Under clinical diagnostic guidelines (DSM-5), autism is evaluated across three interrelated developmental areas.
            </p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="lp-snap lp-tilt lp-count grid md:grid-cols-3 gap-7 lg:gap-8">
            {[
              {
                title: "Social Communication",
                icon: <MessageCircle strokeWidth={1.75} aria-hidden="true" size={40} />,
                desc: "Variations in verbal and non-verbal language, conversational turn-taking, shared attention, and emotional reciprocity.",
                iconBg: "lp-c-sun",
              },
              {
                title: "Sensory Processing",
                icon: <Activity strokeWidth={1.75} aria-hidden="true" size={40} />,
                desc: "Heightened or reduced sensitivity to environmental sounds, textures, lights, and body awareness cues.",
                iconBg: "lp-c-sky",
              },
              {
                title: "Repetitive & Focused Interests",
                icon: <Brain strokeWidth={1.75} aria-hidden="true" size={40} />,
                desc: "Passionate focus on specific topics, preference for predictable routines, and comforting repetitive motor movements.",
                iconBg: "lp-c-grape",
              }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <div className={`lp-block lp-block--lift lp-block--clip ${item.iconBg}`}>
                  <span aria-hidden="true" className="lp-flower" style={{ '--c': '#ffffff', '--s': '150px', right: '-40px', top: '-44px', opacity: 0.45 } as React.CSSProperties} />
                  <span aria-hidden="true" className="lp-num" />
                  <div className="relative z-10">
                    <div className="lp-chip lp-chip--lg mb-6">
                      {React.cloneElement(item.icon, { size: 34 })}
                    </div>

                    <h3 className="lp-h3 font-kids font-bold mb-3 text-brand-ink">
                      {item.title}
                    </h3>
                    <p className="text-base lg:text-lg font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. DEEP DIVE: Clinical Understanding of the Spectrum */}
      <div className="relative">
        {spectrumPillars.map((section, index) => {
          const dark = section.id === 'strengths-levels';
          return (
          <section
            key={section.id}
            className={`lp-band ${section.bgColor} ${dark ? 'lp-on-dark lp-scallop' : index === 1 ? 'lp-wavy' : ''}`}
            style={{ '--next': dark ? 'var(--sun)' : 'var(--color-brand-teal)' } as React.CSSProperties}
          >
            <span aria-hidden="true" className="lp-flower" style={{ '--c': dark ? 'var(--sun)' : index === 0 ? 'var(--sun)' : 'var(--grape)', '--s': '110px', right: index === 1 ? 'auto' : '-30px', left: index === 1 ? '-30px' : 'auto', bottom: '-30px', opacity: dark ? 0.9 : 1 } as React.CSSProperties} />

            <div className="lp-wrap grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: index === 1 ? 28 : -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={index === 1 ? 'lg:order-2' : ''}
              >
                <div className={`lp-chip lp-chip--lg mb-5 ${index === 0 ? 'lp-chip-sun' : index === 1 ? 'lp-chip-coral' : 'lp-chip-sun'}`}>{section.icon}</div>
                <h2 className="text-display font-kids font-bold mb-5 leading-tight text-brand-ink">
                  {section.title} <br />
                  <span className={`lp-accent lp-squig ${dark ? 'text-brand-mint' : 'text-brand-teal'} italic`}>
                    {section.accent}
                  </span>
                </h2>
                <p className={`lp-lead max-w-xl ${dark ? 'text-white' : 'lp-text'}`}>
                  {section.content}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative"
              >
                {section.highlight && (
                  <div className={`lp-quote lp-quote--say ${index === 0 ? 'lp-sh-coral -rotate-1' : 'lp-sh-grape rotate-1'}`}>
                    <p className="text-lg lg:text-xl font-kids font-bold text-brand-ink italic leading-relaxed">
                      "{section.highlight}"
                    </p>
                  </div>
                )}

                {section.items && (
                  <div className={index === 1 ? 'lp-trio space-y-3 sm:space-y-0' : 'space-y-3'}>
                    {section.items.map((item, i) => (
                      <div
                        key={i}
                        className="lp-row lp-row--lift"
                      >
                        <div className={`lp-chip lp-chip--sm ${['lp-chip-sun', 'lp-chip-sky', 'lp-chip-leaf'][i % 3]}`}>
                          {item.icon}
                        </div>
                        <span className="text-base lg:text-lg font-kids font-bold text-brand-ink">{item.title}</span>
                      </div>
                    ))}
                  </div>
                )}

                {section.goals && (
                  <div className="lp-stairs grid grid-cols-1 gap-3">
                    {section.goals.map((goal, i) => (
                      <div key={i} className="lp-row">
                        <span className={`lp-chip lp-chip--sm ${['lp-chip-sun', 'lp-chip-sky', 'lp-chip-coral', 'lp-chip-leaf'][i % 4]}`}>
                          <CheckCircle2 strokeWidth={1.75} aria-hidden="true" size={22} />
                        </span>
                        <span className="text-base lg:text-lg font-bold text-brand-ink">{goal}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </section>
          );
        })}
      </div>

      {/* 4. IDENTIFYING EARLY SIGNS CHECKLIST */}
      <section className="lp-band lp-band--sun lp-wavy" style={{ '--next': 'var(--color-brand-cream)' } as React.CSSProperties}>
        <span aria-hidden="true" className="lp-flower" style={{ '--c': '#ffffff', '--s': '120px', left: '-36px', top: '-36px', opacity: 0.6 } as React.CSSProperties} />
        <span aria-hidden="true" className="lp-spark" style={{ '--c': '#ffffff', '--s': '34px', right: '5%', top: '36px' } as React.CSSProperties} />

        <div className="lp-wrap grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <motion.div {...reveal()} className="lg:col-span-6 space-y-7">
            <div>
              <div className="lp-tag mb-4">
                <Lightbulb strokeWidth={1.75} aria-hidden="true" size={14} /> Developmental Milestones
              </div>
              <h2 className="text-section font-kids font-bold leading-tight text-brand-ink">
                Early Indicators <br />
                <span className="lp-squig text-brand-teal italic">& Developmental Signs.</span>
              </h2>
              <p className="lp-lead text-brand-ink mt-4">
                Recognizing developmental differences between ages 18 months and 3 years is the most critical window for early intervention.
              </p>
            </div>

            <div className="lp-duo grid sm:grid-cols-2 gap-3">
              {[
                { text: "Speech & Language Delays", delay: 0 },
                { text: "Repetitive Body Movements", delay: 0.5 },
                { text: "Differences in Eye Contact", delay: 1.2 },
                { text: "Sensory Sensitivities", delay: 0.8 },
                { text: "Inconsistent Response to Name", delay: 1.5 },
                { text: "Strong Preference for Routines", delay: 0.3 }
              ].map((item, i) => (
                <div
                  key={i}
                  className="lp-row"
                >
                  <CheckCircle2 strokeWidth={2} aria-hidden="true" className="lp-check" size={22} />
                  <span className="font-bold text-sm lg:text-base leading-tight">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...reveal(1)} className="lg:col-span-6 relative pb-8">
            <span aria-hidden="true" className="lp-ring" style={{ '--c': '#ffffff', left: '-22px', top: '-22px', width: 110, height: 110 } as React.CSSProperties} />
            <div className="lp-photo lp-photo--tiltl lp-sh-coral">
              <picture>
                <source srcSet="/images/autism-therapy.webp" type="image/webp" />
                <img
                  src="/images/autism-therapy.webp"
                  alt="Developmental assessment and support"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>

            <div className="lp-sticker lp-c-white bottom-0 right-2 lg:-right-2 -rotate-2 text-base lg:text-lg">
              Early Intervention Matters <Heart strokeWidth={1.75} aria-hidden="true" fill="currentColor" size={20} className="text-[#f25a34]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. THE PATH TO DIAGNOSIS */}
      <section className="lp-band lp-band--cream">
        <div className="lp-wrap grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.div initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
              <div className="lp-tag lp-c-sky mb-5">
                <Stethoscope strokeWidth={1.75} aria-hidden="true" size={16} /> Diagnostic Navigation
              </div>
              <h2 className="text-section font-kids font-bold text-brand-ink mb-6 leading-tight">
                Navigating the Path to <br /><span className="lp-squig text-brand-teal italic">a Formal Evaluation.</span>
              </h2>
              <p className="lp-lead text-brand-sage max-w-2xl">
            A deep-dive into the science, signs, and strengths of Autism Spectrum Disorder — written for families, by clinicians.
          </p>
          <p className="text-sm text-brand-sage font-medium mt-4 mb-6 max-w-2xl italic">
            A note on language: This page uses person-first language (e.g., "child with autism") as a clinical default, following guidance from the American Academy of Pediatrics (AAP, 2025). We also respect identity-first language (e.g., "autistic child"), preferred by many in the autistic community. We honor each family's individual preference.
          </p>
              <div className="space-y-6 text-lg text-brand-sage font-medium leading-relaxed">
                <p>
                  Obtaining a formal clinical diagnosis from a licensed developmental pediatrician or clinical psychologist is the key that unlocks in-network insurance coverage for Applied Behavior Analysis.
                </p>
                <div className="lp-block lp-c-peach lp-sh-sun">
                  <span className="lp-chip lp-chip--sm lp-chip-coral absolute -top-5 right-5">
                    <Sparkles strokeWidth={1.75} aria-hidden="true" size={22} />
                  </span>
                  <p className="font-bold mb-2 italic text-lg">
                    "You don't have to navigate diagnostic waitlists alone."
                  </p>
                  <p className="text-sm">
                    Our care coordination team connects your family directly with credentialed diagnostic providers, streamlining the referral and assessment process.
                  </p>
                </div>
                <p>
                  Standardized evaluation tools such as the ADOS-2 (Autism Diagnostic Observation Schedule, Second Edition) are frequently utilized by developmental clinicians during comprehensive diagnostic evaluations.
                </p>
              </div>

              <div className="mt-9">
                <Link to="/contact" className="lp-btn lp-btn--teal group">
                  Connect with Our Care Team <ArrowRight strokeWidth={1.75} aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div {...reveal(1)} className="lp-photo--sm relative max-w-xl mx-auto w-full">
            <span aria-hidden="true" className="lp-spark" style={{ '--c': 'var(--coral)', '--s': '38px', right: '2%', top: '-14px', zIndex: 2 } as React.CSSProperties} />
            <span aria-hidden="true" className="lp-flower lp-flower--float" style={{ '--c': 'var(--sun)', '--s': '96px', right: '-28px', bottom: '-34px', zIndex: 2 } as React.CSSProperties} />
            <div className="lp-photo lp-photo--blob lp-sh-grape">
              <picture>
                <source srcSet="/images/kids-diagnosis.webp" type="image/webp" />
                <img
                  src="/images/kids-diagnosis.webp"
                  alt="Clinical assessment support and guidance"
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
            <div className="lp-sticker lp-c-white top-6 left-3 lg:-left-6 -rotate-3 max-w-[220px]">
              <p className="text-brand-teal font-kids font-bold text-base leading-tight">Clinical Diagnostic Referral Network</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. CLINICAL FAQ */}
      <section className="lp-band lp-band--lav lp-scallop" style={{ '--next': 'var(--color-brand-cream)' } as React.CSSProperties}>
        <span aria-hidden="true" className="lp-flower lp-flower--float" style={{ '--c': 'var(--sun)', '--s': '90px', right: '-24px', top: '40px' } as React.CSSProperties} />
        <span aria-hidden="true" className="lp-spark" style={{ '--c': 'var(--coral)', '--s': '32px', left: '5%', top: '56px' } as React.CSSProperties} />
        <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2 {...reveal()} className="text-section font-kids font-bold text-brand-ink mb-10 text-center">
          Autism Guidance: <span className="text-brand-teal">Frequently Asked Questions.</span>
        </motion.h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="lp-faq">
              <h3 className="m-0"><button
                type="button" id={`whatisautism-question-${index}`} aria-expanded={openFAQ === index} aria-controls={`whatisautism-answer-${index}`} onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full flex items-center justify-between text-left font-bold font-kids transition-colors"
              >
                {faq.question}
                <motion.div animate={{ rotate: openFAQ === index ? 180 : 0 }} className="text-brand-ink shrink-0 ml-2">
                  <ChevronDown strokeWidth={2} aria-hidden="true" size={26} />
                </motion.div>
              </button></h3>
              <div id={`whatisautism-answer-${index}`} role="region" aria-labelledby={`whatisautism-question-${index}`} hidden={openFAQ !== index}>
<AnimatePresence>
                {openFAQ === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    <div className="lp-faq__body">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
</div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION */}
      <section className="pt-16 lg:pt-20 pb-6 px-5 lg:px-12 max-w-6xl mx-auto text-center">
        <motion.div {...reveal()} className="lp-cta lp-c-teal">
          <span aria-hidden="true" className="lp-flower" style={{ '--c': 'var(--sun)', '--s': '110px', left: '-28px', top: '-28px' } as React.CSSProperties} />
          <span aria-hidden="true" className="lp-flower lp-flower--float" style={{ '--c': 'var(--coral)', '--s': '72px', right: '5%', bottom: '-18px' } as React.CSSProperties} />
          <h2 className="text-display font-kids font-bold mb-5 relative z-10 leading-tight">
            Every Milestone Begins with a Step.
          </h2>
          <p className="lp-lead mb-8 max-w-2xl mx-auto relative z-10">
            Whether your child has a formal diagnosis or you are exploring early signs, our compassionate clinicians are here to support your family.
          </p>
          <Link to="/contact" className="lp-btn lp-btn--lg relative z-10">
            Schedule a Consultation
          </Link>
        </motion.div>
      </section>

      {/* 8. CLINICAL REFERENCES & BIBLIOGRAPHY */}
      <section className="lp-refs max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <div className="lp-chip lp-chip--sm lp-chip-sun">
            <Users strokeWidth={1.75} aria-hidden="true" size={18} />
          </div>
          <span className="text-brand-teal text-xs font-bold uppercase tracking-widest">Clinical References</span>
        </div>
        <h3 className="text-2xl font-kids font-bold text-brand-ink mb-4">Scientific & Clinical Consensus</h3>
        <p className="text-brand-sage text-sm mb-6 font-medium">
          Auvia Behavior Centers adheres to the diagnostic consensus established by the American Academy of Pediatrics (AAP), the CDC, and the American Psychiatric Association DSM-5-TR.
        </p>
        <ul className="space-y-3 text-xs font-medium list-decimal pl-5 leading-relaxed">
          <li>
            American Psychiatric Association. <strong>"Diagnostic and Statistical Manual of Mental Disorders (DSM-5-TR)."</strong> Autism Spectrum Disorder Diagnostic Criteria.
          </li>
          <li>
            Centers for Disease Control and Prevention (CDC). <strong>"Developmental Milestones and Screening."</strong> National Center on Birth Defects and Developmental Disabilities.
          </li>
          <li>
            American Academy of Pediatrics (AAP). <strong>"Identification, Evaluation, and Management of Children with Autism Spectrum Disorder."</strong> Pediatrics (2020).
          </li>
        </ul>
      </section>

    </div>
    </MotionConfig>
  );
};
