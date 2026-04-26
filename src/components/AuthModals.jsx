import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './AuthModals.css';

export const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login, signup } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'signup') {
      const res = signup(name, email, password);
      if (res.success) {
        onClose();
      } else {
        setError(res.message);
      }
    } else {
      const res = login(email, password);
      if (res.success) {
        onClose();
      } else {
        setError(res.message);
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel animate-fade-in" style={{ maxWidth: '400px' }}>
        <button className="close-modal" onClick={onClose}>
          <X size={24} />
        </button>
        
        <h3 className="mb-md text-center">{mode === 'login' ? 'Welcome Back' : 'Create an Account'}</h3>
        
        {error && <div className="auth-error mb-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-md">
          {mode === 'signup' && (
            <div className="input-group">
              <label>Full Name</label>
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button type="submit" className="btn btn-primary mt-sm w-full">
            {mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-divider flex items-center gap-sm mt-md mb-md">
          <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }}></div>
          <span className="text-muted text-sm">OR</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }}></div>
        </div>

        <div className="social-auth flex flex-col gap-sm">
          <button className="btn btn-outline w-full justify-center" onClick={() => {
            login('demo@google.com', 'demo');
            onClose();
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25C22.56 11.47 22.49 10.71 22.36 9.97H12V14.28H17.92C17.66 15.68 16.85 16.86 15.68 17.65V20.45H19.24C21.32 18.53 22.56 15.66 22.56 12.25Z" fill="#4285F4"/>
              <path d="M12 23C14.97 23 17.46 22.02 19.24 20.45L15.68 17.65C14.72 18.29 13.47 18.68 12 18.68C9.15 18.68 6.74 16.76 5.88 14.17H2.21V17.02C4.01 20.59 7.7 23 12 23Z" fill="#34A853"/>
              <path d="M5.88 14.17C5.66 13.51 5.54 12.77 5.54 12C5.54 11.23 5.66 10.49 5.88 9.83V6.98H2.21C1.46 8.47 1.04 10.18 1.04 12C1.04 13.82 1.46 15.53 2.21 17.02L5.88 14.17Z" fill="#FBBC05"/>
              <path d="M12 5.32C13.62 5.32 15.06 5.88 16.21 6.98L19.33 3.86C17.45 2.11 14.97 1 12 1C7.7 1 4.01 3.41 2.21 6.98L5.88 9.83C6.74 7.24 9.15 5.32 12 5.32Z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
          <button className="btn btn-outline w-full justify-center">
            Continue with Facebook
          </button>
        </div>

        <div className="text-center mt-md text-sm text-muted">
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button" 
            className="text-secondary" 
            style={{ background: 'none', border: 'none', fontWeight: 'bold' }}
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          >
            {mode === 'login' ? 'Sign Up' : 'Log In'}
          </button>
        </div>
      </div>
    </div>
  );
};
