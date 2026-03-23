"use client";
import Image from "next/image";
import SectionReveal from "./SectionReveal";

const row1 = [
  { src: "https://cdn.brandfetch.io/domain/gohighlevel.com/w/279/h/63/theme/light/logo?c=1idTXJGonJnc4B8xS2u", alt: "GoHighLevel", w: 120 },
  { src: "https://cdn.brandfetch.io/domain/n8n.io/w/458/h/124/theme/light/logo?c=1idTXJGonJnc4B8xS2u", alt: "n8n", w: 80 },
  { src: "https://cdn.brandfetch.io/domain/vapi.ai/w/400/h/400?c=1idTXJGonJnc4B8xS2u", alt: "VAPI", w: 44 },
  { text: "ElevenLabs" },
  { src: "https://cdn.brandfetch.io/domain/heygen.com/w/264/h/264/theme/light/symbol?c=1idTXJGonJnc4B8xS2u", alt: "HeyGen", w: 44 },
  { src: "https://cdn.brandfetch.io/domain/openai.com/w/800/h/695/theme/light/logo?c=1idTXJGonJnc4B8xS2u", alt: "OpenAI", w: 100 },
  { src: "https://cdn.brandfetch.io/domain/anthropic.com/w/800/h/90/theme/light/logo?c=1idTXJGonJnc4B8xS2u", alt: "Anthropic", w: 130 },
  { src: "https://cdn.brandfetch.io/domain/twilio.com/w/800/h/240/theme/light/logo?c=1idTXJGonJnc4B8xS2u", alt: "Twilio", w: 100 },
  { src: "https://cdn.brandfetch.io/domain/zapier.com/w/800/h/218/theme/light/logo?c=1idTXJGonJnc4B8xS2u", alt: "Zapier", w: 100 },
  { src: "https://cdn.brandfetch.io/domain/make.com/w/800/h/165/theme/light/logo?c=1idTXJGonJnc4B8xS2u", alt: "Make", w: 90 },
  { src: "https://cdn.brandfetch.io/domain/airtable.com/w/800/h/174/theme/light/logo?c=1idTXJGonJnc4B8xS2u", alt: "Airtable", w: 110 },
];

const row2 = [
  { src: "https://cdn.brandfetch.io/domain/stripe.com/w/800/h/380/theme/light/logo?c=1idTXJGonJnc4B8xS2u", alt: "Stripe", w: 90 },
  { src: "https://cdn.brandfetch.io/domain/google.meet/w/820/h/105/logo?c=1idTXJGonJnc4B8xS2u", alt: "Google Workspace", w: 160 },
  { src: "https://cdn.brandfetch.io/domain/whatsapp.com/w/800/h/186/theme/light/logo?c=1idTXJGonJnc4B8xS2u", alt: "WhatsApp", w: 110 },
  { src: "https://cdn.brandfetch.io/domain/facebook.com/w/2084/h/2084/theme/light/logo?c=1idTXJGonJnc4B8xS2u", alt: "Facebook", w: 40 },
  { src: "https://cdn.brandfetch.io/domain/slack.com/w/1600/h/572/theme/light/logo?c=1idTXJGonJnc4B8xS2u", alt: "Slack", w: 90 },
  { src: "https://cdn.brandfetch.io/domain/hubspot.com/w/800/h/227/theme/light/logo?c=1idTXJGonJnc4B8xS2u", alt: "HubSpot", w: 110 },
  { src: "https://cdn.brandfetch.io/domain/calendly.com/w/800/h/193/theme/light/logo?c=1idTXJGonJnc4B8xS2u", alt: "Calendly", w: 110 },
  { src: "https://cdn.brandfetch.io/domain/notion.so/w/800/h/278/theme/light/logo?c=1idTXJGonJnc4B8xS2u", alt: "Notion", w: 100 },
  { src: "https://cdn.brandfetch.io/domain/monday.com/w/800/h/146/theme/light/logo?c=1idTXJGonJnc4B8xS2u", alt: "Monday.com", w: 130 },
];

type LogoItem = { src?: string; alt?: string; w?: number; text?: string };

function LogoTrack({ items, reverse }: { items: LogoItem[]; reverse?: boolean }) {
  const tripled = [...items, ...items, ...items];
  return (
    <div style={{ overflow: "hidden", marginBottom: 20 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          width: "max-content",
          animation: reverse
            ? "marquee-rev 28s linear infinite"
            : "marquee 28s linear infinite",
        }}
      >
        {tripled.map((item, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 0, flexShrink: 0 }}
          >
            <div
              style={{
                padding: "0 32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.src ? (
                <Image
                  src={item.src}
                  alt={item.alt || ""}
                  width={item.w || 100}
                  height={32}
                  style={{
                    height: 28,
                    width: "auto",
                    maxWidth: item.w,
                    objectFit: "contain",
                    opacity: 0.75,
                    transition: "opacity 0.3s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
                />
              ) : (
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    color: "rgba(255,255,255,0.65)",
                    letterSpacing: "0.02em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.text}
                </span>
              )}
            </div>
            <span
              style={{
                color: "rgba(200,148,26,0.4)",
                fontSize: "0.5rem",
                flexShrink: 0,
              }}
            >
              ◆
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section
      id="stack"
      className="section-wrap"
      style={{ background: "var(--bg)", overflow: "hidden" }}
    >
      <div className="section-inner">
        <SectionReveal>
          <div className="slabel">Under the Hood</div>
          <h2
            className="section-title"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", maxWidth: 640 }}
          >
            The Most Powerful Platforms{" "}
            <em
              style={{
                fontStyle: "italic",
                background: "linear-gradient(135deg, var(--blue), var(--gold))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Working for Your Business
            </em>
          </h2>
          <p className="section-desc">
            Behind every result we deliver is a carefully selected stack of the
            most powerful enterprise platforms available — connected and configured
            by our team so you never have to think about them.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div
            style={{
              textAlign: "center",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.62rem",
              letterSpacing: "0.12em",
              color: "var(--text-dim)",
              textTransform: "uppercase",
              marginBottom: 40,
            }}
          >
            The same platforms used by enterprise companies worldwide — configured for your business
          </div>
        </SectionReveal>
      </div>

      <LogoTrack items={row1} />
      <LogoTrack items={row2} reverse />
    </section>
  );
}
