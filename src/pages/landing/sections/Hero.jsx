import React from 'react';
import { Link } from 'react-router-dom';

const AVATARS = [
  { initials: 'AO', bg: 'var(--primary-50)', color: 'var(--primary-deep)' },
  { initials: 'DO', bg: 'var(--success-light)', color: 'var(--success-dark)' },
  { initials: 'KO', bg: 'var(--danger-surface)', color: 'var(--danger-dark)' },
  { initials: 'SA', bg: 'var(--warning-light)', color: '#633806' },
];

const STATS = [
  { value: '30–200', label: 'Employees' },
  { value: '5', label: 'Core modules' },
  { value: '99.9%', label: 'Uptime' },
  { value: '8 weeks', label: 'MVP timeline' },
];

const Hero = () => {
  return (
    <section className="lp-hero">
      <div className="lp-hero__inner">
        <span className="lp-hero__badge">
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
        </span>

        <h1 className="lp-hero__title">
          Your HR <em>Operating System</em> without the bloat
        </h1>

        <p className="lp-hero__microcopy">
          One Admin creates the workspace — teammates join by invite only.
        </p>

        <div className="lp-hero__ctas">
          <Link to="/sign-up" className="lp-hero__cta lp-hero__cta--primary">
            Set up your workspace
          </Link>
          <a href="#how-it-works" className="lp-hero__cta lp-hero__cta--ghost">
            See how it works
          </a>
        </div>

        <div className="lp-hero__social">
          <ul className="lp-hero__avatars">
            {AVATARS.map((avatar) => (
              <li
                key={avatar.initials}
                className="lp-hero__avatar"
                style={{ background: avatar.bg, color: avatar.color }}
              >
                {avatar.initials}
              </li>
            ))}
          </ul>
          <span className="lp-hero__social-text">
            Teams in Nigeria, Kenya &amp; Ghana already on HRStack
          </span>
        </div>

        <dl className="lp-hero__stats">
          {STATS.map((stat) => (
            <div key={stat.label} className="lp-hero__stat">
              <dt className="lp-hero__stat-value">{stat.value}</dt>
              <dd className="lp-hero__stat-label">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Hero;
