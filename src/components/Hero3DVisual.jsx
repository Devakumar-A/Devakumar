import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function Hero3DVisual() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const getVisualSize = () => {
      if (typeof window === "undefined") return 420;
      if (window.innerWidth <= 480) return 250;
      if (window.innerWidth <= 900) return 300;
      return 420;
    };
    let size = getVisualSize();

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 4.2;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Orbital Ring and Swirling Particles
    const orbitalGroup = new THREE.Group();
    scene.add(orbitalGroup);

    // Create glowing particles
    const particleCount = 200;
    const particlePositions = [];
    const particleSpeeds = [];
    const particleRadii = [];
    const particleAngles = [];

    for (let i = 0; i < particleCount; i++) {
      const r = 1.2 + Math.random() * 0.7; // orbit radius
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * 0.3; // flat disk profile

      particleRadii.push(r);
      particleAngles.push(theta);
      particleSpeeds.push(0.003 + Math.random() * 0.006);

      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.sin(theta) * Math.cos(phi);

      particlePositions.push(x, y, z);
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(particlePositions, 3)
    );

    // Glow dot texture helper
    const createDot = () => {
      const c = document.createElement("canvas");
      c.width = 32;
      c.height = 32;
      const cx = c.getContext("2d");
      const gradient = cx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(34, 211, 238, 1)");
      gradient.addColorStop(0.3, "rgba(168, 85, 247, 0.5)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      cx.fillStyle = gradient;
      cx.fillRect(0, 0, 32, 32);
      // CanvasTexture (not Texture) is required for canvas sources.
      // THREE.Texture triggers the WebGL texImage3D FLIP_Y invalid op warning.
      const t = new THREE.CanvasTexture(c);
      return t;
    };

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x22d3ee,
      size: 0.12,
      map: createDot(),
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });

    const points = new THREE.Points(particleGeometry, particleMaterial);
    orbitalGroup.add(points);

    // Glowing Neon Ring 1 (Cyan)
    const ring1Geom = new THREE.RingGeometry(1.25, 1.28, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    ring1.rotation.x = Math.PI / 2.3;
    ring1.rotation.y = Math.PI / 10;
    orbitalGroup.add(ring1);

    // Glowing Neon Ring 2 (Purple)
    const ring2Geom = new THREE.RingGeometry(1.35, 1.37, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.x = Math.PI / 2.6;
    ring2.rotation.y = -Math.PI / 8;
    orbitalGroup.add(ring2);

    // Mouse hover parallax rotation
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX = x * 0.003;
      mouseY = y * 0.003;
    };

    const handleResize = () => {
      const newSize = getVisualSize();
      if (newSize !== size) {
        size = newSize;
        renderer.setSize(size, size);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.08;
      targetY += (mouseY - targetY) * 0.08;

      orbitalGroup.rotation.y = targetX * 1.5;
      orbitalGroup.rotation.x = targetY * 1.5;
      orbitalGroup.rotation.z += 0.0015;

      ring1.rotation.z -= 0.003;
      ring2.rotation.z += 0.002;

      // Slight breathing scaling
      const time = Date.now() * 0.001;
      const scale = 1.0 + Math.sin(time * 2.0) * 0.02;
      ring1.scale.set(scale, scale, scale);
      ring2.scale.set(scale * 0.98, scale * 0.98, scale * 0.98);

      // Animate particle coordinates
      const posArray = particleGeometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        particleAngles[i] += particleSpeeds[i];
        const r = particleRadii[i];
        const theta = particleAngles[i];

        posArray[i * 3] = r * Math.cos(theta);
        posArray[i * 3 + 2] = r * Math.sin(theta);
      }
      particleGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      particleGeometry.dispose();
      particleMaterial.dispose();
      ring1Geom.dispose();
      ring1Mat.dispose();
      ring2Geom.dispose();
      ring2Mat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="hero-avatar-wrapper">
      {/* 3D Swirling Rings Background */}
      <div 
        ref={mountRef} 
        className="hero-avatar-canvas"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 1,
          pointerEvents: "none"
        }}
      />
      {/* High-res HTML Profile Photo in Foreground */}
      <div className="hero-avatar-photo-frame">
        <img 
          src="assets/images/profile/Profile.PNG" 
          alt="Devakumar A Profile" 
          className="hero-avatar-img" 
        />
      </div>
    </div>
  );
}
export default Hero3DVisual;
