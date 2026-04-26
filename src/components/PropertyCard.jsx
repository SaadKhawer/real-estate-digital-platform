import React from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Maximize, MapPin, Heart, Scale, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  const { favorites, toggleFavorite, isFavorite, compareList, toggleCompare } = useAppContext();
  const saved = isFavorite(property.id);
  const isCompared = compareList.includes(property.id);

  return (
    <div className="property-card animate-fade-in">
      <div className="card-image-wrapper">
        <img src={property.image} alt={property.title} className="card-image" />
        <div className="card-badge flex items-center gap-xs">
          {property.type}
          {property.isVerified && <ShieldCheck size={14} title="Verified Listing" />}
        </div>
        <div className="card-actions" style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.5rem' }}>
          <button 
            className="favorite-btn" 
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(property.id);
            }}
            style={{
              background: 'rgba(0,0,0,0.5)', borderRadius: '50%', padding: '0.5rem', border: 'none', cursor: 'pointer',
              color: saved ? 'var(--color-error)' : 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <Heart size={20} fill={saved ? 'var(--color-error)' : 'none'} />
          </button>
          <button 
            className="compare-btn" 
            onClick={(e) => {
              e.preventDefault();
              toggleCompare(property.id);
            }}
            style={{
              background: isCompared ? 'var(--color-secondary)' : 'rgba(0,0,0,0.5)', borderRadius: '50%', padding: '0.5rem', border: 'none', cursor: 'pointer',
              color: isCompared ? 'black' : 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <Scale size={20} />
          </button>
        </div>
      </div>
      <div className="card-content">
        <div className="card-price">
          ${property.price.toLocaleString()}{property.period || ''}
        </div>
        <h3 className="card-title">{property.title}</h3>
        <p className="card-location">
          <MapPin size={16} /> {property.location}
        </p>
        
        <div className="card-features">
          <div className="feature">
            <Bed size={18} />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="feature">
            <Bath size={18} />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="feature">
            <Maximize size={18} />
            <span>{property.area} sqft</span>
          </div>
        </div>

        <Link to={`/property/${property.id}`} className="btn btn-outline card-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
