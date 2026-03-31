"use client";
import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const WEBHOOK_URL =
  "https://latinprimesystems.app.n8n.cloud/webhook/05355d0d-cce9-4f2a-94a4-174498a2b75e";

type Status = "idle" | "sending" | "success";

const industries = [
  "Insurance Agency",
  "Real Estate",
  "Dental / Healthcare",
  "Med Spa / Aesthetics",
  "Contractor / Home Services",
  "Tax / Accounting",
  "Restaurant / Local Business",
  "Coach / Consultant",
  "Law Firm",
  "Salon / Barbershop / Spa",
  "Other",
];

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          industry,
          source: "mid-funnel-capture",
          submitted_at: new Date().toISOString(),
        }),
      });
      setStatus("success");
    } catch {
      setStatus("success"); // still show success to not frustrate user
    }
  };

  return (
    <section
      ref={ref}
      style={{
        background: "var(--surface)",
        padding: "0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: "linear-gradient(135deg, rgba(26,127,212,0.08) 0%, rgba(200,148,26,0.06) 100%)",
          border: "1px solid rgba(26,127,212,0.15)",
          borderLeft: "none",
          borderRight: "none",
          padding: "64px 24px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(26,127,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(26,127,212,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 100% at 50% 50%, transparent 30%, var(--surface) 100%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 560,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(0,229,122,0.08)",
              border: "1px solid rgba(0,229,122,0.2)",
              padding: "5px 14px",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--green)",
                animation: "dot-pulse 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--green)",
              }}
            >
              Free — No credit card
            </span>
          </div>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div style={{ fontSize: "3rem", marginBottom: 12 }}>✅</div>
              <h3
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.4rem",
                  marginBottom: 8,
                }}
              >
                You&apos;re in — check your inbox
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Your custom automation plan is being prepared. We&apos;ll reach out within 24 hours.
              </p>
            </motion.div>
          ) : (
            <>
              <h3
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                  lineHeight: 1.2,
                  marginBottom: 10,
                }}
              >
                Get Your Free{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, var(--blue), var(--gold))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Automation Plan
                </span>
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.7,
                  marginBottom: 28,
                }}
              >
                Tell us your name and email. We&apos;ll send you a custom breakdown
                of exactly which automations would have the biggest impact on your
                specific business — no sales call required.
              </p>

              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <input
                  type="text"
                  placeholder="Your first name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    flex: "1 1 160px",
                    maxWidth: 180,
                    background: "var(--surface2)",
                    border: "1px solid var(--border2)",
                    color: "var(--text)",
                    padding: "13px 16px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.88rem",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(26,127,212,0.5)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "var(--border2)")
                  }
                />
                <input
                  type="email"
                  placeholder="Your email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: "2 1 220px",
                    maxWidth: 280,
                    background: "var(--surface2)",
                    border: "1px solid var(--border2)",
                    color: "var(--text)",
                    padding: "13px 16px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.88rem",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(26,127,212,0.5)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "var(--border2)")
                  }
                />
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  style={{
                    flex: "1 1 200px",
                    maxWidth: 240,
                    background: "var(--surface2)",
                    border: "1px solid var(--border2)",
                    color: industry ? "var(--text)" : "var(--text-muted)",
                    padding: "13px 16px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.88rem",
                    outline: "none",
                    cursor: "pointer",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(26,127,212,0.5)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "var(--border2)")
                  }
                >
                  <option value="" disabled>Your industry</option>
                  {industries.map((ind) => (
                    <option key={ind} value={ind} style={{ background: "var(--surface2)", color: "var(--text)" }}>{ind}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    flex: "1 1 180px",
                    padding: "13px 24px",
                    background: "var(--blue)",
                    color: "white",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                    opacity: status === "sending" ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (status !== "sending") {
                      (e.currentTarget as HTMLElement).style.background = "#2290e8";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--blue)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  {status === "sending" ? "Sending..." : "Send My Free Plan →"}
                </button>
              </form>

              <p
                style={{
                  marginTop: 12,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.62rem",
                  letterSpacing: "0.08em",
                  color: "var(--text-muted)",
                }}
              >
                No spam. No sales pressure. Just a real automation strategy for your business.
              </p>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}
