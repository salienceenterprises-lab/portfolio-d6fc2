"use client";
import { motion } from "framer-motion";
import { FaDownload, FaEnvelope, FaChevronDown } from "react-icons/fa";

export default function PortfolioHero({ data }) {
  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  const stats = [
    data?.experience?.length > 0 && { label: "Roles", value: data.experience.length },
    data?.projects?.length > 0 && { label: "Projects", value: data.projects.length },
    data?.skills?.length > 0 && { label: "Skills", value: data.skills.length },
  ].filter(Boolean);

  const firstName = data?.name?.split(" ")[0] || "";
  const lastName = data?.name?.split(" ").slice(1).join(" ") || "";

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0c0904]">

      {/* Radial warm glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(251,191,36,0.08)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(249,115,22,0.06)_0%,transparent_55%)] pointer-events-none" />

      {/* Warm grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.025)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />


      <div className={`relative z-20 max-w-6xl mx-auto px-6 w-full grid gap-16 items-center py-32 min-h-screen ${data?.heroImageBase64 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 max-w-3xl"}`}>

        {/* Left */}
        <div className={`order-2 md:order-1 ${!data?.heroImageBase64 ? "flex flex-col items-center text-center" : ""}`}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="flex gap-1">
              {[0,1,2].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              ))}
            </div>
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-amber-400/80">{data?.title}</span>
          </motion.div>

          {/* Name */}
          <div className="mb-8 overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-black tracking-tighter leading-none text-white w-full break-words"
                style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>
                {firstName}
              </h1>
            </motion.div>
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-black tracking-tighter leading-none w-full break-words"
                style={{
                  fontSize: "clamp(2.5rem, 8vw, 5rem)",
                  background: "linear-gradient(135deg, #fbbf24 0%, #f97316 60%, #ef4444 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                {lastName || "\u00A0"}
              </h1>
            </motion.div>
          </div>

          {/* Slogan */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-white/35 text-sm leading-relaxed max-w-xs mb-10"
          >
            {data?.sloganHeroSection}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            {data?.resumeBase64 && (
              <motion.a
                whileHover={{ scale: 1.03, boxShadow: "0 0 35px rgba(251,191,36,0.35)" }}
                whileTap={{ scale: 0.97 }}
                href={`data:application/pdf;base64,${data.resumeBase64}`}
                download={`${data.name || "Resume"}.pdf`}
                className="flex items-center gap-2.5 px-7 py-3.5 font-black text-xs uppercase tracking-[0.15em] text-black rounded-full transition-all shadow-lg"
                style={{ background: "linear-gradient(135deg, #fbbf24, #f97316)" }}
              >
                <FaDownload className="w-3.5 h-3.5" /> Resume
              </motion.a>
            )}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToContact}
              className="flex items-center gap-2.5 px-7 py-3.5 border border-amber-500/30 text-white/60 text-xs font-black rounded-full hover:border-amber-400/60 hover:text-white/90 transition-all uppercase tracking-[0.15em]"
            >
              <FaEnvelope className="w-3.5 h-3.5 text-amber-400" /> Contact
            </motion.button>
          </motion.div>

          {/* Stats */}
          {stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex items-center gap-10 pt-8 border-t border-white/[0.06]"
            >
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="text-3xl font-black tabular-nums"
                    style={{ background: "linear-gradient(135deg,#fbbf24,#f97316)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                    {String(s.value).padStart(2, "0")}
                  </div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/25 mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Right: Photo */}
        <div className="order-1 md:order-2 flex justify-center items-center">
          {data?.heroImageBase64 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, type: "spring", stiffness: 70, damping: 14 }}
              className="relative w-64 h-72 sm:w-80 sm:h-96"
            >
              {/* Warm glow */}
              <div className="absolute inset-0 scale-110 blur-3xl rounded-[60%_40%_50%_50%]"
                style={{ background: "radial-gradient(ellipse,rgba(251,191,36,0.25),rgba(249,115,22,0.1),transparent 70%)" }} />

              {/* Static orbit ring */}
              <div className="absolute -inset-4 border border-dashed border-amber-400/15 rounded-[60%_40%_55%_45%]" />

              {/* Photo in organic blob */}
              <div className="absolute inset-0 overflow-hidden border-2 border-amber-400/30 rounded-[60%_40%_55%_45%]">
                <img src={data.heroImageBase64} alt={data.name}
                  className="w-full h-full object-cover scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0904]/50 to-transparent" />
              </div>

              {/* Accent dots */}
              {[["-top-2","-right-2"],["-bottom-2","-left-2"]].map(([t,l],i) => (
                <div key={i}
                  className={`absolute ${t} ${l} w-3 h-3 rounded-full shadow-[0_0_12px_rgba(251,191,36,0.8)]`}
                  style={{ background: "linear-gradient(135deg,#fbbf24,#f97316)" }}
                />
              ))}
            </motion.div>
          ) : null}
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <FaChevronDown className="w-3.5 h-3.5 text-amber-400/35" />
      </motion.div>
    </section>
  );
}
