"use client";
import { motion } from "framer-motion";
import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";

export default function PortfolioExperience({ data }) {
  if (!data?.experience?.length) return null;

  return (
    <section id="experience" className="relative py-28 px-6 overflow-hidden bg-[#0c0904]">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full translate-x-1/3"
          style={{ background:"radial-gradient(ellipse,rgba(249,115,22,0.06),transparent 70%)" }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity:0,x:-20 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}
          className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-black tracking-[0.35em] uppercase text-amber-400/70">[ 03 / Experience ]</span>
          <div className="flex-1 h-px bg-gradient-to-r from-amber-500/25 to-transparent max-w-[100px]" />
        </motion.div>

        <motion.h2 initial={{ opacity:0,y:18 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.6,delay:0.05 }}
          className="text-4xl sm:text-6xl font-black tracking-tighter text-white mb-4">
          Career<span className="text-amber-400">.</span>
        </motion.h2>
        <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.5,delay:0.15 }}
          className="text-white/30 text-sm mb-16 max-w-sm">
          Where I've been and what I've built.
        </motion.p>

        <div className="relative">
          {/* Timeline spine */}
          <motion.div initial={{ scaleY:0 }} whileInView={{ scaleY:1 }} viewport={{ once:true }}
            transition={{ duration:1.8,ease:"easeInOut" }}
            className="absolute left-[19px] top-3 w-px hidden sm:block origin-top"
            style={{ height:"calc(100% - 12px)", background:"linear-gradient(180deg,rgba(251,191,36,0.5),rgba(249,115,22,0.2),transparent)" }} />

          <div className="space-y-7">
            {data.experience.map((job, index) => (
              <motion.div key={index}
                initial={{ opacity:0,x:-30 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true,margin:"-80px" }}
                transition={{ duration:0.5,delay:index*0.1,type:"spring",stiffness:100 }}
                className="relative sm:pl-14">

                {/* Timeline dot */}
                <div className="hidden sm:flex absolute left-0 top-6 w-10 h-10 rounded-full items-center justify-center z-10"
                  style={{ background:"#0c0904" }}>
                  <div className="w-3 h-3 rounded-full shadow-[0_0_14px_rgba(251,191,36,0.7)]"
                    style={{ background:"linear-gradient(135deg,#fbbf24,#f97316)" }} />
                </div>

                <motion.div whileHover={{ x:6 }} transition={{ type:"spring",stiffness:300 }} className="group">
                  <div className="relative border border-amber-500/15 rounded-2xl p-6 sm:p-7 overflow-hidden transition-all duration-400 hover:border-amber-400/35 hover:shadow-[0_8px_40px_rgba(251,191,36,0.08)]"
                    style={{ background:"rgba(251,191,36,0.03)" }}>
                    {/* Inner warm glow on hover */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                      style={{ background:"linear-gradient(135deg,rgba(251,191,36,0.04),transparent)" }} />
                    {/* Watermark */}
                    <span className="absolute right-5 top-4 text-6xl font-black select-none leading-none tabular-nums"
                      style={{ WebkitTextFillColor:"transparent", WebkitTextStrokeWidth:"1px", WebkitTextStrokeColor:"rgba(251,191,36,0.06)" }}>
                      {String(index+1).padStart(2,"0")}
                    </span>

                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4 relative z-10">
                      <div>
                        <h3 className="text-base font-black text-white group-hover:text-amber-200 transition-colors duration-300">{job.role}</h3>
                        <div className="flex items-center gap-2 mt-1.5">
                          <FaBriefcase className="w-3 h-3 text-amber-400/60" />
                          <span className="text-sm font-bold text-amber-400/80">{job.company}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1.5 flex-shrink-0">
                        <span className="text-[10px] font-bold text-white/35 border border-amber-500/15 px-3 py-1 rounded-full"
                          style={{ background:"rgba(251,191,36,0.06)" }}>
                          {job.period}
                        </span>
                        {job.location && (
                          <span className="flex items-center gap-1 text-[10px] text-white/25">
                            <FaMapMarkerAlt className="w-2.5 h-2.5" /> {job.location}
                          </span>
                        )}
                      </div>
                    </div>

                    {job.description && <p className="text-sm text-white/40 leading-relaxed mb-4 relative z-10">{job.description}</p>}

                    {job.highlights?.length > 0 && (
                      <ul className="space-y-2 mb-4 relative z-10">
                        {job.highlights.filter(h=>h?.trim()).map((h,i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-white/35">
                            <div className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background:"linear-gradient(135deg,#fbbf24,#f97316)" }} />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    {job.stack?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.05] relative z-10">
                        {job.stack.filter(t=>t?.trim()).map((tech) => (
                          <span key={tech} className="text-[9px] font-black uppercase tracking-wider text-amber-400/55 px-2.5 py-1 rounded-full border border-amber-500/15"
                            style={{ background:"rgba(251,191,36,0.05)" }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
