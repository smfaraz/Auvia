import '../styles/pages.css';
import React, { useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import {
  ChevronDown, ArrowRight, CheckCircle2,
  FlaskConical, Sparkles, Heart, Brain,
  Zap, Microscope, Activity, UserCheck, ShieldCheck,
  Layers, Search, Share2, Target, Settings, BookOpen, Compass,
  BookText, ShieldAlert, Baby, Smile, Users, Star,Bath,Users2,
  Speech,Utensils,Shirt,
  MessageCircle, Sunrise, Layout, Clock, Home
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } }
};

const reveal = (i = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
});

export const WhatIsABA = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  return (
    <MotionConfig reducedMotion="user">
    <div className="lp inner-public-page public-page bg-brand-cream selection:bg-brand-teal/20 text-brand-ink font-sans overflow-x-hidden">
      <SEO
        title="Applied Behavior Analysis (ABA) Autism Therapy Guide"
        description="Discover how Applied Behavior Analysis (ABA) works at Auvia. Explore our individualized, evidence-based autism therapy programs for children."
        keywords="autism therapy ABA, what is ABA therapy, applied behavior analysis, evidence-based autism therapy, pediatric ABA, positive behavior supports"
        canonicalUrl="https://auviatherapy.com/what-is-aba"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "name": "Applied Behavior Analysis (ABA) Autism Therapy Guide",
          "description": "Discover how Applied Behavior Analysis (ABA) works at Auvia. Explore our individualized, evidence-based autism therapy programs for children.",
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
            "@type": "MedicalTherapy",
            "name": "Applied Behavior Analysis",
            "adverseEffects": "None",
            "indication": {
              "@type": "MedicalIndication",
              "name": "Autism Spectrum Disorder"
            }
          }
        }}
      />

      {/* 1. HERO: The Science of Behavior */}
      <section className="lp-hero relative px-6 lg:px-12">
        <div className="lp-hero__grid max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_.9fr] gap-10 lg:gap-16 relative z-10 text-left">

          <motion.div className="route-title-block" initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2 bg-brand-sky text-brand-teal rounded-full text-xs md:text-sm font-bold uppercase tracking-widest mb-4 border border-brand-teal/10">
               <Microscope strokeWidth={1.75} aria-hidden="true" size={16} /> Science-Based Intervention
            </motion.div>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 border border-brand-teal/20 rounded-full text-[11px] font-extrabold text-brand-ink uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
              Medically Reviewed by Sarah Jenkins, MS, BCBA-D
            </div>

            <motion.h1 variants={fadeInUp} className="text-display font-kids font-bold text-brand-ink leading-[0.9] tracking-tight">
              What is <br /><span className="lp-squig text-brand-teal italic">ABA Therapy?</span>
            </motion.h1>

            <motion.div variants={fadeInUp} className="space-y-4 text-body-main lp-text font-medium leading-relaxed max-w-xl mb-8">
              <p>
                Applied Behavior Analysis (ABA) is the gold-standard, evidence-based scientific discipline focused on understanding and improving meaningful human behaviors.
              </p>
              <p>
                Rooted in over 50 years of clinical research, our play-based ABA programs help children build essential milestones in functional communication, social connection, emotional regulation, and adaptive daily living skills.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row flex-wrap gap-4 lg:gap-5 justify-start">
              <Link to="/contact" className="lp-btn lp-btn--teal group">
                Find ABA Care <ArrowRight strokeWidth={1.75} aria-hidden="true" />
              </Link>
              <a href="tel:9457581087" className="lp-btn lp-btn--white">
                <ShieldCheck strokeWidth={1.75} aria-hidden="true" size={20} className="text-brand-teal" /> Insurance Verification
              </a>
            </motion.div>
          </motion.div>

          {/* High-End Visual with Signature Badge */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="lp-hero__media pb-10"
          >
            <span aria-hidden="true" className="lp-flower lp-flower--float" style={{ '--c': 'var(--grape)', '--s': '80px', left: '-30px', top: '14%', zIndex: 2 } as React.CSSProperties} />
            <span aria-hidden="true" className="lp-ring" style={{ '--c': 'var(--coral)', right: '-20px', top: '-20px', width: 120, height: 120, zIndex: 0 } as React.CSSProperties} />
            <span aria-hidden="true" className="lp-spark" style={{ '--c': 'var(--sun)', '--s': '38px', right: '2%', top: '30%', zIndex: 2 } as React.CSSProperties} />
            <div className="lp-photo lp-photo--arch lp-sh-coral relative z-[1]">
              <picture>
                <source srcSet="/images/kids-aba.webp" type="image/webp" />
                <img src="/images/kids-aba.webp" alt="ABA therapy engagement" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </picture>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0, rotate: 0 }}
              animate={{ y: 0, opacity: 1, rotate: 4 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="lp-sticker lp-c-sun bottom-0 right-0 lg:-right-4 max-w-[250px]"
            >
               <p className="font-kids font-bold text-base lg:text-lg italic leading-tight text-center">
                 "Science that prioritizes your child's joy."
               </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. THE AUVIA MODEL: The Foundation */}
      <section className="lp-band lp-band--white lp-scallop" style={{ '--next': 'var(--color-brand-sky)' } as React.CSSProperties}>
        <span aria-hidden="true" className="lp-spark" style={{ '--c': 'var(--coral)', '--s': '32px', left: '7%', top: '60px' } as React.CSSProperties} />
        <span aria-hidden="true" className="lp-spark lp-spark--late" style={{ '--c': 'var(--grape)', '--s': '22px', right: '9%', top: '104px' } as React.CSSProperties} />
        <div className="lp-wrap">
          <motion.div {...reveal()} className="lp-head">
            <h2 className="text-section font-kids font-bold text-brand-ink">How ABA <span className="lp-squig text-brand-teal italic">Works.</span></h2>
            <p className="lp-lead text-brand-sage">ABA looks at how the environment affects a person's behavior using the "ABC" model:</p>
          </motion.div>

          <div className="lp-flow grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
            {[
              { letter: "A", title: "Antecedent", desc: "What happens directly before a behavior occurs.", color: "lp-c-sun" },
              { letter: "B", title: "Behavior", desc: "The action or response that follows the antecedent.", color: "lp-c-sky" },
              { letter: "C", title: "Consequence", desc: "What happens directly after the behavior, often using reinforcement.", color: "lp-c-grape" }
            ].map((item, i) => (
              <motion.div key={i} {...reveal(i)}>
                <div className={`lp-block lp-block--lift lp-block--clip ${item.color} text-center`}>
                  <span aria-hidden="true" className="lp-flower" style={{ '--c': '#ffffff', '--s': '130px', right: '-36px', top: '-36px', opacity: 0.45 } as React.CSSProperties} />
                  <div className="lp-chip lp-chip--xl relative mx-auto mb-5">
                     <span className="lp-letter text-brand-teal">{item.letter}</span>
                  </div>
                  <h3 className="lp-h3 relative font-kids font-bold mb-3">{item.title}</h3>
                  <p className="relative text-base lg:text-lg font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* 3. NEW SECTION: 7 Dimensions of ABA */}
      <section className="lp-band lp-band--sky lp-wavy" style={{ '--next': '#fff' } as React.CSSProperties}>
        <span aria-hidden="true" className="lp-flower" style={{ '--c': 'var(--sun)', '--s': '120px', right: '-34px', top: '-34px' } as React.CSSProperties} />
        <span aria-hidden="true" className="lp-spark" style={{ '--c': '#ffffff', '--s': '34px', left: '6%', top: '70px' } as React.CSSProperties} />
        <div className="lp-wrap">
          <motion.div {...reveal()} className="lp-head">
            <h2 className="text-section font-kids font-bold text-brand-ink">7 Dimensions <br /><span className="lp-squig text-brand-teal italic">of ABA.</span></h2>
            <p className="lp-lead lp-text">
              ABA therapy focuses on seven key concepts that ensure support is based on solid research and effective treatment.
            </p>
          </motion.div>

          {/* Detailed Generalization Focus Card */}
          <motion.div {...reveal()} className="mb-10">
            <div className="lp-block lp-c-white lp-sh-coral flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-center lg:!p-10">
              <div className="lg:w-1/3">
                <div className="lp-chip lp-chip--lg lp-chip--sq lp-chip-sun mb-5">
                  <Share2 strokeWidth={1.75} aria-hidden="true" size={34} />
                </div>
                <h3 className="text-section font-kids font-bold mb-4">Generalization</h3>
                <div className="lp-tag lp-c-sun">Dimension 01</div>
              </div>
              <div className="lg:w-2/3 space-y-4 text-lg font-medium leading-relaxed">
                <p>The generalization concept involves children using what they learn during ABA sessions in various settings and situations.</p>
                <p>When children learn to generalize, therapists run various simulations to see how new skills help when interacting with diverse people, in different settings, and during specific times.</p>
                <p className="p-5 bg-brand-mint rounded-3xl border-l-8 border-brand-teal text-brand-ink font-bold">"Understanding generalization helps children with autism become more successful in their daily lives."</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="lp-snap lp-tilt grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {[
              { num: "02", title: "Effective", icon: <Target strokeWidth={1.75} aria-hidden="true" />, desc: "Focuses on interventions that produce meaningful changes in a child's life." },
              { num: "03", title: "Technological", icon: <Settings strokeWidth={1.75} aria-hidden="true" />, desc: "Procedures are described clearly enough for anyone to replicate them accurately." },
              { num: "04", title: "Applied", icon: <UserCheck strokeWidth={1.75} aria-hidden="true" />, desc: "Addresses behaviors that are socially significant and important to the family." },
              { num: "05", title: "Conceptually Systematic", icon: <BookOpen strokeWidth={1.75} aria-hidden="true" />, desc: "Interventions are consistent with established behavioral principles." },
              { num: "06", title: "Analytic", icon: <Search strokeWidth={1.75} aria-hidden="true" />, desc: "Data is used to make decisions and prove that an intervention is working." },
              { num: "07", title: "Behavioral", icon: <Activity strokeWidth={1.75} aria-hidden="true" />, desc: "Focuses on measurable, observable actions that need improvement." }
            ].map((dim, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <div className={`lp-block lp-block--lift lp-c-white flex flex-col gap-4 ${['lp-sh-sun', 'lp-sh-grape', 'lp-sh-leaf', 'lp-sh-coral', 'lp-sh-sun', 'lp-sh-grape'][i]}`}>
                  <div className="flex justify-between items-start gap-3">
                    <div className={`lp-chip lp-chip--sq ${['lp-chip-sun', 'lp-chip-grape', 'lp-chip-leaf', 'lp-chip-coral', 'lp-chip-sun', 'lp-chip-grape'][i]}`}>
                      {React.cloneElement(dim.icon as React.ReactElement, { size: 28 })}
                    </div>
                    <div className="lp-tag">
                      Dimension {dim.num}
                    </div>
                  </div>
                  <h4 className="text-xl lg:text-2xl font-kids font-bold text-brand-ink">{dim.title}</h4>
                  <p className="text-base lg:text-lg font-medium">{dim.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* 4. NEW SECTION: Skills ABA Therapy Can Help Address */}
      <section className="lp-band lp-band--white lp-scallop" style={{ '--next': 'var(--sun-soft)' } as React.CSSProperties}>
        <div className="lp-wrap">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center mb-10 lg:mb-14">
            <motion.div
              initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-display font-kids font-bold text-brand-ink mb-6 leading-tight">
                Mastering <br /><span className="lp-squig text-brand-teal italic">New Skills.</span>
              </h2>
              <p className="lp-lead text-brand-sage mb-7">
                Children with autism benefit from ABA by acquiring skills that help them function at home, in school, and in the community.
              </p>
              <div className="lp-quote lp-quote--say lp-sh-sun -rotate-1">
                <p className="text-lg lg:text-xl font-bold text-brand-ink">
                  "ABA providers use practical methods and compassionate care to help your child develop milestones that lead to long-term success."
                </p>
              </div>
            </motion.div>

            <motion.div {...reveal(1)} className="lg:w-1/2 w-full relative max-w-md lg:max-w-none mx-auto">
               <span aria-hidden="true" className="lp-flower lp-flower--float" style={{ '--c': 'var(--coral)', '--s': '88px', left: '-26px', bottom: '-30px', zIndex: 2 } as React.CSSProperties} />
               <span aria-hidden="true" className="lp-spark" style={{ '--c': 'var(--sun)', '--s': '40px', right: '-8px', top: '-18px', zIndex: 2 } as React.CSSProperties} />
               <div className="lp-photo lp-photo--tilt lp-sh-sky">
                 <picture>
                   <source srcSet="/images/autism-therapy.webp" type="image/webp" />
                   <img src="/images/autism-therapy.webp" alt="Child Learning Success" className="w-full aspect-[4/3] object-cover" loading="lazy" decoding="async" />
                 </picture>
               </div>
            </motion.div>
          </div>

          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="lp-snap lp-offset grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
          >
            {[
              { title: "Communication & Language", icon: <MessageCircle strokeWidth={1.75} aria-hidden="true" />, items: ["Functional Communication Training (FCT)", "Vocal & AAC device mastery", "Conversational reciprocity"], color: "lp-c-sun" },
              { title: "Social Interaction & Play", icon: <Users strokeWidth={1.75} aria-hidden="true" />, items: ["Peer collaboration & shared joy", "Cooperative & imaginative play", "Social perspective taking"], color: "lp-c-sky" },
              { title: "Daily Living & Self-Care", icon: <Baby strokeWidth={1.75} aria-hidden="true" />, items: ["Potty training & self-care routines", "Feeding & mealtime independence", "Community & school transitions"], color: "lp-c-grape" },
              { title: "Emotional Self-Regulation", icon: <Heart strokeWidth={1.75} aria-hidden="true" />, items: ["Recognizing emotional states", "Sensory calming strategies", "Adaptive coping mechanisms"], color: "lp-c-coral" },
              { title: "Cognitive & School Readiness", icon: <BookText strokeWidth={1.75} aria-hidden="true" />, items: ["Sustained attention & focus", "Classroom routine adaptation", "Executive functioning support"], color: "lp-c-leaf" },
              { title: "Environmental Safety & Advocacy", icon: <ShieldAlert strokeWidth={1.75} aria-hidden="true" />, items: ["Community safety awareness", "Self-advocacy & boundary setting", "Replacement behaviors for distress"], color: "lp-c-sun" }
            ].map((skill, i) => (
              <motion.div
                key={i} variants={fadeInUp}
              >
                <div className={`lp-block lp-block--lift ${skill.color}`}>
                  <div className="lp-chip mb-5">
                    {React.cloneElement(skill.icon as React.ReactElement, { size: 28 })}
                  </div>
                  <h3 className="lp-h3 font-kids font-bold text-brand-ink mb-4">{skill.title}</h3>
                  <ul className="space-y-2.5">
                    {skill.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 font-semibold">
                        <CheckCircle2 strokeWidth={2} aria-hidden="true" className="text-brand-ink shrink-0 mt-0.5" size={18} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* 5. NEW SECTION: Teaching Life Skills to Children With Autism */}
      <section className="lp-band lp-band--peach lp-wavy" style={{ '--next': 'var(--color-brand-mint)' } as React.CSSProperties}>
        <span aria-hidden="true" className="lp-flower" style={{ '--c': 'var(--coral)', '--s': '110px', left: '-34px', top: '-34px' } as React.CSSProperties} />
        <span aria-hidden="true" className="lp-spark lp-spark--late" style={{ '--c': 'var(--grape)', '--s': '30px', right: '7%', top: '64px' } as React.CSSProperties} />

        <div className="lp-wrap">
          <div className="lp-head">
            <motion.h2
              initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}
              className="text-section font-kids font-bold text-brand-ink leading-tight"
            >
              Foundations for <br /><span className="lp-squig text-brand-teal italic">Independence.</span>
            </motion.h2>
            <p className="lp-lead lp-text">
              ABA therapy uses scientific techniques to help children develop basic skills for a successful, independent life.
            </p>
          </div>

          <div className="grid lg:grid-cols-[.85fr_1.15fr] gap-12 lg:gap-16 items-center">
            {/* Image Side with Floating Content */}
            <motion.div
              initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="lp-photo--sm relative max-w-sm lg:max-w-none mx-auto w-full pb-8"
            >
              <div className="lp-photo lp-photo--arch lp-sh-grape">
                <picture>
                  <source srcSet="/images/kids-aba.webp" type="image/webp" />
                  <img
                    src="/images/kids-aba.webp"
                    alt="Child practicing life skills"
                    className="w-full aspect-[4/5] object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
              <div className="lp-sticker lp-c-grape bottom-0 right-0 lg:-right-6 rotate-3 max-w-[250px]">
                 <p className="font-kids font-bold text-base lg:text-lg italic">"Practice at home helps build a foundation for life."</p>
              </div>
            </motion.div>

            {/* Life Skills Grid */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-section font-kids font-bold text-brand-ink">Everyday Milestones.</h3>
                <p className="lp-lead lp-text">
                  The work we do during sessions helps children function better at home, in school, and in public spaces like the grocery store.
                </p>
              </div>

              <div className="lp-duo grid sm:grid-cols-2 gap-4">
                {[
                  { title: "Potty Training", icon: <Bath strokeWidth={1.75} aria-hidden="true" />, color: "lp-chip-leaf" },
                  { title: "Self-Care & Grooming", icon: <Shirt strokeWidth={1.75} aria-hidden="true" />, color: "lp-chip-grape" },
                  { title: "Routine Adherence", icon: <Clock strokeWidth={1.75} aria-hidden="true" />, color: "lp-chip-sun" },
                  { title: "Basic Chores", icon: <Utensils strokeWidth={1.75} aria-hidden="true" />, color: "lp-chip-sky" },
                  { title: "Initiating Conversations", icon: <Speech strokeWidth={1.75} aria-hidden="true" />, color: "lp-chip-coral" },
                  { title: "Connecting with Peers", icon: <Users2 strokeWidth={1.75} aria-hidden="true" />, color: "lp-chip-leaf" }
                ].map((skill, i) => (
                  <motion.div key={i} {...reveal(i % 2)}>
                    <div className="lp-row lp-row--lift h-full">
                      <div className={`lp-chip lp-chip--sm ${skill.color}`}>
                        {React.cloneElement(skill.icon as React.ReactElement, { size: 22 })}
                      </div>
                      <span className="font-bold text-base lg:text-lg text-brand-ink">{skill.title}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
                <Link to="/services" className="lp-btn lp-btn--teal group">
                  See How We Can Help
                  <span className="inline-flex items-center justify-center">
                    <ArrowRight strokeWidth={1.75} aria-hidden="true" />
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NEW SECTION: Transitioning into ABA Therapy (Bright Beginnings) */}
      <section className="lp-band lp-band--mint lp-scallop" style={{ '--next': 'var(--color-brand-cream)' } as React.CSSProperties}>
        <span aria-hidden="true" className="lp-flower" style={{ '--c': 'var(--sun)', '--s': '120px', right: '-36px', top: '-36px' } as React.CSSProperties} />
        <span aria-hidden="true" className="lp-spark" style={{ '--c': 'var(--coral)', '--s': '30px', left: '7%', top: '70px' } as React.CSSProperties} />
        <div className="lp-wrap">
          <div className="lp-head">
            <motion.div
              initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}
              className="lp-tag lp-c-sun mb-5"
            >
               <Sunrise strokeWidth={1.75} aria-hidden="true" size={16} /> Bridging the Gap
            </motion.div>
            <h2 className="text-section font-kids font-bold text-brand-ink leading-tight">
              Bright <span className="lp-squig text-brand-teal italic">Beginnings.</span>
            </h2>
            <p className="lp-lead lp-text">
              We created the Bright Beginnings initiative to guide and support your family as you transition into regular ABA therapy.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Feature Cards Group */}
            <motion.div
              variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="lp-steps space-y-5"
            >
              {[
                {
                  title: "Foundational Skill Building",
                  desc: "Get a head start on the essential skills your child will learn during their full ABA journey.",
                  icon: <Brain strokeWidth={1.75} aria-hidden="true" />
                },
                {
                  title: "Center Familiarization",
                  desc: "Helping your child feel comfortable and safe in our environment before regular sessions begin.",
                  icon: <Layout strokeWidth={1.75} aria-hidden="true" />
                },
                {
                  title: "Weekly BCBA Training",
                  desc: "One-hour meetings with a BCBA to provide parent training and answer your clinical questions.",
                  icon: <Clock strokeWidth={1.75} aria-hidden="true" />
                }
              ].map((item, i) => (
                <motion.div
                  key={i} variants={fadeInUp}
                >
                  <div className={`lp-block lp-block--lift lp-c-white flex gap-5 items-start !p-6 ${['lp-sh-coral', 'lp-sh-sun', 'lp-sh-grape'][i]}`}>
                    <div className={`lp-chip lp-chip--sq ${['lp-chip-coral', 'lp-chip-sun', 'lp-chip-grape'][i]}`}>
                      {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
                    </div>
                    <div>
                      <h3 className="lp-h3 font-bold text-brand-ink mb-2">{item.title}</h3>
                      <p className="text-base lg:text-lg font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Context Card */}
            <motion.div
              initial={{ opacity: 0, x: 26 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            >
              <div className="lp-block lp-block--clip lp-c-teal lp-sh-ink lg:!p-12 flex flex-col justify-center lg:rotate-1">
                <span aria-hidden="true" className="lp-flower" style={{ '--c': 'var(--sun)', '--s': '150px', right: '-44px', top: '-44px' } as React.CSSProperties} />
                <div className="relative z-10">
                  <h3 className="text-section font-kids font-bold mb-5 max-w-[14ch]">Early Learning, Early Success.</h3>
                  <div className="space-y-4 text-lg font-medium leading-relaxed mb-8">
                    <p>
                      This program ensures your child is ready for full sessions while they wait for their official start dates.
                    </p>
                    <p>
                      Once full ABA therapy begins, their time in Bright Beginnings ends, leaving them prepared for the road ahead.
                    </p>
                  </div>
                  <Link to="/locations" className="lp-btn group">
                    Find a Location <ArrowRight strokeWidth={1.75} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* 4. FAQ: CLINICAL ANSWERS */}
      <section className="lp-band lp-band--cream">
        <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2 {...reveal()} className="text-section font-kids font-bold text-brand-ink mb-10 text-center">Your Questions.</motion.h2>
        <div className="space-y-4">
          {[
            { q: "What treatment options are available?", a: "Behavioral interventions, such as Applied Behavior Analysis (ABA), are the most effective treatment options for individuals with ASD. ABA helps develop daily living, social, and communication skills." },
            { q: "Is ABA scientific?", a: "Yes. ABA is a scientific discipline that strives to understand and improve significant behaviors through data collection and progress monitoring." },
            { q: "Who provides ABA therapy?", a: "Treatment is delivered by Registered Behavior Technicians (RBTs) under the supervision of Board Certified Behavior Analysts (BCBAs)." }
          ].map((faq, index) => (
            <div key={index} className="lp-faq">
              <h3 className="m-0"><button type="button" id={`whatisaba-question-${index}`} aria-expanded={openFAQ === index} aria-controls={`whatisaba-answer-${index}`} onClick={() => setOpenFAQ(openFAQ === index ? null : index)} className="w-full flex items-center justify-between text-left font-bold font-kids">
                {faq.q}
                <motion.div animate={{ rotate: openFAQ === index ? 180 : 0 }} className="text-brand-ink shrink-0 ml-2"><ChevronDown strokeWidth={2} aria-hidden="true" size={26} /></motion.div>
              </button></h3>
              <div id={`whatisaba-answer-${index}`} role="region" aria-labelledby={`whatisaba-question-${index}`} hidden={openFAQ !== index}>
<AnimatePresence>
                {openFAQ === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    <div className="lp-faq__body whitespace-pre-line">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
</div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="pt-4 pb-6 px-5 lg:px-12 max-w-6xl mx-auto text-center">
        <motion.div {...reveal()} className="lp-cta lp-c-sun">
          <span aria-hidden="true" className="lp-flower" style={{ '--c': 'var(--coral)', '--s': '110px', left: '-28px', top: '-28px' } as React.CSSProperties} />
          <span aria-hidden="true" className="lp-flower lp-flower--float" style={{ '--c': 'var(--grape)', '--s': '72px', right: '5%', bottom: '-18px' } as React.CSSProperties} />
          <FlaskConical strokeWidth={1.75} aria-hidden="true" className="hidden sm:block absolute top-6 right-6 lg:top-10 lg:right-12 opacity-25 w-14 lg:w-24 h-14 lg:h-24" />
          <span aria-hidden="true" className="lp-spark" style={{ '--c': '#ffffff', '--s': '30px', left: '16%', bottom: '36px' } as React.CSSProperties} />
          <h2 className="text-display font-kids font-bold mb-5 relative z-10 leading-tight">Join the Family.</h2>
          <p className="lp-lead mb-8 max-w-3xl mx-auto relative z-10">
            Join thousands of families who have experienced the Auvia difference in science-backed care.
          </p>
          <Link to="/contact" className="lp-btn lp-btn--teal lp-btn--lg relative z-10">
            Book a Consultation
          </Link>
        </motion.div>
      </section>

      {/* 6. CLINICAL REFERENCES & BIBLIOGRAPHY */}
      <section className="lp-refs max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <div className="lp-chip lp-chip--sm lp-chip-sun">
            <Users strokeWidth={1.75} aria-hidden="true" size={18} />
          </div>
          <span className="text-brand-teal text-xs font-bold uppercase tracking-widest">Clinical References</span>
        </div>
        <h3 className="text-2xl font-kids font-bold text-brand-ink mb-4">Scientific & Peer-Reviewed Literature</h3>
        <p className="text-brand-sage text-sm mb-6 font-medium">
          Evidence-based behavioral services at Auvia are guided by established clinical protocols and peer-reviewed journals.
        </p>
        <ul className="space-y-4 text-xs font-medium list-decimal pl-5 leading-relaxed">
          <li>
            Behavior Analyst Certification Board (BACB). <strong>"Ethics Code for Behavior Analysts."</strong> Littleton, CO: BACB.
            <a href="https://www.bacb.com/ethics-information/" target="_blank" rel="noopener noreferrer" className="text-brand-teal ml-1 underline underline-offset-4 hover:decoration-2">View Ethics Guidelines</a>
          </li>
          <li>
            National Autism Center. <strong>"Findings and Conclusions: National Standards Project, Phase 2."</strong> Evidence-based practice guidelines.
            <a href="https://nationalautismcenter.org/resources/" target="_blank" rel="noopener noreferrer" className="text-brand-teal ml-1 underline underline-offset-4 hover:decoration-2">View National Standards</a>
          </li>
          <li>
            Journal of Applied Behavior Analysis (JABA). <strong>"Some Still-Current Dimensions of Applied Behavior Analysis."</strong> Baer, D. M., Wolf, M. M., & Risley, T. R. (1987).
            <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1286071/" target="_blank" rel="noopener noreferrer" className="text-brand-teal ml-1 underline underline-offset-4 hover:decoration-2">View JABA Seminal Article</a>
          </li>
        </ul>
      </section>

    </div>
    </MotionConfig>
  );
};
