"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";

const NAVY = "#0f172a";
const BLUE = "#2563eb";
const GREY = "#64748b";

export default function FintechExperience({ data }) {
  const list = data?.experience || [];
  if (!list.length) return null;

  const [active, setActive] = useState(0);
  const job = list[active];

  const role     = job?.role     || job?.title    || job?.position   || "";
  const company  = job?.company  || job?.employer || job?.organization || "";
  const period   = job?.period   || job?.duration || job?.years      || "";
  const location = job?.location || "";

  const rawBullets =
    Array.isArray(job?.highlights)       ? job.highlights :
    Array.isArray(job?.responsibilities) ? job.responsibilities :
    Array.isArray(job?.bullets)          ? job.bullets : [];
  const bullets = rawBullets.filter(Boolean);

  const stack =
    Array.isArray(job?.stack)        ? job.stack :
    Array.isArray(job?.tags)         ? job.tags :
    Array.isArray(job?.technologies) ? job.technologies :
    [];

  return (
    <section id="experience" style={{ background: "#ffffff", borderTop: "1px solid #e2e8f0" }}>
      <style>{`
        @media (max-width: 767px) {
          .ft-exp-inner { padding: 4rem 1.25rem !important; }
          .ft-exp-layout { grid-template-columns: 1fr !important; }
          .ft-exp-sidebar { border-right: none !important; border-bottom: 1px solid #e2e8f0 !important; display: flex !important; overflow-x: auto !important; }
          .ft-exp-sidebar button { flex-shrink: 0 !important; border-bottom: none !important; border-right: 1px solid #e2e8f0 !important; min-width: 140px !important; }
          .ft-exp-detail { padding: 1.5rem !important; }
        }
      `}</style>
      <div className="ft-exp-inner" style={{ maxWidth: "1280px", margin: "0 auto", padding: "7rem 2.5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "4rem" }}
        >
          <span style={{ fontSize: "11px", fontWeight: 800, color: BLUE, textTransform: "uppercase", letterSpacing: "0.2em" }}>03</span>
          <div style={{ width: "40px", height: "2px", background: BLUE }} />
          <span style={{ fontSize: "11px", fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.18em" }}>Experience</span>
        </motion.div>

        <div className="ft-exp-layout" style={{ display: "grid", gridTemplateColumns: "300px 1fr", border: "1px solid #e2e8f0", background: "#f8fafc" }}>
          {/* Left: company list */}
          <div className="ft-exp-sidebar" style={{ borderRight: "1px solid #e2e8f0" }}>
            {list.map((j, i) => {
              const jCompany = j?.company || j?.employer || j?.organization || "";
              const jPeriod  = j?.period  || j?.duration || j?.years || "";
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    display: "block", width: "100%", textAlign: "left",
                    background: active === i ? "#ffffff" : "transparent",
                    border: "none",
                    borderLeft: active === i ? `3px solid ${BLUE}` : "3px solid transparent",
                    borderBottom: "1px solid #e2e8f0",
                    padding: "1.4rem 1.8rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div style={{ fontSize: "13px", fontWeight: 700, color: active === i ? NAVY : GREY, marginBottom: "3px", transition: "color 0.2s" }}>
                    {jCompany}
                  </div>
                  <div style={{ fontSize: "11px", fontWeight: 500, color: active === i ? BLUE : "#94a3b8", transition: "color 0.2s" }}>
                    {jPeriod}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              className="ft-exp-detail"
              style={{ padding: "2.5rem 3rem", background: "#ffffff" }}
            >
              {/* Role */}
              <div style={{ fontSize: "11px", fontWeight: 700, color: BLUE, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: "0.4rem" }}>
                {role}
              </div>

              {/* Company */}
              <h3 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", fontWeight: 900, color: NAVY, letterSpacing: "-0.03em", margin: "0 0 0.75rem" }}>
                {company}
              </h3>

              {/* Meta: period + location */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center", marginBottom: "1.5rem" }}>
                {period && (
                  <span style={{
                    fontSize: "11px", fontWeight: 700, color: GREY,
                    textTransform: "uppercase", letterSpacing: "0.12em",
                    background: "#f1f5f9", padding: "4px 10px",
                  }}>
                    {period}
                  </span>
                )}
                {location && (
                  <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: GREY }}>
                    <FaMapMarkerAlt size={10} /> {location}
                  </span>
                )}
              </div>

              <div style={{ width: "32px", height: "2px", background: BLUE, marginBottom: "1.8rem" }} />

              {/* Description */}
              {job?.description && (
                <p style={{ fontSize: "14px", color: GREY, lineHeight: 1.75, fontWeight: 400, marginBottom: "1.5rem" }}>
                  {job.description}
                </p>
              )}

              {/* Bullet points */}
              {bullets.length > 0 && (
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                  {bullets.map((b, j) => (
                    <li key={j} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: BLUE, flexShrink: 0, marginTop: "7px" }} />
                      <span style={{ fontSize: "14px", color: GREY, lineHeight: 1.75, fontWeight: 400 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Tech stack */}
              {stack.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", paddingTop: "1.25rem", borderTop: "1px solid #f1f5f9" }}>
                  {stack.filter(Boolean).map((tech, j) => {
                    const label = typeof tech === "string" ? tech : tech?.name || String(tech);
                    return (
                      <span key={j} style={{
                        fontSize: "10px", fontWeight: 600, textTransform: "uppercase",
                        letterSpacing: "0.08em", color: BLUE,
                        background: "rgba(37,99,235,0.06)",
                        border: "1px solid rgba(37,99,235,0.15)",
                        padding: "3px 10px",
                      }}>
                        {label}
                      </span>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
