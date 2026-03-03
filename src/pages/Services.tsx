import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Heart, Star, Smile } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Services = () => {
  const navigate = useNavigate();
  const services = [
    {
      title: "Playful Learning Centers",
      age: "18 months – 8 years",
      description: "A warm, exciting space with lots of toys and quiet rooms. Our teachers use fun games to help you explore, grow, and feel happy while you learn.",
      features: ["Fun ways to talk", "Playing with friends", "Doing things on your own", "Kind and smart teachers"],
      image: "https://picsum.photos/seed/friendly-center/1000/800",
      color: "bg-brand-mint"
    },
    {
      title: "Auvia at Home",
      age: "18 months – 13 years",
      description: "We bring our fun care to your favorite place—your home! We play together during your daily routines, making learning feel very natural and cozy.",
      features: ["Fun at home", "Cozy learning", "Help for your family", "Learning new skills"],
      image: "https://picsum.photos/seed/friendly-home/1000/800",
      color: "bg-brand-peach"
    },
    {
      title: "Auvia Academy",
      age: "5 – 12 years",
      description: "We help you get ready for school. We practice how to talk to friends and how to manage your feelings so you feel very brave and ready for the classroom.",
      features: ["Making new friends", "Practicing school tasks", "Managing feelings", "Feeling brave & ready"],
      image: "https://picsum.photos/seed/friendly-academy/1000/800",
      color: "bg-brand-lavender"
    }
  ];

  return (
    <div className="pt-48 pb-32 bg-brand-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="blob-bg w-[400px] h-[400px] bg-brand-mint top-[-10%] left-[-10%]" />

        <div className="max-w-4xl mb-32 relative z-10">
          <span className="text-brand-teal text-sm font-bold uppercase tracking-widest mb-6 block font-kids">Our Programs</span>
          <h1 className="text-6xl lg:text-7xl font-kids font-bold text-brand-ink mb-10 leading-tight">
            Fun Ways to <br />
            <span className="text-brand-teal italic">Learn and Grow.</span>
          </h1>
          <p className="text-xl text-brand-sage font-medium leading-relaxed max-w-2xl">
            We use toys and games to help you learn new things and feel proud of what you can do every day.
          </p>
        </div>

        <div className="space-y-40 relative z-10">
          {services.map((service, idx) => (
            <div key={idx} className={`flex flex-col lg:flex-row gap-20 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="lg:w-1/2">
                <div className={`inline-flex items-center gap-3 px-6 py-2 rounded-full ${service.color} text-brand-teal text-xs font-bold font-kids mb-8 shadow-sm`}>
                  <Smile size={16} />
                  {service.age}
                </div>
                <h2 className="text-4xl lg:text-5xl font-kids font-bold text-brand-ink mb-8">{service.title}</h2>
                <p className="text-brand-sage mb-10 leading-relaxed font-medium text-lg">{service.description}</p>
                <div className="grid sm:grid-cols-2 gap-6 mb-12">
                  {service.features.map(f => (
                    <div key={f} className="flex items-center gap-4 text-sm font-bold text-brand-ink/80 font-kids">
                      <div className="w-2 h-2 rounded-full bg-brand-teal" />
                      {f}
                    </div>
                  ))}
                </div>
                <button onClick={() => navigate('/contact')} className="btn-friendly-primary">Learn More</button>
              </div>
              <div className="lg:w-1/2">
                <div className="rounded-[60px] overflow-hidden shadow-2xl aspect-[4/3] border-[16px] border-white group relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
