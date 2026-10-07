

const QUOTES = [
  {
    quote:
      'We replaced three spreadsheets and a WhatsApp group in one afternoon. Our team actually knows what to do on their first week now.',
    initials: 'AO',
    bg: 'var(--primary-50)',
    color: 'var(--primary-deep)',
    name: 'Amaka Okonkwo',
    role: 'Head of People · Acme Technologies',
  },
  {
    quote:
      'Requesting leave used to mean a text to my manager and a prayer. Now I can see my balance, pick dates, and submit in under two minutes.',
    initials: 'KA',
    bg: 'var(--success-light)',
    color: 'var(--success-dark)',
    name: 'Kunle Adeyemi',
    role: 'Software Engineer · Acme Technologies',
  },
  {
    quote:
      'Before approving leave I can see exactly who else is out that week. I stopped making blind decisions the first day we went live.',
    initials: 'DB',
    bg: 'var(--danger-surface)',
    color: 'var(--danger-dark)',
    name: 'David Bello',
    role: 'Engineering Manager · Acme Technologies',
  },
];

const Testimonials = () => {
  return (
    <section className="lp-quotes" id="about">
      <div className="lp-quotes__inner">
        <header className="lp-quotes__head">
          <span className="lp-eyebrow">What others are saying</span>
          <h2 className="lp-quotes__title">
            Built with real feedback from real HR teams
          </h2>
        </header>

        <ul className="lp-quotes__grid">
          {QUOTES.map((item) => (
            <li key={item.name} className="lp-quote">
              <span className="lp-quote__mark" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="lp-quote__text">{item.quote}</blockquote>
              <figcaption className="lp-quote__person">
                <span
                  className="lp-quote__avatar"
                  style={{ background: item.bg, color: item.color }}
                  aria-hidden="true"
                >
                  {item.initials}
                </span>
                <span className="lp-quote__meta">
                  <span className="lp-quote__name">{item.name}</span>
                  <span className="lp-quote__role">{item.role}</span>
                </span>
              </figcaption>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Testimonials;
