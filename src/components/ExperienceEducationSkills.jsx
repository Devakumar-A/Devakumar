import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Code2, MapPin, Calendar, Award, X, ChevronRight } from "lucide-react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const experienceData = [
  {
    id: "exp-1",
    role: "Web Framework Intern",
    company: "Twilight IT Solution Pvt. Ltd.",
    duration: "Aug 2025",
    location: "Puducherry, On-site",
    icon: "🌐",
    highlights: [
      "Built and styled responsive web pages using HTML, CSS, and JavaScript.",
      "Developed dynamic, interactive UI components using React.js, improving component reusability.",
      "Applied modern frontend workflows in a live, production-style environment."
    ]
  },
  {
    id: "exp-2",
    role: "Backend Development Intern",
    company: "Askan Technologies",
    duration: "Jul 2025",
    location: "Puducherry, On-site",
    icon: "💻",
    highlights: [
      "Developed backend functionality using Node.js for server-side applications.",
      "Designed and managed databases with MongoDB and MongoDB Compass.",
      "Tested and debugged RESTful APIs using Postman, resolving issues prior to deployment."
    ]
  },
  {
    id: "exp-3",
    role: "Front-End Development Intern",
    company: "Cognifyz Technologies",
    duration: "Feb – Mar 2025",
    location: "Remote",
    icon: "🎨",
    highlights: [
      "Created responsive UIs using HTML, CSS, JavaScript, and Bootstrap.",
      "Collaborated directly with the design team through iterative feedback cycles to improve UX consistency."
    ]
  },
  {
    id: "exp-4",
    role: "President",
    company: "Mathoria Mathematics Club, RGCET",
    duration: "Mar 2025 – Jun 2026",
    location: "Puducherry, On-site",
    icon: "📐",
    highlights: [
      "Led planning and execution of academic events, competitions, and workshops for the club's student community.",
      "Mentored peer students in mathematical and analytical problem-solving.",
      "Built and shipped the club's management portal to digitize registration, events, and communication."
    ]
  }
];

const educationData = [
  {
    id: "edu-1",
    degree: "B.Tech — CSE",
    institution: "Rajiv Gandhi College of Engineering and Technology",
    duration: "2022 – 2026",
    location: "Puducherry",
    scoreType: "CGPA",
    scoreValue: "7.63",
    icon: "🎓"
  },
  {
    id: "edu-2",
    degree: "HSC (Higher Secondary)",
    institution: "Amalorpavam Higher Secondary School",
    duration: "2022",
    location: "Puducherry",
    scoreType: "Percentage",
    scoreValue: "82.8%",
    icon: "🏫"
  },
  {
    id: "edu-3",
    degree: "SSLC (Secondary School)",
    institution: "Amalorpavam Higher Secondary School",
    duration: "2020",
    location: "Puducherry",
    scoreType: "Percentage",
    scoreValue: "78.2%",
    icon: "✏️"
  }
];

