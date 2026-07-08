import { useEffect, useRef } from "react";

export function use3DTilt(active = true) {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const element = elementRef.current;
    if (!element) return;

    let rect = null;

    const handleMove = (e) => {
      if (!rect) {
        rect = element.getBoundingClientRect();
      }

      // Handle touch or mouse events
      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);

      if (clientX === undefined || clientY === undefined) return;

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles (max tilt ~15 degrees)
      const rotateX = -(y - centerY) / (rect.height / 30);
      const rotateY = (x - centerX) / (rect.width / 30);

      element.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.04)
      `;
    };

    const handleLeave = () => {
      element.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
      `;
      rect = null;
    };

    // Desktop
    element.addEventListener("mousemove", handleMove);
    element.addEventListener("mouseleave", handleLeave);

    // Mobile touch
    element.addEventListener("touchmove", handleMove, { passive: true });
    element.addEventListener("touchend", handleLeave);

    return () => {
      element.removeEventListener("mousemove", handleMove);
      element.removeEventListener("mouseleave", handleLeave);
      element.removeEventListener("touchmove", handleMove);
      element.removeEventListener("touchend", handleLeave);
    };
  }, [active]);

  return elementRef;
}
export default use3DTilt;
