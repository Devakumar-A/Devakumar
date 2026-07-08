import React, { useState } from "react";
import use3DTilt from "../hooks/use3DTilt";

export function CertificateCard({ title, issuer, image, fallbackImage }) {
  const tiltRef = use3DTilt(true);
  const [imageSrc, setImageSrc] = useState(image);
  const [imgFailed, setImgFailed] = useState(false);

  const handleImageError = () => {
    if (fallbackImage && imageSrc !== fallbackImage) {
      // Try fallback path if provided
      setImageSrc(fallbackImage);
    } else {
      setImgFailed(true);
    }
  };

  return (
    <div ref={tiltRef} className="cert-card cert-frame-container">
      <div className="cert-image-box">
        {!imgFailed ? (
          <>
            {/* 1. Blurred background image layer to fill gaps (dual-layer design) */}
            <img 
              src={imageSrc} 
              className="cert-blur-bg" 
              alt="" 
              aria-hidden="true"
            />
            {/* 2. Main uncropped contained image */}
            <img
              src={imageSrc}
              className="cert-main-img"
              alt={title}
              onError={handleImageError}
            />
          </>
        ) : (
          /* Fallback elegant credential illustration if image doesn't exist */
          <div className="cert-fallback-display">
            <div className="cert-fallback-glow"></div>
            <span className="cert-fallback-icon">📜</span>
            <span className="cert-fallback-label">Verified Credential</span>
            <span className="cert-fallback-sub">{issuer}</span>
          </div>
        )}
      </div>

      <div className="cert-meta">
        <h4>{title}</h4>
        <span>{issuer}</span>
      </div>
    </div>
  );
}
export default CertificateCard;
