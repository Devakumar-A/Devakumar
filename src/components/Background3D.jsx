import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function Background3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Detect mobile / touch devices once at mount
    const isMobile = window.innerWidth <= 768 || ("ontouchstart" in window);

    // Helper to generate the original premium glowing stardust texture
    const createDotTexture = () => {
      const size = 64;
      const textureCanvas = document.createElement("canvas");
      textureCanvas.width = size;
      textureCanvas.height = size;
      const ctx = textureCanvas.getContext("2d");
      
      const gradient = ctx.createRadialGradient(
        size / 2, size / 2, 0,
        size / 2, size / 2, size / 2
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(34, 211, 238, 0.8)"); // Cyan tint core
      gradient.addColorStop(0.5, "rgba(168, 85, 247, 0.4)"); // Purple glow outer
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      // CanvasTexture (not Texture) is required for canvas sources.
      // THREE.Texture with a canvas triggers the WebGL texImage3D FLIP_Y warning.
      const texture = new THREE.CanvasTexture(textureCanvas);
      return texture;
    };

    // Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile, // skip antialias on mobile (GPU cost)
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Cap pixel ratio: mobile = 1.0 to avoid 4× fill-rate on retina screens
    renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 1) : Math.min(window.devicePixelRatio, 2));

    // Particle Geometry
    const starGeometry = new THREE.BufferGeometry();
    // Mobile: 1 200 particles keeps GPU comfortable; desktop keeps the full 3 500
    const starCount = isMobile ? 1200 : 3500;
    const positions = [];
    const colors = [];

    // Distribute stars in 3D space with original color options
    const colorOptions = [
      new THREE.Color(0x22d3ee), // Cyan
      new THREE.Color(0xa855f7), // Purple
      new THREE.Color(0xffffff)  // White
    ];

    for (let i = 0; i < starCount; i++) {
      positions.push(
        (Math.random() - 0.5) * 130,
        (Math.random() - 0.5) * 130,
        (Math.random() - 0.5) * 130
      );

      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors.push(color.r, color.g, color.b);
    }

    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    starGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );

    // Original star material config with size 1.5
    const starMaterial = new THREE.PointsMaterial({
      size: 1.5,
      map: createDotTexture(),
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Parallax Coordinates
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    let scrollY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    // On mobile, track viewport width so we can ignore height-only resize events
    // (caused by the browser URL bar appearing / disappearing during scroll).
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      // Skip height-only resize on mobile — it's just the URL bar toggling
      if (isMobile && currentWidth === lastWidth) return;
      lastWidth = currentWidth;
      camera.aspect = currentWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentWidth, window.innerHeight);
    };

    // Mouse parallax is meaningless (and costly) on touch-only devices
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse follow (no-op on mobile since targetX/Y stay 0)
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Scroll camera subtle parallax (does not fly completely out of the star field)
      const scrollOffset = scrollY * 0.0005;

      camera.position.x = targetX * 2.5;
      camera.position.y = targetY * 2.5 - scrollOffset * 0.1;
      camera.position.z = 6 - Math.min(scrollOffset * 0.2, 2.0); // max z shift capped at 2.0 so we never fly past the stars!
      camera.lookAt(scene.position);

      // Rotate star clouds
      stars.rotation.y += 0.0004 + (targetX * 0.0005);
      stars.rotation.x += 0.0002 + (targetY * 0.0003);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} id="bg-canvas"></canvas>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
    </>
  );
}

export default Background3D;
