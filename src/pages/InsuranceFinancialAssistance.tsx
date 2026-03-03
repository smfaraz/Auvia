import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, ArrowRight, ShieldCheck, FileText, 
  CreditCard, CheckCircle2, HeartHandshake, Map
} from 'lucide-react';

export const InsuranceFinancialAssistance = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="bg-[#FCFAF7] selection:bg-brand-teal/20 text-brand-ink pt-32 lg:pt-40 font-sans overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative px-6 lg:px-12 max-w-7xl mx-auto mb-20 lg:mb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 text-brand-sage text-sm font-bold uppercase tracking-widest mb-6">
              <span>Resources</span> <ChevronDown className="-rotate-90" size={14} /> <span>Insurance</span>
            </div>
            <h1 className="text-6xl lg:text-[80px] font-kids font-bold leading-[1.05] mb-8 tracking-tight text-brand-ink">
              Insurance coverage <br />
              <span className="text-brand-teal italic">& financial assistance.</span>
            </h1>
            <p className="text-xl text-brand-sage font-medium leading-relaxed mb-10 max-w-lg">
              Navigating insurance for applied behavior analysis (ABA) therapy can feel overwhelming. At Auvia Kids, we simplify the process so you can focus on supporting your child.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-brand-teal text-white px-10 py-5 rounded-full font-kids font-bold text-lg hover:bg-[#3d7a6f] transition-all shadow-xl flex items-center gap-2 group"
              >
                Get started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white border-2 border-brand-teal/10 text-brand-ink px-10 py-5 rounded-full font-kids font-bold text-lg hover:bg-brand-cream transition-all">
                View Locations
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            {/* Soft decorative blob behind image */}
            <div className="absolute top-[-10%] right-[-10%] w-full h-full bg-brand-mint/40 rounded-full blur-3xl -z-10" />
            
            <div className="rounded-[60px] overflow-hidden border-[12px] border-white shadow-3xl rotate-2 hover:rotate-0 transition-transform duration-700">
              <img src="https://picsum.photos/seed/family-happy/800/800" alt="Happy family" className="w-full aspect-[4/3] lg:aspect-square object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Provider Ticker (Matches video exactly) */}
      <section className="py-10 border-y border-brand-teal/10 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <p className="font-kids font-bold text-lg text-brand-ink whitespace-nowrap">We accept most insurance providers:</p>
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 lg:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-700 w-full">
             {['Cigna', 'UMR', 'Medica', 'Allegiance', 'Aetna'].map(p => (
               <span key={p} className="text-2xl font-bold tracking-tighter">{p}</span>
             ))}
             <span className="text-brand-teal font-bold">+120 more</span>
          </div>
        </div>
      </section>

      {/* 3. We Simplify Insurance (3-Column Layout) */}
      <section className="py-32 bg-[#FCFAF7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <h2 className="text-5xl font-kids font-bold mb-6">We simplify insurance <span className="text-brand-teal italic">for ABA therapy</span></h2>
            <p className="text-xl text-brand-sage font-medium leading-relaxed">
              We are proud to partner with many of the largest health insurers. Most families find that their coverage includes ABA therapy for autism spectrum disorder (ASD), and we're here to help guide you every step of the way.
            </p>
            <p className="font-bold text-brand-ink mt-8">Here's how we support your family:</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <ShieldCheck />, title: "Insurance verification", desc: "We call your insurance company to verify your child's ABA therapy coverage, deductible information, and any out-of-pocket costs." },
              { icon: <FileText />, title: "Pre-authorization support", desc: "If required, we submit all paperwork to your insurance provider to confirm medical necessity for ABA therapy." },
              { icon: <CreditCard />, title: "Direct billing", desc: "After each ABA therapy session, we submit claims directly to your insurance company for hassle-free payment." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }} 
                className="bg-white p-10 rounded-[40px] border border-brand-teal/5 shadow-sm hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-brand-mint rounded-2xl flex items-center justify-center text-brand-teal mb-8">
                  {React.cloneElement(item.icon, { size: 32 })}
                </div>
                <h3 className="text-2xl font-kids font-bold mb-4">{item.title}</h3>
                <p className="text-brand-sage font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Staggered Text Sections (Replicating ABC's dense but clean layout) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Column Content */}
            <div className="space-y-24">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }}>
                <h3 className="text-4xl font-kids font-bold mb-6">In-network vs. out-of-network coverage</h3>
                <p className="text-brand-sage font-medium leading-relaxed mb-6">
                  At Auvia Kids, we are credentialed and contracted with major insurance providers. This means we have a specific agreement that outlines our rates with each payer.
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

      {/* 5. Sticky State Benefits Section (Matches video exactly) */}
      <section className="py-32 bg-[#FCFAF7] border-y border-brand-teal/5 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Sticky Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <h2 className="text-5xl lg:text-6xl font-kids font-bold mb-6">
              ABA therapy for autism: <br />
              <span className="text-brand-teal italic">Benefits by state</span>
            </h2>
            <p className="text-xl text-brand-sage font-medium leading-relaxed mb-8">
              Each U.S. state has specific laws that mandate health insurance plans to cover autism-related services for children. The extent of these benefits can vary.
            </p>
            <button className="bg-brand-teal text-white px-8 py-4 rounded-2xl font-kids font-bold hover:bg-[#3d7a6f] transition-all shadow-lg">
              Find an ABA therapy center near you
            </button>
            <div className="mt-12 rounded-[40px] overflow-hidden shadow-2xl hidden lg:block">
              <img src="https://picsum.photos/seed/child-eating/600/400" alt="Child" className="w-full aspect-video object-cover" />
            </div>
          </div>

          {/* Right Scrollable Column of Cards */}
          <div className="lg:col-span-7 space-y-6">
            {stateMandates.map((state, i) => (
              <motion.div 
                key={state.name} 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.1 }}
                className="bg-white p-8 lg:p-10 rounded-[40px] border border-brand-teal/10 shadow-sm hover:shadow-xl transition-shadow"
              >
                <h3 className="text-3xl font-kids font-bold text-brand-ink mb-4">{state.name}</h3>
                <p className="text-brand-sage font-medium leading-relaxed">{state.desc}</p>
              </motion.div>
            ))}
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
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#FCFAF7] rounded-[32px] border border-brand-teal/5 overflow-hidden transition-all duration-300">
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
            ))}
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
          
          <form className="space-y-6 relative z-10 bg-white/10 p-8 lg:p-12 rounded-[40px] backdrop-blur-md border border-white/20" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2">Parent/Guardian First Name*</label>
                <input type="text" className="w-full bg-white text-brand-ink rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-brand-peach/50 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Parent/Guardian Last Name*</label>
                <input type="text" className="w-full bg-white text-brand-ink rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-brand-peach/50 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Email*</label>
                <input type="email" className="w-full bg-white text-brand-ink rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-brand-peach/50 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Phone number*</label>
                <input type="tel" className="w-full bg-white text-brand-ink rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-brand-peach/50 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Child's Date of Birth</label>
                <input type="date" className="w-full bg-white text-brand-ink rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-brand-peach/50 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Child's First Name</label>
                <input type="text" className="w-full bg-white text-brand-ink rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-brand-peach/50 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Zip code*</label>
                <input type="text" placeholder="ex. 73301" className="w-full bg-white text-brand-ink rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-brand-peach/50 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Find nearby Centers*</label>
                <select className="w-full bg-white text-brand-ink rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-brand-peach/50 transition-all appearance-none">
                  <option>Please Select</option>
                  <option>Austin Center</option>
                  <option>Dallas Center</option>
                </select>
              </div>
            </div>

            <div className="flex items-start gap-3 mt-6">
              <input type="checkbox" id="consent" className="mt-1.5 w-5 h-5 rounded border-white/20 text-brand-peach focus:ring-brand-peach" />
              <label htmlFor="consent" className="text-sm text-white/80 leading-relaxed">
                I consent to receive occasional text messages from Auvia Kids regarding educational resources and follow-up related to my inquiry. Message and data rates may apply. Reply STOP to opt out.
              </label>
            </div>

            <button className="w-full lg:w-auto bg-brand-peach text-brand-ink px-12 py-5 rounded-2xl font-kids font-bold text-xl hover:bg-white transition-colors mt-8 mx-auto block shadow-xl">
              Submit Request
            </button>
          </form>
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

const faqs = [
  { q: "Can someone help me understand my ABA insurance benefits?", a: "Yes. ABC has a dedicated team of insurance specialists who handle verifying your benefits, explaining deductibles and copays, submitting paperwork, and answering financial questions. Our goal is to remove barriers so families can focus on milestone moments, not paperwork." },
  { q: "Do I have to reach my deductible before insurance covers ABA therapy?", a: "In most cases, yes. Families are responsible for their deductible and any copays or coinsurance until the plan's maximum out-of-pocket (MOOP) is reached. After that, insurance typically covers 100% of additional ABA therapy costs for the year." },
  { q: "What if my insurance doesn't cover all of the recommended ABA therapy hours?", a: "If your insurance company approves fewer hours than recommended, we will file an appeal on your behalf, explore financial assistance options to help close the gap, and work with your family to make sure your child receives the highest possible level of support." }
];