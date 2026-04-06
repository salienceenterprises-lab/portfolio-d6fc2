"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const NAVY = "#0f172a";
const BLUE = "#2563eb";

export default function FintechNav({ data }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  const allLinks = [
    { label: "About",      key: "about",      href: "#about" },
    { label: "Education",  key: "education",  href: "#education" },
    { label: "Experience", key: "experience", href: "#experience" },
    { label: "Projects",   key: "projects",   href: "#projects" },
    { label: "Skills",     key: "skills",     href: "#skills" },
    { label: "Community",  key: "community",  href: "#community" },
    { label: "Contact",    key: "email",      href: "#contact" },
  ];

  const activeLinks = allLinks.filter((l) => {
    if (l.label === "About") return true;
    const d = data?.[l.key];
    return Array.isArray(d) ? d.length > 0 : !!d;
  });

  const resumeSource = data?.resumeBase64 || data?.resume || data?.resumeUrl;

  useEffect(() => {
    const ids = ["hero", ...activeLinks.map((l) => l.href.replace("#", ""))];
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sorted = ids
        .map((id) => ({ id, top: document.getElementById(id)?.offsetTop ?? Infinity }))
        .filter((s) => s.top !== Infinity)
        .sort((a, b) => a.top - b.top);
      for (let i = sorted.length - 1; i >= 0; i--) {
        if (window.scrollY >= sorted[i].top - 120) { setActiveSection(sorted[i].id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .ft-nav-link {
          font-size: 12px; font-weight: 600;
          color: #64748b; text-decoration: none;
          letter-spacing: 0.04em;
          padding: 6px 0;
          position: relative;
          transition: color 0.2s ease;
        }
        .ft-nav-link::after {
          content: '';
          position: absolute; bottom: 0; left: 0;
          width: 0; height: 2px;
          background: ${BLUE};
          transition: width 0.25s ease;
        }
        .ft-nav-link:hover { color: ${NAVY}; }
        .ft-nav-link:hover::after, .ft-nav-link.active::after { width: 100%; }
        .ft-nav-link.active { color: ${NAVY}; font-weight: 700; }
        .ft-nav-desktop { display: flex; align-items: center; gap: 2rem; }
        .ft-nav-mobile-btn { display: none; }
        @media (max-width: 767px) {
          .ft-nav-desktop { display: none !important; }
          .ft-nav-mobile-btn { display: block !important; }
        }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
        background: scrolled ? "#ffffff" : "rgba(255,255,255,0.95)",
        borderBottom: `1px solid ${scrolled ? "#e2e8f0" : "transparent"}`,
        boxShadow: scrolled ? "0 1px 12px rgba(15,23,42,0.06)" : "none",
        backdropFilter: "blur(12px)",
        transition: "all 0.3s ease",
      }}>
        <div style={{
          maxWidth: "1280px", margin: "0 auto",
          padding: "0 2.5rem", height: "68px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <a href="#hero" onClick={(e) => go(e, "#hero")} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "32px", height: "32px",
              background: BLUE,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{ color: "#fff", fontSize: "14px", fontWeight: 900, letterSpacing: "-0.03em" }}>
                {(data?.name || "P").charAt(0).toUpperCase()}
              </span>
            </div>
            <span style={{
              fontSize: "14px", fontWeight: 700,
              color: NAVY, letterSpacing: "-0.01em",
            }}>
              {data?.name?.split(" ")[0] || "Portfolio"}
            </span>
          </a>

          {/* Desktop links */}
          <div className="ft-nav-desktop">
            {activeLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href} href={link.href}
                  onClick={(e) => go(e, link.href)}
                  className={`ft-nav-link ${isActive ? "active" : ""}`}
                >
                  {link.label}
                </a>
              );
            })}
            {resumeSource && (
              <a
                href={data?.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : resumeSource}
                download="Resume.pdf"
                style={{
                  fontSize: "12px", fontWeight: 700,
                  color: BLUE, textDecoration: "none",
                  border: `1.5px solid ${BLUE}`,
                  padding: "7px 20px",
                  letterSpacing: "0.04em",
                  transition: "all 0.2s ease",
                  background: "transparent",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = BLUE; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = BLUE; }}
              >
                Résumé
              </a>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="ft-nav-mobile-btn"
            style={{ background: "none", border: "none", cursor: "pointer", color: NAVY, padding: "6px" }}
          >
            {mobileOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{
              position: "fixed", top: "68px", left: 0, right: 0, zIndex: 39,
              background: "#ffffff",
              borderBottom: "1px solid #e2e8f0",
              padding: "1.5rem 2.5rem 2rem",
              display: "flex", flexDirection: "column", gap: "1rem",
              boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
            }}
          >
            {activeLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => go(e, link.href)}
                style={{
                  fontSize: "14px", fontWeight: 600,
                  color: NAVY, textDecoration: "none",
                  padding: "8px 0",
                  borderBottom: "1px solid #f1f5f9",
                }}>
                {link.label}
              </a>
            ))}
            {resumeSource && (
              <a href={data?.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : resumeSource}
                download="Resume.pdf"
                style={{
                  fontSize: "13px", fontWeight: 700, color: BLUE,
                  textDecoration: "none", marginTop: "0.5rem",
                }}>
                Download Résumé ↓
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
