
import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  totalStars?: number;
  initialRating?: number;
  onChange?: (rating: number) => void;
  size?: number;
  readOnly?: boolean;
}

const StarRatingSolution: React.FC<StarRatingProps> = ({
  totalStars = 5,
  initialRating = 0,
  onChange,
  size = 24,
  readOnly = false,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  
  const handleClick = (newRating: number) => {
    if (readOnly) return;
    
    setRating(newRating);
    onChange?.(newRating);
  };
  
  const handleMouseEnter = (starIndex: number) => {
    if (readOnly) return;
    setHoverRating(starIndex);
  };
  
  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverRating(0);
  };
  
  return (
    <div className="flex items-center space-x-1">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = hoverRating ? starValue <= hoverRating : starValue <= rating;
        
        return (
          <button
            key={index}
            type="button"
            className={`focus:outline-none transition-colors ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            disabled={readOnly}
            aria-label={`Rate ${starValue} out of ${totalStars} stars`}
          >
            <Star
              size={size}
              fill={isFilled ? 'currentColor' : 'none'}
              className={isFilled ? 'text-amber-400' : 'text-gray-300'}
              strokeWidth={1.5}
            />
          </button>
        );
      })}
      
      <span className="text-sm ml-2 text-muted-foreground">
        {hoverRating || rating || 0} of {totalStars}
      </span>
    </div>
  );
};

const StarRatingDemo: React.FC = () => {
  const [userRating, setUserRating] = useState(0);
  
  const handleRatingChange = (newRating: number) => {
    setUserRating(newRating);
  };
  
  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Interactive Rating</h3>
        <StarRatingSolution 
          onChange={handleRatingChange} 
          initialRating={userRating}
        />
        {userRating > 0 && (
          <p className="text-sm text-muted-foreground mt-2">
            You rated this {userRating} {userRating === 1 ? 'star' : 'stars'}
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Read-only Rating</h3>
        <StarRatingSolution initialRating={3.5} readOnly />
        <p className="text-sm text-muted-foreground">This product has a fixed rating</p>
      </div>
    </div>
  );
};

export default StarRatingDemo;
