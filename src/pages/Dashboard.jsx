import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import PropertyCard from '../components/PropertyCard';
import { Settings, User, Heart, Bell, Save, CheckCircle } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { favorites } = useAppContext();
  const [properties, setProperties] = useState([]);
  const [activeTab, setActiveTab] = useState('favorites');
  const [showNotification, setShowNotification] = useState(false);

  // Profile State
  const [profileData, setProfileData] = useState({
    phone: '',
    address: '',
    bio: ''
  });

  // Settings State
  const [settings, setSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    darkMode: true
  });

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => setProperties(data))
      .catch(err => console.error(err));
  }, []);

  if (!user) {
    return <div className="section-padding container text-center" style={{ marginTop: '80px' }}>Please log in to view your dashboard.</div>;
  }

  const favoriteProperties = properties.filter(p => favorites.includes(p.id));

  const handleSave = (e) => {
    e.preventDefault();
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'favorites':
        return (
          <div className="glass-panel animate-fade-in" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
            <h2 className="mb-md flex items-center gap-sm"><Heart className="text-error" /> Your Saved Properties</h2>
            {favoriteProperties.length === 0 ? (
              <div className="text-center py-lg text-muted">
                <p>You haven't saved any properties yet.</p>
                <a href="/properties" className="btn btn-outline mt-sm">Browse Properties</a>
              </div>
            ) : (
              <div className="properties-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                {favoriteProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        );
      
      case 'profile':
        return (
          <div className="glass-panel animate-fade-in" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
            <h2 className="mb-md flex items-center gap-sm"><User className="text-secondary" /> Profile Details</h2>
            <form onSubmit={handleSave} className="flex flex-col gap-md" style={{ maxWidth: '600px' }}>
              <div>
                <label className="block mb-xs text-sm font-bold">Full Name</label>
                <input type="text" className="form-input" defaultValue={user.name} disabled style={{ opacity: 0.7 }} />
                <p className="text-xs text-muted mt-xs">Name cannot be changed here.</p>
              </div>
              <div>
                <label className="block mb-xs text-sm font-bold">Email Address</label>
                <input type="email" className="form-input" defaultValue={user.email} disabled style={{ opacity: 0.7 }} />
              </div>
              <div>
                <label className="block mb-xs text-sm font-bold">Phone Number</label>
                <input 
                  type="tel" 
                  className="form-input" 
                  placeholder="+1 (555) 000-0000" 
                  value={profileData.phone}
                  onChange={e => setProfileData({...profileData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block mb-xs text-sm font-bold">Mailing Address</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="123 Luxury Ave, City" 
                  value={profileData.address}
                  onChange={e => setProfileData({...profileData, address: e.target.value})}
                />
              </div>
              <div>
                <label className="block mb-xs text-sm font-bold">Short Bio</label>
                <textarea 
                  className="form-input" 
                  rows="3" 
                  placeholder="Tell agents a bit about what you're looking for..."
                  value={profileData.bio}
                  onChange={e => setProfileData({...profileData, bio: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary mt-sm"><Save size={18} /> Save Changes</button>
            </form>
          </div>
        );

      case 'alerts':
        return (
          <div className="glass-panel animate-fade-in" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
            <h2 className="mb-md flex items-center gap-sm"><Bell className="text-secondary" /> Alerts & Notifications</h2>
            <div className="flex flex-col gap-md" style={{ maxWidth: '600px' }}>
              <div className="flex justify-between items-center p-md" style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <h4 className="font-bold">Email Alerts</h4>
                  <p className="text-sm text-muted">Receive emails for new properties matching your favorites.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.emailAlerts} 
                  onChange={e => setSettings({...settings, emailAlerts: e.target.checked})}
                  style={{ width: '20px', height: '20px' }}
                />
              </div>
              <div className="flex justify-between items-center p-md" style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <h4 className="font-bold">SMS Notifications</h4>
                  <p className="text-sm text-muted">Get instant text messages for price drops on saved homes.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.smsAlerts} 
                  onChange={e => setSettings({...settings, smsAlerts: e.target.checked})}
                  style={{ width: '20px', height: '20px' }}
                />
              </div>
              <button className="btn btn-primary mt-sm" onClick={handleSave}><Save size={18} /> Update Preferences</button>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="glass-panel animate-fade-in" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
            <h2 className="mb-md flex items-center gap-sm"><Settings className="text-secondary" /> Account Settings</h2>
            <div className="flex flex-col gap-md" style={{ maxWidth: '600px' }}>
              <div className="flex justify-between items-center p-md" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <h4 className="font-bold">Change Password</h4>
                <button className="btn btn-outline btn-sm">Update</button>
              </div>
              <div className="flex justify-between items-center p-md" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <h4 className="font-bold">Two-Factor Authentication</h4>
                <button className="btn btn-outline btn-sm">Enable</button>
              </div>
              <div className="flex justify-between items-center p-md">
                <h4 className="font-bold text-error">Delete Account</h4>
                <button className="btn btn-outline btn-sm" style={{ borderColor: 'var(--color-error)', color: 'var(--color-error)' }}>Delete</button>
              </div>
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="dashboard-page section-padding" style={{ marginTop: '80px', minHeight: '80vh' }}>
      <div className="container">
        <div className="dashboard-header mb-xl relative">
          <h1>Welcome, <span className="text-gradient">{user.name}</span></h1>
          <p className="text-muted">Manage your saved properties, alerts, and account settings.</p>

          {showNotification && (
            <div className="absolute animate-fade-in flex items-center gap-sm" style={{ top: 0, right: 0, background: 'var(--color-success)', color: '#000', padding: '0.75rem 1.5rem', borderRadius: '50px', fontWeight: 'bold' }}>
              <CheckCircle size={20} /> Successfully Saved!
            </div>
          )}
        </div>

        <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem', alignItems: 'start' }}>
          <div className="sidebar flex flex-col gap-sm" style={{ position: 'sticky', top: '100px' }}>
            <button 
              className={`btn ${activeTab === 'favorites' ? 'btn-primary' : 'btn-outline'} justify-start`}
              onClick={() => setActiveTab('favorites')}
            >
              <Heart size={18} /> Saved Properties
            </button>
            <button 
              className={`btn ${activeTab === 'alerts' ? 'btn-primary' : 'btn-outline'} justify-start`}
              onClick={() => setActiveTab('alerts')}
            >
              <Bell size={18} /> Alerts & Notifications
            </button>
            <button 
              className={`btn ${activeTab === 'profile' ? 'btn-primary' : 'btn-outline'} justify-start`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={18} /> Profile Details
            </button>
            <button 
              className={`btn ${activeTab === 'settings' ? 'btn-primary' : 'btn-outline'} justify-start`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={18} /> Account Settings
            </button>
          </div>

          <div className="dashboard-content">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
