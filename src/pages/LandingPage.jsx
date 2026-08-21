import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button/Button';
import './pages.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="landing-header__container">
          <div className="landing-header__logo">
            <span className="logo-icon">HR</span>
            <span className="logo-text">HRStack</span>
          </div>

          <nav className="landing-header__nav">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#access">Access & roles</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>

          <Link to="/sign-in">
            <Button variant="primary" size="md">
              SIGN IN
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero__content">
          <div className="landing-hero__badge">BUILT FOR AFRICAN SMBS</div>
          <h1 className="landing-hero__title">
            Your HR Operating System <br /> without the bloat
          </h1>
          <p className="landing-hero__subtitle">
            One Admin creates the workspace — teammates join by invite only.
          </p>

          <div className="landing-hero__ctas">
            <Link to="/sign-up">
              <Button variant="primary" size="lg" fullWidth>
                SET UP YOUR WORKSPACE
              </Button>
            </Link>
            <Link to="#how-it-works">
              <Button variant="secondary" size="lg" fullWidth>
                SEE HOW IT WORKS
              </Button>
            </Link>
          </div>

          <div className="landing-hero__social">
            <div className="landing-hero__avatars">
              <div className="avatar">AO</div>
              <div className="avatar">KA</div>
              <div className="avatar">DB</div>
              <div className="avatar">SA</div>
            </div>
            <p>Teams in Nigeria, Kenya & Ghana already on HRStack</p>
          </div>

          <div className="landing-hero__stats">
            <div className="stat">
              <h3>30–200</h3>
              <p>Employees</p>
            </div>
            <div className="stat">
              <h3>5</h3>
              <p>Core modules</p>
            </div>
            <div className="stat">
              <h3>99.9%</h3>
              <p>Uptime</p>
            </div>
            <div className="stat">
              <h3>8 weeks</h3>
              <p>MVP timeline</p>
            </div>
          </div>
        </div>

        <div className="landing-hero__visual">
          <div className="hero-visual-placeholder">Dashboard Preview</div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="landing-section landing-how-it-works">
        <div className="landing-section__header">
          <h2>From zero to running in under 15 minutes</h2>
        </div>

        <div className="landing-steps">
          {[
            {
              number: 1,
              title: 'You create the workspace',
              description:
                'The Head of People or Founder sets up HRStack for the company in under 15 minutes.',
            },
            {
              number: 2,
              title: 'You invite your team',
              description:
                'Add teammates by email and assign their role and department — they don\'t choose it themselves.',
            },
            {
              number: 3,
              title: 'They accept and set a password',
              description:
                'Invitees click the email link, set their password, and land directly in the role you assigned.',
            },
            {
              number: 4,
              title: 'Everyone is productive from day one',
              description:
                'Profiles, leave balance, and onboarding checklist are all ready the moment they log in.',
            },
          ].map((step) => (
            <div key={step.number} className="step">
              <div className="step__number">{step.number}</div>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__description">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer__content">
          <h2>Ready to replace the spreadsheets?</h2>
          <p>
            Talk to us about creating an HR system that puts people over paperwork
            and gives you real visibility into your team.
          </p>

          <div className="landing-footer__ctas">
            <Link to="/sign-up">
              <Button variant="primary" size="lg">
                SET UP YOUR WORKSPACE
              </Button>
            </Link>
            <Button variant="secondary" size="lg">
              TALK TO AN ADVISOR
            </Button>
          </div>
        </div>

        <div className="landing-footer__bottom">
          <p>&copy; 2026 HRStack by Grazac — Team Odin. All rights reserved.</p>
          <nav className="landing-footer__nav">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
