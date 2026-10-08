import '../styles/pages.css';
import React, { useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import {
  ArrowRight, CheckCircle2, Sparkles, Home, Heart,
  ShieldCheck, Zap, Smile, BookOpen, Brain,
  Users, Target, Award, Star, MessageCircle, Utensils, Baby, Compass
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MagicMascot } from '../components/MagicMascot';
import { SEO } from '../components/SEO';

const Mark = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.span
    className={`bp-mark ${className}`}
    initial={{ backgroundSize: '0% 0.34em' }}
    whileInView={{ backgroundSize: '100% 0.34em' }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
  >
    {children}
  </motion.span>
);

const ribbonIcons = [Compass, Star, Home, Heart, Users, Sparkles, Utensils, Smile, BookOpen, Baby];

export const Services = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
const pillars = [
    {
      title: "Evidence-Based",
      description: "ABA is widely recognized as a leading evidence-based therapy for autism, backed by decades of peer-reviewed clinical research and medical consensus.",
      icon: <Target strokeWidth={1.75} aria-hidden="true" className="text-brand-teal" size={32} />,
      details: ["Peer-reviewed methodology", "Scientifically supported outcomes", "Assent-based clinical care"]
    },
    {
      title: "Data-Driven Precision",
      description: "Every therapy session is tracked, measured, and analyzed by BCBAs to ensure consistent, measurable progress.",
      icon: <Brain strokeWidth={1.75} aria-hidden="true" className="text-brand-teal" size={32} />,
      details: ["Real-time session data", "Individualized milestone tracking", "Dynamic protocol adjustments"]
    },
    {
      title: "Compassionate & Child-Centered",
      description: "We prioritize each child's emotional well-being, dignity, and autonomy, ensuring every interaction is rooted in empathy and joy.",
      icon: <Heart strokeWidth={1.75} aria-hidden="true" className="text-brand-teal" size={32} />,
      details: ["Trauma-informed practices", "Play-based Natural Environment Teaching", "Sensory-safe learning suites"]
    }
  ];
  const services = [
    {
      title: "In-Clinic ABA Therapy",
      age: "Ages 18 Months – 10 Years",
      tagline: "The Clinical Sanctuary",
      description: "Our purpose-built clinical centers offer a dedicated sanctuary for full-time and part-time one-on-one therapy. Through structured play, individualized learning suites, and peer interaction, we help children build foundational communication, social, and school-readiness skills.",
      features: [
        "1-on-1 Dedicated RBT & BCBA Care",
        "Functional Communication Training (FCT)",
        "Socialization & Peer Interaction",
        "Sensory-Friendly Gross Motor Gyms"
      ],
      image: "/images/aba-therapy-session.webp",
      color: "bg-brand-mint/20",
      icon: <Compass strokeWidth={1.75} aria-hidden="true" className="text-brand-teal" size={24} />
    },
    {
      title: "In-Home ABA Therapy",
      age: "Ages 18 Months – 14 Years",
      tagline: "Natural Environment Teaching (NET)",
      description: "Therapy delivered in the comfort of your home and local community. Our clinical team works directly within your family's daily routines—such as morning preparation, mealtime, and play—ensuring skills generalize seamlessly to real-life settings.",
      features: [
        "Daily Living Skills & Independence",
        "Home Routine Generalization",
        "Natural Environment Teaching (NET)",
        "Adaptive Skill Acquisition & Regulation"
      ],
      image: "/images/kids-Therapy.webp",
      color: "bg-[#fff3cd]/40",
      icon: <Home strokeWidth={1.75} aria-hidden="true" className="text-brand-teal" size={24} />
    },
    {
      title: "Social Skills Groups & Peer Modeling",
      age: "Ages 3 – 12 Years",
      tagline: "Peer Connection & Collaboration",
      description: "Structured small-group sessions designed to help children learn positive social engagement, conversational turn-taking, cooperative play, and peer empathy in a safe, guided setting.",
      features: [
        "Conversational Reciprocity",
        "Shared Attention & Cooperative Play",
        "Perspective-Taking & Empathy",
        "Confidence in Group Settings"
      ],
      image: "/images/about-kids.webp",
      color: "bg-brand-sky",
      icon: <Users strokeWidth={1.75} aria-hidden="true" className="text-brand-teal" size={24} />
    },
    {
      title: "Adaptive Daily Living & Feeding Programs",
      age: "Early Childhood to Adolescence",
      tagline: "Functional Independence",
      description: "Targeted ABA interventions that empower children to master vital daily routines—including potty training, self-feeding, dressing, hygiene, and bedtime routines tailored to their individual readiness.",
      features: [
        "Individualized Potty Training Protocols",
        "Food Selectivity & Feeding Interventions",
        "Morning & Bedtime Routine Mastery",
        "Self-Care & Personal Hygiene"
      ],
      image: "/images/kids-aba.webp",
      color: "bg-brand-lavender",
      icon: <Utensils strokeWidth={1.75} aria-hidden="true" className="text-brand-teal" size={24} />
    },
    {
      title: "Caregiver Training & Family Empowerment",
      age: "All Caregivers & Family Members",
      tagline: "Collaborative Partnership",
      description: "Helping children succeed is a collaborative effort. Our BCBAs provide structured one-on-one caregiver coaching, equipping parents with proven behavioral strategies to reinforce progress across home and community environments.",
      features: [
        "1-on-1 BCBA Parent Consultations",
        "Positive Behavior Support Strategies",
        "Home Milestone Tracking",
        "Transition & IEP Coordination Support"
      ],
      image: "/images/kids-diagnosis.webp",
      color: "bg-brand-peach/30",
      icon: <Heart strokeWidth={1.75} aria-hidden="true" className="text-brand-peach" size={24} />
    }
  ];

  const abaCorePillars = [
    {
      icon: <Target strokeWidth={1.75} aria-hidden="true" className="text-brand-teal" />,
      title: "Evidence-Based",
      text: "ABA is a leading evidence-based approach to autism therapy, supported by decades of scientific research."
    },
    {
      icon: <Brain strokeWidth={1.75} aria-hidden="true" className="text-brand-teal" />,
      title: "Data-Driven",
      text: "Every session is tracked and analyzed to ensure your child is making measurable progress."
    },
    {
      icon: <Heart strokeWidth={1.75} aria-hidden="true" className="text-brand-teal" />,
      title: "Compassionate",
      text: "We prioritize the child's emotional well-being and dignity in every interaction."
    }
  ];

  return (
    <MotionConfig reducedMotion="user">
    <div className="inner-public-page public-page bg-brand-cream min-h-screen relative overflow-x-hidden">
      <SEO
        title="Our Services | ABA Therapy & In-Home Care"
        description="Auvia Behavior Centers offers comprehensive center-based ABA therapy and in-home autism care. Evidence-based, data-driven, and compassionate treatment."
        keywords="ABA therapy services, in-home ABA therapy, center-based autism care, autism treatment programs, BCBA supervision"
        canonicalUrl="https://auviatherapy.com/services"
      />

      {/* 1. HERO SECTION: colour band with a shaped photo */}
      <section className="svc-hero relative pt-28 lg:pt-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full grid lg:grid-cols-[1.1fr_.9fr] gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="route-title-block max-w-4xl"
        >
          <h1 className="text-display font-kids font-bold text-brand-ink mb-6 lg:mb-8 leading-[0.95] tracking-tighter text-center lg:text-left">
            A New Standard <br className="hidden lg:block" />
            <Mark className="text-brand-teal italic">in Autism Care.</Mark>
          </h1>

          <p className="svc-hero__lead text-body-main font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0 text-center lg:text-left mb-6">
            We move beyond traditional therapy. By combining clinical precision with a nurturing environment, we empower children to communicate, connect, and thrive.
          </p>
          <div className="svc-hero__note p-4 rounded-2xl font-bold text-sm max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            We will connect you with resources to have your child evaluated and receive a formal diagnosis report.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="svc-hero__media"
          aria-hidden="true"
        >
          <span className="svc-hero__ring" />
          <img className="svc-hero__photo" src="/images/autism-therapy.webp" alt="" decoding="async" />
          <span className="svc-hero__sticker"><img src="/images/kids-aba.webp" alt="" decoding="async" /></span>
          <span className="svc-hero__chip"><Sparkles strokeWidth={2} aria-hidden="true" size={22} /></span>
          <span className="svc-hero__chip svc-hero__chip--heart"><Heart strokeWidth={2} aria-hidden="true" size={20} /></span>
          <span className="svc-hero__star"><Star strokeWidth={2} aria-hidden="true" size={30} /></span>
        </motion.div>
      </div>
    </section>

      {/* Decorative icon ribbon between the hero and the programs */}
      <div className="svc-ribbon" aria-hidden="true">
        <div className="svc-ribbon__track">
          {[0, 1, 2, 3, 4, 5].map(set => (
            <div key={set} className="svc-ribbon__set">
              {ribbonIcons.map((Icon, i) => (
                <span key={i} className={`svc-ribbon__item svc-ribbon__item--${i % 5}`}>
                  <Icon strokeWidth={2} aria-hidden="true" size={20} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 2. CORE SERVICES: Rich Interactive Cards */}
      <section className="svc-programs py-12 lg:py-16 px-4 sm:px-6 lg:px-12 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="svc-programs__grid grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-x-10 lg:gap-y-14">
            {services.map((service, idx) => {
              const stacked = idx === 1 || idx === 2;
              return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`svc-program svc-program--${idx % 5} flex flex-col gap-6 items-center ${stacked ? 'svc-program--stack lg:gap-8' : `svc-program--wide lg:col-span-2 lg:gap-16 ${idx === 3 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}`}
              >
                <span className="svc-program__num" aria-hidden="true">0{idx + 1}</span>
                <div className={`svc-program__body w-full text-left ${stacked ? '' : 'lg:w-1/2'}`}>
                  <div className="svc-program__age inline-flex items-center gap-3 px-5 lg:px-6 py-2.5 rounded-full text-[11px] lg:text-xs font-bold font-kids mb-5 lg:mb-6 tracking-widest">
                    {service.icon}
                    {service.age}
                  </div>
                  <h2 className="text-section font-kids font-bold text-brand-ink mb-4 lg:mb-5 leading-tight">
                    {service.title}
                  </h2>
                  <p className="svc-program__text text-body-main mb-5 lg:mb-8 leading-relaxed font-medium">
                    {service.description}
                  </p>

                  <div className="svc-features grid grid-cols-2 gap-2 sm:gap-3 mb-6 lg:mb-9 text-left">
                    {service.features.map(f => (
                      <div key={f} className="svc-feature flex items-center gap-3 text-sm font-bold text-brand-ink font-kids">
                        <div className="svc-feature__tick w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                          <CheckCircle2 strokeWidth={2.25} aria-hidden="true" size={16} />
                        </div>
                        {f}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row flex-wrap gap-4 lg:gap-7 items-center justify-center sm:justify-start">
                    <button
                      onClick={() => navigate('/contact')}
                      className="w-full sm:w-auto bg-brand-ink text-white px-8 lg:px-9 py-3.5 font-kids font-bold text-base lg:text-lg hover:bg-brand-teal flex items-center justify-center gap-3"
                    >
                      Enroll Now <ArrowRight strokeWidth={2} aria-hidden="true" size={20} />
                    </button>
                    <div className="svc-program__badge flex items-center gap-2 font-bold text-[11px] lg:text-xs uppercase tracking-widest">
                      <ShieldCheck strokeWidth={2} aria-hidden="true" size={18} />
                      Insurance Validated
                    </div>
                  </div>
                </div>

                <div className={`svc-program__media w-full relative order-first ${stacked ? '' : 'lg:w-1/2 lg:order-none'}`}>
                  <div className="svc-program__photo relative z-10">
                    <img loading="lazy" decoding="async"
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="svc-program__flower" aria-hidden="true" />
                </div>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. DEEP DIVE: Understanding ABA Therapy */}
      <section className="svc-focus py-14 lg:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* HEADER AREA */}
        <div className="grid lg:grid-cols-2 gap-5 lg:gap-16 items-center lg:items-end mb-10 lg:mb-12 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <span className="svc-focus__eyebrow text-xs lg:text-sm font-bold uppercase tracking-[0.2em] font-kids mb-3 lg:mb-4 block">
              The Auvia Standard
            </span>
            <h2 className="text-display font-kids font-bold text-brand-ink leading-tight">
              Our Clinical <br className="hidden lg:block" />
              <Mark className="text-brand-teal italic">Focus.</Mark>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="svc-focus__lead text-lg lg:text-xl font-medium leading-relaxed max-w-lg mx-auto lg:mx-0"
          >
            We combine rigorous behavioral science with a compassionate approach to help children reach their fullest potential.
          </motion.p>
        </div>

        {/* PILLARS GRID */}
        <div className="svc-pillars grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className={`svc-pillar svc-pillar--${idx} rounded-[28px] p-7 lg:p-9 flex flex-col h-full`}
            >
              <div className="svc-pillar__icon w-14 h-14 rounded-full flex items-center justify-center mb-5 lg:mb-6">
                {React.cloneElement(pillar.icon as React.ReactElement, { size: 24 })}
              </div>

              <h3 className="text-small-heading font-kids font-bold text-brand-ink mb-3 lg:mb-4">{pillar.title}</h3>
              <p className="svc-pillar__text text-base font-medium mb-5 leading-relaxed">{pillar.description}</p>

              <div className="svc-pillar__list space-y-3 mb-6 flex-grow text-left">
                {pillar.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-3 text-xs lg:text-sm font-bold text-brand-ink/80 font-kids">
                    <CheckCircle2 strokeWidth={1.75} aria-hidden="true" size={16} className="text-brand-teal shrink-0" />
                    {detail}
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/what-is-aba')}
                className="svc-pillar__more mt-auto self-start flex items-center gap-2 font-bold font-kids group/btn"
              >
                Learn More <ArrowRight strokeWidth={1.75} aria-hidden="true" size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <span className="svc-focus__flower" aria-hidden="true" />
    </section>

      {/* 4. CLINICAL INTEGRITY: Large Quote Section */}
      <section className="svc-quote py-14 lg:py-20 px-6 lg:px-12 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <div className="svc-quote__bubble">
            <span className="svc-quote__star"><Star strokeWidth={2} aria-hidden="true" size={26} /></span>
            <span className="svc-quote__chat" aria-hidden="true"><MessageCircle strokeWidth={2} size={22} /></span>
            <h3 className="svc-quote__text font-kids font-bold text-brand-ink italic">
              "At Auvia, we don't just treat symptoms. We build foundations for a lifetime of independence, connection, and joy."
            </h3>
          </div>
          <div className="svc-quote__by inline-flex flex-row items-center gap-3 sm:gap-4">
            {/* Clinical Professional Image */}
            <picture>
              <source srcSet="/images/kids-team.webp" type="image/webp" />
              <img
                 src="/images/kids-team.webp"
                 alt="Clinical Director"
                 className="w-14 h-14 lg:w-16 lg:h-16 rounded-full object-cover shrink-0"
                 loading="lazy"
                 decoding="async"
              />
            </picture>
            <div className="text-left">
              <p className="font-bold text-brand-ink font-kids">Clinical Leadership Team</p>
              <p className="svc-quote__role text-[11px] lg:text-sm font-bold tracking-widest uppercase">Board Certified Behavior Analysts (BCBA / BCBA-D)</p>
            </div>
          </div>
        </motion.div>
        <span className="svc-quote__flower" aria-hidden="true" />
      </section>
    </div>
    </MotionConfig>
  );
};
