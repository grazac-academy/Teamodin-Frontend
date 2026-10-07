
import { motion } from 'framer-motion';
import { AlertTriangle, MessageSquare, TrendingDown } from 'lucide-react';
import { CalendarCheck, ListChecks, Users, Repeat, BarChart3, HeartPulse } from 'lucide-react';
import probsImage from '../../../assets/probs.png';

const PROBLEMS = [
  {
    Icon: AlertTriangle,
    tone: 'danger',
    title: 'Leave spreadsheets drift and go out of sync',
    desc: "Two people from the same team end up on leave at the same time. Nobody knows until it's too late.",
  },
  {
    Icon: MessageSquare,
    tone: 'warning',
    title: 'Onboarding happens over WhatsApp',
    desc: 'New hires have no clear week-one plan. Instructions get buried under other messages in hours.',
  },
  {
    Icon: TrendingDown,
    tone: 'danger',
    title: 'No visibility into why people leave',
    desc: 'Founders only find out someone is unhappy when they are already walking out the door.',
  },
];

const MODULES = [
  {
    Icon: CalendarCheck,
    title: 'Leave management',
    desc: 'Live balance, auto holiday checks, one-click approvals.',
  },
  {
    Icon: ListChecks,
    title: 'Onboarding',
    desc: 'Weekly tasks, assigned owners, progress tracker.',
  },
  {
    Icon: Users,
    title: 'Employee directory',
    desc: 'Searchable profiles, reporting lines, CSV import.',
  },
  {
    Icon: Repeat,
    title: 'Check-ins',
    desc: 'Quarterly cycles, self + manager reviews.',
  },
  {
    Icon: BarChart3,
    title: 'Analytics',
    desc: 'Headcount, attrition, eNPS in one view.',
  },
  {
    Icon: HeartPulse,
    title: 'Pulse surveys',
    desc: 'Anonymous eNPS, 5-response privacy threshold.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const ValueGrid = () => {
  return (
    <section className="lp-value" id="features">
      {/* ---- the problem ---- */}
      <motion.div 
        className="lp-value__row"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="lp-value__col">
          <motion.span className="lp-eyebrow lp-eyebrow--ruled" variants={fadeUpVariants}>The problem</motion.span>
          <motion.h2 className="lp-value__title" variants={fadeUpVariants}>African SMBs hit a wall at 30 people</motion.h2>
          <motion.p className="lp-value__lede" variants={fadeUpVariants}>
            The tools that exist — BambooHR, Workday — were built for American
            compliance, bundled with payroll nobody in this market asked for, and
            priced for enterprise budgets.
          </motion.p>

          <motion.ul className="lp-value__points" variants={containerVariants}>
            {PROBLEMS.map(({ Icon, tone, title, desc }) => (
              <motion.li 
                key={title} 
                className="lp-value__point" 
                variants={fadeUpVariants}
                whileHover={{ x: 10 }}
              >
                <span className={`lp-value__point-icon lp-value__point-icon--${tone}`}>
                  <Icon size={17} strokeWidth={2} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="lp-value__point-title">{title}</h3>
                  <p className="lp-value__point-desc">{desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.figure 
          className="lp-value__media" 
          variants={fadeUpVariants}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src={probsImage} alt="Illustration depicting the chaos of scattered spreadsheets and manual HR processes" className="lp-value__media-img" />
          <figcaption className="lp-value__media-caption">
            The old way — scattered, invisible, manual
          </figcaption>
        </motion.figure>
      </motion.div>

      {/* ---- the solution ---- */}
      <motion.div 
        className="lp-value__row lp-value__row--solution"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="lp-value__col lp-value__col--solution">
          <motion.span className="lp-eyebrow lp-eyebrow--ruled" variants={fadeUpVariants}>The solution</motion.span>
          <motion.h2 className="lp-value__title" variants={fadeUpVariants}>
            Five focused modules.
            <br />
            Nothing you didn&apos;t ask for.
          </motion.h2>
          <motion.p className="lp-value__lede" variants={fadeUpVariants}>
            HRStack was built to do five things really well, not fifteen things
            poorly. No payroll. No recruiting. No time tracking.
          </motion.p>
        </div>

        <motion.ul className="lp-modules" variants={containerVariants}>
          {MODULES.map(({ Icon, title, desc }) => (
            <motion.li 
              key={title} 
              className="lp-module" 
              variants={fadeUpVariants}
              whileHover={{ scale: 1.05, y: -5, rotate: -1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon size={20} strokeWidth={2} className="lp-module__icon" aria-hidden="true" />
              <h3 className="lp-module__title">{title}</h3>
              <p className="lp-module__desc">{desc}</p>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
};

export default ValueGrid;
