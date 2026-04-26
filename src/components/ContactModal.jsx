import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ContactModal = ({ isOpen, onClose, propertyId, propertyTitle }) => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [message, setMessage] = useState(`I am interested in learning more about the property: ${propertyTitle}. Please contact me with more details.`);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError('Please fill out all fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          propertyId, 
          userId: user?.id, 
          name, 
          email, 
          message 
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.message || 'Failed to send message');
      }
    } catch (err) {
      console.error(err);
      setError('Server error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError('');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel animate-fade-in" style={{ maxWidth: '500px' }}>
        <div className="flex justify-between items-center mb-md">
          <h3 className="flex items-center gap-sm"><Send size={20} className="text-secondary"/> Contact Agent</h3>
          <button className="close-modal" onClick={handleClose} style={{ position: 'relative', top: 0, right: 0 }}>
            <X size={24} />
          </button>
        </div>

        {success ? (
          <div className="text-center py-lg">
            <div className="text-secondary mb-md" style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)' }}>
              <Send size={40} />
            </div>
            <h4>Message Sent Successfully!</h4>
            <p className="text-muted mt-sm">An agent will get back to you at {email} very soon.</p>
            <button className="btn btn-outline w-full mt-lg" onClick={handleClose}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="text-sm text-muted mb-md">Send an inquiry for <strong>{propertyTitle}</strong></p>

            <div className="mb-md">
              <label className="block mb-xs text-sm font-bold">Name</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-md">
              <label className="block mb-xs text-sm font-bold">Email</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-md">
              <label className="block mb-xs text-sm font-bold">Message</label>
              <textarea 
                className="form-input" 
                rows="5" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            {error && <p className="text-error text-sm mb-md">{error}</p>}

            <button 
              type="submit" 
              className="btn btn-primary w-full justify-center" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Email'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
