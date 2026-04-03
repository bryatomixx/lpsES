"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "./SectionReveal";

const BOOKING_URL =
  "https://link.latinprimesystems.com/widget/bookings/latin-prime-demo";

const faqs = [
  {
    q: "What if I'm not technical at all?",
    a: "That's exactly who we build this for. You don't touch a single piece of technology. We handle everything — setup, configuration, testing, and ongoing maintenance. You give us access to your phone number, your calendar, and your CRM, and we do the rest. When we hand it over, it just works.",
  },
  {
    q: "How long until my system is live?",
    a: "Starter systems are typically live in 7–14 days. Growth systems take 14–30 days depending on complexity. We send you a live system with a walkthrough — not a rough draft. We don't deliver until it's fully tested and ready to capture leads.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No. Month-to-month. You can cancel anytime. We keep clients because the system works, not because of lock-in. The only thing we ask is that you give the system at least 30 days to generate results before making a judgment.",
  },
  {
    q: "What does the setup fee cover?",
    a: "The setup fee covers the full build: your CRM configuration, all automations, the AI voice agent (if applicable), your website (Starter plan), integrations, testing, and your onboarding call. It's a one-time cost quoted during your strategy call based on your scope — typically $500–$2,500 depending on the plan.",
  },
  {
    q: "What if it doesn't work for my industry?",
    a: "Every system we build is custom to your industry and your specific workflows. We've built for insurance, real estate, dental, med spas, contractors, tax firms, restaurants, coaches, law firms, and salons — and the approach is different for each. If for any reason your system doesn't generate measurable results within the guarantee period, we keep working at no extra cost until it does.",
  },
  {
    q: "I already have GoHighLevel. Why do I need you?",
    a: "GHL is a tool — like buying a gym membership without a trainer. Most business owners who 'have GHL' have an account they barely use. We build the complete system inside it: the automations, the voice agent, the pipelines, the sequences, the integrations. If you already have GHL, we can configure your existing account. If not, GHL is included in your plan.",
  },
  {
    q: "Will the AI voice agent sound robotic?",
    a: "No. We use natural-sounding AI voice technology (ElevenLabs + VAPI) that's trained on your business — your tone, your FAQs, your services, your pricing. Callers regularly don't realize they're talking to an AI until they're told. You can review and approve the voice before we go live.",
  },
  {
    q: "What happens to my data and my clients' data?",
    a: "All data stays in your GoHighLevel account — which you own. We don't store, sell, or access your client data outside of the configuration work. GoHighLevel is SOC 2 Type II compliant and GDPR-ready. You retain 100% ownership of your data at all times.",
  },
  {
    q: "Do you work with businesses outside the US?",
    a: "Yes. We actively serve clients in Mexico, Colombia, Venezuela, and other Latin American markets. Pricing is adjusted for local market conditions on request. All systems support Spanish, English, and bilingual operation.",
  },
  {
    q: "How do I know I'm getting ROI?",
    a: "We set up a reporting dashboard from day one. You'll see exactly how many leads were captured, how many calls were answered by the AI, how many appointments were booked, and how many follow-ups went out — updated automatically. No guessing. Numbers every week.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      style={{
        background: "var(--bg)",
        padding: "100px 0",
        position: "relative",
      }}
    >
      <div className="section-inner">
        <SectionReveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.6fr",
              gap: 64,
              alignItems: "start",
            }}
            className="faq-grid"
          >
            {/* Left */}
            <div style={{ position: "sticky", top: 100 }}>
              <div className="slabel">FAQ</div>
              <h2
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)",
                  lineHeight: 1.15,
                  marginBottom: 16,
                }}
              >
                Every Question
                <br />
                You&apos;re Thinking{" "}
                <em style={{ fontStyle: "italic", color: "#B4945D" }}>
                  Right Now
                </em>
              </h2>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.75,
                  marginBottom: 32,
                }}
              >
                No sales pitch. Just straight answers to what every business owner
                wants to know before committing.
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 22px",
                  background: "transparent",
                  border: "1px solid var(--border2)",
                  color: "var(--text)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  textDecoration: "none",
                  borderRadius: 8,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(15,34,64,0.3)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(15,34,64,0.03)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border2)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                Still have questions? Book a call →
              </a>
            </div>

            {/* Right — Accordion */}
            <div>
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  style={{
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    style={{
                      width: "100%",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "22px 0",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 16,
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        color: open === i ? "var(--text)" : "var(--text-muted)",
                        lineHeight: 1.4,
                        transition: "color 0.2s",
                      }}
                    >
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: open === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        flexShrink: 0,
                        width: 28,
                        height: 28,
                        border: `1px solid ${open === i ? "var(--gold)" : "var(--border2)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: open === i ? "var(--gold)" : "var(--text-dim)",
                        borderRadius: 6,
                        fontSize: "1.2rem",
                        fontWeight: 300,
                        transition: "border-color 0.2s, color 0.2s",
                      }}
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          style={{
                            fontSize: "0.9rem",
                            color: "var(--text-muted)",
                            lineHeight: 1.78,
                            paddingBottom: 22,
                          }}
                        >
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .faq-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .faq-grid > div:first-child {
            position: static !important;
          }
        }
      `}</style>
    </section>
  );
}
