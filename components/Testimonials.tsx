"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionReveal from "./SectionReveal";

const testimonials = [
  {
    name: "Jesús Martínez",
    role: "Insurance Agency Owner",
    photo: "https://assets.cdn.filesafe.space/0EgKTcd9YvsDKkQqklPo/media/693c4c63078883d9c5ac7d06.jpeg",
    quote:
      "Since we set up the AI voice agent, we haven't missed a single lead. It answers every call, qualifies the client, and books the appointment — even at 11pm. Our close rate went up 40% in the first two months.",
    result: "+40% close rate",
  },
  {
    name: "Joshua Plaza",
    role: "Barbershop Owner",
    photo: "https://assets.cdn.filesafe.space/0EgKTcd9YvsDKkQqklPo/media/693ca110cfdc2f1c3a6253b3.jpeg",
    quote:
      "I used to spend 2 hours a day just confirming appointments and chasing no-shows. Now the system handles it all automatically. My chair is full every day and I didn't hire anyone.",
    result: "2 hrs/day saved",
  },
  {
    name: "Berta Viloria",
    role: "Accountant & Tax Advisor",
    photo: "https://assets.cdn.filesafe.space/0EgKTcd9YvsDKkQqklPo/media/693c4c9fe91800719e64f8d4.jpeg",
    quote:
      "Tax season used to be chaos. Now document collection, client reminders, and follow-ups all happen automatically. I handled 30% more clients this year with the same staff. That's pure profit.",
    result: "+30% clients served",
  },
  {
    name: "Pedro Rivera",
    role: "CabinetWorkx — Contractor",
    photo: "https://assets.cdn.filesafe.space/0EgKTcd9YvsDKkQqklPo/media/693c4cbe8bbf4a4527df2ec0.jpeg",
    quote:
      "I'm always on job sites and can't answer my phone. With the missed-call text-back, every missed call gets a response in seconds. I've recovered deals I would have completely lost before.",
    result: "Never miss a lead",
  },
  {
    name: "Kerwin Iglesias",
    role: "Insurance Agency Owner",
    photo: "https://assets.cdn.filesafe.space/0EgKTcd9YvsDKkQqklPo/media/693c4d003165d977033d76e4.jpeg",
    quote:
      "I was skeptical at first. But within 30 days, the system had already recovered $4,200 in policies from dormant leads we thought were dead. The ROI was obvious in the first month.",
    result: "$4,200 recovered",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (idx: number) => {
      setDirection(idx > current ? 1 : -1);
      setCurrent(idx);
    },
    [current]
  );

  const next = useCallback(() => {
    goTo((current + 1) % testimonials.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <section
      className="section-wrap"
      style={{ background: "var(--bg)", overflow: "hidden" }}
    >
      <div className="section-inner">
        <SectionReveal>
          <div className="slabel">Real Results</div>
          <h2
            className="section-title"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", maxWidth: 600 }}
          >
            What Happens When{" "}
            <em style={{ fontStyle: "italic", color: "#B4945D" }}>
              We Go to Work
            </em>
          </h2>
        </SectionReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: 24,
            marginTop: 16,
          }}
          className="tm-grid"
        >
          {/* Left — Current testimonial */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid var(--border)",
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(15,34,64,0.04), 0 8px 32px rgba(15,34,64,0.07)",
              padding: "44px 40px",
              position: "relative",
              overflow: "hidden",
              minHeight: 360,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: "#B4945D",
              }}
            />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ flex: 1, display: "flex", flexDirection: "column" }}
              >
                {/* Quote mark */}
                <div
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "5rem",
                    lineHeight: 0.8,
                    color: "rgba(180,148,93,0.2)",
                    marginBottom: 16,
                  }}
                >
                  &ldquo;
                </div>

                <p
                  style={{
                    fontSize: "1.02rem",
                    color: "var(--text)",
                    lineHeight: 1.78,
                    fontStyle: "italic",
                    fontWeight: 400,
                    flex: 1,
                    marginBottom: 28,
                  }}
                >
                  {t.quote}
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      overflow: "hidden",
                      flexShrink: 0,
                      border: "2px solid var(--border2)",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={t.photo}
                      alt={t.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        color: "var(--text)",
                      }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.62rem",
                        letterSpacing: "0.08em",
                        color: "var(--text-dim)",
                        marginTop: 2,
                      }}
                    >
                      {t.role}
                    </div>
                  </div>
                  <div
                    style={{
                      marginLeft: "auto",
                      padding: "5px 12px",
                      background: "var(--green-dim)",
                      border: "1px solid rgba(0,168,84,0.2)",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      color: "var(--green)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t.result}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots + arrows */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 28,
                paddingTop: 20,
                borderTop: "1px solid var(--border)",
              }}
            >
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    width: i === current ? 24 : 8,
                    height: 4,
                    border: "none",
                    cursor: "pointer",
                    background: i === current ? "#B4945D" : "var(--border2)",
                    transition: "all 0.3s",
                    padding: 0,
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
              <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                <button
                  onClick={() =>
                    goTo((current - 1 + testimonials.length) % testimonials.length)
                  }
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid var(--border2)",
                    borderRadius: 6,
                    width: 32,
                    height: 32,
                    cursor: "pointer",
                    color: "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                  aria-label="Previous"
                >
                  ←
                </button>
                <button
                  onClick={next}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid var(--border2)",
                    borderRadius: 6,
                    width: 32,
                    height: 32,
                    cursor: "pointer",
                    color: "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                  aria-label="Next"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Right — Thumbnail list */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: 24 }}
          >
            {testimonials.map((tm, i) => (
              <motion.button
                key={i}
                onClick={() => goTo(i)}
                whileHover={{ x: 4 }}
                style={{
                  background: i === current ? "rgba(180,148,93,0.08)" : "#FFFFFF",
                  border:
                    i === current
                      ? "1px solid rgba(180,148,93,0.25)"
                      : "1px solid var(--border)",
                  borderRadius: 8,
                  padding: "16px 20px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  textAlign: "left",
                  transition: "background 0.2s",
                  position: "relative",
                }}
              >
                {i === current && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 3,
                      background: "#B4945D",
                    }}
                  />
                )}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    overflow: "hidden",
                    flexShrink: 0,
                    position: "relative",
                    opacity: i === current ? 1 : 0.6,
                  }}
                >
                  <Image
                    src={tm.photo}
                    alt={tm.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      color: i === current ? "var(--text)" : "var(--text-muted)",
                      marginBottom: 2,
                    }}
                  >
                    {tm.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.08em",
                      color: "var(--text-dim)",
                    }}
                  >
                    {tm.role}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.08em",
                    color: "var(--green)",
                    flexShrink: 0,
                  }}
                >
                  {tm.result}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .tm-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