const skillsData = [
  {
    id: "skill-1",
    category: "Languages",
    items: ["Python", "Java", "C", "C++", "JavaScript", "HTML", "CSS"],
    icon: "📜"
  },
  {
    id: "skill-2",
    category: "AI / ML",
    items: ["Keras", "Scikit-learn", "NumPy", "Pandas"],
    icon: "🧠"
  },
  {
    id: "skill-3",
    category: "Databases",
    items: ["MySQL", "PostgreSQL"],
    icon: "🗄️"
  },
  {
    id: "skill-4",
    category: "Tools",
    items: ["Git", "GitHub", "Postman", "Android Studio", "Firebase"],
    icon: "⚙️"
  },
  {
    id: "skill-5",
    category: "Soft Skills",
    items: ["Leadership", "Team Management", "Mentoring", "Communication", "Problem Solving"],
    icon: "🌟"
  }
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export function ExperienceEducationSkills() {
  const [activeNode, setActiveNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [mobileCategory, setMobileCategory] = useState("experience");

  // Disable background scrolling when node overlay details bottom sheet is open
  useEffect(() => {
    if (activeNode) {
      document.body.classList.add("scroll-locked");
      document.documentElement.classList.add("scroll-locked");
    } else {
      document.body.classList.remove("scroll-locked");
      document.documentElement.classList.remove("scroll-locked");
    }
    return () => {
      document.body.classList.remove("scroll-locked");
      document.documentElement.classList.remove("scroll-locked");
    };
  }, [activeNode]);

  // Constellation layout
  const experienceNodes = experienceData.map((d, i) => ({
    ...d,
    type: "experience",
    angle: (i * Math.PI) / 2.5 - Math.PI / 6
  }));

  const educationNodes = educationData.map((d, i) => ({
    ...d,
    type: "education",
    angle: (i * Math.PI) / 1.8 + Math.PI / 4
  }));

  const skillsNodes = skillsData.map((d, i) => ({
    ...d,
    type: "skills",
    angle: (i * Math.PI) / 2.8 + Math.PI / 1.2
  }));

  const allNodes = [...experienceNodes, ...educationNodes, ...skillsNodes];

  const handleNodeClick = (node) => setActiveNode(node);
  const handleClose = () => setActiveNode(null);

  // ─── BOTTOM-SHEET OVERLAY (Portal — matches Projects style) ───────────────
  const BottomSheetOverlay = () => {
    if (!activeNode) return null;
    const node = activeNode;
    const typeColors = {
      experience: "#22d3ee",
      education:  "#a855f7",
      skills:     "#34d399"
    };
    const accentColor = typeColors[node.type] || "#22d3ee";

    return createPortal(
      <div className="bottom-sheet-overlay">
        {/* Dark backdrop */}
        <motion.div
          className="bottom-sheet-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        />

        {/* Slide-up card */}
        <motion.div
          className="bottom-sheet-card glass ees-sheet"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          drag="y"
          dragConstraints={{ top: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.y > 150) handleClose();
          }}
        >
          {/* Drag handle */}
          <div className="bottom-sheet-drag-handle" />

          {/* Close button */}
          <button
            className="bottom-sheet-close"
            onClick={handleClose}
            aria-label="Close details"
          >
            <X size={20} />
          </button>

          <div className="bottom-sheet-scroll-body">

            {/* Coloured header band */}
            <div
              className="ees-sheet-header"
              style={{ borderBottom: `2px solid ${accentColor}33` }}
            >
              <span className="ees-sheet-icon">{node.icon}</span>
              <div className="ees-sheet-title-block">
                <span
                  className="modal-type-pill"
                  style={{ background: `${accentColor}22`, color: accentColor, border: `1px solid ${accentColor}44` }}
                >
                  {node.type.toUpperCase()}
                </span>
                <h3 className="ees-sheet-name">
                  {node.role || node.degree || node.category}
                </h3>
                {(node.company || node.institution) && (
                  <p className="ees-sheet-sub" style={{ color: accentColor }}>
                    {node.company || node.institution}
                  </p>
                )}
              </div>
            </div>

            {/* Meta pills */}
            <div className="sheet-details-content">
              {(node.duration || node.location || node.scoreValue) && (
                <div className="modal-meta-grid" style={{ marginBottom: "1.5rem" }}>
                  {node.duration && (
                    <div className="meta-pill">
                      <Calendar size={13} />
                      <span>{node.duration}</span>
                    </div>
                  )}
                  {node.location && (
                    <div className="meta-pill">
                      <MapPin size={13} />
                      <span>{node.location}</span>
                    </div>
                  )}
                  {node.scoreValue && (
                    <div className="meta-pill">
                      <Award size={13} />
                      <span>{node.scoreType}: <strong style={{ color: accentColor }}>{node.scoreValue}</strong></span>
                    </div>
                  )}
                </div>
              )}

              <hr className="sheet-separator" />

              {/* Highlights / bullet points */}
              {node.highlights && (
                <div className="text-section">
                  <h4><span className="icon">📋</span> Key Highlights</h4>
                  <ul className="ees-bullet-list">
                    {node.highlights.map((bullet, idx) => (
                      <li key={idx} style={{ "--accent-color": accentColor }}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills badge grid */}
              {node.items && (
                <div className="text-section">
                  <h4><span className="icon">⚙️</span> Capabilities</h4>
                  <div className="modal-skills-badges">
                    {node.items.map((skill, idx) => (
                      <span
                        key={idx}
                        className="skill-tag"
                        style={{
                          background: `${accentColor}12`,
                          borderColor: `${accentColor}33`,
                          color: accentColor
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </motion.div>
      </div>,
      document.body
    );
  };

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <section id="experience" className="journey-section">
      <div className="section-container journey-container">

        {/* Section Header */}
        <div className="journey-header">
          <h2>Experience, <span>Education &amp; Skills</span></h2>
          <p>Click on any stellar node below to explore my career pathway, academic history, and technical ecosystem.</p>
        </div>

        {/* =====================================================
           DESKTOP VIEW: CONSTELLATION NODE MAP
        ===================================================== */}
        <div className="desktop-constellation-container">
          <div className="constellation-sky">

            {/* Center Core Node */}
            <div className="constellation-core-wrapper">
              <motion.div
                className="constellation-core"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(34,211,238,0.4)",
                    "0 0 40px rgba(168,85,247,0.6)",
                    "0 0 20px rgba(34,211,238,0.4)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span>🚀</span>
                <h4>DEVAKUMAR A</h4>
              </motion.div>
            </div>

            {/* Orbit paths & Interactive nodes */}
            <svg className="constellation-svg" viewBox="0 0 800 500">
              <defs>
                <linearGradient id="cyan-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Orbital Rings */}
              <circle cx="400" cy="250" r="95"  fill="none" stroke="url(#cyan-purple)" strokeWidth="1.5" strokeDasharray="5,5" />
              <circle cx="400" cy="250" r="155" fill="none" stroke="url(#cyan-purple)" strokeWidth="1"   strokeDasharray="8,8" />
              <circle cx="400" cy="250" r="215" fill="none" stroke="url(#cyan-purple)" strokeWidth="0.5" />

              {/* Connection lines */}
              {allNodes.map((node, idx) => {
                const orbitRadius = node.type === "experience" ? 95 : (node.type === "education" ? 155 : 215);
                const nx = 400 + orbitRadius * Math.cos(node.angle);
                const ny = 250 + orbitRadius * Math.sin(node.angle);
                const isHovered = hoveredNode?.id === node.id || activeNode?.id === node.id;
                return (
                  <g key={`line-${idx}`}>
                    <motion.line
                      x1="400" y1="250"
                      x2={nx} y2={ny}
                      stroke={isHovered ? "url(#cyan-purple)" : "rgba(255,255,255,0.06)"}
                      strokeWidth={isHovered ? 2.5 : 1}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5 }}
                      filter={isHovered ? "url(#glow)" : "none"}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Absolute Position Nodes */}
            {allNodes.map((node, idx) => {
              const orbitRadius = node.type === "experience" ? 95 : (node.type === "education" ? 155 : 215);
              const nx = 400 + orbitRadius * Math.cos(node.angle);
              const ny = 250 + orbitRadius * Math.sin(node.angle);
              const isHovered = hoveredNode?.id === node.id;
              const isActive  = activeNode?.id  === node.id;
              return (
                <div
                  key={node.id}
                  className="constellation-node-wrapper"
                  style={{
                    left: `${nx}px`,
                    top:  `${ny}px`,
                    position: "absolute",
                    transform: "translate(-50%, -50%)",
                    zIndex: isHovered || isActive ? 10 : 3
                  }}
                >
                  <motion.button
                    className={`node-button ${node.type} ${isHovered ? "hovered" : ""} ${isActive ? "active" : ""}`}
                    onClick={() => handleNodeClick(node)}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    whileHover={{ scale: 1.25 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ scale: { duration: 3 + idx * 0.5, repeat: Infinity, ease: "easeInOut" } }}
                    aria-label={`Open details for ${node.role || node.degree || node.category}`}
                  >
                    <span className="node-icon">{node.icon}</span>
                  </motion.button>
                  <div className="node-label-badge">
                    {node.type === "experience" ? node.company.split(" ")[0] : (node.type === "education" ? node.degree.split(" ")[0] : node.category)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Side HUD Quick Preview */}
          <div className="constellation-side-hud glass">
            <h3 className="hud-title">🌟 SYSTEM DIRECTORY</h3>
            <AnimatePresence mode="wait">
              {hoveredNode || activeNode ? (
                <motion.div
                  key={hoveredNode?.id || activeNode?.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="hud-active-content"
                >
                  <div className="hud-type-pill">{(hoveredNode?.type || activeNode?.type).toUpperCase()}</div>
                  <h4 className="hud-header">
                    {hoveredNode?.role || hoveredNode?.degree || hoveredNode?.category || activeNode?.role || activeNode?.degree || activeNode?.category}
                  </h4>
                  <p className="hud-sub">
                    {hoveredNode?.company || hoveredNode?.institution || activeNode?.company || activeNode?.institution}
                  </p>
                  <div className="hud-stats">
                    <span className="hud-stat"><Calendar size={13} /> {hoveredNode?.duration || activeNode?.duration || "Current Skills"}</span>
                    <span className="hud-stat"><MapPin size={13} /> {hoveredNode?.location || activeNode?.location || "Ecosystem"}</span>
                  </div>
                  <p className="hud-helper-click">Click node to expand details</p>
                </motion.div>
              ) : (
                <div className="hud-idle-content">
                  <div className="hud-pulse-ring"></div>
                  <p>Hover over any orbital node to scan parameters.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* =====================================================
           MOBILE VIEW: INTERACTIVE DIAL / ACCORDION
        ===================================================== */}
        <div className="mobile-journey-container">
          <div className="mobile-hud-dial">
            <button className={`dial-btn ${mobileCategory === "experience" ? "active" : ""}`} onClick={() => setMobileCategory("experience")}>
              💼 Exp
            </button>
            <button className={`dial-btn ${mobileCategory === "education" ? "active" : ""}`} onClick={() => setMobileCategory("education")}>
              🎓 Edu
            </button>
            <button className={`dial-btn ${mobileCategory === "skills" ? "active" : ""}`} onClick={() => setMobileCategory("skills")}>
              ⚙️ Skills
            </button>
          </div>

          <div className="mobile-hud-content">
            <AnimatePresence mode="wait">
              {mobileCategory === "experience" && (
                <motion.div key="mob-exp" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="mobile-category-list">
                  {experienceData.map((item) => (
                    <div key={item.id} className="mobile-hud-card glass" onClick={() => handleNodeClick({ ...item, type: "experience" })}>
                      <div className="card-top">
                        <span className="card-icon">{item.icon}</span>
                        <div className="card-titles">
                          <h4>{item.role}</h4>
                          <span className="card-comp">{item.company}</span>
                        </div>
                        <ChevronRight size={18} className="arrow-reveal" />
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
              {mobileCategory === "education" && (
                <motion.div key="mob-edu" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="mobile-category-list">
                  {educationData.map((item) => (
                    <div key={item.id} className="mobile-hud-card glass" onClick={() => handleNodeClick({ ...item, type: "education" })}>
                      <div className="card-top">
                        <span className="card-icon">{item.icon}</span>
                        <div className="card-titles">
                          <h4>{item.degree}</h4>
                          <span className="card-comp">{item.institution}</span>
                        </div>
                        <ChevronRight size={18} className="arrow-reveal" />
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
              {mobileCategory === "skills" && (
                <motion.div key="mob-skill" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="mobile-category-list">
                  {skillsData.map((cat) => (
                    <div key={cat.id} className="mobile-hud-card glass" onClick={() => handleNodeClick({ ...cat, type: "skills" })}>
                      <div className="card-top">
                        <span className="card-icon">{cat.icon}</span>
                        <div className="card-titles">
                          <h4>{cat.category}</h4>
                          <span className="card-comp">{cat.items.join(", ")}</span>
                        </div>
                        <ChevronRight size={18} className="arrow-reveal" />
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* =====================================================
         BOTTOM-SHEET DETAILS OVERLAY (Portal)
      ===================================================== */}
      <AnimatePresence>
        {activeNode && <BottomSheetOverlay />}
      </AnimatePresence>
    </section>
  );
}

export default ExperienceEducationSkills;

