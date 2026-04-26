import React, { useState } from 'react';
import { X, Sparkles, Home, DollarSign, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DreamHomeQuiz = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const finishQuiz = () => {
    onClose();
    navigate('/properties?type=house');
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 100000 }}>
      <div className="modal-content glass-panel animate-fade-in" style={{ maxWidth: '600px' }}>
        <button className="close-modal" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="text-center mb-xl">
          <Sparkles size={48} className="text-secondary mx-auto mb-md" />
          <h2 className="mb-xs">Dream Home Finder</h2>
          <p className="text-muted">Let Aura AI find your perfect match in 3 simple steps.</p>
        </div>

        <div className="quiz-progress flex gap-xs mb-xl">
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ flex: 1, height: '4px', background: i <= step ? 'var(--color-secondary)' : 'rgba(255,255,255,0.1)', borderRadius: '2px' }}></div>
          ))}
        </div>

        {step === 1 && (
          <div className="animate-fade-in">
            <h3 className="mb-md flex items-center gap-sm"><MapPin /> Where do you want to live?</h3>
            <div className="flex flex-col gap-sm">
              <button className="btn btn-outline justify-start w-full" onClick={handleNext}>Urban City Center (Walkable, Active)</button>
              <button className="btn btn-outline justify-start w-full" onClick={handleNext}>Quiet Suburbs (Spacious, Family-Friendly)</button>
              <button className="btn btn-outline justify-start w-full" onClick={handleNext}>Waterfront / Beach (Relaxing, Views)</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h3 className="mb-md flex items-center gap-sm"><Home /> What's your style?</h3>
            <div className="grid grid-cols-2 gap-sm">
              <div className="glass-panel p-md text-center cursor-pointer hover-scale" onClick={handleNext}>
                <img src="/luxury_apartment.png" alt="Modern" style={{ height: '100px', objectFit: 'cover', borderRadius: '4px', marginBottom: '8px' }} />
                <div className="font-bold">Ultra-Modern</div>
              </div>
              <div className="glass-panel p-md text-center cursor-pointer hover-scale" onClick={handleNext}>
                <img src="/luxury_house.png" alt="Classic" style={{ height: '100px', objectFit: 'cover', borderRadius: '4px', marginBottom: '8px' }} />
                <div className="font-bold">Classic Luxury</div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h3 className="mb-md flex items-center gap-sm"><DollarSign /> What is your budget?</h3>
            <div className="flex flex-col gap-sm">
              <button className="btn btn-outline justify-start w-full" onClick={handleNext}>$500k - $1M (Premium Entry)</button>
              <button className="btn btn-outline justify-start w-full" onClick={handleNext}>$1M - $3M (Luxury Standard)</button>
              <button className="btn btn-outline justify-start w-full" onClick={handleNext}>$3M+ (Ultra-Luxury Estates)</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-in text-center">
            <div className="mb-lg">
              <Sparkles size={64} className="text-secondary mx-auto mb-md spin-animation" />
              <h3>Analyzing your preferences...</h3>
              <p className="text-muted">Aura AI is scanning thousands of off-market and active listings.</p>
            </div>
            <button className="btn btn-primary w-full py-md text-lg" onClick={finishQuiz}>View My Top 3 Matches</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DreamHomeQuiz;
