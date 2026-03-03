import React from 'react';
import { Smile } from 'lucide-react';

export const Insurance = () => {
  return (
    <div className="pt-48 pb-32 bg-brand-cream overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="blob-bg w-[500px] h-[500px] bg-brand-sky top-[-10%] right-[-10%]" />
        
        <div className="max-w-4xl mb-24 relative z-10">
          <span className="text-brand-teal text-sm font-bold uppercase tracking-widest mb-6 block font-kids">Financial Harmony</span>
          <h1 className="text-6xl lg:text-7xl font-kids font-bold text-brand-ink mb-10 leading-tight">
            Easy for <br />
            <span className="text-brand-teal italic">Your Family.</span>
          </h1>
          <p className="text-xl text-brand-sage font-medium leading-relaxed max-w-2xl">
            We help moms and dads with all the insurance paperwork. This way, they can spend more time playing and learning with you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 relative z-10">
          <div className="card-friendly bg-white/80 backdrop-blur-sm">
            <h3 className="text-3xl font-kids font-bold text-brand-ink mb-8">Accepted Providers</h3>
            <div className="grid grid-cols-2 gap-8">
              {['Aetna', 'BCBS', 'Cigna', 'UnitedHealthcare', 'Humana', 'Magellan', 'Beacon', 'Molina'].map(p => (
                <div key={p} className="flex items-center gap-4 group">
                  <div className="w-3 h-3 rounded-full bg-brand-mint group-hover:bg-brand-teal transition-colors" />
                  <span className="text-brand-sage font-bold font-kids text-sm">{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-friendly bg-brand-teal text-white">
            <h3 className="text-3xl font-kids font-bold mb-8">Verification Support</h3>
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
