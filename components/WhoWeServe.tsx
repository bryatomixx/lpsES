"use client";
import Image from "next/image";
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
    img: "https://assets.cdn.filesafe.space/0EgKTcd9YvsDKkQqklPo/media/69b1b1d28d3eae5fc91f63b3.png",
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
    img: "https://assets.cdn.filesafe.space/0EgKTcd9YvsDKkQqklPo/media/69b1b1d28d3eae4ef11f63b4.png",
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
    img: "https://assets.cdn.filesafe.space/0EgKTcd9YvsDKkQqklPo/media/69b1b1d28d3eae5a0c1f63b5.png",
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
    img: "https://assets.cdn.filesafe.space/0EgKTcd9YvsDKkQqklPo/media/69b1b1d28d3eae567a1f63b6.png",
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
    img: "https://assets.cdn.filesafe.space/0EgKTcd9YvsDKkQqklPo/media/69b1b1d28d3eae07f11f63b7.png",
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
    img: "https://assets.cdn.filesafe.space/0EgKTcd9YvsDKkQqklPo/media/69b1b1d28d3eae2cce1f63b8.png",
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
    img: "https://assets.cdn.filesafe.space/0EgKTcd9YvsDKkQqklPo/media/69b1b1d28d3eae58361f63b9.png",
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
    img: "https://assets.cdn.filesafe.space/0EgKTcd9YvsDKkQqklPo/media/69b1b1d28d3eae36561f63ba.png",
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
  return (
    <section
      id="who"
      className="section-wrap"
      style={{ background: "var(--bg)" }}
    >
      <div className="section-inner">
        <SectionReveal>
          <div className="slabel">Who This Is For</div>
          <h2
            className="section-title"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", maxWidth: 600 }}
          >
            Any Business That Wants to{" "}
            <em
              style={{
                fontStyle: "italic",
                background: "linear-gradient(135deg, var(--blue), var(--gold))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
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
            gap: 2,
          }}
        >
          {industries.map((ind, i) => (
            <SectionReveal key={i} delay={i * 0.05} style={{ height: "100%" }}>
              <a
                href={`/industries/${ind.slug}`}
                style={{
                  display: "block",
                  textDecoration: "none",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: "28px 22px",
                  cursor: "pointer",
                  transition: "border-color 0.3s, transform 0.3s, background 0.3s",
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                  boxSizing: "border-box",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(26,127,212,0.3)";
                  el.style.transform = "translateY(-4px)";
                  el.style.background = "var(--surface2)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.transform = "translateY(0)";
                  el.style.background = "var(--surface)";
                }}
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
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.62rem",
                    letterSpacing: "0.1em",
                    color: "var(--blue)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  See what we can do →
                </span>
              </a>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
