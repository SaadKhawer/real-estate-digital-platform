import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ReviewModal = ({ isOpen, onClose, propertyId, onReviewAdded }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to write a review.');
      return;
    }
    if (!comment.trim()) {
      setError('Please write a comment.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/properties/${propertyId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, rating, comment })
      });
      const data = await res.json();
      if (data.success) {
        setComment('');
        setRating(5);
        if (onReviewAdded) onReviewAdded();
        onClose();
      } else {
        setError(data.message || 'Failed to submit review');
      }
    } catch (err) {
      console.error(err);
      setError('Server error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel animate-fade-in" style={{ maxWidth: '500px' }}>
        <div className="flex justify-between items-center mb-md">
          <h3>Write a Review</h3>
          <button className="close-modal" onClick={onClose} style={{ position: 'relative', top: 0, right: 0 }}>
            <X size={24} />
          </button>
        </div>

        {!user ? (
          <div className="text-center py-md text-error">
            You must be logged in to write a review.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-md">
              <label className="block mb-xs text-sm font-bold">Rating</label>
              <div className="flex gap-xs cursor-pointer">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star 
                    key={star} 
                    size={28} 
                    fill={star <= rating ? "var(--color-secondary)" : "none"}
                    color="var(--color-secondary)"
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>

            <div className="mb-md">
              <label className="block mb-xs text-sm font-bold">Your Review</label>
              <textarea 
                className="form-input" 
                rows="4" 
                placeholder="What did you think of this property?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>

            {error && <p className="text-error text-sm mb-md">{error}</p>}

            <button 
              type="submit" 
              className="btn btn-primary w-full justify-center" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;
