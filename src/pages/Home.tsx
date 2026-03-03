import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight, Heart, Sparkles, Smile, Sun,
  MessageCircle, Users, ChevronDown, MapPin, Cloud,
  ShieldCheck, Zap, FileText, Activity, GraduationCap,
  ClipboardCheck, Stethoscope, Search, ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { DevelopmentalTimeline } from '../components/DevelopmentalTimeline';

// Define the FAQItem component with proper prop types
const FAQItem = ({ faq, variants }: { key?: number; faq: { q: string; a: string }; variants: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={variants}
      className={`group rounded-[32px] transition-all duration-500 border ${isOpen
        ? "bg-white border-brand-teal shadow-[0_20px_50px_rgba(77,150,137,0.1)] scale-[1.02]"
        : "bg-white/50 border-gray-100 hover:border-brand-teal/30 hover:bg-white shadow-sm"
        }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-8 flex items-center justify-between text-left focus:outline-none"
      >
        <h3 className={`text-xl font-bold transition-colors duration-300 ${isOpen ? "text-brand-teal" : "text-brand-ink"
          }`}>
          {faq.q}
        </h3>
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            backgroundColor: isOpen ? "#4D9689" : "#F3F4F6",
            color: isOpen ? "#FFFFFF" : "#4D9689"
          }}
          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
        >
          <ChevronDown size={24} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 text-brand-sage text-lg leading-relaxed max-w-3xl">
              <div className="pt-4 border-t border-gray-50">
                {faq.a}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Home = () => {
  const navigate = useNavigate();
  const [activeWord, setActiveWord] = useState(0);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Form state for the interest form
  const [interestForm, setInterestForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    childDob: '', childName: '', zip: '', center: '', consent: false
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const randomSeed = useState(() => Math.floor(Math.random() * 50000))[0];
  const heroImage = `https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1000&sig=${randomSeed}`;

  const words = ["learn", "smile", "achieve", "grow", "thrive"];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % words.length);
    }, 2500);

    const handleScroll = () => setShowStickyCTA(window.scrollY > 800);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [words.length]);

  const handleSearchSubmit = () => {
    navigate('/locations', { state: { query: searchQuery } });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubmitted(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubmitted(false), 4000);
  };

  const handleInterestFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormSubmitting(false);
    setFormSubmitted(true);
    setInterestForm({
      firstName: '', lastName: '', email: '', phone: '',
      childDob: '', childName: '', zip: '', center: '', consent: false
    });
  };

  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setInterestForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
  };

  const faqs = [
    {
      q: "I think my child is showing signs of autism. Should I wait to get my child evaluated?",
      a: "It's understandable to want to trust that your child will catch up on their own, but waiting to seek an autism diagnosis can mean missing important chances for early intervention. Getting an early autism diagnosis lets your child start therapies like ABA sooner, which can improve their communication and interactions with others. Starting ABA therapy early, ideally between 18 months and 5 years, gives your child the best chance to grow and reach their goals."
    },
    {
      q: "Is ABA therapy effective for autism?",
      a: "Yes! Every autistic child is unique, and some children experience more significant progress with ABA therapy than others. However, studies show that children who receive two or more years of intensive behavioral interventions, including ABA therapy, can often participate in school and social activities at the same level as their peers."
    },
    {
      q: "Can someone help me understand my ABA insurance benefits?",
      a: "Yes. ABC has a dedicated team of insurance specialists who handle verifying your benefits, explaining deductibles, copays, and coinsurance, submitting paperwork and prior authorizations, and answering your financial questions. Our goal is to remove barriers so families can focus on milestone moments, not paperwork."
    },
    {
      q: "How can ABA therapy help my child?",
      a: "ABA therapy is personalized to meet your family's priorities. It helps children grow in communication, school readiness, behavior support, social skills, and self-care. ABC's clinical research shows strong outcomes: 86% of families report major reductions in challenging behaviors within the first year."
    },
    {
      q: "Can ABA therapy be done after school or on weekends?",
      a: "ABC centers are open Monday through Friday during regular business hours. For children ages 5–12, ABC Academy provides after-school support. Hours and locations vary by state, so families can check their local ABC Academy for details."
    }
  ];

  return (
    <div className="bg-[#FCFAF7] selection:bg-brand-teal/20 text-brand-ink font-sans">
      {/* HERO SECTION */}
      <section className="relative min-h-[95vh] flex items-center pt-24 bg-white overflow-hidden">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 text-brand-mint/40 -z-10"
        >
          <Cloud size={200} />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl lg:text-[84px] font-kids font-bold leading-[1.1] mb-8 tracking-tight">
              Where children <br /> & their families <br />
              <span className="text-brand-teal inline-flex flex-col h-[1.1em] overflow-hidden relative top-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[activeWord]}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    can {words[activeWord]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <p className="text-xl text-brand-sage mb-12 max-w-lg font-medium leading-relaxed">
              Evidence-based ABA therapy for children diagnosed with autism spectrum disorder (ASD). We prioritize joy and safety in every milestone.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="bg-white p-2.5 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-brand-teal/10 flex flex-col md:flex-row gap-2 max-w-xl group focus-within:border-brand-teal/40 transition-all hover:shadow-[0_20px_60px_rgba(77,150,137,0.15)]"
            >
              <div className="flex-1 flex items-center px-5 py-4 gap-3">
                <MapPin className="text-brand-teal group-focus-within:animate-bounce" size={22} />
                <input
                  type="text"
                  placeholder="Zip Code, City, or Center name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                  className="w-full outline-none bg-transparent font-semibold text-lg placeholder:text-gray-400"
                />
              </div>
              <button
                onClick={handleSearchSubmit}
                className="bg-brand-teal text-white px-10 py-5 rounded-[24px] font-kids font-bold text-lg flex items-center justify-center gap-3 hover:bg-[#3d7a6f] active:scale-95 transition-all"
              >
                Find center <ArrowRight size={22} />
              </button>
            </motion.div>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="rounded-[80px] overflow-hidden shadow-3xl relative z-10 border-[16px] border-white group"
            >
              <motion.img
                key={heroImage}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src={heroImage}
                alt="Children learning and growing in a warm, supportive environment"
                className="w-full aspect-[4/5] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Insurance Trust Bar */}
      <section className="py-16 bg-[#FCFAF7] border-y border-brand-teal/5">
        <div className="max-w-7xl mx-auto px-6 overflow-hidden">
          <p className="text-center text-xs font-bold text-brand-sage uppercase tracking-[0.3em] mb-10">Trusted & Accepted By</p>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
          >
            {['Aetna', 'BCBS', 'Cigna', 'Optum', 'TRICARE', 'Magellan'].map(p => (
              <motion.span key={p} variants={itemVariants} className="text-3xl font-kids font-bold text-brand-ink tracking-tighter hover:text-brand-teal transition-colors cursor-pointer">{p}</motion.span>
            ))}
            <Link to="/insurance-by-state">
              <motion.span variants={itemVariants} className="text-brand-teal font-bold text-lg hover:underline">+120 more</motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Service Blocks */}
      <section id="services" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-5xl font-kids font-bold text-brand-ink mb-6">Reach milestone <span className="text-brand-teal italic">moments.</span></h2>
            <p className="text-brand-sage text-xl leading-relaxed">Expert ABA therapy programs designed specifically for every stage of your child's development.</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-10"
          >
            {[
              { title: "Center-based Therapy", age: "18 months - 8 years", color: "bg-brand-mint", icon: <Smile />, href: "/services" },
              { title: "ABC Academy", age: "5 - 12 years", color: "bg-brand-peach", icon: <Users />, href: "/services" },
              { title: "ABC at Home", age: "18 months - 13 years", color: "bg-brand-lavender", icon: <Heart />, href: "/services" }
            ].map((card, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -15, scale: 1.02 }}
                onClick={() => navigate(card.href)}
                className="bg-[#FCFAF7] p-12 rounded-[56px] border border-brand-teal/5 shadow-sm hover:shadow-2xl transition-all group cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className={`w-16 h-16 ${card.color} rounded-[24px] flex items-center justify-center text-brand-teal mb-8`}
                >
                  {React.cloneElement(card.icon, { size: 32 })}
                </motion.div>
                <h3 className="text-2xl font-kids font-bold mb-3">{card.title}</h3>
                <p className="text-brand-teal font-bold text-sm mb-6 uppercase tracking-wider">{card.age}</p>
                <p className="text-brand-sage font-medium mb-10 leading-relaxed">Targeting social communication, self-care, and meaningful play through evidence-based practices.</p>
                <span className="flex items-center gap-2 font-kids font-bold text-brand-teal group-hover:gap-4 transition-all">
                  Learn more <ArrowRight size={20} />
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Diagnostic Navigation */}
      <section className="py-20 bg-brand-teal text-white rounded-[100px] mx-6 my-20 relative overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 p-20 opacity-10"
        >
          <Cloud size={400} />
        </motion.div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-7xl font-kids font-bold mb-16 leading-tight"
          >
            Evidence-based ABA therapy <br /> that works for your family.
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-xl p-12 rounded-[50px] border border-white/20 text-left hover:bg-white/15 transition-all group cursor-pointer">
              <h3 className="text-3xl font-kids font-bold mb-5 group-hover:text-brand-peach transition-colors">My child does not have an autism diagnosis.</h3>
              <p className="text-white/80 text-lg mb-10">We provide ADOS-2 clinical assessments to help you get the answers you need.</p>
              <button
                onClick={() => navigate('/services')}
                className="w-full bg-white text-brand-teal py-5 rounded-2xl font-bold text-xl hover:bg-brand-peach hover:text-white transition-all transform active:scale-95 shadow-lg"
              >
                Screen for autism
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white text-brand-ink p-12 rounded-[50px] text-left shadow-2xl group cursor-pointer hover:-translate-y-2 transition-transform">
              <h3 className="text-3xl font-kids font-bold mb-5 text-brand-teal">My child has an autism diagnosis.</h3>
              <p className="text-brand-sage text-lg mb-10">Start your journey today. We handle the insurance paperwork so you can focus on your child.</p>
              <button
                onClick={() => navigate('/contact')}
                className="w-full bg-brand-teal text-white py-5 rounded-2xl font-bold text-xl hover:bg-[#3d7a6f] transition-all transform active:scale-95 shadow-lg"
              >
                Get started
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Developmental Timeline */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-kids font-bold mb-20 tracking-tight">Celebrate Your <span className="text-brand-teal italic underline decoration-brand-peach underline-offset-[12px]">Big Moments.</span></h2>
          <DevelopmentalTimeline />
        </div>
      </section>

      {/* Regional State Selector */}
      <section className="py-32 bg-[#FCFAF7] rounded-t-[100px]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-6xl font-kids font-bold mb-8 italic text-brand-teal">Find care near you.</h2>
            <p className="text-2xl text-brand-sage mb-12 font-medium">With centers across 10+ states, expert care is closer than you think.</p>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {['Texas', 'Arizona', 'Colorado', 'Illinois', 'Georgia', 'Minnesota', 'North Carolina', 'Florida'].map(state => (
                <motion.button
                  key={state}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/locations', { state: { query: state } })}
                  className="flex items-center justify-between p-5 bg-white rounded-2xl border border-brand-teal/5 shadow-sm hover:border-brand-teal hover:shadow-md transition-all font-bold group"
                >
                  {state} <ArrowRight size={18} className="text-brand-teal group-hover:translate-x-1 transition-transform" />
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 relative"
          >
            <div className="rounded-[60px] overflow-hidden shadow-3xl border-[12px] border-white group">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8 }}
                src="https://picsum.photos/seed/locations/1200/900"
                alt="Auvia Kids therapy centers across the United States"
                className="w-full aspect-video object-cover"
              />
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 w-32 h-32 bg-brand-peach rounded-full flex items-center justify-center text-white font-kids font-bold text-center leading-none -rotate-12 border-4 border-white shadow-xl z-20"
            >
              100+ <br /> Centers
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why families choose ABC */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-kids font-bold text-brand-ink mb-6">Why families choose <span className="text-brand-teal">ABC</span></h2>
            <p className="text-brand-sage text-xl max-w-3xl mx-auto leading-relaxed">
              We believe families deserve clear, trustworthy information about how ABA therapy can make a meaningful difference in their children's lives.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Featured card */}
            <motion.div
              variants={itemVariants}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.08, rotate: -1 }}
              className="p-8 rounded-[40px] bg-white border-2 border-brand-teal shadow-[0_30px_60px_rgba(77,150,137,0.2)] relative z-10"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-teal text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Fastest Start
              </div>
              <div className="w-14 h-14 bg-brand-mint/30 rounded-2xl flex items-center justify-center text-brand-teal mb-6">
                <Zap size={28} fill="currentColor" />
              </div>
              <h3 className="text-2xl font-kids font-bold mb-4">Immediate access to care</h3>
              <p className="text-brand-sage mb-6 font-medium">
                Early intervention makes all the difference. With conveniently located autism therapy centers near you, your child can start ABA therapy right away.
              </p>
              <button
                onClick={() => navigate('/locations')}
                className="bg-brand-teal text-white w-full py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#3d7a6f] transition-colors"
              >
                Find an ABA center <ArrowRight size={18} />
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="p-8 rounded-[40px] bg-[#FCFAF7] border border-brand-teal/5">
              <div className="w-14 h-14 bg-brand-peach/30 rounded-2xl flex items-center justify-center text-brand-teal mb-6">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-2xl font-kids font-bold mb-4">Diagnostic support</h3>
              <p className="text-brand-sage mb-6">You don't have to wait for answers. If your child has many of the early signs of autism, we can help them get evaluated.</p>
              <button onClick={() => navigate('/services')} className="text-brand-teal font-bold flex items-center gap-2 hover:underline">Screen for autism <ArrowRight size={18} /></button>
            </motion.div>

            <motion.div variants={itemVariants} className="p-8 rounded-[40px] bg-[#FCFAF7] border border-brand-teal/5">
              <div className="w-14 h-14 bg-brand-lavender/30 rounded-2xl flex items-center justify-center text-brand-teal mb-6">
                <FileText size={28} />
              </div>
              <h3 className="text-2xl font-kids font-bold mb-4">Insurance made simple</h3>
              <p className="text-brand-sage mb-6">We accept most major plans, guide families through paperwork, and can provide financial assistance for out-of-pocket expenses.</p>
              <button onClick={() => navigate('/insurance-financial-assistance')} className="text-brand-teal font-bold flex items-center gap-2 hover:underline">Paying for ABA therapy <ArrowRight size={18} /></button>
            </motion.div>

            <motion.div variants={itemVariants} className="p-8 rounded-[40px] bg-[#FCFAF7] border border-brand-teal/5 lg:col-span-1">
              <div className="w-14 h-14 bg-brand-mint/30 rounded-2xl flex items-center justify-center text-brand-teal mb-6">
                <Activity size={28} />
              </div>
              <h3 className="text-2xl font-kids font-bold mb-4">Coordinated care</h3>
              <p className="text-brand-sage">We collaborate with your child's speech, occupational, feeding, and physical therapists to provide sessions directly in our centers. This allows your child to access other services in a familiar environment.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="p-8 rounded-[40px] bg-[#FCFAF7] border border-brand-teal/5 lg:col-span-1">
              <div className="w-14 h-14 bg-brand-peach/30 rounded-2xl flex items-center justify-center text-brand-teal mb-6">
                <Users size={28} />
              </div>
              <h3 className="text-2xl font-kids font-bold mb-4">Family Guidance</h3>
              <p className="text-brand-sage">Parents and caregivers play an important role. Every care plan includes twice-a-month sessions led by a BCBA, giving parents practical strategies for daily routines at home.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="p-8 rounded-[40px] bg-[#FCFAF7] border border-brand-teal/5 lg:col-span-1">
              <div className="w-14 h-14 bg-brand-lavender/30 rounded-2xl flex items-center justify-center text-brand-teal mb-6">
                <GraduationCap size={28} />
              </div>
              <h3 className="text-2xl font-kids font-bold mb-4">School readiness support</h3>
              <p className="text-brand-sage">Center-based ABA therapy helps children build communication, social interaction, and executive function skills. ABC Academy bridges the gap between therapy and the classroom.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Evidence-based ABA Section */}
      <section className="py-32 bg-[#FCFAF7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-kids font-bold text-brand-ink mb-8 leading-tight">
                Evidence-based <span className="text-brand-teal">ABA therapy</span> <br /> that works for your family
              </h2>
              <div className="space-y-6 text-xl text-brand-sage leading-relaxed">
                <p>
                  ABA therapy uses behavioral principles and positive reinforcement to help children diagnosed with autism develop new skills and make positive changes in their lives.
                </p>
                <p>
                  Children work closely with a dedicated team of Board Certified Behavior Analysts® (BCBAs®) and Registered Behavior Technicians® (RBTs®). Treatment is highly personalized and delivered through one-on-one, compassionate care.
                </p>
              </div>
              <Link to="/what-is-aba" className="mt-10 group flex items-center gap-3 text-brand-teal font-kids font-bold text-2xl">
                Learn more about ABA at ABC
                <span className="w-12 h-12 rounded-full border-2 border-brand-teal flex items-center justify-center group-hover:bg-brand-teal group-hover:text-white transition-all">
                  <ArrowRight />
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-[60px] overflow-hidden border-[16px] border-white shadow-2xl">
                <img src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80" alt="ABA therapy session with a child and therapist" className="w-full object-cover aspect-square" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-brand-peach p-8 rounded-[40px] text-white shadow-xl max-w-xs rotate-3">
                <p className="font-kids font-bold text-lg italic">"Compassionate care that prioritizes your child's unique journey."</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Diagnostic Next Steps Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-5xl lg:text-6xl font-kids font-bold text-brand-ink mb-6">I think my child has autism. <br /> <span className="text-brand-sage italic">What should I do next?</span></h2>
            <p className="text-brand-sage text-2xl font-medium">Not sure where to begin? Here are the next steps based on your child's current diagnostic status.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="p-12 rounded-[60px] bg-[#FCFAF7] border border-brand-teal/10 flex flex-col h-full"
            >
              <div className="inline-flex items-center gap-3 text-brand-teal font-bold mb-8 text-lg">
                <Search size={24} /> My child does not have an autism diagnosis.
              </div>

              <div className="mb-10">
                <h4 className="font-bold text-brand-ink mb-4 flex items-center gap-2"><ClipboardCheck className="text-brand-peach" /> No-cost online screening tools:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <a href="https://mchatscreen.com/" target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-2xl border border-brand-teal/10 hover:border-brand-teal transition-all text-left group block">
                    <span className="block text-xs font-bold uppercase text-brand-sage mb-1">Toddler</span>
                    <span className="font-bold text-brand-teal group-hover:underline flex items-center gap-1">Take the M-CHAT-R <ExternalLink size={14} /></span>
                  </a>
                  <a href="https://www.autismresearchcentre.com/tests/cast-test/" target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-2xl border border-brand-teal/10 hover:border-brand-teal transition-all text-left group block">
                    <span className="block text-xs font-bold uppercase text-brand-sage mb-1">Older children</span>
                    <span className="font-bold text-brand-teal group-hover:underline flex items-center gap-1">Take the CAST <ExternalLink size={14} /></span>
                  </a>
                </div>
              </div>

              <div className="flex-1">
                <h4 className="font-bold text-brand-ink mb-4 flex items-center gap-2"><Stethoscope className="text-brand-peach" /> Schedule an autism assessment</h4>
                <p className="text-brand-sage mb-6 leading-relaxed">
                  We provide leading autism evaluations for children ages 18 months to 6 years, including the ADOS-2 and IDE. Contact us to see which assessments are offered in your region.
                </p>
              </div>

              <button
                onClick={() => navigate('/services')}
                className="w-full py-5 bg-white border-2 border-brand-teal text-brand-teal rounded-3xl font-kids font-bold text-xl hover:bg-brand-teal hover:text-white transition-all"
              >
                Explore diagnostic support
              </button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="p-12 rounded-[60px] bg-brand-teal text-white flex flex-col h-full shadow-2xl"
            >
              <div className="inline-flex items-center gap-3 font-bold mb-8 text-lg">
                <Heart size={24} fill="white" /> My child has an autism diagnosis.
              </div>

              <div className="flex-1 space-y-8">
                <p className="text-white/90 text-xl leading-relaxed">
                  To get started, fill out our online interest form. A teammate from a nearby center will contact you to learn more about your family and confirm your insurance coverage. We will then schedule your center tour.
                </p>
                <p className="p-6 bg-white/10 rounded-3xl border border-white/20 font-medium italic">
                  Early intervention makes all the difference. ABC offers immediate access to care so your child can begin reaching milestone moments right away.
                </p>
              </div>

              <button
                onClick={() => navigate('/contact')}
                className="w-full py-6 bg-white text-brand-teal rounded-3xl font-kids font-bold text-2xl hover:bg-brand-peach hover:text-white hover:scale-[1.02] active:scale-95 transition-all shadow-lg mt-10"
              >
                Get started
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interest Form Section */}
      <section className="py-32 bg-brand-lavender/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block p-4 bg-white rounded-full mb-8 shadow-sm">
                <Sparkles className="text-brand-peach animate-pulse" size={32} />
              </div>
              <h2 className="text-5xl lg:text-6xl font-kids font-bold text-brand-ink mb-6 tracking-tight">
                Help your child thrive <br /> with ABA therapy.
              </h2>
              <p className="text-2xl text-brand-sage mb-8 font-medium">
                Complete our online interest form to get matched with a center. We will be in touch soon!
              </p>

              <div className="flex items-center gap-6 text-brand-teal font-bold">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={20} /> HIPAA Compliant
                </div>
                <div className="flex items-center gap-2">
                  <Users size={20} /> 100+ Centers
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[48px] shadow-2xl border border-brand-teal/5"
            >
              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <div className="w-20 h-20 bg-brand-mint text-brand-teal rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 size={48} />
                    </div>
                    <h3 className="text-3xl font-kids font-bold text-brand-ink mb-4">Thank You!</h3>
                    <p className="text-brand-sage font-medium mb-8">A team member from your nearest center will contact you within 24 hours.</p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="btn-friendly-outline"
                    >
                      Submit Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5" onSubmit={handleInterestFormSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-brand-ink ml-1">Parent/Guardian First Name<span className="text-red-500">*</span></label>
                        <input type="text" name="firstName" value={interestForm.firstName} onChange={handleInterestChange} required className="w-full p-4 bg-[#FCFAF7] border border-gray-200 rounded-2xl outline-none focus:border-brand-teal transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-brand-ink ml-1">Parent/Guardian Last Name<span className="text-red-500">*</span></label>
                        <input type="text" name="lastName" value={interestForm.lastName} onChange={handleInterestChange} required className="w-full p-4 bg-[#FCFAF7] border border-gray-200 rounded-2xl outline-none focus:border-brand-teal transition-all" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-brand-ink ml-1">Email<span className="text-red-500">*</span></label>
                      <input type="email" name="email" value={interestForm.email} onChange={handleInterestChange} required className="w-full p-4 bg-[#FCFAF7] border border-gray-200 rounded-2xl outline-none focus:border-brand-teal transition-all" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-brand-ink ml-1">Phone number<span className="text-red-500">*</span></label>
                      <input type="tel" name="phone" value={interestForm.phone} onChange={handleInterestChange} required className="w-full p-4 bg-[#FCFAF7] border border-gray-200 rounded-2xl outline-none focus:border-brand-teal transition-all" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-brand-ink ml-1">Child's Date of Birth</label>
                        <input type="date" name="childDob" value={interestForm.childDob} onChange={handleInterestChange} className="w-full p-4 bg-[#FCFAF7] border border-gray-200 rounded-2xl outline-none focus:border-brand-teal transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-brand-ink ml-1">Child's First Name</label>
                        <input type="text" name="childName" value={interestForm.childName} onChange={handleInterestChange} className="w-full p-4 bg-[#FCFAF7] border border-gray-200 rounded-2xl outline-none focus:border-brand-teal transition-all" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-brand-ink ml-1">Zip code<span className="text-red-500">*</span></label>
                      <input type="text" name="zip" value={interestForm.zip} onChange={handleInterestChange} required placeholder="ex: 73301" className="w-full p-4 bg-[#FCFAF7] border border-gray-200 rounded-2xl outline-none focus:border-brand-teal transition-all" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-brand-ink ml-1">Find nearby Centers<span className="text-red-500">*</span></label>
                      <select name="center" value={interestForm.center} onChange={handleInterestChange} required className="w-full p-4 bg-[#FCFAF7] border border-gray-200 rounded-2xl outline-none focus:border-brand-teal transition-all appearance-none cursor-pointer">
                        <option value="">Please Select</option>
                        <option value="austin">Austin, TX</option>
                        <option value="dallas">Dallas, TX</option>
                        <option value="houston">Houston, TX</option>
                        <option value="blaine">Blaine, MN</option>
                      </select>
                    </div>

                    <div className="flex gap-3 items-start p-2">
                      <input type="checkbox" id="consent" name="consent" checked={interestForm.consent} onChange={handleInterestChange} className="mt-1.5 accent-brand-teal h-4 w-4" />
                      <label htmlFor="consent" className="text-[13px] text-brand-sage leading-relaxed">
                        I consent to receive occasional text messages from ABC regarding educational resources and follow-up related to my inquiry. Message and data rates may apply. Reply STOP to opt out or HELP for help. View privacy policy.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className={`w-full py-6 bg-[#76B56B] text-white rounded-[24px] font-kids font-bold text-2xl hover:bg-[#659e5a] transition-all transform active:scale-[0.98] shadow-lg flex items-center justify-center gap-3 ${formSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {formSubmitting ? 'Submitting...' : 'Submit'}
                    </button>

                    <p className="text-center text-[10px] text-gray-400 mt-4">
                      This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-16"
          >
            <div>
              <h2 className="text-5xl font-kids font-bold text-brand-ink mb-4">Frequently asked questions</h2>
              <Link to="/what-is-aba" className="text-brand-teal font-bold flex items-center gap-2 hover:underline text-lg">
                View all FAQs <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} variants={itemVariants} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-brand-ink rounded-[60px] p-12 lg:p-20 relative overflow-hidden text-white"
          >
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-teal/20 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-brand-mint text-sm font-bold uppercase tracking-widest mb-6">
                  <MessageCircle size={16} /> Stay connected
                </div>
                <h2 className="text-4xl lg:text-5xl font-kids font-bold mb-6">ABC Parent Newsletter</h2>
                <p className="text-white/70 text-xl leading-relaxed">
                  Join our community of families and receive expert tips, milestone activities, and inspiring stories delivered straight to your inbox.
                </p>
              </div>

              <div className="w-full lg:w-auto">
                <AnimatePresence mode="wait">
                  {newsletterSubmitted ? (
                    <motion.div
                      key="nl-success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-white/10 p-8 rounded-[32px] border border-white/20 text-center min-w-[320px] lg:min-w-[450px]"
                    >
                      <CheckCircle2 size={48} className="mx-auto mb-4 text-brand-mint" />
                      <p className="font-kids font-bold text-xl">You're subscribed!</p>
                      <p className="text-white/60 text-sm mt-2">Check your inbox for a welcome email.</p>
                    </motion.div>
                  ) : (
                    <motion.form key="nl-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleNewsletterSubmit} className="bg-white/5 p-2 rounded-[32px] backdrop-blur-sm border border-white/10 flex flex-col sm:flex-row gap-3 min-w-[320px] lg:min-w-[450px]">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        required
                        className="flex-1 bg-transparent px-6 py-4 outline-none text-lg font-medium placeholder:text-white/30"
                      />
                      <button type="submit" className="bg-brand-teal hover:bg-[#3d7a6f] text-white px-10 py-4 rounded-[24px] font-kids font-bold text-xl transition-all whitespace-nowrap">
                        Join Parent Newsletter
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
                <p className="text-xs text-white/40 mt-4 text-center lg:text-left px-4">
                  By subscribing, you agree to our Privacy Policy and consent to receive marketing updates.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};