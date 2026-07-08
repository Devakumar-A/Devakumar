import React, { useState } from "react";
import TypingText from "./TypingText";
import AboutChoose from "./AboutChoose";
import ExperienceEducationSkills from "./ExperienceEducationSkills";
import ProjectsCarousel from "./ProjectsCarousel";
import ContactForm from "./ContactForm";
import Hero3DVisual from "./Hero3DVisual";
import { certificatesData } from "../data/certificatesData";

// Upgraded perfect-fit card for marquee track
function MarqueeCard({ title, issuer, image }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="cert-card marquee-item">
      <div className="cert-image-box marquee-img-box">
        {!imgFailed ? (
          <>
            {/* Blurred background image layer to fill empty gaps */}
            <img src={image} className="cert-blur-bg" alt="" aria-hidden="true" />
            {/* Main uncropped contained image */}
            <img
              src={image}
              className="cert-main-img"
              alt={title}
              onError={() => setImgFailed(true)}
            />
          </>
        ) : (
          /* Fallback template if image is missing */
          <div className="cert-fallback-display marquee-fallback">
            <span className="cert-fallback-icon" style={{ fontSize: "1.5rem" }}>📜</span>
            <span className="cert-fallback-label" style={{ fontSize: "0.8rem" }}>{issuer}</span>
          </div>
        )}
      </div>
      <h4>{title}</h4>
      <span>{issuer}</span>
    </div>
  );
}

export function MainPage({ setCurrentPage }) {
  // Get first 4 certificates for the showcase marquee
  const marqueeItems = certificatesData.slice(0, 4);
  // Duplicate elements for infinite smooth loop scroll effect
  const doubleMarqueeItems = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div className="main-page-sections">
      
      {/* 🚀 HERO SECTION */}
      <section id="home" className="hero-section">
        <div className="hero-container">
          
          {/* Left Avatar Column */}
          <div className="hero-left">
            <Hero3DVisual />
          </div>

          {/* Right Hero Card Column */}
          <div className="hero-right glass">
            <h1>Hi, I'm <span className="accent">Devakumar</span></h1>

            <h2 className="typing">
              <TypingText />
            </h2>

            <p className="hero-desc">
              Passionate about building intelligent systems, modern web experiences,
              and AI-powered applications with clean UI and real-world impact.
            </p>

            <h3 className="connect-title">Connect With Me</h3>

            <div className="connect-grid">
              <a href="https://github.com/Devakumar-A" className="connect-card github" target="_blank" rel="noopener noreferrer">
                <span className="icon">🐙</span>
                <span>GitHub</span>
              </a>

              <a href="https://linkedin.com" className="connect-card linkedin" target="_blank" rel="noopener noreferrer">
                <span className="icon">💼</span>
                <span>LinkedIn</span>
              </a>

              <a href="https://orcid.org/0009-0003-8934-6744" className="connect-card orcid" target="_blank" rel="noopener noreferrer">
                <span className="icon">🎓</span>
                <span>ORCiD</span>
              </a>

              <a href="https://devakumar-a.blogspot.com/2026/06/devakumar-computer-science-engineer.html" className="connect-card blog" target="_blank" rel="noopener noreferrer">
                <span className="icon">✍️</span>
                <span>Blog</span>
              </a>

              <a href="https://qr.ae/pFHgYY" className="connect-card quora" target="_blank" rel="noopener noreferrer">
                <span className="icon">🔴</span>
                <span>Quora</span>
              </a>

              <a href="https://instagram.com" className="connect-card instagram" target="_blank" rel="noopener noreferrer">
                <span className="icon">📸</span>
                <span>Instagram</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 🧠 ABOUT CHOOSE YOUR PATH SECTION */}
      <AboutChoose />

      {/* 💼 EXPERIENCE, EDUCATION & SKILLS SECTION */}
      <ExperienceEducationSkills />

      {/* ⚙️ PROJECTS CAROUSEL SECTION */}
      <ProjectsCarousel />

      {/* 📜 CERTIFICATIONS MARQUEE SECTION */}
      <section id="certifications" className="cert-section">
        <div className="cert-header">
          <h2>Certifications & <span>Credentials</span></h2>
          <p>
            Industry-recognized certifications across AI, Data Science,
            Programming, and Web Technologies.
          </p>
        </div>

        {/* Marquee glass container */}
        <div className="cert-frame">
          <div className="cert-marquee">
            <div className="cert-track">
              {doubleMarqueeItems.map((cert, index) => (
                <MarqueeCard
                  key={`${cert.id}-marquee-${index}`}
                  title={cert.title}
                  issuer={cert.issuer}
                  image={cert.image}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA to museum page */}
        <div className="cert-cta">
          <button 
            className="btn primary" 
            onClick={() => {
              setCurrentPage("certificates-museum");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            View All Certificates →
          </button>
        </div>
      </section>

      {/* 📩 CONTACT SECTION */}
      <ContactForm />

    </div>
  );
}
export default MainPage;
