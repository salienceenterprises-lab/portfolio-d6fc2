"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

const NAVY = "#0f172a";
const BLUE = "#2563eb";
const GREY = "#64748b";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1], delay },
});

export default function FintechAbout({ data }) {
  const skills = data?.skills || [];
  const flatSkills = skills.flatMap?.((s) =>
    typeof s === "object" && s.items ? s.items : [s]
  ) || skills;

  const infoRows = [
    data?.location && { icon: <FaMapMarkerAlt size={13} />, label: "Location", value: data.location, href: null },
    data?.email    && { icon: <FaEnvelope size={13} />,     label: "Email",    value: data.email,    href: `mailto:${data.email}` },
    data?.github   && { icon: <FaGithub size={13} />,       label: "GitHub",   value: "@" + data.github.split("/").pop(), href: data.github },
    data?.linkedin && { icon: <FaLinkedin size={13} />,     label: "LinkedIn", value: "View Profile", href: data.linkedin },
    data?.website  && { icon: <FaGlobe size={13} />,        label: "Website",  value: data.website,  href: data.website },
  ].filter(Boolean);

  return (
    <section id="about" style={{
      background: "#ffffff",
      borderTop: "1px solid #e2e8f0",
      position: "relative",
    }}>
      <style>{`
        @media (max-width: 767px) {
          .ft-about-inner { padding: 4rem 1.25rem !important; }
          .ft-about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
      <div className="ft-about-inner" style={{ maxWidth: "1280px", margin: "0 auto", padding: "7rem 2.5rem" }}>
        {/* Section header */}
        <motion.div {...fadeUp(0)} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "4rem" }}>
          <span style={{ fontSize: "11px", fontWeight: 800, color: BLUE, textTransform: "uppercase", letterSpacing: "0.2em" }}>01</span>
          <div style={{ width: "40px", height: "2px", background: BLUE }} />
          <span style={{ fontSize: "11px", fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.18em" }}>About</span>
        </motion.div>

        <div className="ft-about-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "5rem", alignItems: "start" }}>
          {/* Left: bio + skills */}
          <div>
            <motion.h2 {...fadeUp(0.05)} style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 900, color: NAVY,
              letterSpacing: "-0.03em", lineHeight: 1.1,
              margin: "0 0 2rem",
            }}>
              The Professional<br />
              <span style={{ color: BLUE }}>Behind the Work</span>
            </motion.h2>

            <motion.p {...fadeUp(0.1)} style={{
              fontSize: "15.5px", color: GREY,
              lineHeight: 1.85, margin: "0 0 3rem",
              fontWeight: 400,
            }}>
              {data?.bio || "A results-driven professional at the intersection of business strategy and technology. Committed to delivering measurable impact through analytical rigor and innovative thinking."}
            </motion.p>

            {flatSkills.length > 0 && (
              <motion.div {...fadeUp(0.15)}>
                <div style={{
                  fontSize: "10px", fontWeight: 800, color: GREY,
                  textTransform: "uppercase", letterSpacing: "0.2em",
                  marginBottom: "1rem",
                }}>
                  Core Competencies
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {flatSkills.slice(0, 14).map((skill, i) => {
                    const label = typeof skill === "string" ? skill : skill?.name || String(skill);
                    return (
                      <span key={i} style={{
                        fontSize: "12px", fontWeight: 600,
                        color: NAVY,
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        padding: "5px 14px",
                        letterSpacing: "0.02em",
                        transition: "all 0.2s ease",
                        cursor: "default",
                      }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.color = BLUE; e.currentTarget.style.background = "rgba(37,99,235,0.04)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = NAVY; e.currentTarget.style.background = "#f8fafc"; }}
                      >
                        {label}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: contact card */}
          {infoRows.length > 0 && (
            <motion.div {...fadeUp(0.1)}>
              <div style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                padding: "2.5rem",
                boxShadow: "0 2px 16px rgba(15,23,42,0.04)",
              }}>
                <div style={{
                  fontSize: "10px", fontWeight: 800, color: BLUE,
                  textTransform: "uppercase", letterSpacing: "0.2em",
                  marginBottom: "1.8rem", display: "flex", alignItems: "center", gap: "8px",
                }}>
                  <div style={{ width: "16px", height: "2px", background: BLUE }} />
                  Contact Details
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                  {infoRows.map((row, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: "14px",
                      padding: "13px 0",
                      borderBottom: i < infoRows.length - 1 ? "1px solid #e2e8f0" : "none",
                    }}>
                      <div style={{ color: BLUE, flexShrink: 0 }}>{row.icon}</div>
                      <div>
                        <div style={{ fontSize: "10px", fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "2px" }}>
                          {row.label}
                        </div>
                        {row.href ? (
                          <a href={row.href} target="_blank" rel="noopener noreferrer"
                            style={{ fontSize: "13px", fontWeight: 500, color: NAVY, textDecoration: "none", transition: "color 0.2s" }}
                            onMouseEnter={(e) => e.currentTarget.style.color = BLUE}
                            onMouseLeave={(e) => e.currentTarget.style.color = NAVY}
                          >
                            {row.value}
                          </a>
                        ) : (
                          <span style={{ fontSize: "13px", fontWeight: 500, color: NAVY }}>{row.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
