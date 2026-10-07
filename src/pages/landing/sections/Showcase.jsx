
import leaveImg from '../../../assets/showcase-leave.png';
import onboardingImg from '../../../assets/showcase-onboarding.png';
import checkinsImg from '../../../assets/showcase-checkins.png';
import analyticsImg from '../../../assets/showcase-analytics.png';

const SHOTS = [
  { src: leaveImg, label: 'Leave management', caption: 'One-click approvals' },
  { src: onboardingImg, label: 'Onboarding', caption: 'Structured from day one' },
  { src: checkinsImg, label: 'Check-ins', caption: 'Quarterly cycles' },
  { src: analyticsImg, label: 'Analytics', caption: 'Real visibility' },
];

const Showcase = () => {
  return (
    <section className="lp-showcase">
      <div className="lp-showcase__inner">
        <h2 className="lp-showcase__title">
          HRStack in action — across real African teams
        </h2>

        <ul className="lp-showcase__grid">
          {SHOTS.map(({ src, label, caption }) => (
            <li key={label} className="lp-shot">
              <img src={src} alt={`${label} — ${caption}`} className="lp-shot__img" />
              <div className="lp-shot__overlay">
                <span className="lp-shot__label">{label}</span>
                <span className="lp-shot__caption">{caption}</span>
              </div>
            </li>
          ))}
        </ul>

        <p className="lp-showcase__footnote">
          Everything your People Ops team needs — nothing you didn&apos;t ask for
        </p>
      </div>
    </section>
  );
};

export default Showcase;
