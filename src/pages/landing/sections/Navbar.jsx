import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Access & roles', href: '#access-roles' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

        <div className="lp-nav__end">
          <Link to="/sign-in" className="lp-nav__cta">
            Sign in
          </Link>
          <button 
            className="lp-nav__mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lp-nav__mobile-menu">
          <nav className="lp-nav__mobile-links">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className="lp-nav__mobile-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link 
              to="/sign-in" 
              className="lp-nav__mobile-cta"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign in
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
