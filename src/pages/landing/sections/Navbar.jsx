import React from 'react';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Access & roles', href: '#access-roles' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  return (
    <header className="lp-nav">
      <div className="lp-nav__inner">
        <div className="lp-nav__start">
          <Link to="/" className="lp-nav__brand" aria-label="HRStack home">
            <span className="lp-nav__logo" aria-hidden="true">
              HR
            </span>
            <span className="lp-nav__brand-text">HRStack</span>
          </Link>

          <nav className="lp-nav__links" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="lp-nav__link">
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <Link to="/sign-in" className="lp-nav__cta">
          sign in
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
