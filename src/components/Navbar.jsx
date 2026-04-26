import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, User, List, LogOut, Globe, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { AuthModal } from './AuthModals';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ur' : 'en';
    i18n.changeLanguage(newLang);
    document.dir = newLang === 'ur' ? 'rtl' : 'ltr';
  };

  const openAuth = (mode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <>
      <nav className="navbar glass-panel">
        <div className="container flex justify-between items-center h-100">
          <Link to="/" className="brand flex items-center gap-sm">
          <Home size={28} color="var(--color-secondary)" weight="bold" />
          <span className="brand-text">Aura<span className="text-gradient">Estates</span></span>
        </Link>
        
        <ul className="nav-links flex gap-lg">
          <li><Link to="/">{t('home')}</Link></li>
          <li><Link to="/properties">{t('properties')}</Link></li>
          <li><Link to="/discover" className="text-gradient font-bold"><Sparkles size={14} style={{display:'inline'}}/> Discover</Link></li>
          <li><Link to="/about">{t('about')}</Link></li>
          <li><Link to="/contact">{t('contact')}</Link></li>
        </ul>

        <div className="nav-actions flex gap-sm">
          <button className="btn btn-outline flex items-center gap-xs" onClick={toggleLanguage} style={{ padding: '0.5rem 1rem' }}>
            <Globe size={16} />
            {i18n.language === 'en' ? 'UR' : 'EN'}
          </button>
          {user ? (
            <div className="flex items-center gap-md ml-sm">
              <span className="font-bold text-gradient cursor-pointer" onClick={() => navigate('/dashboard')}>
                {user.name.split(' ')[0]}
              </span>
              <button className="btn btn-outline" onClick={logout} style={{ padding: '0.5rem 1rem' }}>
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <>
              <button className="btn btn-outline" onClick={() => openAuth('login')}>{t('login')}</button>
              <button className="btn btn-primary" onClick={() => openAuth('signup')}>{t('signup')}</button>
            </>
          )}
          </div>
        </div>
      </nav>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} initialMode={authMode} />
    </>
  );
};

export default Navbar;
