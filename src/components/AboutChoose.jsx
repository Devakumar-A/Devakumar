import React, { useState, useEffect, useRef } from "react";

const tabData = [
  {
    id: "think",
    label: "🧠 How I Think",
    title: "I Think in Systems",
    paragraphs: [
      "I break down complex problems, analyze patterns, and design scalable logic before touching code.",
      "AI is not magic — it’s structured thinking applied well."
    ],
    isQuote: false
  },
  {
    id: "build",
    label: "⚙️ What I Build",
    title: "I Build with Purpose",
    paragraphs: [
      "From AI-powered attendance systems to accessibility-focused apps, I build clean, modern, real-world solutions.",
      "Technology, design, and impact — together."
    ],
    isQuote: false
  },
  {
    id: "impact",
    label: "🚀 Why It Matters",
    title: "I Care About Impact",
    paragraphs: [
      "I don’t chase trends. I build things that make people’s lives easier."
    ],
    quote: "“Everything else is secondary.”",
    isQuote: true
  }
];

export function AboutChoose() {
  const [activeTab, setActiveTab] = useState(0);
  const touchStartRef = useRef(0);
  const swipeThreshold = 60;
  
  // Ref for audio element
  const audioRef = useRef(null);

  useEffect(() => {
    // Preload audio
    audioRef.current = new Audio("assets/sounds/ui-click.mp3");
    audioRef.current.volume = 0.25;
  }, []);

  const playFeedback = () => {
    // Mobile Haptic vibration
    if (navigator.vibrate) {
      try {
        navigator.vibrate(12);
      } catch (err) {}
    }

    // Play click sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const trackTabAnalytics = (tabId) => {
    try {
      const data = JSON.parse(localStorage.getItem("aboutAnalytics")) || {};
      data[tabId] = (data[tabId] || 0) + 1;
      localStorage.setItem("aboutAnalytics", JSON.stringify(data));
      console.log(`Analytics Tab View: ${tabId}`, data);
    } catch (e) {}
  };

  const activateTab = (index, userTriggered = false) => {
    setActiveTab(index);
    playFeedback();
    trackTabAnalytics(tabData[index].id);
  };

  // Auto rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabData.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [activeTab]); // reset timer on tab change

  // Touch handlers for mobile swipe gesture
  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartRef.current - e.changedTouches[0].clientX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left -> next tab
        activateTab((activeTab + 1) % tabData.length, true);
      } else {
        // Swipe right -> prev tab
        activateTab((activeTab - 1 + tabData.length) % tabData.length, true);
      }
    }
  };

  return (
    <section id="about" className="about-choose">
      <div className="about-shell">
        {/* Section Intro */}
        <div className="about-intro">
          <h2>More than just <span>code</span></h2>
          <p>Choose how you want to know me.</p>
        </div>

        {/* Tab Buttons */}
        <div className="about-choices">
          {tabData.map((tab, idx) => (
            <button
              key={tab.id}
              className={`choice-btn ${activeTab === idx ? "active" : ""}`}
              onClick={() => activateTab(idx, true)}
              data-target={tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Panels */}
        <div 
          className="about-panel"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {tabData.map((tab, idx) => (
            <div
              key={tab.id}
              className={`about-view ${activeTab === idx ? "active" : ""}`}
              style={{ display: activeTab === idx ? "block" : "none" }}
            >
              <h3>{tab.title}</h3>
              {tab.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className={pIdx > 0 ? "soft" : ""}>
                  {p}
                </p>
              ))}
              {tab.isQuote && <blockquote>{tab.quote}</blockquote>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default AboutChoose;
