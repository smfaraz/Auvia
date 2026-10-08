import '../styles/pages.css';
import React from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2, Phone, FileText } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, MotionConfig } from 'motion/react';
import { SEO } from '../components/SEO';

export const Insurance = () => {
  const navigate = useNavigate();

  return (
    <MotionConfig reducedMotion="user">
    <div className="inner-public-page public-page ic-page pt-20 lg:pt-24 pb-16 lg:pb-24 bg-brand-cream overflow-x-hidden min-h-screen">
      <SEO 
        title="Insurance Support & Verification | Auvia Behavior Centers"
        description="Simplifying insurance for autism care. We offer complimentary insurance verification to ensure your child's ABA therapy journey starts with complete clarity."
        keywords="insurance verification, autism therapy insurance, aba clinic pricing, child autism coverage, in network aba therapy"
        canonicalUrl="https://auviatherapy.com/insurance"
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="blob-bg w-[500px] h-[500px] bg-brand-sky top-[-10%] right-[-10%]" />
        
        <div className="ic-hero-grid">
        <div className="route-title-block max-w-4xl mb-12 lg:mb-20 relative z-10 text-center lg:text-left">
          <span className="text-brand-teal text-xs md:text-sm font-bold uppercase tracking-widest mb-6 block font-kids">Financial Guidance</span>
          <h1 className="text-display font-kids font-bold text-brand-ink mb-8 lg:mb-10 leading-tight">
            Seamless Coverage, <br className="hidden lg:block" />
            <span className="text-brand-teal italic">Complete Clarity.</span>
          </h1>
          <p className="text-body-main text-brand-sage font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Navigating insurance for Applied Behavior Analysis shouldn't be a barrier to care. Our dedicated intake specialists handle benefit verifications, pre-authorizations, and claims coordination so your family can focus on what matters most.
          </p>
        </div>

        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.92, rotate: 4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="ic-hero-photo"
        >
          <img src="/images/kids-insurance.webp" alt="" decoding="async" />
        </motion.div>
        </div>

        <div className="ic-ins-bento grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 relative z-10">
          <span aria-hidden="true" className="ic-deco ic-deco--star ic-ins-deco-a" />
          <span aria-hidden="true" className="ic-deco ic-deco--squiggle ic-ins-deco-b" />
          <span aria-hidden="true" className="ic-deco ic-deco--heart ic-ins-deco-c" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="ic-panel ic-panel--white p-6 sm:p-8 lg:p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck strokeWidth={1.75} aria-hidden="true" className="text-brand-teal" size={28} />
              <h2 className="text-section font-kids font-bold text-brand-ink">In-Network Payers</h2>
            </div>
            <p className="text-brand-sage text-sm mb-8 font-medium">
              We are contracted with leading national and regional commercial payers and Medicaid programs:
            </p>
            <div className="ic-payers grid grid-cols-2 gap-3">
              {['BCBS TX', 'Aetna Commercial', 'Cigna', 'UnitedHealthcare', 'Wellpoint Medicaid', 'Aetna Medicaid', 'Superior Health', 'Molina Healthcare', 'Carelon', 'TRICARE'].map((p, i) => (
                <motion.div
                  key={p}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.15 + i * 0.04, ease: [0.34, 1.4, 0.64, 1] }}
                  className="ic-payer flex items-center gap-2.5"
                >
                  <CheckCircle2 strokeWidth={1.75} aria-hidden="true" size={16} className="text-brand-teal shrink-0" />
                  <span className="text-brand-ink font-bold font-kids text-sm">{p}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t-2 border-dashed border-brand-ink/15">
              <Link to="/insurance-by-state" className="ic-text-link text-brand-teal font-bold text-sm inline-flex items-center gap-2 hover:underline">
                View state-by-state insurance acceptance <ArrowRight strokeWidth={1.75} aria-hidden="true" size={16} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="ic-panel ic-panel--teal bg-brand-teal text-white p-6 sm:p-8 lg:p-10"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FileText strokeWidth={1.75} aria-hidden="true" size={28} />
                <h2 className="text-section font-kids font-bold">Complimentary Verification</h2>
              </div>
              <p className="text-white/90 mb-6 leading-relaxed font-medium">
                Our care coordinators will contact your insurance provider directly to verify your deductible status, co-pay obligations, and approved therapy hours at zero cost to you.
              </p>
              <ul className="space-y-3 mb-8 text-sm text-white/80 font-medium">
                <li className="flex items-center gap-2">✓ No-obligation benefits review</li>
                <li className="flex items-center gap-2">✓ Fast turnaround within 24-48 hours</li>
                <li className="flex items-center gap-2">✓ Guidance on state autism mandates</li>
              </ul>
            </div>
            <div className="ic-panel__actions flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4">
              <button 
                onClick={() => navigate('/insurance-financial-assistance#form-section')} 
                className="ic-btn-sun px-8 py-4 font-kids font-bold flex items-center justify-center gap-2"
              >
                Verify My Coverage <ArrowRight strokeWidth={1.75} aria-hidden="true" size={18} />
              </button>
              <a 
                href="tel:9457581087" 
                className="ic-btn-ghost px-6 py-4 font-kids font-bold flex items-center justify-center gap-2"
              >
                <Phone strokeWidth={1.75} aria-hidden="true" size={18} /> (945) 758-1087
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    </MotionConfig>
  );
};

