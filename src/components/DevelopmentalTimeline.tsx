import { Heart, MessageCircle, Sparkles, Users, Star, Compass } from 'lucide-react';
import { motion } from 'motion/react';

const milestones = [
  {
    age: "18 Months",
    title: "First Connections",
    achievement: "Social Spark",
    desc: "Beginning to use simple words, pointing to show things, and showing affection to familiar people.",
    icon: <Heart size={22} />
  },
  {
    age: "2 Years",
    title: "Exploring Together",
    achievement: "Language Explorer",
    desc: "Playing alongside other children, following simple instructions, and starting to use two-word phrases.",
    icon: <Compass size={22} />
  },
  {
    age: "3 Years",
    title: "Creative Spark",
    achievement: "Creative Thinker",
    desc: "Engaging in imaginative play, showing a wide range of emotions, and starting to share with friends.",
    icon: <Sparkles size={22} />
  },
  {
    age: "4 Years",
    title: "Social Discovery",
    achievement: "Team Player",
    desc: "Playing cooperatively with others, telling stories, and following more complex rules in games.",
    icon: <Users size={22} />
  },
  {
    age: "5 Years",
    title: "Ready for the World",
    achievement: "Future Leader",
    desc: "Showing more independence, understanding rules vs. fair play, and ready for the classroom environment.",
    icon: <Star size={22} />
  }
];

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } }
};

const stepVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};

export const DevelopmentalTimeline = () => {
  return (
    <div className="developmental-timeline">
      <motion.ol
        className="timeline-list"
        tabIndex={0}
        aria-label="Developmental milestones from 18 months to 5 years"
        variants={listVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* The dotted trail that links the five steps on wide screens. */}
        <li className="timeline-trail" aria-hidden="true" role="presentation">
          <svg viewBox="0 0 1000 80" preserveAspectRatio="none" focusable="false">
            <path d="M100 26 C200 26 200 54 300 54 S400 26 500 26 S600 54 700 54 S800 26 900 26" vectorEffect="non-scaling-stroke" />
          </svg>
        </li>
        {milestones.map((milestone) => (
          <motion.li key={milestone.age} className="timeline-item" variants={stepVariants}>
            <span className="timeline-node" aria-hidden="true">
              {milestone.icon}
            </span>
            <div className="timeline-card">
              <span className="timeline-age">{milestone.age}</span>
              <h3 className="font-kids font-bold text-brand-ink">{milestone.title}</h3>
              <p className="text-brand-sage">{milestone.desc}</p>
              <span className="timeline-achievement">
                Achievement: <span className="text-brand-teal">{milestone.achievement}</span>
              </span>
            </div>
          </motion.li>
        ))}
      </motion.ol>

      <motion.div
        className="timeline-closing"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <span className="timeline-closing__icon" aria-hidden="true"><MessageCircle size={22} /></span>
        <div>
          <h3 className="font-kids font-bold text-brand-ink">
            Every Journey is <span className="text-brand-teal italic">Unique.</span>
          </h3>
          <p>
            Developmental milestones are general benchmarks from pediatric guidance (including CDC and AAP frameworks) to help families observe growth patterns. Every child develops at their own pace.
          </p>
          <p>
            Differences in reaching milestones are natural and do not constitute a clinical diagnosis on their own. If you have questions about your child's progress, our team and your pediatrician can help provide personalized guidance.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
