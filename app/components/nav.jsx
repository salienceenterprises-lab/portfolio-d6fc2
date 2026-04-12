"use client";
import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FaBars, FaTimes, FaDownload } from "react-icons/fa";

export default function PortfolioNav({ data }) {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollY } = useScroll();

  if (!data) return null;

  const allNavLinks = [
    { label: "About",     href: "#about",      key: "about"      },
    { label: "Education", href: "#education",  key: "education"  },
    { label: "Exp",       href: "#experience", key: "experience" },
    { label: "Projects",  href: "#projects",   key: "projects"   },
    { label: "Skills",    href: "#skills",     key: "skills"     },
    { label: "Impact",    href: "#community",  key: "community"  },
    { label: "Contact",   href: "#contact",    key: "email"      },
  ];

  const activeLinks = allNavLinks.filter(
    (l) => l.key === "about" || (Array.isArray(data?.[l.key]) ? data[l.key].length > 0 : !!data?.[l.key])
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
    setPastHero(latest > window.innerHeight * 0.8);
    const sectionIds = ["hero", ...activeLinks.map((l) => l.href.replace("#", ""))];
    const sorted = sectionIds
      .map((id) => ({ id, top: document.getElementById(id)?.offsetTop ?? Infinity }))
      .filter((s) => s.top !== Infinity)
      .sort((a, b) => a.top - b.top);
    for (let i = sorted.length - 1; i >= 0; i--) {
      if (latest >= sorted[i].top - 130) { setActiveSection(sorted[i].id); break; }
    }
  });

  const scrollTo = (e, href) => {
    e.preventDefault(); setMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 72, behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? "bg-[#0c0904]/90 backdrop-blur-xl border-b border-amber-500/[0.1]" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="#hero" onClick={(e) => scrollTo(e, "#hero")} className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#fbbf24,#f97316)" }}>
            <span className="text-[10px] font-black text-black">
              {data.name?.split(" ").map(w => w[0]).join("").slice(0, 2) || "BB"}
            </span>
          </div>
          <span className="text-sm font-bold text-white/60 tracking-tight hidden sm:block group-hover:text-white/90 transition-colors">
            {data.name?.split(" ")[0]}<span className="text-amber-400">.</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {activeLinks.map((l) => {
            const isActive = activeSection === l.href.replace("#", "");
            return (
              <a key={l.href} href={l.href} onClick={(e) => scrollTo(e, l.href)}
                className="relative text-[10px] font-black uppercase tracking-[0.25em] transition-colors duration-300 py-1"
                style={{ color: isActive ? "#fbbf24" : "rgba(255,255,255,0.35)" }}>
                {l.label}
                {isActive && (
                  <motion.div layoutId="bb-nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-px"
                    style={{ background: "linear-gradient(90deg,transparent,#fbbf24,transparent)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
              </a>
            );
          })}
          <AnimatePresence>
            {pastHero && data?.resumeBase64 && (
              <motion.a initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }}
                href={`data:application/pdf;base64,${data.resumeBase64}`} download={`${data.name || "Resume"}.pdf`}
                className="flex items-center gap-1.5 px-4 py-2 text-black text-[10px] font-black rounded-full uppercase tracking-[0.2em] transition-all shadow-lg shadow-amber-500/20"
                style={{ background: "linear-gradient(135deg,#fbbf24,#f97316)" }}>
                <FaDownload className="w-2.5 h-2.5" /> Resume
              </motion.a>
            )}
          </AnimatePresence>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white/50 hover:text-amber-400 transition-colors">
          {mobileOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0c0904]/97 backdrop-blur-xl border-b border-amber-500/10 px-6 pb-6 pt-3 overflow-hidden">
            {activeLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => scrollTo(e, l.href)}
                className="block py-3 text-xs font-black uppercase tracking-[0.25em] text-white/40 hover:text-amber-400 transition-colors border-b border-white/[0.04] last:border-0">
                {l.label}
              </a>
            ))}
            {data?.resumeBase64 && (
              <a href={`data:application/pdf;base64,${data.resumeBase64}`} download={`${data.name || "Resume"}.pdf`}
                className="flex items-center gap-2 mt-5 text-xs font-black uppercase tracking-[0.2em] text-amber-400">
                <FaDownload className="w-3.5 h-3.5" /> Download Resume
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
