import React from 'react';
import { Link } from 'react-router-dom';

const FOOTER_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Roles', href: '#access-roles' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Footer = () => {
  return (
    <footer className="lp-footer" id="contact">
      <div className="lp-footer__inner">
        <div className="lp-footer__cta">
          <h2 className="lp-footer__title">Ready to replace the spreadsheets?</h2>
          <p className="lp-footer__lede">
            Talk to us about creating an HR system that puts people over paperwork
            and gives your team room to grow.
          </p>

          <div className="lp-footer__actions">
            <Link to="/sign-up" className="lp-footer__btn lp-footer__btn--primary">
              Set up your workspace
            </Link>
            <a href="#contact" className="lp-footer__btn lp-footer__btn--ghost">
              Talk to an advisor
            </a>
          </div>
        </div>

        <div className="lp-footer__bottom">
          <Link to="/" className="lp-footer__brand" aria-label="HRStack home">
            <span className="lp-footer__logo" aria-hidden="true">
              HR
            </span>
            <span className="lp-footer__brand-text">HRStack</span>
          </Link>

          <nav className="lp-footer__links" aria-label="Footer navigation">
            {FOOTER_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="lp-footer__link">
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <p className="lp-footer__legal">
          © 2026 HRStack by Grazac — Team Odin. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
