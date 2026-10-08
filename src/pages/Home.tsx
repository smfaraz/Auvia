import React, { useState, useEffect, useId } from 'react';
import { motion, AnimatePresence, MotionConfig, useReducedMotion } from 'motion/react';
import {
  ArrowRight, Heart, Users, ChevronDown,
  ShieldCheck, Zap, FileText, Activity, HeartHandshake,
  Stethoscope, Search, CheckCircle2, MapPin, Phone
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { REVIEW_MODE } from '../lib/review';
import { DevelopmentalTimeline } from '../components/DevelopmentalTimeline';
import { SEO } from '../components/SEO';
import '../styles/home.css';

// Define the FAQItem component with proper prop types
const FAQItem = ({ faq, variants }: { key?: number; faq: { q: string; a: string }; variants: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const answerId = useId();

  return (
    <motion.div
      variants={variants}
      className={`home-faq group rounded-[32px] transition-all duration-500 border ${isOpen
        ? "bg-white border-brand-teal shadow-[0_20px_50px_rgba(77,150,137,0.1)]"
        : "bg-white/50 border-gray-100 hover:border-brand-teal/30 hover:bg-white shadow-sm"
        }`}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={answerId}
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
            id={answerId}
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

// Hand-drawn marker stroke that draws itself under a key heading word.
const Marker = ({ children, className = '', tone = 'sun' }: { children: React.ReactNode; className?: string; tone?: 'sun' | 'coral' }) => {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={`home-marker home-marker--${tone} ${className}`}
      initial={reduce ? false : { backgroundSize: '0% 0.42em' }}
      whileInView={{ backgroundSize: '100% 0.42em' }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
    >
      {children}
    </motion.span>
  );
};

const insurers = ['BCBS TX', 'Aetna', 'Cigna', 'United Healthcare', 'Wellpoint'];

export const Home = () => {
  const navigate = useNavigate();
  const [activeWord, setActiveWord] = useState(0);
  const reduceMotion = useReducedMotion();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterError, setNewsletterError] = useState(false);

  // Form state for the interest form
  const [interestForm, setInterestForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    childDob: '', childName: '', zip: '', insuranceProvider: '', center: '', consent: false
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState(false);

  const transitionSettings = {
    duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
  };

  const words = ["learn", "smile", "achieve", "grow", "thrive"];

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % words.length);
    }, 2500);

    return () => {
      clearInterval(timer);
    };
  }, [words.length, reduceMotion]);

  const goToInterestForm = () => {
    document.getElementById('interest-form')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = newsletterEmail.trim();
    if (!email || REVIEW_MODE || newsletterSubmitting) return;
    setNewsletterSubmitting(true);
    setNewsletterError(false);
    try {
      const [{ db }, { collection, addDoc, serverTimestamp }] = await Promise.all([
        import('../lib/firebase'),
        import('firebase/firestore')
      ]);
      await addDoc(collection(db, 'leads'), {
        firstName: '', lastName: '', phone: '', email,
        status: 'new',
        source: 'home_newsletter',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setNewsletterSubmitted(true);
      setNewsletterEmail('');
    } catch (error) {
      console.error('Error saving newsletter signup:', error);
      setNewsletterError(true);
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  const handleInterestFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (REVIEW_MODE || formSubmitting) return;
    setFormSubmitting(true);
    setFormError(false);
    try {
      const [{ db }, { collection, addDoc, serverTimestamp }] = await Promise.all([
        import('../lib/firebase'),
        import('firebase/firestore')
      ]);
      await addDoc(collection(db, 'leads'), {
        ...interestForm,
        status: 'new',
        source: 'home_interest_form',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setFormSubmitted(true);
      setInterestForm({
        firstName: '', lastName: '', email: '', phone: '',
        childDob: '', childName: '', zip: '', insuranceProvider: '', center: '', consent: false
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormError(true);
    } finally {
      setFormSubmitting(false);
    }
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
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
  };

  const tileHover = (tilt: number) => ({ y: -6, rotate: tilt, transition: { type: 'spring' as const, stiffness: 320, damping: 18 } });

  const [faqs, setFaqs] = useState<any[]>([]);

  useEffect(() => {
    if (REVIEW_MODE) return;
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    const loadFAQs = async () => {
      const [{ db }, { collection, query, onSnapshot, orderBy }] = await Promise.all([
        import('../lib/firebase'),
        import('firebase/firestore')
      ]);
      if (cancelled) return;
      const q = query(collection(db, 'faqs'), orderBy('order', 'asc'));
      unsubscribe = onSnapshot(q, (snapshot) => {
        if (cancelled) return;
        const faqsData = snapshot.docs.map(doc => ({
          id: doc.id,
          q: doc.data().question,
          a: doc.data().answer
        }));
        setFaqs(faqsData);
      });
    };

    void loadFAQs().catch(error => {
      if (!cancelled) console.error('Error loading FAQs:', error);
    });
    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
    <div className="home-page bg-[#FCFAF7] selection:bg-brand-teal/20 text-brand-ink font-sans">
      <SEO 
        title="Auvia Behavior Centers | ABA Therapy for Autism"
        description="Compassionate, evidence-based ABA therapy for children with autism. Fast access to care, diagnostic support, and in-network insurance coverage in Texas and beyond."
        keywords="ABA therapy, autism treatment, autism diagnosis, BCBA, autism centers, early intervention, Auvia"
        canonicalUrl="https://auviatherapy.com/"
      />
      <section className="home-hero">
        <div className="home-hero__inner">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transitionSettings}
            className="home-hero__copy"
          >
            <h1 aria-label="Helping every child discover they can learn, smile, achieve, grow, and thrive" className="font-kids font-semibold tracking-tight text-brand-ink">
              Helping every child <br />
              discover they{" "}
              <span className="home-cycling-word text-brand-teal" aria-hidden="true">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[activeWord]}
                    aria-hidden="true"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    can {words[activeWord]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <p className="home-hero__lead">
              Helping children build confidence, communication, and lifelong skills through compassionate, evidence-based ABA therapy.
            </p>
            <div className="home-hero__actions">
              <button type="button" onClick={goToInterestForm} className="btn-friendly-primary">
                Start interest form <ArrowRight size={18} />
              </button>
              <Link to="/locations" className="btn-friendly-outline">
                <MapPin size={18} /> Find a center
              </Link>
            </div>
            <a href="tel:+19457581087" className="home-hero__call">
              <Phone size={16} /> (945) 758-1087
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionSettings, delay: 0.12 }}
            className="home-hero__media"
          >
            <picture>
              <source srcSet="/images/hero-main.webp" type="image/webp" />
              <img
                src="/images/hero-main.webp"
                alt="Auvia Behavior Centers Clinical Sanctuary"
                fetchPriority="high"
                loading="eager"
                decoding="async"
                width={500}
                height={650}
              />
            </picture>
            <div className="home-hero__badge">
              <span><Zap size={18} fill="currentColor" /></span>
              Immediate Access to Care
            </div>
          </motion.div>
        </div>
      </section>
      {/* Insurance Trust Bar */}
      <section className="home-insurance py-16 bg-[#FCFAF7] border-y border-brand-teal/5">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-label-custom text-brand-sage uppercase tracking-[0.3em] mb-10">Trusted & Accepted By</p>
        </div>
        <div className="home-marquee">
          <ul className="home-marquee__track">
            {[0, 1, 2, 3, 4, 5].map(copy => insurers.map((p, i) => (
              <li key={`${copy}-${p}`} aria-hidden={copy > 0 || undefined} className={`home-chip home-chip--${i % 5} font-kids`}>
                <ShieldCheck size={18} aria-hidden="true" /> {p}
              </li>
            )))}
          </ul>
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="home-insurance__all"
          >
            <Link to="/insurance-financial-assistance">
              <span className="text-brand-teal font-bold text-body-normal-normal hover:underline">+ View All Accepted Plans</span>
            </Link>
          </motion.div>
          <p className="text-center text-xs text-brand-sage/70 font-medium mt-4 max-w-2xl mx-auto">
            We work with many major commercial insurance plans and Medicaid. Coverage varies by plan, employer, location, and medical necessity criteria.
          </p>
        </div>
      </section>
      {/* Why families choose Auvia */}
      <section className="home-benefits py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-section font-kids font-bold text-brand-ink mb-6">Why Families Choose <Marker className="text-brand-teal">Auvia</Marker></h2>
            <p className="text-body-normal-normal-main text-brand-sage max-w-3xl mx-auto">
              We believe families deserve clear, trustworthy information about how ABA therapy can make a meaningful difference in their children's lives.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="home-bento grid gap-8"
          >
            {/* Featured card */}
            <motion.div
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={tileHover(-0.6)}
              className="home-tile home-tile--feature p-8 rounded-[40px] glass-panel card-friendly relative z-10"
            >
              <div className="w-14 h-14 bg-brand-mint/60 rounded-2xl flex items-center justify-center text-brand-teal mb-6 shadow-sm">
                <Zap size={28} fill="currentColor" />
              </div>
              <h3 className="text-small-heading font-kids font-bold mb-4">Immediate Access to Care</h3>
              <p className="text-brand-sage mb-6 font-medium text-body-normal-normal-sm">
                Early support can help children build important skills and give families practical tools for everyday life. With convenient centers, we help your child get started promptly.
              </p>
              <button
                onClick={() => navigate('/locations')}
                className="bg-brand-teal text-white w-full py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-teal-light transition-colors text-body-normal-normal-sm shadow-md"
              >
                Find an ABA center <ArrowRight size={18} />
              </button>
              <span className="home-tile__photo" aria-hidden="true">
                <img src="/images/kids-hero.webp" alt="" loading="lazy" decoding="async" />
              </span>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={tileHover(1)} className="home-tile home-tile--sun p-8 rounded-[40px] glass-panel card-friendly">
              <div className="w-14 h-14 bg-brand-peach/60 rounded-2xl flex items-center justify-center text-brand-teal mb-6 shadow-sm">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-small-heading font-kids font-bold mb-4">Diagnostic Support</h3>
              <p className="text-brand-sage mb-6 text-body-normal-normal-sm">You don't have to wait for answers. If your child has many of the early signs of autism, we can help them get evaluated.</p>
              <button onClick={() => navigate('/what-is-autism')} className="text-brand-teal font-bold flex items-center gap-2 hover:underline text-body-normal-normal-sm">Explore Diagnostic Resources <ArrowRight size={18} /></button>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={tileHover(-1)} className="home-tile home-tile--grape p-8 rounded-[40px] glass-panel card-friendly">
              <div className="w-14 h-14 bg-brand-lavender/60 rounded-2xl flex items-center justify-center text-brand-teal mb-6 shadow-sm">
                <FileText size={28} />
              </div>
              <h3 className="text-small-heading font-kids font-bold mb-4">Insurance Made Simple</h3>
              <p className="text-brand-sage mb-6 text-body-normal-normal-sm">We accept most major plans, guide families through paperwork, and can provide financial assistance for out-of-pocket expenses.</p>
              <button onClick={() => navigate('/insurance-financial-assistance')} className="text-brand-teal font-bold flex items-center gap-2 hover:underline text-body-normal-normal-sm">Learn About Insurance & Financing <ArrowRight size={18} /></button>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={tileHover(1)} className="home-tile home-tile--leaf p-8 rounded-[40px] glass-panel card-friendly">
              <div className="w-14 h-14 bg-brand-mint/60 rounded-2xl flex items-center justify-center text-brand-teal mb-6 shadow-sm">
                <Activity size={28} />
              </div>
              <h3 className="text-small-heading font-kids font-bold mb-4">Coordinated Care</h3>
              <p className="text-brand-sage text-body-normal-normal-sm">We collaborate with your child's speech, occupational, feeding, and physical therapists to provide sessions directly in our centers. This allows your child to access other services in a familiar environment.</p>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={tileHover(-1)} className="home-tile home-tile--sky p-8 rounded-[40px] glass-panel card-friendly">
              <div className="w-14 h-14 bg-brand-peach/60 rounded-2xl flex items-center justify-center text-brand-teal mb-6 shadow-sm">
                <Users size={28} />
              </div>
              <h3 className="text-small-heading font-kids font-bold mb-4">Family Guidance</h3>
              <p className="text-brand-sage text-body-normal-normal-sm">Parents and caregivers play an important role. Every care plan includes twice-a-month sessions led by a BCBA, giving parents practical strategies for daily routines at home.</p>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={tileHover(0.4)} className="home-tile home-tile--banner p-8 rounded-[40px] glass-panel card-friendly">
              <div className="w-14 h-14 bg-brand-lavender/60 rounded-2xl flex items-center justify-center text-brand-teal mb-6 shadow-sm">
                <HeartHandshake size={28} />
              </div>
              <h3 className="text-small-heading font-kids font-bold mb-4">Compassionate Support</h3>
              <p className="text-brand-sage text-body-normal-normal-sm">Personalized ABA therapy designed to support meaningful progress for every child and family.</p>
            </motion.div>
          </motion.div>

          {/* Mobile swipe indicator */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-4 text-xs font-bold text-brand-teal uppercase tracking-wider">
            <span>Swipe cards</span>
            <ArrowRight size={14} className="animate-pulse" />
          </div>
        </div>
      </section>

      {/* Diagnostic Next Steps Section */}
      <section className="home-next-steps py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-section font-kids font-bold text-brand-ink mb-6">I think my child has autism. <br /> <Marker tone="coral" className="text-brand-sage italic">What should I do next?</Marker></h2>
            <p className="text-body-normal-normal-main font-medium text-brand-sage">Not sure where to begin? Here are the next steps based on your child's current diagnostic status.</p>
          </motion.div>

          <svg className="home-fork" viewBox="0 0 600 64" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path d="M300 2 C300 40 110 14 96 62" vectorEffect="non-scaling-stroke" />
            <path d="M300 2 C300 40 490 14 504 62" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={tileHover(-0.5)}
              className="home-step home-step--sun p-12 rounded-[60px] bg-[#FCFAF7] border border-brand-teal/10 flex flex-col h-full"
            >
              <div className="home-bubble inline-flex items-center gap-3 text-brand-teal font-bold mb-8 text-small-heading">
                <Search size={24} /> My child does not have an autism diagnosis.
              </div>

              <div className="flex-1 space-y-10">
                <div>
                  <h4 className="font-bold text-brand-ink mb-4 flex items-center gap-2 text-small-heading"><Stethoscope className="text-brand-teal" /> Access Diagnostic Resources</h4>
                  <p className="text-brand-sage text-body-normal-normal-main">
                    We will help to connect you to resources to get your child evaluated and get a diagnosis report. Obtaining a clinical diagnosis is the first step toward accessing essential ABA therapy services.
                  </p>
                </div>

                <div className="p-8 bg-brand-peach/5 rounded-3xl border-2 border-dashed border-brand-peach/20">
                  <p className="text-brand-sage font-medium italic text-body-normal-normal">
                    Autism diagnosis involves a comprehensive clinical evaluation. Depending on individual circumstances, clinicians may use standardized assessment tools such as the ADOS-2 as part of the evaluation.
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate('/what-is-autism')}
                className="w-full py-5 bg-white border-2 border-brand-teal text-brand-teal rounded-3xl font-kids font-bold text-small-heading hover:bg-brand-teal hover:text-white transition-all"
              >
                Explore diagnostic support
              </button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={tileHover(0.5)}
              className="home-step home-step--teal p-12 rounded-[60px] bg-brand-teal text-white flex flex-col h-full shadow-2xl"
            >
              <div className="home-bubble inline-flex items-center gap-3 font-bold mb-8 text-small-heading">
                <Heart size={24} fill="white" /> My child has an autism diagnosis.
              </div>

              <div className="flex-1 space-y-8">
                <p className="text-white/90 text-body-normal-normal-main">
                  To connect with us, fill out our online interest form. A teammate from a nearby center will contact you to learn more about your family and confirm your insurance coverage. We will then schedule your center tour.
                </p>
                <p className="p-6 bg-white/10 rounded-3xl border border-white/20 font-medium italic text-body-normal-normal">
                  Early support can help children develop communication, social engagement, and lifelong independence. Auvia offers personalized care to help your family thrive.
                </p>
              </div>

              <button
                onClick={goToInterestForm}
                className="w-full py-6 bg-white text-brand-teal rounded-3xl font-kids font-bold text-small-heading hover:bg-brand-peach hover:text-white hover:scale-[1.02] active:scale-95 transition-all shadow-lg mt-10"
              >
                Start interest form
              </button>
              <span className="home-shape home-shape--flower home-step__flower" aria-hidden="true" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interest Form Section */}
      <section
        id="interest-form"
        className="home-interest py-12 md:py-20 bg-brand-lavender/30"
      >
        <span className="home-shape home-shape--flower home-interest__flower" aria-hidden="true" />
        <span className="home-shape home-shape--heart home-interest__heart" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="home-interest__intro"
            >
              <h2 className="text-section font-kids font-bold text-brand-ink mb-4 tracking-tight">
                Help your child <Marker>thrive</Marker> <br /> with ABA therapy.
              </h2>
              <p className="text-body-normal-normal-main text-brand-sage font-medium">
                Complete our online interest form to get matched with a center. We will be in touch soon!
              </p>

              <ol className="home-interest__steps">
                <li><span>1</span>Fill out our online interest form.</li>
                <li><span>2</span>A teammate from a nearby center will contact you to learn more about your family and confirm your insurance coverage.</li>
                <li><span>3</span>We will then schedule your center tour.</li>
              </ol>

              <div className="home-interest__meta">
                <a href="tel:+19457581087"><Phone size={18} /> (945) 758-1087</a>
                <Link to="/privacy"><ShieldCheck size={18} /> Your Privacy Matters</Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 sm:p-10 rounded-[32px] sm:rounded-[48px] shadow-2xl border border-brand-teal/5"
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
                    <h3 className="text-section font-kids font-bold text-brand-ink mb-4">Thank You!</h3>
                    <p className="text-brand-sage font-medium text-body-normal-normal mb-8">A team member from your nearest center will contact you within 24 hours.</p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="btn-friendly-outline"
                    >
                      Submit Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 md:space-y-5" onSubmit={handleInterestFormSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="home-firstName" className="text-label-custom text-brand-ink ml-1">Parent/Guardian First Name<span className="text-red-500">*</span></label>
                        <input type="text" autoComplete="given-name" id="home-firstName" name="firstName" value={interestForm.firstName} onChange={handleInterestChange} required className="glass-input w-full p-4 rounded-2xl outline-none text-body-normal-normal" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="home-lastName" className="text-label-custom text-brand-ink ml-1">Parent/Guardian Last Name<span className="text-red-500">*</span></label>
                        <input type="text" autoComplete="family-name" id="home-lastName" name="lastName" value={interestForm.lastName} onChange={handleInterestChange} required className="glass-input w-full p-4 rounded-2xl outline-none text-body-normal-normal" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="home-email" className="text-label-custom text-brand-ink ml-1">Email<span className="text-red-500">*</span></label>
                        <input type="email" autoComplete="email" id="home-email" name="email" value={interestForm.email} onChange={handleInterestChange} required className="glass-input w-full p-4 rounded-2xl outline-none text-body-normal-normal" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="home-phone" className="text-label-custom text-brand-ink ml-1">Phone number<span className="text-red-500">*</span></label>
                        <input type="tel" autoComplete="tel" id="home-phone" name="phone" value={interestForm.phone} onChange={handleInterestChange} required className="glass-input w-full p-4 rounded-2xl outline-none text-body-normal-normal" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="home-childDob" className="text-label-custom text-brand-ink ml-1">Child's Date of Birth</label>
                        <input type="date" id="home-childDob" name="childDob" value={interestForm.childDob} onChange={handleInterestChange} className="glass-input w-full p-4 rounded-2xl outline-none text-body-normal-normal" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="home-childName" className="text-label-custom text-brand-ink ml-1">Child's First Name</label>
                        <input type="text" id="home-childName" name="childName" value={interestForm.childName} onChange={handleInterestChange} className="glass-input w-full p-4 rounded-2xl outline-none text-body-normal-normal" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="home-insuranceProvider" className="text-label-custom text-brand-ink ml-1">Current Insurance Provider<span className="text-red-500">*</span></label>
                        <select id="home-insuranceProvider" name="insuranceProvider" value={interestForm.insuranceProvider} onChange={handleInterestChange} required className="glass-input w-full p-4 rounded-2xl outline-none appearance-none cursor-pointer text-body-normal-normal">
                          <option value="">Please Select</option>
                          <option value="BCBS TX">BCBS TX</option>
                          <option value="AETNA COMMERCIAL">Aetna Commercial</option>
                          <option value="CIGNA">Cigna</option>
                          <option value="UNITED HEALTHCARE">UnitedHealthcare</option>
                          <option value="WELLPOINT MEDICAID">Wellpoint Medicaid</option>
                          <option value="AETNA MEDICAID">Aetna Medicaid</option>
                          <option value="SUPERIOR HEALTH">Superior Health</option>
                          <option value="MOLINA">Molina Healthcare</option>
                          <option value="CARELON">Carelon</option>
                          <option value="TRICARE">TRICARE</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="home-zip" className="text-label-custom text-brand-ink ml-1">Zip code<span className="text-red-500">*</span></label>
                        <input type="text" autoComplete="postal-code" inputMode="numeric" id="home-zip" name="zip" value={interestForm.zip} onChange={handleInterestChange} required placeholder="ex: 73301" className="glass-input w-full p-4 rounded-2xl outline-none text-body-normal-normal" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="home-center" className="text-label-custom text-brand-ink ml-1">Find Nearby Centers<span className="text-red-500">*</span></label>
                      <select id="home-center" name="center" value={interestForm.center} onChange={handleInterestChange} required className="glass-input w-full p-4 rounded-2xl outline-none appearance-none cursor-pointer text-body-normal-normal">
                        <option value="">Please Select</option>
                        <option value="irving">Irving, TX (Open)</option>
                        <option value="allen">Allen, TX (Upcoming)</option>
                        <option value="austin">Austin, TX (Upcoming)</option>
                        <option value="dallas">Dallas, TX (Upcoming)</option>
                        <option value="houston">Houston, TX (Upcoming)</option>
                        <option value="blaine">Blaine, MN (Upcoming)</option>
                      </select>
                    </div>

                    <div className="flex gap-4 items-start bg-brand-mint/5 p-4 rounded-2xl border border-brand-teal/10">
                      <input
                        type="checkbox"
                        id="home-consent"
                        name="consent"
                        checked={interestForm.consent}
                        onChange={handleInterestChange}
                        className="mt-1.5 accent-brand-teal h-5 w-5 shrink-0 cursor-pointer"
                      />
                      <label htmlFor="home-consent" className="text-small text-brand-sage leading-relaxed cursor-pointer">
                        By checking the box, and submitting this form, you consent to receive text messages (SMS) regarding, but not limited to answering your questions, providing follow-up, and general communication from Auvia Behavior Centers. Consent is not a condition of receiving services. Message frequency may vary. Message and data rates may apply. You can reply STOP to opt out of further messaging, reply HELP for assistance, or call (945) 758-1087. Please see our <Link to="/privacy" className="text-brand-teal underline">Privacy Policy</Link> for details.
                      </label>
                    </div>

                    {formError && (
                      <p role="alert" className="form-error">
                        We couldn't send your form. Your answers are still here. Try again, or call (945) 758-1087.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className={`w-full py-5 bg-brand-teal text-white rounded-2xl font-kids font-bold text-small-heading hover:bg-[#3d7a6f] transition-all transform active:scale-95 shadow-xl ${formSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {formSubmitting ? 'Submitting...' : 'Submit Interest Form'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Developmental Timeline */}
      <section className="home-development pt-8 pb-16 md:pt-12 md:pb-20 bg-white">
        <span className="home-shape home-shape--flower home-development__flower" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-section font-kids font-bold mb-8 sm:mb-12 tracking-tight">Celebrate Your <Marker tone="coral" className="text-brand-teal italic">Big Moments.</Marker></h2>
          <DevelopmentalTimeline />
        </div>
      </section>


      {/* Evidence-based ABA Section */}
      <section className="home-evidence py-16 bg-[#FCFAF7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <h2 className="text-section font-kids font-bold text-brand-ink mb-8">
                Evidence-based <Marker className="text-brand-teal">ABA therapy</Marker> <br /> that works for your family
              </h2>
              <div className="space-y-6 text-body-normal-normal-main text-brand-sage">
                <p>
                  ABA therapy uses behavioral principles and positive reinforcement to help children diagnosed with autism develop new skills and make positive changes in their lives.
                </p>
                <p>
                  Children work closely with a dedicated team of Board Certified Behavior Analysts® (BCBAs®) and Registered Behavior Technicians® (RBTs®). Treatment is highly personalized and delivered through one-on-one, compassionate care.
                </p>
              </div>
              <Link to="/what-is-aba" className="mt-10 group flex items-center gap-3 text-brand-teal font-kids font-bold text-h3">
                Learn more about ABA at Auvia
                <span className="w-12 h-12 rounded-full border-2 border-brand-teal flex items-center justify-center group-hover:bg-brand-teal group-hover:text-white transition-all">
                  <ArrowRight />
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="relative"
            >
              <div className="home-collage">
                <span className="home-collage__tile home-collage__tile--sky" aria-hidden="true" />
                <img src="/images/kids-team.webp" alt="ABA therapy session with a child and therapist" loading="lazy" decoding="async" />
                <span className="home-collage__tile home-collage__tile--sun" aria-hidden="true" />
                <img src="/images/kids-diagnosis.webp" alt="" loading="lazy" decoding="async" />
                <span className="home-collage__tile home-collage__tile--coral" aria-hidden="true" />
                <img src="/images/autism-therapy.webp" alt="" loading="lazy" decoding="async" />
              </div>
              <div className="home-image-caption absolute -bottom-10 -left-10 bg-brand-peach p-8 rounded-[40px] text-white shadow-xl max-w-xs rotate-3">
                <p className="font-kids font-bold text-body-normal-normal-main italic">"Compassionate care that prioritizes your child's unique journey."</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      {faqs.length > 0 && <section className="home-faq-section py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-16"
          >
            <div>
              <h2 className="text-section font-kids font-bold text-brand-ink mb-4">Frequently asked questions</h2>
              <Link to="/what-is-aba" className="text-brand-teal font-bold flex items-center gap-2 hover:underline text-body-normal-normal-main">
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
      </section>}

      {/* Newsletter Section */}
      <section className="home-newsletter py-8 md:pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-brand-ink rounded-[40px] md:rounded-[60px] p-8 sm:p-12 lg:p-20 relative overflow-hidden text-white"
          >
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-teal/20 rounded-full blur-3xl" />
            <span className="home-shape home-shape--flower home-newsletter__flower" aria-hidden="true" />
            <span className="home-shape home-shape--heart home-newsletter__heart" aria-hidden="true" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
              <div className="max-w-xl text-center lg:text-left">
                <h2 className="text-section font-kids font-bold mb-6">Auvia Parent Newsletter</h2>
                <p className="text-body-normal-normal-main text-white/70">
                  Join our community of families and receive expert tips, evidence-based developmental strategies, and inspiring family stories delivered straight to your inbox.
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
                      className="home-newsletter-success bg-white/10 p-8 rounded-[32px] border border-white/20 text-center min-w-full sm:min-w-[400px] lg:min-w-[450px]"
                    >
                      <CheckCircle2 size={48} className="mx-auto mb-4 text-brand-mint" />
                      <p className="font-kids font-bold text-small-heading">You're on the list.</p>
                      <p className="text-white/60 text-body-normal-normal mt-2">We saved your email for the Auvia Parent Newsletter.</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="nl-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleNewsletterSubmit}
                      className="home-newsletter-form bg-white/5 p-2 rounded-[32px] backdrop-blur-sm border border-white/10 flex flex-col sm:flex-row gap-3 min-w-full sm:min-w-[400px] lg:min-w-[450px]"
                    >
                      <input
                        type="email"
                        aria-label="Email address for the parent newsletter"
                        autoComplete="email"
                        placeholder="Enter your email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        required
                        className="flex-1 bg-transparent px-6 py-4 outline-none text-body-normal-normal-main font-medium placeholder:text-white/30"
                      />
                      <button type="submit" disabled={newsletterSubmitting} className="bg-brand-teal hover:bg-[#3d7a6f] text-white px-8 sm:px-10 py-4 rounded-[24px] font-kids font-bold text-small-heading sm:text-h3 transition-all whitespace-nowrap shadow-lg active:scale-95">
                        {newsletterSubmitting ? 'Joining...' : 'Join Parent Newsletter'}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
                {newsletterError && (
                  <p role="alert" className="form-error form-error--dark">
                    We couldn't save your email. It is still in the box. Try again.
                  </p>
                )}
                <p className="text-small text-white/40 mt-4 text-center lg:text-left px-4">
                  By subscribing, you agree to our Privacy Policy and consent to receive marketing updates.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
    </MotionConfig>
  );
};
