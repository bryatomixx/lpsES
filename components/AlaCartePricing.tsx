"use client";
import { useState } from "react";
import SectionReveal from "./SectionReveal";

const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/0EgKTcd9YvsDKkQqklPo/webhook-trigger/7ec1d9dc-e8fa-4054-bff5-f8fcbba7719b";

interface Feature {
  id: string;
  label: string;
  description: string;
  category: string;
}

const features: Feature[] = [
  // Core
  { id: "website", label: "Professional Website", description: "Designed + connected to CRM, live in 7 days", category: "Core" },
  { id: "crm", label: "CRM Setup", description: "Pipelines, contacts, and lead tracking configured", category: "Core" },
  { id: "booking", label: "Online Booking System", description: "Clients schedule themselves — no back-and-forth", category: "Core" },
  { id: "google_profile", label: "Google Business Profile", description: "Setup + optimization to show up before competitors", category: "Core" },
  // Automation
  { id: "follow_up", label: "Email + SMS Follow-Up", description: "Automated sequences that chase leads for you", category: "Automation" },
  { id: "welcome_seq", label: "Welcome Sequence", description: "Every new lead gets your message within minutes", category: "Automation" },
  { id: "custom_automation", label: "Custom Automation", description: "We build 1 automation around your #1 bottleneck", category: "Automation" },
  { id: "nurturing", label: "Sales Pipeline + Lead Nurturing", description: "Cold leads warmed automatically until they're ready", category: "Automation" },
  { id: "reactivation", label: "Dormant Client Reactivation", description: "Recover revenue sitting in your existing database", category: "Automation" },
  { id: "calendar_reminders", label: "Calendar + No-Show Prevention", description: "Automatic reminders that cut no-shows dramatically", category: "Automation" },
  // Multichannel
  { id: "ai_chat", label: "AI Chat Widget", description: "Captures and qualifies leads on your site 24/7", category: "Multichannel" },
  { id: "whatsapp", label: "WhatsApp Business API", description: "Reach clients where they actually respond", category: "Multichannel" },
  { id: "facebook_ads", label: "Facebook Lead Ads → CRM", description: "Every FB/IG lead enters your pipeline automatically", category: "Multichannel" },
  { id: "instagram_dms", label: "Automated Instagram DMs", description: "Convert comments and messages into qualified leads", category: "Multichannel" },
  { id: "sales_funnel", label: "Complete Sales Funnel", description: "Landing page, form, follow-up — all connected", category: "Multichannel" },
  // AI & Content
  { id: "ai_voice", label: "AI Voice Agent", description: "Answers calls 24/7, qualifies leads, books appointments", category: "AI" },
  { id: "ai_emails", label: "AI-Generated Sales Emails", description: "Converting sequences written and sent automatically", category: "AI" },
  // Revenue
  { id: "reputation", label: "Reputation Management", description: "Automated review requests — dominate Google ratings", category: "Revenue" },
  { id: "stripe", label: "Stripe Payment Integration", description: "Collect deposits and payments from the same system", category: "Revenue" },
];

const categories = ["Core", "Automation", "Multichannel", "AI", "Revenue"];

const categoryLabels: Record<string, string> = {
  Core: "Core Setup",
  Automation: "Automation",
  Multichannel: "Multichannel",
  AI: "AI Features",
  Revenue: "Revenue & Reputation",
};

type Status = "idle" | "sending" | "success" | "error";

