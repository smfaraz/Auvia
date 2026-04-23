import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, ArrowRight, ShieldCheck, FileText, 
  CreditCard, CheckCircle2, HeartHandshake, Map
} from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, query, onSnapshot, orderBy } from 'firebase/firestore';

export const InsuranceFinancialAssistance = () => {
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
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
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FCFAF7] selection:bg-brand-teal/20 text-brand-ink pt-28 lg:pt-40 font-sans overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto mb-16 lg:mb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start gap-2 text-brand-sage text-xs md:text-sm font-bold uppercase tracking-widest mb-6">
              <span>Resources</span> <ChevronDown className="-rotate-90" size={14} /> <span>Insurance</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-[80px] font-kids font-bold leading-[1.1] mb-6 lg:mb-8 tracking-tight text-brand-ink">
              Insurance coverage <br className="hidden lg:block" />
              <span className="text-brand-teal italic">& financial assistance.</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-sage font-medium leading-relaxed mb-8 lg:mb-10 max-w-lg mx-auto lg:mx-0">
              Navigating insurance for ABA therapy can feel overwhelming. At Auvia, we simplify the process so you can focus on supporting your child.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4">
              <button 
                onClick={() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-brand-teal text-white px-8 lg:px-10 py-4 lg:py-5 rounded-full font-kids font-bold text-lg hover:bg-[#3d7a6f] transition-all shadow-xl flex items-center justify-center gap-2 group"
              >
                Get started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => navigate('/locations')}
                className="bg-white border-2 border-brand-teal/10 text-brand-ink px-8 lg:px-10 py-4 lg:py-5 rounded-full font-kids font-bold text-lg hover:bg-brand-cream transition-all"
              >
                View Locations
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1, delay: 0.2 }}
            className="relative mt-8 lg:mt-0"
          >
            {/* Soft decorative blob behind image */}
            <div className="absolute top-[-10%] right-[-10%] w-full h-full bg-brand-mint/40 rounded-full blur-3xl -z-10" />
            
            <div className="rounded-[40px] lg:rounded-[60px] overflow-hidden border-[8px] lg:border-[12px] border-white shadow-3xl rotate-1 lg:rotate-2 hover:rotate-0 transition-transform duration-700">
              <img src="https://picsum.photos/seed/family-happy/800/800" alt="Happy family" className="w-full aspect-[4/3] lg:aspect-square object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Provider Ticker (Matches video exactly) */}
      <section className="py-10 border-y border-brand-teal/10 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <p className="font-kids font-bold text-lg text-brand-ink whitespace-nowrap">We accept these insurance providers:</p>
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 lg:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-700 w-full">
             {['BCBS TX', 'AETNA', 'CIGNA', 'UNITED HEALTHCARE', 'MOLINA'].map(p => (
               <span key={p} className="text-2xl font-bold tracking-tighter">{p}</span>
             ))}
             <span className="text-brand-teal font-bold">+ Full List</span>
          </div>
        </div>
      </section>

      {/* 3. We Simplify Insurance (3-Column Layout) */}
      <section className="py-20 lg:py-32 bg-[#FCFAF7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-16 lg:mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-kids font-bold mb-6 italic-span">We simplify insurance <span className="text-brand-teal italic">for ABA therapy</span></h2>
            <p className="text-lg md:text-xl text-brand-sage font-medium leading-relaxed">
              We are proud to partner with many of the largest health insurers. Most families find that their coverage includes ABA therapy for autism spectrum disorder (ASD), and we're here to help guide you every step of the way.
            </p>
            <p className="font-bold text-brand-ink mt-8">Here's how we support your family:</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: <ShieldCheck />, title: "Insurance verification", desc: "We call your insurance company to verify your child's ABA therapy coverage, deductible information, and any out-of-pocket costs." },
              { icon: <FileText />, title: "Pre-authorization support", desc: "If required, we submit all paperwork to your insurance provider to confirm medical necessity for ABA therapy." },
              { icon: <CreditCard />, title: "Direct billing", desc: "After each ABA therapy session, we submit claims directly to your insurance company for hassle-free payment." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }} 
                className="bg-white p-8 lg:p-10 rounded-[32px] lg:rounded-[40px] border border-brand-teal/5 shadow-sm hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-brand-mint rounded-2xl flex items-center justify-center text-brand-teal mb-6 lg:mb-8">
                  {React.cloneElement(item.icon, { size: 28 })}
                </div>
                <h3 className="text-xl lg:text-2xl font-kids font-bold mb-3 lg:mb-4">{item.title}</h3>
                <p className="text-brand-sage font-medium leading-relaxed text-sm md:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Staggered Text Sections (Replicating Auvia's dense but clean layout) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Column Content */}
            <div className="space-y-24">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }}>
                <h3 className="text-4xl font-kids font-bold mb-6">In-network vs. out-of-network coverage</h3>
                <p className="text-brand-sage font-medium leading-relaxed mb-6">
                  At Auvia, we are credentialed and contracted with major insurance providers. This means we have a specific agreement that outlines our rates with each payer.
                </p>
                <p className="text-brand-sage font-medium leading-relaxed mb-6">
                  For families, this makes a big difference: <strong className="text-brand-ink bg-brand-mint/50 px-2 rounded">in-network coverage almost always means your out-of-pocket cost is much lower</strong> than out-of-network coverage.
                </p>
                <Link to="/insurance-by-state">
  <button className="flex items-center gap-3 px-6 py-3 bg-brand-mint/30 rounded-2xl text-brand-teal font-kids font-bold text-lg hover:bg-brand-mint hover:scale-105 transition-all group shadow-sm border border-brand-teal/10">
    Insurance acceptance by state 
    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
  </button>
</Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }}>
                <h3 className="text-4xl font-kids font-bold mb-6">What affects the cost of ABA therapy?</h3>
                <ul className="space-y-4 text-brand-sage font-medium">
                  <li className="flex gap-3"><CheckCircle2 className="text-brand-teal shrink-0 mt-1" size={20} /> <span><strong>Therapist credentials:</strong> All services are billed under a BCBA, but costs may vary based on provider qualifications.</span></li>
                  <li className="flex gap-3"><CheckCircle2 className="text-brand-teal shrink-0 mt-1" size={20} /> <span><strong>Location:</strong> Rates differ by state and region.</span></li>
                  <li className="flex gap-3"><CheckCircle2 className="text-brand-teal shrink-0 mt-1" size={20} /> <span><strong>Therapy hours:</strong> More therapy hours lead to a higher overall cost.</span></li>
                  <li className="flex gap-3"><CheckCircle2 className="text-brand-teal shrink-0 mt-1" size={20} /> <span><strong>Insurance coverage:</strong> Deductibles, copays, and limits on hours vary by plan.</span></li>
                </ul>
              </motion.div>
              
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }}>
                <h3 className="text-4xl font-kids font-bold mb-6">Financial assistance for ABA therapy</h3>
                <p className="text-brand-sage font-medium leading-relaxed mb-6">
                  We believe every child deserves access to ABA therapy, no matter their family's financial situation. We know that costs, especially when reaching your maximum out-of-pocket (MOOP) limit, can feel overwhelming.
                </p>
                <p className="font-bold text-brand-ink mb-4">Here's how we can help ease that burden:</p>
                <ul className="space-y-4 text-brand-sage font-medium mb-8">
                  <li className="bg-[#FCFAF7] p-4 rounded-2xl border border-brand-teal/5"><strong>Insurance navigation:</strong> Our team will review your benefits and explain your coverage options.</li>
                  <li className="bg-brand-mint/30 p-4 rounded-2xl border border-brand-teal/5"><strong>Charity Care program:</strong> Families who qualify under federal poverty guidelines may receive financial assistance.</li>
                </ul>
                <button className="bg-brand-teal text-white px-8 py-4 rounded-2xl font-kids font-bold hover:bg-[#3d7a6f] transition-all">
                  Contact us today
                </button>
              </motion.div>
            </div>

            {/* Right Column Content */}
            <div className="space-y-24 mt-12 md:mt-32">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} className="bg-brand-cream/40 p-10 rounded-[40px] border border-brand-teal/10">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-teal mb-6 shadow-sm"><ShieldCheck size={24} /></div>
                <h3 className="text-2xl font-kids font-bold mb-4">In-network insurance providers</h3>
                <p className="text-brand-sage font-medium leading-relaxed mb-6">
                  We are in-network with many of the largest health insurers. We currently work with Blue Cross Blue Shield, Aetna, United Healthcare, Cigna, Ascension, Optum, UMR, PHCS, and Beacon Health Options.
                </p>
                <p className="text-sm text-brand-sage italic">
                  *Your total responsibility depends on your plan's maximum out-of-pocket (MOOP) amount. We will never charge more than your MOOP.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }}>
                <h3 className="text-4xl font-kids font-bold mb-6">How much does ABA therapy cost in the U.S.?</h3>
                <p className="text-brand-sage font-medium leading-relaxed mb-6">
                  All private commercial health insurance companies and Medicaid programs in the U.S. cover ABA therapy to some degree. Since coverage can be complex, our specialists verify your benefits for you.
                </p>
                <p className="font-bold text-brand-ink mb-4">We provide clear information on:</p>
                <ul className="space-y-3 text-brand-sage font-medium list-disc list-inside ml-2">
                  <li>Your out-of-pocket costs</li>
                  <li>How many ABA therapy hours your insurance covers</li>
                  <li>The number of hours recommended by your child's clinical team</li>
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }}>
                <h3 className="text-4xl font-kids font-bold mb-6">What if my insurance requires a prior authorization?</h3>
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
                      <div className="w-8 h-8 rounded-full bg-brand-mint text-brand-teal font-bold flex items-center justify-center shrink-0">{i+1}</div>
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
      <section className="py-32 bg-[#FCFAF7] border-y border-brand-teal/5 relative min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT SIDE: STICKY COLUMN */}
          <div className="lg:col-span-5 lg:sticky lg:top-40 h-fit">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl lg:text-6xl font-kids font-bold mb-6 text-brand-ink">
                ABA therapy for autism: <br />
                <span className="text-brand-teal italic">Texas Benefits</span>
              </h2>
              <p className="text-xl text-brand-sage font-medium leading-relaxed mb-8">
                Texas has strong mandates requiring many health insurance plans to cover autism-related services. 
              </p>
              
              <div className="mt-12 rounded-[40px] overflow-hidden shadow-2xl hidden lg:block border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1594608661623-aa0bd3a69d9d?w=800" 
                  alt="Texas Family Support" 
                  className="w-full aspect-video object-cover" 
                />
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: SCROLLABLE CARDS */}
          <div className="lg:col-span-7 space-y-10 pb-20">
            {[
              { title: "The Texas Mandate", desc: "Under the Texas Insurance Code Chapter 1355, state-regulated health plans are required to provide coverage for the screening, diagnosis, and treatment of Autism Spectrum Disorder." },
              { title: "Age & Enrollment", desc: "The mandate typically requires coverage for children from the time of diagnosis through age 18. This ensures consistent support through the most critical developmental years." },
              { title: "No Benefit Caps", desc: "Texas law prohibits insurance companies from placing dollar limits on ABA therapy that are different from other medical services." },
              { title: "Qualified Providers", desc: "For ABA services to be covered in Texas, they must be provided or supervised by a Board Certified Behavior Analyst (BCBA)." },
              { title: "Treatment Plans", desc: "Auvia handles the creation of these clinical plans and manages the submission to your insurance provider." }
            ].map((benefit, i) => (
              <motion.div 
                key={benefit.title} 
                initial={{ opacity: 0, y: 60 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, amount: 0.4 }} 
                transition={{ 
                  duration: 0.6, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="bg-white p-8 lg:p-14 rounded-[32px] sm:rounded-[50px] border border-brand-teal/5 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-brand-mint/30 flex items-center justify-center shrink-0 text-brand-teal font-kids font-bold text-xl">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-kids font-bold text-brand-ink mb-4 group-hover:text-brand-teal transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-lg sm:text-xl text-brand-sage font-medium leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-10 bg-brand-teal rounded-[50px] text-white text-center"
            >
              <p className="text-2xl font-kids font-bold mb-4 italic">"We speak the language of Texas insurance."</p>
              <p className="text-white/80">Our specialized billing team handles the paperwork so you don't have to.</p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 6. FAQs Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <h2 className="text-5xl font-kids font-bold mb-6">Frequently asked <span className="text-brand-teal italic">questions</span></h2>
            <button className="text-brand-teal font-bold flex items-center gap-2 group hover:underline">
              View all FAQs <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-[#FCFAF7] rounded-[32px] border-2 border-brand-teal/10 overflow-hidden transition-all duration-300">
              <div className="px-8 py-6">
                <h4 className="font-kids font-bold text-xl text-brand-ink mb-4">Does Auvia provide autism assessments or diagnoses?</h4>
                <p className="text-brand-sage font-medium leading-relaxed">
                  We will help to connect you to resources to get your child evaluated and get a diagnosis report.
                </p>
              </div>
            </div>
            {faqsLoading ? (
              <div className="text-center py-10 opacity-50 font-medium">Loading FAQs...</div>
            ) : (
              displayFaqs.map((faq, index) => (
                <div key={faq.id} className="bg-[#FCFAF7] rounded-[32px] border border-brand-teal/5 overflow-hidden transition-all duration-300">
                  <button 
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left font-bold text-xl font-kids text-brand-ink hover:text-brand-teal transition-colors"
                  >
                    {faq.q}
                    <ChevronDown className={`text-brand-teal shrink-0 transition-transform duration-300 ${openFAQ === index ? 'rotate-180' : ''}`} />
                  </button>
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
              ))
            )}
          </div>
        </div>
      </section>

      {/* 7. Bottom Form Section */}
      <section id="form-section" className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-brand-teal rounded-[60px] lg:rounded-[80px] p-10 lg:p-20 shadow-3xl relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 p-20 opacity-10 rotate-12"><HeartHandshake size={300} /></div>
          
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-5xl lg:text-7xl font-kids font-bold mb-6">Prepare them for a bright <br /><span className="text-brand-peach italic">future with ABA therapy</span></h2>
            <p className="text-white/80 text-xl font-medium">Start ABA therapy today. Our online interest form helps us match you with a center near you.</p>
          </div>
          
          {formSubmitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
              <CheckCircle2 size={80} className="mx-auto mb-6 text-brand-mint" />
              <h2 className="text-4xl font-kids font-bold mb-4">Request Received!</h2>
              <p className="text-xl text-white/80 mb-8">An admissions specialist will reach out to you within 24–48 hours.</p>
              <button 
                onClick={() => setFormSubmitted(false)}
                className="bg-white text-brand-teal px-10 py-4 rounded-2xl font-bold hover:bg-brand-mint transition-colors"
              >
                Submit Another Request
              </button>
            </motion.div>
          ) : (
            <form className="space-y-6 relative z-10 bg-white/10 p-8 lg:p-12 rounded-[40px] backdrop-blur-md border border-white/20" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Parent/Guardian First Name*</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full bg-white text-brand-ink rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-brand-peach/50 transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Parent/Guardian Last Name*</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full bg-white text-brand-ink rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-brand-peach/50 transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Email*</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-white text-brand-ink rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-brand-peach/50 transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Phone number*</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-white text-brand-ink rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-brand-peach/50 transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Child's Date of Birth</label>
                  <input type="date" name="childDob" value={formData.childDob} onChange={handleChange} className="w-full bg-white text-brand-ink rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-brand-peach/50 transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Child's First Name</label>
                  <input type="text" name="childName" value={formData.childName} onChange={handleChange} className="w-full bg-white text-brand-ink rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-brand-peach/50 transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Current Insurance Provider*</label>
                  <select 
                    name="insuranceProvider" 
                    value={formData.insuranceProvider} 
                    onChange={handleChange} 
                    required 
                    className="w-full bg-white text-brand-ink rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-brand-peach/50 transition-all appearance-none cursor-pointer font-medium"
                  >
                    <option value="">Please Select</option>
                    <option value="BCBS TX">BCBS TX</option>
                    <option value="AETNA COMMERCIAL">AETNA COMMERCIAL</option>
                    <option value="CIGNA">CIGNA</option>
                    <option value="UNITED HEALTHCARE">UNITED HEALTHCARE</option>
                    <option value="WELLPOINT MEDICAID">WELLPOINT MEDICAID</option>
                    <option value="AETNA MEDICAID">AETNA MEDICAID</option>
                    <option value="SUPERIOR HEALTH">SUPERIOR HEALTH</option>
                    <option value="MOLINA">MOLINA</option>
                    <option value="CARELON">CARELON</option>
                    <option value="TRICARE">TRICARE</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Zip code*</label>
                  <input type="text" name="zip" value={formData.zip} onChange={handleChange} required placeholder="ex. 73301" className="w-full bg-white text-brand-ink rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-brand-peach/50 transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Find nearby Centers*</label>
                  <select name="center" value={formData.center} onChange={handleChange} required className="w-full bg-white text-brand-ink rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-brand-peach/50 transition-all appearance-none cursor-pointer font-medium">
                    <option value="">Please Select</option>
                    <option value="allen">Allen, TX</option>
                    <option value="austin">Austin, TX</option>
                    <option value="dallas">Dallas, TX</option>
                    <option value="houston">Houston, TX</option>
                    <option value="blaine">Blaine, MN</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-white/5 p-6 rounded-[32px] border border-white/20 mt-6">
                <input 
                  type="checkbox" 
                  id="consent" 
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1.5 accent-brand-peach h-5 w-5 shrink-0 cursor-pointer" 
                />
                <label htmlFor="consent" className="text-sm text-white/80 leading-relaxed cursor-pointer">
                  By checking the box, and submitting this form, you consent to receive text messages (SMS) regarding, but not limited to answer your questions, provide follow-up, and general communication from Auvia Behavior Centers. Message frequency may vary. Message and data rates may apply. You can reply STOP to opt out of further messaging, reply HELP for assistance, or call 888-352-0091. Please see our Privacy Policy <Link to="/privacy" className="text-white underline hover:text-brand-peach transition-colors">here</Link>.
                </label>
              </div>

              <button 
                type="submit"
                disabled={formSubmitting}
                className={`w-full lg:w-auto bg-brand-peach text-brand-ink px-12 py-5 rounded-2xl font-kids font-bold text-xl hover:bg-white transition-all mt-8 mx-auto block shadow-xl ${formSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {formSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

// --- DATA ARRAYS ---

const stateMandates = [
  { name: "Arizona", desc: "In Arizona, the 'Arizona Autism Mandate' requires insurance plans to cover the diagnosis and treatment of autism, including ABA therapy, ensuring individuals with autism have access to necessary therapies. This mandate, established through House Bill 2847, became effective in 2008." },
  { name: "Colorado", desc: "Colorado's 2009 Senate Bill 09-244 requires most major insurance plans to provide diagnostic support and treatment for children with autism. In 2015, Senate Bill 15-015 removed all age and dollar caps on autism care, including for applied behavior analysis services." },
  { name: "Illinois", desc: "Public Law 095-1005 in Illinois mandates certain health insurers to cover the diagnostic support and treatment of autism spectrum disorder for individuals under 21 years old. Treatment includes therapeutic services such as applied behavior analysis therapy." },
  { name: "Minnesota", desc: "Minnesota's autism insurance bill, HF 1233, was enacted in 2013 and covers individuals with autism under 18 years of age. Under this law, young people can receive diagnostic support, early intensive behavioral interventions like ABA therapy, and speech therapy." },
  { name: "Texas", desc: "SB 946, the autism insurance bill in Texas, requires insurance companies to cover all generally recognized autism-related services prescribed by the child's primary care physician (PCP) so long as the autism diagnosis was made before the child's tenth birthday." }
];
