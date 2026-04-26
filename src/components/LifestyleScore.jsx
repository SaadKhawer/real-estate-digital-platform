import React from 'react';
import { GraduationCap, ShieldCheck, Bus } from 'lucide-react';

const LifestyleScore = () => {
  return (
    <div className="glass-panel mt-xl" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
      <h3 className="mb-md flex items-center gap-sm">Nearby Lifestyle Score</h3>
      <p className="text-muted mb-lg">Based on our data, this neighborhood ranks exceptionally well for key lifestyle indicators.</p>
      
      <div className="flex flex-col gap-md">
        <div>
          <div className="flex justify-between items-center mb-xs">
            <span className="flex items-center gap-xs font-bold"><GraduationCap size={18} className="text-secondary" /> Schools & Education</span>
            <span className="font-bold text-secondary">92/100</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '92%', height: '100%', background: 'var(--color-secondary)' }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-xs">
            <span className="flex items-center gap-xs font-bold"><ShieldCheck size={18} className="text-accent" /> Safety & Low Crime</span>
            <span className="font-bold text-accent">88/100</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '88%', height: '100%', background: 'var(--color-accent)' }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-xs">
            <span className="flex items-center gap-xs font-bold"><Bus size={18} className="text-primary" /> Transport & Walkability</span>
            <span className="font-bold text-primary">75/100</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '75%', height: '100%', background: 'var(--color-primary)' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifestyleScore;
