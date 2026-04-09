import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import AutomationQuiz from "@/components/AutomationQuiz";
import Solutions from "@/components/Solutions";
import TechStack from "@/components/TechStack";
import ROICalculator from "@/components/ROICalculator";
import Testimonials from "@/components/Testimonials";
import Compare from "@/components/Compare";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* 1. Hero — hook inmediato */}
        <Hero />
        <div className="gdiv" />

        {/* 2. Problem — identificación rápida, 4 tarjetas */}
        <Problem />
        <div className="gdiv" />

        {/* 3. Quiz interactivo — primer elemento de acción, captura leads temprano */}
        <AutomationQuiz />
        <div className="gdiv" />

        {/* 4. Soluciones — ahora que se identificaron, mostramos el fix */}
        <Solutions />
        <div className="gdiv" />

        {/* 5. Tech Stack — temporalmente oculto (iconos pendientes en negro) */}
        {/* <TechStack /> */}
        {/* <div className="gdiv" /> */}

        {/* 6. ROI Calculator — cuantifica valor antes de mostrar precio */}
        <ROICalculator />
        <div className="gdiv" />

        {/* 7. Testimonios — prueba social antes de precio */}
        <Testimonials />
        <div className="gdiv" />

        {/* 9. Antes vs Después — refuerza la transformación */}
        <Compare />
        <div className="gdiv" />

        {/* 10. Pricing — después de valor + prueba */}
        <Pricing />

        {/* 11. FAQ — objections right after pricing */}
        <FAQ />
        <div className="gdiv" />

        {/* 12. CTA final */}
        <CTA />
        <div className="gdiv" />

        {/* 13. Contacto */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
