// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function Rating() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  return (
    <div>
      {[...Array(1)].map((star, index) => {
        const currentRating = index + 1;
        return (
          // eslint-disable-next-line react/jsx-key
          <label key={index}>
            <input
              className="hidden"
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => setRating(currentRating)}
            />
            <FaStar
              className="cursor-pointer"
              size={30}
              color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}
