import React from 'react';

const About = () => {
  return (
    <div className="section-padding container" style={{ marginTop: '80px' }}>
      <div className="text-center mb-xl">
        <h1 className="text-gradient mb-sm">About Aura Estates</h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Redefining luxury real estate globally. We specialize in the most exclusive properties in the world's most desirable locations.
        </p>
      </div>

      <div className="flex flex-col gap-xl">
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
          <h2 className="mb-md">Our Vision</h2>
          <p className="text-muted">
            Founded in 2026, Aura Estates was born out of a desire to elevate the real estate experience. We believe that finding your dream home should be as luxurious as the property itself. Our curated portfolio includes exclusive off-market listings, architectural masterpieces, and unparalleled beachfront properties.
          </p>
        </div>

        <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="glass-panel text-center" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
            <h3 className="text-secondary mb-sm">500+</h3>
            <p className="font-bold">Properties Sold</p>
          </div>
          <div className="glass-panel text-center" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
            <h3 className="text-secondary mb-sm">$2B+</h3>
            <p className="font-bold">Sales Volume</p>
          </div>
          <div className="glass-panel text-center" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
            <h3 className="text-secondary mb-sm">50+</h3>
            <p className="font-bold">Expert Agents</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
