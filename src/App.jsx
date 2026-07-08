import React, { useState, useEffect } from "react";
import Background3D from "./components/Background3D";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import CertificatesPage from "./components/CertificatesPage";
import FloatingActions from "./components/FloatingActions";
import SplashScreen from "./components/SplashScreen";

export function App() {
  const [currentPage, setCurrentPage] = useState("home"); // "home" or "certificates-museum"
  const [isSplashActive, setIsSplashActive] = useState(true);

  // Guarantee page starts at top after splash screen finishes loading
  useEffect(() => {
    if (!isSplashActive) {
      window.scrollTo(0, 0);
    }
  }, [isSplashActive]);

  // Function to smoothly scroll to elements
  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isSplashActive) {
    return (
      <SplashScreen 
        onComplete={() => {
          setIsSplashActive(false);
        }} 
      />
    );
  }

  return (
    <>
      {/* Interactive Three.js particle background — outside all transforms */}
      <Background3D />

      {/* Navigation — must be outside .portfolio-app so position:fixed
          anchors to the viewport (transforms break fixed positioning) */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        scrollToSection={scrollToSection}
      />

      {/* Floating Buttons & Chatbot Panel — same reason as Header */}
      <FloatingActions />

      <div className="portfolio-app animate-fadeIn">
        {/* Dynamic Main Views */}
        <main>
          {currentPage === "home" ? (
            <MainPage setCurrentPage={setCurrentPage} />
          ) : (
            <CertificatesPage />
          )}
        </main>
      </div>
    </>
  );
}
export default App;
