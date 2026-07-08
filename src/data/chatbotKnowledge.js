/**
 * ADVANCED CHATBOT KNOWLEDGE BASE
 * ─────────────────────────────────────────────────────────────
 * Structure: { intent, priority, keywords[], synonyms[], reply }
 * Matching: keyword score × priority + bonus for synonym matches.
 * All real content sourced directly from Devakumar's resume & GitHub.
 */

export const chatbotKnowledge = [

  // ─── GREETINGS ──────────────────────────────────────────────
  {
    intent: "greeting",
    priority: 1,
    keywords: ["hi", "hello", "hey", "hola", "howdy", "sup", "what's up", "good morning", "good evening", "good afternoon", "greetings", "yo", "start"],
    reply: `👋 Hey there! I'm **Dev Assistant** — Devakumar's AI chatbot.

I can help you learn about:
• 🚀 Projects & research
• 💡 Skills & tech stack
• 🎓 Education & internships
• 📜 Certifications
• 📬 How to contact him

What would you like to know? 😊`
  },

  // ─── WHO IS DEVAKUMAR ────────────────────────────────────────
  {
    intent: "about",
    priority: 5,
    keywords: [
      "who", "about", "yourself", "devakumar", "introduce", "introduction", "tell me", "describe",
      "background", "person", "profile", "bio", "biography", "identity", "who is", "who are you",
      "your name", "what do you do", "developer", "engineer", "student"
    ],
    reply: `🧑‍💻 **Devakumar A** — AI Developer & Full-Stack Web Engineer

📍 Rajiv Gandhi College of Engineering and Technology (RGCET), Puducherry
🎓 B.Tech Computer Science & Engineering | CGPA: 7.63
🔬 Scopus Published Researcher | ORCID: 0009-0003-8934-6744

Devakumar is a passionate developer who builds intelligent, real-world systems at the intersection of AI and modern web engineering. He has:
• 🏆 Published a research paper in an international Scopus-indexed journal
• 🏅 Participated in Smart India Hackathon 2024
• 🎖 Holds NPTEL Elite + Gold certifications from IIT Bombay & IIT Ropar
• 👑 President of Mathoria — the Mathematics Club at RGCET (600+ members)
• 🔬 Scientific Program Trainee at Scientex MedTech Pvt Ltd

Ask me about his **projects**, **skills**, **internships**, or how to **contact** him!`
  },

  // ─── PROJECTS OVERVIEW ──────────────────────────────────────
  {
    intent: "projects",
    priority: 10,
    keywords: [
      "project", "projects", "work", "portfolio", "built", "created", "developed", "made",
      "applications", "apps", "what did you build", "github projects", "show projects",
      "your work", "research work", "all projects", "list projects"
    ],
    reply: `🚀 **Devakumar's Key Projects:**

1️⃣ **NeuroSense** — Deep Learning EEG Brain-Computer Interface *(Published Research)*
   → 89% accuracy | Intent detection, emotion & pain classification

2️⃣ **AquaCommandAI** — AI Water Resource Intelligence Platform
   → React + FastAPI + PostgreSQL + 4 ML models

3️⃣ **Automated Resume Relevance Check System** — NLP Resume Screener
   → Sentence Transformers + Cosine Similarity

4️⃣ **MovieVerse AI** — Multi-Modal Genre Classification
   → BERT + ResNet50 + OpenCV (Text + Image + Video)

5️⃣ **Nagish India** — Accessible Communication App *(Smart India Hackathon 2024)*
   → Android + Java + Google Cloud Speech APIs

6️⃣ **QuantPulse AI** — Stock Market Prediction System
   → LSTM + Linear Regression + Flask + Chart.js

7️⃣ **Mathoria** — Mathematics Club Digital Platform
   → HTML + CSS + JavaScript + Firebase | 600+ members

Ask me about any specific project for full details! 🔍`
  },

  // ─── NEUROSENSE / EEG PROJECT ────────────────────────────────
  {
    intent: "neurosense",
    priority: 15,
    keywords: [
      "neurosense", "eeg", "bci", "brain computer interface", "paralyzed", "paralysis",
      "brain signal", "eegnet", "locked in", "mne", "neural", "brainwave", "electroencephalography",
      "eeg project", "research project", "published paper", "scopus", "ijddt", "journal"
    ],
    reply: `🧠 **NeuroSense — Deep Learning EEG Communication Aid for Paralyzed Patients**

📖 *Published in IJDDT, Vol 16 (58s), 2026 | DOI: 10.25258/IJDDT.16.58S.21*
Authors: Dr. R. G. Suresh Kumar, **Devakumar A**, Roney Varughese Joseph, Sivasubramanian J

**What it does:**
A Brain-Computer Interface that helps paralyzed patients communicate without physical movement by analyzing their EEG brainwaves.

**Three tasks in ONE model:**
• 💬 Communication Intent Detection (e.g., "I Need Help", "Emergency Alert")
• 😊 Emotion Recognition (Calm, Stress, Distress, Anxiety)
• ❤️ Pain Severity Detection (Mild, Moderate, Severe)

**Results:**
| Task | Accuracy |
|---|---|
| Intent Detection | 86% |
| Pain Detection | 92% |
| Emotion Recognition | 90% |
| **Overall System** | **89%** |

🛠 **Stack:** Python • TensorFlow • Keras • EEGNet • MNE-Python • NumPy • Pandas
📦 **Datasets:** KARA One • SEED-IV • PainMonit`
  },

  // ─── AQUACOMMANDAI ──────────────────────────────────────────
  {
    intent: "aquacommand",
    priority: 14,
    keywords: [
      "aquacommand", "aqua", "water", "irrigation", "crop recommendation", "reservoir",
      "agriculture", "farmer", "yield prediction", "soil", "fastapi", "full stack",
      "water management", "smart farming", "agricultural ai"
    ],
    reply: `🌊 **AquaCommandAI — AI-Powered Water Resource Intelligence Platform**

A full-stack platform that uses Machine Learning to support smart agriculture and sustainable water management.

**4 ML Models Built:**
• 🌱 Crop Recommendation — based on soil (N, P, K, pH) & climate
• 📈 Crop Yield Prediction — forecast expected yield
• 💧 Water Demand Forecasting — irrigation scheduling
• 🏞 Reservoir Risk Monitoring — flood/drought detection

**Tech Stack:**
• Frontend: React.js, Tailwind CSS, Framer Motion
• Backend: FastAPI (Python)
• Database: PostgreSQL
• ML: Scikit-learn, Pandas, NumPy, Joblib

🔗 GitHub: github.com/Devakumar-A/AquaCommandAI`
  },

  // ─── RESUME SCREENER ─────────────────────────────────────────
  {
    intent: "resume_screener",
    priority: 13,
    keywords: [
      "resume", "resume screener", "resume checker", "hr", "recruitment", "job screening",
      "sentence transformer", "nlp resume", "candidate", "cosine similarity", "verdict",
      "automated resume", "hiring", "streamlit"
    ],
    reply: `📄 **Automated Resume Relevance Check System**

An AI-powered recruitment tool that screens resumes against job descriptions using **semantic similarity** — going far beyond simple keyword matching.

**Key Features:**
• 📂 Parses PDF and DOCX resumes automatically
• 🤖 Uses Sentence Transformers (all-MiniLM-L6-v2) for contextual understanding
• 📊 Scores each candidate with Cosine Similarity
• ✅ Verdict: High (>75%) | Medium (50–75%) | Low (<50%)
• 👨‍💼 Dual dashboards — Student view & HR view

**Stack:** Python • Streamlit • Sentence Transformers • Hugging Face • PDFPlumber • SQLite

🔗 github.com/Devakumar-A/Automated-Resume-Relevance-Check-System`
  },

  // ─── MOVIEVERSE AI ───────────────────────────────────────────
  {
    intent: "movieverse",
    priority: 13,
    keywords: [
      "movieverse", "movie", "genre", "classification", "multimodal", "multi modal",
      "resnet", "bert", "opencv", "trailer", "poster", "recommendation", "film",
      "computer vision", "nlp movie", "explainable ai"
    ],
    reply: `🎬 **MovieVerse AI — Multi-Modal Movie Genre Classification & Recommendation**

Predicts movie genres by analyzing text, images AND video — unlike single-modality systems.

**Three Input Modes:**
• 📝 Plot/Description → BERT + TF-IDF text analysis
• 🖼 Poster Image → ResNet50 CNN visual features
• 🎥 Trailer Video → OpenCV scene & action extraction

**Then fuses all three for final prediction with confidence scores (e.g., Action 95%, Sci-Fi 82%)**

Also provides:
• 🔍 Explainable AI — tells you WHY each genre was predicted
• 🎯 Movie Recommendation Engine — suggests similar films

**Stack:** Python • TensorFlow • BERT • ResNet50 • OpenCV • Streamlit • SQLite

🔗 github.com/Devakumar-A/MovieVerse-AI-Multimodal-Genre-Classification`
  },

  // ─── NAGISH / ACCESSIBILITY APP ──────────────────────────────
  {
    intent: "nagish",
    priority: 13,
    keywords: [
      "nagish", "accessibility", "speech", "hearing", "impaired", "deaf", "speech impaired",
      "speech to text", "text to speech", "sih", "smart india hackathon", "multilingual",
      "android app", "disability", "tts", "stt", "firebase"
    ],
    reply: `🔊 **Nagish India — Accessible Communication Platform**

Built for **Smart India Hackathon 2024** (Problem Statement #1717, Team RGCET-TECHNOCRATS).

Helps hearing and speech-impaired individuals communicate independently.

**Features:**
• 🎙 Real-Time Speech-to-Text — live captions during conversations
• 🔊 Text-to-Speech — converts typed text to voice instantly
• 🌐 Multilingual Support — multiple Indian regional languages
• 🔒 Encrypted Communication — secure data transmission
• ⌚ Proposed: Smart wearable for sign-language-to-speech conversion

**Stack:** Android Studio • Java • Google Cloud Speech-to-Text API • Google Cloud Text-to-Speech API • Firebase Realtime Database

📍 Development Status: 75% complete — prototype demonstrated`
  },

  // ─── QUANTPULSE / STOCK PREDICTION ───────────────────────────
  {
    intent: "quantpulse",
    priority: 12,
    keywords: [
      "quantpulse", "stock", "stock market", "prediction", "lstm", "share price", "finance",
      "yahoo finance", "linear regression", "time series", "trading", "market trend",
      "chart.js", "flask stock", "aapl", "infy", "tcs"
    ],
    reply: `📈 **QuantPulse AI — Stock Market Prediction System**

Compares Machine Learning vs Deep Learning approaches for stock price forecasting.

**Two Models:**
• ⚙️ Linear Regression — lightweight, uses last 3 trading days
• 🧠 LSTM Neural Network — 60-day window, captures temporal patterns

**Features:**
• Live data from Yahoo Finance (AAPL, INFY, TCS)
• Side-by-side prediction comparison
• Trend Direction: UP 📈 / DOWN 📉
• Confidence score generation
• Interactive Chart.js dashboard

**Stack:** Python • Flask • TensorFlow • Keras • LSTM • yfinance • Chart.js • HTML/CSS/JS

🔗 github.com/Devakumar-A/stock_market_prediction`
  },

  // ─── MATHORIA ────────────────────────────────────────────────
  {
    intent: "mathoria",
    priority: 11,
    keywords: [
      "mathoria", "math club", "mathematics club", "club", "president", "rgcet club",
      "student portal", "membership", "event management", "math visualization"
    ],
    reply: `🏛 **Mathoria — Mathematics Club Digital Management Platform**

Devakumar is the **President** of the Mathoria Mathematics Club at RGCET with **600+ members**.

He also built the club's entire digital platform from scratch:

**Platform Features:**
• 👥 Automated Online Membership Registration
• 📅 Interactive Event Timeline & Management
• 📊 Mathematical Visualization Lab — animated theorem demonstrations
• 🏆 Achievement & Growth Dashboard
• 👨‍💼 Leadership & organizational structure display
• 🖼 Gallery & activity documentation archive
• 📞 Communication & contact center

**Stack:** HTML5 • CSS3 • JavaScript • Firebase

🔗 github.com/Devakumar-A/Mathoria-Mathematics-Club-Portal`
  },

  // ─── SKILLS ─────────────────────────────────────────────────
  {
    intent: "skills",
    priority: 6,
    keywords: [
      "skills", "technologies", "tech stack", "languages", "code", "what can you do",
      "tools", "frameworks", "programming", "expertise", "technical skills", "proficient",
      "know", "experience with", "good at", "specialization", "capabilities"
    ],
    reply: `💡 **Devakumar's Technical Skills:**

**Programming Languages:**
Python • Java • JavaScript • C

**AI / Machine Learning:**
TensorFlow • Keras • PyTorch • Scikit-learn • EEGNet • Sentence Transformers • BERT • OpenCV • LSTM • MNE-Python

**Web Development:**
React.js • FastAPI • Flask • Node.js • HTML5 • CSS3 • Three.js • Vite • Framer Motion

**Databases:**
PostgreSQL • MongoDB • Firebase • SQLite • MySQL

**Tools & Platforms:**
Git • GitHub • Postman • VS Code • Android Studio • Figma • Streamlit • Jupyter

**Data Science:**
NumPy • Pandas • Matplotlib • SciPy • Seaborn

**Soft Skills:**
Leadership • Public Speaking • Team Collaboration • Research & Documentation • Problem Solving`
  },

  // ─── EDUCATION ──────────────────────────────────────────────
  {
    intent: "education",
    priority: 7,
    keywords: [
      "education", "college", "university", "degree", "study", "cgpa", "gpa", "rgcet",
      "rajiv gandhi", "b.tech", "btech", "cse", "computer science", "engineering", "academic",
      "school", "institution", "student", "semester", "qualification"
    ],
    reply: `🎓 **Education:**

**B.Tech Computer Science and Engineering**
📍 Rajiv Gandhi College of Engineering and Technology (RGCET), Puducherry
📊 CGPA: **7.63**
📅 Expected Graduation: 2026

**Highlights:**
• 🔬 Scopus Published Researcher (ORCID: 0009-0003-8934-6744)
• 👑 President — Mathoria Mathematics Club (600+ members)
• 🔬 Scientific Program Trainee — Scientex MedTech Pvt Ltd
• 🏅 Smart India Hackathon 2024 participant
• 🎖 NPTEL Elite + Gold certification holder`
  },

  // ─── INTERNSHIPS / EXPERIENCE ────────────────────────────────
  {
    intent: "internship",
    priority: 8,
    keywords: [
      "internship", "experience", "intern", "work experience", "job", "company", "twilight",
      "askan", "cognifyz", "employment", "professional", "workplace", "where worked",
      "industry experience", "training"
    ],
    reply: `💼 **Internship Experience:**

1️⃣ **Web Framework Intern — Twilight IT Solution Pvt. Ltd.**
📅 Aug 2025 | 📍 Puducherry
• Built responsive web pages using HTML, CSS, JavaScript
• Developed dynamic UI components with React.js
• Worked in a live, production-style environment

2️⃣ **Backend Development Intern — Askan Technologies**
📅 Jul 2025 | 📍 Puducherry
• Developed server-side applications using Node.js
• Designed and managed databases with MongoDB & MongoDB Compass
• Tested and debugged RESTful APIs using Postman

3️⃣ **Front-End Development Intern — Cognifyz Technologies**
📅 Feb 2025 – Mar 2025 | 📍 Remote
• Created responsive UIs using HTML, CSS, JavaScript
• Built interactive frontend components
• Completed assigned tasks within an agile sprint workflow`
  },

  // ─── CERTIFICATIONS ─────────────────────────────────────────
  {
    intent: "certifications",
    priority: 4,
    keywords: [
      "certification", "certificate", "courses", "credentials", "certified", "nptel",
      "oracle", "google", "ibm", "microsoft", "infosys", "trained", "course",
      "achievement", "award", "badge", "completed course"
    ],
    reply: `📜 **Certifications & Credentials:**

**NPTEL (IIT Bombay & IIT Ropar):**
• 🥇 Elite + Gold — Programming in Java
• 🥇 Elite + Gold — Cloud Computing
• 🏅 Elite — Computer Networks & Internet Protocol

**Oracle:**
• OCI Generative AI Professional
• OCI Data Science Professional

**Other Organizations:**
• 🤖 AI for Everyone — Coursera / DeepLearning.AI
• ☁️ Google Cloud — Fundamentals
• 💻 IBM — Python for Data Science & AI
• 🔷 Microsoft — Azure AI Fundamentals (AI-900)
• 🏢 Infosys Springboard — Multiple tech certifications
• 📊 Simplilearn — Data Science & Analytics
• 🧠 Scientex MedTech — Scientific Program Training`
  },

  // ─── RESEARCH / PUBLICATION ──────────────────────────────────
  {
    intent: "research",
    priority: 9,
    keywords: [
      "research", "paper", "publication", "published", "scopus", "journal", "ijddt",
      "doi", "academic", "indexed", "article", "conference", "author", "orcid"
    ],
    reply: `🔬 **Research Publication:**

📄 **Title:** Deep Learning-Based EEG Communication Aid for Paralyzed Patients

📰 **Journal:** International Journal of Drug Delivery Technology (IJDDT)
📖 Volume 16 (58s), 2026
🔗 **DOI:** 10.25258/IJDDT.16.58S.21
📑 **Index:** Scopus-indexed

**Authors:**
Dr. R. G. Suresh Kumar, **Devakumar A**, Roney Varughese Joseph, Sivasubramanian J

**Impact:**
This paper introduces an EEGNet-inspired multi-task deep learning model achieving 89% overall system accuracy in helping paralyzed patients communicate, detect emotions, and report pain — all from brainwave signals alone.

🆔 ORCID: https://orcid.org/0009-0003-8934-6744`
  },

  // ─── CONTACT ─────────────────────────────────────────────────
  {
    intent: "contact",
    priority: 2,
    keywords: [
      "contact", "email", "reach", "phone", "whatsapp", "message", "connect",
      "hire", "collaborate", "work together", "get in touch", "talk", "dm",
      "linkedin", "github profile", "social media", "link", "portfolio link"
    ],
    reply: `📬 **Contact Devakumar:**

📧 **Email:** devak9391@gmail.com
💻 **GitHub:** github.com/Devakumar-A
🔗 **LinkedIn:** linkedin.com/in/devakumar-a-129561305
🆔 **ORCID:** orcid.org/0009-0003-8934-6744
💬 **WhatsApp:** Use the green WhatsApp button at the bottom-right of the page!

Or scroll to the **Contact** section of the portfolio and send a message directly — it comes straight to his inbox! 📩`
  },

  // ─── HACKATHON ───────────────────────────────────────────────
  {
    intent: "hackathon",
    priority: 7,
    keywords: [
      "hackathon", "sih", "smart india", "competition", "contest", "event",
      "team", "rgcet technocrats", "winner", "participant"
    ],
    reply: `🏆 **Smart India Hackathon 2024:**

Devakumar participated in SIH 2024 as part of **Team RGCET-TECHNOCRATS**.

**Problem Statement:** #1717 — Indian version of the Nagish App
**Theme:** Miscellaneous (Software)
**Team ID:** 388

They built **Nagish India** — a mobile accessibility platform for hearing and speech-impaired users featuring:
• Real-time Speech-to-Text transcription
• Text-to-Speech voice synthesis
• Multilingual Indian language support
• Firebase-backed secure communication`
  },

  // ─── ACHIEVEMENTS / EXTRACURRICULAR ──────────────────────────
  {
    intent: "achievements",
    priority: 6,
    keywords: [
      "achievement", "accomplishment", "award", "honor", "achievement", "extra",
      "extracurricular", "club", "leadership", "president", "activities",
      "volunteering", "community", "impact"
    ],
    reply: `🏅 **Achievements & Extracurricular Activities:**

• 🔬 **Scopus Published Researcher** — International journal research on EEG-based BCI systems
• 👑 **President — Mathoria Mathematics Club**, RGCET (600+ members)
• 🏆 **Smart India Hackathon 2024** Participant — Team RGCET-TECHNOCRATS
• 🎖 **NPTEL Elite + Gold Certification** — Java & Cloud Computing (IIT Bombay & IIT Ropar)
• 🔬 **Scientific Program Trainee** — Scientex MedTech Pvt Ltd
• 🧠 **Multi-certified** — Oracle, Google, IBM, Microsoft, Infosys, Simplilearn`
  },

  // ─── CAREER / GOALS ─────────────────────────────────────────
  {
    intent: "career",
    priority: 3,
    keywords: [
      "career", "goal", "future", "aim", "job", "dream", "aspiration", "plan",
      "where do you see yourself", "ambition", "looking for", "opportunity",
      "open to work", "hiring", "available"
    ],
    reply: `🎯 **Career Goals:**

Devakumar aims to become a **Full-Stack AI Engineer** who builds intelligent, impactful systems at the intersection of deep learning and modern web engineering.

**He is interested in:**
• AI/ML Engineering roles
• Full-Stack Web Development positions
• Research & Innovation opportunities
• Building accessible, human-centered technology

**Currently:**
• Open to internship and full-time opportunities
• Available for freelance / project collaborations
• Actively contributing to open-source projects

📩 Reach out via email: devak9391@gmail.com`
  },

  // ─── WEBSITE / PORTFOLIO ────────────────────────────────────
  {
    intent: "website",
    priority: 3,
    keywords: [
      "website", "portfolio website", "this site", "portfolio", "how made", "built with",
      "stack of portfolio", "three.js", "vite", "react portfolio", "tech of this"
    ],
    reply: `💻 **This Portfolio Website:**

Built by Devakumar himself using cutting-edge web technologies!

**Stack:**
• ⚛️ React.js + Vite — Component architecture
• 🌌 Three.js — 3D animated stardust particle galaxy background
• 🎨 Vanilla CSS — Premium glassmorphism design system
• 📧 EmailJS — Contact form email delivery
• 🤖 Custom AI Chatbot — That's me! Rule-based NLP with keyword matching
• 🚀 GitHub Actions — Automated CI/CD deployment to GitHub Pages

Hosted at: **devakumar-a.github.io/Devakumar/**`
  },

  // ─── LANGUAGE SUPPORT ───────────────────────────────────────
  {
    intent: "help",
    priority: 2,
    keywords: [
      "help", "what can you do", "options", "menu", "commands", "topics",
      "what to ask", "guide", "how does this work", "instructions"
    ],
    reply: `🤖 **I can answer questions about:**

• 🧑‍💻 **About** — Who is Devakumar?
• 🚀 **Projects** — NeuroSense, AquaCommandAI, Resume Screener, MovieVerse, Nagish, QuantPulse, Mathoria
• 💡 **Skills** — Programming, AI/ML, Web Development, Databases, Tools
• 🎓 **Education** — RGCET, CGPA, courses
• 💼 **Internships** — Twilight IT, Askan Technologies, Cognifyz
• 📜 **Certifications** — Oracle, NPTEL, Google, IBM, Microsoft
• 🔬 **Research** — Scopus publication on EEG BCI
• 🏆 **Achievements** — Hackathons, club presidency, awards
• 📬 **Contact** — Email, GitHub, LinkedIn, WhatsApp

Just type naturally — I understand many ways of asking! 😊`
  },

  // ─── THANKS / FAREWELL ──────────────────────────────────────
  {
    intent: "thanks",
    priority: 1,
    keywords: [
      "thanks", "thank you", "thankyou", "ty", "thx", "appreciate", "awesome",
      "great", "cool", "nice", "wonderful", "perfect", "bye", "goodbye", "see you", "later"
    ],
    reply: `😊 You're welcome! Feel free to ask anything else anytime.

If you'd like to connect with Devakumar directly:
📧 devak9391@gmail.com
💬 WhatsApp button at the bottom-right corner

Have a great day! 🚀`
  }
];
