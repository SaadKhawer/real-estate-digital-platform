import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="section-padding container" style={{ marginTop: '80px' }}>
      <div className="text-center mb-xl">
        <h1>Contact <span className="text-gradient">Us</span></h1>
        <p className="text-muted">We are here to assist you with any inquiries.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
        
        {/* Contact Info */}
        <div className="flex flex-col gap-lg">
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
            <h3 className="mb-md">Get in Touch</h3>
            <div className="flex flex-col gap-md">
              <div className="flex items-center gap-sm">
                <MapPin className="text-secondary" />
                <span>123 Luxury Lane, Beverly Hills, CA 90210</span>
              </div>
              <div className="flex items-center gap-sm">
                <Phone className="text-secondary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-sm">
                <Mail className="text-secondary" />
                <span>contact@auraestates.com</span>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
            <h3 className="mb-sm">Business Hours</h3>
            <p className="text-muted mb-sm">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-muted mb-sm">Saturday: 10:00 AM - 4:00 PM</p>
            <p className="text-muted">Sunday: Closed</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
          <h3 className="mb-md">Send us a Message</h3>
          {submitted ? (
            <div className="text-center py-lg text-secondary">
              <h3>Message Sent!</h3>
              <p className="text-muted">We will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-md">
              <div className="flex flex-col gap-xs">
                <label>Name</label>
                <input type="text" required placeholder="John Doe" />
              </div>
              <div className="flex flex-col gap-xs">
                <label>Email</label>
                <input type="email" required placeholder="john@example.com" />
              </div>
              <div className="flex flex-col gap-xs">
                <label>Message</label>
                <textarea rows="4" required placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="btn btn-primary mt-sm">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
