import React, { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";

export function Header({ currentPage, setCurrentPage, scrollToSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Effect 1 — lightweight passive scroll listener only for header glass state
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Effect 2 — async IntersectionObserver scroll spy (zero layout-thrashing)
  useEffect(() => {
    if (currentPage !== "home") {
      setActiveSection("certifications");
      return;
    }

    const sectionIds = ["home", "about", "experience", "education", "skills", "projects", "certifications", "contact"];
    // Track which sections are currently intersecting the top viewport band
    const inViewSet = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            inViewSet.add(entry.target.id);
          } else {
            inViewSet.delete(entry.target.id);
          }
        });
        // The active section is the LAST (furthest down the page) that is
        // currently visible inside the top 20% of the viewport band.
        const active = sectionIds.filter((id) => inViewSet.has(id)).pop() || "home";
        setActiveSection(active);
      },
      {
        // Detection zone: top 20% of the viewport only.
        // A section becomes "active" as soon as its leading edge enters that band.
        rootMargin: "0px 0px -80% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentPage]);

  const handleNavLinkClick = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (currentPage !== "home") {
      // Return to home first, then scroll
      setCurrentPage("home");
      // Delay to allow DOM to render
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      scrollToSection(sectionId);
    }
  };

  const handleCertificationsClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setCurrentPage("certificates-museum");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header id="header" className={`site-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container header-inner">
        {/* Mobile Menu Button (Hamburger) */}
        <button 
          className="menu-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Center/Left Logo */}
        <div className="logo" style={{ cursor: "pointer" }} onClick={(e) => handleNavLinkClick(e, "home")}>
          Dev<span>.</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          <a
            href="#home"
            className={currentPage === "home" && activeSection === "home" ? "active" : ""}
            onClick={(e) => handleNavLinkClick(e, "home")}
          >
            Home
          </a>
          <a
            href="#about"
            className={currentPage === "home" && activeSection === "about" ? "active" : ""}
            onClick={(e) => handleNavLinkClick(e, "about")}
          >
            About
          </a>
          <a
            href="#experience"
            className={currentPage === "home" && activeSection === "experience" ? "active" : ""}
            onClick={(e) => handleNavLinkClick(e, "experience")}
          >
            Experience
          </a>
          <a
            href="#experience"
            className={currentPage === "home" && activeSection === "education" ? "active" : ""}
            onClick={(e) => handleNavLinkClick(e, "experience")}
          >
            Education
          </a>
          <a
            href="#experience"
            className={currentPage === "home" && activeSection === "skills" ? "active" : ""}
            onClick={(e) => handleNavLinkClick(e, "experience")}
          >
            Skills
          </a>
          <a
            href="#projects"
            className={currentPage === "home" && activeSection === "projects" ? "active" : ""}
            onClick={(e) => handleNavLinkClick(e, "projects")}
          >
            Projects
          </a>
          <a
            href="#certifications"
            className={currentPage === "certificates-museum" || (currentPage === "home" && activeSection === "certifications") ? "active" : ""}
            onClick={(e) => handleNavLinkClick(e, "certifications")}
          >
            Certificates
          </a>
          <a
            href="#contact"
            className={currentPage === "home" && activeSection === "contact" ? "active" : ""}
            onClick={(e) => handleNavLinkClick(e, "contact")}
          >
            Contact
          </a>
        </nav>

        {/* Right Button: Resume */}
        <a 
          className="resume-btn" 
          href="assets/resume/Devakumar-A_Resume_Portfolio.pdf" 
          download="Devakumar-A_Resume_Portfolio.pdf"
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          <span>Resume</span>
          <Download size={14} />
        </a>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
        <a href="#home" onClick={(e) => handleNavLinkClick(e, "home")}>Home</a>
        <a href="#about" onClick={(e) => handleNavLinkClick(e, "about")}>About</a>
        <a href="#experience" onClick={(e) => handleNavLinkClick(e, "experience")}>Experience</a>
        <a href="#experience" onClick={(e) => handleNavLinkClick(e, "experience")}>Education</a>
        <a href="#experience" onClick={(e) => handleNavLinkClick(e, "experience")}>Skills</a>
        <a href="#projects" onClick={(e) => handleNavLinkClick(e, "projects")}>Projects</a>
        <a href="#certifications" onClick={handleCertificationsClick}>Certificates</a>
        <a href="#contact" onClick={(e) => handleNavLinkClick(e, "contact")}>Contact</a>
      </div>
    </header>
  );
}
export default Header;
