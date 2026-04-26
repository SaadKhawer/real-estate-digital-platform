import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]);

  // Load from backend when user logs in, otherwise use local storage
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        try {
          const [favRes, compRes] = await Promise.all([
            fetch(`/api/user/${user.id}/favorites`),
            fetch(`/api/user/${user.id}/compare`)
          ]);
          if (favRes.ok) setFavorites(await favRes.json());
          if (compRes.ok) setCompareList(await compRes.json());
        } catch (error) {
          console.error('Error fetching user data', error);
        }
      } else {
        const savedFavs = localStorage.getItem('aura_favorites');
        if (savedFavs) setFavorites(JSON.parse(savedFavs));
        
        const savedCompare = localStorage.getItem('aura_compare');
        if (savedCompare) setCompareList(JSON.parse(savedCompare));
      }
    };
    fetchUserData();
  }, [user]);

  // Sync to localStorage as a fallback for non-logged in users
  useEffect(() => {
    if (!user) {
      localStorage.setItem('aura_favorites', JSON.stringify(favorites));
      localStorage.setItem('aura_compare', JSON.stringify(compareList));
    }
  }, [favorites, compareList, user]);

  const toggleFavorite = async (propertyId) => {
    setFavorites(prev => {
      const isFav = prev.includes(propertyId);
      const updated = isFav ? prev.filter(id => id !== propertyId) : [...prev, propertyId];
      
      // Sync with backend asynchronously
      if (user?.id) {
        const method = isFav ? 'DELETE' : 'POST';
        fetch(`/api/user/${user.id}/favorites${isFav ? '/' + propertyId : ''}`, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: isFav ? null : JSON.stringify({ propertyId })
        }).catch(err => console.error('Error syncing favorite', err));
      }
      return updated;
    });
  };

  const toggleCompare = async (propertyId) => {
    setCompareList(prev => {
      const isComp = prev.includes(propertyId);
      const updated = isComp ? prev.filter(id => id !== propertyId) : [...prev, propertyId];
      
      // Sync with backend asynchronously
      if (user?.id) {
        const method = isComp ? 'DELETE' : 'POST';
        fetch(`/api/user/${user.id}/compare${isComp ? '/' + propertyId : ''}`, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: isComp ? null : JSON.stringify({ propertyId })
        }).catch(err => console.error('Error syncing compare', err));
      }
      return updated;
    });
  };

  const isFavorite = (propertyId) => favorites.includes(propertyId);

  return (
    <AppContext.Provider value={{ favorites, toggleFavorite, isFavorite, compareList, toggleCompare }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
