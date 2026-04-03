"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const beforeItems = [
  { text: "Leads call and ", bold: "nobody answers", after: " — they go to a competitor" },
  { text: "You chase leads ", bold: "manually for days", after: " before giving up" },
  { text: "Your team spends ", bold: "hours entering data", after: " and sending follow-ups" },
  { text: "Reports and updates ", bold: "happen when someone has time", after: "" },
  { text: "You ", bold: "can't grow", after: " without adding more people and cost" },
];

const afterItems = [
  { text: "An AI agent ", bold: "answers every call", after: ", qualifies the lead, books the appointment" },
  { text: "Every lead gets ", bold: "followed up automatically", after: " — within seconds, 24/7" },
  { text: "Data moves, emails send, and tasks execute ", bold: "without anyone touching them", after: "" },
  { text: "Reports and updates ", bold: "generate themselves", after: " — always accurate, always ready" },
  { text: "Your systems ", bold: "scale with you", after: " — more volume, same team" },
];

export default function Compare() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="compare"
      ref={ref}
      className="section-wrap"
      style={{ background: "var(--surface)" }}
    >
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <div className="slabel">The Difference</div>
          <h2
            className="section-title"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", marginBottom: 60 }}
          >
            Before Latin Prime.{" "}
            <em style={{ fontStyle: "italic", color: "#B4945D" }}>After Latin Prime.</em>
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
          className="compare-grid"
        >
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              background: "#FFFFFF",
              border: "1px solid var(--border)",
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(15,34,64,0.04), 0 8px 32px rgba(15,34,64,0.07)",
              padding: "36px 32px",
            }}
          >
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#c0392b",
                marginBottom: 28,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "rgba(192,57,43,0.5)",
                }}
              />
              Without Us
            </div>
            {beforeItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08 }}
                style={{
                  display: "flex",
                  gap: 12,
                  paddingBottom: 18,
                  marginBottom: 18,
                  borderBottom:
                    i < beforeItems.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "rgba(229,85,85,0.5)",
                    flexShrink: 0,
                    marginTop: 7,
                  }}
                />
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.65,
                  }}
                >
                  {item.text}
                  <strong style={{ color: "var(--text)", fontWeight: 600 }}>
                    {item.bold}
                  </strong>
                  {item.after}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(180,148,93,0.2)",
              borderTop: "2px solid #B4945D",
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(15,34,64,0.04), 0 8px 32px rgba(15,34,64,0.07)",
              padding: "36px 32px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#B4945D",
                marginBottom: 28,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#B4945D",
                  animation: "dot-pulse 2s ease-in-out infinite",
                }}
              />
              With Latin Prime Systems
            </div>
            {afterItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08 }}
                style={{
                  display: "flex",
                  gap: 12,
                  paddingBottom: 18,
                  marginBottom: 18,
                  borderBottom:
                    i < afterItems.length - 1 ? "1px solid rgba(180,148,93,0.1)" : "none",
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#B4945D",
                    opacity: 0.7,
                    flexShrink: 0,
                    marginTop: 7,
                  }}
                />
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.65,
                  }}
                >
                  {item.text}
                  <strong style={{ color: "var(--text)", fontWeight: 600 }}>
                    {item.bold}
                  </strong>
                  {item.after}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .compare-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
