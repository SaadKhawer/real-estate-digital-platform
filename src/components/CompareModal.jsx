import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

const CompareModal = ({ isOpen, onClose, compareIds }) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/properties')
        .then(res => res.json())
        .then(data => setProperties(data))
        .catch(err => console.error(err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const compareProperties = properties.filter(p => compareIds.includes(p.id));

  return (
    <div className="modal-overlay" style={{ zIndex: 100000 }}>
      <div className="modal-content glass-panel animate-fade-in" style={{ maxWidth: '1000px', width: '90vw' }}>
        <div className="flex justify-between items-center mb-md">
          <h3>Compare Properties</h3>
          <button className="close-modal" onClick={onClose} style={{ position: 'relative', top: 0, right: 0 }}>
            <X size={24} />
          </button>
        </div>

        {compareProperties.length === 0 ? (
          <p className="text-muted text-center py-lg">No properties selected for comparison.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', width: '20%' }}>Features</th>
                  {compareProperties.map(p => (
                    <th key={p.id} style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', width: `${80 / compareProperties.length}%` }}>
                      <img src={p.image} alt={p.title} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: '0.5rem' }} />
                      <div className="font-bold">{p.title}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', fontWeight: 'bold' }}>Price</td>
                  {compareProperties.map(p => (
                    <td key={p.id} style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', color: 'var(--color-secondary)' }}>
                      ${p.price.toLocaleString()}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', fontWeight: 'bold' }}>Location</td>
                  {compareProperties.map(p => (
                    <td key={p.id} style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>{p.location}</td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', fontWeight: 'bold' }}>Bedrooms</td>
                  {compareProperties.map(p => (
                    <td key={p.id} style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>{p.bedrooms} Beds</td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', fontWeight: 'bold' }}>Bathrooms</td>
                  {compareProperties.map(p => (
                    <td key={p.id} style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>{p.bathrooms} Baths</td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', fontWeight: 'bold' }}>Area</td>
                  {compareProperties.map(p => (
                    <td key={p.id} style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>{p.area} sqft</td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', fontWeight: 'bold' }}>Type</td>
                  {compareProperties.map(p => (
                    <td key={p.id} style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', textTransform: 'capitalize' }}>{p.propertyType}</td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Smart Home</td>
                  {compareProperties.map(p => (
                    <td key={p.id} style={{ padding: '1rem' }}><Check className="text-secondary" /></td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareModal;
