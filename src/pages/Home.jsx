import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, MapPin, Sparkles } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import DreamHomeQuiz from '../components/DreamHomeQuiz';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchLocation, setSearchLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  
  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setFeaturedProperties(data.slice(0, 3));
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleSearch = () => {
    navigate(`/properties?location=${encodeURIComponent(searchLocation)}&type=${propertyType}`);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content container flex flex-col justify-center h-100">
          <div className="animate-fade-in text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 className="hero-title mb-sm">{t('find_dream_home')} <span className="text-gradient">{t('home_highlight')}</span></h1>
            <p className="hero-subtitle mb-lg text-muted">{t('hero_subtitle')}</p>
          </div>

          <div className="search-bar glass-panel animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="search-input">
              <MapPin size={20} className="search-icon" />
              <input 
                type="text" 
                placeholder={t('search_placeholder')}
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
            <div className="search-divider"></div>
            <select 
              className="search-select"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="">{t('property_type')}</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
            </select>
            <button className="btn btn-primary search-btn" onClick={handleSearch}>
              <Search size={20} />
              {t('search')}
            </button>
          </div>
        </div>
      </section>

      {/* Deal of the Week */}
      <section className="section-padding container">
        <div className="glass-panel" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg, rgba(30,30,30,0.9), rgba(20,20,20,0.9))', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'var(--color-secondary)', filter: 'blur(100px)', opacity: 0.2 }}></div>
          <div className="flex flex-col md:flex-row gap-xl items-center">
            <div style={{ flex: 1 }}>
              <div className="badge badge-secondary mb-sm" style={{ display: 'inline-block' }}>🔥 Deal of the Week</div>
              <h2 className="mb-sm">Luxury Waterfront Penthouse</h2>
              <p className="text-muted mb-md">Priced 15% below market value. Expected 8% annual yield. Secure this investment before the countdown ends.</p>
              <div className="flex gap-md mb-lg">
                <div className="text-center p-sm glass-panel" style={{ borderRadius: 'var(--radius-sm)', minWidth: '80px' }}>
                  <div className="font-bold text-gradient text-xl">03</div>
                  <div className="text-xs text-muted">DAYS</div>
                </div>
                <div className="text-center p-sm glass-panel" style={{ borderRadius: 'var(--radius-sm)', minWidth: '80px' }}>
                  <div className="font-bold text-gradient text-xl">14</div>
                  <div className="text-xs text-muted">HOURS</div>
                </div>
                <div className="text-center p-sm glass-panel" style={{ borderRadius: 'var(--radius-sm)', minWidth: '80px' }}>
                  <div className="font-bold text-gradient text-xl">45</div>
                  <div className="text-xs text-muted">MINS</div>
                </div>
              </div>
              <div className="flex items-center gap-md">
                <div>
                  <div className="text-sm text-muted" style={{ textDecoration: 'line-through' }}>$4,200,000</div>
                  <div className="font-bold text-secondary text-2xl">$3,600,000</div>
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/property/3')}>Claim Deal Now</button>
              </div>
            </div>
            <div style={{ flex: 1, position: 'relative' }}>
              <img src="/luxury_apartment.png" alt="Deal of the week" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: 'var(--radius-md)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }} />
              <div className="glass-panel flex items-center gap-sm" style={{ position: 'absolute', bottom: '-20px', left: '-20px', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>8%</div>
                <div>
                  <div className="font-bold">Projected ROI</div>
                  <div className="text-xs text-muted">Per Annum</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="featured-section section-padding container">
        <div className="flex justify-between items-end mb-xl">
          <div>
            <h2 className="mb-xs">{t('featured_properties')}</h2>
            <div className="heading-underline"></div>
          </div>
          <button className="btn btn-outline">{t('view_all')}</button>
        </div>
          
          <div className="properties-grid">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
      </section>

      {/* Value Proposition */}
      <section className="value-section section-padding">
        <div className="container">
          <div className="value-grid">
            <div className="value-content">
              <h2>Why Choose <span className="text-gradient">Aura Estates</span>?</h2>
              <p>We provide a seamless and premium experience for buyers and sellers alike. Our expert agents ensure you get the best deal.</p>
              <ul className="value-list">
                <li>Exclusive premium property listings</li>
                <li>Expert negotiation and market analysis</li>
                <li>24/7 dedicated support</li>
              </ul>
              <button className="btn btn-primary mt-lg">Learn More</button>
            </div>
            <div className="value-image-wrapper">
              <img src="/luxury_house.png" alt="Modern House" className="value-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Quiz Button */}
      <button 
        className="btn btn-secondary animate-fade-in" 
        style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 99, padding: '1rem 1.5rem', borderRadius: '50px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
        onClick={() => setIsQuizOpen(true)}
      >
        <Sparkles size={20} />
        Aura AI Matchmaker
      </button>

      <DreamHomeQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
};

export default Home;
