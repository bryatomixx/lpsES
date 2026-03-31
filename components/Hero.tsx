"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import DecryptedText from "./DecryptedText";

const BOOKING_URL =
  "https://link.latinprimesystems.com/widget/bookings/latin-prime-demo";

const tickerItems = [
  "Your phone, answered 24/7",
  "Follow-ups on autopilot",
  "No lead left behind",
  "Reports generated automatically",
  "AI that works while you sleep",
  "More revenue, less manual work",
  "Scale without hiring",
  "Websites that capture & convert",
];

const proofChips = [
  "Calls answered automatically",
  "Leads followed up in seconds",
  "Tasks running while you sleep",
];


export default function Hero() {
  const ref = useRef<HTMLElement>(null);


  return (
    <>
      <section
        id="hero"
        ref={ref}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          paddingTop: 80,
        }}
      >
        {/* Static background glow */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: "65vw",
            height: "65vw",
            maxWidth: 800,
            maxHeight: 800,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(26,127,212,0.14) 0%, transparent 70%)",
            pointerEvents: "none",
            filter: "blur(70px)",
            animation: "glow-pulse 6s ease-in-out infinite",
          }}
        />

        {/* Grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(26,127,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(26,127,212,0.04) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            pointerEvents: "none",
          }}
        />

        {/* Static glow (gold accent) */}
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            right: "2%",
            width: "45vw",
            height: "45vw",
            maxWidth: 600,
            maxHeight: 600,
            background:
              "radial-gradient(circle, rgba(200,148,26,0.10) 0%, transparent 70%)",
            pointerEvents: "none",
            filter: "blur(50px)",
            animation: "glow-pulse 8s ease-in-out infinite 1s",
          }}
        />


        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "60px 24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
          className="hero-grid"
        >
          {/* Left — Copy */}
          <div>
            {/* Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(26,127,212,0.08)",
                border: "1px solid rgba(26,127,212,0.2)",
                padding: "6px 14px",
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--green)",
                  flexShrink: 0,
                  animation: "dot-pulse 2s ease-in-out infinite",
                }}
              />
              <DecryptedText
                text="Done-for-you AI automation for business owners"
                animateOn="view"
                sequential={true}
                speed={30}
                revealDirection="start"
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ01#$%@"
                className="decrypt-revealed"
                encryptedClassName="decrypt-encrypted"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.62rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              />
            </motion.div>

            {/* H1 — character-by-character animation */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              style={{
                fontSize: "clamp(2.8rem, 5.5vw, 4.8rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.035em",
                marginBottom: 28,
                fontWeight: 800,
              }}
            >
              {["Stop Running", "Your Business.", "Start Growing It."].map((line, li) => (
                <motion.span
                  key={li}
                  initial={{ opacity: 0, y: 30, skewX: -5 }}
                  animate={{ opacity: 1, y: 0, skewX: 0 }}
                  transition={{ duration: 0.65, delay: 0.25 + li * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: "block",
                    background: li === 0 ? "none" : li === 1 ? "linear-gradient(135deg, var(--blue), var(--gold))" : "none",
                    WebkitBackgroundClip: li === 1 ? "text" : "unset",
                    WebkitTextFillColor: li === 1 ? "transparent" : "unset",
                    backgroundClip: li === 1 ? "text" : "unset",
                  }}
                >
                  {li === 2 ? (
                    <>
                      Start{" "}
                      <span
                        style={{
                          background: "linear-gradient(135deg, var(--blue), var(--gold))",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        Growing It.
                      </span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              ))}
            </motion.h1>

            {/* Bridge */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              style={{
                fontSize: "1.05rem",
                color: "var(--text-muted)",
                lineHeight: 1.75,
                maxWidth: 480,
                marginBottom: 36,
                fontWeight: 300,
              }}
            >
              We build the AI systems that handle your calls, follow-ups,
              scheduling, and admin — so you stop being the bottleneck in your
              own business.
            </motion.p>

            {/* Proof chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 40 }}
            >
              {proofChips.map((chip, i) => (
                <motion.div
                  key={chip}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "var(--surface)",
                    border: "1px solid var(--border2)",
                    padding: "7px 14px",
                    transition: "border-color 0.3s",
                  }}
                  whileHover={{ borderColor: "rgba(26,127,212,0.4)", scale: 1.02 }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "var(--green)",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.62rem",
                      letterSpacing: "0.1em",
                      color: "var(--text-muted)",
                    }}
                  >
                    {chip}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}
            >
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
                <motion.a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "16px 34px",
                    background: "var(--blue)",
                    color: "white",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    letterSpacing: "0.02em",
                    textDecoration: "none",
                    boxShadow: "0 0 25px rgba(26,127,212,0.3), 0 4px 20px rgba(26,127,212,0.2)",
                    transition: "all 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 45px rgba(26,127,212,0.6), 0 12px 40px rgba(26,127,212,0.35)";
                    (e.currentTarget as HTMLElement).style.background = "var(--blue-bright)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 25px rgba(26,127,212,0.3), 0 4px 20px rgba(26,127,212,0.2)";
                    (e.currentTarget as HTMLElement).style.background = "var(--blue)";
                  }}
                >
                  Show Me My Automation Plan
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.a>
                <motion.a
                  href="#solutions"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "15px 28px",
                    background: "transparent",
                    color: "var(--text)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    border: "1px solid var(--border2)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border2)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  See How It Works
                </motion.a>
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.57rem",
                  letterSpacing: "0.08em",
                  color: "var(--text-dim)",
                }}
              >
                🛡️ 90-Day ROI Guarantee — results or we work free
              </motion.span>
            </motion.div>
          </div>

          {/* Right — Robot */}
          <motion.div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              willChange: "transform",
              padding: "32px 24px 0 0",
            }}
            initial={{ opacity: 0, x: 70, y: 30, rotate: -6, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hero-robot-wrap"
          >
            {/* Glow rings — staggered fade-in after robot arrives */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              style={{
                position: "absolute", width: "85%", height: "85%",
                borderRadius: "50%", border: "1px solid rgba(26,127,212,0.2)",
                pointerEvents: "none", animation: "glow-pulse 4s ease-in-out infinite",
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              style={{
                position: "absolute", width: "100%", height: "100%",
                borderRadius: "50%", border: "1px solid rgba(200,148,26,0.12)",
                pointerEvents: "none", animation: "glow-pulse 4s ease-in-out infinite 0.5s",
              }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              style={{
                position: "absolute",
                width: "65%",
                height: "65%",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(26,127,212,0.15) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />
            <div
              style={{
                position: "relative",
                animation: "float 6s ease-in-out infinite",
              }}
            >
              <Image
                src="https://storage.googleapis.com/msgsndr/0EgKTcd9YvsDKkQqklPo/media/691b4d7d013f3138a3825fc0.webp"
                alt="Latin Prime Systems AI automation assistant — represents 24/7 automated business operations"
                width={520}
                height={520}
                style={{
                  width: "100%",
                  maxWidth: 520,
                  height: "auto",
                  objectFit: "contain",
                  filter: "drop-shadow(0 20px 60px rgba(26,127,212,0.35))",
                }}
                priority
              />
            </div>
          </motion.div>
        </div>


        {/* Bottom fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 140,
            background: "linear-gradient(transparent, var(--bg))",
            pointerEvents: "none",
          }}
        />
      </section>

      {/* Ticker */}
      <div
        style={{
          overflow: "hidden",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
          padding: "14px 0",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 0,
            width: "max-content",
            animation: "ticker-scroll 32s linear infinite",
          }}
        >
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  whiteSpace: "nowrap",
                  padding: "0 20px",
                }}
              >
                {item}
              </span>
              <span style={{ color: "var(--gold)", fontSize: "0.5rem" }}>◆</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding-top: 40px !important;
          }
          .hero-robot-wrap {
            order: -1;
            max-width: 280px;
            margin: 0 auto;
          }
          .scroll-indicator { display: none !important; }
        }
      `}</style>
    </>
  );
}
