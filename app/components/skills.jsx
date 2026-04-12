"use client";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20, scale: 0.85 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 220, damping: 18 } },
};

export default function PortfolioSkills({ data }) {
  if (!data?.skills?.length) return null;

  return (
    <section id="skills" className="relative py-28 px-6 overflow-hidden bg-[#0c0904]">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full"
          style={{ background:"radial-gradient(ellipse,rgba(251,191,36,0.05),transparent 70%)" }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity:0,x:-20 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}
          className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-black tracking-[0.35em] uppercase text-amber-400/70">[ 05 / Arsenal ]</span>
          <div className="flex-1 h-px bg-gradient-to-r from-amber-500/25 to-transparent max-w-[100px]" />
        </motion.div>

        <motion.h2 initial={{ opacity:0,y:18 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.6,delay:0.05 }}
          className="text-4xl sm:text-6xl font-black tracking-tighter text-white mb-4">
          Tech Stack<span className="text-amber-400">.</span>
        </motion.h2>
        <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.5,delay:0.15 }}
          className="text-white/30 text-sm mb-16 max-w-sm">
          Tools and technologies I bring to the table.
        </motion.p>

        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once:true }}
          className="flex flex-wrap gap-3">
          {data.skills.map((skill, i) => (
            <motion.div key={i} variants={item}
              whileHover={{ y:-4, boxShadow:"0 8px 30px rgba(251,191,36,0.2)" }}
              className="group relative px-5 py-3 rounded-full border border-amber-500/20 cursor-default transition-all duration-300 overflow-hidden"
              style={{ background:"rgba(251,191,36,0.04)" }}>
              {/* Hover fill */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background:"linear-gradient(135deg,rgba(251,191,36,0.1),rgba(249,115,22,0.06))" }} />
              <div className="flex items-center gap-2 relative z-10">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform"
                  style={{ background:"linear-gradient(135deg,#fbbf24,#f97316)" }} />
                <span className="text-[11px] font-bold text-white/50 group-hover:text-amber-200/90 transition-colors duration-300 uppercase tracking-wider">
                  {skill}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.5,delay:0.4 }}
          className="flex items-center gap-4 mt-14">
          <div className="flex-1 h-px" style={{ background:"linear-gradient(90deg,rgba(251,191,36,0.2),transparent)" }} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">{data.skills.length} Technologies</span>
          <div className="flex-1 h-px" style={{ background:"linear-gradient(270deg,rgba(251,191,36,0.2),transparent)" }} />
        </motion.div>
      </div>
    </section>
  );
}
