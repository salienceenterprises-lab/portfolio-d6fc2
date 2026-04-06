"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaMapMarkerAlt } from "react-icons/fa";

const NAVY = "#0f172a";
const BLUE = "#2563eb";
const GREY = "#64748b";

export default function FintechEducation({ data }) {
  const list = data?.education || [];
  if (!list.length) return null;

  return (
    <section id="education" style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
      <style>{`
        @media (max-width: 767px) {
          .ft-edu-inner { padding: 4rem 1.25rem !important; }
          .ft-edu-row { grid-template-columns: 1fr !important; }
          .ft-edu-badge { margin-top: 0 !important; }
        }
      `}</style>
      <div className="ft-edu-inner" style={{ maxWidth: "1280px", margin: "0 auto", padding: "7rem 2.5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "4rem" }}
        >
          <span style={{ fontSize: "11px", fontWeight: 800, color: BLUE, textTransform: "uppercase", letterSpacing: "0.2em" }}>02</span>
          <div style={{ width: "40px", height: "2px", background: BLUE }} />
          <span style={{ fontSize: "11px", fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.18em" }}>Education</span>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {list.map((edu, i) => {
            const degree      = edu.degree || edu.field || edu.qualification || edu.title || "";
            const institution = edu.institution || edu.school || edu.university || "";
            const period      = edu.period || edu.duration || edu.years || edu.year || "";
            const location    = edu.location || "";
            const grade       = edu.grade || edu.gpa || edu.result || "";
            const description = edu.description || "";
            const achievements = Array.isArray(edu.achievements) ? edu.achievements.filter(Boolean) : [];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="ft-edu-row"
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderLeft: `4px solid ${BLUE}`,
                  padding: "2rem 2.5rem",
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "2rem",
                  alignItems: "start",
                  boxShadow: "0 1px 8px rgba(15,23,42,0.04)",
                  transition: "box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,99,235,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 8px rgba(15,23,42,0.04)"; }}
              >
                <div>
                  {/* Degree */}
                  <h3 style={{ fontSize: "18px", fontWeight: 800, color: NAVY, letterSpacing: "-0.02em", margin: "0 0 6px" }}>
                    {degree}
                  </h3>

                  {/* Institution */}
                  {institution && (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 600, color: BLUE, marginBottom: "0.5rem" }}>
                      <FaGraduationCap size={12} />
                      {institution}
                    </div>
                  )}

                  {/* Location */}
                  {location && (
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: GREY, marginBottom: "0.5rem" }}>
                      <FaMapMarkerAlt size={10} />
                      {location}
                    </div>
                  )}

                  {/* Grade */}
                  {grade && (
                    <div style={{ fontSize: "11px", fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.8rem" }}>
                      {grade}
                    </div>
                  )}

                  {/* Description */}
                  {description && (
                    <p style={{ fontSize: "13.5px", color: GREY, lineHeight: 1.7, margin: "0 0 1rem", fontWeight: 400 }}>
                      {description}
                    </p>
                  )}

                  {/* Achievements */}
                  {achievements.length > 0 && (
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {achievements.map((a, j) => (
                        <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: GREY, lineHeight: 1.6 }}>
                          <span style={{
                            width: "5px", height: "5px",
                            background: BLUE, borderRadius: "50%",
                            flexShrink: 0, marginTop: "6px",
                          }} />
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Period badge */}
                {period && (
                  <div className="ft-edu-badge" style={{
                    fontSize: "11px", fontWeight: 700,
                    color: GREY, whiteSpace: "nowrap",
                    textTransform: "uppercase", letterSpacing: "0.12em",
                    background: "#f1f5f9",
                    padding: "5px 12px",
                    height: "fit-content",
                  }}>
                    {period}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
