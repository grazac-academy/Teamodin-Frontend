import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    note: 'Up to 10 employees · forever',
    features: [
      'Employee directory',
      'Leave management',
      'Onboarding checklists',
      'Invite-only access control',
    ],
    cta: 'Set up workspace',
    to: '/sign-up',
    variant: 'outline',
  },
  {
    name: 'Growth',
    price: '$4',
    note: 'per employee / month',
    features: [
      'Everything in Free',
      'Analytics dashboard',
      'Pulse surveys and eNPS',
      'Performance check-ins',
    ],
    cta: 'Set up workspace',
    to: '/sign-up',
    variant: 'primary',
    popular: true,
  },
  {
    name: 'Scale',
    price: '$7',
    note: 'per employee / month',
    features: [
      'Everything in Growth',
      'Open API and webhooks',
      'SAML single sign-on',
      'Dedicated support',
    ],
    cta: 'Talk to us',
    to: '#contact',
    variant: 'slate',
  },
];

const Pricing = () => {
  return (
    <section className="lp-pricing" id="pricing">
      <div className="lp-pricing__inner">
        <header className="lp-pricing__head">
          <span className="lp-eyebrow">Pricing</span>
          <h2 className="lp-pricing__title">Simple pricing. No payroll bundles.</h2>
          <p className="lp-pricing__lede">
            One Admin sets the plan for the whole company — every teammate they
            invite is included automatically.
          </p>
        </header>

        <ul className="lp-pricing__grid">
          {PLANS.map((plan) => (
            <li
              key={plan.name}
              className={`lp-plan${plan.popular ? ' lp-plan--popular' : ''}`}
            >
              {plan.popular && <span className="lp-plan__flag">Most popular</span>}

              <h3 className="lp-plan__name">{plan.name}</h3>
              <p className="lp-plan__price">{plan.price}</p>
              <p className="lp-plan__note">{plan.note}</p>

              <ul className="lp-plan__features">
                {plan.features.map((feature) => (
                  <li key={feature} className="lp-plan__feature">
                    <Check
                      size={12}
                      strokeWidth={3}
                      className="lp-plan__check"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {plan.to.startsWith('#') ? (
                <a href={plan.to} className={`lp-plan__cta lp-plan__cta--${plan.variant}`}>
                  {plan.cta}
                </a>
              ) : (
                <Link
                  to={plan.to}
                  className={`lp-plan__cta lp-plan__cta--${plan.variant}`}
                >
                  {plan.cta}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Pricing;
