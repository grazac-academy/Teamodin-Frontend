import React from 'react';

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

const HowItWorks = () => {
  return (
    <section className="lp-how" id="how-it-works">
      <div className="lp-how__inner">
        <header className="lp-how__head">
          <span className="lp-eyebrow">How it works</span>
          <h2 className="lp-how__title">From zero to running in under 15 minutes</h2>
        </header>

        <ol className="lp-how__steps">
          {STEPS.map((step) => (
            <li key={step.num} className="lp-how__step">
              <span className="lp-how__num" aria-hidden="true">
                {step.num}
              </span>
              <h3 className="lp-how__step-title">{step.title}</h3>
              <p className="lp-how__step-desc">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;
