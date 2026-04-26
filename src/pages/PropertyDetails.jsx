import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Bed, Bath, Maximize, MapPin, ArrowLeft, Phone, Mail, Star, Heart, Share2, Video, ShieldCheck, Sparkles, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import MortgageCalculator from '../components/MortgageCalculator';
import PriceChart from '../components/PriceChart';
import LifestyleScore from '../components/LifestyleScore';
import ScheduleTourModal from '../components/ScheduleTourModal';
import VirtualTourModal from '../components/VirtualTourModal';
import AINegotiationAssistant from '../components/AINegotiationAssistant';
import ReviewModal from '../components/ReviewModal';
import ContactModal from '../components/ContactModal';
import './PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  
  const fetchPropertyData = async () => {
    try {
      const propRes = await fetch(`/api/properties/${id}`);
      const propData = await propRes.json();
      if (!propData.message) setProperty(propData);

      const revRes = await fetch(`/api/properties/${id}/reviews`);
      const revData = await revRes.json();
      if (Array.isArray(revData)) setReviews(revData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPropertyData();
  }, [id]);

  const { favorites, toggleFavorite } = useAppContext();
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false);
  const [isAiNegotiatorOpen, setIsAiNegotiatorOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [isArActive, setIsArActive] = useState(false);
  const isFavorite = favorites.includes(property?.id);

  if (loading) {
    return <div className="container" style={{ marginTop: '100px' }}>Loading...</div>;
  }

  if (!property) {
    return <div className="container" style={{ marginTop: '100px' }}>Property not found</div>;
  }

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1) 
    : 'New';

  return (
    <div className="property-details-page" style={{ marginTop: '80px' }}>
      <div className="container py-lg">
        <Link to="/properties" className="back-link flex items-center gap-sm mb-md">
          <ArrowLeft size={20} /> Back to Properties
        </Link>

        <div className="details-header mb-lg">
          <div className="title-section">
            <div className="badge mb-sm inline-block">{property.type}</div>
            <h1>{property.title}</h1>
            <p className="location text-muted flex items-center gap-sm mt-sm">
              <MapPin size={20} /> {property.location}
            </p>
          </div>
          <div className="price-section">
            <h2 className="price text-gradient">${property.price.toLocaleString()}{property.period || ''}</h2>
          </div>
        </div>

        <div className="property-image-wrapper" onClick={() => setIsImageZoomed(true)} style={{ cursor: 'zoom-in' }}>
          <img src={property.image} alt={property.title} className="main-image" />
        </div>

        <div className="details-content">
          <div className="main-info">
            <div className="features-bar glass-panel mb-lg">
              <div className="feature-item">
                <Bed size={24} className="text-secondary" />
                <div>
                  <span className="font-bold">{property.bedrooms}</span>
                  <span className="text-muted block">Bedrooms</span>
                </div>
              </div>
              <div className="feature-item">
                <Bath size={24} className="text-secondary" />
                <div>
                  <span className="font-bold">{property.bathrooms}</span>
                  <span className="text-muted block">Bathrooms</span>
                </div>
              </div>
              <div className="feature-item">
                <Maximize size={24} className="text-secondary" />
                <div>
                  <span className="font-bold">{property.area}</span>
                  <span className="text-muted block">Square Feet</span>
                </div>
              </div>
            </div>

            <section className="description-section">
              <h3>Description</h3>
              <p>{property.description}</p>
            </section>

            <div className="mt-xl">
              <PriceChart basePrice={property.price} />
            </div>

            <LifestyleScore />

            <div className="glass-panel mt-xl" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
              <div className="flex justify-between items-center mb-md">
                <h3>Property Reviews</h3>
                <div className="flex items-center gap-xs">
                  <Star size={20} fill="var(--color-secondary)" className="text-secondary" />
                  <span className="font-bold">{averageRating}</span>
                  <span className="text-muted">({reviews.length} Reviews)</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-md">
                {reviews.length === 0 ? (
                  <p className="text-muted py-md text-center">No reviews yet. Be the first to review!</p>
                ) : (
                  reviews.map(review => (
                    <div key={review.id} style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                      <div className="flex items-center gap-sm mb-xs">
                        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>
                          {review.userName.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-bold">{review.userName}</span>
                        <div className="flex ml-sm">
                          {[1,2,3,4,5].map(s => (
                            <Star key={s} size={14} fill={s <= review.rating ? "var(--color-secondary)" : "none"} color="var(--color-secondary)" />
                          ))}
                        </div>
                        <span className="text-muted text-sm ml-auto">{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-muted mt-sm">"{review.comment}"</p>
                    </div>
                  ))
                )}
              </div>
              <button className="btn btn-outline w-full mt-md" onClick={() => setIsReviewModalOpen(true)}>Write a Review</button>
            </div>

            <MortgageCalculator price={property.price} />
          </div>

          {/* Sidebar */}
          <div className="property-sidebar">
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', position: 'sticky', top: '100px' }}>
              <h3 className="mb-md">Listed By</h3>
              <div className="agent-card flex items-center gap-md mb-md p-md" style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <div className="agent-avatar"></div>
                <div>
                  <h4 className="flex items-center gap-xs">Sarah Jenkins <ShieldCheck size={16} className="text-secondary" /></h4>
                  <p className="text-muted text-sm text-secondary font-bold">Verified Owner</p>
                  <p className="text-xs text-muted mt-xs">Usually responds in 5 mins</p>
                </div>
              </div>

              <div className="contact-actions flex flex-col gap-sm">
                <button className="btn btn-outline" onClick={() => toggleFavorite(property.id)}>
                  <Heart size={20} fill={isFavorite ? "currentColor" : "none"} className={isFavorite ? "text-error" : ""} /> 
                  {isFavorite ? 'Saved' : 'Save'}
                </button>
                <button className="btn btn-outline"><Share2 size={20} /> Share</button>
                <button className="btn btn-secondary" onClick={() => setIsVirtualTourOpen(true)}><Video size={20} /> 3D Tour</button>
                <button 
                  className="btn btn-primary w-full justify-center"
                  onClick={() => setIsTourModalOpen(true)}
                >
                  Schedule a Tour
                </button>
                <button className="btn btn-secondary w-full justify-center" onClick={() => setIsAiNegotiatorOpen(true)}>
                  <Star size={18} /> AI Negotiator
                </button>
                <button className="btn btn-outline w-full justify-center">
                  <Phone size={18} /> Call Agent
                </button>
                <button className="btn btn-outline w-full justify-center" onClick={() => setIsContactModalOpen(true)}>
                  <Mail size={18} /> Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ScheduleTourModal 
        isOpen={isTourModalOpen} 
        onClose={() => setIsTourModalOpen(false)} 
        propertyTitle={property.title} 
      />
      
      <VirtualTourModal 
        isOpen={isVirtualTourOpen} 
        onClose={() => setIsVirtualTourOpen(false)} 
        propertyTitle={property.title} 
      />

      <AINegotiationAssistant 
        isOpen={isAiNegotiatorOpen} 
        onClose={() => setIsAiNegotiatorOpen(false)} 
        property={property} 
      />

      <ReviewModal 
        isOpen={isReviewModalOpen} 
        onClose={() => setIsReviewModalOpen(false)} 
        propertyId={property.id} 
        onReviewAdded={fetchPropertyData}
      />

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
        propertyId={property.id} 
        propertyTitle={property.title}
      />

      {isImageZoomed && (
        <div className="modal-overlay" style={{ zIndex: 100000 }}>
          <div style={{ position: 'relative', width: '90vw', height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={property.image} alt={property.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 'var(--radius-md)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} />
            
            {isArActive && (
              <div className="animate-fade-in" style={{ position: 'absolute', bottom: '20%', right: '20%', pointerEvents: 'none' }}>
                <div style={{ background: 'rgba(0,0,0,0.7)', color: 'var(--color-secondary)', padding: '0.5rem 1rem', borderRadius: '50px', marginBottom: '1rem', border: '1px solid var(--color-secondary)' }}>AR Furniture Placement</div>
                <img src="/luxury_villa.png" style={{ width: '200px', height: '100px', objectFit: 'cover', borderRadius: '8px', opacity: 0.9, filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.5))' }} alt="Simulated Sofa" />
              </div>
            )}

            <button 
              className="btn btn-secondary" 
              style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 100001, borderRadius: '50px', padding: '1rem 2rem', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}
              onClick={(e) => { e.stopPropagation(); setIsArActive(!isArActive); }}
            >
              <Sparkles size={18} /> {isArActive ? 'Disable AR View' : 'Try AR Furniture View'}
            </button>

            <button 
              className="close-modal" 
              onClick={() => { setIsImageZoomed(false); setIsArActive(false); }} 
              style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 100001, background: 'rgba(0,0,0,0.5)' }}
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
