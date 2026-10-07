
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
import './landing.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
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
