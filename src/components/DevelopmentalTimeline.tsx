import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, MessageCircle, Sparkles, Users, Star, Compass } from 'lucide-react';

const milestones = [
  {
    age: "18 Months",
    title: "First Connections",
    achievement: "Social Spark",
    desc: "Beginning to use simple words, pointing to show things, and showing affection to familiar people.",
    icon: <Heart size={24} />,
    color: "bg-brand-mint",
    borderColor: "border-[#A7D7C5]",
    textColor: "text-brand-teal"
  },
  {
    age: "2 Years",
    title: "Exploring Together",
    achievement: "Language Explorer",
    desc: "Playing alongside other children, following simple instructions, and starting to use two-word phrases.",
    icon: <Compass size={24} />,
    color: "bg-brand-peach",
    borderColor: "border-[#F7B29B]",
    textColor: "text-[#D96B4D]"
  },
  {
    age: "3 Years",
    title: "Creative Spark",
    achievement: "Creative Thinker",
    desc: "Engaging in imaginative play, showing a wide range of emotions, and starting to share with friends.",
    icon: <Sparkles size={24} />,
    color: "bg-brand-mint",
    borderColor: "border-[#A7D7C5]",
    textColor: "text-brand-teal"
  },
  {
    age: "4 Years",
    title: "Social Discovery",
    achievement: "Team Player",
    desc: "Playing cooperatively with others, telling stories, and following more complex rules in games.",
    icon: <Users size={24} />,
    color: "bg-brand-peach",
    borderColor: "border-[#F7B29B]",
    textColor: "text-[#D96B4D]"
  },
  {
    age: "5 Years",
    title: "Ready for the World",
    achievement: "Future Leader",
    desc: "Showing more independence, understanding rules vs. fair play, and ready for the classroom environment.",
    icon: <Star size={24} />,
    color: "bg-brand-mint",
    borderColor: "border-[#A7D7C5]",
    textColor: "text-brand-teal"
  }
];

export const DevelopmentalTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Advanced Scroll Tracking to "Draw" the line as the user scrolls
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative w-full max-w-5xl mx-auto py-10" ref={containerRef}>
      
      {/* Background Track Line (Dashed) */}
      <div className="absolute left-[40px] lg:left-1/2 top-0 bottom-0 w-1.5 -translate-x-1/2 border-l-[3px] border-dashed border-brand-teal/20 z-0" />
      
      {/* Animated Foreground Progress Line */}
      <motion.div 
        style={{ height: lineHeight }}
        className="absolute left-[40px] lg:left-1/2 top-0 w-1.5 -translate-x-1/2 bg-brand-teal z-0 rounded-full origin-top"
      />

      {/* Milestone Cards */}
      <div className="space-y-16 lg:space-y-32 relative z-10">
        {milestones.map((milestone, index) => {
          const isEven = index % 2 === 0;

          return (
            <div key={index} className="flex flex-col lg:flex-row items-center w-full relative">
              
              {/* Left Side (Empty on mobile, alternating on desktop) */}
              <div className={`hidden lg:flex flex-1 justify-end pr-16 ${!isEven ? 'lg:invisible' : ''}`}>
                <TimelineCard milestone={milestone} direction="right" />
              </div>

              {/* Center Icon Node */}
              <div className="absolute left-[40px] lg:left-1/2 -translate-x-1/2 flex items-center justify-center">
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                  className={`w-16 h-16 rounded-full border-4 border-white shadow-xl flex items-center justify-center ${milestone.color} ${milestone.textColor} z-20`}
                >
                  {milestone.icon}
                </motion.div>
              </div>

              {/* Right Side (Always visible on mobile, alternating on desktop) */}
              <div className={`flex-1 pl-[100px] lg:pl-16 w-full ${isEven ? 'lg:hidden' : ''}`}>
                <TimelineCard milestone={milestone} direction="left" />
              </div>

            </div>
          );
        })}
      </div>

      {/* The "Every Journey is Unique" Closing Card */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-32 relative z-10"
      >
        <div className="bg-brand-ink p-10 lg:p-16 rounded-[40px] shadow-2xl text-center max-w-3xl mx-auto border-4 border-white relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent)] opacity-50" />
          
          <div className="w-16 h-16 bg-brand-teal rounded-full flex items-center justify-center mx-auto mb-8 text-white group-hover:scale-110 transition-transform duration-500">
            <MessageCircle size={32} />
          </div>
          
          <h3 className="text-4xl lg:text-5xl font-kids font-bold text-white mb-6">
            Every Journey is <span className="text-brand-peach italic">Unique.</span>
          </h3>
          <p className="text-xl text-white/80 font-medium leading-relaxed max-w-2xl mx-auto">
            While these milestones are common, every child grows in their own special way. We're here to celebrate and support your child's individual path to success.
          </p>
        </div>
      </motion.div>

    </div>
  );
};

// --- Sub-Component for the individual Glassmorphic Cards ---
const TimelineCard = ({ milestone, direction }: { milestone: any, direction: 'left' | 'right' }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: direction === 'left' ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 60, damping: 15 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`bg-white p-8 rounded-[40px] shadow-lg border-2 border-transparent hover:${milestone.borderColor} transition-all duration-300 w-full group relative overflow-hidden`}
    >
      {/* Background subtle color blob on hover */}
      <div className={`absolute -top-20 -right-20 w-40 h-40 ${milestone.color} rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
      
      <div className="relative z-10 text-left">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <span className={`px-4 py-1.5 rounded-full ${milestone.color} ${milestone.textColor} font-kids font-bold text-sm uppercase tracking-widest`}>
            {milestone.age}
          </span>
          <span className="text-sm font-bold text-brand-ink/50 flex items-center gap-1">
            Achievement: <span className="text-brand-teal">{milestone.achievement}</span>
          </span>
        </div>
        
        <h3 className="text-3xl font-kids font-bold text-brand-ink mb-4 group-hover:text-brand-teal transition-colors">
          {milestone.title}
        </h3>
        
        <p className="text-brand-sage text-lg font-medium leading-relaxed">
          {milestone.desc}
        </p>
      </div>
    </motion.div>
  );
};