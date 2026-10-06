import React from 'react';
import { AlertTriangle, MessageSquare, TrendingDown } from 'lucide-react';
import { CalendarCheck, ListChecks, Users, Repeat, BarChart3, HeartPulse } from 'lucide-react';
import probsImage from '../../../assets/probs.png';

const PROBLEMS = [
  {
    Icon: AlertTriangle,
    tone: 'danger',
    title: 'Leave spreadsheets drift and go out of sync',
    desc: "Two people from the same team end up on leave at the same time. Nobody knows until it's too late.",
  },
  {
    Icon: MessageSquare,
    tone: 'warning',
    title: 'Onboarding happens over WhatsApp',
    desc: 'New hires have no clear week-one plan. Instructions get buried under other messages in hours.',
  },
  {
    Icon: TrendingDown,
    tone: 'danger',
    title: 'No visibility into why people leave',
    desc: 'Founders only find out someone is unhappy when they are already walking out the door.',
  },
];

const MODULES = [
  {
    Icon: CalendarCheck,
    title: 'Leave management',
    desc: 'Live balance, auto holiday checks, one-click approvals.',
  },
  {
    Icon: ListChecks,
    title: 'Onboarding',
    desc: 'Weekly tasks, assigned owners, progress tracker.',
  },
  {
    Icon: Users,
    title: 'Employee directory',
    desc: 'Searchable profiles, reporting lines, CSV import.',
  },
  {
    Icon: Repeat,
    title: 'Check-ins',
    desc: 'Quarterly cycles, self + manager reviews.',
  },
  {
    Icon: BarChart3,
    title: 'Analytics',
    desc: 'Headcount, attrition, eNPS in one view.',
  },
  {
    Icon: HeartPulse,
    title: 'Pulse surveys',
    desc: 'Anonymous eNPS, 5-response privacy threshold.',
  },
];

const ValueGrid = () => {
  return (
    <section className="lp-value" id="features">
      {/* ---- the problem ---- */}
      <div className="lp-value__row">
        <div className="lp-value__col">
          <span className="lp-eyebrow lp-eyebrow--ruled">The problem</span>
          <h2 className="lp-value__title">African SMBs hit a wall at 30 people</h2>
          <p className="lp-value__lede">
            The tools that exist — BambooHR, Workday — were built for American
            compliance, bundled with payroll nobody in this market asked for, and
            priced for enterprise budgets.
          </p>

          <ul className="lp-value__points">
            {PROBLEMS.map(({ Icon, tone, title, desc }) => (
              <li key={title} className="lp-value__point">
                <span className={`lp-value__point-icon lp-value__point-icon--${tone}`}>
                  <Icon size={17} strokeWidth={2} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="lp-value__point-title">{title}</h3>
                  <p className="lp-value__point-desc">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <figure className="lp-value__media">
          <img src={probsImage} alt="" className="lp-value__media-img" />
          <figcaption className="lp-value__media-caption">
            The old way — scattered, invisible, manual
          </figcaption>
        </figure>
      </div>

      {/* ---- the solution ---- */}
      <div className="lp-value__row lp-value__row--solution">
        <div className="lp-value__col lp-value__col--solution">
          <span className="lp-eyebrow lp-eyebrow--ruled">The solution</span>
          <h2 className="lp-value__title">
            Five focused modules.
            <br />
            Nothing you didn&apos;t ask for.
          </h2>
          <p className="lp-value__lede">
            HRStack was built to do five things really well, not fifteen things
            poorly. No payroll. No recruiting. No time tracking.
          </p>
        </div>

        <ul className="lp-modules">
          {MODULES.map(({ Icon, title, desc }) => (
            <li key={title} className="lp-module">
              <Icon size={20} strokeWidth={2} className="lp-module__icon" aria-hidden="true" />
              <h3 className="lp-module__title">{title}</h3>
              <p className="lp-module__desc">{desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ValueGrid;
