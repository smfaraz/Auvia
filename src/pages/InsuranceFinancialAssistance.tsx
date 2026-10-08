import '../styles/pages.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import {
  ChevronDown, ArrowRight, ShieldCheck, FileText,
  CreditCard, CheckCircle2, HeartHandshake, Map
} from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, query, onSnapshot, orderBy } from 'firebase/firestore';
import { SEO } from '../components/SEO';

export const InsuranceFinancialAssistance = () => {
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    childDob: '',
    childName: '',
    zip: '',
    insuranceProvider: '',
    center: '',
    consent: false
  });

  const [faqs, setFaqs] = useState<any[]>([]);
  const [faqsLoading, setFaqsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'faqs'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const faqsData = snapshot.docs.map(doc => ({
        id: doc.id,
        q: doc.data().question,
        a: doc.data().answer,
        category: doc.data().category
      }));
      setFaqs(faqsData);
      setFaqsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const insuranceFaqs = faqs.filter(f => f.category === 'Insurance' || f.category === 'Financial');
  const displayFaqs = insuranceFaqs.length > 0 ? insuranceFaqs : faqs.slice(0, 3);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setSubmitError(false);
    try {
      await addDoc(collection(db, 'leads'), {
        ...formData,
        status: 'new',
        source: 'insurance_inquiry_form',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setFormSubmitted(true);
      setFormData({
        firstName: '', lastName: '', email: '', phone: '',
        childDob: '', childName: '', zip: '', insuranceProvider: '', center: '', consent: false
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(true);
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="inner-public-page public-page ic-page bg-brand-cream selection:bg-brand-teal/20 text-brand-ink pt-20 lg:pt-24 font-sans overflow-x-hidden min-h-screen">
      <SEO
        title="Insurance & Financial Assistance | Auvia Behavior Centers"
        description="Navigating insurance coverage and financial options for ABA therapy at Auvia. We accept major Texas networks including BCBS, Aetna, Cigna, and Medicaid."
        keywords="aba therapy cost, autism financial assistance, medicaid aba therapy, bcbs autism coverage, autism grants, financial help for autism"
        canonicalUrl="https://auviatherapy.com/insurance-financial-assistance"
      />

      {/* 1. Hero Section */}
      <section className="ic-fa-hero relative px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="route-title-block text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start gap-2 text-brand-sage text-xs md:text-sm font-bold uppercase tracking-widest mb-6">
              <span>Resources</span> <ChevronDown strokeWidth={1.75} aria-hidden="true" className="-rotate-90" size={14} /> <span>Insurance</span>
            </div>
            <h1 className="text-display font-kids font-bold leading-[1.1] mb-6 lg:mb-8 tracking-tight text-brand-ink">
              Insurance coverage <br className="hidden lg:block" />
              <span className="text-brand-teal italic">& financial assistance.</span>
            </h1>
            <p className="text-body-main text-brand-sage font-medium leading-relaxed mb-8 lg:mb-10 max-w-lg mx-auto lg:mx-0">
              Navigating insurance for ABA therapy can feel overwhelming. At Auvia, we simplify the process so you can focus on supporting your child.
            </p>
            <div className="ic-fa-hero__cta flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4">
              <button
                onClick={() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-brand-teal text-white px-8 lg:px-10 py-4 rounded-full font-kids font-bold text-lg hover:bg-[#0f574f] flex items-center justify-center gap-2 group"
              >
                Get started <ArrowRight strokeWidth={1.75} aria-hidden="true" size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/locations')}
                className="ic-btn-ink px-8 lg:px-10 py-4 font-kids font-bold text-lg"
              >
                View Locations
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="ic-fa-hero__media relative"
          >
            {/* Solid colour block and flower behind image */}
            <div aria-hidden="true" className="ic-fa-hero__pop" />
            <div aria-hidden="true" className="ic-fa-hero__flower" />
            <span aria-hidden="true" className="ic-deco ic-deco--star ic-fa-deco-star" />

            <div className="ic-photo-frame rotate-1 lg:rotate-2 hover:rotate-0 transition-transform duration-500">
              <picture>
                <source srcSet="/images/kids-insurance.webp" type="image/webp" />
                <img src="/images/kids-insurance.webp" alt="Happy family" className="w-full aspect-[4/3] object-cover" loading="lazy" decoding="async" />
              </picture>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Provider Ticker (Matches video exactly) */}
      <section className="ic-ticker">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-5 lg:gap-10">
          <p className="font-kids font-bold text-lg text-brand-ink whitespace-nowrap">We accept these insurance providers:</p>
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 w-full">
             {['BCBS TX', 'AETNA', 'CIGNA', 'UNITED HEALTHCARE', 'MOLINA'].map(p => (
               <span key={p} className="ic-ticker__pill">{p}</span>
             ))}
             <span className="ic-ticker__more">+ Full List</span>
          </div>
        </div>
      </section>

      {/* 3. We Simplify Insurance (3-Column Layout) */}
      <section className="ic-simplify py-14 lg:py-20 bg-white relative">
        <span aria-hidden="true" className="ic-deco ic-deco--squiggle ic-fa-deco-a" />
        <span aria-hidden="true" className="ic-deco ic-deco--heart ic-fa-deco-b" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-10 lg:mb-12"
          >
            <h2 className="text-section font-kids font-bold mb-6 italic-span">We simplify insurance <span className="text-brand-teal italic">for ABA therapy</span></h2>
            <p className="text-body-main text-brand-sage font-medium leading-relaxed">
              We are proud to partner with many of the largest health insurers. Most families find that their coverage includes ABA therapy for autism spectrum disorder (ASD), and we're here to help guide you every step of the way.
            </p>
            <p className="font-bold text-brand-ink mt-6">Here's how we support your family:</p>
          </motion.div>

          <div className="ic-simplify__grid ic-snap grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: <ShieldCheck strokeWidth={1.75} aria-hidden="true" />, title: "Insurance verification", desc: "We call your insurance company to verify your child's ABA therapy coverage, deductible information, and any out-of-pocket costs." },
              { icon: <FileText strokeWidth={1.75} aria-hidden="true" />, title: "Pre-authorization support", desc: "If required, we submit all paperwork to your insurance provider to confirm medical necessity for ABA therapy." },
              { icon: <CreditCard strokeWidth={1.75} aria-hidden="true" />, title: "Direct billing", desc: "After each ABA therapy session, we submit claims directly to your insurance company for hassle-free payment." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="ic-solid-card p-7 lg:p-9"
              >
                <div className="ic-chip w-14 h-14 rounded-full flex items-center justify-center mb-5 lg:mb-6">
                  {React.cloneElement(item.icon, { size: 28 })}
                </div>
                <h3 className="text-xl font-kids font-bold mb-3 text-brand-ink">{item.title}</h3>
                <p className="ic-solid-card__text font-medium leading-relaxed text-sm md:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Staggered Text Sections (Replicating Auvia's dense but clean layout) */}
      <section className="ic-topics ic-scallop py-14 lg:py-20">
        <span aria-hidden="true" className="ic-deco ic-deco--flower ic-fa-deco-c" />
        <span aria-hidden="true" className="ic-deco ic-deco--star ic-fa-deco-d" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="grid md:grid-cols-2 gap-5 lg:gap-7 items-start">

            {/* Left Column Content */}
            <div className="ic-topic-col ic-snap space-y-5 lg:space-y-7">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="ic-topic">
                <h3 className="ic-topic__title font-kids font-bold mb-4">In-network vs. out-of-network coverage</h3>
                <p className="text-brand-sage font-medium leading-relaxed mb-6">
                  At Auvia, we are credentialed and contracted with major insurance providers. This means we have a specific agreement that outlines our rates with each payer.
                </p>
                <p className="text-brand-sage font-medium leading-relaxed mb-6">
                  For families, this makes a big difference: <strong className="ic-mark text-brand-ink px-1.5 rounded">in-network coverage almost always means your out-of-pocket cost is much lower</strong> than out-of-network coverage.
                </p>
                <Link to="/insurance-by-state" className="ic-chip-link inline-flex items-center gap-3 px-6 py-3 font-kids font-bold text-base group">
    Insurance acceptance by state
    <ArrowRight strokeWidth={1.75} aria-hidden="true" size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
</Link>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="ic-topic">
                <h3 className="ic-topic__title font-kids font-bold mb-4">What affects the cost of ABA therapy?</h3>
                <ul className="space-y-4 text-brand-sage font-medium">
                  <li className="flex gap-3"><CheckCircle2 strokeWidth={1.75} aria-hidden="true" className="text-brand-teal shrink-0 mt-1" size={20} /> <span><strong>Therapist credentials:</strong> All services are billed under a BCBA, but costs may vary based on provider qualifications.</span></li>
                  <li className="flex gap-3"><CheckCircle2 strokeWidth={1.75} aria-hidden="true" className="text-brand-teal shrink-0 mt-1" size={20} /> <span><strong>Location:</strong> Rates differ by state and region.</span></li>
                  <li className="flex gap-3"><CheckCircle2 strokeWidth={1.75} aria-hidden="true" className="text-brand-teal shrink-0 mt-1" size={20} /> <span><strong>Therapy hours:</strong> More therapy hours lead to a higher overall cost.</span></li>
                  <li className="flex gap-3"><CheckCircle2 strokeWidth={1.75} aria-hidden="true" className="text-brand-teal shrink-0 mt-1" size={20} /> <span><strong>Insurance coverage:</strong> Deductibles, copays, and limits on hours vary by plan.</span></li>
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="ic-topic">
                <h3 className="ic-topic__title font-kids font-bold mb-4">Financial assistance for ABA therapy</h3>
                <p className="text-brand-sage font-medium leading-relaxed mb-6">
                  We believe every child deserves access to ABA therapy, no matter their family's financial situation. We know that costs, especially when reaching your maximum out-of-pocket (MOOP) limit, can feel overwhelming.
                </p>
                <p className="font-bold text-brand-ink mb-4">Here's how we can help ease that burden:</p>
                <ul className="space-y-3 text-brand-ink font-medium mb-6">
                  <li className="ic-note ic-note--sun p-4 rounded-2xl"><strong>Insurance navigation:</strong> Our team will review your benefits and explain your coverage options in full.</li>
                  <li className="ic-note ic-note--mint p-4 rounded-2xl"><strong>Charity Care program:</strong> Families with financial hardship may be eligible for assistance. Please contact our billing team to discuss your situation confidentially.</li>
                </ul>
                <button type="button" onClick={() => navigate('/contact')} className="bg-brand-teal text-white px-8 py-3.5 rounded-full font-kids font-bold hover:bg-[#0f574f]">
                  Contact us today
                </button>
              </motion.div>
            </div>

            {/* Right Column Content */}
            <div className="ic-topic-col ic-snap space-y-5 lg:space-y-7">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="ic-topic ic-topic--sun">
                <div className="ic-chip ic-chip--white w-12 h-12 rounded-full flex items-center justify-center mb-5"><ShieldCheck strokeWidth={1.75} aria-hidden="true" size={24} /></div>
                <h3 className="ic-topic__title font-kids font-bold mb-4">In-network insurance providers</h3>
                <p className="text-brand-sage font-medium leading-relaxed mb-6">
                  We are in-network with many of the largest health insurers. We currently work with Blue Cross Blue Shield, Aetna, United Healthcare, Cigna, Ascension, Optum, UMR, PHCS, and Beacon Health Options.
                </p>
                <p className="text-sm text-brand-sage italic">
                  *Your total responsibility depends on your plan's maximum out-of-pocket (MOOP) amount. We will never charge more than your MOOP.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="ic-topic">
                <h3 className="ic-topic__title font-kids font-bold mb-4">How much does ABA therapy cost in the U.S.?</h3>
                <p className="text-brand-sage font-medium leading-relaxed mb-6">
                  All state-regulated private commercial health insurance plans and Medicaid programs in the U.S. are required to cover ABA therapy to some degree. Note: self-funded employer plans (governed by federal ERISA law) are not subject to state mandates — our specialists will verify your specific benefits for you.
                </p>
                <p className="font-bold text-brand-ink mb-4">We provide clear information on:</p>
                <ul className="space-y-3 text-brand-sage font-medium list-disc list-inside ml-2">
                  <li>Your out-of-pocket costs</li>
                  <li>How many ABA therapy hours your insurance covers</li>
                  <li>The number of hours recommended by your child's clinical team</li>
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="ic-topic">
                <h3 className="ic-topic__title font-kids font-bold mb-4">What if my insurance requires a prior authorization?</h3>
                <p className="text-brand-sage font-medium leading-relaxed mb-6">
                  Some plans require a prior authorization before therapy can begin. This confirms medical necessity. The process usually involves:
                </p>
                <div className="space-y-4">
                  {[
                    "Clinicians complete a thorough assessment of your child's needs.",
                    "Our team compiles documentation and submits a request.",
                    "The insurance company reviews it (typically 7–14 business days).",
                    "We receive approval or work with you on next steps/appeals."
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="ic-num w-8 h-8 rounded-full font-bold flex items-center justify-center shrink-0">{i+1}</div>
                      <p className="text-brand-sage font-medium mt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. TEXAS-SPECIFIC BENEFITS SECTION */}
      <section className="ic-texas ic-scallop py-14 lg:py-20 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* HEADER ROW: TITLE + PHOTO */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 lg:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="lg:col-span-7"
            >
              <h2 className="text-section font-kids font-bold mb-4 text-brand-ink">
                ABA therapy for autism: <br />
                <span className="text-brand-teal italic">Texas Benefits</span>
              </h2>
              <p className="ic-texas__lead text-lg lg:text-xl font-medium leading-relaxed max-w-xl">
                Texas has strong mandates requiring many health insurance plans to cover autism-related services.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="ic-texas__media lg:col-span-5 hidden lg:block relative"
            >
              <div aria-hidden="true" className="ic-texas__flower" />
              <div className="ic-photo-frame -rotate-2">
                <img loading="lazy" decoding="async"
                  src="/images/kids-team.webp"
                  alt="Texas Family Support"
                  className="w-full aspect-[16/9] object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* BENEFIT CARDS */}
          <div className="ic-benefits ic-snap grid md:grid-cols-2 gap-5 lg:gap-6">
            {[
              { title: "The Texas Mandate", desc: "Under Texas Insurance Code (including HB 813 effective 2026 and SB 1484), state-regulated health plans are required to provide coverage for the screening, diagnosis, and treatment of Autism Spectrum Disorder." },
              { title: "Age & Enrollment", desc: "Under Texas HB 813 (for plans issued or renewed on or after January 1, 2026), coverage applies from the date of diagnosis without an age-at-diagnosis restriction or upper age limit. For plans under prior law, diagnosis was required before age 10." },
              { title: "No Dollar Benefit Caps", desc: "Texas HB 813 eliminated annual dollar caps on ABA therapy for state-regulated plans. Insurers may not place arbitrary dollar limitations on medically necessary ABA treatment." },
              { title: "Qualified Providers", desc: "For ABA services to be covered in Texas, they must be prescribed by a physician and provided or supervised by a Board Certified Behavior Analyst (BCBA)." },
              { title: "Important: Plan Type Matters", desc: "The Texas mandate applies to fully insured (state-regulated) plans only. Self-funded employer plans governed by federal ERISA law are not required to follow Texas state mandates. Contact your HR department or let our admissions team verify your specific plan." }
            ].map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: (i % 2) * 0.08,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="ic-benefit bg-white p-6 lg:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="ic-num ic-num--lg w-11 h-11 rounded-full flex items-center justify-center shrink-0 font-kids font-bold text-lg">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="ic-benefit__title font-kids font-bold text-brand-ink mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-base text-brand-sage font-medium leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="ic-quote-wrap">
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: [0.34, 1.4, 0.64, 1] }}
              className="ic-quote__photo"
            >
              <img src="/images/kids-aba.webp" alt="" loading="lazy" decoding="async" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="ic-quote p-8 lg:p-10 bg-brand-teal text-white text-center flex flex-col justify-center"
            >
              <p className="text-2xl font-kids font-bold mb-3 italic">"We speak the language of Texas insurance."</p>
              <p className="text-white/90">Our specialized billing team handles the paperwork so you don't have to.</p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 6. FAQs Section */}
      <section className="ic-faqs ic-scallop py-14 lg:py-20 bg-white relative">
        <span aria-hidden="true" className="ic-deco ic-deco--flower ic-fa-deco-e" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <h2 className="text-display font-kids font-bold mb-6">Frequently asked <span className="text-brand-teal italic">questions</span></h2>
            <button type="button" onClick={() => navigate('/parent-help-center#common-questions')} className="ic-text-link text-brand-teal font-bold flex items-center gap-2 group hover:underline">
              View all FAQs <ArrowRight strokeWidth={1.75} aria-hidden="true" size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="ic-faq overflow-hidden">
              <div className="px-6 sm:px-8 py-6">
                <h4 className="font-kids font-bold text-xl text-brand-ink mb-3">Does Auvia provide autism assessments or diagnoses?</h4>
                <p className="text-brand-sage font-medium leading-relaxed">
                  We will connect you with resources to have your child evaluated and receive a formal diagnosis report.
                </p>
              </div>
            </div>
            {faqsLoading ? (
              <div className="text-center py-10 opacity-50 font-medium">Loading FAQs...</div>
            ) : (
              displayFaqs.map((faq, index) => (
                <div key={faq.id} className="ic-faq overflow-hidden">
                  <h3 className="m-0"><button
                    type="button" id={`insurancefinancialassistance-question-${index}`} aria-expanded={openFAQ === index} aria-controls={`insurancefinancialassistance-answer-${index}`} onClick={() => toggleFAQ(index)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left font-bold text-xl font-kids text-brand-ink hover:text-brand-teal transition-colors"
                  >
                    {faq.q}
                    <ChevronDown strokeWidth={1.75} aria-hidden="true" className={`text-brand-teal shrink-0 transition-transform duration-300 ${openFAQ === index ? 'rotate-180' : ''}`} />
                  </button></h3>
                  <div id={`insurancefinancialassistance-answer-${index}`} role="region" aria-labelledby={`insurancefinancialassistance-question-${index}`} hidden={openFAQ !== index}>
<AnimatePresence>
                    {openFAQ === index && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="px-8 pb-8 pt-2 text-brand-sage font-medium leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
</div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 7. Bottom Form Section */}
      <section id="form-section" className="vform-band ic-fa-form">
        <span aria-hidden="true" className="ic-deco ic-deco--star ic-fa-deco-f" />
        <span aria-hidden="true" className="ic-deco ic-deco--squiggle ic-fa-deco-g" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vform-intro"
          >
            <div className="vform-intro__icon"><HeartHandshake strokeWidth={1.75} aria-hidden="true" size={34} /></div>
            <h2 className="text-section font-kids font-bold text-brand-ink mb-4">Prepare them for a bright <br /><span className="text-brand-teal italic">future with ABA therapy</span></h2>
            <p className="text-brand-sage text-lg font-medium">Start ABA therapy today. Our online interest form helps us match you with a center near you.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vform-card"
          >
          {formSubmitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="vform-success text-center py-16">
              <div className="w-20 h-20 bg-brand-mint text-brand-teal rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 strokeWidth={1.75} aria-hidden="true" size={48} />
              </div>
              <h2 className="text-section font-kids font-bold text-brand-ink mb-4">Request Received!</h2>
              <p className="text-brand-sage font-medium mb-8">An admissions specialist will reach out to you within 24–48 hours.</p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="btn-friendly-outline"
              >
                Submit Another Request
              </button>
            </motion.div>
          ) : (
            <form aria-busy={formSubmitting} className="vform space-y-4 md:space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="ia-firstName" className="vform-label">Parent/Guardian First Name*</label>
                  <input type="text" id="ia-firstName" autoComplete="given-name" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full outline-none" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="ia-lastName" className="vform-label">Parent/Guardian Last Name*</label>
                  <input type="text" id="ia-lastName" autoComplete="family-name" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full outline-none" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="ia-email" className="vform-label">Email*</label>
                  <input type="email" id="ia-email" autoComplete="email" name="email" value={formData.email} onChange={handleChange} required className="w-full outline-none" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="ia-phone" className="vform-label">Phone number*</label>
                  <input type="tel" id="ia-phone" autoComplete="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full outline-none" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="ia-childDob" className="vform-label">Child's Date of Birth</label>
                  <input type="date" id="ia-childDob" name="childDob" value={formData.childDob} onChange={handleChange} className="w-full outline-none" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="ia-childName" className="vform-label">Child's First Name</label>
                  <input type="text" id="ia-childName" name="childName" value={formData.childName} onChange={handleChange} className="w-full outline-none" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="ia-insuranceProvider" className="vform-label">Current Insurance Provider*</label>
                  <select
                    id="ia-insuranceProvider"
                    name="insuranceProvider"
                    value={formData.insuranceProvider}
                    onChange={handleChange}
                    required
                    className="w-full outline-none appearance-none cursor-pointer"
                  >
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
                  <label htmlFor="ia-zip" className="vform-label">Zip code*</label>
                  <input type="text" id="ia-zip" autoComplete="postal-code" name="zip" value={formData.zip} onChange={handleChange} required placeholder="ex. 73301" className="w-full outline-none" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor="ia-center" className="vform-label">Find Nearby Centers*</label>
                  <select id="ia-center" name="center" value={formData.center} onChange={handleChange} required className="w-full outline-none appearance-none cursor-pointer">
                    <option value="">Please Select</option>
                    <option value="irving">Irving, TX (Open)</option>
                    <option value="allen">Allen, TX (Upcoming)</option>
                    <option value="austin">Austin, TX (Upcoming)</option>
                    <option value="dallas">Dallas, TX (Upcoming)</option>
                    <option value="houston">Houston, TX (Upcoming)</option>
                    <option value="blaine">Blaine, MN (Upcoming)</option>
                  </select>
                </div>
              </div>

              <div className="vform-consent flex gap-4 items-start p-4 rounded-2xl">
                <input
                  type="checkbox"
                  id="ia-consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1.5 accent-brand-teal h-5 w-5 shrink-0 cursor-pointer"
                />
                <label htmlFor="ia-consent" className="text-small text-brand-sage leading-relaxed cursor-pointer">
                  By checking the box, and submitting this form, you consent to receive text messages (SMS) regarding, but not limited to answering your questions, providing follow-up, and general communication from Auvia Behavior Centers. Consent is not a condition of receiving services. Message frequency may vary. Message and data rates may apply. You can reply STOP to opt out of further messaging, reply HELP for assistance, or call (945) 758-1087. Please see our <Link to="/privacy" className="text-brand-teal underline hover:text-brand-ink transition-colors">Privacy Policy</Link> for details.
                </label>
              </div>

              {submitError && (
                <p role="alert" className="form-error">
                  We couldn't send your form. Your answers are still here. Try again, or call (945) 758-1087.
                </p>
              )}

              <button
                type="submit"
                disabled={formSubmitting}
                className={`btn-friendly-primary w-full flex items-center justify-center ${formSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {formSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          )}
          </motion.div>
        </div>
      </section>
    </div>
    </MotionConfig>
  );
};

// --- DATA ARRAYS ---

const stateMandates = [
  { name: "Arizona", desc: "In Arizona, the 'Arizona Autism Mandate' requires insurance plans to cover the diagnosis and treatment of autism, including ABA therapy, ensuring individuals with autism have access to necessary therapies. This mandate, established through House Bill 2847, became effective in 2008." },
  { name: "Colorado", desc: "Colorado's 2009 Senate Bill 09-244 requires most major insurance plans to provide diagnostic support and treatment for children with autism. In 2015, Senate Bill 15-015 removed all age and dollar caps on autism care, including for applied behavior analysis services." },
  { name: "Illinois", desc: "Public Law 095-1005 in Illinois mandates certain health insurers to cover the diagnostic support and treatment of autism spectrum disorder for individuals under 21 years old. Treatment includes therapeutic services such as applied behavior analysis therapy." },
  { name: "Minnesota", desc: "Minnesota's autism insurance bill, HF 1233, was enacted in 2013 and covers individuals with autism under 18 years of age. Under this law, young people can receive diagnostic support, early intensive behavioral interventions like ABA therapy, and speech therapy." },
  { name: "Texas", desc: "Texas Insurance Code (including HB 813 and SB 1484) requires state-regulated plans to cover recognized autism services including ABA therapy. For plans issued or renewed in 2026 and beyond, HB 813 eliminates age and dollar restrictions. Self-funded ERISA employer plans are governed federally and are not subject to state mandates." }
];
