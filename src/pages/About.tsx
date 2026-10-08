import '../styles/pages.css';
import React from 'react';
import { motion, MotionConfig } from 'motion/react';
import { Heart, Users, Star, Sparkles, ShieldCheck, ArrowRight, Award, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

export const About = () => {
  const navigate = useNavigate();
  return (
    <MotionConfig reducedMotion="user">
    <div className="inner-public-page public-page pt-24 lg:pt-28 pb-14 lg:pb-20 bg-gradient-to-br from-brand-sky/40 via-white to-brand-peach/20 overflow-x-hidden relative min-h-screen">
      <SEO
        title="Our Mission & Clinical Values | Auvia Behavior Centers"
        description="Learn about Auvia Behavior Centers. Discover our commitment to evidence-based ABA therapy, compassionate clinical leadership, and collaborative family partnerships."
        keywords="about auvia behavior centers, our mission, clinical values, compassionate ABA care, autism therapy team, BCBA leadership"
        canonicalUrl="https://auviatherapy.com/about"
      />
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="blob-bg w-[800px] h-[800px] bg-brand-mint/30 top-[-10%] right-[-10%]" />
        <div className="blob-bg w-[600px] h-[600px] bg-brand-peach/30 bottom-[-10%] left-[-10%]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="route-title-block abt-hero mb-16 lg:mb-24 relative z-10">
          <span className="text-brand-teal text-sm font-bold uppercase tracking-widest mb-6 block font-kids">Our Story & Mission</span>
          <h1 className="text-display font-kids font-bold text-brand-ink mb-10 leading-tight">
            Elevating Pediatric Care, <br />
            <Mark className="text-brand-teal italic">Empowering Families.</Mark>
          </h1>
          <p className="text-xl text-brand-sage font-medium leading-relaxed max-w-2xl">
            Auvia Behavior Centers was founded on a simple yet profound belief: every child diagnosed with autism deserves compassionate, evidence-based care delivered in an environment where they feel respected, valued, and empowered to thrive.
          </p>
          <div className="abt-hero__collage" aria-hidden="true">
            <span className="abt-hero__disc" />
            <img className="abt-hero__photo abt-hero__photo--a" src="/images/kids-hero.webp" alt="" decoding="async" />
            <img className="abt-hero__photo abt-hero__photo--b" src="/images/aba-therapy-session.webp" alt="" decoding="async" />
            <span className="abt-hero__chip abt-hero__chip--heart"><Heart strokeWidth={2} size={22} /></span>
            <span className="abt-hero__chip abt-hero__chip--star"><Star strokeWidth={2} size={20} /></span>
            <span className="abt-hero__flower" />
            <svg className="abt-hero__squiggle" viewBox="0 0 120 24" fill="none"><path d="M3 12c9.500-12 19-12 28.500 0s19 12 28.500 0 19-12 28.500 0 19 12 28.500 0" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /></svg>
          </div>
        </motion.div>

        <div className="abt-values grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-10 lg:mb-14 relative z-10">
          {[
            {
              icon: <Heart size={22} strokeWidth={1.75} />,
              title: "Child-Centered Dignity",
              text: "We prioritize each child's emotional well-being, assent, and individual strengths with compassionate, respectful care at every touchpoint.",
              color: "bg-brand-mint"
            },
            {
              icon: <Users size={22} strokeWidth={1.75} />,
              title: "Collaborative Partnerships",
              text: "We provide structured parent guidance and regular BCBA consultations to ensure skills generalize seamlessly to everyday life at home.",
              color: "bg-brand-peach"
            },
            {
              icon: <ShieldCheck size={22} strokeWidth={1.75} />,
              title: "Clinical Leadership",
              text: "Our Board Certified Behavior Analysts (BCBAs) and Registered Behavior Technicians (RBTs) apply the highest peer-reviewed scientific standards.",
              color: "bg-brand-lavender"
            },
            {
              icon: <Award size={22} strokeWidth={1.75} />,
              title: "Milestone Mastery",
              text: "We measure and celebrate functional developmental milestones that unlock lifelong communication, confidence, and independence.",
              color: "bg-brand-sky"
            }
          ].map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className={`bp-card bp-card--${i} relative`}
            >
              <span className="bp-card__num" aria-hidden="true">0{i + 1}</span>
              <div className="bp-card__icon w-12 h-12 rounded-full flex items-center justify-center mb-5 relative z-10">
                {value.icon}
              </div>
              <h3 className="text-2xl font-kids font-bold text-brand-ink mb-6 relative z-10">{value.title}</h3>
              <p className="bp-card__text leading-relaxed font-medium relative z-10 text-sm md:text-base">{value.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="abt-divider" aria-hidden="true">
          <span className="abt-divider__flower" />
          <svg viewBox="0 0 240 24" fill="none" preserveAspectRatio="none"><path d="M3 12c9.750-12 19.500-12 29.250 0s19.500 12 29.250 0 19.500-12 29.250 0 19.500 12 29.250 0 19.500-12 29.250 0 19.500 12 29.250 0 19.500-12 29.250 0 19.500 12 29.250 0" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="1 11" /></svg>
          <Heart strokeWidth={2} size={22} />
          <svg viewBox="0 0 240 24" fill="none" preserveAspectRatio="none"><path d="M3 12c9.750-12 19.500-12 29.250 0s19.500 12 29.250 0 19.500-12 29.250 0 19.500 12 29.250 0 19.500-12 29.250 0 19.500 12 29.250 0 19.500-12 29.250 0 19.500 12 29.250 0" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="1 11" /></svg>
          <span className="abt-divider__flower abt-divider__flower--b" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="abt-sanctuary flex flex-col lg:flex-row gap-10 lg:gap-16 items-center relative z-10"
        >
          <div className="lg:w-[55%]">
            <h2 className="text-section font-kids font-bold text-brand-ink mb-5 leading-tight">
              A Sensory Sanctuary <br /><Mark className="italic text-brand-teal">Designed for Growth.</Mark>
            </h2>
            <p className="abt-sanctuary__text mb-5 leading-relaxed font-medium text-base lg:text-lg">
              Our state-of-the-art centers are purpose-built as therapeutic sanctuaries. Designed with sensory-considerate lighting, dedicated gross-motor areas, and individual learning suites, we create an inviting atmosphere where children are motivated to explore, communicate, and succeed.
            </p>
            <p className="abt-sanctuary__text mb-8 leading-relaxed font-medium text-base lg:text-lg">
              Our multidisciplinary approach coordinates with your child's pediatrician, speech-language pathologists, and occupational therapists to provide cohesive, holistic developmental care.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate('/services')} className="btn-friendly-primary flex items-center gap-2">
                Explore Our Programs <ArrowRight strokeWidth={1.75} aria-hidden="true" size={18} />
              </button>
              <button onClick={() => navigate('/contact')} className="btn-friendly-outline">
                Schedule a Consultation
              </button>
            </div>
          </div>
          <div className="abt-sanctuary__media lg:w-[45%] relative">
            <span className="abt-sanctuary__ring" aria-hidden="true" />
            <div className="abt-sanctuary__photo relative z-10">
              <picture>
                <source srcSet="/images/about-kids.webp" type="image/webp" />
                <img
                  src="/images/about-kids.webp"
                  alt="Auvia Behavior Centers clinical therapy environment"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </picture>
            </div>
            <span className="abt-sanctuary__sticker" aria-hidden="true"><img src="/images/autism-therapy.webp" alt="" decoding="async" /></span>
            <span className="abt-sanctuary__heart" aria-hidden="true"><Heart strokeWidth={2} size={26} /></span>
            <span className="abt-sanctuary__spark" aria-hidden="true"><Sparkles strokeWidth={2} size={20} /></span>
          </div>
        </motion.div>
      </div>
    </div>
    </MotionConfig>
  );
};

