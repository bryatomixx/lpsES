import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import AIEmployee from "@/components/AIEmployee";
import ROICalculator from "@/components/ROICalculator";
import EmailCapture from "@/components/EmailCapture";
import Compare from "@/components/Compare";
import Solutions from "@/components/Solutions";
import WhoWeServe from "@/components/WhoWeServe";
import Process from "@/components/Process";
import About from "@/components/About";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import AlaCartePricing from "@/components/AlaCartePricing";
import PlanGuide from "@/components/PlanGuide";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import BookingSection from "@/components/BookingSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* 1. Hero */}
        <Hero />
        <div className="gdiv" />

        {/* 2. Problem */}
        <Problem />
        <div className="gdiv" />

        {/* 3. AI Employee comparison table */}
        <AIEmployee />

        {/* 4. ROI Calculator — right after the "why" section */}
        <ROICalculator />

        {/* 5. Mid-funnel email capture */}
        <EmailCapture />
        <div className="gdiv" />

        {/* 6. Before/After compare */}
        <Compare />
        <div className="gdiv" />

        {/* 7. Solutions */}
        <Solutions />
        <div className="gdiv" />

        {/* 8. Industries */}
        <WhoWeServe />
        <div className="gdiv" />

        {/* 9. Process */}
        <Process />
        <div className="gdiv" />

        {/* 10. About/Founder */}
        <About />
        <div className="gdiv" />

        {/* 11. Pricing */}
        <Pricing />

        {/* 12. FAQ — directly under pricing */}
        <FAQ />
        <div className="gdiv" />

        {/* 13. À la carte */}
        <AlaCartePricing />
        <div className="gdiv" />

        {/* 14. Plan guide */}
        <PlanGuide />
        <div className="gdiv" />

        {/* 14. Tech stack */}
        <TechStack />
        <div className="gdiv" />

        {/* 15. Testimonials */}
        <Testimonials />
        <div className="gdiv" />

        {/* 16. Big CTA */}
        <CTA />
        <div className="gdiv" />

        {/* 17. Embedded booking calendar */}
        <BookingSection />
        <div className="gdiv" />

        {/* 18. Contact form */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
