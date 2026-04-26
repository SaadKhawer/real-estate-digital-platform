import React from 'react';
import { X, PlayCircle } from 'lucide-react';
import './VirtualTourModal.css';

const VirtualTourModal = ({ isOpen, onClose, propertyTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel animate-fade-in" style={{ maxWidth: '900px', padding: '0', overflow: 'hidden' }}>
        <div className="flex justify-between items-center p-md" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <h3 className="flex items-center gap-sm"><PlayCircle className="text-secondary" /> Virtual 3D Tour: {propertyTitle}</h3>
          <button className="close-modal" onClick={onClose} style={{ position: 'relative', top: '0', right: '0' }}>
            <X size={24} />
          </button>
        </div>
        
        <div className="tour-container bg-black flex items-center justify-center" style={{ height: '70vh', position: 'relative' }}>
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/FjU_x1106pg?autoplay=1&mute=1&loop=1&playlist=FjU_x1106pg" 
            title="Property Virtual Tour" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            style={{ borderRadius: '0' }}
          ></iframe>
        </div>
        
        <div className="p-md flex justify-between items-center bg-surface">
          <p className="text-sm text-muted">Use your mouse to drag and explore the space.</p>
          <button className="btn btn-primary" onClick={onClose}>Finish Tour</button>
        </div>
      </div>
    </div>
  );
};

export default VirtualTourModal;
