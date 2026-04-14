"use client";
import { motion } from "framer-motion";

export default function PortfolioAbout({ data }) {
  if (!data) return null;
  const topSkills = data?.skills?.slice(0, 8) || [];
  const hasPhoto = !!data?.heroImageBase64;

  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden bg-[#100b05]">

      {/* Ambient warm */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[500px] rounded-full translate-x-1/3 -translate-y-1/4"
          style={{ background: "radial-gradient(ellipse,rgba(251,191,36,0.06),transparent 70%)" }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section label */}
        <motion.div initial={{ opacity:0,x:-20 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}
          className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-black tracking-[0.35em] uppercase text-amber-400/70">[ 01 / About ]</span>
          <div className="flex-1 h-px bg-gradient-to-r from-amber-500/25 to-transparent max-w-[100px]" />
        </motion.div>

        <motion.h2 initial={{ opacity:0,y:18 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.6,delay:0.05 }}
          className="text-4xl sm:text-6xl font-black tracking-tighter text-white mb-16">
          Who I Am<span className="text-amber-400">.</span>
        </motion.h2>

        <div className={`grid gap-16 items-center ${hasPhoto ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1 max-w-3xl"}`}>

          {/* Bio */}
          <motion.div initial={{ opacity:0,x:-30 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }}
            transition={{ duration:0.6,type:"spring",stiffness:80 }}>
            {/* Warm accent quote line */}
            <div className="relative mb-8">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
                style={{ background: "linear-gradient(180deg,#fbbf24,#f97316,transparent)" }} />
              <div className="pl-6">
                <p className="text-white/55 text-base leading-[1.95] font-light">
                  {data?.bio || data?.about || "Portfolio bio goes here."}
                </p>
              </div>
            </div>

            {topSkills.length > 0 && (
              <div className="mt-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[9px] font-black uppercase tracking-[0.35em] text-white/25">Core Stack</span>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {topSkills.map((skill, i) => (
                    <motion.span key={i}
                      initial={{ opacity:0,scale:0.7 }} whileInView={{ opacity:1,scale:1 }} viewport={{ once:true }}
                      transition={{ duration:0.3,delay:i*0.05 }}
                      whileHover={{ scale:1.08 }}
                      className="px-3.5 py-1.5 text-[10px] font-bold rounded-full cursor-default transition-all duration-200 border border-amber-500/20 text-amber-300/70 hover:border-amber-400/60 hover:text-amber-200"
                      style={{ background: "rgba(251,191,36,0.06)" }}>
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Photo — only rendered if uploaded */}
          {hasPhoto && (
            <motion.div initial={{ opacity:0,x:30 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }}
              transition={{ duration:0.6,delay:0.1,type:"spring",stiffness:80 }}
              className="flex justify-center">
              <div className="relative w-72 h-80">
                {/* Warm glow */}
                <div className="absolute inset-0 scale-110 blur-2xl rounded-[60%_40%_55%_45%]"
                  style={{ background: "radial-gradient(ellipse,rgba(251,191,36,0.2),rgba(249,115,22,0.1),transparent 70%)" }} />
                {/* Orbit ring */}
                <div className="absolute -inset-4 border border-dashed border-amber-400/15 rounded-[60%_40%_55%_45%]" />
                {/* Photo */}
                <div className="absolute inset-0 overflow-hidden border border-amber-400/25 rounded-[60%_40%_55%_45%]">
                  <img src={data.heroImageBase64} alt={data.name} className="w-full h-full object-cover scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#100b05]/50 to-transparent" />
                </div>
                {/* Name tag */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <div className="px-4 py-1.5 rounded-full border border-amber-500/25 backdrop-blur-sm"
                    style={{ background:"rgba(251,191,36,0.07)" }}>
                    <p className="text-[10px] font-black text-amber-300/80 uppercase tracking-wider">{data?.title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
