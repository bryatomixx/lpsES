"use client";
import SectionReveal from "./SectionReveal";

const BOOKING_URL =
  "https://link.latinprimesystems.com/widget/bookings/latin-prime-demo";

const rows = [
  { feature: "Monthly cost", ai: "Fraction of hiring costs", trad: "$2,000 – $4,000+" },
  { feature: "Availability", ai: "24/7/365 — no breaks", trad: "Business hours only" },
  { feature: "Response speed", ai: "<1 second", trad: "Minutes or hours" },
  { feature: "Multitasking", ai: "Thousands of tasks at once", trad: "One thing at a time" },
  { feature: "Lead follow-up", ai: "Never misses one", trad: "Sometimes forgotten" },
  { feature: "Missed calls", ai: "Text-Back + AI Voice 24/7", trad: "Frequent" },
  { feature: "Turnover risk", ai: "0% — never quits", trad: "High (resignations, illness)" },
  { feature: "Errors", ai: "Near zero", trad: "High human risk" },
  { feature: "Consistency", ai: "100% consistent", trad: "Variable" },
  { feature: "Setup time", ai: "7–30 days", trad: "Months" },
  { feature: "Scalability", ai: "Instant — no new hires", trad: "Hire more people" },
  { feature: "Integrations", ai: "CRM, WhatsApp, payments, calendar…", trad: "Limited" },
  { feature: "ROI", ai: "High and measurable from day 1", trad: "Low / variable" },
];

export default function AIEmployee() {
  return (
    <section
      id="ai-employee"
      className="section-wrap"
      style={{ background: "var(--bg)" }}
    >
      <div className="section-inner">
        <SectionReveal>
          <div className="slabel">The New Employee</div>
          <h2
            className="section-title"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", maxWidth: 640 }}
          >
            Your Business Needs an Employee{" "}
            <em style={{ fontStyle: "italic", color: "#B4945D" }}>
              That Never Clocks Out.
            </em>
          </h2>
          <p className="section-desc">
            An AI employee handles your chat, WhatsApp, and social media — booking
            appointments, answering questions, and taking action 24/7. No sick days.
            No turnover. No training costs.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid var(--border)",
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(15,34,64,0.04), 0 8px 32px rgba(15,34,64,0.07)",
              overflow: "hidden",
              marginBottom: 48,
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: 600,
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.62rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--text-dim)",
                        textAlign: "left",
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--border2)",
                        fontWeight: 400,
                        width: "30%",
                      }}
                    >
                      Feature
                    </th>
                    <th
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        textAlign: "center",
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--border2)",
                        background: "rgba(180,148,93,0.08)",
                        color: "var(--gold)",
                        width: "35%",
                      }}
                    >
                      ⭐ AI Employee
                    </th>
                    <th
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        textAlign: "center",
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--border2)",
                        color: "var(--text-dim)",
                        width: "35%",
                      }}
                    >
                      Traditional Employee
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: "1px solid var(--border)",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.background =
                          "rgba(15,34,64,0.02)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.background = "transparent")
                      }
                    >
                      <td
                        style={{
                          padding: "14px 16px",
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.72rem",
                          letterSpacing: "0.05em",
                          color: "var(--text-muted)",
                        }}
                      >
                        {row.feature}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          textAlign: "center",
                          background: "rgba(180,148,93,0.04)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                            flexWrap: "wrap",
                          }}
                        >
                          <span style={{ color: "var(--gold)", fontSize: "0.85rem" }}>✓</span>
                          <span
                            style={{
                              fontSize: "0.83rem",
                              color: "var(--text)",
                              fontWeight: 500,
                            }}
                          >
                            {row.ai}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px", textAlign: "center" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                          }}
                        >
                          <span style={{ color: "#e55", fontSize: "0.85rem" }}>✗</span>
                          <span
                            style={{
                              fontSize: "0.83rem",
                              color: "var(--text-dim)",
                              textDecoration: "line-through",
                              textDecorationColor: "rgba(255,80,80,0.4)",
                            }}
                          >
                            {row.trad}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.25}>
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--text-muted)",
                marginBottom: 20,
              }}
            >
              Ready to replace your biggest operational bottleneck?
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "15px 32px",
                background: "#B4945D",
                color: "white",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "0.9rem",
                textDecoration: "none",
                borderRadius: 8,
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#C5A059";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 6px 24px rgba(180,148,93,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#B4945D";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              Get Your AI Employee →
            </a>
            <div
              style={{
                marginTop: 10,
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.57rem",
                letterSpacing: "0.08em",
                color: "var(--text-dim)",
              }}
            >
              🛡️ 60-Day Guarantee — measurable results or we work free
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
