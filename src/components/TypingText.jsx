import React, { useState, useEffect } from "react";

const roles = [
  "AI & ML Enthusiast",
  "Web Developer",
  "Data Analyst",
  "Data Science Learner"
];

export function TypingText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      // Deleting state
      timer = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
      }, 50);
    } else {
      // Typing state
      timer = setTimeout(() => {
        setDisplayedText((prev) => currentRole.slice(0, prev.length + 1));
      }, 90);
    }

    // Handle state transitions
    if (!isDeleting && displayedText === currentRole) {
      // Fully typed, wait then delete
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1200);
    } else if (isDeleting && displayedText === "") {
      // Fully deleted, move to next role
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  return <span id="typing-text">{displayedText}</span>;
}
export default TypingText;
