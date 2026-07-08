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

  // Rule-based keyword matching algorithm
  const getBotReply = (userMessage) => {
    const msg = userMessage.toLowerCase();
    let bestMatch = null;
    let highestScore = 0;

    chatbotKnowledge.forEach((item) => {
      let score = 0;
      item.keywords.forEach((keyword) => {
        if (msg.includes(keyword)) {
          score++;
        }
      });

      // Multiply score by priority weight
      score = score * item.priority;

      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    });

    if (bestMatch) {
      return bestMatch.reply;
    }

    // Default fallback reply
    return `🤔 I may not have exact details on that yet.

However, based on Devakumar’s profile, he focuses on:
• AI & Machine Learning
• Web & UI Engineering
• Real-world problem solving

Try asking about projects, skills, or certifications 🙂`;
  };

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
