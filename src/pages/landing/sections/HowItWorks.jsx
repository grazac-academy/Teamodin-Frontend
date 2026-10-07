
import { motion } from 'framer-motion';

const STEPS = [
  {
    num: '1',
    title: 'You create the workspace',
    desc: 'The Head of People or founder sets up HRStack for the company in under 15 minutes.',
  },
  {
    num: '2',
    title: 'You invite your team',
    desc: "Add teammates by email and assign their role and department — they don't choose it themselves.",
  },
  {
    num: '3',
    title: 'They accept and set a password',
    desc: 'Invitees click the email link, set their password, and land directly in the role you assigned.',
  },
  {
    num: '4',
    title: 'Everyone is productive from day one',
    desc: 'Profile, leave balance, and onboarding checklist are all ready the moment they log in.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const stepVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const HowItWorks = () => {
  return (
    <section className="lp-how" id="how-it-works">
      <motion.div 
        className="lp-how__inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <header className="lp-how__head">
          <motion.span className="lp-eyebrow" variants={stepVariants}>How it works</motion.span>
          <motion.h2 className="lp-how__title" variants={stepVariants}>From zero to running in under 15 minutes</motion.h2>
        </header>

        <motion.ol className="lp-how__steps" variants={containerVariants}>
          {STEPS.map((step) => (
            <motion.li 
              key={step.num} 
              className="lp-how__step"
              variants={stepVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="lp-how__num" aria-hidden="true">
                {step.num}
              </span>
              <h3 className="lp-how__step-title">{step.title}</h3>
              <p className="lp-how__step-desc">{step.desc}</p>
            </motion.li>
          ))}
        </motion.ol>
      </motion.div>
    </section>
  );
};

export default HowItWorks;
