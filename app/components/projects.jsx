"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const NAVY = "#0f172a";
const BLUE = "#2563eb";
const GREY = "#64748b";

export default function FintechProjects({ data }) {
  const list = data?.projects || [];
  if (!list.length) return null;

  return (
    <section id="projects" style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
      <style>{`
        @media (max-width: 767px) {
          .ft-proj-inner { padding: 4rem 1.25rem !important; }
          .ft-proj-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div className="ft-proj-inner" style={{ maxWidth: "1280px", margin: "0 auto", padding: "7rem 2.5rem" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4rem", flexWrap: "wrap", gap: "1rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "11px", fontWeight: 800, color: BLUE, textTransform: "uppercase", letterSpacing: "0.2em" }}>04</span>
            <div style={{ width: "40px", height: "2px", background: BLUE }} />
            <span style={{ fontSize: "11px", fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.18em" }}>Projects</span>
          </div>
          <span style={{ fontSize: "12px", color: GREY }}>
            {list.length} project{list.length !== 1 ? "s" : ""}
          </span>
        </motion.div>

        <div className="ft-proj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.5rem" }}>
          {list.map((project, i) => {
            const title    = project.title || project.name || "";
            const desc     = project.description || "";
            const image    = project.imageBase64 || project.image || "";
            const github   = project.github  || project.githubUrl || project.repo || "";
            const liveUrl  = project.demo    || project.live || project.url || project.link || project.liveUrl || "";
            const tags =
              Array.isArray(project.stack)        ? project.stack :
              Array.isArray(project.tags)          ? project.tags :
              Array.isArray(project.technologies)  ? project.technologies :
              Array.isArray(project.tech)          ? project.tech : [];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  display: "flex", flexDirection: "column",
                  boxShadow: "0 1px 8px rgba(15,23,42,0.04)",
                  transition: "all 0.25s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,99,235,0.1)";
                  e.currentTarget.style.borderColor = "rgba(37,99,235,0.25)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 1px 8px rgba(15,23,42,0.04)";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Top blue bar */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: BLUE, zIndex: 1 }} />

                {/* Project image */}
                {image ? (
                  <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                    <img
                      src={image}
                      alt={title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                    />
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.95))",
                    }} />
                    {/* Links overlay */}
                    <div style={{ position: "absolute", bottom: "10px", right: "12px", display: "flex", gap: "8px" }}>
                      {github && (
                        <a href={github} target="_blank" rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: "flex", alignItems: "center", gap: "5px",
                            fontSize: "10px", fontWeight: 700, textTransform: "uppercase",
                            color: "#fff", background: NAVY,
                            padding: "5px 10px", textDecoration: "none",
                          }}>
                          <FaGithub size={10} /> Code
                        </a>
                      )}
                      {liveUrl && (
                        <a href={liveUrl} target="_blank" rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: "flex", alignItems: "center", gap: "5px",
                            fontSize: "10px", fontWeight: 700, textTransform: "uppercase",
                            color: "#fff", background: BLUE,
                            padding: "5px 10px", textDecoration: "none",
                          }}>
                          <FaExternalLinkAlt size={9} /> Live
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  /* No image: header strip with index + links */
                  <div style={{
                    height: "64px", padding: "0 1.8rem",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    background: "rgba(37,99,235,0.04)",
                    borderBottom: "1px solid #e2e8f0",
                  }}>
                    <span style={{ fontSize: "28px", fontWeight: 900, color: "rgba(37,99,235,0.08)", letterSpacing: "-0.04em" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div style={{ display: "flex", gap: "10px" }}>
                      {github && (
                        <a href={github} target="_blank" rel="noopener noreferrer"
                          style={{ color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.color = BLUE}
                          onMouseLeave={(e) => e.currentTarget.style.color = "#94a3b8"}
                          onClick={(e) => e.stopPropagation()}>
                          <FaGithub size={15} />
                        </a>
                      )}
                      {liveUrl && (
                        <a href={liveUrl} target="_blank" rel="noopener noreferrer"
                          style={{ color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.color = BLUE}
                          onMouseLeave={(e) => e.currentTarget.style.color = "#94a3b8"}
                          onClick={(e) => e.stopPropagation()}>
                          <FaExternalLinkAlt size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Card body */}
                <div style={{ padding: "1.8rem", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{ fontSize: "17px", fontWeight: 800, color: NAVY, letterSpacing: "-0.02em", margin: "0 0 0.6rem" }}>
                    {title}
                  </h3>

                  {desc && (
                    <p style={{ fontSize: "13.5px", color: GREY, lineHeight: 1.7, margin: "0 0 1.25rem", fontWeight: 400, flex: 1 }}>
                      {desc}
                    </p>
                  )}

                  {tags.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", paddingTop: "1rem", borderTop: "1px solid #f1f5f9" }}>
                      {tags.filter(Boolean).map((tag, j) => (
                        <span key={j} style={{
                          fontSize: "10px", fontWeight: 600, textTransform: "uppercase",
                          letterSpacing: "0.08em", color: BLUE,
                          background: "rgba(37,99,235,0.06)",
                          border: "1px solid rgba(37,99,235,0.15)",
                          padding: "3px 10px",
                        }}>
                          {typeof tag === "string" ? tag : tag?.name || String(tag)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
