import React, { useState } from 'react';
import profilePic from '../assets/sigiriya.png'; // Replace with your actual profile image import
import Rating from 'react-rating-stars-component';



const CommentSection2 = ({ commentsData }) => {
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRating(newRating);
  };

  const handleSend = () => {
    if (newComment.trim()) {
      // Handle sending the comment to your server or state here
      setNewComment('');
    }
  };

  return (
    <div className="space-y-8 ml-2 mr-2">
    <div className="max-h-96 overflow-y-auto"> 
      {commentsData.map((comment) => (
        <div key={comment.id} className="bg-white shadow p-4 rounded-lg">
          <div className="flex items-center mb-4 ">
            <img src={profilePic} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
            <div>
              <div className="font-semibold">{comment.user}</div>
              <div className="text-gray-500 text-sm">{comment.date}</div>
            </div>
          </div>
          <div className="text-gray-800 text-lg">
            <Rating
              count={5}
              onChange={() => {}}
              size={24}
              activeColor="#ffd700"
              value={comment.rating}
              edit={false} // make stars read-only
            />
          </div>
          <p className="mt-2 text-gray-600">{comment.text}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-gray-500 text-sm">{`${comment.helpfulCount} people found this review helpful`}</span>
            <div className="flex gap-4">
              <button className="text-blue-600">Yes</button>
              <button className="text-blue-600">No</button>
            </div>
          </div>
        
        </div>
      ))}
      </div>

      <div className="flex flex-col items-center justify-center">
        <p className="text-lg mb-2">How do you rate this item?</p>
        <Rating
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
          value={rating}
          classNames="flex space-x-1"
        />
      </div>

      <div className="flex items-center gap-2 ">
      
        <img src={profilePic} alt="Your Profile" className="w-10 h-10 rounded-full" />
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border p-2 rounded-lg flex-1"
          placeholder="Add a comment..."
        />
        <button onClick={handleSend} className="bg-blue-500 text-white p-2 rounded-lg">
          Submit
        </button>
      </div>
    </div>
  );
};

export default CommentSection2;


