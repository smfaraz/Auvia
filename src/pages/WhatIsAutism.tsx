import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, ArrowRight, CheckCircle2, 
  Users, Activity, ShieldCheck, Heart, Star, Phone, Sparkles, UserPlus, Brain, MessageCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } }
};

export const WhatIsAutism = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const sections = [
    {
      id: "intro",
      title: "What is",
      accent: "ABA?",
      content: "Applied Behavior Analysis (ABA) is a therapy based on the science of learning and behavior. It focuses on understanding how behavior works and how learning occurs in real-life situations.",
      highlight: "The goal is to increase helpful behaviors and build essential communication and social abilities.",
      bgColor: "bg-[#F8FBFA]",
      icon: <Brain className="text-brand-teal" size={48} />
    },
    {
      id: "purpose",
      title: "Why ABA",
      accent: "Therapy?",
      content: "ABA helps individuals build skills that improve independence. We don't focus on changing who a person is, but on empowering them with tools for success.",
      items: [
        { title: "Independence", icon: <ShieldCheck size={24} /> },
        { title: "Personalized Support", icon: <Heart size={24} /> },
        { title: "Real-World Impact", icon: <Star size={24} /> }
      ],
      bgColor: "bg-brand-mint/10"
    },
    {
      id: "goals",
      title: "Therapy",
      accent: "Goals.",
      content: "We target the specific developmental milestones that matter most to your child's daily growth and community participation.",
      goals: [
        "Communication & Language",
        "Social Interaction",
        "Daily Living Skills",
        "Attention & Focus"
      ],
      bgColor: "bg-brand-teal text-white"
    }
  ];
  const faqData = [
    {
      question: "What is Autism Spectrum Disorder?",
      answer: "Autism, or ASD, is a developmental condition that affects communication and behavior. It is referred to as a 'spectrum' because symptoms and support needs vary significantly between individuals."
    },
    {
      question: "What causes Autism?",
      answer: "There is no single known cause. Most research indicates that autism is caused by differences in brain structure or function, with genetics and environment playing key roles."
    },
    {
      question: "When should I seek a diagnosis?",
      answer: "Early identification is essential. The onset of symptoms typically occurs before age three, and early intervention can lead to the best long-term developmental outcomes."
    }
  ];

  return (
    <div className="bg-[#F8FBFA] selection:bg-brand-teal/20 text-[#1F2937] font-sans overflow-x-hidden">
      {/* 1. HERO SECTION: Premium Cinematic Fade */}
{/* 1. HERO SECTION: Translucent Premium Fade */}
<section className="relative min-h-[85vh] flex items-center pt-20 overflow-hidden bg-[#F8FBFA]">
  
  {/* -- THE BACKGROUND IMAGE -- */}
  <div 
    className="absolute inset-0 z-0"
    style={{ 
      backgroundImage: `url('https://autism.org/wp-content/uploads/2020/08/AdobeStock_127567756-scaled.jpeg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center', 
    }}
  >
    {/* -- UPDATED TRANSLUCENT FADE -- */}
    {/* Changes:
        1. Changed 'from' to 80% opacity so the image is visible behind the text.
        2. Added a 40% stop to allow the image to start showing clearly much earlier.
    */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#F8FBFA]/80 via-[#F8FBFA]/40 to-transparent lg:to-transparent z-10" />
    
    {/* Subtle vignette to keep the edges clean */}
    <div className="absolute inset-0 bg-black/5 z-0" />
  </div>

  <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-20">
    <div className="max-w-2xl">
      
      {/* -- TEXT CONTENT -- */}
      <motion.div initial="hidden" animate="visible" variants={stagger}>
        
        {/* Added a subtle backdrop-blur to this container for ultimate premium feel */}
        <motion.div variants={fadeInUp} className="backdrop-blur-[2px] bg-white/10 p-4 rounded-[32px] -ml-4">
          <motion.h1 className="text-6xl lg:text-8xl font-kids font-bold text-brand-ink mb-8 leading-[1] tracking-tight">
            About <span className="text-brand-teal italic">Autism.</span>
          </motion.h1>
          
          <div className="space-y-6 text-xl lg:text-2xl text-brand-ink font-semibold leading-relaxed mb-12 drop-shadow-sm">
            <p>
              Autism Spectrum Disorder (ASD) is a complex condition that includes a wide range of social and communication skills.
            </p>
            <p className="text-brand-teal border-l-4 border-brand-mint pl-6 italic font-bold">
              "Seeing the world beautifully differently."
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link to="/contact" className="bg-brand-teal text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-brand-ink transition-all shadow-xl hover:-translate-y-1 flex items-center gap-3 group">
              Find ABA Care <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <a href="tel:8554648559" className="flex items-center gap-3 text-brand-ink font-extrabold group">
              <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center group-hover:bg-brand-mint/20 transition-colors border border-brand-mint/20">
                <Phone size={20} className="text-brand-teal" />
              </div>
              <span className="text-lg">855-464-8559</span>
            </a>
          </div>
        </motion.div>

      </motion.div>
    </div>
  </div>
</section>

      {/* 2. THREE CORE PILLARS - Dark & Premium Hover Cards */}
<section className="py-32 px-6 lg:px-12 bg-white">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-24">
      <h2 className="text-5xl lg:text-7xl font-kids font-bold text-brand-ink mb-8 leading-tight">
        The Autism <span className="text-brand-teal italic">Spectrum.</span>
      </h2>
      <p className="text-2xl text-brand-sage max-w-3xl mx-auto font-medium">
        Autism affects how people behave, communicate, and learn, with severity levels varying across three core areas.
      </p>
    </div>
    
    <div className="grid md:grid-cols-3 gap-10">
      {[
        { 
          title: "Social Interaction", 
          icon: <Users size={40} />, 
          desc: "Difficulty understanding social cues, making eye contact, and maintaining relationships.",
          iconBg: "bg-brand-mint/20",
        },
        { 
          title: "Communication", 
          icon: <MessageCircle size={40} />, 
          desc: "Challenges with verbal and non-verbal language development and social reciprocity.",
          iconBg: "bg-[#F3E5F5]",
        },
        { 
          title: "Behavior Patterns", 
          icon: <Activity size={40} />, 
          desc: "Repetitive body movements and restricted interests or strict adherence to routines.",
          iconBg: "bg-brand-peach/20",
        }
      ].map((item, i) => (
        <motion.div 
          key={i} 
          initial={{ backgroundColor: "#FCFAF7" }}
          whileHover={{ 
            y: -25, // Lifted higher
            backgroundColor: "#111827", // Dark Grey/Charcoal (#111827)
            borderColor: "rgba(255,255,255,0.05)"
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} // Cinematic ease
          className="p-16 rounded-[60px] border border-transparent shadow-sm hover:shadow-3xl transition-shadow duration-500 cursor-pointer group relative overflow-hidden"
        >
          {/* Subtle light accent overlay on dark background */}
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[60px]" />

          {/* Animated Icon Container */}
          <motion.div 
            whileHover={{ scale: 1.15, rotate: 3 }}
            className={`relative z-10 w-24 h-24 rounded-3xl flex items-center justify-center mb-10 transition-colors duration-500 ${item.iconBg} text-brand-teal group-hover:text-white`}
          >
            {/* Pulsing light effect behind icon on hover */}
            <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 animate-pulse transition-opacity" />
            {React.cloneElement(item.icon, { size: 48 })} {/* Slightly larger icon */}
          </motion.div>
          
          <h3 className="relative z-10 text-3xl font-kids font-bold mb-6 text-brand-ink group-hover:text-white transition-colors duration-500">{item.title}</h3>
          <p className="relative z-10 text-xl text-brand-sage font-medium leading-relaxed group-hover:text-white/80 transition-colors duration-500">
            {item.desc}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* 3. ABA CONTENT SECTION - Fullscreen Sticky Scroll with Parallax Icons */}
<div className="relative">
      {sections.map((section, index) => (
        <section 
          key={section.id} 
          className={`sticky top-0 h-screen flex items-center justify-center overflow-hidden px-6 lg:px-12 ${section.bgColor}`}
          style={{ zIndex: index + 1 }}
        >
          {/* Subtle Background Parallax Icon */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute -right-20 -bottom-20 pointer-events-none"
          >
            {section.id === "intro" ? <Brain size={600} /> : <Sparkles size={600} />}
          </motion.div>

          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Left: Animated Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="mb-6">{section.icon}</div>
              <h2 className="text-6xl lg:text-8xl font-kids font-bold mb-8 leading-tight text-brand-ink">
                {section.title} <br />
                <span className={`${section.id === 'goals' ? 'text-brand-mint' : 'text-brand-teal'} italic`}>
                  {section.accent}
                </span>
              </h2>
              <p className={`text-2xl font-medium leading-relaxed opacity-90 max-w-xl ${section.id === 'goals' ? 'text-white' : 'text-brand-sage'}`}>
                {section.content}
              </p>
            </motion.div>

            {/* Right: Floating Card Elements */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {section.highlight && (
                <div className="bg-white p-10 rounded-[60px] shadow-2xl border-l-[12px] border-brand-teal">
                  <p className="text-2xl font-kids font-bold text-brand-ink italic leading-relaxed">
                    "{section.highlight}"
                  </p>
                </div>
              )}

              {section.items && (
                <div className="space-y-6">
                  {section.items.map((item, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ x: 20 }}
                      className="bg-white p-8 rounded-[40px] shadow-lg flex items-center gap-6 border border-gray-50"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-brand-teal text-white flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="text-2xl font-kids font-bold text-brand-ink">{item.title}</span>
                    </motion.div>
                  ))}
                </div>
              )}

              {section.goals && (
                <div className="grid grid-cols-1 gap-4">
                  {section.goals.map((goal, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-md p-8 rounded-[40px] border border-white/20 flex items-center gap-6">
                      <CheckCircle2 size={32} className="text-brand-mint" />
                      <span className="text-2xl font-bold text-white">{goal}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      ))}
      
      {/* Principle Highlight (Final Reveal) */}
      <section className="relative py-40 px-6 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
           <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="bg-[#FCFAF7] p-16 lg:p-24 rounded-[80px] border-2 border-dashed border-brand-mint relative"
           >
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-brand-mint text-brand-teal rounded-full text-sm font-bold uppercase mb-8">
                <Star size={16} fill="currentColor" /> Key Principle
              </div>
              <h3 className="text-5xl lg:text-7xl font-kids font-bold text-brand-ink mb-8">Positive Reinforcement.</h3>
              <p className="text-2xl text-brand-sage font-medium leading-relaxed mb-12">
                When a desired behavior is followed by a reward, that behavior is more likely to occur again. It's the engine of learning.
              </p>
              <div className="bg-white p-10 rounded-[40px] shadow-xl inline-block max-w-2xl">
                 <p className="text-brand-teal font-bold text-2xl italic">
                   "Asking for a toy using words results in praise, making the child more likely to use words next time."
                 </p>
              </div>
           </motion.div>
        </div>
      </section>
    </div>
{/* --- END OF ABA CONTENT SECTION --- */}
     {/* 4. INTERACTIVE SIGNS CHECKLIST - Floating Free Flow */}
<section className="relative py-32 bg-brand-ink text-white rounded-[100px] mx-6 overflow-hidden">
  
  {/* -- DECORATIVE FLOATING BACKGROUND ELEMENTS -- */}
  <motion.div 
    animate={{ 
      y: [0, -40, 0], 
      rotate: [0, 20, 0],
      opacity: [0.1, 0.2, 0.1] 
    }}
    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    className="absolute top-10 left-[5%] text-brand-mint z-0 pointer-events-none"
  >
    <Brain size={200} />
  </motion.div>

  <motion.div 
    animate={{ 
      y: [0, 50, 0], 
      x: [0, 20, 0],
      rotate: [0, -15, 0] 
    }}
    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    className="absolute bottom-10 right-[5%] text-white/5 z-0 pointer-events-none"
  >
    <Sparkles size={250} />
  </motion.div>

  <div className="max-w-7xl mx-auto px-12 grid lg:grid-cols-12 gap-16 items-center relative z-10">
    
    {/* -- LEFT SIDE: Content & Floating List -- */}
    <div className="lg:col-span-6 space-y-12">
      <div className="space-y-6">
        <h2 className="text-5xl lg:text-7xl font-kids font-bold leading-tight">
          Identifying <br />
          <span className="text-brand-mint italic">the Signs.</span>
        </h2>
        <p className="text-2xl text-white/70 font-medium">
          Early symptoms often appear before age three. Common signs include:
        </p>
      </div>
      
      {/* -- THE FLOATING LIST -- */}
      <div className="grid sm:grid-cols-2 gap-6 relative">
        {[
          { text: "Speech delay", delay: 0 },
          { text: "Repetitive movements", delay: 0.5 },
          { text: "Little eye contact", delay: 1.2 },
          { text: "Sensory sensitivity", delay: 0.8 },
          { text: "Preference for solitude", delay: 1.5 },
          { text: "Strict routine", delay: 0.3 }
        ].map((item, i) => (
          <motion.div 
            key={i}
            animate={{ 
              y: [0, -12, 0],
              rotate: [0, 1, 0]
            }}
            transition={{ 
              duration: 4 + i, // Varies speed
              repeat: Infinity, 
              ease: "easeInOut",
              delay: item.delay // Desyncs the start times
            }}
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: "rgba(255,255,255,0.15)",
              zIndex: 50 
            }}
            className="flex items-center gap-4 bg-white/5 p-6 rounded-[32px] border border-white/10 backdrop-blur-sm transition-colors cursor-default shadow-xl"
          >
            <div className="w-10 h-10 rounded-full bg-brand-mint/20 flex items-center justify-center shrink-0">
               <CheckCircle2 className="text-brand-mint" size={20} />
            </div>
            <span className="font-bold text-lg leading-tight">{item.text}</span>
          </motion.div>
        ))}
      </div>
    </div>

    {/* -- RIGHT SIDE: Large Image (Occupies 6 Columns) -- */}
    <div className="lg:col-span-6 relative">
       <motion.div 
         initial={{ opacity: 0, scale: 0.9 }}
         whileInView={{ opacity: 1, scale: 1 }}
         viewport={{ once: true }}
         className="rounded-[80px] overflow-hidden border-[12px] border-white/5 shadow-3xl bg-brand-ink"
       >
          <img 
            src="https://www.kokilabenhospital.com/blog/wp-content/uploads/2025/04/Autism-Spectrum-Disorder-1.jpg" 
            alt="Autism Signs" 
            className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-700" 
          />
       </motion.div>
       
       {/* Floating Interaction Badge */}
       <motion.div 
         animate={{ y: [0, -20, 0], rotate: [-2, 2, -2] }}
         transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
         className="absolute -bottom-10 -right-4 bg-brand-mint text-brand-ink px-10 py-6 rounded-[40px] font-kids font-bold text-2xl shadow-2xl z-20 border-4 border-brand-ink"
       >
         Early Support <Heart className="inline ml-2" fill="currentColor" size={28} />
       </motion.div>
    </div>

  </div>
</section> 

      {/* 4. THE PATH TO DIAGNOSIS - New Section */}
      <section className="py-32 bg-brand-mint/10 rounded-[100px] mx-6">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-brand-teal text-white rounded-full text-xs font-bold uppercase tracking-widest mb-8">
                <ShieldCheck size={16} /> Clinical Assessments
              </div>
              <h2 className="text-5xl lg:text-7xl font-kids font-bold text-brand-ink mb-10 leading-tight">
                The Path to <br /><span className="text-brand-teal italic">Diagnosis.</span>
              </h2>
              <div className="space-y-8 text-xl text-brand-sage font-medium leading-relaxed">
                <p>
                  Obtaining a clinical diagnosis is the first step toward accessing essential ABA therapy services. Most insurance providers require a formal evaluation conducted by a licensed clinical professional.
                </p>
                <div className="p-8 bg-white rounded-[40px] border-2 border-dashed border-brand-teal/20 relative">
                  <Sparkles className="absolute -top-4 -right-4 text-brand-teal" size={32} />
                  <p className="text-brand-ink font-bold mb-4 italic">
                    "We're here to help you navigate this step."
                  </p>
                  <p className="text-base text-brand-sage">
                    We will help to connect you to resources to get your child evaluated and get a diagnosis report.
                  </p>
                </div>
                <p>
                  An ADOS-2 (Autism Diagnostic Observation Schedule) is the gold standard for diagnosing autism, providing a clear picture of your child's unique developmental profile.
                </p>
              </div>
              
              <div className="mt-12">
                <Link to="/contact" className="inline-flex items-center gap-3 bg-brand-ink text-white px-10 py-5 rounded-2xl font-kids font-bold text-xl hover:bg-brand-teal transition-all shadow-xl group">
                  Get Diagnosis Resources <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="relative">
            <div className="rounded-[80px] overflow-hidden shadow-3xl border-[16px] border-white">
              <img 
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1000" 
                alt="Clinical assessment support" 
                className="w-full aspect-square object-cover" 
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute top-10 -left-10 bg-white p-8 rounded-[40px] shadow-2xl border border-gray-100 max-w-[200px] rotate-[-5deg]">
               <p className="text-brand-teal font-kids font-bold text-lg leading-tight">Expert Referral Network</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLINICAL FAQ */}
      <section className="py-40 max-w-5xl mx-auto px-6">
        <h2 className="text-5xl lg:text-7xl font-kids font-bold text-brand-ink mb-20 text-center">Your Questions, <span className="text-brand-teal">Answered.</span></h2>
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white rounded-[45px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
              <button 
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full flex items-center justify-between p-10 text-left font-bold text-2xl font-kids hover:text-brand-teal transition-colors"
              >
                {faq.question}
                <motion.div animate={{ rotate: openFAQ === index ? 180 : 0 }} className="text-brand-teal">
                   <ChevronDown size={32} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    <div className="px-10 pb-10 text-xl text-brand-sage font-medium border-t border-gray-50 pt-8 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto text-center">
        <div className="bg-brand-teal rounded-[80px] p-20 lg:p-32 text-white relative overflow-hidden shadow-3xl">
          <Sparkles className="absolute top-10 left-10 opacity-20" size={120} />
          <h2 className="text-6xl lg:text-8xl font-kids font-bold mb-10 relative z-10 leading-tight">Start the Journey.</h2>
          <p className="text-2xl lg:text-3xl opacity-90 mb-16 max-w-3xl mx-auto relative z-10 font-medium">
            Schedule a consultation today to learn how our individualized ABA programs can support your child's unique growth.
          </p>
          <Link to="/contact" className="inline-block bg-white text-brand-teal px-16 py-7 rounded-[24px] font-kids font-bold text-3xl hover:bg-brand-mint hover:text-brand-ink transition-all shadow-xl relative z-10">
            Book a Consultation
          </Link>
        </div>
      </section>

    </div>
  );
};