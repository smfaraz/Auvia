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
      
      {/* 1. EDITORIAL HERO: Consulting Layout */}
      <section className="relative pt-44 pb-32 px-6 lg:px-12 bg-gradient-to-b from-[#E0F2F1] via-white to-[#F8FBFA]">
        <div className="absolute top-20 -right-20 w-[600px] h-[600px] bg-brand-mint/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
          
          {/* Left Side: Educational Content Card */}
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2 bg-[#F3E5F5] text-[#7B1FA2] rounded-full text-sm font-bold uppercase tracking-widest mb-8 border border-[#7B1FA2]/10">
               <Brain size={16} /> Understanding Autism Spectrum Disorder
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-6xl lg:text-8xl font-kids font-bold text-brand-ink mb-10 leading-[0.9] tracking-tight">
              About <br /><span className="text-brand-teal italic">Autism.</span>
            </motion.h1>
            
            <motion.div variants={fadeInUp} className="space-y-6 text-xl text-brand-sage font-medium leading-relaxed max-w-xl mb-12">
              <p>
                Autism Spectrum Disorder (ASD) is a complex condition that includes a wide range of social and communication skills.
              </p>
              <p>
                As a pioneer in autism services for over 25 years, Auvia Kids provides center-based ABA therapy to help children reach their full potential.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-5">
              <Link to="/contact" className="bg-brand-teal text-white px-10 py-5 rounded-[22px] font-kids font-bold text-xl hover:bg-[#3d7a6f] transition-all shadow-2xl flex items-center gap-3 group">
                Find ABA Care <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <a href="tel:8554648559" className="flex items-center gap-3 text-brand-ink font-bold px-8 py-5 rounded-[22px] bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <Phone size={20} className="text-brand-teal" /> 855-464-8559
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side: Consultation Imagery & Floating Quote */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }}
            className="relative"
          >
            <div className="rounded-[60px] lg:rounded-[80px] overflow-hidden border-[16px] border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000" 
                alt="ABA Specialist consulting parents" 
                className="w-full aspect-[4/5] lg:aspect-[5/6] object-cover" 
              />
            </div>
            
            <motion.div 
              initial={{ y: 40, opacity: 0, rotate: 0 }} 
              animate={{ y: 0, opacity: 1, rotate: 6 }} 
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute -bottom-10 -right-4 lg:-right-12 bg-[#E0F2F1] p-10 lg:p-14 rounded-[50px] shadow-3xl max-w-sm border-8 border-white z-20"
            >
               <p className="font-kids font-bold text-2xl lg:text-4xl text-brand-teal italic leading-tight text-center">
                 "Unlocking unique potential."
               </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. THREE CORE PILLARS */}
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
                color: "bg-brand-mint/20"
              },
              { 
                title: "Communication", 
                icon: <MessageCircle size={40} />, 
                desc: "Challenges with verbal and non-verbal language development and social reciprocity.",
                color: "bg-[#F3E5F5]"
              },
              { 
                title: "Behavior Patterns", 
                icon: <Activity size={40} />, 
                desc: "Repetitive body movements and restricted interests or strict adherence to routines.",
                color: "bg-brand-peach/20"
              }
            ].map((item, i) => (
              <motion.div 
                key={i} whileHover={{ y: -20 }}
                className="bg-[#FCFAF7] p-16 rounded-[60px] border border-gray-50 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-brand-teal mb-10 ${item.color}`}>
                  {item.icon}
                </div>
                <h3 className="text-3xl font-kids font-bold mb-6 text-brand-ink">{item.title}</h3>
                <p className="text-xl text-brand-sage font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE SIGNS CHECKLIST */}
      <section className="py-32 bg-brand-ink text-white rounded-[100px] mx-6">
        <div className="max-w-7xl mx-auto px-12 grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
            <h2 className="text-5xl lg:text-7xl font-kids font-bold leading-tight">Identifying <br /><span className="text-brand-mint italic">the Signs.</span></h2>
            <p className="text-2xl text-white/70 font-medium">Early symptoms often appear before age three. Common signs include:</p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                "Speech delay", "Repetitive movements", "Little eye contact", 
                "Sensory sensitivity", "Preference for solitude", "Strict routine"
              ].map((sign, i) => (
                <motion.div 
                  key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 bg-white/5 p-6 rounded-3xl border border-white/10"
                >
                  <CheckCircle2 className="text-brand-mint shrink-0" size={24} />
                  <span className="font-bold text-xl">{sign}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative">
             <div className="rounded-[80px] overflow-hidden border-8 border-white/10 shadow-3xl">
                <img src="https://images.unsplash.com/photo-1594608661623-aa0bd3a69d9d?w=800" alt="Child Learning" className="w-full h-full object-cover aspect-[4/5]" />
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/60 to-transparent" />
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
            Book an Assessment
          </Link>
        </div>
      </section>

    </div>
  );
};