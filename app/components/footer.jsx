"use client";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function PortfolioFooter({ data }) {
  const year = new Date().getFullYear();
  if (!data) return null;

  const socials = [
    { show: data?.github,   icon: FaGithub,   href: data?.github,            label: "GitHub"   },
    { show: data?.linkedin, icon: FaLinkedin,  href: data?.linkedin,          label: "LinkedIn" },
    { show: data?.email,    icon: FaEnvelope,  href: `mailto:${data?.email}`, label: "Email"    },
  ].filter(s => s.show);

  return (
    <footer className="relative bg-[#0c0904] py-10 px-6 overflow-hidden" style={{ borderTop:"1px solid rgba(251,191,36,0.08)" }}>

      {/* Top warm rule */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px"
        style={{ background:"linear-gradient(90deg,transparent,rgba(251,191,36,0.25),transparent)" }} />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.015)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Logo + copyright */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background:"linear-gradient(135deg,#fbbf24,#f97316)" }}>
              <span className="text-[8px] font-black text-black">
                {data.name?.split(" ").map(w=>w[0]).join("").slice(0,2)||"BB"}
              </span>
            </div>
            <p className="text-sm text-white/30">
              © {year}{" "}
              <span className="text-white/60 font-black">{data.name || "Portfolio"}</span>
            </p>
          </div>

          {/* Socials */}
          {socials.length > 0 && (
            <div className="flex items-center gap-5">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a key={label} href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel={label !== "Email" ? "noopener noreferrer" : undefined}
                  whileHover={{ scale:1.2, color:"#fbbf24" }}
                  className="text-white/20 transition-colors duration-300 hover:text-amber-400"
                  aria-label={label}>
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          )}

          {/* Credit */}
          <p className="text-[10px] text-white/15 font-bold uppercase tracking-[0.3em]">
            Built with{" "}
            <span className="font-semibold text-amber-500/50">Salience</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
