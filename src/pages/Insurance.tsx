import React from 'react';
import { Smile } from 'lucide-react';
import { SEO } from '../components/SEO';

export const Insurance = () => {
  return (
    <div className="pt-32 lg:pt-40 pb-20 lg:pb-32 bg-brand-cream overflow-x-hidden min-h-screen">
      <SEO 
        title="Insurance Support & Verification | Auvia"
        description="Simplifying insurance for autism care. We offer complimentary insurance verification to ensure your child's ABA therapy journey starts with complete clarity."
        keywords="insurance verification, autism therapy insurance, aba clinic pricing, child autism coverage"
        canonicalUrl="https://auviatherapy.com/insurance"
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="blob-bg w-[500px] h-[500px] bg-brand-sky top-[-10%] right-[-10%]" />
        
        <div className="max-w-4xl mb-12 lg:mb-20 relative z-10 text-center lg:text-left">
          <span className="text-brand-teal text-xs md:text-sm font-bold uppercase tracking-widest mb-6 block font-kids">Financial Harmony</span>
          <h1 className="text-display font-kids font-bold text-brand-ink mb-8 lg:mb-10 leading-tight">
            Easy for <br className="hidden lg:block" />
            <span className="text-brand-teal italic">Your Family.</span>
          </h1>
          <p className="text-body-main text-brand-sage font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
            We help moms and dads with all the insurance paperwork. This way, they can spend more time playing and learning with you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative z-10">
          <div className="card-friendly bg-white/80 backdrop-blur-sm">
            <h3 className="text-section font-kids font-bold text-brand-ink mb-8">Accepted Providers</h3>
            <div className="grid grid-cols-2 gap-8">
              {['BCBS TX', 'Aetna Commercial', 'Cigna', 'UnitedHealthcare', 'Wellpoint Medicaid', 'Aetna Medicaid', 'Superior Health', 'Molina', 'Carelon', 'Tricare'].map(p => (
                <div key={p} className="flex items-center gap-4 group">
                  <div className="w-3 h-3 rounded-full bg-brand-mint group-hover:bg-brand-teal transition-colors" />
                  <span className="text-brand-sage font-bold font-kids text-sm">{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-friendly bg-brand-teal text-white">
            <h3 className="text-section font-kids font-bold mb-8">Verification Support</h3>
            <p className="text-white/80 mb-10 leading-relaxed font-medium">
              Not sure if your provider is covered? Our friendly team offers complimentary insurance verification to ensure your child’s journey begins with clarity.
            </p>
            <button className="bg-white text-brand-teal px-10 py-4 rounded-[24px] font-kids font-bold hover:bg-brand-peach transition-all duration-300 shadow-xl">
              Verify My Coverage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
