import React, { useState, useEffect, useRef } from "react";
import { chatbotKnowledge } from "../data/chatbotKnowledge";

export function Chatbot({ isOpen, setIsOpen }) {
  const [messages, setMessages] = useState([
    {
      id: "init",
      sender: "bot",
      text: "👋 Hi! I’m Devakumar’s AI assistant. Ask me about his projects, skills, certifications, or career goals.",
      isComplete: true
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto scroll to bottom without jumping page scroll
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Setup Web Speech API for voice recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (e) => {
        const text = e.results[0][0].transcript;
        setInputValue(text);
        handleSendVoice(text);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [messages]);

  // ── Advanced NLP-style keyword matching ──────────────────────
  const getBotReply = (userMessage) => {
    // 1. Normalise: lowercase, expand contractions, strip punctuation
    const normalise = (str) =>
      str
        .toLowerCase()
        .replace(/['']/g, "'")
        .replace(/you're/g, "you are")
        .replace(/what's/g, "what is")
        .replace(/who's/g, "who is")
        .replace(/i'm/g, "i am")
        .replace(/don't/g, "do not")
        .replace(/can't/g, "cannot")
        .replace(/won't/g, "will not")
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const msg = normalise(userMessage);
    const msgTokens = msg.split(" ");

    let bestMatch = null;
    let highestScore = 0;

    chatbotKnowledge.forEach((item) => {
      let score = 0;

      item.keywords.forEach((keyword) => {
        const kw = keyword.toLowerCase();

        // Full phrase match — highest value
        if (msg.includes(kw)) {
          score += kw.split(" ").length * 2; // multi-word phrases score higher
          return;
        }

        // Token-level partial match
        const kwTokens = kw.split(" ");
        kwTokens.forEach((kwToken) => {
          msgTokens.forEach((msgToken) => {
            if (msgToken === kwToken) {
              score += 1; // exact token match
            } else if (msgToken.length > 3 && kwToken.length > 3) {
              // Prefix match for partial words (handles typos like "certif" → "certification")
              if (msgToken.startsWith(kwToken.slice(0, 4)) || kwToken.startsWith(msgToken.slice(0, 4))) {
                score += 0.5;
              }
            }
          });
        });
      });

      // Weight by priority
      const weighted = score * item.priority;

      if (weighted > highestScore) {
        highestScore = weighted;
        bestMatch = item;
      }
    });

    // Minimum confidence threshold
    if (bestMatch && highestScore >= item_priority_threshold(bestMatch)) {
      return bestMatch.reply;
    }

    // Smart fallback with topic suggestions
    return `🤔 I'm not sure I caught that — could you rephrase?

Here are things I know about:
• Say **"projects"** to see all projects
• Say **"skills"** for technical expertise
• Say **"internship"** for work experience
• Say **"education"** for academic background
• Say **"certifications"** for credentials
• Say **"research"** for the Scopus publication
• Say **"contact"** to get in touch with Devakumar

Or try: *"Tell me about NeuroSense"*, *"What tech stack does he use?"*, *"How to hire Devakumar?"* 😊`;
  };

  // Minimum score threshold — low-priority intents need more evidence
  const item_priority_threshold = (item) => item.priority * 0.8;

  const typeWriterMessage = (fullText) => {
    const messageId = Date.now().toString();
    
    // Add an empty message
    setMessages((prev) => [
      ...prev,
      { id: messageId, sender: "bot", text: "", isComplete: false }
    ]);

    let i = 0;
    const speed = 15; // characters per millisecond

    const interval = setInterval(() => {
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === messageId) {
            return {
              ...msg,
              text: fullText.substring(0, i + 1),
              isComplete: i + 1 >= fullText.length
            };
          }
          return msg;
        })
      );
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
      }
    }, speed);
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;

    // Add User Message
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString() + "-user", sender: "user", text, isComplete: true }
    ]);
    setInputValue("");
    setIsTyping(true);

    // Get reply & type it out after typing delay
    setTimeout(() => {
      setIsTyping(false);
      const reply = getBotReply(text);
      typeWriterMessage(reply);
    }, 600);
  };

  const handleSendVoice = (text) => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString() + "-user", sender: "user", text, isComplete: true }
    ]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply = getBotReply(text);
      typeWriterMessage(reply);
    }, 600);
  };

  const toggleListen = () => {
    if (!recognitionRef.current) {
      alert("Voice input is not supported in this browser. Try Google Chrome!");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div id="chatbot-box" className={`chatbot-panel ${isOpen ? "show" : ""}`}>
      {/* Header */}
      <div className="chatbot-header">
        <span>Dev Assistant</span>
        <button id="chatbot-close" onClick={() => setIsOpen(false)}>✕</button>
      </div>

      {/* Messages list */}
      <div ref={messagesContainerRef} className="chatbot-messages chatbot-body" style={{ maxHeight: "320px", overflowY: "auto" }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`msg ${msg.sender === "bot" ? "bot" : "user"}`}
            style={{
              whiteSpace: "pre-line",
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start"
            }}
          >
            {msg.sender === "user" ? "🧑 " : "🤖 "}
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="msg bot typing" id="typing">
            🤖 Typing…
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="chatbot-input">
        <input
          id="chat-input"
          type="text"
          placeholder="Message Dev Assistant…"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {recognitionRef.current && (
          <button
            id="voice-btn"
            className={`mic-btn ${isListening ? "listening" : ""}`}
            onClick={toggleListen}
            aria-label="Voice input"
            style={{
              animation: isListening ? "pulse 1.2s infinite" : "none",
              background: isListening ? "rgba(239, 68, 68, 0.2)" : "rgba(255,255,255,0.1)"
            }}
          />
        )}
        <button
          id="send-btn"
          className="send-btn"
          onClick={handleSend}
          aria-label="Send message"
        />
      </div>
    </div>
  );
}
export default Chatbot;
