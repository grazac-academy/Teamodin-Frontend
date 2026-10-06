import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  CalendarCheck,
  ListChecks,
  Repeat,
  HeartPulse,
  BarChart3,
  Check,
} from 'lucide-react';

const FEATURES = [
  {
    Icon: Users,
    iconBg: '#EEEDFE',
    iconColor: 'var(--primary)',
    title: 'Employee directory',
    desc: 'Searchable profiles with role, department, manager, and join date. CSV import for bulk setup. Org chart included.',
    tag: 'Searchable by name, role, or department',
  },
  {
    Icon: CalendarCheck,
    iconBg: '#E1F5EE',
    iconColor: 'var(--success)',
    title: 'Leave management',
    desc: 'Live balance shown before submission. Public holiday auto-check. Team calendar context for managers before approving.',
    tag: 'One-click approve or decline',
  },
  {
    Icon: ListChecks,
    iconBg: '#FAEEDA',
    iconColor: 'var(--warning-dark)',
    title: 'Onboarding workflows',
    desc: 'Tasks grouped by week and assigned to specific owners — the new hire, IT, or their manager. Nudge button for overdue items.',
    tag: 'Nothing falls through the cracks',
  },
  {
    Icon: Repeat,
    iconBg: '#FAECE7',
    iconColor: 'var(--danger-dark)',
    title: 'Performance check-ins',
    desc: 'Quarterly cycles with both a self-assessment and manager review in the same flow. History visible to both parties.',
    tag: 'Structured, not open-ended',
  },
  {
    Icon: HeartPulse,
    iconBg: '#E6F1FB',
    iconColor: 'var(--slate)',
    title: 'Pulse surveys',
    desc: 'NPS-style 0–10 scale. Responses stay anonymous until at least 5 people have answered — protecting individual privacy in small teams.',
    tag: 'Privacy-first by design',
  },
  {
    Icon: BarChart3,
    iconBg: '#EAF3DE',
    iconColor: 'var(--accent-green)',
    title: 'Analytics dashboard',
    desc: 'Headcount trends, 90-day attrition, leave utilisation, and eNPS tracked over time. All in one view, no exports needed.',
    tag: 'Real decisions from real data',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Features = () => {
  return (
    <section className="lp-features">
      <motion.div 
        className="lp-features__inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <header className="lp-features__head">
          <motion.span className="lp-eyebrow" variants={cardVariants}>What you get</motion.span>
          <motion.h2 className="lp-features__title" variants={cardVariants}>Everything your People Ops team needs</motion.h2>
          <motion.p className="lp-features__lede" variants={cardVariants}>
            Each module is designed to answer one specific question in under five
            seconds.
          </motion.p>
        </header>

        <motion.ul className="lp-features__grid" variants={containerVariants}>
          {FEATURES.map(({ Icon, iconBg, iconColor, title, desc, tag }) => (
            <motion.li 
              key={title} 
              className="lp-feature"
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
            >
              <span
                className="lp-feature__icon"
                style={{ background: iconBg, color: iconColor }}
              >
                <Icon size={22} strokeWidth={2} aria-hidden="true" />
              </span>
              <h3 className="lp-feature__title">{title}</h3>
              <p className="lp-feature__desc">{desc}</p>
              <p className="lp-feature__tag">
                <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                {tag}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
};

export default Features;
