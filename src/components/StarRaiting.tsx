import React from "react";
import { Star } from "lucide-react";

interface StarProps {
  star: number;
}

const StarRating: React.FC<StarProps> = ({ star }) => {
  // Ensure star value is between 0 and 6
  const validStar = Math.max(0, Math.min(star, 6));

  return (
    <div className="flex mt-4">
      {Array.from({ length: validStar }).map((_, index) => (
          // <img key={index} src={yellowStar} className="w-8" alt="star" />
          <Star/>
      ))}
    </div>
  );
};

export default StarRating 
