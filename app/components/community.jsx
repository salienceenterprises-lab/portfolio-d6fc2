"use client";
import { motion } from "framer-motion";
import { FaSun, FaExternalLinkAlt } from "react-icons/fa";

export default function PortfolioCommunity({ data }) {
  if (!data?.community?.length) return null;

  return (
    <section id="community" className="relative py-28 px-6 overflow-hidden bg-[#0c0904]">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/3 left-1/3 w-[600px] h-[500px] rounded-full"
          style={{ background:"radial-gradient(ellipse,rgba(251,191,36,0.05),transparent 70%)" }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity:0,x:-20 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}
          className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-black tracking-[0.35em] uppercase text-amber-400/70">[ 06 / Impact ]</span>
          <div className="flex-1 h-px bg-gradient-to-r from-amber-500/25 to-transparent max-w-[100px]" />
        </motion.div>

        <motion.h2 initial={{ opacity:0,y:18 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.6,delay:0.05 }}
          className="text-4xl sm:text-6xl font-black tracking-tighter text-white mb-4">
          Community<span className="text-amber-400">.</span>
        </motion.h2>
        <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.5,delay:0.15 }}
          className="text-white/30 text-sm mb-16 max-w-sm">
          Giving back and making a difference.
        </motion.p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.community.map((item, index) => (
            <motion.div key={index}
              initial={{ opacity:0,y:24 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}
              transition={{ duration:0.5,delay:index*0.08 }}
              whileHover={{ y:-5 }}
              className="group relative border border-amber-500/15 rounded-2xl p-6 overflow-hidden transition-all duration-400 hover:border-amber-400/40 hover:shadow-[0_16px_50px_rgba(251,191,36,0.1)]"
              style={{ background:"rgba(251,191,36,0.03)" }}>

              {/* Warm hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background:"linear-gradient(135deg,rgba(251,191,36,0.06),rgba(249,115,22,0.03),transparent)" }} />

              {/* Sun icon with radiating warmth */}
              <div className="relative w-11 h-11 mb-5">
                <div className="w-11 h-11 rounded-xl border border-amber-500/25 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ background:"rgba(251,191,36,0.08)" }}>
                  <FaSun className="w-4 h-4 text-amber-400/80" />
                </div>
              </div>

              <div className="flex items-start justify-between gap-2 mb-2 relative z-10">
                <div>
                  <h3 className="font-black text-white text-sm mb-0.5 group-hover:text-amber-200 transition-colors duration-300">{item.role}</h3>
                  <p className="text-xs font-bold text-amber-400/70">{item.organization}</p>
                </div>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer"
                    className="text-white/20 hover:text-amber-400 transition-colors mt-0.5 flex-shrink-0">
                    <FaExternalLinkAlt className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {item.description && (
                <p className="text-sm text-white/35 leading-relaxed mt-3 relative z-10">{item.description}</p>
              )}

              {/* Bottom warm line */}
              <motion.div initial={{ scaleX:0 }} whileHover={{ scaleX:1 }}
                className="absolute bottom-0 left-0 right-0 h-px origin-left"
                style={{ background:"linear-gradient(90deg,transparent,#fbbf24,#f97316,transparent)" }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
