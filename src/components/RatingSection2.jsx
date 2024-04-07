import  { useEffect, useState } from 'react';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase'; // Adjust the import path as per your setup

export default function RatingComponent({ pageID, refreshRating }) {
    const [tags, setTags] = useState([]);
    const [ratingsSummary, setRatingsSummary] = useState({
        totalRating: 0,
        reviewsCount: 0,
        ratings: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    });

    useEffect(() => {
        async function fetchData() {
        await fetchTags();
        await fetchCommentsAndCalculateRatings();
        }

        fetchData();
    }, [pageID,refreshRating]); // Dependency array to re-run the effect if pageID changes

    const fetchTags = async () => {
        const docRef = doc(db, 'destinations', pageID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setTags(docSnap.data().tags || []);
        } else {
            console.log('No destination found with ID:', pageID);
        }
    };

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


    const fetchCommentsAndCalculateRatings = async () => {
        const docRef = doc(db, 'comments', pageID);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
            const comments = docSnap.data().comments; // Assuming 'comments' is the array of comments
            let totalRating = 0;
            let ratingsCount = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  
            comments.forEach((comment) => {
                totalRating += comment.rating;
                if (ratingsCount.hasOwnProperty(comment.rating)) {
                ratingsCount[comment.rating] += 1;
                }
            });
  
            const reviewsCount = comments.length;
            const averageRating = reviewsCount > 0 ? (totalRating / reviewsCount).toFixed(1) : "N/A";
  
            setRatingsSummary({
                totalRating: averageRating,
                reviewsCount,
                ratings: ratingsCount,
            });
            } else {
                console.log('No comments found for this destination.');
        }
    };
    const renderRatingBars = (ratings, reviewsCount) => {
        const totalRatings = Object.values(ratings).reduce((acc, count) => acc + count, 0);
        return Object.entries(ratings).sort(([a], [b]) => b - a).map(([star, count]) => (
            <div key={star} className="flex items-center space-x-1">
                <span className="text-gray-600">{star}</span>
                <div className="w-full bg-gray-200 rounded h-2">
                  <div
                    // className="bg-green-500 h-2 rounded"
                    className={`h-2 rounded ${totalRatings === 0 ? 'bg-gray-300' : 'bg-green-500'}`}
                    style={{ width: `${(count / reviewsCount) * 100}%` }}
                  ></div>
                </div>
            </div>
        ));
    };

    return (
    
        <div className="p-4 border border-gray-200 rounded-lg mb-10 ml-2 mr-2">
         
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Ratings and reviews</h2>
              {/* <span className="text-sm text-gray-500">Ratings and reviews are verified</span> */}
            </div>
            <div className="flex gap-4 items-center">
                <div className="flex flex-col items-center">
                    <span className={`text-5xl font-bold ${(ratingsSummary.totalRating > 0) ? "text-green-600" : "text-grey-500"}`}>
                        {(ratingsSummary.totalRating > 0) ? ratingsSummary.totalRating : "N\\A"}
                    </span>
                    <span className="flex text-yellow-400 text-xl">
                        {renderStars(ratingsSummary.totalRating)}
                    </span>
                    <span className="text-gray-500">{ratingsSummary.reviewsCount} reviews</span>
                </div>
                <div className="w-full">{renderRatingBars(ratingsSummary.ratings,ratingsSummary.reviewsCount)}</div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
      
              {tags.map((tag, index) => (
                  <button key={index} className="p-2 border border-gray-300 rounded text-gray-600">
                  {tag}
                  </button>
              ))}
            </div>
          
        </div>
  );
}
