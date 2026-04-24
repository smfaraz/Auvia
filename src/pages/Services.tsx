import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, CheckCircle2, Sparkles, Home, Heart, 
  ShieldCheck, Zap, Smile, BookOpen, Brain, 
  Users, Target, Award, Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MagicMascot } from '../components/MagicMascot';

export const Services = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
const pillars = [
    {
      title: "Evidence-Based",
      description: "ABA is the gold standard of autism treatment, backed by decades of scientific research and clinical validation.",
      icon: <Target className="text-brand-teal" size={32} />,
      details: ["Peer-reviewed methodology", "Scientifically proven results", "Focused on behavioral change"]
    },
    {
      title: "Data-Driven",
      description: "Every session is tracked and analyzed to ensure your child is making measurable, consistent progress.",
      icon: <Brain className="text-brand-teal" size={32} />,
      details: ["Real-time progress tracking", "Individualized goal setting", "Customized session planning"]
    },
    {
      title: "Compassionate",
      description: "We prioritize the child's emotional well-being and dignity, ensuring every interaction is rooted in empathy.",
      icon: <Heart className="text-brand-teal" size={32} />,
      details: ["Person-centered approach", "Focus on emotional growth", "Safe and nurturing environment"]
    }
  ];
  const services = [
    {
      title: "Center-Based ABA Therapy",
      age: "Ages 18 Months – 10 Years",
      tagline: "The Sanctuary Environment",
      description: "Our world-class centers are designed as 'Sanctuaries' where children thrive. Through structured play and social interaction, we help children reach milestone moments in a sensory-safe environment tailored to their unique needs.",
      features: [
        "Social-Emotional Development",
        "Communication & Language",
        "Peer-to-Peer Interaction",
        "School Readiness Prep"
      ],
      // Professional, bright ABA center image focusing on structured play
      image: "https://s33929.pcdn.co/wp-content/uploads/sites/638/2023/03/Benefits-of-Center-Based-Therapy.jpg",
      color: "bg-brand-mint/20",
      icon: <Sparkles className="text-brand-teal" size={24} />
    },
    {
      title: "Auvia at Home",
      age: "Ages 18 Months – 14 Years",
      tagline: "Natural Environment Teaching",
      description: "Therapy delivered in the place where children feel most comfortable. We work alongside families to integrate evidence-based learning into daily routines like mealtime and play, ensuring skills transfer to real-life settings.",
      features: [
        "Daily Living Skills",
        "Family Support & Training",
        "Natural Environment Teaching",
        "Behavioral Reduction"
      ],
      // Warm, home-based learning image focusing on therapist-child connection
      image: "https://learnbehavioral.com/wp-content/uploads/2024/11/ABA-Therapy-at-Home-with-LEARN.jpg",
      color: "bg-[#fff3cd]/40", 
      icon: <Home className="text-[#d9a01c]" size={24} />
    }
  ];

  const abaCorePillars = [
    {
      icon: <Target className="text-brand-teal" />,
      title: "Evidence-Based",
      text: "ABA is the gold standard of autism treatment, backed by decades of scientific research."
    },
    {
      icon: <Brain className="text-brand-teal" />,
      title: "Data-Driven",
      text: "Every session is tracked and analyzed to ensure your child is making measurable progress."
    },
    {
      icon: <Heart className="text-brand-teal" />,
      title: "Compassionate",
      text: "We prioritize the child's emotional well-being and dignity in every interaction."
    }
  ];

  return (
    <div className="bg-[#fdfcf0] min-h-screen relative">
      
      {/* 1. HERO SECTION: Massive and Minimalist */}
      <section className="relative min-h-[80vh] lg:min-h-screen flex items-center pt-32 lg:pt-20 bg-[#fdfcf0] overflow-hidden">
      
      {/* --- 1. THE REFINED MERGED BACKGROUND IMAGE --- */}
      <div className="absolute top-0 right-0 w-full lg:w-[65%] h-[50vh] lg:h-full z-0 overflow-hidden pointer-events-none opacity-50 lg:opacity-100">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          {/* Refined Dual-Mask for Subtle Merge:
              - Left to Right: Now fades out much slower, starting from 75% solid and completely transparent by 10%.
              - Bottom to Top: Increased fade at the bottom (transparent 15%) for an expansive minimalist feel.
          */}
          <div 
            className="w-full h-full bg-cover bg-center grayscale-[0.2] brightness-[1.05]"
            style={{ 
              backgroundImage: `url('https://www.catalight.org/wp-content/uploads/2023/11/shutterstock_1238624647-scaled-1.jpg')`,
              maskImage: 'linear-gradient(to left, black 75%, transparent 10%), linear-gradient(to top, transparent 15%, black 40%)',
              WebkitMaskImage: 'linear-gradient(to left, black 75%, transparent 10%), linear-gradient(to top, transparent 15%, black 40%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'destination-in'
            }}
          />
          
          {/* Color Match Overlay: Tinting shadows to brand teal */}
          <div className="absolute inset-0 bg-brand-teal/5 mix-blend-multiply opacity-40" />
        </motion.div>
      </div>

      {/* --- 2. CONTENT LAYER (UNCHANGED) --- */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-[1px] bg-brand-teal"></span>
            <span className="text-brand-teal text-sm font-bold uppercase tracking-[0.3em] font-kids">
              Sanctuary Network
            </span>
          </div>
          
          <h1 className="text-4xl md:text-7xl lg:text-9xl font-kids font-bold text-brand-ink mb-8 lg:mb-12 leading-[0.85] tracking-tighter text-center lg:text-left">
            A New Standard <br className="hidden lg:block" />
            <span className="text-brand-teal italic">in Autism Care.</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-brand-sage font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0 pl-6 border-l-2 border-brand-teal/20 text-center lg:text-left mb-6">
            We move beyond traditional therapy. By combining clinical precision with a nurturing environment, we empower children to communicate, connect, and thrive.
          </p>
          <div className="bg-brand-teal/5 p-4 rounded-2xl border border-brand-teal/10 text-brand-teal font-bold text-sm max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            We will help to connect you to resources to get your child evaluated and get a diagnosis report.
          </div>
        </motion.div>
      </div>

      {/* Subtle Glow (UNCHANGED) */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-transparent via-[#fdfcf0]/40 to-[#fdfcf0] z-[1] pointer-events-none" />
    </section>

      {/* 2. CORE SERVICES: Rich Interactive Cards */}
      <section className="py-20 lg:py-32 px-6 lg:px-12 bg-white rounded-t-[60px] lg:rounded-t-[100px] shadow-[0_-50px_100px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-32 lg:space-y-60">
            {services.map((service, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                  <div className={`inline-flex items-center gap-3 px-6 lg:px-8 py-2.5 lg:py-3 rounded-full ${service.color} text-brand-teal text-[10px] lg:text-xs font-bold font-kids mb-8 lg:mb-10 tracking-widest border border-brand-teal/10`}>
                    {service.icon}
                    {service.age}
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-kids font-bold text-brand-ink mb-8 lg:mb-10 leading-tight">
                    {service.title}
                  </h2>
                  <p className="text-lg md:text-xl text-brand-sage mb-10 lg:mb-12 leading-relaxed font-medium">
                    {service.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 lg:gap-y-8 gap-x-8 lg:gap-x-12 mb-12 lg:mb-16 text-left">
                    {service.features.map(f => (
                      <div key={f} className="flex items-center gap-4 lg:gap-5 text-sm lg:text-base font-bold text-brand-ink font-kids group">
                        <div className="w-8 lg:w-10 h-8 lg:h-10 rounded-xl lg:rounded-2xl bg-brand-mint/30 flex items-center justify-center text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-all duration-500 shadow-sm shrink-0">
                          <CheckCircle2 size={16} />
                        </div>
                        {f}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row flex-wrap gap-6 lg:gap-8 items-center justify-center lg:justify-start">
                    <button 
                      onClick={() => navigate('/contact')} 
                      className="w-full sm:w-auto bg-brand-ink text-white px-10 lg:px-12 py-5 lg:py-6 rounded-[24px] lg:rounded-[30px] font-kids font-bold text-lg lg:text-xl hover:bg-brand-teal transition-all duration-500 flex items-center justify-center gap-4 shadow-2xl active:scale-95"
                    >
                      Enroll Now <ArrowRight size={22} />
                    </button>
                    <div className="flex items-center gap-3 text-brand-sage font-bold text-[10px] lg:text-xs uppercase tracking-widest">
                      <ShieldCheck size={18} className="text-brand-teal" />
                      Insurance Validated
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 relative">
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                  >
                    <div className="absolute -inset-6 lg:-inset-10 bg-brand-mint/10 rounded-[60px] lg:rounded-[100px] -z-10 blur-3xl opacity-50" />
                    <div className="rounded-[40px] lg:rounded-[80px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.1)] aspect-[4/5] lg:aspect-[4/3] border-[12px] lg:border-[20px] border-white relative group">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[6s] ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-brand-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DEEP DIVE: Understanding ABA Therapy */}
      <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* HEADER AREA */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center lg:items-end mb-16 lg:mb-24 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-teal text-[10px] lg:text-sm font-bold uppercase tracking-[0.3em] font-kids mb-4 lg:mb-6 block">
              The Auvia Standard
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-kids font-bold text-brand-ink leading-tight">
              Our Clinical <br className="hidden lg:block" />
              <span className="text-brand-teal italic">Focus.</span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-lg lg:text-xl text-brand-sage font-medium leading-relaxed max-w-lg mx-auto lg:mx-0"
          >
            We combine rigorous behavioral science with a compassionate approach to help children reach their fullest potential.
          </motion.p>
        </div>

        {/* PILLARS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#f8fbfa] rounded-[40px] lg:rounded-[50px] p-8 lg:p-10 border border-brand-teal/5 flex flex-col h-full group hover:shadow-2xl hover:bg-white transition-all duration-500"
            >
              <div className="w-12 lg:w-16 h-12 lg:h-16 bg-white rounded-2xl lg:rounded-3xl flex items-center justify-center mb-6 lg:mb-8 shadow-sm group-hover:bg-brand-teal/10 transition-colors">
                {React.cloneElement(pillar.icon as React.ReactElement, { size: 24 })}
              </div>
              
              <h3 className="text-xl lg:text-2xl font-kids font-bold text-brand-ink mb-4 lg:mb-6">{pillar.title}</h3>
              <p className="text-base text-brand-sage font-medium mb-8 lg:mb-10 leading-relaxed">{pillar.description}</p>
              
              <div className="space-y-3 lg:space-y-4 mb-10 lg:mb-12 flex-grow text-left">
                {pillar.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-3 text-xs lg:text-sm font-bold text-brand-ink/80 font-kids">
                    <CheckCircle2 size={16} className="text-brand-teal shrink-0" />
                    {detail}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => navigate('/services')}
                className="mt-auto flex items-center gap-2 text-brand-teal font-bold font-kids group/btn"
              >
                Learn More <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full bg-gradient-to-l from-brand-mint/20 to-transparent pointer-events-none" />
    </section>

      {/* 4. CLINICAL INTEGRITY: Large Quote Section */}
      <section className="py-24 lg:py-40 px-6 lg:px-12 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <Star className="text-brand-teal mx-auto mb-8 lg:mb-12 opacity-30 w-10 lg:w-16" />
          <h3 className="text-2xl md:text-4xl lg:text-6xl font-kids font-bold text-brand-ink leading-tight italic">
            "At Auvia, we don't just treat symptoms. We build foundations for a lifetime of independence, connection, and joy."
          </h3>
          <div className="mt-12 lg:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Clinical Professional Image */}
            <img 
               src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200" 
               alt="Clinical Director" 
               className="w-14 h-14 lg:w-16 lg:h-16 rounded-full object-cover border-2 border-brand-teal" 
               referrerPolicy="no-referrer"
            />
            <div className="text-center sm:text-left">
              <p className="font-bold text-brand-ink font-kids">Clinical Director</p>
              <p className="text-brand-sage text-[10px] lg:text-sm font-bold tracking-widest uppercase">BCBA-D SPECIALIST</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};