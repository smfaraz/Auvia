import React from 'react';
import { motion } from 'motion/react';
import { Smile } from 'lucide-react';

export const MagicMascot = () => {
  return (
    <motion.div
      initial={{ x: 100 }}
      whileHover={{ x: 0 }}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] cursor-pointer hidden lg:block"
    >
      <div className="bg-brand-mint p-4 rounded-l-[32px] border-y-4 border-l-4 border-white shadow-2xl flex items-center gap-4">
        <div className="w-12 h-12 bg-brand-teal rounded-2xl flex items-center justify-center text-white shadow-lg animate-bounce">
          <Smile size={28} />
        </div>
        <div className="pr-4">
          <p className="font-kids font-bold text-brand-teal leading-none">Hi there!</p>
          <p className="text-[10px] font-bold text-brand-sage uppercase tracking-widest mt-1">I'm Auvie</p>
        </div>
      </div>
    </motion.div>
  );
};
