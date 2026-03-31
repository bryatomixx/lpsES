"use client";
import { useState } from "react";
import SectionReveal from "./SectionReveal";

const WEBHOOK_URL =
  "https://latinprimesystems.app.n8n.cloud/webhook/05355d0d-cce9-4f2a-94a4-174498a2b75e";

const businessTypes = [
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

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus("sending");

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          business_type: form.type,
          message: form.message,
          source: "latinprimesystems.com",
          submitted_at: new Date().toISOString(),
        }),
      });
      setStatus("success");
      setForm({ name: "", email: "", type: "", message: "" });
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section
      id="contact"
      className="section-wrap"
      style={{ background: "var(--surface)" }}
    >
      <div className="section-inner">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: 60,
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Left */}
          <SectionReveal>
            <div className="slabel">Get in Touch</div>
            <h2
              className="section-title"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", marginBottom: 16 }}
            >
              Let&apos;s Build Your{" "}
              <em
                style={{
                  fontStyle: "italic",
                  background: "linear-gradient(135deg, var(--blue), var(--gold))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                AI System
              </em>
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-muted)",
                lineHeight: 1.75,
                marginBottom: 40,
              }}
            >
              Tell us about your business. We&apos;ll get back to you within 24 hours
              with a custom automation plan — no sales pitch, just a real strategy
              for your specific situation.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: "1.2rem" }}>✉️</span>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.72rem",
                    letterSpacing: "0.08em",
                    color: "var(--text-muted)",
                  }}
                >
                  contact@latinprimesystems.com
                </span>
              </div>
              <a
                href="https://wa.me/19714006390"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 20px",
                  background: "#25D366",
                  color: "white",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  alignSelf: "flex-start",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#1ebe5a";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#25D366";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Message us on WhatsApp
              </a>
            </div>
          </SectionReveal>

          {/* Right — Form */}
          <SectionReveal delay={0.15}>
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  background: "var(--surface2)",
                  border: "1px solid var(--border)",
                  padding: "40px 36px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                    marginBottom: 16,
                  }}
                  className="form-row"
                >
                  <FormField
                    label="Your name"
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    required
                  />
                  <FormField
                    label="Your email"
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    required
                  />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label
                    htmlFor="type"
                    style={{
                      display: "block",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.62rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--text-dim)",
                      marginBottom: 8,
                    }}
                  >
                    Business type
                  </label>
                  <select
                    id="type"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    style={{
                      width: "100%",
                      background: "var(--surface)",
                      border: "1px solid var(--border2)",
                      color: form.type ? "var(--text)" : "var(--text-dim)",
                      padding: "12px 16px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.88rem",
                      outline: "none",
                      appearance: "none",
                    }}
                  >
                    <option value="">Select your industry</option>
                    {businessTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label
                    htmlFor="message"
                    style={{
                      display: "block",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.62rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--text-dim)",
                      marginBottom: 8,
                    }}
                  >
                    What&apos;s your biggest challenge?
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your biggest operational bottleneck or what's holding you back from growing..."
                    style={{
                      width: "100%",
                      background: "var(--surface)",
                      border: "1px solid var(--border2)",
                      color: "var(--text)",
                      padding: "12px 16px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.88rem",
                      resize: "vertical",
                      outline: "none",
                      lineHeight: 1.65,
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending" || status === "success"}
                  style={{
                    width: "100%",
                    padding: "15px",
                    background:
                      status === "success"
                        ? "linear-gradient(135deg, #00a854, #007a3d)"
                        : status === "error"
                        ? "linear-gradient(135deg, #c0392b, #922b21)"
                        : "var(--blue)",
                    color: "white",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    border: "none",
                    cursor:
                      status === "sending" || status === "success" ? "not-allowed" : "pointer",
                    transition: "all 0.25s",
                    opacity: status === "sending" ? 0.7 : 1,
                  }}
                >
                  {status === "idle" && "Send — We respond within 24 hours"}
                  {status === "sending" && "Sending..."}
                  {status === "success" && "✓ Sent — We will be in touch soon"}
                  {status === "error" && "Error — Please try again"}
                </button>
              </div>
            </form>
          </SectionReveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function FormField({
  label,
  id,
  type,
  value,
  onChange,
  required,
}: {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.62rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--text-dim)",
          marginBottom: 8,
        }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          background: "var(--surface)",
          border: "1px solid var(--border2)",
          color: "var(--text)",
          padding: "12px 16px",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.88rem",
          outline: "none",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(26,127,212,0.5)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border2)")}
      />
    </div>
  );
}
