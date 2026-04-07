"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "./SectionReveal";

const BOOKING_URL =
  "https://link.latinprimesystems.com/widget/bookings/latin-prime-demo";
const STARTER_PAYMENT =
  "https://link.latinprimesystems.com/payment-link/692e34bda611824d7675e7f0";
const PRO_PAYMENT =
  "https://link.latinprimesystems.com/payment-link/69cc6409c6a0e600f4d06bd2";
const GROWTH_PAYMENT =
  "https://link.latinprimesystems.com/payment-link/692e3647d8c1a8022cff08f1";

type Currency = "USD" | "COP" | "MXN";

// Approximate rates — USD is the billing currency
const RATES: Record<Currency, number> = { USD: 1, COP: 4200, MXN: 17.5 };
const CURRENCY_LABELS: Record<Currency, string> = {
  USD: "🇺🇸 USD",
  COP: "🇨🇴 COP",
  MXN: "🇲🇽 MXN",
};

function formatPrice(usd: number | null, currency: Currency): string {
  if (usd === null) return "Custom";
  if (currency === "USD") return `$${usd.toLocaleString("en-US")}`;
  const converted = Math.round(usd * RATES[currency]);
  if (currency === "COP") return `$${converted.toLocaleString("es-CO")}`;
  return `$${converted.toLocaleString("es-MX")}`;
}

function formatSetup(usd: number | null, currency: Currency, label: string): string {
  if (usd === null) return label;
  if (currency === "USD") return `+ $${usd.toLocaleString("en-US")} one-time setup fee`;
  const converted = Math.round(usd * RATES[currency]);
  const sym = currency === "COP" ? converted.toLocaleString("es-CO") : converted.toLocaleString("es-MX");
  return `+ $${sym} ${currency} cuota de implementación única`;
}

interface Plan {
  tier: string;
  tagline: string;
  priceUSD: number | null;
  setupUSD: number | null;
  setupLabel: string;
  priceSub: string;
  ideal: string;
  featured: boolean;
  badge?: string;
  guarantee: string;
  cta: string;
  ctaHref: string;
  features: Array<string | { section: string }>;
}

