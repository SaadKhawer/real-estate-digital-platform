import React from 'react';
import './Footer.css';
import { Globe, Mail, Phone, MessageSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-col">
          <h3 className="footer-brand">Aura<span className="text-gradient">Estates</span></h3>
          <p className="footer-desc">
            Redefining luxury real estate. Find your dream home with our premium selection of properties.
          </p>
          <div className="social-links flex gap-sm">
            <a href="#"><Globe size={20} /></a>
            <a href="#"><MessageSquare size={20} /></a>
            <a href="#"><Mail size={20} /></a>
            <a href="#"><Phone size={20} /></a>
          </div>
        </div>
        
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/properties">Properties</a></li>
            <li><a href="/agents">Our Agents</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul>
            <li>123 Luxury Lane, Beverly Hills, CA 90210</li>
            <li>contact@auraestates.com</li>
            <li>+1 (555) 123-4567</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Aura Estates. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
