import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";

// ─── SCRAMBLED TEXT COMPONENT ────────────────────────────────────────────────
const ScrambledText = ({ text, delay = 0, duration = 1200 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    let active = true;
    const startTimeout = setTimeout(() => {
      let frame = 0;
      const totalFrames = duration / 30; // 30ms interval
      
      const interval = setInterval(() => {
        if (!active) return;
        const progress = frame / totalFrames;
        
        let result = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") {
            result += " ";
            continue;
          }
          const letterProgress = (i / text.length) * 0.45;
          if (progress > 0.4 + letterProgress) {
            result += text[i];
          } else {
            result += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        
        setDisplayedText(result);
        frame++;
        
        if (frame >= totalFrames) {
          setDisplayedText(text);
          clearInterval(interval);
        }
      }, 30);
    }, delay);

    return () => {
      active = false;
      clearTimeout(startTimeout);
    };
  }, [text, delay, duration]);

  return <span className="scrambled-text">{displayedText}</span>;
};

// ─── MAIN SPLASH SCREEN COMPONENT ────────────────────────────────────────────
export function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const canvasRef = useRef(null);
  
  const progressRef = useRef(0);
  const isExitingRef = useRef(false);

  // Sync state refs to read inside Three.js animate loops without trigger restarts
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    isExitingRef.current = isExiting;
  }, [isExiting]);

  // Asset Loading Counter Simulation
  useEffect(() => {
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 1200);

    const duration = 2800; // slightly longer loading time for premium cinematic feel
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const progressTimer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(progressTimer);
        setTimeout(() => {
          triggerExit();
        }, 500); // Allow camera flight to resolve before fadeout
      }
    }, intervalTime);

    return () => {
      clearTimeout(skipTimer);
      clearInterval(progressTimer);
    };
  }, []);

  // WebGL 3D Particle Galaxy inside Splash
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Detect mobile device
    const isMobile = window.innerWidth <= 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 4, 12); // Start far away
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !isMobile });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));

    // Galaxy Particle System Parameters (Dense: 3,500 particles for high-fidelity glow)
    const galaxyGeometry = new THREE.BufferGeometry();
    const particleCount = isMobile ? 1500 : 3500;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const maxRadius = 9;
    const numArms = 3;
    const spiralFactor = 2.2;

    const colorCore = new THREE.Color("#ffffff");      // Glowing hot white center
    const colorInside = new THREE.Color("#22d3ee");    // Cyan
    const colorOutside = new THREE.Color("#a855f7");   // Purple

    for (let i = 0; i < particleCount; i++) {
      const armIndex = i % numArms;
      const angle = (armIndex * 2 * Math.PI) / numArms;
      const r = Math.pow(Math.random(), 2.2) * maxRadius;
      const spiralAngle = angle + r * spiralFactor;
      
      const randomX = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.45) * r;
      const randomY = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.35) * r;
      const randomZ = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.45) * r;

      const px = Math.cos(spiralAngle) * r + randomX;
      const py = randomY; 
      const pz = Math.sin(spiralAngle) * r + randomZ;

      positions[i * 3] = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;

      const mixedColor = colorInside.clone();
      const ratio = r / maxRadius;
      mixedColor.lerp(colorOutside, ratio);

      if (r < maxRadius * 0.2) {
        mixedColor.lerp(colorCore, 1 - (r / (maxRadius * 0.2)));
      }

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    galaxyGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    galaxyGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const createDotTexture = () => {
      const size = 64;
      const c = document.createElement("canvas");
      c.width = size;
      c.height = size;
      const ctx = c.getContext("2d");
      
      const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1.0)");
      gradient.addColorStop(0.2, "rgba(34, 211, 238, 0.9)");
      gradient.addColorStop(0.5, "rgba(168, 85, 247, 0.4)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
      
      const t = new THREE.CanvasTexture(c);
      return t;
    };

    const galaxyMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.22 : 0.18,
      map: createDotTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });

    const galaxyPoints = new THREE.Points(galaxyGeometry, galaxyMaterial);
    scene.add(galaxyPoints);

    // Drifting starfield
    const starGeometry = new THREE.BufferGeometry();
    const starCount = isMobile ? 150 : 400;
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 35;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.06,
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const starfield = new THREE.Points(starGeometry, starMaterial);
    scene.add(starfield);

    // Parallax mouse variables
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }
    window.addEventListener("resize", handleResize, { passive: true });

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      galaxyPoints.rotation.y += 0.0022;

      // ─── STUNNING WARP SPEED CAMERA FLIGHT EFFECT ───
      const currentProgress = progressRef.current;
      const exiting = isExitingRef.current;

      if (exiting) {
        // Accelerate camera directly through the black hole stardust core!
        camera.position.z -= 0.38;
        camera.position.y += (0 - camera.position.y) * 0.12;
        camera.position.x += (0 - camera.position.x) * 0.12;
        galaxyPoints.rotation.y += 0.025; // Spin faster during warp transition
      } else {
        // Dynamic zoom-in based on load percent
        const zoomDepth = 12 - (currentProgress / 100) * 6.5; // smooth zoom from 12 to 5.5
        camera.position.z = zoomDepth + targetX * 1.5;
        camera.position.y = 4.0 - (currentProgress / 100) * 2.2 + targetY * 1.2; // sink from 4 to 1.8
        camera.position.x = Math.sin(Date.now() * 0.0004) * 1.2 + targetX * 1.5;
      }

      camera.lookAt(scene.position);

      starfield.rotation.y += 0.0003;
      starfield.rotation.x += 0.0001;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      window.removeEventListener("resize", handleResize);
      galaxyGeometry.dispose();
      galaxyMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  const triggerExit = () => {
    setIsExiting(true);
    // Wait for exit transition / camera zoom (850ms) before onComplete
    setTimeout(() => {
      onComplete();
    }, 850);
  };

  const handleSkip = () => {
    triggerExit();
  };

  // Get dynamic cyber status text
  const getLogStatus = () => {
    if (progress < 20) return "▶ INITIALIZING STARDUST CORE...";
    if (progress < 40) return "▶ MOUNTING THREE.JS GALAXY GRAPHICS...";
    if (progress < 60) return "▶ CALIBRATING DEEP LEARNING BCI NEUROSENSE MODALITY...";
    if (progress < 80) return "▶ SYNCING AQUACOMMAND REVENUE PREDICTORS...";
    if (progress < 99) return "▶ BUILDING DEVAKUMAR.A PORTFOLIO CORE ENVIRONMENT...";
    return "▶ SYSTEM READY. INITIATING WARP TRANSITION...";
  };

  return (
    <div className={`splash-overlay ${isExiting ? "exit-fade" : ""}`}>
      {/* WebGL Particle Background */}
      <canvas ref={canvasRef} className="splash-canvas" />

      {/* Sci-Fi Scanner Overlay */}
      <div className="splash-scan-line" />

      <div className="splash-container">
        
        {/* Name Title */}
        <h1 className="splash-title">
          <ScrambledText text="DEVAKUMAR A" duration={1400} />
        </h1>

        {/* HUD Loading Display */}
        <div className="splash-glass-card">
          <div className="splash-card-corners" />

          <div className="splash-counter-box">
            <div className="splash-percentage">
              {progress}<span>%</span>
            </div>
            
            <div className="splash-progress-track">
              <div 
                className="splash-progress-bar" 
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="splash-status-text">
              {getLogStatus()}
            </p>
          </div>
        </div>

        {/* Skip Button */}
        {showSkip && (
          <button className="splash-skip-btn" onClick={handleSkip}>
            SKIP INTRO ➔
          </button>
        )}

      </div>
    </div>
  );
}

export default SplashScreen;
