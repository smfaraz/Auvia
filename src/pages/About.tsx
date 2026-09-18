import React from 'react';
import { motion } from 'motion/react';
import { Heart, Users, Star, Sparkles, ShieldCheck, ArrowRight, Award, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const About = () => {
  const navigate = useNavigate();
  return (
    <div className="pt-20 lg:pt-24 pb-20 lg:pb-32 bg-gradient-to-br from-brand-sky via-brand-cream to-brand-lavender/40 overflow-x-hidden relative min-h-screen">
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

        <div className="max-w-4xl mb-16 lg:mb-24 relative z-10">
          <span className="text-brand-teal text-sm font-bold uppercase tracking-widest mb-6 block font-kids">Our Story & Mission</span>
          <h1 className="text-display font-kids font-bold text-brand-ink mb-10 leading-tight">
            Elevating Pediatric Care, <br />
            <span className="text-brand-teal italic">Empowering Families.</span>
          </h1>
          <p className="text-xl text-brand-sage font-medium leading-relaxed max-w-2xl">
            Auvia Behavior Centers was founded on a simple yet profound belief: every child diagnosed with autism deserves compassionate, evidence-based care delivered in an environment where they feel respected, valued, and empowered to thrive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-40 relative z-10">
          {[
            { 
              icon: <Heart size={28} />, 
              title: "Child-Centered Dignity", 
              text: "We prioritize each child's emotional well-being, assent, and individual strengths with compassionate, respectful care at every touchpoint.", 
              color: "bg-brand-mint" 
            },
            { 
              icon: <Users size={28} />, 
              title: "Collaborative Partnerships", 
              text: "We provide structured parent guidance and regular BCBA consultations to ensure skills generalize seamlessly to everyday life at home.", 
              color: "bg-brand-peach" 
            },
            { 
              icon: <ShieldCheck size={28} />, 
              title: "Clinical Leadership", 
              text: "Our Board Certified Behavior Analysts (BCBAs) and Registered Behavior Technicians (RBTs) apply the highest peer-reviewed scientific standards.", 
              color: "bg-brand-lavender" 
            },
            { 
              icon: <Award size={28} />, 
              title: "Milestone Mastery", 
              text: "We measure and celebrate functional developmental milestones that unlock lifelong communication, confidence, and independence.", 
              color: "bg-brand-sky" 
            }
          ].map((value, i) => (
            <div key={i} className="glass-panel card-friendly group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className={`w-16 h-16 rounded-[24px] ${value.color}/60 text-brand-teal flex items-center justify-center mb-10 shadow-sm relative z-10`}>
                {value.icon}
              </div>
              <h3 className="text-2xl font-kids font-bold text-brand-ink mb-6 relative z-10">{value.title}</h3>
              <p className="text-brand-sage leading-relaxed font-medium relative z-10 text-sm md:text-base">{value.text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-20 items-center mb-32 relative z-10">
          <div className="lg:w-1/2">
            <h2 className="text-section font-kids font-bold text-brand-ink mb-10 leading-tight">
              A Sensory Sanctuary <br /><span className="italic text-brand-teal">Designed for Growth.</span>
            </h2>
            <p className="text-brand-sage mb-6 leading-relaxed font-medium text-lg">
              Our state-of-the-art centers are purpose-built as therapeutic sanctuaries. Designed with sensory-considerate lighting, dedicated gross-motor areas, and individual learning suites, we create an inviting atmosphere where children are motivated to explore, communicate, and succeed.
            </p>
            <p className="text-brand-sage mb-10 leading-relaxed font-medium text-lg">
              Our multidisciplinary approach coordinates with your child's pediatrician, speech-language pathologists, and occupational therapists to provide cohesive, holistic developmental care.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate('/services')} className="btn-friendly-primary flex items-center gap-2">
                Explore Our Programs <ArrowRight size={18} />
              </button>
              <button onClick={() => navigate('/contact')} className="btn-friendly-outline">
                Schedule a Consultation
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-brand-teal/10 rounded-[60px] blur-3xl transform rotate-3 scale-105" />
            <div className="rounded-[60px] overflow-hidden shadow-2xl aspect-[4/5] border-[16px] border-white/80 backdrop-blur-sm rotate-2 relative z-10">
              <picture>
                <source srcSet="/images/about-kids.webp" type="image/webp" />
                <img
                  src="/images/about-kids.jpg"
                  alt="Auvia Behavior Centers clinical therapy environment"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

