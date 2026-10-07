
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AVATARS = [
  { initials: 'AO', bg: 'var(--primary-50)', color: 'var(--primary-deep)' },
  { initials: 'DO', bg: 'var(--success-light)', color: 'var(--success-dark)' },
  { initials: 'KO', bg: 'var(--danger-surface)', color: 'var(--danger-dark)' },
  { initials: 'SA', bg: 'var(--warning-light)', color: '#633806' },
];

const STATS = [
  { value: '30 – 200', label: 'Employees' },
  { value: '5', label: 'Core modules' },
  { value: '99.9%', label: 'Uptime' },
  { value: '8 weeks', label: 'MVP Timeline' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Hero = () => {
  return (
    <section className="lp-hero">
      <motion.div 
        className="lp-hero__inner"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span 
          className="lp-hero__badge"
          variants={itemVariants}
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg
            className="lp-hero__badge-icon"
            viewBox="0 0 14 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 1 1.5 4v4c0 3.2 2.3 6 5.5 7 3.2-1 5.5-3.8 5.5-7V4L7 1Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          Built for African SMBs
        </motion.span>

        <motion.h1 className="lp-hero__title" variants={itemVariants}>
          Your HR <em>Operating System</em> without the bloat
        </motion.h1>

        <motion.p className="lp-hero__microcopy" variants={itemVariants}>
          One Admin creates the workspace — teammates join by invite only.
        </motion.p>

        <motion.div className="lp-hero__ctas" variants={itemVariants}>
          <Link to="/sign-up" className="lp-hero__cta lp-hero__cta--primary">
            Set up your workspace
          </Link>
          <a href="#how-it-works" className="lp-hero__cta lp-hero__cta--ghost">
            See how it works
          </a>
        </motion.div>

        <motion.div className="lp-hero__social" variants={itemVariants}>
          <ul className="lp-hero__avatars">
            {AVATARS.map((avatar) => (
              <motion.li
                key={avatar.initials}
                className="lp-hero__avatar"
                style={{ background: avatar.bg, color: avatar.color }}
                whileHover={{ y: -5, scale: 1.1, zIndex: 10 }}
              >
                {avatar.initials}
              </motion.li>
            ))}
          </ul>
          <span className="lp-hero__social-text">
            Teams in Nigeria, Kenya &amp; Ghana already on HRStack
          </span>
        </motion.div>

        <motion.dl className="lp-hero__stats" variants={itemVariants}>
          {STATS.map((stat, i) => (
            <motion.div 
              key={stat.label} 
              className="lp-hero__stat"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
            >
              <dt className="lp-hero__stat-value">{stat.value}</dt>
              <dd className="lp-hero__stat-label">{stat.label}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
};

export default Hero;
