import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Discover from './pages/Discover';
import AIChatbot from './components/AIChatbot';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import './i18n';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/discover" element={<Discover />} />
          </Routes>
        </main>
        <Footer />
          <AIChatbot />
        </div>
      </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
