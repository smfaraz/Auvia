import React from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2, Phone, FileText } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const Insurance = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20 lg:pt-24 pb-20 lg:pb-32 bg-brand-cream overflow-x-hidden min-h-screen">
      <SEO 
        title="Insurance Support & Verification | Auvia Behavior Centers"
        description="Simplifying insurance for autism care. We offer complimentary insurance verification to ensure your child's ABA therapy journey starts with complete clarity."
        keywords="insurance verification, autism therapy insurance, aba clinic pricing, child autism coverage, in network aba therapy"
        canonicalUrl="https://auviatherapy.com/insurance"
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="blob-bg w-[500px] h-[500px] bg-brand-sky top-[-10%] right-[-10%]" />
        
        <div className="max-w-4xl mb-12 lg:mb-20 relative z-10 text-center lg:text-left">
          <span className="text-brand-teal text-xs md:text-sm font-bold uppercase tracking-widest mb-6 block font-kids">Financial Guidance</span>
          <h1 className="text-display font-kids font-bold text-brand-ink mb-8 lg:mb-10 leading-tight">
            Seamless Coverage, <br className="hidden lg:block" />
            <span className="text-brand-teal italic">Complete Clarity.</span>
          </h1>
          <p className="text-body-main text-brand-sage font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Navigating insurance for Applied Behavior Analysis shouldn't be a barrier to care. Our dedicated intake specialists handle benefit verifications, pre-authorizations, and claims coordination so your family can focus on what matters most.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative z-10">
          <div className="card-friendly bg-white/80 backdrop-blur-sm p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="text-brand-teal" size={28} />
              <h2 className="text-section font-kids font-bold text-brand-ink">In-Network Payers</h2>
            </div>
            <p className="text-brand-sage text-sm mb-8 font-medium">
              We are contracted with leading national and regional commercial payers and Medicaid programs:
            </p>
            <div className="grid grid-cols-2 gap-4">
              {['BCBS TX', 'Aetna Commercial', 'Cigna', 'UnitedHealthcare', 'Wellpoint Medicaid', 'Aetna Medicaid', 'Superior Health', 'Molina Healthcare', 'Carelon', 'TRICARE'].map(p => (
                <div key={p} className="flex items-center gap-3 group">
                  <CheckCircle2 size={16} className="text-brand-teal shrink-0" />
                  <span className="text-brand-ink font-bold font-kids text-sm">{p}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-brand-teal/10">
              <Link to="/insurance-by-state" className="text-brand-teal font-bold text-sm flex items-center gap-2 hover:underline">
                View state-by-state insurance acceptance <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="card-friendly bg-brand-teal text-white p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FileText size={28} />
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
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/insurance-financial-assistance#form-section')} 
                className="bg-white text-brand-teal px-8 py-4 rounded-[20px] font-kids font-bold hover:bg-brand-peach hover:text-white transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
              >
                Verify My Coverage <ArrowRight size={18} />
              </button>
              <a 
                href="tel:9457581087" 
                className="px-6 py-4 rounded-[20px] font-kids font-bold border border-white/30 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <Phone size={18} /> (945) 758-1087
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

