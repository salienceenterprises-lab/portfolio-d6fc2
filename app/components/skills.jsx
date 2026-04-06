"use client";
import React from "react";
import { motion } from "framer-motion";

const NAVY = "#0f172a";
const BLUE = "#2563eb";
const GREY = "#64748b";

export default function FintechSkills({ data }) {
  const skills = data?.skills || [];
  if (!skills.length) return null;

  const groups = (() => {
    if (typeof skills[0] === "object" && skills[0] !== null && (skills[0].items || skills[0].category || skills[0].skills)) {
      return skills.map((g) => ({
        category: g.category || g.name || "Skills",
        items: Array.isArray(g.items) ? g.items : Array.isArray(g.skills) ? g.skills : [],
      })).filter((g) => g.items.length > 0);
    }
    return [{ category: "Technical Skills", items: skills }];
  })();

  const totalSkills = groups.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <section id="skills" style={{ background: "#ffffff", borderTop: "1px solid #e2e8f0" }}>
      <style>{`
        @media (max-width: 767px) {
          .ft-skills-inner { padding: 4rem 1.25rem !important; }
          .ft-skills-row { grid-template-columns: 1fr !important; gap: 1rem !important; padding: 1.5rem 0 !important; }
          .ft-skills-label { padding-top: 0 !important; }
        }
      `}</style>
      <div className="ft-skills-inner" style={{ maxWidth: "1280px", margin: "0 auto", padding: "7rem 2.5rem" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "3.5rem", flexWrap: "wrap", gap: "1rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "11px", fontWeight: 800, color: BLUE, textTransform: "uppercase", letterSpacing: "0.2em" }}>05</span>
            <div style={{ width: "40px", height: "2px", background: BLUE }} />
            <span style={{ fontSize: "11px", fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.18em" }}>Skills</span>
          </div>
          <span style={{ fontSize: "12px", color: GREY }}>
            {totalSkills} skill{totalSkills !== 1 ? "s" : ""}
          </span>
        </motion.div>

        {/* Row-based layout */}
        <div style={{ borderTop: "1px solid #e2e8f0" }}>
          {groups.map((group, gi) => (
            <motion.div
              key={gi}
              className="ft-skills-row"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.06 }}
              style={{
                display: "grid",
                gridTemplateColumns: "220px 1fr",
                gap: "2.5rem",
                padding: "2rem 0",
                borderBottom: "1px solid #e2e8f0",
                alignItems: "start",
              }}
            >
              {/* Category label */}
              <div className="ft-skills-label" style={{ paddingTop: "5px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "3px", height: "16px", background: BLUE, flexShrink: 0 }} />
                  <span style={{
                    fontSize: "11px", fontWeight: 800, color: NAVY,
                    textTransform: "uppercase", letterSpacing: "0.15em",
                  }}>
                    {group.category}
                  </span>
                </div>
                <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "6px", paddingLeft: "13px" }}>
                  {group.items.length} skill{group.items.length !== 1 ? "s" : ""}
                </div>
              </div>

              {/* Skill pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {group.items.map((skill, si) => {
                  const label = typeof skill === "string" ? skill : skill?.name || skill?.label || String(skill);
                  return (
                    <span
                      key={si}
                      style={{
                        fontSize: "12px", fontWeight: 600, color: NAVY,
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        padding: "6px 16px",
                        transition: "all 0.2s ease",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = BLUE;
                        e.currentTarget.style.color = BLUE;
                        e.currentTarget.style.background = "rgba(37,99,235,0.04)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#e2e8f0";
                        e.currentTarget.style.color = NAVY;
                        e.currentTarget.style.background = "#f8fafc";
                      }}
                    >
                      {label}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
