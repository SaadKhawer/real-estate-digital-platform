import React, { useState } from 'react';
import { X } from 'lucide-react';
import './ScheduleTourModal.css';

const ScheduleTourModal = ({ isOpen, onClose, propertyTitle }) => {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel animate-fade-in">
        <button className="close-modal" onClick={onClose}>
          <X size={24} />
        </button>
        
        {submitted ? (
          <div className="success-message text-center py-lg">
            <h3 className="text-secondary mb-sm">Request Sent!</h3>
            <p>Our agent will contact you shortly to confirm your tour.</p>
          </div>
        ) : (
          <>
            <h3 className="mb-md">Schedule a Tour</h3>
            <p className="text-muted mb-lg">For {propertyTitle}</p>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-md">
              <div className="flex gap-md">
                <div className="flex flex-col gap-xs" style={{ flex: 1 }}>
                  <label>Select Date</label>
                  <input type="date" required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-background)', border: '1px solid var(--color-border)', color: 'var(--color-text-main)' }} />
                </div>
                <div className="flex flex-col gap-xs" style={{ flex: 1 }}>
                  <label>Select Time</label>
                  <input type="time" required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-background)', border: '1px solid var(--color-border)', color: 'var(--color-text-main)' }} />
                </div>
              </div>
              <div className="input-group">
                <label>Your Name</label>
                <input type="text" placeholder="John Doe" required />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input type="email" placeholder="john@example.com" required />
              </div>
              <div className="input-group">
                <label>Phone</label>
                <input type="tel" placeholder="(555) 123-4567" required />
              </div>
              
              <button type="submit" className="btn btn-primary mt-sm">Request Tour</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ScheduleTourModal;
