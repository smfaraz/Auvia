import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, ArrowRight, CheckCircle2, 
  Users, Activity, ShieldCheck, Heart, Star, Phone, Sparkles, Brain, MessageCircle, Eye, Compass, Stethoscope, Layers, Lightbulb
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } }
};

export const WhatIsAutism = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const spectrumPillars = [
    {
      id: "social-communication",
      title: "Social Communication",
      accent: "& Interaction.",
      content: "Autism involves unique ways of processing and expressing communication. Children may show differences in verbal expression, non-verbal cues, shared attention, or conversational reciprocity.",
      highlight: "Every autistic individual communicates—our role is to understand, support, and expand their natural communication style.",
      bgColor: "bg-[#F8FBFA]",
      icon: <MessageCircle className="text-brand-teal" size={48} />,
      items: [
        { title: "Joint Attention & Eye Contact Variations", icon: <Eye size={24} /> },
        { title: "Expressive & Receptive Language Patterns", icon: <MessageCircle size={24} /> },
        { title: "Social Interaction & Shared Play", icon: <Users size={24} /> }
      ]
    },
    {
      id: "sensory-processing",
      title: "Sensory Processing",
      accent: "& Regulation.",
      content: "Autistic individuals often experience sensory inputs—such as sound, light, texture, or motion—with heightened sensitivity (hyper-reactivity) or reduced sensitivity (hypo-reactivity).",
      highlight: "Creating sensory-safe environments allows children to regulate their nervous systems and engage comfortably with learning.",
      bgColor: "bg-brand-mint/10",
      icon: <Activity className="text-brand-teal" size={48} />,
      items: [
        { title: "Auditory & Visual Sensitivities", icon: <Sparkles size={24} /> },
        { title: "Proprioceptive & Vestibular Needs", icon: <Compass size={24} /> },
        { title: "Self-Regulation & Calming Strategies", icon: <Heart size={24} /> }
      ]
    },
    {
      id: "strengths-levels",
      title: "DSM-5 Support",
      accent: "Levels & Strengths.",
      content: "Under the DSM-5, autism is recognized across three support levels tailored to daily functional needs, while honoring each child's innate strengths and cognitive abilities.",
      bgColor: "bg-brand-teal text-white",
      icon: <Layers className="text-brand-mint" size={48} />,
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
    <div className="bg-[#F8FBFA] selection:bg-brand-teal/20 text-[#1F2937] font-sans overflow-x-hidden">
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
      <section className="relative min-h-[85vh] flex items-center pt-20 overflow-hidden bg-[#F8FBFA]">
        <div 
          className="absolute inset-0 z-0"
          style={{ 
            backgroundImage: `url('/images/kids-hero.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center', 
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#F8FBFA]/90 via-[#F8FBFA]/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/5 z-0" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-20">
          <div className="max-w-2xl">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeInUp} className="backdrop-blur-[2px] bg-white/20 p-4 sm:p-6 rounded-[32px] -ml-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 border border-brand-teal/20 backdrop-blur-sm rounded-full text-[11px] font-extrabold text-brand-ink uppercase tracking-wider mb-4 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
                  Clinically Reviewed by BCBA-D Specialists
                </div>
                <motion.h1 className="text-display font-kids font-bold text-brand-ink mb-6 leading-[1] tracking-tight">
                  Understanding <span className="text-brand-teal italic">Autism.</span>
                </motion.h1>
                
                <div className="space-y-4 text-small-heading text-brand-ink font-semibold leading-relaxed mb-10 drop-shadow-sm">
                  <p>
                    Autism Spectrum Disorder (ASD) is a complex neurodevelopmental profile that encompasses a rich spectrum of communication, social, and sensory experiences.
                  </p>
                  <p className="text-brand-teal border-l-4 border-brand-mint pl-6 italic font-bold">
                    "Every child's developmental path is unique, capable, and full of potential."
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <Link to="/contact" className="bg-brand-teal text-white px-8 lg:px-10 py-4 lg:py-5 rounded-full font-bold text-lg lg:text-xl hover:bg-brand-ink transition-all shadow-xl hover:-translate-y-1 flex items-center gap-3 group">
                    Find Specialized Care <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <a href="tel:9457581087" className="flex items-center gap-3 text-brand-ink font-extrabold group">
                    <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center group-hover:bg-brand-mint/20 transition-colors border border-brand-mint/20">
                      <Phone size={20} className="text-brand-teal" />
                    </div>
                    <span className="text-lg">(945) 758-1087</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. THREE CORE PILLARS - Diagnostic Domains */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 lg:mb-24">
            <h2 className="text-section font-kids font-bold text-brand-ink mb-6 leading-tight">
              The Three Core <span className="text-brand-teal italic">Domains of ASD.</span>
            </h2>
            <p className="text-xl lg:text-2xl text-brand-sage max-w-3xl mx-auto font-medium">
              Under clinical diagnostic guidelines (DSM-5), autism is evaluated across three interrelated developmental areas.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {[
              { 
                title: "Social Communication", 
                icon: <MessageCircle size={40} />, 
                desc: "Variations in verbal and non-verbal language, conversational turn-taking, shared attention, and emotional reciprocity.",
                iconBg: "bg-brand-mint/20",
              },
              { 
                title: "Sensory Processing", 
                icon: <Activity size={40} />, 
                desc: "Heightened or reduced sensitivity to environmental sounds, textures, lights, and body awareness cues.",
                iconBg: "bg-[#F3E5F5]",
              },
              { 
                title: "Repetitive & Focused Interests", 
                icon: <Brain size={40} />, 
                desc: "Passionate focus on specific topics, preference for predictable routines, and comforting repetitive motor movements.",
                iconBg: "bg-brand-peach/20",
              }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ backgroundColor: "#FCFAF7" }}
                whileHover={{ 
                  y: -15,
                  backgroundColor: "#111827",
                  borderColor: "rgba(255,255,255,0.05)"
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="p-10 lg:p-14 rounded-[48px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden flex flex-col justify-between"
              >
                <div className="relative z-10">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-300 ${item.iconBg} text-brand-teal group-hover:text-white`}>
                    {React.cloneElement(item.icon, { size: 36 })}
                  </div>
                  
                  <h3 className="text-2xl font-kids font-bold mb-4 text-brand-ink group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-base lg:text-lg text-brand-sage font-medium leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DEEP DIVE: Clinical Understanding of the Spectrum */}
      <div className="relative">
        {spectrumPillars.map((section, index) => (
          <section 
            key={section.id} 
            className={`sticky top-0 min-h-screen py-20 flex items-center justify-center overflow-hidden px-6 lg:px-12 ${section.bgColor}`}
            style={{ zIndex: index + 1 }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 0.05, scale: 1 }}
              transition={{ duration: 1 }}
              className="absolute -right-20 -bottom-20 pointer-events-none"
            >
              <Brain size={600} />
            </motion.div>

            <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="mb-6">{section.icon}</div>
                <h2 className="text-display font-kids font-bold mb-8 leading-tight text-brand-ink">
                  {section.title} <br />
                  <span className={`${section.id === 'strengths-levels' ? 'text-brand-mint' : 'text-brand-teal'} italic`}>
                    {section.accent}
                  </span>
                </h2>
                <p className={`text-xl lg:text-2xl font-medium leading-relaxed opacity-90 max-w-xl ${section.id === 'strengths-levels' ? 'text-white' : 'text-brand-sage'}`}>
                  {section.content}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {section.highlight && (
                  <div className="bg-white p-8 lg:p-10 rounded-[40px] shadow-xl border-l-[10px] border-brand-teal mb-6">
                    <p className="text-xl lg:text-2xl font-kids font-bold text-brand-ink italic leading-relaxed">
                      "{section.highlight}"
                    </p>
                  </div>
                )}

                {section.items && (
                  <div className="space-y-4">
                    {section.items.map((item, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ x: 15 }}
                        className="bg-white p-6 lg:p-7 rounded-[32px] shadow-md flex items-center gap-5 border border-gray-50"
                      >
                        <div className="w-12 h-12 rounded-xl bg-brand-teal text-white flex items-center justify-center shrink-0">
                          {item.icon}
                        </div>
                        <span className="text-lg lg:text-xl font-kids font-bold text-brand-ink">{item.title}</span>
                      </motion.div>
                    ))}
                  </div>
                )}

                {section.goals && (
                  <div className="grid grid-cols-1 gap-4">
                    {section.goals.map((goal, i) => (
                      <div key={i} className="bg-white/10 backdrop-blur-md p-6 rounded-[32px] border border-white/20 flex items-center gap-4">
                        <CheckCircle2 size={28} className="text-brand-mint shrink-0" />
                        <span className="text-lg lg:text-xl font-bold text-white">{goal}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </section>
        ))}
      </div>

      {/* 4. IDENTIFYING EARLY SIGNS CHECKLIST */}
      <section className="relative py-24 lg:py-32 bg-brand-ink text-white rounded-[60px] lg:rounded-[100px] mx-4 lg:mx-6 my-12 overflow-hidden">
        <motion.div 
          animate={{ y: [0, -40, 0], rotate: [0, 20, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-[5%] text-brand-mint z-0 pointer-events-none"
        >
          <Brain size={200} />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-16 items-center relative z-10">
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-brand-mint rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                <Lightbulb size={14} /> Developmental Milestones
              </div>
              <h2 className="text-section font-kids font-bold leading-tight">
                Early Indicators <br />
                <span className="text-brand-mint italic">& Developmental Signs.</span>
              </h2>
              <p className="text-lg lg:text-xl text-white/70 font-medium mt-4">
                Recognizing developmental differences between ages 18 months and 3 years is the most critical window for early intervention.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
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
                  className="flex items-center gap-3.5 bg-white/5 p-5 rounded-[24px] border border-white/10 backdrop-blur-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-mint/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-brand-mint" size={18} />
                  </div>
                  <span className="font-bold text-sm lg:text-base leading-tight">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-[60px] overflow-hidden border-[10px] border-white/5 shadow-3xl bg-brand-ink">
              <img 
                src="/images/autism-therapy.jpg" 
                alt="Developmental assessment and support" 
                className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-700" 
              />
            </div>
            
            <div className="absolute -bottom-8 -right-2 bg-brand-mint text-brand-ink px-8 py-4 rounded-[32px] font-kids font-bold text-xl shadow-2xl z-20 border-4 border-brand-ink flex items-center gap-2">
              Early Intervention Matters <Heart fill="currentColor" size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE PATH TO DIAGNOSIS */}
      <section className="py-24 lg:py-32 bg-brand-mint/10 rounded-[60px] lg:rounded-[100px] mx-4 lg:mx-6 my-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-brand-teal text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                <Stethoscope size={16} /> Diagnostic Navigation
              </div>
              <h2 className="text-section font-kids font-bold text-brand-ink mb-8 leading-tight">
                Navigating the Path to <br /><span className="text-brand-teal italic">a Formal Evaluation.</span>
              </h2>
              <p className="text-xl text-brand-sage font-medium leading-relaxed max-w-2xl">
            A deep-dive into the science, signs, and strengths of Autism Spectrum Disorder — written for families, by clinicians.
          </p>
          <p className="text-sm text-brand-sage/70 font-medium mt-4 max-w-2xl italic">
            A note on language: This page uses person-first language (e.g., "child with autism") as a clinical default, following guidance from the American Academy of Pediatrics (AAP, 2025). We also respect identity-first language (e.g., "autistic child"), preferred by many in the autistic community. We honor each family's individual preference.
          </p>
              <div className="space-y-6 text-lg text-brand-sage font-medium leading-relaxed">
                <p>
                  Obtaining a formal clinical diagnosis from a licensed developmental pediatrician or clinical psychologist is the key that unlocks in-network insurance coverage for Applied Behavior Analysis.
                </p>
                <div className="p-8 bg-white rounded-[32px] border-2 border-dashed border-brand-teal/20 relative">
                  <Sparkles className="absolute -top-4 -right-4 text-brand-teal" size={28} />
                  <p className="text-brand-ink font-bold mb-2 italic text-lg">
                    "You don't have to navigate diagnostic waitlists alone."
                  </p>
                  <p className="text-sm text-brand-sage">
                    Our care coordination team connects your family directly with credentialed diagnostic providers, streamlining the referral and assessment process.
                  </p>
                </div>
                <p>
                  Standardized evaluation tools such as the ADOS-2 (Autism Diagnostic Observation Schedule, Second Edition) are frequently utilized by developmental clinicians during comprehensive diagnostic evaluations.
                </p>
              </div>
              
              <div className="mt-10">
                <Link to="/contact" className="inline-flex items-center gap-3 bg-brand-ink text-white px-8 py-4 rounded-2xl font-kids font-bold text-lg hover:bg-brand-teal transition-all shadow-xl group">
                  Connect with Our Care Team <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="relative">
            <div className="rounded-[60px] overflow-hidden shadow-3xl border-[12px] border-white">
              <img 
                src="/images/kids-diagnosis.jpg" 
                alt="Clinical assessment support and guidance" 
                className="w-full aspect-square object-cover" 
              />
            </div>
            <div className="absolute top-8 -left-6 bg-white p-6 rounded-[32px] shadow-xl border border-gray-100 max-w-[220px]">
              <p className="text-brand-teal font-kids font-bold text-base leading-tight">Clinical Diagnostic Referral Network</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CLINICAL FAQ */}
      <section className="py-24 lg:py-32 max-w-5xl mx-auto px-6">
        <h2 className="text-section font-kids font-bold text-brand-ink mb-16 text-center">
          Autism Guidance: <span className="text-brand-teal">Frequently Asked Questions.</span>
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
              <button 
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full flex items-center justify-between p-8 text-left font-bold text-xl font-kids hover:text-brand-teal transition-colors"
              >
                {faq.question}
                <motion.div animate={{ rotate: openFAQ === index ? 180 : 0 }} className="text-brand-teal shrink-0 ml-4">
                  <ChevronDown size={28} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    <div className="px-8 pb-8 text-base lg:text-lg text-brand-sage font-medium border-t border-gray-50 pt-6 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CALL TO ACTION */}
      <section className="py-16 lg:py-24 px-6 lg:px-12 max-w-7xl mx-auto text-center">
        <div className="bg-brand-teal rounded-[48px] lg:rounded-[80px] p-12 lg:p-24 text-white relative overflow-hidden shadow-3xl">
          <Sparkles className="absolute top-8 left-8 opacity-20" size={100} />
          <h2 className="text-display font-kids font-bold mb-6 relative z-10 leading-tight">
            Every Milestone Begins with a Step.
          </h2>
          <p className="text-lg lg:text-xl opacity-90 mb-10 max-w-2xl mx-auto relative z-10 font-medium">
            Whether your child has a formal diagnosis or you are exploring early signs, our compassionate clinicians are here to support your family.
          </p>
          <Link to="/contact" className="inline-block bg-white text-brand-teal px-12 py-5 rounded-[20px] font-kids font-bold text-xl lg:text-2xl hover:bg-brand-mint hover:text-brand-ink transition-all shadow-xl relative z-10">
            Schedule a Consultation
          </Link>
        </div>
      </section>

      {/* 8. CLINICAL REFERENCES & BIBLIOGRAPHY */}
      <section className="py-20 max-w-5xl mx-auto px-6 border-t border-brand-teal/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-brand-teal/10 flex items-center justify-center text-brand-teal">
            <Users size={16} />
          </div>
          <span className="text-brand-teal text-xs font-bold uppercase tracking-widest">Clinical References</span>
        </div>
        <h3 className="text-2xl font-kids font-bold text-brand-ink mb-4">Scientific & Clinical Consensus</h3>
        <p className="text-brand-sage text-sm mb-6 font-medium">
          Auvia Behavior Centers adheres to the diagnostic consensus established by the American Academy of Pediatrics (AAP), the CDC, and the American Psychiatric Association DSM-5-TR.
        </p>
        <ul className="space-y-3 text-xs font-medium text-gray-500 list-decimal pl-5 leading-relaxed">
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
  );
};