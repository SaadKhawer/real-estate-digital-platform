import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import PropertyMap from '../components/PropertyMap';
import CompareModal from '../components/CompareModal';
import { useAppContext } from '../context/AppContext';
import { Search, SlidersHorizontal, Map, Grid, Scale } from 'lucide-react';
import './Properties.css';

const Properties = () => {
  const [searchParams] = useSearchParams();
  const locationQuery = searchParams.get('location')?.toLowerCase() || '';
  const typeQuery = searchParams.get('type') || '';

  const { compareList } = useAppContext();

  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        setProperties(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = properties;

    // Apply URL search params
    if (locationQuery) {
      result = result.filter(p => p.location.toLowerCase().includes(locationQuery));
    }
    if (typeQuery) {
      result = result.filter(p => p.propertyType === typeQuery);
    }

    // Apply local filter buttons (All, Sale, Rent)
    const filtered = result.filter(p => {
      if (filter !== 'All' && p.type !== filter) return false;
      if (verifiedOnly && !p.isVerified) return false;
      
      return true;
    });
    
    setFilteredProperties(filtered);
  }, [properties, locationQuery, typeQuery, filter, verifiedOnly]);

  if (loading) {
    return <div className="properties-page section-padding" style={{ marginTop: '80px' }}><div className="container text-center">Loading properties...</div></div>;
  }

  return (
    <div className="properties-page section-padding" style={{ marginTop: '80px' }}>
      <div className="container">
        <div className="page-header text-center mb-xl">
          <h1>Explore <span className="text-gradient">Properties</span></h1>
          <p className="text-muted">Find your perfect home from our exclusive listings.</p>
        </div>

        <div className="filters-container glass-panel mb-lg">
          <div className="filter-group">
            <button 
              className={`filter-btn ${filter === 'All' ? 'active' : ''}`}
              onClick={() => setFilter('All')}
            >
              All Properties
            </button>
            <button 
              className={`filter-btn ${filter === 'Sale' ? 'active' : ''}`}
              onClick={() => setFilter('Sale')}
            >
              For Sale
            </button>
            <button 
              className={`filter-btn ${filter === 'Rent' ? 'active' : ''}`}
              onClick={() => setFilter('Rent')}
            >
              For Rent
            </button>
          </div>
          
          <div className="filter-actions flex items-center gap-md">
            <label className="flex items-center gap-xs cursor-pointer text-sm font-bold">
              <input 
                type="checkbox" 
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--color-secondary)' }}
              />
              Verified Only
            </label>
            <button className="btn btn-outline"><SlidersHorizontal size={18} /> Filters</button>
            
            <div className="view-toggle flex gap-xs ml-sm glass-panel" style={{ padding: '4px', borderRadius: 'var(--radius-sm)' }}>
              <button 
                className={`btn ${viewMode === 'grid' ? 'btn-primary' : ''}`} 
                style={{ padding: '0.5rem' }}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={20} />
              </button>
              <button 
                className={`btn ${viewMode === 'map' ? 'btn-primary' : ''}`} 
                style={{ padding: '0.5rem' }}
                onClick={() => setViewMode('map')}
              >
                <Map size={20} />
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="properties-grid mt-xl">
            {filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="mt-xl">
            <PropertyMap properties={filteredProperties} />
          </div>
        )}
      </div>

      {compareList.length > 0 && (
        <div className="compare-sticky-bar animate-fade-in glass-panel" style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', padding: '1rem 2rem', borderRadius: '50px', zIndex: 1000, display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <span className="font-bold">{compareList.length} Property{compareList.length > 1 ? 'ies' : ''} Selected</span>
          <button className="btn btn-secondary flex items-center gap-xs" onClick={() => setIsCompareModalOpen(true)}>
            <Scale size={18} />
            Compare Now
          </button>
        </div>
      )}

      <CompareModal 
        isOpen={isCompareModalOpen} 
        onClose={() => setIsCompareModalOpen(false)} 
        compareIds={compareList} 
      />
    </div>
  );
};

export default Properties;
