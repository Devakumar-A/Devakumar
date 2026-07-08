import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause, Eye, X, BookOpen } from "lucide-react";
import use3DTilt from "../hooks/use3DTilt";
import { projectsData } from "../data/projectsData";

// Custom inline SVG GitHub Icon to bypass missing brand icons in Lucide v1.x
function Github({ size = 15 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      stroke="currentColor"
      fill="none"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

// Inner ProjectCard component to handle 3D hover tilt isolatedly
function ProjectCard({ project, isActive, onViewDetails }) {
  const tiltRef = use3DTilt(isActive);
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div
      ref={tiltRef}
      className={`project-card ${isActive ? "active" : ""}`}
    >
      <div className="project-image" style={{ position: "relative" }}>
        <span className="project-tag-pill">{project.id === 1 ? "🏆 Flagship" : "💻 Project"}</span>
        {!imgFailed ? (
          <img 
            src={project.projectImages?.[0] || "assets/projects/drone.png"} 
            alt={project.title} 
            onError={() => setImgFailed(true)}
            loading="lazy"
          />
        ) : (
          <div className="project-image-fallback">💻</div>
        )}
      </div>
      <h3>{project.title}</h3>
      <span className="project-tech-badges">{project.technologyStack}</span>

      <div className="project-buttons">
        <a 
          href={project.githubUrl} 
          className="project-github-btn" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label={`View GitHub repository for ${project.title}`}
        >
          <Github size={14} />
          <span>GitHub</span>
        </a>
        <button 
          className="project-details-btn" 
          onClick={onViewDetails}
          aria-label={`Open details bottom sheet for ${project.title}`}
        >
          <Eye size={14} />
          <span>Details</span>
        </button>
      </div>
    </div>
  );
}

export function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [trackOffset, setTrackOffset] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const viewportRef = useRef(null);
  const sectionRef = useRef(null);
  const touchStartRef = useRef(0);
  const transitioningRef = useRef(false);
  const progressIntervalRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const duration = 4500; // 4.5 seconds per slide
  const swipeThreshold = 60;

  // Next and Prev handlers with animation locking
  const handleNext = useCallback(() => {
    if (transitioningRef.current) return;
    transitioningRef.current = true;
    
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
    setProgress(0);
    
    setTimeout(() => {
      transitioningRef.current = false;
    }, 600);
  }, []);

  const handlePrev = useCallback(() => {
    if (transitioningRef.current) return;
    transitioningRef.current = true;
    
    setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
    setProgress(0);
    
    setTimeout(() => {
      transitioningRef.current = false;
    }, 600);
  }, []);

  // Intersection Observer to trigger autoplay only when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          // Always reset to Project 1 (index 0) upon entering
          setCurrentIndex(0);
          setProgress(0);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Autoplay progression timer
  useEffect(() => {
    if (!isSectionVisible || isPaused || selectedProject) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const step = 50; // increment every 50ms
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + (step / duration) * 100;
      });
    }, step);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isSectionVisible, isPaused, selectedProject, handleNext]);

  // Page Visibility API support
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedProject) return; // ignore when details sheet is open
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, handleNext, handlePrev]);

  // Calculate center track translation offset
  const calculateOffset = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const viewportWidth = viewport.offsetWidth;
    const cardWidth = window.innerWidth <= 768 ? 280 : 340;
    const gap = 40; // match 2.5rem css gap

    const newOffset = (viewportWidth / 2) - (cardWidth / 2) - currentIndex * (cardWidth + gap);
    setTrackOffset(newOffset);
  }, [currentIndex]);

  useEffect(() => {
    calculateOffset();
    window.addEventListener("resize", calculateOffset, { passive: true });
    return () => window.removeEventListener("resize", calculateOffset);
  }, [calculateOffset]);

  // Swipe support for mobile touch screens
  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Manage body scale-down and blur on open
  useEffect(() => {
    const appContainer = document.querySelector(".portfolio-app");
    if (!appContainer) return;

    if (selectedProject) {
      appContainer.style.transform = "scale(0.965)";
      appContainer.style.filter = "blur(6px)";
      appContainer.style.pointerEvents = "none";
      document.body.classList.add("scroll-locked");
      document.documentElement.classList.add("scroll-locked");
    } else {
      appContainer.style.transform = "none";
      appContainer.style.filter = "none";
      appContainer.style.pointerEvents = "auto";
      document.body.classList.remove("scroll-locked");
      document.documentElement.classList.remove("scroll-locked");
    }

    return () => {
      appContainer.style.transform = "none";
      appContainer.style.filter = "none";
      appContainer.style.pointerEvents = "auto";
      document.body.classList.remove("scroll-locked");
      document.documentElement.classList.remove("scroll-locked");
    };
  }, [selectedProject]);

  return (
    <section id="projects" ref={sectionRef}>
      <h2 className="section-title">Creations</h2>

      <div className="projects-carousel">
        {/* Left Arrow Button */}
        <button 
          className="carousel-btn prev" 
          onClick={handlePrev}
          aria-label="Previous project"
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Viewport */}
        <div 
          ref={viewportRef}
          className="carousel-viewport"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Track */}
          <div
            className="carousel-track"
            style={{
              transform: `translateX(${trackOffset}px)`
            }}
          >
            {projectsData.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                isActive={index === currentIndex}
                onViewDetails={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>

        {/* Right Arrow Button */}
        <button 
          className="carousel-btn next" 
          onClick={handleNext}
          aria-label="Next project"
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Media Player HUD Controls */}
      <div className="carousel-hud-console glass">
        <div className="hud-buttons">
          <button onClick={handlePrev} aria-label="Previous Project">
            <ChevronLeft size={16} />
          </button>
          
          <button 
            className="hud-play-pause" 
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? "Resume Autoplay" : "Pause Autoplay"}
          >
            {isPaused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
            <span>{isPaused ? "Resume" : "Pause"}</span>
          </button>

          <button onClick={handleNext} aria-label="Next Project">
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Dynamic Progress indicator bar */}
        <div className="hud-progress-container">
          <div 
            className="hud-progress-bar" 
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="hud-indicators">
          {projectsData.map((_, idx) => (
            <button
              key={idx}
              className={`hud-indicator ${idx === currentIndex ? "active" : ""}`}
              onClick={() => {
                if (transitioningRef.current) return;
                setCurrentIndex(idx);
                setProgress(0);
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* =====================================================
         APPLE-INSPIRED PREMIUM BOTTOM SHEET DETAILS OVERLAY
         Rendered in React Portal to prevent parent blur filter leakage
      ===================================================== */}
      {selectedProject && createPortal(
        <div className="bottom-sheet-overlay">
          {/* Dark blur backdrop */}
          <motion.div 
            className="bottom-sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          />

          {/* Bottom Sheet Container */}
          <motion.div 
            className="bottom-sheet-card glass"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              // If dragged down past threshold (150px), close details
              if (info.offset.y > 150) {
                setSelectedProject(null);
              }
            }}
          >
            {/* Drag Handle Indicator */}
            <div className="bottom-sheet-drag-handle" />

            {/* Close Button */}
            <button 
              className="bottom-sheet-close" 
              onClick={() => setSelectedProject(null)}
              aria-label="Close details"
            >
              <X size={20} />
            </button>

            <div className="bottom-sheet-scroll-body">
              {/* Header Parallax Image */}
              <div className="sheet-image-parallax">
                <img src={selectedProject.projectImages?.[0] || "assets/projects/drone.png"} alt={selectedProject.title} />
                <div className="sheet-image-overlay" />
                <div className="sheet-title-meta">
                  <span className="modal-type-pill">{selectedProject.id === 1 ? "🏆 Flagship" : "💻 Project"}</span>
                  <h3>{selectedProject.title}</h3>
                </div>
              </div>

              {/* Staggered text reveal details */}
              <div className="sheet-details-content">
                
                {/* Grid stats */}
                <div className="sheet-stats-row">
                  <div className="stat-box">
                    <label>Technology Stack</label>
                    <p>{selectedProject.technologyStack}</p>
                  </div>
                </div>

                <hr className="sheet-separator" />

                {/* Body highlights matching exactly required structure */}
                <div className="sheet-text-layout">
                  
                  <div className="text-section">
                    <h4><span className="icon">📄</span> Short Description</h4>
                    <p>{selectedProject.shortDescription}</p>
                  </div>

                  {selectedProject.publication && (
                    <div className="text-section">
                      <h4><span className="icon">📖</span> Research Publication</h4>
                      <p style={{ whiteSpace: "pre-line" }}>{selectedProject.publication}</p>
                    </div>
                  )}

                  <div className="text-section">
                    <h4><span className="icon">💡</span> Problem Statement</h4>
                    <p>{selectedProject.problemStatement}</p>
                  </div>

                  <div className="text-section">
                    <h4><span className="icon">🛠️</span> Solution</h4>
                    <p>{selectedProject.solution}</p>
                  </div>

                  <div className="text-section">
                    <h4><span className="icon">⚙️</span> Architecture</h4>
                    <p style={{ whiteSpace: "pre-line" }}>{selectedProject.architecture}</p>
                  </div>

                  {selectedProject.methodology && (
                    <div className="text-section">
                      <h4><span className="icon">🔬</span> Methodology</h4>
                      <p style={{ whiteSpace: "pre-line" }}>{selectedProject.methodology}</p>
                    </div>
                  )}

                  {selectedProject.datasetsUsed && (
                    <div className="text-section">
                      <h4><span className="icon">📊</span> Datasets Used</h4>
                      <p style={{ whiteSpace: "pre-line" }}>{selectedProject.datasetsUsed}</p>
                    </div>
                  )}

                  {selectedProject.experimentalResults && (
                    <div className="text-section">
                      <h4><span className="icon">📈</span> Experimental Results</h4>
                      <p style={{ whiteSpace: "pre-line" }}>{selectedProject.experimentalResults}</p>
                    </div>
                  )}

                  <div className="text-section">
                    <h4><span className="icon">🌟</span> Key Features</h4>
                    <p style={{ whiteSpace: "pre-line" }}>{selectedProject.keyFeatures}</p>
                  </div>

                  <div className="text-section">
                    <h4><span className="icon">⚠️</span> Challenges Faced</h4>
                    <p>{selectedProject.challengesFaced}</p>
                  </div>

                  <div className="text-section">
                    <h4><span className="icon">🙋‍♂️</span> My Contributions</h4>
                    <p>{selectedProject.myContributions}</p>
                  </div>

                  <div className="text-section">
                    <h4><span className="icon">🔮</span> Future Improvements</h4>
                    <p style={{ whiteSpace: "pre-line" }}>{selectedProject.futureImprovements}</p>
                  </div>

                </div>

              </div>
            </div>
          </motion.div>
        </div>,
        document.body
      )}
    </section>
  );
}

export default ProjectsCarousel;
