import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, CheckCircle, ArrowRight, Calendar, Users, Target, Heart,
  BookOpen, Clock, Star, ChevronDown, ChevronUp, Phone, Mail, Download
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const ParentGuide = () => {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const timeline = [
    {
      week: "Week 1–2",
      phase: "Initial Assessment",
      color: "bg-brand-peach",
      textColor: "text-brand-peach",
      borderColor: "border-brand-peach/30",
      icon: <Target size={20} className="text-white" />,
      description: "Your child meets with a Board Certified Behavior Analyst (BCBA) for a comprehensive evaluation of their current skills, behaviors, and goals.",
      steps: [
        "Schedule your intake call with our care coordinator",
        "Gather diagnosis paperwork and insurance card",
        "Complete the parent questionnaire about your child's strengths & needs",
        "Attend the in-person or telehealth assessment session",
        "Discuss initial observations with the BCBA"
      ]
    },
    {
      week: "Week 3–4",
      phase: "Treatment Plan Design",
      color: "bg-brand-teal",
      textColor: "text-brand-teal",
      borderColor: "border-brand-teal/30",
      icon: <FileText size={20} className="text-white" />,
      description: "Your BCBA creates a customized Behavior Intervention Plan (BIP) and skill acquisition programs tailored specifically to your child.",
      steps: [
        "BCBA reviews assessment findings with your family",
        "Collaborative goal-setting session with parents/guardians",
        "Insurance authorization is submitted by our team",
        "Therapist matching begins — finding your child's ideal RBT",
        "Review and sign the treatment plan"
      ]
    },
    {
      week: "Week 5–6",
      phase: "Therapist Introduction",
      color: "bg-brand-mint",
      textColor: "text-brand-ink",
      borderColor: "border-brand-mint/40",
      icon: <Users size={20} className="text-white" />,
      description: "Your child meets their primary Registered Behavior Technician (RBT) and begins gentle, play-based introduction sessions.",
      steps: [
        "Meet your child's dedicated RBT therapist",
        "Familiarization sessions in the therapy environment",
        "Pairing phase — building positive rapport with your child",
        "Parent training session #1 with your BCBA",
        "Establish communication preferences with your care team"
      ]
    },
    {
      week: "Week 7–12",
      phase: "Active Therapy Begins",
      color: "bg-brand-ink",
      textColor: "text-white",
      borderColor: "border-brand-ink/20",
      icon: <Star size={20} className="text-brand-teal" />,
      description: "Full therapy sessions begin. Your child works on skill acquisition goals daily while you receive weekly progress updates and parent coaching.",
      steps: [
        "Full ABA session schedule begins (typically 20–40 hrs/week)",
        "Weekly data reports shared via parent portal",
        "Monthly BCBA supervision and parent conference",
        "Celebrate first milestone achievements!",
        "30-day progress review and goal adjustment"
      ]
    }
  ];

  const checklistItems = {
    "Before Day 1": [
      "Autism diagnosis letter from physician/psychologist",
      "Insurance card (front and back)",
      "Photo ID for parent/guardian",
      "List of current medications",
      "Previous therapy records (if applicable)",
      "Completed intake forms (sent via email)",
      "Emergency contact information"
    ],
    "What to Expect at the Center": [
      "Bright, sensory-friendly environment",
      "Dedicated therapy room for your child",
      "Observation window for parents",
      "Snack area and calm-down corner",
      "Secure entry system for child safety",
      "Parent waiting area with Wi-Fi"
    ],
    "Questions to Ask Your BCBA": [
      "What are my child's top 3 priority goals?",
      "How will I see progress at home?",
      "What can I do during therapy at home?",
      "How often will the plan be updated?",
      "How do you handle challenging behaviors?",
      "What does a typical therapy session look like?"
    ]
  };

  const faqs = [
    {
      q: "How many hours of therapy does my child need?",
      a: "This varies based on your child's assessment. Most children receive between 15–40 hours per week. Your BCBA will recommend the appropriate intensity based on your child's individual needs and goals."
    },
    {
      q: "Can I watch therapy sessions?",
      a: "Yes! We encourage parent observation through our one-way observation windows or viewing cameras. Parental involvement is a cornerstone of ABA — you will also receive regular parent training sessions."
    },
    {
      q: "What if my child has a hard time at first?",
      a: "An adjustment period is completely normal and expected. Our therapists are trained to make the environment feel safe and fun. The 'pairing phase' in the first 2 weeks focuses entirely on building a positive relationship before any demands are introduced."
    },
    {
      q: "How long will my child need ABA therapy?",
      a: "Every child's journey is unique. Some children meet their goals in 1–2 years; others continue longer. Progress is reviewed monthly and we always aim to transition children to less intensive support as they develop skills."
    },
    {
      q: "How do I know therapy is working?",
      a: "We provide weekly data reports tracking every skill goal. You will see clear, measurable progress over time. Monthly parent conferences give you a full picture of where your child is and where they're heading."
    }
  ];

  const tips = [
    { icon: <Heart size={20} />, tip: "Celebrate every win, no matter how small. Progress in ABA is incremental — every step counts." },
    { icon: <Clock size={20} />, tip: "Consistency is key. Try to maintain similar routines at home to reinforce skills your child learns in therapy." },
    { icon: <BookOpen size={20} />, tip: "Attend all parent training sessions. The skills you learn will accelerate your child's progress dramatically." },
    { icon: <Users size={20} />, tip: "Connect with other ABA families. Our parent community events are a wonderful source of support and shared wisdom." },
    { icon: <Star size={20} />, tip: "Trust the process. ABA is evidence-based with 60+ years of research. Results come with time and consistency." }
  ];

  return (
    <div className="pt-20 lg:pt-24 pb-20 lg:pb-32 bg-[#FCFAF7] min-h-screen overflow-x-hidden">
      <SEO
        title="New Family Guide — Your First 90 Days | Auvia"
        description="Everything you need to know about starting ABA therapy at Auvia. A comprehensive guide for new families covering the first 90 days, what to expect, and how to prepare."
        keywords="aba therapy guide, new family aba, first day aba therapy, auvia family guide, autism therapy what to expect"
        canonicalUrl="https://auviatherapy.com/parent-guide"
      />

      {/* Background */}
      <div className="blob-bg w-[500px] h-[500px] bg-brand-mint/15 top-[-5%] right-[-10%]" />
      <div className="blob-bg w-[400px] h-[400px] bg-brand-peach/20 bottom-[10%] left-[-10%]" />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-peach/20 text-brand-ink text-xs font-bold uppercase tracking-widest mb-6">
            <FileText size={14} className="text-brand-peach" />
            New Family Guide
          </div>
          <h1 className="text-display font-kids font-bold text-brand-ink mb-6 leading-tight">
            Your First <span className="text-brand-teal italic">90 Days.</span>
          </h1>
          <p className="text-xl text-brand-sage font-medium leading-relaxed max-w-2xl mx-auto mb-10">
            Everything you need to know about starting your child's ABA therapy journey at Auvia. No surprises — just clarity, warmth, and a clear path forward.
          </p>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-3 bg-brand-ink text-white px-8 py-4 rounded-2xl font-kids font-bold text-lg hover:bg-brand-teal transition-all shadow-xl group"
          >
            <Download size={20} className="group-hover:animate-bounce" />
            Print / Save as PDF
          </button>
        </motion.div>

        {/* 90-Day Timeline */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-section font-kids font-bold text-brand-ink mb-3">Your 90-Day Roadmap</h2>
            <p className="text-brand-sage font-medium">Four phases. Clear milestones. A supportive team every step of the way.</p>
          </div>
          <div className="space-y-6">
            {timeline.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-[36px] border ${phase.borderColor} overflow-hidden shadow-sm`}
              >
                <button
                  className="w-full p-8 text-left flex items-center gap-6"
                  onClick={() => setOpenSection(openSection === index ? null : index)}
                >
                  <div className={`w-14 h-14 ${phase.color} rounded-2xl flex items-center justify-center shrink-0`}>
                    {phase.icon}
                  </div>
                  <div className="flex-1">
                    <span className={`text-xs font-bold uppercase tracking-widest ${phase.textColor}`}>{phase.week}</span>
                    <h3 className="text-2xl font-kids font-bold text-brand-ink">{phase.phase}</h3>
                    <p className="text-brand-sage font-medium text-sm mt-1">{phase.description}</p>
                  </div>
                  <div className="text-brand-sage">
                    {openSection === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>
                {openSection === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-8 pb-8 border-t border-gray-50"
                  >
                    <ul className="space-y-3 mt-6">
                      {phase.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle size={18} className="text-brand-teal shrink-0 mt-0.5" />
                          <span className="text-brand-sage font-medium">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Checklists */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-section font-kids font-bold text-brand-ink mb-3">Your Preparation Checklists</h2>
            <p className="text-brand-sage font-medium">Be ready. Feel confident. We've got you covered.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(checklistItems).map(([title, items], index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[32px] p-8 border border-brand-teal/5 shadow-sm"
              >
                <h3 className="text-lg font-kids font-bold text-brand-ink mb-5">{title}</h3>
                <ul className="space-y-3">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={15} className="text-brand-teal shrink-0 mt-0.5" />
                      <span className="text-brand-sage font-medium text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Parent Tips */}
        <section className="mb-24">
          <div className="bg-brand-mint/20 rounded-[48px] p-10 md:p-14 border border-brand-mint/30">
            <h2 className="text-section font-kids font-bold text-brand-ink mb-3 text-center">5 Tips from Experienced ABA Parents</h2>
            <p className="text-brand-sage font-medium text-center mb-10">Wisdom from families who've been on this journey before you.</p>
            <div className="space-y-5">
              {tips.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-white rounded-2xl p-5"
                >
                  <div className="w-10 h-10 bg-brand-teal rounded-xl flex items-center justify-center text-white shrink-0">
                    {item.icon}
                  </div>
                  <p className="text-brand-sage font-medium leading-relaxed">{item.tip}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-section font-kids font-bold text-brand-ink mb-3">Frequently Asked Questions</h2>
            <p className="text-brand-sage font-medium">The questions every new family asks — answered honestly.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-8 rounded-3xl border border-brand-teal/5 shadow-sm"
              >
                <h4 className="text-xl font-kids font-bold text-brand-ink mb-3">{faq.q}</h4>
                <p className="text-brand-sage font-medium leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brand-ink rounded-[48px] p-10 md:p-16 text-white text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal/20 blur-[100px] rounded-full -mr-48 -mt-48" />
          <div className="relative z-10">
            <h2 className="text-section font-kids font-bold mb-4">Ready to Begin?</h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Our care coordinators are ready to answer every question and guide you through enrollment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 bg-brand-teal text-white px-10 py-5 rounded-2xl font-kids font-bold text-lg hover:bg-white hover:text-brand-teal transition-all shadow-xl"
              >
                Start Enrollment <ArrowRight size={20} />
              </Link>
              <a
                href="tel:9457581087"
                className="inline-flex items-center justify-center gap-3 bg-white/10 text-white px-10 py-5 rounded-2xl font-kids font-bold text-lg hover:bg-white/20 transition-all"
              >
                <Phone size={20} /> (945) 758-1087
              </a>
            </div>
            <p className="text-white/40 text-sm mt-6">We typically respond within 1 business day.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
