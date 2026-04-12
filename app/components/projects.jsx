"use client";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaFolder } from "react-icons/fa";

export default function PortfolioProjects({ data }) {
  if (!data?.projects?.length) return null;

  return (
    <section id="projects" className="relative py-28 px-6 overflow-hidden bg-[#100b05]">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[600px] rounded-full translate-x-1/3 -translate-y-1/4"
          style={{ background:"radial-gradient(ellipse,rgba(249,115,22,0.06),transparent 70%)" }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity:0,x:-20 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}
          className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-black tracking-[0.35em] uppercase text-amber-400/70">[ 04 / Work ]</span>
          <div className="flex-1 h-px bg-gradient-to-r from-amber-500/25 to-transparent max-w-[100px]" />
        </motion.div>

        <motion.h2 initial={{ opacity:0,y:18 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.6,delay:0.05 }}
          className="text-4xl sm:text-6xl font-black tracking-tighter text-white mb-4">
          Projects<span className="text-amber-400">.</span>
        </motion.h2>
        <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.5,delay:0.15 }}
          className="text-white/30 text-sm mb-16 max-w-sm">
          Selected work — crafted with care.
        </motion.p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.projects.map((proj, index) => (
            <motion.div key={index}
              initial={{ opacity:0,y:28 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}
              transition={{ duration:0.5,delay:index*0.08 }}
              whileHover={{ y:-6 }}
              className="group relative border border-amber-500/15 overflow-hidden rounded-2xl transition-all duration-300 hover:border-amber-400/40 hover:shadow-[0_20px_60px_rgba(251,191,36,0.1)]"
              style={{ background:"rgba(251,191,36,0.03)" }}>

              {/* With image */}
              {proj.imageBase64 ? (
                <div className="relative h-48 overflow-hidden">
                  <img src={proj.imageBase64} alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#100b05]/30 to-[#100b05]" />
                  {/* Heat shimmer on hover */}
                  <motion.div
                    initial={{ x:"-100%",opacity:0 }} whileHover={{ x:"200%",opacity:1 }}
                    transition={{ duration:0.7 }}
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-amber-400/15 to-transparent skew-x-12 pointer-events-none" />
                  <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider text-white/70 hover:text-amber-300 border border-amber-500/30 backdrop-blur-sm transition-colors"
                        style={{ background:"rgba(12,9,4,0.85)" }}>
                        <FaGithub className="w-3 h-3" /> Code
                      </a>
                    )}
                    {proj.demo && (
                      <a href={proj.demo} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider text-black transition-colors"
                        style={{ background:"linear-gradient(135deg,#fbbf24,#f97316)" }}>
                        <FaExternalLinkAlt className="w-2.5 h-2.5" /> Live
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                /* No image — warm header strip */
                <div className="relative h-24 border-b border-amber-500/10 overflow-hidden flex items-center px-5"
                  style={{ background:"linear-gradient(135deg,rgba(251,191,36,0.06),rgba(249,115,22,0.03),rgba(12,9,4,0))" }}>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-7xl font-black select-none leading-none tabular-nums"
                    style={{ WebkitTextFillColor:"transparent", WebkitTextStrokeWidth:"1px", WebkitTextStrokeColor:"rgba(251,191,36,0.08)" }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-3 relative z-10">
                    <FaFolder className="w-5 h-5 text-amber-400/40 flex-shrink-0" />
                    <div className="flex gap-2">
                      {proj.github && <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-amber-400 transition-colors"><FaGithub className="w-4 h-4" /></a>}
                      {proj.demo && <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-amber-400 transition-colors"><FaExternalLinkAlt className="w-3.5 h-3.5" /></a>}
                    </div>
                  </div>
                </div>
              )}

              <div className="p-5">
                <h3 className="font-black text-white text-sm mb-2 group-hover:text-amber-200 transition-colors duration-300">{proj.title}</h3>
                {proj.description && <p className="text-sm text-white/35 leading-relaxed mb-4">{proj.description}</p>}
                {proj.tech?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.05]">
                    {proj.tech.filter(t => t?.trim()).map((tech) => (
                      <span key={tech} className="text-[9px] font-bold uppercase tracking-wider text-amber-400/50 px-2 py-0.5 rounded-full border border-amber-500/15"
                        style={{ background:"rgba(251,191,36,0.05)" }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
