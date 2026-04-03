"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import SectionReveal from "./SectionReveal";

const industries = [
  {
    icon: "🛡️",
    name: "Insurance Agencies",
    slug: "insurance",
    desc: "Agents lose policies every day because no one followed up in time. Most leads go cold before anyone picks up the phone.",
    img: "https://assets.cdn.filesafe.space/0EgKTcd9YvsDKkQqklPo/media/69b1b1d28d3eae21e91f63b1.png",
    items: [
      "AI voice agent qualifies leads & books appointments 24/7",
      "Automated renewal reminders via SMS, email & WhatsApp",
      "Referral request sequence sent after every closed policy",
      "CRM pipeline with hot lead alerts & automatic follow-up",
      "Re-engagement campaign for dormant leads (30/60/90 days)",
      "Multi-channel follow-up: call → SMS → email → voicemail drop",
    ],
  },
  {
    icon: "🏠",
    name: "Real Estate Agents & Brokers",
    slug: "real-estate",
    desc: "90% of leads never close — not because they weren't interested, but because no one followed up consistently enough.",
    img: "https://assets.cdn.filesafe.space/0EgKTcd9YvsDKkQqklPo/media/69b1b1d28d3eae642e1f63b2.png",
    items: [
      "Instant SMS/email response to new leads — under 2 minutes",
      "AI agent qualifies buyer intent, budget & timeline automatically",
      "Showing scheduler connected to your calendar — zero friction",
      "Long-term nurture for leads not ready yet (6–12 month sequence)",
      "Automatic follow-up after every open house",
      "CRM with full buyer & seller pipelines",
    ],
  },
  {
    icon: "🦷",
    name: "Dental & Healthcare",
    slug: "dental",
    desc: "Every missed appointment is lost revenue. Every unanswered call is a patient who went to the next clinic on the list.",
    img: "https://assets.cdn.filesafe.space/0EgKTcd9YvsDKkQqklPo/media/69b1b1d2f3d78f630c1a9f7e.png",
    items: [
      "24/7 appointment booking — no receptionist needed after hours",
      "Automated reminders that cut no-shows by up to 60%",
      "Recall campaigns for patients who haven't come in 6+ months",
      "Google review requests sent after every appointment",
      "New patient intake form — automated and connected to your system",
      "Insurance verification follow-up automation",
    ],
  },
  {
    icon: "💆",
    name: "Med Spas & Aesthetics",
    slug: "med-spa",
    desc: "Clients ghost after their first visit. The money is in the rebooking — and that only happens when the follow-up is automatic.",
    img: "https://assets.cdn.filesafe.space/0EgKTcd9YvsDKkQqklPo/media/69b1b1d28d3eaee28e1f63b3.png",
    items: [
      "Automated rebooking sequence after every treatment",
      "Upsell sequences for complementary services",
      "Birthday & seasonal promotions sent automatically",
      "VIP client segmentation and personalized outreach",
      "Abandoned booking recovery — follow up within minutes",
      "Review funnel on Google & Yelp on autopilot",
    ],
  },
  {
    icon: "🔧",
    name: "Contractors & Home Services",
    slug: "contractors",
    desc: "You're on a job site. You miss calls. Those missed calls are your competitors' new clients.",
    img: "https://assets.cdn.filesafe.space/0EgKTcd9YvsDKkQqklPo/media/69b1b1d2c2389c1a78536c6c.png",
    items: [
      "Missed call text-back — every missed call gets an immediate SMS",
      "AI voice agent answers inbound calls and books estimates",
      "Automated quote follow-up — stops leads from going cold",
      "Job completion → review request sequence",
      "Seasonal service reminders to past clients",
      "Referral incentive automation",
    ],
  },
  {
    icon: "📊",
    name: "Tax & Accounting Firms",
    slug: "tax-accounting",
    desc: "Tax season is chaos. Document collection, deadline reminders, client follow-up — all of it can be automated.",
    img: "https://assets.cdn.filesafe.space/0EgKTcd9YvsDKkQqklPo/media/69b1b1d28cb259174841bf11.png",
    items: [
      "Document collection sequences — automated reminders until complete",
      "Tax season intake — fully automated new client onboarding",
      "Deadline reminder campaigns for quarterly & annual filings",
      "Upsell sequences for bookkeeping, payroll, and advisory services",
      "Year-round client check-ins that keep relationships warm",
      "Referral campaigns targeting current satisfied clients",
    ],
  },
  {
    icon: "🍽️",
    name: "Restaurants & Local Business",
    slug: "restaurants",
    desc: "You compete on Google reviews and repeat visits. Both can be driven by automation.",
    img: "https://assets.cdn.filesafe.space/0EgKTcd9YvsDKkQqklPo/media/69b1b1d27fc07c048f9b8b54.png",
    items: [
      "SMS loyalty program — automated points, rewards, and promotions",
      "Review request sequence after every visit or order",
      "Win-back campaigns for customers who haven't returned in 30+ days",
      "Event & special promotion announcements via SMS/email",
      "Online reservation system connected to your operations",
      "Google Business Profile optimized and monitored automatically",
    ],
  },
  {
    icon: "🎯",
    name: "Coaches & Consultants",
    slug: "coaches",
    desc: "You sell outcomes. Your systems should reflect that — capturing, nurturing, and closing leads without you being in the loop for every step.",
    img: "https://assets.cdn.filesafe.space/0EgKTcd9YvsDKkQqklPo/media/69b1b1d2584eaa8406418690.png",
    items: [
      "Lead magnet → email sequence → sales call, fully automated",
      "Discovery call booking directly from ads and social media",
      "Proposal follow-up sequence — never leave money on the table",
      "Onboarding automation for new clients",
      "Testimonial collection at key milestone moments",
      "Upsell sequences for premium programs and renewals",
    ],
  },
  {
    icon: "⚖️",
    name: "Law Firms & Legal Services",
    slug: "law-firms",
    desc: "Potential clients don't wait. If you don't respond within minutes, they call the next firm on the list.",
    img: "https://assets.cdn.filesafe.space/0EgKTcd9YvsDKkQqklPo/media/69b1b1d2584eaa6b2e418691.png",
    items: [
      "24/7 intake system — AI agent qualifies case type and urgency",
      "Immediate response to web form submissions and missed calls",
      "Consultation booking directly from your website",
      "Case status update sequences that reduce inbound inquiry calls",
      "Referral source tracking and attorney referral management",
      "Client satisfaction follow-up after case resolution",
    ],
  },
  {
    icon: "✂️",
    name: "Salons, Barbershops & Spas",
    slug: "salons",
    desc: "Empty chairs cost money. Automated rebooking keeps your calendar full without you doing anything.",
    img: "https://assets.cdn.filesafe.space/0EgKTcd9YvsDKkQqklPo/media/69b1b1d257249b6b5f3cdce7.png",
    items: [
      "Automated rebooking reminder 3–4 weeks after every visit",
      "No-show and late cancellation recovery sequence",
      "Loyalty rewards program — fully automated",
      "Birthday promotions sent to every client automatically",
      "New service launch announcements to your full client base",
      "Review requests sent after every completed appointment",
    ],
  },
];

