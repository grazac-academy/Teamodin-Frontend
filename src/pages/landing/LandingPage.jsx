
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import HowItWorks from './sections/HowItWorks';
import ValueGrid from './sections/ValueGrid';
import Features from './sections/Features';
import AccessRoles from './sections/AccessRoles';
import Showcase from './sections/Showcase';
import Testimonials from './sections/Testimonials';
import Pricing from './sections/Pricing';
import Studio from './sections/Studio';
import Footer from './sections/Footer';
import SEO from '../../components/common/SEO';
import './landing.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <SEO
        title="HRStack — The Modern HR Operating System Built for African SMBs"
        description="Replace messy spreadsheets and WhatsApp chats. HRStack brings employee directories, leave approvals, onboarding, payslips, and culture check-ins into one fast platform."
        keywords="HR software Africa, People Ops platform, Nigerian HR software, employee management system, SMB HR tool, Grazac, Team Odin"
        canonical="/"
        ogType="website"
        noindex={false}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          'name': 'HRStack',
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'Web',
          'description': 'Modern People Operations platform tailored for African SMBs.',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD',
          },
          'creator': {
            '@type': 'Organization',
            'name': 'Team Odin at Grazac',
          },
        }}
      />
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <ValueGrid />
        <Features />
        <AccessRoles />
        <Showcase />
        <Testimonials />
        <Pricing />
        <Studio />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