const plans: Plan[] = [
  {
    tier: "Starter",
    tagline:
      "Everything you need to capture leads and automate follow-up from day 1 — without hiring anyone.",
    priceUSD: 497,
    setupUSD: 997,
    setupLabel: "+ $997 one-time setup fee",
    priceSub: "/mo",
    ideal:
      "Best for: Local businesses, solo operators, and service providers taking their first step into automation.",
    featured: false,
    guarantee:
      "🛡️ If your system isn't live and working within 30 days, we refund the month.",
    cta: "Get Started",
    ctaHref: STARTER_PAYMENT,
    features: [
      "CRM with up to 2 pipelines — know exactly where every client stands",
      "AI chat widget on your site — captures leads and books appointments while you sleep",
      "Online booking system — clients schedule themselves, no back-and-forth calls",
      "Automated follow-up via email + SMS — never chase a lead manually again",
      "Automatic welcome sequence — every new lead gets your message within minutes",
      "1 custom automation built for your #1 problem — you tell us, we build it",
      "Google Business Profile setup — show up before your competition on Google",
      "Monthly performance report — see what's working without building anything",
      "Email support — response within 24h",
    ],
  },
  {
    tier: "Pro",
    tagline:
      "Multichannel automation and unlimited flows — your leads captured everywhere, your operation running itself.",
    priceUSD: 997,
    setupUSD: 1497,
    setupLabel: "+ $1,497 one-time setup fee",
    priceSub: "/mo",
    ideal:
      "Best for: Growing businesses ready to automate across every channel and stop relying on manual follow-up.",
    featured: false,
    badge: "Best Value",
    guarantee:
      "🛡️ If in 45 days you don't see a measurable improvement in lead response or time saved, we work for free until you do.",
    cta: "Get Started",
    ctaHref: PRO_PAYMENT,
    features: [
      "Everything in Starter — unlimited pipelines & flows",
      "Professional website — designed, connected to your CRM, ready in 7 days",
      "Website hosting & maintenance — no extra costs",
      { section: "── UNLIMITED AUTOMATIONS ──" },
      "Unlimited custom automations — your entire back-office handled automatically",
      "Advanced AI chat — connected to CRM, qualifies leads and books appointments",
      "Sales pipeline with automatic nurturing — today's cold lead is tomorrow's client",
      "Calendar integration + automatic reminders — zero no-shows",
      "Dormant client reactivation — recover revenue sitting in your database",
      { section: "── MULTICHANNEL ──" },
      "Facebook Lead Ads → CRM — every lead enters automatically, zero manual work",
      "Automated Instagram DMs — turn comments and messages into qualified leads",
      "WhatsApp Business API — reach clients where they respond most",
      "Complete sales funnel — landing page, form, follow-up, all connected",
      { section: "── REPUTATION & PAYMENTS ──" },
      "Reputation management — automated review requests, dominate Google Business",
      "Stripe integrated — collect deposits, payments and subscriptions from the same system",
      { section: "── SUPPORT ──" },
      "Priority support — response within 8h",
      "Bi-weekly performance report — see exactly what's converting",
    ],
  },
  {
    tier: "Growth",
    tagline:
      "Your entire operation running on its own — with an AI that answers every call, closes leads, and works 24/7.",
    priceUSD: 1497,
    setupUSD: 1997,
    setupLabel: "+ $1,997 one-time setup fee",
    priceSub: "/mo",
    ideal:
      "Best for: Businesses serious about never losing a lead — where an AI voice agent handles every call while you focus on closing.",
    featured: true,
    badge: "Most Popular",
    guarantee:
      "🛡️ If in 60 days you don't see a measurable increase in leads or time saved, we work for free until you do.",
    cta: "Get Started",
    ctaHref: GROWTH_PAYMENT,
    features: [
      "Everything in Pro — as your automation base",
      { section: "── AI VOICE AGENT ──" },
      "Answers every inbound call 24/7 — never lose a lead for not picking up",
      "Qualifies leads with custom questions — only ready prospects reach you",
      "Books appointments directly into your calendar — no confirmation calls needed",
      "Automatically calls new leads — the first to contact wins, and that's you",
      { section: "── AI CONTENT ──" },
      "AI-generated sales emails — converting sequences, written automatically",
      "Personalized follow-up copy — every lead gets the right message at the right time",
      { section: "── REPORTING ──" },
      "Automatic reporting dashboard — see exactly how much each channel generates",
      { section: "── SUPPORT ──" },
      "Priority support — response within 4h",
      "Monthly strategy call — we review numbers and optimize together",
    ],
  },
  {
    tier: "Enterprise",
    tagline: "Complete infrastructure, built exactly for your operation.",
    priceUSD: null,
    setupUSD: null,
    setupLabel: "Scoped & quoted for your specific needs",
    priceSub: "",
    ideal:
      "Best for: Agencies, multi-location businesses, and companies with complex operations that need fully custom infrastructure.",
    featured: false,
    guarantee:
      "🛡️ Documented ROI in 90 days — or we keep working at no extra cost until you see it.",
    cta: "Let's Talk About Your Business",
    ctaHref: BOOKING_URL,
    features: [
      "Everything in Growth — as your operational base",
      { section: "── CUSTOM AUTOMATION ──" },
      "100% custom workflows — we build exactly what your business needs",
      "AI agent trained on your data — responds like your best employee, at unlimited scale",
      "Automated client onboarding — every new client gets the same perfect experience",
      "Automated referral system — your current clients bring you new ones on their own",
      { section: "── ADVANCED INFRASTRUCTURE ──" },
      "Connect any system — CRM, ERP, POS, legacy software, whatever you already use",
      "Multi-location / multi-brand infrastructure — one system controlling all your operations",
      "AI content at scale — posts, emails and sales copy generated automatically",
      { section: "── FOR AGENCIES ──" },
      "Full white-label — offer all of this under your own brand",
      "API access + custom integrations — no technical limits",
      { section: "── MANAGEMENT & SUPPORT ──" },
      "Dedicated account manager — one person responsible for your results",
      "Weekly calls + real-time Slack support",
      "Quarterly full audit — we identify opportunities you're leaving on the table",
      "Custom SLA — you know exactly what to expect and when",
    ],
  },
];

