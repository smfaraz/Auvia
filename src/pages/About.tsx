import React from 'react';
import { motion } from 'motion/react';
import { Heart, Users, Star, Smile, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const About = () => {
  const navigate = useNavigate();
  return (
    <div className="pt-48 pb-32 bg-brand-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="blob-bg w-[600px] h-[600px] bg-brand-peach top-[-10%] right-[-10%]" />

        <div className="max-w-4xl mb-32 relative z-10">
          <span className="text-brand-teal text-sm font-bold uppercase tracking-widest mb-6 block font-kids">Our Story</span>
          <h1 className="text-6xl lg:text-7xl font-kids font-bold text-brand-ink mb-10 leading-tight">
            Built with Love, <br />
            <span className="text-brand-teal italic">Made for You.</span>
          </h1>
          <p className="text-xl text-brand-sage font-medium leading-relaxed max-w-2xl">
            Auvia is a special place where every child can feel happy, safe, and ready to learn new things at their own pace.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-40 relative z-10">
          {[
            { icon: <Heart />, title: "Kindness First", text: "We treat every child with a lot of love and respect, just like they are part of our own family.", color: "bg-brand-mint" },
            { icon: <Users />, title: "Family Fun", text: "We love working with moms and dads to make sure every child has a great time learning.", color: "bg-brand-peach" },
            { icon: <Star />, title: "Great Teachers", text: "Our teachers are very smart and use fun ways to help kids learn and grow every day.", color: "bg-brand-lavender" },
            { icon: <Smile />, title: "Happy Wins", text: "We celebrate every new thing you learn with a big smile and a happy high-five!", color: "bg-brand-sky" }
          ].map((value, i) => (
            <div key={i} className="card-friendly">
              <div className={`w-16 h-16 rounded-[24px] ${value.color} text-brand-teal flex items-center justify-center mb-10 shadow-sm`}>
                {value.icon}
              </div>
              <h3 className="text-2xl font-kids font-bold text-brand-ink mb-6">{value.title}</h3>
              <p className="text-brand-sage leading-relaxed font-medium">{value.text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-20 items-center mb-32 relative z-10">
          <div className="lg:w-1/2">
            <h2 className="text-4xl lg:text-5xl font-kids font-bold text-brand-ink mb-10 leading-tight">A Happy Place for <br /><span className="italic text-brand-teal">Every Friend.</span></h2>
            <p className="text-brand-sage mb-8 leading-relaxed font-medium text-lg">
              We know that every child is different and special. That's why we made our centers very cozy and fun, so you can feel safe while you learn.
            </p>
            <p className="text-brand-sage mb-12 leading-relaxed font-medium text-lg">
              Our team works closely with your family to find the best ways for you to play, learn, and reach your big goals.
            </p>
            <button onClick={() => navigate('/careers')} className="btn-friendly-primary">Meet Our Clinical Team</button>
          </div>
          <div className="lg:w-1/2">
            <div className="rounded-[60px] overflow-hidden shadow-2xl aspect-[4/5] border-[16px] border-white rotate-2">
              <img
                src="https://picsum.photos/seed/friendly-about/1000/1200"
                alt="Our team at work"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
