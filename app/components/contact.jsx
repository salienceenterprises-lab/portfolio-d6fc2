"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowRight } from "react-icons/fa";

const NAVY = "#0f172a";
const BLUE = "#2563eb";
const GREY = "#64748b";

export default function FintechContact({ data }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [focused, setFocused] = useState(null);

  const WEB3FORMS_KEY = data?.web3forms_key ?? "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio Contact from ${form.name}`,
          from_name: form.name,
          email: form.email,
          message: form.message,
          botcheck: "",
        }),
      });
      const r = await res.json();
      setStatus(r.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = (field) => ({
    width: "100%",
    background: "#ffffff",
    border: "1px solid",
    borderColor: focused === field ? BLUE : "#e2e8f0",
    color: NAVY,
    fontSize: "14px",
    padding: "12px 16px",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    fontFamily: "inherit",
    fontWeight: 400,
    boxSizing: "border-box",
    boxShadow: focused === field ? "0 0 0 3px rgba(37,99,235,0.08)" : "none",
  });

  const socials = [
    data?.github   && { icon: <FaGithub size={16} />,   href: data.github,            label: "GitHub" },
    data?.linkedin && { icon: <FaLinkedin size={16} />,  href: data.linkedin,          label: "LinkedIn" },
    data?.email    && { icon: <FaEnvelope size={16} />,  href: `mailto:${data.email}`, label: "Email" },
  ].filter(Boolean);

  return (
    <section id="contact" style={{
      background: "#ffffff",
      borderTop: "1px solid #e2e8f0",
    }}>
      <style>{`
        @media (max-width: 767px) {
          .ft-contact-inner { padding: 4rem 1.25rem 3rem !important; }
          .ft-contact-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
      {/* Top blue stripe */}
      <div style={{ height: "4px", background: `linear-gradient(90deg, ${BLUE}, #60a5fa)` }} />

      <div className="ft-contact-inner" style={{ maxWidth: "1280px", margin: "0 auto", padding: "7rem 2.5rem 5rem" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}
        >
          <span style={{ fontSize: "11px", fontWeight: 800, color: BLUE, textTransform: "uppercase", letterSpacing: "0.2em" }}>07</span>
          <div style={{ width: "40px", height: "2px", background: BLUE }} />
          <span style={{ fontSize: "11px", fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.18em" }}>Contact</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.05 }}
          style={{
            fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
            fontWeight: 900, color: NAVY,
            letterSpacing: "-0.04em", lineHeight: 1.05,
            margin: "0 0 5rem",
          }}
        >
          Let's Start a<br />
          <span style={{ color: BLUE }}>Conversation.</span>
        </motion.h2>

        <div className="ft-contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem" }}>
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
          >
            <p style={{ fontSize: "15px", color: GREY, lineHeight: 1.8, maxWidth: "380px", margin: "0 0 2.5rem", fontWeight: 400 }}>
              Open to full-time roles, strategic partnerships, and consulting engagements. I respond within 24 hours.
            </p>

            {data?.email && (
              <a href={`mailto:${data.email}`}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  fontSize: "14px", fontWeight: 600, color: NAVY,
                  textDecoration: "none", marginBottom: "2.5rem",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = BLUE}
                onMouseLeave={(e) => e.currentTarget.style.color = NAVY}
              >
                <FaArrowRight size={12} style={{ color: BLUE }} />
                {data.email}
              </a>
            )}

            {socials.length > 0 && (
              <div style={{ display: "flex", gap: "10px" }}>
                {socials.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    aria-label={s.label}
                    style={{
                      width: "42px", height: "42px",
                      border: "1px solid #e2e8f0",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: GREY, textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.color = BLUE; e.currentTarget.style.background = "rgba(37,99,235,0.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = GREY; e.currentTarget.style.background = "transparent"; }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right: form (only when web3forms key is configured) */}
          {WEB3FORMS_KEY && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
          >
            {status === "sent" ? (
              <div style={{
                border: `1px solid rgba(37,99,235,0.25)`,
                background: "rgba(37,99,235,0.03)",
                padding: "3rem", textAlign: "center",
              }}>
                <div style={{
                  width: "52px", height: "52px", background: BLUE,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1.5rem", fontSize: "22px", color: "#fff",
                }}>✓</div>
                <h3 style={{ fontSize: "18px", fontWeight: 800, color: NAVY, marginBottom: "0.5rem" }}>Message Sent</h3>
                <p style={{ fontSize: "13px", color: GREY }}>I'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "6px" }}>Full Name</label>
                  <input type="text" placeholder="Jane Smith" required
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                    style={inputStyle("name")} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "6px" }}>Email Address</label>
                  <input type="email" placeholder="jane@company.com" required
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                    style={inputStyle("email")} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "6px" }}>Message</label>
                  <textarea rows={4} placeholder="Tell me about the opportunity…" required
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                    style={{ ...inputStyle("message"), resize: "none" }} />
                </div>
                <button
                  type="submit" disabled={status === "sending"}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "10px",
                    background: status === "sending" ? GREY : BLUE,
                    color: "#fff", border: "none",
                    padding: "13px 32px", fontSize: "13px", fontWeight: 700,
                    letterSpacing: "0.04em", cursor: status === "sending" ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease", width: "fit-content",
                    boxShadow: status === "sending" ? "none" : "0 4px 16px rgba(37,99,235,0.25)",
                  }}
                  onMouseEnter={(e) => { if (status !== "sending") e.currentTarget.style.background = "#1d4ed8"; }}
                  onMouseLeave={(e) => { if (status !== "sending") e.currentTarget.style.background = BLUE; }}
                >
                  {status === "sending" ? "Sending…" : <>Send Message <FaArrowRight size={11} /></>}
                </button>
                {status === "error" && (
                  <p style={{ fontSize: "12px", color: "#ef4444", margin: 0 }}>Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </motion.div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginTop: "5rem", paddingTop: "2rem",
          borderTop: "1px solid #e2e8f0",
          flexWrap: "wrap", gap: "1rem",
        }}>
          <span style={{ fontSize: "12px", color: "#94a3b8" }}>
            © {new Date().getFullYear()} {data?.name} — All rights reserved
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "8px", height: "8px", background: BLUE }} />
            <span style={{ fontSize: "11px", color: "#94a3b8", letterSpacing: "0.1em", fontWeight: 600 }}>FINTECH</span>
          </div>
        </div>
      </div>
    </section>
  );
}
