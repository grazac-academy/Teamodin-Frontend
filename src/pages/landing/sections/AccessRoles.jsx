import React from 'react';
import { ShieldCheck, UserCheck, User, Check } from 'lucide-react';

const ROLES = [
  {
    Icon: ShieldCheck,
    badge: 'Admin',
    badgeBg: 'var(--primary-50)',
    badgeColor: 'var(--primary-deep)',
    subtitle: 'The person who sets up HRStack',
    desc: 'Usually the Head of People or founder. Creates the workspace and is the only one who can invite teammates.',
    features: [
      'Full workspace access and settings',
      'Invites and assigns every other user',
      'Manages billing, data, and integrations',
      'Activity log of all platform actions',
    ],
  },
  {
    Icon: UserCheck,
    badge: 'Manager',
    badgeBg: 'var(--success-light)',
    badgeColor: 'var(--success-dark)',
    subtitle: 'Invited by an Admin',
    desc: 'Receives an email invite, sets a password, and lands in their assigned department with their team already visible.',
    features: [
      'Approves leave for their team',
      'Runs check-ins with direct reports',
      'Views team calendar and availability',
      'Cannot invite others',
    ],
  },
  {
    Icon: User,
    badge: 'Employee',
    badgeBg: 'var(--warning-light)',
    badgeColor: 'var(--warning-dark)',
    subtitle: 'Invited by an Admin',
    desc: 'Same invite flow — click the link, set a password, and get straight to work. No role to choose, nothing to configure.',
    features: [
      'Requests leave and tracks balance',
      'Completes onboarding tasks',
      'Submits self check-ins and surveys',
      'Personal profile auto-created on join',
    ],
  },
];

const AccessRoles = () => {
  return (
    <section className="lp-roles" id="access-roles">
      <div className="lp-roles__inner">
        <header className="lp-roles__head">
          <span className="lp-eyebrow">Access model</span>
          <h2 className="lp-roles__title">
            One workspace. Three roles. No open sign-up.
          </h2>
          <p className="lp-roles__lede">
            HRStack is invite-only. The first person sets things up as Admin —
            everyone else is added with the right role already assigned.
          </p>
        </header>

        <ul className="lp-roles__grid">
          {ROLES.map(({ Icon, badge, badgeBg, badgeColor, subtitle, desc, features }) => (
            <li key={badge} className="lp-role">
              <div className="lp-role__top">
                <span
                  className="lp-role__badge"
                  style={{ background: badgeBg, color: badgeColor }}
                >
                  <Icon size={13} strokeWidth={2.2} aria-hidden="true" />
                  {badge}
                </span>
                <h3 className="lp-role__subtitle">{subtitle}</h3>
                <p className="lp-role__desc">{desc}</p>
              </div>

              <ul className="lp-role__features">
                {features.map((feature) => (
                  <li key={feature} className="lp-role__feature">
                    <Check
                      size={12}
                      strokeWidth={3}
                      className="lp-role__check"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AccessRoles;
