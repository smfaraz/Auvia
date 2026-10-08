import '../styles/pages.css';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { GraduationCap, Heart, Zap, Users, ArrowRight, Smile, Star, Shield, Coffee, Sun, X, CheckCircle, Send, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { SEO } from '../components/SEO';

const Mark = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.span
    className={`bp-mark ${className}`}
    initial={{ backgroundSize: '0% 0.34em' }}
    whileInView={{ backgroundSize: '100% 0.34em' }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
  >
    {children}
  </motion.span>
);

export const Careers = () => {
  const navigate = useNavigate();
  const [locationFilter, setLocationFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [jobsUnavailable, setJobsUnavailable] = useState(false);

  const applyDialogRef = useRef<HTMLDivElement>(null);

  // Apply Modal Form States
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJobForApply, setSelectedJobForApply] = useState<any | null>(null);
  const [applyForm, setApplyForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    resumeUrl: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  useEffect(() => {
    if (!isApplyModalOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const inertElements: Array<{ element: HTMLElement; previous: boolean }> = [];
    const frame = requestAnimationFrame(() => {
      applyDialogRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
      let branch: HTMLElement | null = applyDialogRef.current?.parentElement ?? null;
      while (branch?.parentElement && branch !== document.body) {
        for (const sibling of Array.from(branch.parentElement.children)) {
          if (sibling !== branch && sibling instanceof HTMLElement) {
            inertElements.push({ element: sibling, previous: sibling.inert });
            sibling.inert = true;
          }
        }
        branch = branch.parentElement;
      }
    });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsApplyModalOpen(false);
      if (event.key !== 'Tab') return;
      const controls = Array.from<HTMLElement>(applyDialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), a[href]') ?? []);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKeyDown);
      inertElements.forEach(({ element, previous }) => { element.inert = previous; });
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [isApplyModalOpen]);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobForApply) return;
    setIsSubmitting(true);
    setSubmitError(false);
    try {
      await addDoc(collection(db, 'job_applications'), {
        ...applyForm,
        jobId: selectedJobForApply.id,
        jobTitle: selectedJobForApply.title,
        status: 'applied',
        createdAt: serverTimestamp()
      });
      setIsSubmitSuccess(true);
      setApplyForm({ firstName: '', lastName: '', email: '', phone: '', resumeUrl: '', message: '' });
      setTimeout(() => {
        setIsApplyModalOpen(false);
        setIsSubmitSuccess(false);
        setSelectedJobForApply(null);
      }, 3000);
    } catch (error: any) {
      console.error('Error submitting job application:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const q = query(
      collection(db, 'jobs'),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc')
    );

    const timeout = window.setTimeout(() => { setLoading(false); setJobsUnavailable(true); }, 8000);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const jobsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      clearTimeout(timeout);
      setJobs(jobsData.filter((job: any) => !/^faf$/i.test(String(job.title || "").trim())));
      setJobsUnavailable(false);
      setLoading(false);
    }, () => { clearTimeout(timeout); setLoading(false); setJobsUnavailable(true); });

    return () => { clearTimeout(timeout); unsubscribe(); };
  }, []);
  const benefits = [
    {
      icon: <GraduationCap strokeWidth={1.75} aria-hidden="true" />,
      title: "Clinical Excellence",
      text: "We provide industry-leading training, regular BCBA supervision, and a clear path for your professional growth including RBT certification support.",
      color: "bg-brand-mint"
    },
    {
      icon: <Heart strokeWidth={1.75} aria-hidden="true" />,
      title: "Meaningful Impact",
      text: "Join a mission-driven team where you'll see the direct results of your work as children reach life-changing milestone moments.",
      color: "bg-brand-peach"
    },
    {
      icon: <Zap strokeWidth={1.75} aria-hidden="true" />,
      title: "Total Rewards",
      text: "Competitive salary, comprehensive health/dental/vision, 401(k) matching, and generous PTO to ensure you stay refreshed.",
      color: "bg-brand-lavender"
    },
    {
      icon: <Smile strokeWidth={1.75} aria-hidden="true" />,
      title: "Joyful Environment",
      text: "Work in bright, engaging sanctuaries designed for play and progress. We believe a happy team leads to happy children.",
      color: "bg-brand-sky"
    }
  ];

  const values = [
    { icon: <Heart strokeWidth={1.75} aria-hidden="true" size={24} />, title: "Compassionate Care", text: "We lead with empathy, treating every child and teammate with the kindness they deserve." },
    { icon: <Shield strokeWidth={1.75} aria-hidden="true" size={24} />, title: "Clinical Integrity", text: "Our decisions are rooted in evidence-based practices and the highest ethical standards." },
    { icon: <Users strokeWidth={1.75} aria-hidden="true" size={24} />, title: "Collaborative Spirit", text: "We are a family. We share knowledge, celebrate wins, and support each other through challenges." },
    { icon: <Sun strokeWidth={1.75} aria-hidden="true" size={24} />, title: "Relentless Optimism", text: "We believe in the potential of every child and the power of a positive mindset." }
  ];



  const openings = [
    {
      title: "Board Certified Behavior Analyst (BCBA)",
      location: "Irving Sanctuary (Suite 236)",
      type: "Full-Time",
      description: "Lead a team of RBTs, develop personalized treatment plans, and provide family guidance in our state-of-the-art center.",
      color: "bg-brand-mint"
    },
    {
      title: "Registered Behavior Technician (RBT)",
      location: "Irving Sanctuary (DFW)",
      type: "Full-Time",
      description: "Work 1:1 with children to implement behavior plans through play-based therapy and celebrate daily milestone moments.",
      color: "bg-brand-peach"
    },
    {
      title: "Clinical Director",
      location: "DFW Regional Network",
      type: "Full-Time",
      description: "Oversee clinical operations, mentor BCBAs, and ensure the highest standards of care across our Texas sanctuaries.",
      color: "bg-brand-lavender"
    },
    {
      title: "Center Administrator",
      location: "Irving Sanctuary",
      type: "Full-Time",
      description: "The heart of our center operations. Manage scheduling, insurance coordination, and welcome families with a smile.",
      color: "bg-brand-sky"
    }
  ];

  const careersSchema = React.useMemo(() => {
    const allPostings = [
      ...jobs.map(j => ({
        title: j.title,
        description: j.description || `${j.title} position at Auvia Behavior Centers.`,
        location: j.location || "Texas Sanctuary",
        type: j.type || "Full-Time",
        date: j.createdAt ? new Date(j.createdAt.seconds * 1000).toISOString().split('T')[0] : "2026-05-17"
      })),
      ...openings.map(o => ({
        title: o.title,
        description: o.description,
        location: o.location,
        type: o.type,
        date: "2026-05-17"
      }))
    ];

    return {
      "@context": "https://schema.org",
      "@graph": allPostings.map(post => ({
        "@type": "JobPosting",
        "title": post.title,
        "description": post.description,
        "datePosted": post.date,
        "validThrough": "2027-05-17",
        "employmentType": post.type.toLowerCase().includes('part') ? "PART_TIME" : "FULL_TIME",
        "hiringOrganization": {
          "@type": "Organization",
          "name": "Auvia Behavior Centers",
          "sameAs": "https://auviatherapy.com",
          "logo": "https://auviatherapy.com/favicon.svg"
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": post.location.split(' ')[0] || "Dallas",
            "addressRegion": "TX",
            "addressCountry": "US"
          }
        }
      }))
    };
  }, [jobs]);

  return (
    <MotionConfig reducedMotion="user">
    <div className="inner-public-page public-page pt-24 lg:pt-28 pb-14 lg:pb-20 bg-gradient-to-br from-brand-sky via-brand-cream to-brand-peach/30 overflow-x-hidden relative min-h-screen">
      <SEO
        title="Careers | Join Our BCBA and RBT Team"
        description="Join Auvia Behavior Centers. We are hiring passionate BCBAs and RBTs who want to provide compassionate, play-based ABA therapy."
        keywords="BCBA jobs, RBT jobs, careers in ABA, autism therapy jobs, Auvia careers, behavior technician jobs"
        canonicalUrl="https://auviatherapy.com/careers"
        jsonLd={careersSchema}
      />
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="blob-bg w-[700px] h-[700px] bg-brand-mint/30 bottom-[10%] right-[-10%]" />
        <div className="blob-bg w-[600px] h-[600px] bg-brand-lavender/30 top-[20%] left-[-10%]" />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Hero Section */}
        <div className="mb-12 lg:mb-20 relative z-10 text-center lg:text-left">
          <motion.div className="route-title-block car-hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-teal text-xs md:text-sm font-bold uppercase tracking-widest mb-6 block font-kids">Careers at Auvia</span>
            <h1 className="text-display font-kids font-bold text-brand-ink mb-8 lg:mb-10 leading-tight">
              A Supportive Team, <br className="hidden lg:block" />
              <Mark className="text-brand-teal italic">A Happy Family.</Mark>
            </h1>
            <p className="text-body-main text-brand-sage font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Join a team that celebrates neurodiversity. We provide a calm, supportive environment where you can help children thrive while growing your own career.
            </p>
            <div className="car-hero__stickers" aria-hidden="true">
              <span className="car-sticker car-sticker--0"><Smile strokeWidth={2} /></span>
              <span className="car-sticker car-sticker--1"><Heart strokeWidth={2} /></span>
              <span className="car-sticker car-sticker--2"><GraduationCap strokeWidth={2} /></span>
              <span className="car-sticker car-sticker--3"><Coffee strokeWidth={2} /></span>
              <span className="car-sticker car-sticker--4"><Star strokeWidth={2} /></span>
              <span className="car-sticker car-sticker--5"><Sun strokeWidth={2} /></span>
            </div>
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <div className="car-benefits grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 mb-12 lg:mb-16 relative z-10">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className={`bp-card bp-card--${i} relative h-full`}
            >
              <span className="bp-card__ghost" aria-hidden="true">{benefit.icon}</span>
              <div className="bp-card__icon w-14 h-14 rounded-full flex items-center justify-center mb-5 relative z-10">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-kids font-bold text-brand-ink mb-6 relative z-10">{benefit.title}</h3>
              <p className="bp-card__text leading-relaxed font-medium relative z-10 text-sm md:text-base">{benefit.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Culture & Values */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="car-culture mb-12 lg:mb-16 relative z-10"
        >
          <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-section font-kids font-bold text-brand-ink mb-7 lg:mb-8 leading-tight">Our Culture is Rooted in <Mark className="text-brand-teal italic">Our Values.</Mark></h2>
              <div className="car-values grid grid-cols-2 gap-3 sm:gap-4">
                {values.map((value, i) => (
                  <div key={i} className={`car-value car-value--${i} space-y-2 sm:space-y-3`}>
                    <div className="car-value__icon w-12 h-12 rounded-full flex items-center justify-center">
                      {value.icon}
                    </div>
                    <h4 className="text-xl font-kids font-bold text-brand-ink">{value.title}</h4>
                    <p className="car-culture__text font-medium text-sm leading-relaxed">{value.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="car-culture__media relative">
              <span className="car-culture__tape" aria-hidden="true" />
              <span className="car-culture__heart" aria-hidden="true"><Heart strokeWidth={2} size={22} /></span>
              <div className="car-culture__photo overflow-hidden">
                <picture>
                  <source srcSet="/images/kids-team.webp" type="image/webp" />
                  <img src="/images/kids-team.webp" alt="Team culture" className="w-full h-full object-cover" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                </picture>
              </div>
              <div className="car-culture__note p-5 lg:p-6 rounded-[24px] max-w-xs">
                <p className="text-brand-ink font-kids font-bold text-lg mb-1">Team First</p>
                <p className="car-culture__notetext text-sm font-medium">We believe that taking care of our team is the first step in taking care of our families.</p>
              </div>
            </div>
          </div>
        </motion.div>



        {/* Job Openings */}
        <div className="car-jobs mb-12 lg:mb-16 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-7 lg:mb-9 gap-5 lg:gap-8">
            <div className="max-w-2xl">
              <h2 className="text-section font-kids font-bold text-brand-ink mb-3 leading-tight">Current Opportunities</h2>
              <p className="text-brand-sage font-medium text-base lg:text-lg">Find your place in our growing family. We're looking for passionate individuals to join us in Irving, Allen, Austin, Dallas, Houston, and beyond.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" aria-pressed={locationFilter === 'all' && roleFilter === 'all'} onClick={() => { setLocationFilter('all'); setRoleFilter('all'); }} className={`car-filter px-5 py-2 rounded-full font-bold text-xs border transition-all ${locationFilter === 'all' && roleFilter === 'all' ? 'bg-brand-teal text-white border-brand-teal' : 'bg-white text-brand-teal border-brand-teal/5 hover:border-brand-teal'}`}>All Locations</button>
              <button type="button" aria-pressed={roleFilter === 'clinical'} onClick={() => setRoleFilter(roleFilter === 'all' ? 'clinical' : 'all')} className={`car-filter px-5 py-2 rounded-full font-bold text-xs border transition-all ${roleFilter === 'clinical' ? 'bg-brand-teal text-white border-brand-teal' : 'bg-white text-brand-teal border-brand-teal/5 hover:border-brand-teal'}`}>Clinical Roles</button>
            </div>
          </div>

          <div className="space-y-5">
            {loading ? (
              <div className="text-center py-12 text-brand-sage font-medium">Loading open positions...</div>
            ) : jobs.length === 0 ? (
              <div className="car-empty text-center py-10 lg:py-12 px-6 rounded-[32px] relative">
                <span className="car-empty__shape car-empty__shape--a" aria-hidden="true" />
                <span className="car-empty__shape car-empty__shape--b" aria-hidden="true"><Star strokeWidth={2} size={18} /></span>
                <span className="car-empty__shape car-empty__shape--c" aria-hidden="true"><Sparkles strokeWidth={2} size={18} /></span>
                <span className="car-empty__icon mx-auto mb-4"><Smile strokeWidth={2} aria-hidden="true" size={30} /></span>
                <p className="car-empty__text font-medium max-w-xl mx-auto">{jobsUnavailable ? "Current opportunities are temporarily unavailable. Please contact our team about open roles." : "Our family is currently full, but please check back soon or send your resume below!"}</p>
              </div>
            ) : jobs
                .filter(job => {
                  if (roleFilter === 'clinical') return job.category?.toLowerCase().includes('clinical');
                  return true;
                })
                .map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i, 4) * 0.05 }}
                className={`car-job car-job--${i % 4} flex flex-col lg:flex-row justify-between lg:items-center gap-6 p-6 sm:p-8 rounded-[28px] group relative`}
              >
                <div className="lg:max-w-2xl relative z-10">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
                    <h3 className="text-2xl font-kids font-bold text-brand-ink group-hover:text-brand-teal transition-colors duration-500">{job.title}</h3>
                    <span className={`car-job__type px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest`}>{job.type}</span>
                  </div>
                  <p className="text-brand-sage font-medium mb-4 leading-relaxed">{job.description}</p>
                  <div className="flex gap-6 text-sm font-bold text-brand-sage font-kids">
                    <span className="flex items-center gap-2"><Star strokeWidth={1.75} aria-hidden="true" size={14} className="text-brand-teal" /> {job.location}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedJobForApply(job);
                    setIsApplyModalOpen(true);
                  }}
                  className="btn-friendly-primary py-4 px-10 flex items-center justify-center gap-3 whitespace-nowrap"
                >
                  Apply Now <ArrowRight strokeWidth={1.75} aria-hidden="true" size={20} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resume Drop */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="car-resume bg-brand-teal rounded-[32px] px-6 py-12 md:p-14 text-center text-white relative overflow-hidden"
        >
          <span className="car-resume__flower car-resume__flower--a" aria-hidden="true" />
          <span className="car-resume__flower car-resume__flower--b" aria-hidden="true" />
          <span className="car-resume__star car-resume__star--a" aria-hidden="true"><Star strokeWidth={2} size={22} /></span>
          <span className="car-resume__star car-resume__star--b" aria-hidden="true"><Heart strokeWidth={2} size={20} /></span>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-section font-kids font-bold mb-5 leading-tight">
              A Warm <br className="hidden lg:block" />
              <span className="car-resume__squiggle text-brand-peach italic">Career Path.</span>
            </h2>
            <p className="car-resume__text text-body-main mb-8 font-medium">
              If you don't see a role that matches your expertise, we invite you to share your resume for future consideration within our sanctuaries.
            </p>
            <a href="mailto:admin@auviatherapy.com?subject=Resume%20Submission" className="car-resume__btn inline-flex items-center justify-center gap-3 px-9 lg:px-11 py-3.5 rounded-full font-kids font-bold text-base lg:text-lg">
              Send Your Resume <Send strokeWidth={2} aria-hidden="true" size={18} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Apply Modal */}
      <AnimatePresence>
        {isApplyModalOpen && selectedJobForApply && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 lg:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute inset-0 bg-brand-ink/60 backdrop-blur-sm"
            />
            <motion.div
              ref={applyDialogRef} role="dialog" aria-modal="true" aria-label={`Apply for ${selectedJobForApply.title}`} initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl p-8 md:p-12 overflow-hidden max-h-[90vh] flex flex-col border border-brand-teal/5"
            >
              <button
                type="button" aria-label="Close application form" onClick={() => setIsApplyModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-brand-ink hover:bg-brand-cream rounded-full transition-all"
              >
                <X strokeWidth={1.75} aria-hidden="true" size={20} />
              </button>

              {isSubmitSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-brand-mint text-brand-teal rounded-full flex items-center justify-center shadow-inner">
                    <CheckCircle strokeWidth={1.75} aria-hidden="true" size={36} />
                  </div>
                  <h3 className="text-2xl font-kids font-bold text-brand-ink">Application Submitted!</h3>
                  <p className="text-brand-sage text-sm max-w-sm">
                    Thank you for applying for the <strong>{selectedJobForApply.title}</strong> role. Our clinical recruitment team will review your credentials and follow up soon.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <span className="text-xs font-bold text-brand-teal uppercase tracking-widest block font-kids mb-2">Job Application</span>
                    <h3 className="text-2xl md:text-3xl font-kids font-bold text-brand-ink leading-tight">
                      Apply for <span className="text-brand-teal italic">{selectedJobForApply.title}</span>
                    </h3>
                  </div>

                  <form aria-busy={isSubmitting} onSubmit={handleApplySubmit} className="space-y-5 overflow-y-auto pr-1 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label htmlFor="careers-firstName" className="text-[10px] font-bold uppercase tracking-widest opacity-50">First Name</label>
                        <input
                          type="text"
                          id="careers-firstName" autoComplete="given-name"
                          required
                          value={applyForm.firstName}
                          onChange={e => setApplyForm({...applyForm, firstName: e.target.value})}
                          className="w-full px-5 py-4 bg-brand-cream border border-brand-teal/10 rounded-2xl focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/5 outline-none font-medium"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="careers-lastName" className="text-[10px] font-bold uppercase tracking-widest opacity-50">Last Name</label>
                        <input
                          type="text"
                          id="careers-lastName" autoComplete="family-name"
                          required
                          value={applyForm.lastName}
                          onChange={e => setApplyForm({...applyForm, lastName: e.target.value})}
                          className="w-full px-5 py-4 bg-brand-cream border border-brand-teal/10 rounded-2xl focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/5 outline-none font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label htmlFor="careers-email" className="text-[10px] font-bold uppercase tracking-widest opacity-50">Email Address</label>
                        <input
                          type="email"
                          id="careers-email" autoComplete="email"
                          required
                          value={applyForm.email}
                          onChange={e => setApplyForm({...applyForm, email: e.target.value})}
                          className="w-full px-5 py-4 bg-brand-cream border border-brand-teal/10 rounded-2xl focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/5 outline-none font-medium font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="careers-phone" className="text-[10px] font-bold uppercase tracking-widest opacity-50">Phone Number</label>
                        <input
                          type="tel"
                          id="careers-phone" autoComplete="tel"
                          required
                          value={applyForm.phone}
                          onChange={e => setApplyForm({...applyForm, phone: e.target.value})}
                          className="w-full px-5 py-4 bg-brand-cream border border-brand-teal/10 rounded-2xl focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/5 outline-none font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="careers-resumeUrl" className="text-[10px] font-bold uppercase tracking-widest opacity-50">Resume Link (Google Drive, Dropbox, etc.)</label>
                      <input
                        type="url"
                        id="careers-resumeUrl"
                        required
                        placeholder="https://drive.google.com/..."
                        value={applyForm.resumeUrl}
                        onChange={e => setApplyForm({...applyForm, resumeUrl: e.target.value})}
                        className="w-full px-5 py-4 bg-brand-cream border border-brand-teal/10 rounded-2xl focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/5 outline-none font-medium font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="careers-message" className="text-[10px] font-bold uppercase tracking-widest opacity-50">Message / Cover Note</label>
                      <textarea
                        rows={3}
                        id="careers-message"
                        value={applyForm.message}
                        onChange={e => setApplyForm({...applyForm, message: e.target.value})}
                        placeholder="Tell us briefly about your experience and why you want to join Auvia..."
                        className="w-full px-5 py-4 bg-brand-cream border border-brand-teal/10 rounded-2xl focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/5 outline-none font-medium resize-none"
                      />
                    </div>

                    {submitError && (
                      <p role="alert" className="form-error">
                        We couldn't send your application. Your answers are still here. Try again, or call (945) 758-1087.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="car-submit w-full py-4 bg-[#141414] hover:bg-brand-teal text-white rounded-full font-kids font-bold text-lg disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
    </MotionConfig>
  );
};
