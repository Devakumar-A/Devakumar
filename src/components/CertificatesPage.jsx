import React, { useState, useEffect } from "react";
import { certificatesData } from "../data/certificatesData";
import CertificateCard from "./CertificateCard";

export function CertificatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories for filtering
  const categories = ["All", ...new Set(certificatesData.map(c => c.category))];

  const filteredCertificates = selectedCategory === "All"
    ? certificatesData
    : certificatesData.filter(c => c.category === selectedCategory);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="certificates-page-container">
      {/* Museum Hero Header */}
      <section className="cert-hero">
        <h1>Certificates & Credentials</h1>
        <p>
          A curated museum of professional certifications across
          Artificial Intelligence, Data Science, Programming,
          Cloud, and Web Technologies.
        </p>

        {/* Categories filter controls for premium feel */}
        <div className="about-choices cert-filters" style={{ marginTop: "2rem" }}>
          {categories.map((category) => (
            <button
              key={category}
              className={`choice-btn ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Grid Display Area */}
      <section className="cert-museum" style={{ minHeight: "50vh" }}>
        {filteredCertificates.map((cert, index) => (
          <article 
            key={cert.id} 
            className="reveal active" 
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <CertificateCard
              title={cert.title}
              issuer={cert.issuer}
              image={cert.image}
              fallbackImage={cert.fallbackImage}
            />
          </article>
        ))}
      </section>
    </div>
  );
}
export default CertificatesPage;
