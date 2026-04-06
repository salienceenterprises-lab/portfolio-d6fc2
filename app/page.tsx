"use client";
import React from "react";
import portfolioData from "../profile.json";
import FintechNav from "./components/nav";
import FintechHero from "./components/hero";
import FintechAbout from "./components/about";
import FintechEducation from "./components/education";
import FintechExperience from "./components/experience";
import FintechProjects from "./components/projects";
import FintechSkills from "./components/skills";
import FintechCommunity from "./components/community";
import FintechContact from "./components/contact";

export default function DeployedPortfolio() {
  const data = portfolioData;

  if (!data) return (
    <div style={{
      minHeight: "100vh", background: "#f8fafc",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <span style={{ fontSize: "12px", color: "#94a3b8", letterSpacing: "0.2em", textTransform: "uppercase" }}>
        Loading…
      </span>
    </div>
  );

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        ::placeholder { color: #cbd5e1; }
        textarea { resize: none; }
        @media (max-width: 1023px) {
          .ft-two-col { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 767px) {
          section > div { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
        }
      `}</style>

      <FintechNav data={data} />
      <FintechHero data={data} />
      <FintechAbout data={data} />
      <FintechEducation data={data} />
      <FintechExperience data={data} />
      <FintechProjects data={data} />
      <FintechSkills data={data} />
      <FintechCommunity data={data} />
      <FintechContact data={data} />
    </div>
  );
}