export default function AlaCartePricing() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [form, setForm] = useState({ name: "", email: "", business: "" });
  const [status, setStatus] = useState<Status>("idle");

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedFeatures = features.filter((f) => selected.has(f.id));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || selected.size === 0) return;
    setStatus("sending");

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          business: form.business,
          selected_features: selectedFeatures.map((f) => f.label).join(", "),
          feature_count: selected.size,
          source: "latinprimesystems.com — à la carte",
          submitted_at: new Date().toISOString(),
        }),
      });
      setStatus("success");
      setSelected(new Set());
      setForm({ name: "", email: "", business: "" });
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section
      id="a-la-carte"
      className="section-wrap"
      style={{ background: "var(--surface)" }}
    >
      <div className="section-inner">
        <SectionReveal>
          <div className="slabel">Build Your Package</div>
          <h2
            className="section-title"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
          >
            Don&apos;t Need Everything?{" "}
            <em
              style={{
                fontStyle: "italic",
                background: "linear-gradient(135deg, var(--blue), var(--gold))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Pick What You Need.
            </em>
          </h2>
          <p className="section-desc">
            Select the features that match your exact situation. We&apos;ll review your
            selection and send you a custom quote — no sales call required.
          </p>
        </SectionReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: 32,
            alignItems: "start",
          }}
          className="alacarte-grid"
        >
          {/* Feature selector */}
          <SectionReveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {categories.map((cat) => (
                <div key={cat}>
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--text-dim)",
                      marginBottom: 12,
                    }}
                  >
                    {categoryLabels[cat]}
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                      gap: 8,
                    }}
                  >
                    {features
                      .filter((f) => f.category === cat)
                      .map((feat) => {
                        const isOn = selected.has(feat.id);
                        return (
                          <button
                            key={feat.id}
                            onClick={() => toggle(feat.id)}
                            style={{
                              background: isOn
                                ? "rgba(26,127,212,0.12)"
                                : "var(--surface2)",
                              border: isOn
                                ? "1px solid rgba(26,127,212,0.5)"
                                : "1px solid var(--border)",
                              padding: "14px 16px",
                              cursor: "pointer",
                              textAlign: "left",
                              transition: "all 0.18s",
                            }}
                            onMouseEnter={(e) => {
                              if (!isOn)
                                (e.currentTarget as HTMLElement).style.borderColor =
                                  "rgba(26,127,212,0.3)";
                            }}
                            onMouseLeave={(e) => {
                              if (!isOn)
                                (e.currentTarget as HTMLElement).style.borderColor =
                                  "var(--border)";
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                marginBottom: 4,
                              }}
                            >
                              <span
                                style={{
                                  width: 16,
                                  height: 16,
                                  border: isOn
                                    ? "none"
                                    : "1px solid var(--border2)",
                                  background: isOn ? "var(--blue)" : "transparent",
                                  flexShrink: 0,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "0.6rem",
                                  color: "white",
                                  transition: "all 0.18s",
                                }}
                              >
                                {isOn ? "✓" : ""}
                              </span>
                              <span
                                style={{
                                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                                  fontWeight: 700,
                                  fontSize: "0.82rem",
                                  color: isOn ? "var(--blue)" : "var(--text)",
                                  transition: "color 0.18s",
                                }}
                              >
                                {feat.label}
                              </span>
                            </div>
                            <p
                              style={{
                                fontSize: "0.75rem",
                                color: "var(--text-muted)",
                                lineHeight: 1.5,
                                margin: 0,
                                paddingLeft: 24,
                              }}
                            >
                              {feat.description}
                            </p>
                          </button>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </SectionReveal>

          {/* Summary + form */}
          <SectionReveal delay={0.15}>
            <div
              style={{
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                padding: "28px 24px",
                position: "sticky",
                top: 24,
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--text-dim)",
                  marginBottom: 16,
                }}
              >
                Your Selection
              </div>

              {selected.size === 0 ? (
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-dim)",
                    lineHeight: 1.6,
                    marginBottom: 24,
                    fontStyle: "italic",
                  }}
                >
                  Select the features you need on the left.
                </p>
              ) : (
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    marginBottom: 20,
                    listStyle: "none",
                  }}
                >
                  {selectedFeatures.map((f) => (
                    <li
                      key={f.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {f.label}
                      </span>
                      <button
                        onClick={() => toggle(f.id)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "var(--text-dim)",
                          fontSize: "0.7rem",
                          padding: "2px 4px",
                          flexShrink: 0,
                        }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLElement).style.color =
                            "#e74c3c")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLElement).style.color =
                            "var(--text-dim)")
                        }
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {selected.size > 0 && (
                <div
                  style={{
                    padding: "10px 14px",
                    background: "rgba(26,127,212,0.08)",
                    border: "1px solid rgba(26,127,212,0.2)",
                    marginBottom: 20,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.62rem",
                      letterSpacing: "0.08em",
                      color: "var(--blue)",
                    }}
                  >
                    {selected.size} feature{selected.size !== 1 ? "s" : ""} selected
                    — we&apos;ll send you a custom quote
                  </span>
                </div>
              )}

              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  paddingTop: 20,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {(["name", "email", "business"] as const).map((field) => (
                  <div key={field}>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.58rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--text-dim)",
                        marginBottom: 6,
                      }}
                    >
                      {field === "name"
                        ? "Your name"
                        : field === "email"
                        ? "Email"
                        : "Business type"}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      value={form[field]}
                      onChange={(e) =>
                        setForm({ ...form, [field]: e.target.value })
                      }
                      placeholder={
                        field === "business" ? "e.g. Insurance Agency" : ""
                      }
                      required={field !== "business"}
                      style={{
                        width: "100%",
                        background: "var(--surface)",
                        border: "1px solid var(--border2)",
                        color: "var(--text)",
                        padding: "10px 12px",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.83rem",
                        outline: "none",
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor =
                          "rgba(26,127,212,0.5)")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "var(--border2)")
                      }
                    />
                  </div>
                ))}

                <button
                  onClick={handleSubmit}
                  disabled={
                    selected.size === 0 ||
                    !form.name ||
                    !form.email ||
                    status === "sending" ||
                    status === "success"
                  }
                  style={{
                    width: "100%",
                    padding: "13px",
                    background:
                      selected.size === 0 || !form.name || !form.email
                        ? "var(--surface)"
                        : status === "success"
                        ? "linear-gradient(135deg, #00a854, #007a3d)"
                        : status === "error"
                        ? "linear-gradient(135deg, #c0392b, #922b21)"
                        : "var(--blue)",
                    border:
                      selected.size === 0 || !form.name || !form.email
                        ? "1px solid var(--border)"
                        : "none",
                    color:
                      selected.size === 0 || !form.name || !form.email
                        ? "var(--text-dim)"
                        : "white",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    cursor:
                      selected.size === 0 ||
                      !form.name ||
                      !form.email ||
                      status === "sending" ||
                      status === "success"
                        ? "not-allowed"
                        : "pointer",
                    transition: "all 0.2s",
                    opacity: status === "sending" ? 0.7 : 1,
                    marginTop: 4,
                  }}
                >
                  {status === "idle" && "Send My Selection →"}
                  {status === "sending" && "Sending..."}
                  {status === "success" && "✓ Sent — We'll be in touch"}
                  {status === "error" && "Error — Try again"}
                </button>

                <p
                  style={{
                    fontSize: "0.68rem",
                    color: "var(--text-dim)",
                    lineHeight: 1.55,
                    textAlign: "center",
                    margin: 0,
                  }}
                >
                  We respond within 24h with a custom quote. No commitment required.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .alacarte-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
