import '../styles/pages.css';
import React from 'react';
import { motion, MotionConfig } from 'motion/react';
import {
  BookOpen,
  Heart,
  Shield,
  ClipboardList,
  Users,
  ArrowRight,
  FileText,
  MessageCircle,
  Sparkles, Brain
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const ParentHelpCenter = () => {
  const resources = [
    {
      title: "Understanding Autism",
      description: "Learn about the signs, strengths, and unique developmental paths of autism.",
      icon: <Brain strokeWidth={1.75} aria-hidden="true" />,
      link: "/what-is-autism",
      bgColor: "lp-c-sky"
    },
    {
      title: "ABA Therapy Explained",
      description: "Discover how Applied Behavior Analysis creates meaningful changes in daily life.",
      icon: <Heart strokeWidth={1.75} aria-hidden="true" />,
      link: "/what-is-aba",
      bgColor: "lp-c-leaf"
    },
    {
      title: "Insurance & Coverage",
      description: "Navigate plans, state requirements, and financial assistance options.",
      icon: <Shield strokeWidth={1.75} aria-hidden="true" />,
      link: "/insurance-financial-assistance",
      bgColor: "lp-c-grape"
    },
    {
      title: "Enrollment Process",
      description: "A step-by-step guide on how to begin your child's journey at Auvia.",
      icon: <ClipboardList strokeWidth={1.75} aria-hidden="true" />,
      link: "/contact",
      bgColor: "lp-c-coral"
    }
  ];

  const faqs = [
    {
      q: "How do I know if my child would benefit from ABA therapy?",
      a: "If your child has an autism diagnosis and would benefit from support in functional communication, social connection, emotional regulation, or daily living routines, individualized ABA therapy provides proven, evidence-based strategies to foster lifelong independence."
    },
    {
      q: "What age is ideal to begin therapy?",
      a: "Early intervention (ages 18 months to 6 years) capitalizes on peak neuroplasticity and typically yields the most impactful outcomes — though individual results vary based on each child's unique profile. ABA therapy is also highly effective for school-age children and adolescents."
    },
    {
      q: "Is ABA therapy covered by commercial insurance and Medicaid?",
      a: "Yes. Most major commercial insurance carriers and state Medicaid plans cover medically necessary ABA therapy. Our care coordinators provide complimentary benefits verification and handle all pre-authorizations."
    }
  ];

  return (
    <MotionConfig reducedMotion="user">
    <div className="lp inner-public-page public-page pt-28 lg:pt-36 pb-20 lg:pb-24 relative overflow-x-hidden min-h-screen">
      <SEO
        title="Parent Help Center & Resources | Auvia"
        description="Explore curated guides, autism FAQs, and step-by-step enrollment info to help support your family's ABA therapy journey."
        keywords="parent help center, autism resources, aba therapy guides, family support autism, new parent guide"
        canonicalUrl="https://auviatherapy.com/parent-help-center"
      />
      {/* Background Ornaments */}
      <div className="blob-bg w-[500px] h-[500px] bg-brand-mint/20 top-[-10%] right-[-10%]" />
      <div className="blob-bg w-[400px] h-[400px] bg-brand-peach/20 bottom-[10%] left-[-10%]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <div className="route-title-block max-w-3xl mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-teal/10 text-brand-teal text-xs font-bold uppercase tracking-widest mb-6"
          >
            <BookOpen strokeWidth={1.75} aria-hidden="true" size={14} />
            Knowledge is Empowerment
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-display font-kids font-bold text-brand-ink mb-8 leading-tight"
          >
            Parent <span className="lp-squig text-brand-teal italic">Help Center.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl lp-text font-medium leading-relaxed"
          >
            Explore our curated resources designed to guide you through diagnosis,
            therapy options, and the everyday joys of parenting.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="lp-snap lp-snap--24 lp-tilt lp-count grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 lg:mb-20">
          {resources.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
            >
              <Link to={item.link} className={`lp-block lp-block--lift lp-block--clip ${item.bgColor} flex flex-col !p-7`}>
                <span aria-hidden="true" className="lp-flower" style={{ '--c': '#ffffff', '--s': '130px', right: '-36px', top: '-40px', opacity: 0.45 } as React.CSSProperties} />
                <span aria-hidden="true" className="lp-num" />
                <div className="lp-chip relative mb-5">
                  {React.cloneElement(item.icon as React.ReactElement, { size: 26 })}
                </div>
                <h3 className="lp-h3 relative font-kids font-bold text-brand-ink mb-3">
                  {item.title}
                </h3>
                <p className="relative font-medium leading-relaxed mb-5">
                  {item.description}
                </p>
                <div className="relative mt-auto flex items-center gap-2 text-brand-ink font-extrabold text-sm">
                  Learn more <span className="lp-go"><ArrowRight strokeWidth={2} aria-hidden="true" size={16} /></span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Therapy Experience Section */}
        <section className="mb-16 lg:mb-20">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="lp-block lp-block--clip lp-c-lav lp-sh-grape md:!p-11">
                <span aria-hidden="true" className="lp-flower lp-flower--float" style={{ '--c': 'var(--grape)', '--s': '76px', right: '-18px', bottom: '-18px' } as React.CSSProperties} />
                <div aria-hidden="true" className="lp-photo lp-photo--circle lp-peek lp-sh-grape">
                  <img src="/images/kids-diagnosis.webp" alt="" loading="lazy" decoding="async" />
                </div>
                <h2 className="text-section font-kids font-bold text-brand-ink mb-5 relative pr-20 md:pr-28 md:min-h-[84px]">What is Autism Like?</h2>
                <p className="text-lg mb-7 leading-relaxed relative">
                  Autism is a spectrum of unique neurobiological differences. For children, it often means
                  experiencing the world with heightened sensitivity, incredible focus on interests,
                  and distinct ways of communicating and socializing.
                </p>
                <ul className="lp-bullets mb-7" style={{ '--dot': 'var(--grape)' } as React.CSSProperties}>
                  <li>
                    Sensory-rich experiences
                  </li>
                  <li>
                    Visual learning strengths
                  </li>
                  <li>
                    Unique social perspectives
                  </li>
                </ul>
                <Link to="/what-is-autism" className="lp-link">
                  Deep dive into the spectrum <ArrowRight strokeWidth={2} aria-hidden="true" size={16} />
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div className="lp-block lp-block--clip lp-c-mint lp-sh-leaf md:!p-11">
                <span aria-hidden="true" className="lp-flower lp-flower--float" style={{ '--c': 'var(--coral)', '--s': '76px', right: '-18px', bottom: '-18px' } as React.CSSProperties} />
                <div aria-hidden="true" className="lp-photo lp-photo--circle lp-peek lp-sh-coral">
                  <img src="/images/kids-Therapy.webp" alt="" loading="lazy" decoding="async" />
                </div>
                <h2 className="text-section font-kids font-bold text-brand-ink mb-5 relative pr-20 md:pr-28 md:min-h-[84px]">What is ABA Therapy Like?</h2>
                <p className="text-lg mb-7 leading-relaxed relative">
                  At Auvia, ABA therapy is playful, positive, and collaborative. Your child works
                  1-on-1 with a dedicated therapist in our "Sensory Sanctuary" centers, where
                  learning feels like play and every small win is celebrated.
                </p>
                <ul className="lp-bullets mb-7">
                  <li>
                    Play-based learning sessions
                  </li>
                  <li>
                    Skill building through success
                  </li>
                  <li>
                    Families are partners in care
                  </li>
                </ul>
                <Link to="/what-is-aba" className="lp-link">
                  See our approach in action <ArrowRight strokeWidth={2} aria-hidden="true" size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Guide Section */}
        <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="lp-cta lp-c-sky !text-left mb-16 lg:mb-20 md:!p-14">
          <span aria-hidden="true" className="lp-flower" style={{ '--c': 'var(--sun)', '--s': '130px', right: '-36px', top: '-36px' } as React.CSSProperties} />
          <span aria-hidden="true" className="lp-spark" style={{ '--c': '#ffffff', '--s': '32px', left: '46%', top: '26px' } as React.CSSProperties} />

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <div className="lp-tag mb-5">
                <FileText strokeWidth={1.75} aria-hidden="true" size={14} />
                New Family Guide
              </div>
              <h2 className="text-section font-kids font-bold mb-5">What to expect in your <span className="text-brand-teal italic">first 90 days.</span></h2>
              <p className="text-lg mb-8 leading-relaxed max-w-xl">
                The early stages of ABA therapy can feel overwhelming. We've created a comprehensive
                onboarding guide to help you understand the assessment phase, therapist matching,
                and initial goal setting.
              </p>
              <Link to="/parent-guide" className="lp-btn lp-btn--teal">
                View Family Guide <ArrowRight strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </div>
            <div className="relative">
              <div className="lp-block lp-c-white lp-sh-coral -rotate-1">
                <div className="lp-mini-road space-y-5">
                  <div className="flex gap-4 items-center">
                    <div className="lp-chip lp-chip--sq lp-chip-sun">
                      <Users strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="lp-strong font-bold text-lg">Family Success Roadmap</p>
                      <p className="text-sm">Week 1: Initial Assessment & Observation</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="lp-chip lp-chip--sq lp-chip-coral">
                      <MessageCircle strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="lp-strong font-bold text-lg">Personalized Matching</p>
                      <p className="text-sm">Week 2: BCBA & RBT Introduction</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQs */}
        <section id="common-questions" className="max-w-4xl mx-auto">
          <div className="lp-head">
            <h2 className="text-section font-kids font-bold text-brand-ink">Common Questions</h2>
            <p className="text-brand-sage font-medium">Quick answers to help you navigate your options.</p>
          </div>
          <div className="lp-talk space-y-7">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="lp-faq lp-qa"
              >
                <h4 className="text-xl font-kids font-bold text-brand-ink mb-3">{faq.q}</h4>
                <p className="font-medium leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
    </MotionConfig>
  );
};
