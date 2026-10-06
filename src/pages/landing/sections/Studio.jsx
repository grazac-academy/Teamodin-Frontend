import React from 'react';
import { Sparkles, MapPin, Users } from 'lucide-react';

const PEOPLE = [
  {
    initials: 'OO',
    bg: 'var(--primary-50)',
    color: 'var(--primary-deep)',
    name: 'Oluwole Onasanya',
    role: 'Product Designer · Team Odin',
  },
  {
    initials: 'TO',
    bg: 'var(--success-light)',
    color: 'var(--success-dark)',
    name: 'Team Odin',
    role: 'Product squad · Grazac',
  },
  {
    initials: 'GZ',
    bg: 'var(--warning-light)',
    color: 'var(--warning-dark)',
    name: 'Grazac',
    role: 'Parent product studio · Nigeria',
  },
];

const FACTS = [
  { Icon: MapPin, title: 'Abeokuta, Nigeria', sub: 'Where HRStack was built' },
  { Icon: Users, title: 'African SMBs', sub: 'Our only market focus' },
];

const Studio = () => {
  return (
    <section className="lp-studio">
      <div className="lp-studio__inner">
        <div className="lp-studio__col">
          <span className="lp-studio__badge">
            <Sparkles size={13} strokeWidth={2.2} aria-hidden="true" />
            Built by Grazac — Team Odin
          </span>

          <h2 className="lp-studio__title">
            A product studio solving real problems in African markets
          </h2>

          <p className="lp-studio__body">
            Grazac is a product studio building practical software for African
            markets. Team Odin is the internal team behind HRStack — formed to
            solve the People Ops gap growing SMBs face once spreadsheets and
            WhatsApp groups stop scaling.
          </p>

          <p className="lp-studio__body">
            Our approach: ship a focused MVP fast, validate with real companies,
            then expand. HRStack&apos;s 8-week build is the first product out of
            Team Odin.
          </p>

          <ul className="lp-studio__facts">
            {FACTS.map(({ Icon, title, sub }) => (
              <li key={title} className="lp-studio__fact">
                <Icon size={16} strokeWidth={2} className="lp-studio__fact-icon" aria-hidden="true" />
                <span className="lp-studio__fact-meta">
                  <span className="lp-studio__fact-title">{title}</span>
                  <span className="lp-studio__fact-sub">{sub}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lp-studio__card">
          <h3 className="lp-studio__card-title">Team Odin — Grazac</h3>
          <ul className="lp-studio__people">
            {PEOPLE.map((person) => (
              <li key={person.initials} className="lp-studio__person">
                <span
                  className="lp-studio__avatar"
                  style={{ background: person.bg, color: person.color }}
                  aria-hidden="true"
                >
                  {person.initials}
                </span>
                <span className="lp-studio__person-meta">
                  <span className="lp-studio__person-name">{person.name}</span>
                  <span className="lp-studio__person-role">{person.role}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Studio;
