import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MapPin } from 'lucide-react';
import './Discover.css';

const dummyVideos = [
  {
    id: 1,
    title: "Modern Glass Villa - $3.2M",
    location: "Miami Beach, FL",
    likes: "12.4k",
    comments: "342",
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4" // Placeholder video
  },
  {
    id: 2,
    title: "Skyline View Penthouse - $4.5M",
    location: "New York, NY",
    likes: "8.9k",
    comments: "156",
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4" // Placeholder video
  },
  {
    id: 3,
    title: "Seaside Mansion - $1.8M",
    location: "Malibu, CA",
    likes: "24.1k",
    comments: "892",
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4" // Placeholder video
  }
];

const Discover = () => {
  const [liked, setLiked] = useState({});

  const toggleLike = (id) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="discover-page bg-black" style={{ height: '100vh', width: '100%', overflowY: 'scroll', scrollSnapType: 'y mandatory' }}>
      {dummyVideos.map((video) => (
        <div key={video.id} className="video-container" style={{ height: '100vh', width: '100%', scrollSnapAlign: 'start', position: 'relative', display: 'flex', justifyContent: 'center', backgroundColor: '#000' }}>
          
          <video 
            src={video.videoSrc} 
            autoPlay 
            loop 
            muted 
            playsInline
            style={{ height: '100%', maxWidth: '100%', objectFit: 'cover' }}
          />

          {/* Overlay Info */}
          <div style={{ position: 'absolute', bottom: '100px', left: '20px', right: '80px', zIndex: 10, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            <h2 className="mb-xs flex items-center gap-sm">{video.title}</h2>
            <p className="flex items-center gap-xs text-muted font-bold"><MapPin size={16} /> {video.location}</p>
            <p className="text-sm mt-sm">Absolutely stunning architecture with panoramic views. Would you live here? 👇 #luxuryrealestate #dreamhome</p>
          </div>

          {/* Overlay Actions */}
          <div className="flex flex-col gap-lg items-center" style={{ position: 'absolute', bottom: '100px', right: '20px', zIndex: 10 }}>
            <div className="flex flex-col items-center gap-xs cursor-pointer hover-scale" onClick={() => toggleLike(video.id)}>
              <div style={{ background: 'rgba(0,0,0,0.5)', padding: '12px', borderRadius: '50%' }}>
                <Heart size={28} fill={liked[video.id] ? "var(--color-error)" : "none"} color={liked[video.id] ? "var(--color-error)" : "white"} />
              </div>
              <span className="text-white text-sm font-bold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{video.likes}</span>
            </div>

            <div className="flex flex-col items-center gap-xs cursor-pointer hover-scale">
              <div style={{ background: 'rgba(0,0,0,0.5)', padding: '12px', borderRadius: '50%' }}>
                <MessageCircle size={28} color="white" />
              </div>
              <span className="text-white text-sm font-bold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{video.comments}</span>
            </div>

            <div className="flex flex-col items-center gap-xs cursor-pointer hover-scale">
              <div style={{ background: 'rgba(0,0,0,0.5)', padding: '12px', borderRadius: '50%' }}>
                <Share2 size={28} color="white" />
              </div>
              <span className="text-white text-sm font-bold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Share</span>
            </div>
            
            <div style={{ marginTop: '20px' }}>
              <img src="/luxury_villa.png" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid white', objectFit: 'cover' }} alt="Profile" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Discover;
