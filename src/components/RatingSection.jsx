/* eslint-disable react/prop-types */

import { useState } from "react";

export default function RatingComponent({
  totalRating,
  reviewsCount,
  ratings,
}) {
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={`inline-block ${
            i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const [rating, setRating] = useState(0);

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRating(newRating);
  };

  // Helper function to render rating bars
  const renderRatingBars = () => {
    // This data would come from your state or props
    //const ratings = { 5: 80, 4: 15, 3: 3, 2: 1, 1: 1 }; // Percentages
    return Object.keys(ratings)
      .sort((a, b) => ratings[b] - ratings[a])
      .map((key) => (
        <div key={key} className="flex items-center space-x-1">
          <span className="text-gray-600">{key}</span>
          <div className="w-full bg-gray-200 rounded h-2">
            <div
              className="bg-green-500 h-2 rounded"
              style={{ width: `${ratings[key]}%` }}
            ></div>
          </div>
        </div>
      ));
  };

  const starSpacingStyle = `
    .star-spacing > svg {
    margin: 0 2px !important; /* Adjust the value as needed */
    }`;

  return (
    <div className="p-4 border border-gray-200 rounded-lg mb-10 ml-2 mr-2">
      {/* <div className="my-4 flex flex-col items-center justify-center">
        <p className="text-lg mb-2">How do you rate this place?</p>
        <div className={starSpacingStyle}><Rating
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
          value={rating}
          classNames="flex justify-center"
        /></div>
        </div> */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Ratings and reviews</h2>
        {/* <span className="text-sm text-gray-500">Ratings and reviews are verified</span> */}
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex flex-col items-center">
          <span className="text-5xl font-bold text-green-600">
            {totalRating}
          </span>
          <span className="flex text-yellow-400 text-xl">
            {renderStars(totalRating)}
          </span>
          <span className="text-gray-500">{reviewsCount} reviews</span>
        </div>
        <div className="w-full">{renderRatingBars()}</div>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {/* Icons would be replaced with actual SVGs or icon components */}
        <button className="p-2 border border-gray-300 rounded text-gray-600">
          Warm
        </button>
        <button className="p-2 border border-gray-300 rounded text-gray-600">
          Hike
        </button>
        <button className="p-2 border border-gray-300 rounded text-gray-600">
          Treking
        </button>
        <button className="p-2 border border-gray-300 rounded text-gray-600">
          Beach
        </button>
        <button className="p-2 border border-gray-300 rounded text-gray-600">
          Cold
        </button>
      </div>
      {/* <div className="my-4 flex flex-col items-center justify-center">
        <p className="text-lg mb-2">How do you rate this place?</p>
        <div className={starSpacingStyle}><Rating
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
          value={rating}
          classNames="flex justify-center"
        /></div>
        </div> */}
    </div>
  );
}
