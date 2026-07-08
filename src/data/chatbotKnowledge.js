export const chatbotKnowledge = [
  {
    intent: "projects",
    priority: 10,
    keywords: ["project", "projects", "work", "portfolio", "built"],
    reply: `
🚀 Devakumar has worked on several impactful projects:

1️⃣ **Nagish App Clone (SIH)**
• Accessibility-focused mobile app  
• Real-time speech-to-text & text-to-speech  
• Multilingual voice call transcription  
• Tech: Android, Java, Firebase, Speech APIs  

2️⃣ **Farmer Assistance App (SIH)**
• Crop rotation guidance  
• Flood & drought alerts  
• Soil health monitoring using ML  
• Tech: IoT, Satellite Data, Machine Learning  

3️⃣ **Drone Defence Against Jamming (TATA Elxsi)**
• Anti-drone jamming detection system  
• SNR monitoring & frequency hopping  
• Tech: Embedded Systems, Signal Processing  

4️⃣ **AI Attendance System**
• Face recognition-based attendance  
• Tech: Python, OpenCV  

5️⃣ **Movie Genre Classification**
• Predicts movie genres using NLP  
• Tech: Python, Scikit-learn, Naive Bayes  

👉 Want details about a **specific project**?
`
  },

  {
    intent: "about",
    priority: 5,
    keywords: ["who are you", "about", "yourself", "devakumar", "name"],
    reply:
      "Devakumar A is an AI & Web Developer passionate about building intelligent systems, modern UI, and real-world problem-solving applications."
  },

  {
    intent: "skills",
    priority: 6,
    keywords: ["skills", "technologies", "tech stack", "languages", "code"],
    reply:
      "💡 Skills: AI, Machine Learning, Python, Java, HTML, CSS, JavaScript, Three.js, Firebase, OpenCV, NLP, and modern UI development."
  },

  {
    intent: "certifications",
    priority: 4,
    keywords: ["certification", "certificate", "courses", "credentials"],
    reply:
      "📜 Certified by Oracle (OCI GenAI & Data Science), IIT Bombay, IIT Ropar (NPTEL), Google, IBM, Microsoft, Infosys, Simplilearn, and more."
  },

  {
    intent: "career",
    priority: 3,
    keywords: ["career", "goal", "future", "aim", "job"],
    reply:
      "🎯 Career goal: Build impactful AI-powered systems, work on real-world problems, and grow as a full-stack AI engineer."
  },

  {
    intent: "contact",
    priority: 2,
    keywords: ["contact", "email", "reach", "phone", "whatsapp"],
    reply:
      "📩 You can contact Devakumar via the Contact section or email: devakumar.kl.in@gmail.com. You can also message him on WhatsApp using the button on the bottom right."
  },

  {
    intent: "intro",
    priority: 1,
    keywords: ["hi", "hello", "hey", "greet", "greetings"],
    reply:
      "👋 Hi! I’m Devakumar’s AI assistant. Ask me about his projects, skills, certifications, or career goals."
  },
  {
    intent: "nagish",
    priority: 12,
    keywords: ["nagish", "accessibility", "speech app", "sih app"],
    reply: `
🔊 **Nagish App Clone (SIH)**

• Built for hearing & speech-impaired users  
• Real-time speech-to-text during calls  
• Multilingual support  
• Accessibility-first UI  

🛠 Tech Stack:
Android • Java • Firebase • Speech APIs
`
  },
  {
    intent: "farmer",
    priority: 12,
    keywords: ["farmer", "agriculture", "crop", "soil", "climate"],
    reply: `
🌾 **Farmer Assistance App (SIH)**

• Smart crop rotation suggestions  
• Flood & drought alerts  
• Soil health monitoring using ML  
• Climate & satellite data integration  

🛠 Tech Stack:
IoT • Machine Learning • Climate Data
`
  },
  {
    intent: "drone",
    priority: 12,
    keywords: ["drone", "jamming", "defence", "tata"],
    reply: `
🛡 **Drone Defence Against Jamming (TATA Elxsi)**

• Detects signal interference  
• Uses SNR monitoring  
• Frequency hopping for protection  

🛠 Tech Stack:
Embedded Systems • Signal Processing
`
  }
];
