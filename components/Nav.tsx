"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const BOOKING_URL =
  "https://link.latinprimesystems.com/widget/bookings/latin-prime-demo";

const navLinks = [
  { href: "#solutions", label: "Solutions" },
  { href: "#who", label: "Who We Serve" },
  { href: "#process", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.3s, border-color 0.3s",
          background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(15,34,64,0.08)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNav("#hero"); }}
          style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
        >
          <Image
            src="https://assets.cdn.filesafe.space/0EgKTcd9YvsDKkQqklPo/media/69ac6d227bdf387250ce554b.png"
            alt="Latin Prime Systems"
            width={140}
            height={36}
            style={{ height: 32, width: "auto", objectFit: "contain" }}
            priority
          />
        </a>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
          }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(15,34,64,0.55)",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "color 0.2s",
                padding: "4px 0",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0F2240")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(15,34,64,0.55)")}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "9px 20px",
              background: "#B4945D",
              color: "white",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: "0.78rem",
              letterSpacing: "0.02em",
              textDecoration: "none",
              transition: "all 0.25s",
              borderRadius: 6,
              boxShadow: "0 4px 16px rgba(180,148,93,0.28)",
            }}
            className="hidden md:inline-flex items-center btn-glow"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#C5A059";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(180,148,93,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#B4945D";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(180,148,93,0.28)";
            }}
          >
            Book a Demo
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col items-center justify-center"
            style={{
              background: "none",
              border: "1px solid rgba(15,34,64,0.2)",
              padding: "8px",
              cursor: "pointer",
              gap: 5,
              width: 38,
              height: 38,
            }}
            aria-label="Toggle menu"
          >
            <span
              style={{
                display: "block",
                width: 18,
                height: 1.5,
                background: "#0F2240",
                transition: "all 0.3s",
                transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: 18,
                height: 1.5,
                background: "#0F2240",
                transition: "all 0.3s",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: 18,
                height: 1.5,
                background: "#0F2240",
                transition: "all 0.3s",
                transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
              }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              top: 64,
              left: 0,
              right: 0,
              zIndex: 99,
              background: "rgba(255,255,255,0.98)",
              borderBottom: "1px solid rgba(15,34,64,0.08)",
              padding: "24px",
              backdropFilter: "blur(20px)",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => handleNav(link.href)}
                style={{
                  display: "block",
                  width: "100%",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(15,34,64,0.7)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  padding: "14px 0",
                  textAlign: "left",
                  borderBottom: "1px solid rgba(15,34,64,0.07)",
                }}
              >
                {link.label}
              </motion.button>
            ))}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                marginTop: 20,
                padding: "14px",
                background: "#B4945D",
                color: "white",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "0.9rem",
                textAlign: "center",
                textDecoration: "none",
                borderRadius: 8,
              }}
            >
              Book a Free Demo
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
