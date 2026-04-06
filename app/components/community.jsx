"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

const NAVY = "#0f172a";
const BLUE = "#2563eb";
const GREY = "#64748b";

export default function FintechCommunity({ data }) {
  const list = data?.community || data?.volunteering || data?.involvement || [];
  if (!list.length) return null;

  return (
    <section id="community" style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
      <style>{`
        @media (max-width: 767px) {
          .ft-comm-inner { padding: 4rem 1.25rem !important; }
          .ft-comm-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div className="ft-comm-inner" style={{ maxWidth: "1280px", margin: "0 auto", padding: "7rem 2.5rem" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "4rem" }}
        >
          <span style={{ fontSize: "11px", fontWeight: 800, color: BLUE, textTransform: "uppercase", letterSpacing: "0.2em" }}>06</span>
          <div style={{ width: "40px", height: "2px", background: BLUE }} />
          <span style={{ fontSize: "11px", fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.18em" }}>Community</span>
        </motion.div>

        <div className="ft-comm-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.5rem" }}>
          {list.map((item, i) => {
            const title       = item.title       || item.role     || item.position || item.name || "";
            const org         = item.organization || item.company  || item.employer || "";
            const description = item.description  || item.impact  || "";
            const period      = item.duration     || item.years   || item.period   || item.date || "";
            const link        = item.link         || item.url     || item.website  || "";

            return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderTop: `3px solid ${BLUE}`,
                padding: "2rem",
                boxShadow: "0 1px 8px rgba(15,23,42,0.04)",
                transition: "box-shadow 0.2s ease",
                display: "flex", flexDirection: "column",
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 6px 24px rgba(37,99,235,0.08)"}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 1px 8px rgba(15,23,42,0.04)"}
            >
              <h3 style={{ fontSize: "16px", fontWeight: 800, color: NAVY, margin: "0 0 6px", letterSpacing: "-0.01em" }}>
                {title}
              </h3>
              {org && (
                <div style={{ fontSize: "12px", fontWeight: 600, color: BLUE, marginBottom: "0.8rem" }}>
                  {org}
                </div>
              )}
              {description && (
                <p style={{ fontSize: "13px", color: GREY, lineHeight: 1.7, margin: "0 0 1rem", fontWeight: 400, flex: 1 }}>
                  {description}
                </p>
              )}
              {(period || link) && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid #f1f5f9", flexWrap: "wrap" }}>
                  {period && (
                    <span style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                      {period}
                    </span>
                  )}
                  {link && (
                    <a href={link} target="_blank" rel="noopener noreferrer"
                      style={{
                        display: "flex", alignItems: "center", gap: "5px",
                        fontSize: "11px", fontWeight: 600, color: BLUE,
                        textDecoration: "none", transition: "opacity 0.2s",
                        marginLeft: "auto",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                    >
                      Visit <FaExternalLinkAlt size={9} />
                    </a>
                  )}
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
