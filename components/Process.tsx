"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "We Learn Your Business",
    desc: "We sit down and understand exactly how you operate — where you lose time, where you lose leads, what's holding you back from growing.",
  },
  {
    num: "02",
    title: "We Design Your System",
    desc: "We map out exactly what we're going to build — what gets automated, what gets connected, what you'll be able to do that you can't do today.",
  },
  {
    num: "03",
    title: "We Build & Test It",
    desc: "We build everything and test it thoroughly before you see it. When we hand it over, it works.",
  },
  {
    num: "04",
    title: "You Run Your Business Better",
    desc: "You start seeing results immediately. More leads captured, less time wasted, more money in. We stay by your side as you grow.",
  },
];

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="process"
      ref={ref}
      className="section-wrap"
      style={{ background: "var(--bg)" }}
    >
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <div className="slabel">How It Works</div>
          <h2
            className="section-title"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
          >
            We Handle Everything.{" "}
            <em style={{ fontStyle: "italic", color: "#B4945D" }}>You See Results.</em>
          </h2>
          <p className="section-desc">
            You don&apos;t need to understand the technology. That&apos;s our job.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
            position: "relative",
          }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.12 }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "36px 28px",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 1px 4px rgba(15,34,64,0.03)",
              }}
            >
              {/* Step number — background watermark */}
              <div
                style={{
                  position: "absolute",
                  top: -20,
                  right: -10,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 900,
                  fontSize: "7rem",
                  color: "rgba(15,34,64,0.04)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                {step.num}
              </div>

              {/* Accent bar */}
              <div
                style={{
                  width: 32,
                  height: 3,
                  background: "#B4945D",
                  marginBottom: 20,
                }}
              />

              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.18em",
                  color: "var(--gold)",
                  marginBottom: 12,
                  textTransform: "uppercase",
                }}
              >
                Step {step.num}
              </div>

              <h3
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.15rem",
                  lineHeight: 1.35,
                  marginBottom: 14,
                  color: "var(--text)",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.72,
                }}
              >
                {step.desc}
              </p>

              {/* Connector arrow (except last) */}
              {i < steps.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: -14,
                    transform: "translateY(-50%)",
                    color: "var(--text-dim)",
                    fontSize: "1rem",
                    zIndex: 2,
                  }}
                  className="step-arrow"
                >
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .step-arrow { display: none !important; }
        }
      `}</style>
    </section>
  );
}
