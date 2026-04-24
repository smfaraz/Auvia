import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Heart, 
  Shield, 
  ClipboardList, 
  Users, 
  ArrowRight, 
  FileText,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ParentHelpCenter = () => {
  const resources = [
    {
      title: "Understanding Autism",
      description: "Learn about the signs, strengths, and unique developmental paths of autism.",
      icon: <Sparkles className="text-brand-peach" />,
      link: "/what-is-autism",
      bgColor: "bg-brand-peach/5"
    },
    {
      title: "ABA Therapy Explained",
      description: "Discover how Applied Behavior Analysis creates meaningful changes in daily life.",
      icon: <Heart className="text-brand-teal" />,
      link: "/what-is-aba",
      bgColor: "bg-brand-teal/5"
    },
    {
      title: "Insurance & Coverage",
      description: "Navigate plans, state requirements, and financial assistance options.",
      icon: <Shield className="text-brand-mint" />,
      link: "/insurance-financial-assistance",
      bgColor: "bg-brand-mint/5"
    },
    {
      title: "Enrollment Process",
      description: "A step-by-step guide on how to begin your child's journey at Auvia.",
      icon: <ClipboardList className="text-brand-ink" />,
      link: "/contact",
      bgColor: "bg-gray-50"
    }
  ];

  const faqs = [
    {
      q: "How do I know if my child needs ABA?",
      a: "If your child has an autism diagnosis and struggles with communication, social interactions, or challenging behaviors, ABA can help develop essential life skills."
    },
    {
      q: "What age should we start therapy?",
      a: "Early intervention (ages 2-6) typically yields the most significant results, but ABA is effective for individuals of all ages."
    },
    {
      q: "Is ABA covered by my insurance?",
      a: "Most major insurance providers cover ABA therapy. We handle the verification process for you during intake."
    }
  ];

  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="blob-bg w-[500px] h-[500px] bg-brand-mint/20 top-[-10%] right-[-10%]" />
      <div className="blob-bg w-[400px] h-[400px] bg-brand-peach/20 bottom-[10%] left-[-10%]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-teal/10 text-brand-teal text-xs font-bold uppercase tracking-widest mb-6"
          >
            <BookOpen size={14} />
            Knowledge is Empowerment
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-kids font-bold text-brand-ink mb-8 leading-tight"
          >
            Parent <span className="text-brand-teal italic">Help Center.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-brand-sage font-medium leading-relaxed"
          >
            Explore our curated resources designed to guide you through diagnosis, 
            therapy options, and the everyday joys of parenting.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {resources.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={item.link} className={`group block h-full p-8 rounded-[40px] ${item.bgColor} border border-transparent hover:border-brand-teal/20 transition-all hover:shadow-xl`}>
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
                </div>
                <h3 className="text-2xl font-kids font-bold text-brand-ink mb-4 group-hover:text-brand-teal transition-colors">
                  {item.title}
                </h3>
                <p className="text-brand-sage font-medium leading-relaxed mb-6">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 text-brand-teal font-bold text-sm">
                  Learn more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Therapy Experience Section */}
        <section className="mb-32">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-brand-mint/10 rounded-[50px] p-10 md:p-14 border border-brand-mint/20">
              <h2 className="text-3xl font-kids font-bold text-brand-ink mb-6">What is Autism Like?</h2>
              <p className="text-brand-sage text-lg mb-8 leading-relaxed">
                Autism is a spectrum of unique neurobiological differences. For children, it often means 
                experiencing the world with heightened sensitivity, incredible focus on interests, 
                and distinct ways of communicating and socializing. 
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 font-bold text-brand-teal">
                  <div className="w-2 h-2 rounded-full bg-brand-teal" /> 
                  Sensory-rich experiences
                </li>
                <li className="flex items-center gap-3 font-bold text-brand-teal">
                  <div className="w-2 h-2 rounded-full bg-brand-teal" /> 
                  Visual learning strengths
                </li>
                <li className="flex items-center gap-3 font-bold text-brand-teal">
                  <div className="w-2 h-2 rounded-full bg-brand-teal" /> 
                  Unique social perspectives
                </li>
              </ul>
              <Link to="/what-is-autism" className="text-brand-teal font-bold flex items-center gap-2 hover:underline">
                Deep dive into the spectrum <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="bg-brand-peach/10 rounded-[50px] p-10 md:p-14 border border-brand-peach/20">
              <h2 className="text-3xl font-kids font-bold text-brand-ink mb-6">What is ABA Therapy Like?</h2>
              <p className="text-brand-sage text-lg mb-8 leading-relaxed">
                At Auvia, ABA therapy is playful, positive, and collaborative. Your child works 
                1-on-1 with a dedicated therapist in our "Sensory Sanctuary" centers, where 
                learning feels like play and every small win is celebrated.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 font-bold text-brand-peach">
                  <div className="w-2 h-2 rounded-full bg-brand-peach" /> 
                  Play-based learning sessions
                </li>
                <li className="flex items-center gap-3 font-bold text-brand-peach">
                  <div className="w-2 h-2 rounded-full bg-brand-peach" /> 
                  Skill building through success
                </li>
                <li className="flex items-center gap-3 font-bold text-brand-peach">
                  <div className="w-2 h-2 rounded-full bg-brand-peach" /> 
                  Families are partners in care
                </li>
              </ul>
              <Link to="/what-is-aba" className="text-brand-peach font-bold flex items-center gap-2 hover:underline">
                See our approach in action <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Guide Section */}
        <section className="bg-brand-ink rounded-[60px] p-8 md:p-16 text-white mb-32 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal/20 blur-[100px] rounded-full -mr-48 -mt-48" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-brand-peach text-xs font-bold uppercase tracking-widest mb-6">
                <FileText size={14} />
                New Family Guide
              </div>
              <h2 className="text-4xl md:text-5xl font-kids font-bold mb-8">What to expect in your <span className="text-brand-teal italic">first 90 days.</span></h2>
              <p className="text-white/70 text-lg mb-10 leading-relaxed max-w-xl">
                The early stages of ABA therapy can feel overwhelming. We've created a comprehensive 
                onboarding guide to help you understand the assessment phase, therapist matching, 
                and initial goal setting.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-4 bg-brand-teal text-white px-10 py-5 rounded-2xl font-kids font-bold text-xl hover:bg-[#3d7a6f] transition-all shadow-lg active:scale-95">
                Download Guide <ArrowRight />
              </Link>
            </div>
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-xl rounded-[40px] p-8 border border-white/10">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-brand-peach rounded-xl flex items-center justify-center shrink-0">
                      <Users className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Family Success Roadmap</p>
                      <p className="text-white/60 text-sm">Week 1: Initial Assessment & Observation</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-brand-teal rounded-xl flex items-center justify-center shrink-0">
                      <MessageCircle className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Personalized Matching</p>
                      <p className="text-white/60 text-sm">Week 2: BCBA & RBT Introduction</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-kids font-bold text-brand-ink mb-4">Common Questions</h2>
            <p className="text-brand-sage font-medium">Quick answers to help you navigate your options.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-brand-teal/5 shadow-sm"
              >
                <h4 className="text-xl font-kids font-bold text-brand-ink mb-3">{faq.q}</h4>
                <p className="text-brand-sage font-medium leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
