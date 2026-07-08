import React, { useState, useRef } from "react";

export function ContactForm() {
  const formRef = useRef(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSending, setIsSending] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSending) return;

    setIsSending(true);

    // Ensure emailjs is loaded
    const emailjs = window.emailjs;
    if (!emailjs) {
      alert("Email service is currently unavailable. Please reach me directly via email.");
      setIsSending(false);
      return;
    }

    emailjs.sendForm(
      "service_hv8gpts",
      "template_wx6mfn9",
      formRef.current
    )
    .then(() => {
      // Show Success Overlay
      setShowSuccess(true);
      
      // Reset Form State
      setFormData({ name: "", email: "", message: "" });
      setIsSending(false);

      // Auto hide overlay after 4.5s
      setTimeout(() => {
        setShowSuccess(false);
      }, 4500);
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      alert("Failed to send message. Please try again or email me directly.");
      setIsSending(false);
    });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-container contact-container">
        
        {/* Left Info Column */}
        <div className="contact-left">
          <h2>Let’s <span className="accent">Connect</span></h2>

          <p className="contact-intro">
            Got an idea, opportunity, or just want to say hello?
            I’m always open to meaningful conversations and collaborations.
          </p>

          <div className="contact-highlights">
            <div className="contact-pill">💡 Ideas</div>
            <div className="contact-pill">🤝 Collaboration</div>
            <div className="contact-pill">🚀 Projects</div>
            <div className="contact-pill">📩 Queries</div>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="contact-right glass">
          <form 
            ref={formRef}
            id="contact-form" 
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              value={formData.name}
              onChange={handleInputChange}
              required 
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              value={formData.email}
              onChange={handleInputChange}
              required 
            />
            <textarea 
              name="message" 
              placeholder="Your Message" 
              rows="4" 
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>

            <button type="submit" className="btn primary" disabled={isSending}>
              {isSending ? "Sending..." : "Send Message →"}
            </button>
          </form>

          {/* Success Overlay Panel */}
          {showSuccess && (
            <div className="contact-success" id="contactSuccess">
              <svg className="success-svg" viewBox="0 0 52 52">
                <circle className="success-circle" cx="26" cy="26" r="25"></circle>
                <path className="success-check" d="M14 27 L22 35 L38 18"></path>
              </svg>

              <h3>Message Sent!</h3>
              <p>I’ll get back to you shortly.</p>
            </div>
          )}

          <div className="contact-alt">
            <span>or reach me directly</span>
            <a href="mailto:devakumar.kl.in@gmail.com">devakumar.kl.in@gmail.com</a>
          </div>
        </div>

      </div>
    </section>
  );
}
export default ContactForm;
