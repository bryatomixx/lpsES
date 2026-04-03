"use client";
import SectionReveal from "./SectionReveal";
import SpotlightCard from "./SpotlightCard";

const solutions = [
  {
    outcome: "Never miss a lead again",
    title: "Your Business, Always Available",
    body: "We deploy AI voice agents that answer calls, respond to messages, and follow up with prospects automatically — at any hour, any day. Your customers always get a response.",
    footer: "Powered by AI voice & messaging technology",
    color: "var(--blue)",
  },
  {
    outcome: "Stop losing time on manual work",
    title: "Your Repetitive Tasks, Automated",
    body: "Data entry, report generation, email sequences, appointment reminders, tax processing, invoice tracking — we identify what's eating your team's time and automate it completely.",
    footer: "Built on advanced workflow automation",
    color: "var(--gold)",
  },
  {
    outcome: "Turn more leads into clients",
    title: "Your Sales System, on Autopilot",
    body: "A complete system that captures leads, nurtures them with the right message at the right time, follows up relentlessly, and books appointments — without you lifting a finger.",
    footer: "CRM + automation + AI, fully integrated",
    color: "var(--gold)",
  },
  {
    outcome: "Know your business in real time",
    title: "Your Data, Working for You",
    body: "Dashboards, reports, and insights that update automatically. No more waiting for someone to compile a spreadsheet — your numbers are always ready when you need them.",
    footer: "Automated reporting & business intelligence",
    color: "var(--blue)",
  },
  {
    outcome: "Grow without growing your payroll",
    title: "Scale Your Operations Instantly",
    body: "Handle double the volume with the same team. The systems we build grow with your business — serving 10 clients or 1,000 costs you the same.",
    footer: "AI-powered operational infrastructure",
    color: "var(--gold)",
  },
];

export default function Solutions() {
  return (
    <section
      id="solutions"
      className="section-wrap"
      style={{ background: "var(--bg)" }}
    >
      <div className="section-inner">
        <SectionReveal>
          <div className="slabel">What We Build For You</div>
          <h2
            className="section-title"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
          >
            Not Tools.{" "}
            <em style={{ fontStyle: "italic", color: "#B4945D" }}>
              Results.
            </em>
          </h2>
          <p className="section-desc">
            You don&apos;t need to know how any of this works. You just need to know what it
            does for your business.
          </p>
        </SectionReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {solutions.map((sol, i) => (
            <SectionReveal key={i} delay={i * 0.08}>
              <SpotlightCard
                spotlightColor={`${sol.color}22`}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: "32px 28px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                  boxShadow: "0 1px 4px rgba(15,34,64,0.04)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(180,148,93,0.35)";
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = "0 8px 32px rgba(15,34,64,0.1)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "0 1px 4px rgba(15,34,64,0.04)";
                }}
              >
                {/* Outcome badge */}
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: sol.color,
                    marginBottom: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: sol.color,
                      flexShrink: 0,
                    }}
                  />
                  {sol.outcome}
                </div>

                <h3
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    lineHeight: 1.35,
                    marginBottom: 14,
                    color: "var(--text)",
                  }}
                >
                  {sol.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.72,
                    flexGrow: 1,
                    marginBottom: 20,
                  }}
                >
                  {sol.body}
                </p>

                <div
                  style={{
                    paddingTop: 16,
                    borderTop: "1px solid var(--border)",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    color: "var(--text-dim)",
                    textTransform: "uppercase",
                  }}
                >
                  {sol.footer}
                </div>
              </SpotlightCard>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