export default function WhoWeServe() {
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const activeIndustry = activeModal !== null ? industries[activeModal] : null;

  return (
    <>
      <section
        id="who"
        className="section-wrap"
        style={{ background: "var(--surface)" }}
      >
        <div className="section-inner">
          <SectionReveal>
            <div className="slabel">Who This Is For</div>
            <h2
              className="section-title"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", maxWidth: 600 }}
            >
              Any Business That Wants to{" "}
              <em style={{ fontStyle: "italic", color: "#B4945D" }}>
                Operate Smarter
              </em>
            </h2>
            <p className="section-desc">
              This used to be only for companies with million-dollar tech budgets.
              Not anymore.
            </p>
          </SectionReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 16,
            }}
          >
            {industries.map((ind, i) => (
              <SectionReveal key={i} delay={i * 0.05} style={{ height: "100%" }}>
                <div
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    padding: "28px 22px",
                    cursor: "pointer",
                    transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                    position: "relative",
                    overflow: "hidden",
                    height: "100%",
                    boxSizing: "border-box",
                    boxShadow: "0 1px 4px rgba(15,34,64,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(180,148,93,0.4)";
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = "0 8px 32px rgba(15,34,64,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border)";
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "0 1px 4px rgba(15,34,64,0.04)";
                  }}
                  onClick={() => setActiveModal(i)}
                >
                  <div style={{ fontSize: "1.8rem", marginBottom: 10 }}>{ind.icon}</div>
                  <h3
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      lineHeight: 1.4,
                      marginBottom: 10,
                      color: "var(--text)",
                    }}
                  >
                    {ind.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-muted)",
                      lineHeight: 1.65,
                      marginBottom: 16,
                    }}
                  >
                    {ind.desc}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.62rem",
                        letterSpacing: "0.1em",
                        color: "var(--gold)",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      See what we can do →
                    </span>
                    <Link
                      href={`/${ind.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.58rem",
                        letterSpacing: "0.1em",
                        color: "var(--text-muted)",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                      }}
                    >
                      Dedicated page ↗
                    </Link>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {activeModal !== null && activeIndustry && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(15,34,64,0.65)",
                zIndex: 200,
                backdropFilter: "blur(8px)",
              }}
            />
            {/* Centering wrapper */}
            <div
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 201,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px",
                pointerEvents: "none",
              }}
            >
              {/* Modal box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "relative",
                  pointerEvents: "all",
                  width: "min(90vw, 820px)",
                  maxHeight: "85vh",
                  background: "#FFFFFF",
                  border: "1px solid var(--border2)",
                  borderRadius: 12,
                  display: "grid",
                  gridTemplateColumns: "1fr 1.4fr",
                  overflow: "hidden",
                }}
                className="modal-grid"
              >
                {/* Left — Image */}
                <div
                  style={{
                    position: "relative",
                    minHeight: 300,
                    background: "var(--surface)",
                    overflow: "hidden",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <motion.img
                    src={activeIndustry.img}
                    alt={activeIndustry.name}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 0.85, scale: 1 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(135deg, rgba(2,5,8,0.6) 0%, transparent 60%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: "#B4945D",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 20,
                      left: 20,
                    }}
                  >
                    <div style={{ fontSize: "2rem", marginBottom: 4 }}>{activeIndustry.icon}</div>
                    <h3
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 800,
                        fontSize: "1.2rem",
                        color: "white",
                        textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                      }}
                    >
                      {activeIndustry.name}
                    </h3>
                  </div>
                </div>

                {/* Right — Content */}
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                  }}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setActiveModal(null)}
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      zIndex: 2,
                      background: "var(--surface)",
                      border: "1px solid var(--border2)",
                      borderRadius: 6,
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "var(--text-muted)",
                      fontSize: "1rem",
                      transition: "color 0.2s",
                    }}
                    aria-label="Close"
                  >
                    ×
                  </button>

                  {/* Scrollable content */}
                  <div style={{ flex: 1, overflowY: "auto", padding: "32px 28px 16px" }}>
                    <div
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.6rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--gold)",
                        marginBottom: 16,
                      }}
                    >
                      What we deploy for you
                    </div>

                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                      {activeIndustry.items.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          style={{
                            display: "flex",
                            gap: 10,
                            fontSize: "0.87rem",
                            color: "var(--text-muted)",
                            lineHeight: 1.6,
                          }}
                        >
                          <span style={{ color: "var(--gold)", flexShrink: 0, marginTop: 2 }}>✓</span>
                          {item}
                        </motion.li>
                      ))}
                      <motion.li
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: activeIndustry.items.length * 0.06 }}
                        style={{
                          fontSize: "0.8rem",
                          color: "rgba(180,148,93,0.7)",
                          fontStyle: "italic",
                          paddingLeft: 22,
                        }}
                      >
                        And much more...
                      </motion.li>
                    </ul>
                  </div>

                  {/* Sticky footer — nav + CTA */}
                  <div
                    style={{
                      padding: "16px 28px 24px",
                      borderTop: "1px solid var(--border)",
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                      flexWrap: "wrap",
                      background: "#FFFFFF",
                    }}
                  >
                    {activeModal > 0 && (
                      <button
                        onClick={() => setActiveModal(activeModal - 1)}
                        style={{
                          background: "var(--surface)",
                          border: "1px solid var(--border2)",
                          borderRadius: 6,
                          padding: "8px 14px",
                          cursor: "pointer",
                          color: "var(--text-muted)",
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.65rem",
                          letterSpacing: "0.1em",
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        ← Prev
                      </button>
                    )}
                    {activeModal < industries.length - 1 && (
                      <button
                        onClick={() => setActiveModal(activeModal + 1)}
                        style={{
                          background: "var(--surface)",
                          border: "1px solid var(--border2)",
                          borderRadius: 6,
                          padding: "8px 14px",
                          cursor: "pointer",
                          color: "var(--text-muted)",
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.65rem",
                          letterSpacing: "0.1em",
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        Next →
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          .modal-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
