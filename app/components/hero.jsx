"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaLinkedin, FaGithub } from "react-icons/fa";

const NAVY = "#0f172a";
const BLUE = "#2563eb";
const BLUE_L = "#3b82f6";
const GREY = "#64748b";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.25, 1, 0.5, 1], delay },
});

export default function FintechHero({ data }) {
  const hasPhoto = !!data?.heroImageBase64;
  const resumeSource = data?.resumeBase64 || data?.resume || data?.resumeUrl;
  const nameParts = (data?.name || "Portfolio").split(" ");

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
  };

  const stats = [
    data?.experience?.length && { label: "Years of Experience", value: `${data.experience.length}+` },
    data?.projects?.length   && { label: "Projects Delivered",  value: `${data.projects.length}+`   },
    data?.skills?.length     && { label: "Technologies",        value: `${Math.min(data.skills.flat?.()?.length || data.skills.length, 20)}+` },
  ].filter(Boolean);

  return (
    <section id="hero" style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #f8fafc 0%, #eef2f7 50%, #f0f4ff 100%)",
      display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
      paddingTop: "68px",
    }}>
      <style>{`
        @media (max-width: 767px) {
          .ft-hero-inner { padding: 3rem 1.25rem !important; }
          .ft-hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .ft-hero-photo { display: none !important; }
        }
      `}</style>
      {/* Decorative grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
      }} />

      {/* Blue geometric accent — top right */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "420px", height: "420px",
        background: "linear-gradient(135deg, rgba(37,99,235,0.07) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "68px", right: 0,
        width: "3px", height: "180px",
        background: `linear-gradient(to bottom, ${BLUE}, transparent)`,
        pointerEvents: "none",
      }} />

      <div className="ft-hero-inner" style={{ maxWidth: "1280px", margin: "0 auto", padding: "5rem 2.5rem", width: "100%", position: "relative", zIndex: 1 }}>
        <div className="ft-hero-grid" style={{
          display: "grid",
          gridTemplateColumns: hasPhoto ? "1fr 400px" : "1fr",
          gap: "5rem", alignItems: "center",
        }}>
          {/* Left: text */}
          <div>
            {/* Role tag */}
            <motion.div {...fadeUp(0)} style={{ marginBottom: "1.8rem" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontSize: "11px", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.18em",
                color: BLUE,
                background: "rgba(37,99,235,0.07)",
                border: "1px solid rgba(37,99,235,0.15)",
                padding: "5px 14px",
              }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: BLUE, display: "inline-block" }} />
                {data?.title || "Finance & Technology Professional"}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1 {...fadeUp(0.1)} style={{
              fontSize: "clamp(3rem, 6.5vw, 6.5rem)",
              fontWeight: 900,
              color: NAVY,
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
              margin: "0 0 2rem",
            }}>
              {nameParts.map((word, i) => (
                <span key={i} style={{ display: "block" }}>
                  {i === nameParts.length - 1
                    ? <span style={{ color: BLUE }}>{word}</span>
                    : word}
                </span>
              ))}
            </motion.h1>

            {/* Bio */}
            {(data?.sloganHeroSection || data?.bio) && (
              <motion.p {...fadeUp(0.2)} style={{
                fontSize: "16px", fontWeight: 400,
                color: GREY, lineHeight: 1.8,
                maxWidth: "520px", margin: "0 0 2.5rem",
                borderLeft: `3px solid ${BLUE}`,
                paddingLeft: "1.2rem",
              }}>
                {data?.sloganHeroSection || data?.bio?.slice(0, 180) + "…"}
              </motion.p>
            )}

            {/* CTAs */}
            <motion.div {...fadeUp(0.3)} style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", marginBottom: "3rem" }}>
              <button
                onClick={() => scrollTo("contact")}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  background: BLUE, color: "#fff",
                  border: "none", padding: "13px 32px",
                  fontSize: "13px", fontWeight: 700,
                  letterSpacing: "0.03em", cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(37,99,235,0.3)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#1d4ed8"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(37,99,235,0.45)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = BLUE; e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,99,235,0.3)"; }}
              >
                Get In Touch <FaArrowRight size={11} />
              </button>
              <button
                onClick={() => scrollTo("projects")}
                style={{
                  background: "transparent", color: NAVY,
                  border: "1.5px solid #cbd5e1", padding: "12px 28px",
                  fontSize: "13px", fontWeight: 600,
                  cursor: "pointer", transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.color = BLUE; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#cbd5e1"; e.currentTarget.style.color = NAVY; }}
              >
                View Work
              </button>
              {/* Social icons */}
              {data?.linkedin && (
                <a href={data.linkedin} target="_blank" rel="noopener noreferrer"
                  style={{ color: GREY, transition: "color 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = BLUE}
                  onMouseLeave={(e) => e.currentTarget.style.color = GREY}
                >
                  <FaLinkedin size={20} />
                </a>
              )}
              {data?.github && (
                <a href={data.github} target="_blank" rel="noopener noreferrer"
                  style={{ color: GREY, transition: "color 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = NAVY}
                  onMouseLeave={(e) => e.currentTarget.style.color = GREY}
                >
                  <FaGithub size={20} />
                </a>
              )}
            </motion.div>

            {/* Stats row */}
            {stats.length > 0 && (
              <motion.div {...fadeUp(0.4)} style={{
                display: "flex", gap: "0",
                borderTop: "1px solid #e2e8f0",
                paddingTop: "2rem",
              }}>
                {stats.map((stat, i) => (
                  <div key={i} style={{
                    paddingRight: "2.5rem",
                    marginRight: "2.5rem",
                    borderRight: i < stats.length - 1 ? "1px solid #e2e8f0" : "none",
                  }}>
                    <div style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 900, color: NAVY, letterSpacing: "-0.04em", lineHeight: 1 }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: "11px", fontWeight: 600, color: GREY, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "4px" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Right: photo */}
          {hasPhoto && (
            <motion.div className="ft-hero-photo"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
              style={{ position: "relative" }}
            >
              {/* Blue accent corner */}
              <div style={{
                position: "absolute", top: "-12px", left: "-12px",
                width: "48px", height: "48px",
                borderTop: `3px solid ${BLUE}`,
                borderLeft: `3px solid ${BLUE}`,
              }} />
              <div style={{
                position: "absolute", bottom: "-12px", right: "-12px",
                width: "48px", height: "48px",
                borderBottom: `3px solid ${BLUE}`,
                borderRight: `3px solid ${BLUE}`,
              }} />

              <div style={{
                overflow: "hidden",
                border: "1px solid #e2e8f0",
                boxShadow: "0 20px 60px rgba(15,23,42,0.1)",
              }}>
                <img
                  src={data.heroImageBase64}
                  alt={data.name}
                  style={{
                    width: "100%", height: "480px",
                    objectFit: "cover", objectPosition: "center top",
                    display: "block",
                    filter: "brightness(1.02) saturate(0.9)",
                  }}
                />
              </div>

              {/* Resume badge */}
              {resumeSource && (
                <a
                  href={data?.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : resumeSource}
                  download="Resume.pdf"
                  style={{
                    position: "absolute", bottom: "24px", left: "-24px",
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 8px 24px rgba(15,23,42,0.1)",
                    padding: "12px 20px",
                    display: "flex", alignItems: "center", gap: "10px",
                    textDecoration: "none",
                    transition: "box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 12px 32px rgba(37,99,235,0.15)"}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 8px 24px rgba(15,23,42,0.1)"}
                >
                  <div style={{ width: "32px", height: "32px", background: "rgba(37,99,235,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <FaArrowRight size={12} style={{ color: BLUE, transform: "rotate(90deg)" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 800, color: NAVY, textTransform: "uppercase", letterSpacing: "0.08em" }}>Résumé</div>
                    <div style={{ fontSize: "10px", color: GREY }}>Download PDF</div>
                  </div>
                </a>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
