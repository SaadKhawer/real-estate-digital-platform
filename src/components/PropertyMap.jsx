import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const PropertyMap = ({ properties }) => {
  // Default to a central location (e.g., US center) if no properties
  const center = properties.length > 0 ? [39.8283, -98.5795] : [39.8283, -98.5795];

  // Dummy coordinates for mock data (since our mock data only has strings)
  // In a real app, coordinates would come from the database
  const getDummyCoords = (id) => {
    const baseLat = 39.8283 + (id % 10) * 2 - 10;
    const baseLng = -98.5795 + (id % 15) * 2 - 15;
    return [baseLat, baseLng];
  };

  return (
    <div className="map-container glass-panel" style={{ height: '500px', width: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <MapContainer center={center} zoom={4} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {properties.map(property => (
          <Marker key={property.id} position={getDummyCoords(property.id)}>
            <Popup>
              <div style={{ textAlign: 'center' }}>
                <img src={property.image} alt={property.title} style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                <h4 style={{ margin: '8px 0 4px', color: '#333' }}>{property.title}</h4>
                <p style={{ margin: 0, fontWeight: 'bold', color: '#c9a227' }}>
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(property.price)}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
