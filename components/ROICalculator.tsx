"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import SectionReveal from "./SectionReveal";

const BOOKING_URL =
  "https://link.latinprimesystems.com/widget/bookings/latin-prime-demo";

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 80, damping: 20 });
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    if (isInView) motionVal.set(value);
  }, [value, isInView, motionVal]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) {
        const formatted =
          value >= 1000
            ? Math.round(v).toLocaleString("en-US")
            : Math.round(v).toString();
        ref.current.textContent = `${prefix}${formatted}${suffix}`;
      }
    });
  }, [spring, prefix, suffix, value]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

export default function ROICalculator() {
  const [calls, setCalls] = useState(20);
  const [avgValue, setAvgValue] = useState(500);
  const [closeRate, setCloseRate] = useState(20);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [plan, setPlan] = useState(497);

  const missedLeadsMonthly = calls * 4;
  const recoveredClients = Math.round(missedLeadsMonthly * (closeRate / 100));
  const revenueRecovered = recoveredClients * avgValue;
  const hoursSaved = hoursPerWeek * 4;
  const timeSaved = hoursSaved * hourlyRate;
  const totalROI = revenueRecovered + timeSaved;
  const roi = totalROI - plan;
  const roiMultiple = roi > 0 ? (roi / plan).toFixed(1) : "0";

  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        background: "var(--surface)",
        position: "relative",
        overflow: "hidden",
        padding: "120px 0",
      }}
    >
      {/* Animated grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(26,127,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(26,127,212,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(2,5,8,0) 0%, var(--surface) 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-inner" style={{ position: "relative", zIndex: 1 }}>
        <SectionReveal>
          <div className="slabel">ROI Calculator</div>
          <h2
            className="section-title"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", maxWidth: 600 }}
          >
            How Much Is{" "}
            <em
              style={{
                fontStyle: "italic",
                background: "linear-gradient(135deg, var(--blue), var(--gold))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Doing Nothing Costing You?
            </em>
          </h2>
          <p className="section-desc">
            Adjust the sliders to match your business. See exactly what automation
            is worth for your specific situation.
          </p>
        </SectionReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 2,
            alignItems: "start",
          }}
          className="roi-grid"
        >
          {/* Left — Sliders */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              padding: "40px 36px",
            }}
          >
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: 32,
              }}
            >
              Your Business Numbers
            </div>

            <SliderInput
              label="Missed calls / week"
              value={calls}
              min={1}
              max={100}
              step={1}
              onChange={setCalls}
              display={`${calls} calls`}
              tooltip="How many calls go unanswered in a typical week"
            />
            <SliderInput
              label="Average client value"
              value={avgValue}
              min={100}
              max={10000}
              step={100}
              onChange={setAvgValue}
              display={`$${avgValue.toLocaleString()}`}
              tooltip="What a single new client is worth to your business"
            />
            <SliderInput
              label="Your estimated close rate"
              value={closeRate}
              min={5}
              max={80}
              step={5}
              onChange={setCloseRate}
              display={`${closeRate}%`}
              tooltip="Percentage of qualified leads you typically close"
            />
            <SliderInput
              label="Hours/week on manual admin"
              value={hoursPerWeek}
              min={1}
              max={40}
              step={1}
              onChange={setHoursPerWeek}
              display={`${hoursPerWeek} hrs`}
              tooltip="Time spent on follow-ups, data entry, scheduling, reports"
            />
            <SliderInput
              label="Your time value"
              value={hourlyRate}
              min={25}
              max={500}
              step={25}
              onChange={setHourlyRate}
              display={`$${hourlyRate}/hr`}
              tooltip="What an hour of your time is worth to the business"
            />

            <div
              style={{
                borderTop: "1px solid var(--border)",
                paddingTop: 24,
                marginTop: 8,
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text-dim)",
                  marginBottom: 12,
                }}
              >
                Compare against plan
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  { label: "Starter", val: 497 },
                  { label: "Pro", val: 997 },
                  { label: "Growth", val: 1497 },
                ].map((p) => (
                  <button
                    key={p.val}
                    onClick={() => setPlan(p.val)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background: plan === p.val ? "var(--blue)" : "var(--surface)",
                      border: `1px solid ${plan === p.val ? "var(--blue)" : "var(--border2)"}`,
                      color: plan === p.val ? "white" : "var(--text-muted)",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {p.label} ${p.val}/mo
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Results */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {/* Main ROI card */}
            <div
              style={{
                background: "rgba(26,127,212,0.06)",
                border: "1px solid rgba(26,127,212,0.2)",
                padding: "36px 32px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: "linear-gradient(90deg, var(--blue), var(--gold))",
                }}
              />
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--blue)",
                  marginBottom: 12,
                }}
              >
                Monthly Value of Automation
              </div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(2.5rem, 4vw, 3.8rem)",
                  letterSpacing: "-0.04em",
                  background: "linear-gradient(135deg, var(--blue), var(--gold))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                <AnimatedNumber value={totalROI} prefix="$" />
              </div>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.62rem",
                  letterSpacing: "0.1em",
                  color: "var(--text-dim)",
                  marginBottom: 20,
                }}
              >
                per month in recovered revenue + time saved
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 16px",
                  background: roi > 0 ? "var(--green-dim)" : "rgba(229,85,85,0.08)",
                  border: `1px solid ${roi > 0 ? "rgba(0,229,122,0.2)" : "rgba(229,85,85,0.2)"}`,
                }}
              >
                <span style={{ fontSize: "1rem" }}>{roi > 0 ? "🚀" : "📊"}</span>
                <div>
                  <div
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 800,
                      fontSize: "0.9rem",
                      color: roi > 0 ? "var(--green)" : "var(--text-muted)",
                    }}
                  >
                    {roi > 0 ? `${roiMultiple}x ROI` : "Investing in growth"}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.58rem",
                      letterSpacing: "0.08em",
                      color: "var(--text-dim)",
                    }}
                  >
                    {roi > 0
                      ? `$${roi.toLocaleString()}/mo net above plan cost`
                      : "ROI builds as your volume grows"}
                  </div>
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div
              style={{
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                padding: "28px 32px",
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--text-dim)",
                  marginBottom: 20,
                }}
              >
                Breakdown
              </div>

              {[
                {
                  label: "Revenue from recovered leads",
                  value: revenueRecovered,
                  sub: `${recoveredClients} new clients/mo × $${avgValue.toLocaleString()}`,
                  color: "var(--blue)",
                },
                {
                  label: "Time saved on admin",
                  value: timeSaved,
                  sub: `${hoursSaved} hrs/mo × $${hourlyRate}/hr`,
                  color: "var(--gold)",
                },
                {
                  label: "Plan cost",
                  value: -plan,
                  sub: `${plan === 497 ? "Starter" : plan === 997 ? "Pro" : "Growth"} plan`,
                  color: "var(--text-dim)",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: 14,
                    marginBottom: 14,
                    borderBottom: i < 2 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "0.83rem",
                        color: "var(--text-muted)",
                        marginBottom: 2,
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.58rem",
                        letterSpacing: "0.06em",
                        color: "var(--text-dim)",
                      }}
                    >
                      {item.sub}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 800,
                      fontSize: "1.05rem",
                      color: item.value < 0 ? "var(--text-dim)" : item.color,
                    }}
                  >
                    {item.value < 0 ? "-" : "+"}$
                    {Math.abs(item.value).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              style={{
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                padding: "24px 32px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  marginBottom: 14,
                  lineHeight: 1.6,
                }}
              >
                These are conservative estimates. Most clients exceed these numbers within 60 days.
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  padding: "14px",
                  background: "var(--blue)",
                  color: "white",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#2290e8";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 10px 30px rgba(26,127,212,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--blue)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                Get My Custom ROI Plan →
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .roi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function SliderInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
  tooltip,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
  tooltip: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 28 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <label
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.62rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text-dim)",
          }}
          title={tooltip}
        >
          {label}
        </label>
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: "0.95rem",
            color: "var(--text)",
            minWidth: 80,
            textAlign: "right",
          }}
        >
          {display}
        </span>
      </div>
      <div style={{ position: "relative" }}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            width: "100%",
            appearance: "none",
            height: 4,
            background: `linear-gradient(to right, var(--blue) ${pct}%, var(--border2) ${pct}%)`,
            outline: "none",
            cursor: "pointer",
          }}
        />
      </div>
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--blue);
          cursor: pointer;
          border: 2px solid var(--bg);
          box-shadow: 0 0 0 2px var(--blue);
          transition: transform 0.2s;
        }
        input[type=range]::-webkit-slider-thumb:hover {
          transform: scale(1.25);
        }
        input[type=range]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--blue);
          cursor: pointer;
          border: 2px solid var(--bg);
        }
      `}</style>
    </div>
  );
}