function FeatureItem({ feat, featured }: { feat: string | { section: string }; featured: boolean }) {
  if (typeof feat === "object") {
    return (
      <li
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.6rem",
          letterSpacing: "0.14em",
          color: featured ? "rgba(255,255,255,0.35)" : "var(--text-dim)",
          padding: "10px 0 4px",
          marginTop: 4,
          listStyle: "none",
        }}
      >
        {feat.section}
      </li>
    );
  }
  return (
    <li
      style={{
        display: "flex",
        gap: 10,
        fontSize: "0.83rem",
        color: featured ? "rgba(255,255,255,0.65)" : "var(--text-muted)",
        lineHeight: 1.6,
        listStyle: "none",
      }}
    >
      <span style={{ color: "#B4945D", flexShrink: 0, marginTop: 2 }}>✓</span>
      {feat}
    </li>
  );
}

export default function Pricing() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [currency, setCurrency] = useState<Currency>("USD");

  return (
    <section
      id="pricing"
      className="section-wrap"
      style={{ background: "var(--surface)" }}
    >
      <div className="section-inner">
        <SectionReveal>
          <div className="slabel">Investment</div>
          <h2
            className="section-title"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
          >
            Enterprise Infrastructure{" "}
            <em style={{ fontStyle: "italic", color: "#B4945D" }}>at Every Budget</em>
          </h2>
          <p className="section-desc">
            Choose the level that fits where your business is today — and upgrade
            as you grow. Every plan includes setup, configuration, and ongoing support.
          </p>

          {/* Currency toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-dim)" }}>
              Currency:
            </span>
            <div style={{ display: "flex", border: "1px solid var(--border2)", borderRadius: 6, overflow: "hidden" }}>
              {(["USD", "COP", "MXN"] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  style={{
                    background: currency === c ? "#B4945D" : "transparent",
                    border: "none",
                    borderRight: c !== "MXN" ? "1px solid var(--border2)" : "none",
                    color: currency === c ? "white" : "var(--text-muted)",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.68rem",
                    letterSpacing: "0.08em",
                    padding: "7px 16px",
                    cursor: "pointer",
                    transition: "background 0.2s, color 0.2s",
                    fontWeight: currency === c ? 700 : 400,
                  }}
                >
                  {CURRENCY_LABELS[c]}
                </button>
              ))}
            </div>
            {currency !== "USD" && (
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.57rem", letterSpacing: "0.06em", color: "var(--text-dim)" }}>
                ≈ Approximate · USD is the billing currency
              </span>
            )}
          </div>
        </SectionReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
            alignItems: "stretch",
          }}
        >
          {plans.map((plan, i) => (
            <SectionReveal key={i} delay={i * 0.1}>
              <div
                style={plan.featured ? {
                  background: "#0F2240",
                  border: "1px solid rgba(180,148,93,0.3)",
                  borderRadius: 12,
                  padding: "36px 28px",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
                  boxShadow: "none",
                } : {
                  background: "#FFFFFF",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: "36px 28px",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
                  boxShadow: "0 2px 8px rgba(15,34,64,0.04)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  if (plan.featured) {
                    el.style.borderColor = "rgba(180,148,93,0.6)";
                    el.style.boxShadow = "0 8px 40px rgba(15,34,64,0.2)";
                    el.style.transform = "translateY(-2px)";
                  } else {
                    el.style.borderColor = "rgba(180,148,93,0.35)";
                    el.style.boxShadow = "0 8px 40px rgba(15,34,64,0.1)";
                    el.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  if (plan.featured) {
                    el.style.borderColor = "rgba(180,148,93,0.3)";
                    el.style.boxShadow = "none";
                    el.style.transform = "translateY(0)";
                  } else {
                    el.style.borderColor = "var(--border)";
                    el.style.boxShadow = "0 2px 8px rgba(15,34,64,0.04)";
                    el.style.transform = "translateY(0)";
                  }
                }}
              >
                {/* Top gradient bar */}
                {plan.featured ? (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: "linear-gradient(90deg, #B4945D, #C5A059)",
                      boxShadow: "none",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: "linear-gradient(90deg, transparent, var(--border2), transparent)",
                    }}
                  />
                )}

                {plan.badge && (
                  <div
                    style={{
                      display: "inline-block",
                      background: plan.featured
                        ? "linear-gradient(135deg, #B4945D, #C5A059)"
                        : "#B4945D",
                      color: "white",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.58rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      padding: "5px 12px",
                      fontWeight: 600,
                      marginBottom: 16,
                      boxShadow: "none",
                    }}
                  >
                    {plan.badge}
                  </div>
                )}

                <h3
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.4rem",
                    color: plan.featured ? "white" : "var(--text)",
                    marginBottom: 8,
                  }}
                >
                  {plan.tier}
                </h3>

                <p
                  style={{
                    fontSize: "0.83rem",
                    color: plan.featured ? "rgba(255,255,255,0.7)" : "var(--text-muted)",
                    lineHeight: 1.65,
                    marginBottom: 24,
                    minHeight: 60,
                  }}
                >
                  {plan.tagline}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 4,
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 900,
                      fontSize: plan.priceUSD && currency !== "USD" ? "2rem" : "2.6rem",
                      color: plan.featured ? "#B4945D" : "var(--text)",
                      letterSpacing: "-0.03em",
                      transition: "font-size 0.2s",
                    }}
                  >
                    {formatPrice(plan.priceUSD, currency)}
                  </span>
                  {plan.priceSub && (
                    <span style={{ color: plan.featured ? "rgba(255,255,255,0.7)" : "var(--text-muted)", fontSize: "0.9rem" }}>
                      {plan.priceSub}
                      {currency !== "USD" && <span style={{ fontSize: "0.7rem", marginLeft: 4 }}>{currency}</span>}
                    </span>
                  )}
                </div>

                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    color: plan.featured ? "rgba(255,255,255,0.7)" : "var(--text-dim)",
                    marginBottom: 6,
                  }}
                >
                  {formatSetup(plan.setupUSD, currency, plan.setupLabel)}
                </div>

                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.62rem",
                    letterSpacing: "0.08em",
                    color: plan.featured ? "rgba(255,255,255,0.7)" : "var(--text-muted)",
                    marginBottom: 28,
                    paddingBottom: 24,
                    borderBottom: plan.featured ? "1px solid rgba(255,255,255,0.1)" : "1px solid var(--border)",
                    lineHeight: 1.6,
                  }}
                >
                  {plan.ideal}
                </div>

                {/* Feature list — collapsible */}
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginBottom: 16,
                    maxHeight: expanded === i ? "none" : 240,
                    overflow: "hidden",
                    position: "relative",
                    flex: 1,
                  }}
                >
                  {plan.features.slice(0, expanded === i ? undefined : 6).map((feat, j) => (
                    <FeatureItem key={j} feat={feat} featured={plan.featured} />
                  ))}
                </ul>

                {plan.features.length > 6 && (
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--gold)",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "8px 0",
                      marginBottom: 20,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {expanded === i
                      ? "↑ Show less"
                      : `↓ Show all ${plan.features.filter((f) => typeof f === "string").length} features`}
                  </button>
                )}

                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.06em",
                    color: plan.featured ? "rgba(255,255,255,0.45)" : "var(--text-dim)",
                    marginBottom: 24,
                    lineHeight: 1.6,
                    paddingTop: 16,
                    borderTop: plan.featured ? "1px solid rgba(255,255,255,0.1)" : "1px solid var(--border)",
                  }}
                >
                  {plan.guarantee}
                </div>

                <a
                  href={plan.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "14px 24px",
                    background: plan.featured ? "#B4945D" : "transparent",
                    border: plan.featured
                      ? "1px solid #B4945D"
                      : "1px solid var(--border2)",
                    color: plan.featured ? "white" : "var(--text)",
                    borderRadius: 8,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    textDecoration: "none",
                    transition: "all 0.25s",
                    marginTop: "auto",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    if (plan.featured) {
                      el.style.background = "#C5A059";
                      el.style.boxShadow = "none";
                    } else {
                      el.style.borderColor = "rgba(15,34,64,0.35)";
                      el.style.background = "rgba(15,34,64,0.03)";
                    }
                    el.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    if (plan.featured) {
                      el.style.background = "#B4945D";
                      el.style.boxShadow = "none";
                    } else {
                      el.style.borderColor = "var(--border2)";
                      el.style.background = "transparent";
                    }
                    el.style.transform = "translateY(0)";
                  }}
                >
                  {plan.cta}
                </a>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.3}>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.08em",
              color: "var(--text-dim)",
              textAlign: "center",
              marginTop: 36,
              lineHeight: 1.7,
            }}
          >
            All plans include a free strategy call before you commit. No long-term
            contracts — cancel anytime. Setup fee is paid once at the start — it covers
            full system build, configuration, and launch.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
