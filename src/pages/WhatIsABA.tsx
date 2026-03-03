import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } }
};

export const WhatIsABA = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  return (
    <div className="bg-[#F8FBFA] selection:bg-brand-teal/20 text-[#1F2937] font-sans overflow-x-hidden">
      
      {/* 1. HERO: The Science of Behavior */}
      <section className="relative pt-44 pb-32 px-6 lg:px-12 bg-gradient-to-b from-[#E0F7FA] via-white to-[#F8FBFA]">
        <div className="absolute top-20 -right-20 w-[600px] h-[600px] bg-brand-mint/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
          
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2 bg-[#E1F5FE] text-[#0288D1] rounded-full text-sm font-bold uppercase tracking-widest mb-8 border border-[#0288D1]/10">
               <Microscope size={16} /> Science-Based Intervention
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-6xl lg:text-8xl font-kids font-bold text-brand-ink mb-10 leading-[0.9] tracking-tight">
              What is <br /><span className="text-brand-teal italic">ABA Therapy?</span>
            </motion.h1>
            
            <motion.div variants={fadeInUp} className="space-y-6 text-xl text-brand-sage font-medium leading-relaxed max-w-xl mb-12">
              <p>
                Applied Behavior Analysis (ABA) is an evidence-based scientific discipline focused on understanding and improving significant behaviors.
              </p>
              <p>
                As a pioneer in autism services for over 25 years, we utilize ABA to help children reach milestones in communication, social interaction, and self-help skills.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-5">
              <Link to="/contact" className="bg-brand-teal text-white px-10 py-5 rounded-[22px] font-kids font-bold text-xl hover:bg-[#3d7a6f] transition-all shadow-2xl flex items-center gap-3 group">
                Find ABA Care <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <a href="tel:8554648559" className="flex items-center gap-3 text-brand-ink font-bold px-8 py-5 rounded-[22px] bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <ShieldCheck size={20} className="text-brand-teal" /> Insurance Verification
              </a>
            </motion.div>
          </motion.div>

          {/* High-End Visual with Signature Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }}
            className="relative"
          >
            <div className="rounded-[60px] lg:rounded-[80px] overflow-hidden border-[16px] border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] relative z-10">
              <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80" alt="ABA therapy engagement" className="w-full aspect-[4/5] lg:aspect-[5/6] object-cover" />
            </div>
            
            <motion.div 
              initial={{ y: 40, opacity: 0, rotate: 0 }} 
              animate={{ y: 0, opacity: 1, rotate: 6 }} 
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute -bottom-10 -right-4 lg:-right-12 bg-[#E0F2F1] p-10 lg:p-14 rounded-[50px] shadow-3xl max-w-sm border-8 border-white z-20"
            >
               <p className="font-kids font-bold text-2xl lg:text-3xl text-brand-teal italic leading-tight text-center">
                 "Science that prioritizes your child's joy."
               </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. THE ABC MODEL: The Foundation */}
      <section className="py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl lg:text-7xl font-kids font-bold text-brand-ink mb-8">How ABA <span className="text-brand-teal italic">Works.</span></h2>
            <p className="text-2xl text-brand-sage max-w-3xl mx-auto font-medium">ABA looks at how the environment affects a person's behavior using the "ABC" model:</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { letter: "A", title: "Antecedent", desc: "What happens directly before a behavior occurs.", color: "bg-[#E0F2F1]" },
              { letter: "B", title: "Behavior", desc: "The action or response that follows the antecedent.", color: "bg-[#E1F5FE]" },
              { letter: "C", title: "Consequence", desc: "What happens directly after the behavior, often using reinforcement.", color: "bg-[#F3E5F5]" }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -15 }} className="bg-[#FCFAF7] p-16 rounded-[60px] border border-gray-50 text-center shadow-sm">
                <div className={`w-28 h-28 ${item.color} rounded-full flex items-center justify-center mx-auto mb-10 border-4 border-white shadow-lg`}>
                   <span className="text-5xl font-kids font-bold text-brand-teal">{item.letter}</span>
                </div>
                <h3 className="text-3xl font-kids font-bold mb-6">{item.title}</h3>
                <p className="text-xl text-brand-sage font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* 3. NEW SECTION: 7 Dimensions of ABA */}
      <section className="py-32 bg-[#FCFAF7] rounded-[100px] mx-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl lg:text-7xl font-kids font-bold text-brand-ink mb-8">7 Dimensions <br /><span className="text-brand-teal italic">of ABA.</span></h2>
            <p className="text-2xl text-brand-sage max-w-4xl mx-auto font-medium leading-relaxed">
              ABA therapy focuses on seven key concepts that ensure support is based on solid research and effective treatment.
            </p>
          </div>

          {/* Detailed Generalization Focus Card */}
          <div className="bg-white p-12 lg:p-20 rounded-[80px] shadow-xl border border-gray-100 mb-16 flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/3">
              <div className="w-24 h-24 bg-brand-mint/20 rounded-3xl flex items-center justify-center text-brand-teal mb-8">
                <Share2 size={48} />
              </div>
              <h3 className="text-4xl font-kids font-bold mb-6">Generalization</h3>
              <div className="inline-block px-4 py-1 bg-brand-teal text-white rounded-lg text-sm font-bold uppercase tracking-widest">Dimension 01</div>
            </div>
            <div className="lg:w-2/3 space-y-6 text-xl text-brand-sage font-medium leading-relaxed">
              <p>The generalization concept involves children using what they learn during ABA sessions in various settings and situations.</p>
              <p>When children learn to generalize, therapists run various simulations to see how new skills help when interacting with diverse people, in different settings, and during specific times.</p>
              <p className="p-6 bg-brand-mint/10 rounded-3xl border-l-8 border-brand-teal text-brand-ink">"Understanding generalization helps children with autism become more successful in their daily lives."</p>
            </div>
          </div>

          {/* Grid for Other Dimensions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Effective", icon: <Target />, desc: "Focuses on interventions that produce meaningful changes in a child's life." },
              { title: "Technological", icon: <Settings />, desc: "Procedures are described clearly enough for anyone to replicate them accurately." },
              { title: "Applied", icon: <UserCheck />, desc: "Addresses behaviors that are socially significant and important to the family." },
              { title: "Conceptually Systematic", icon: <BookOpen />, desc: "Interventions are consistent with established behavioral principles." },
              { title: "Analytic", icon: <Search />, desc: "Data is used to make decisions and prove that an intervention is working." },
              { title: "Behavioral", icon: <Activity />, desc: "Focuses on measurable, observable actions that need improvement." }
            ].map((dim, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }} className="p-10 bg-white rounded-[50px] border border-gray-50 shadow-sm flex flex-col gap-6">
                <div className="w-16 h-16 bg-[#E1F5FE] rounded-2xl flex items-center justify-center text-brand-teal">
                  {React.cloneElement(dim.icon as React.ReactElement, { size: 32 })}
                </div>
                <h4 className="text-2xl font-kids font-bold text-brand-ink">{dim.title}</h4>
                <p className="text-lg text-brand-sage font-medium">{dim.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* 4. NEW SECTION: Skills ABA Therapy Can Help Address */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center mb-24">
            <motion.div 
              initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-6xl lg:text-7xl font-kids font-bold text-brand-ink mb-10 leading-tight">
                Mastering <br /><span className="text-brand-teal italic">New Skills.</span>
              </h2>
              <p className="text-2xl text-brand-sage font-medium leading-relaxed mb-8">
                Children with autism benefit from ABA by acquiring skills that help them function at home, in school, and in the community.
              </p>
              <div className="p-8 bg-brand-mint/10 rounded-[40px] border-l-8 border-brand-teal">
                <p className="text-xl font-bold text-brand-ink">
                  "ABA providers use practical methods and compassionate care to help your child develop milestones that lead to long-term success."
                </p>
              </div>
            </motion.div>
            
            <div className="lg:w-1/2 relative">
               <div className="rounded-[80px] overflow-hidden shadow-3xl border-[16px] border-[#FCFAF7] rotate-2">
                 <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1000" alt="Child Learning Success" className="w-full aspect-square object-cover" />
               </div>
            </div>
          </div>

          <motion.div 
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { title: "Communication & Language", icon: <MessageCircle />, items: ["Language development", "Gives related answers", "Interacting with others"], color: "bg-[#E0F2F1]" },
              { title: "Social & Play", icon: <Users />, items: ["Social skills", "Meaningful play", "Participating in activities"], color: "bg-[#E1F5FE]" },
              { title: "Daily Living & Self-Care", icon: <Baby />, items: ["Daily living skills", "Self-care routines", "Interacting in grocery stores/parks"], color: "bg-[#F3E5F5]" },
              { title: "Emotional & Behavioral", icon: <Heart />, items: ["Emotional understanding", "Self-management", "Stress management"], color: "bg-[#FFF9C4]" },
              { title: "Academic & Attention", icon: <BookText />, items: ["Academic readiness", "Attention and focus", "School readiness skills"], color: "bg-[#E8F5E9]" },
              { title: "Safety & Behavior Support", icon: <ShieldAlert />, items: ["Safety awareness", "Managing aggression", "Self-injury reduction"], color: "bg-[#FFEBEE]" }
            ].map((skill, i) => (
              <motion.div 
                key={i} variants={fadeInUp} whileHover={{ y: -10 }}
                className="p-10 rounded-[60px] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className={`w-20 h-20 ${skill.color} rounded-3xl flex items-center justify-center text-brand-teal mb-8`}>
                  {React.cloneElement(skill.icon as React.ReactElement, { size: 36 })}
                </div>
                <h3 className="text-2xl font-kids font-bold text-brand-ink mb-6">{skill.title}</h3>
                <ul className="space-y-3">
                  {skill.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-brand-sage font-medium">
                      <CheckCircle2 className="text-brand-teal shrink-0" size={18} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* 5. NEW SECTION: Teaching Life Skills to Children With Autism */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Soft background decorative element */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-brand-lavender/10 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <motion.h2 
              initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}
              className="text-5xl lg:text-7xl font-kids font-bold text-brand-ink mb-8 leading-tight"
            >
              Foundations for <br /><span className="text-brand-teal italic">Independence.</span>
            </motion.h2>
            <p className="text-2xl text-brand-sage max-w-3xl mx-auto font-medium leading-relaxed">
              ABA therapy uses scientific techniques to help children develop basic skills for a successful, independent life.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Image Side with Floating Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-[80px] overflow-hidden shadow-3xl border-[16px] border-[#FCFAF7]">
                <img 
                  src="https://images.unsplash.com/photo-1544281679-6a31c33f2115?w=1000&q=80" 
                  alt="Child practicing life skills" 
                  className="w-full aspect-[4/5] object-cover" 
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-brand-lavender p-10 rounded-[50px] text-white shadow-2xl max-w-xs rotate-3 border-8 border-white">
                 <p className="font-kids font-bold text-xl italic">"Practice at home helps build a foundation for life."</p>
              </div>
            </motion.div>

            {/* Life Skills Grid */}
            <div className="space-y-12">
              <div className="space-y-6">
                <h3 className="text-4xl font-kids font-bold text-brand-ink">Everyday Milestones.</h3>
                <p className="text-xl text-brand-sage font-medium leading-relaxed">
                  The work we do during sessions helps children function better at home, in school, and in public spaces like the grocery store.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: "Potty Training", icon: <Bath />, color: "bg-[#E0F2F1]" },
                  { title: "Self-Care & Grooming", icon: <Shirt />, color: "bg-[#F3E5F5]" },
                  { title: "Routine Adherence", icon: <Clock />, color: "bg-[#FFF9C4]" },
                  { title: "Basic Chores", icon: <Utensils />, color: "bg-[#E1F5FE]" },
                  { title: "Initiating Conversations", icon: <Speech />, color: "bg-[#E8F5E9]" },
                  { title: "Connecting with Peers", icon: <Users2 />, color: "bg-[#FFEBEE]" }
                ].map((skill, i) => (
                  <motion.div 
                    key={i} whileHover={{ x: 10 }}
                    className="flex items-center gap-4 p-6 bg-[#FCFAF7] rounded-3xl border border-gray-100 shadow-sm transition-all"
                  >
                    <div className={`w-12 h-12 ${skill.color} rounded-xl flex items-center justify-center text-brand-teal shrink-0 shadow-sm`}>
                      {React.cloneElement(skill.icon as React.ReactElement, { size: 24 })}
                    </div>
                    <span className="font-bold text-lg text-brand-ink">{skill.title}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
                <Link to="/services" className="inline-flex items-center gap-3 text-brand-teal font-kids font-bold text-2xl group">
                  See How We Can Help 
                  <span className="w-12 h-12 rounded-full border-2 border-brand-teal flex items-center justify-center group-hover:bg-brand-teal group-hover:text-white transition-all">
                    <ArrowRight />
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NEW SECTION: Transitioning into ABA Therapy (Bright Beginnings) */}
      <section className="py-32 bg-[#FCFAF7] rounded-[100px] mx-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <motion.div 
              initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-brand-peach/20 text-brand-peach rounded-full text-sm font-bold uppercase tracking-widest mb-6"
            >
               <Sunrise size={16} /> Bridging the Gap
            </motion.div>
            <h2 className="text-5xl lg:text-7xl font-kids font-bold text-brand-ink mb-8 leading-tight">
              Bright <span className="text-brand-teal italic">Beginnings.</span>
            </h2>
            <p className="text-2xl text-brand-sage max-w-4xl mx-auto font-medium leading-relaxed">
              We created the Bright Beginnings initiative to guide and support your family as you transition into regular ABA therapy.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Feature Cards Group */}
            <motion.div 
              variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                { 
                  title: "Foundational Skill Building", 
                  desc: "Get a head start on the essential skills your child will learn during their full ABA journey.", 
                  icon: <Brain /> 
                },
                { 
                  title: "Center Familiarization", 
                  desc: "Helping your child feel comfortable and safe in our environment before regular sessions begin.", 
                  icon: <Layout /> 
                },
                { 
                  title: "Weekly BCBA Training", 
                  desc: "One-hour meetings with a BCBA to provide parent training and answer your clinical questions.", 
                  icon: <Clock /> 
                }
              ].map((item, i) => (
                <motion.div 
                  key={i} variants={fadeInUp}
                  className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex gap-6 items-start hover:shadow-md transition-all"
                >
                  <div className="w-14 h-14 bg-brand-mint/20 rounded-2xl flex items-center justify-center text-brand-teal shrink-0">
                    {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-brand-ink mb-2">{item.title}</h3>
                    <p className="text-lg text-brand-sage font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Context Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-brand-ink p-12 lg:p-16 rounded-[60px] text-white relative overflow-hidden"
            >
              <Sunrise className="absolute top-0 right-0 opacity-10 -mr-16 -mt-16" size={300} />
              <div className="relative z-10">
                <h3 className="text-4xl font-kids font-bold mb-8">Early Learning, Early Success.</h3>
                <div className="space-y-6 text-xl text-white/70 font-medium leading-relaxed mb-10">
                  <p>
                    This program ensures your child is ready for full sessions while they wait for their official start dates.
                  </p>
                  <p>
                    Once full ABA therapy begins, their time in Bright Beginnings ends, leaving them prepared for the road ahead.
                  </p>
                </div>
                <Link to="/locations" className="inline-flex items-center gap-3 bg-brand-mint text-brand-ink px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white transition-all group">
                  Find a Location <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* 4. FAQ: CLINICAL ANSWERS */}
      <section className="py-40 max-w-5xl mx-auto px-6">
        <h2 className="text-5xl lg:text-7xl font-kids font-bold text-brand-ink mb-20 text-center">Your Questions.</h2>
        <div className="space-y-6">
          {[
            { q: "What treatment options are available?", a: "Behavioral interventions, such as Applied Behavior Analysis (ABA), are the most effective treatment options for individuals with ASD. ABA helps develop daily living, social, and communication skills." },
            { q: "Is ABA scientific?", a: "Yes. ABA is a scientific discipline that strives to understand and improve significant behaviors through data collection and progress monitoring." },
            { q: "Who provides ABA therapy?", a: "Treatment is delivered by Registered Behavior Technicians (RBTs) under the supervision of Board Certified Behavior Analysts (BCBAs)." }
          ].map((faq, index) => (
            <div key={index} className="bg-white rounded-[45px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
              <button onClick={() => setOpenFAQ(openFAQ === index ? null : index)} className="w-full flex items-center justify-between p-10 text-left font-bold text-2xl font-kids">
                {faq.q}
                <motion.div animate={{ rotate: openFAQ === index ? 180 : 0 }} className="text-brand-teal"><ChevronDown size={32} /></motion.div>
              </button>
              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    <div className="px-10 pb-10 text-xl text-brand-sage border-t border-gray-50 pt-8 whitespace-pre-line">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto text-center">
        <div className="bg-brand-teal rounded-[80px] p-20 lg:p-32 text-white relative overflow-hidden shadow-3xl">
          <FlaskConical className="absolute top-10 left-10 opacity-20" size={120} />
          <h2 className="text-6xl lg:text-8xl font-kids font-bold mb-10 relative z-10 leading-tight">Join the Family.</h2>
          <p className="text-2xl lg:text-3xl opacity-90 mb-16 max-w-3xl mx-auto relative z-10 font-medium">
            Join thousands of families who have experienced the Auvia Kids difference in science-backed care.
          </p>
          <Link to="/contact" className="inline-block bg-white text-brand-teal px-16 py-7 rounded-[24px] font-kids font-bold text-3xl hover:bg-brand-mint transition-all shadow-xl relative z-10">
            Book an Assessment
          </Link>
        </div>
      </section>

    </div>
  );
};