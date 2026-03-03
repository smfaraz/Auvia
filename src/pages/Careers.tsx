import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Heart, Zap, Users, ArrowRight, Smile, Star, Shield, Coffee, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Careers = () => {
  const navigate = useNavigate();
  const [locationFilter, setLocationFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const benefits = [
    {
      icon: <GraduationCap />,
      title: "Clinical Excellence",
      text: "We provide industry-leading training, regular BCBA supervision, and a clear path for your professional growth including RBT certification support.",
      color: "bg-brand-mint"
    },
    {
      icon: <Heart />,
      title: "Meaningful Impact",
      text: "Join a mission-driven team where you'll see the direct results of your work as children reach life-changing milestone moments.",
      color: "bg-brand-peach"
    },
    {
      icon: <Zap />,
      title: "Total Rewards",
      text: "Competitive salary, comprehensive health/dental/vision, 401(k) matching, and generous PTO to ensure you stay refreshed.",
      color: "bg-brand-lavender"
    },
    {
      icon: <Smile />,
      title: "Joyful Environment",
      text: "Work in bright, engaging sanctuaries designed for play and progress. We believe a happy team leads to happy children.",
      color: "bg-brand-sky"
    }
  ];

  const values = [
    { icon: <Heart size={24} />, title: "Compassionate Care", text: "We lead with empathy, treating every child and teammate with the kindness they deserve." },
    { icon: <Shield size={24} />, title: "Clinical Integrity", text: "Our decisions are rooted in evidence-based practices and the highest ethical standards." },
    { icon: <Users size={24} />, title: "Collaborative Spirit", text: "We are a family. We share knowledge, celebrate wins, and support each other through challenges." },
    { icon: <Sun size={24} />, title: "Relentless Optimism", text: "We believe in the potential of every child and the power of a positive mindset." }
  ];

  const testimonials = [
    {
      name: "Jessica Miller",
      role: "Senior RBT",
      quote: "Auvia Kids isn't just a workplace; it's a community. The support I receive from my BCBA has helped me grow more in one year than I did in three years elsewhere.",
      image: "https://picsum.photos/seed/staff1/200/200"
    },
    {
      name: "David Thompson",
      role: "BCBA",
      quote: "The focus on clinical quality over quantity is what sets us apart. I have the time and resources to truly personalize care for every child on my caseload.",
      image: "https://picsum.photos/seed/staff2/200/200"
    }
  ];

  const openings = [
    {
      title: "Board Certified Behavior Analyst (BCBA)",
      location: "Dallas Sanctuary",
      type: "Full-Time",
      description: "Lead a team of RBTs, develop personalized treatment plans, and provide family guidance in our state-of-the-art center.",
      color: "bg-brand-mint"
    },
    {
      title: "Registered Behavior Technician (RBT)",
      location: "Fort Worth Retreat",
      type: "Full-Time",
      description: "Work 1:1 with children to implement behavior plans through play-based therapy and celebrate daily milestone moments.",
      color: "bg-brand-peach"
    },
    {
      title: "Clinical Director",
      location: "Plano Haven",
      type: "Full-Time",
      description: "Oversee clinical operations, mentor BCBAs, and ensure the highest standards of care across our Plano sanctuary.",
      color: "bg-brand-lavender"
    },
    {
      title: "Center Administrator",
      location: "Frisco Oasis",
      type: "Full-Time",
      description: "The heart of our center operations. Manage scheduling, insurance coordination, and welcome families with a smile.",
      color: "bg-brand-sky"
    }
  ];

  return (
    <div className="pt-48 pb-32 bg-brand-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="blob-bg w-[500px] h-[500px] bg-brand-mint bottom-[-10%] left-[-10%]" />

        {/* Hero Section */}
        <div className="max-w-4xl mb-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-teal text-sm font-bold uppercase tracking-widest mb-6 block font-kids">Careers at Auvia Kids</span>
            <h1 className="text-6xl lg:text-7xl font-kids font-bold text-brand-ink mb-10 leading-tight">
              A Supportive Team, <br />
              <span className="text-brand-teal italic">A Happy Family.</span>
            </h1>
            <p className="text-xl text-brand-sage font-medium leading-relaxed max-w-2xl">
              Join a team that celebrates neurodiversity. We provide a calm, supportive environment where you can help children thrive while growing your own career.
            </p>
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-40 relative z-10">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-friendly h-full"
            >
              <div className={`w-16 h-16 rounded-[24px] ${benefit.color} text-brand-teal flex items-center justify-center mb-10 shadow-sm`}>
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-kids font-bold text-brand-ink mb-6">{benefit.title}</h3>
              <p className="text-brand-sage leading-relaxed font-medium">{benefit.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Culture & Values */}
        <div className="mb-40 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-kids font-bold text-brand-ink mb-12 leading-tight">Our Culture is Rooted in <span className="text-brand-teal italic">Our Values.</span></h2>
              <div className="grid sm:grid-cols-2 gap-8">
                {values.map((value, i) => (
                  <div key={i} className="space-y-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-teal shadow-sm">
                      {value.icon}
                    </div>
                    <h4 className="text-xl font-kids font-bold text-brand-ink">{value.title}</h4>
                    <p className="text-brand-sage font-medium text-sm leading-relaxed">{value.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-[60px] overflow-hidden shadow-2xl rotate-2">
                <img src="https://picsum.photos/seed/culture/800/1000" alt="Team culture" className="w-full aspect-[4/5] object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-brand-peach p-8 rounded-[40px] shadow-xl max-w-xs border-4 border-white">
                <p className="text-brand-ink font-kids font-bold text-lg mb-2">Team First</p>
                <p className="text-brand-sage text-sm font-medium">We believe that taking care of our team is the first step in taking care of our families.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-40 relative z-10">
          <h2 className="text-4xl lg:text-5xl font-kids font-bold text-brand-ink mb-16 text-center">Hear From <span className="text-brand-teal italic">Our Team.</span></h2>
          <div className="grid md:grid-cols-2 gap-12">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-12 rounded-[48px] shadow-lg border border-brand-teal/5 relative">
                <div className="flex items-center gap-6 mb-8">
                  <img src={t.image} alt={t.name} className="w-20 h-20 rounded-3xl object-cover shadow-md" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="text-2xl font-kids font-bold text-brand-ink">{t.name}</h4>
                    <p className="text-brand-teal font-bold text-sm uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
                <p className="text-brand-sage text-lg font-medium leading-relaxed italic">"{t.quote}"</p>
                <div className="absolute top-8 right-12 text-brand-teal/10">
                  <Smile size={80} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Job Openings */}
        <div className="mb-40 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl lg:text-5xl font-kids font-bold text-brand-ink mb-6 leading-tight">Current Opportunities</h2>
              <p className="text-brand-sage font-medium text-lg">Find your place in our growing family. We're looking for passionate individuals to join us in Dallas, Fort Worth, Plano, and Frisco.</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setLocationFilter(locationFilter === 'all' ? 'clinical' : 'all')} className={`px-6 py-2 rounded-full font-bold text-sm shadow-sm border transition-all ${locationFilter === 'all' ? 'bg-brand-teal text-white border-brand-teal' : 'bg-white text-brand-teal border-brand-teal/5 hover:border-brand-teal'}`}>All Locations</button>
              <button onClick={() => setRoleFilter(roleFilter === 'all' ? 'clinical' : 'all')} className={`px-6 py-2 rounded-full font-bold text-sm shadow-sm border transition-all ${roleFilter === 'clinical' ? 'bg-brand-teal text-white border-brand-teal' : 'bg-white text-brand-teal border-brand-teal/5 hover:border-brand-teal'}`}>Clinical Roles</button>
            </div>
          </div>

          <div className="space-y-6">
            {openings.map((job, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="flex flex-col lg:flex-row justify-between lg:items-center p-10 bg-white border border-brand-teal/5 rounded-[40px] shadow-lg hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="mb-8 lg:mb-0 lg:max-w-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-2xl font-kids font-bold text-brand-ink group-hover:text-brand-teal transition-colors duration-500">{job.title}</h3>
                    <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${job.color} text-brand-teal`}>{job.type}</span>
                  </div>
                  <p className="text-brand-sage font-medium mb-4 leading-relaxed">{job.description}</p>
                  <div className="flex gap-6 text-sm font-bold text-brand-sage/60 font-kids">
                    <span className="flex items-center gap-2"><Star size={14} className="text-brand-teal" /> {job.location}</span>
                  </div>
                </div>
                <button onClick={() => navigate('/contact')} className="btn-friendly-primary py-4 px-10 flex items-center justify-center gap-3 whitespace-nowrap">
                  Apply Now <ArrowRight size={20} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resume Drop */}
        <div className="bg-brand-teal rounded-[60px] p-16 lg:p-32 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-5xl lg:text-6xl font-kids font-bold mb-10 leading-tight">
              A Warm <br />
              <span className="text-brand-peach italic">Career Path.</span>
            </h2>
            <p className="text-white/80 text-xl mb-16 font-medium">
              If you don't see a role that matches your expertise, we invite you to share your resume for future consideration within our sanctuaries.
            </p>
            <a href="mailto:careers@auviakids.com?subject=Resume%20Submission" className="inline-block bg-white text-brand-teal px-16 py-6 rounded-[24px] font-kids font-bold hover:bg-brand-peach hover:text-white transition-all duration-300 shadow-xl">
              Send Your Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
