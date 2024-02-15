import React, { useState } from 'react';
import profilePic from '../assets/sigiriya.png'; 
import Rating from 'react-rating-stars-component';

const CommentSection = () => {
  const [comments, setComments] = useState([
    { id: 1, text: 'Amazing place. Recommend to everyone.', user: 'User A' },
    { id: 2, text: 'Worth visiting this place. I love this place.', user: 'User B' },
    { id: 3, text: 'Worth visiting this place. I love this place.', user: 'User C' },
    { id: 4, text: 'Worth visiting this place. I love this place.', user: 'User D' },
    { id: 5, text: 'Worth visiting this place. I love this place.', user: 'User E' },
    { id: 6, text: 'Worth visiting this place. I love this place.', user: 'User F' },
   
  ]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRating(newRating);
  };

  const handleSend = () => {
    if (newComment.trim()) {
      const nextId = comments.length + 1;
      setComments([...comments, { id: nextId, text: newComment, user: 'New User' }]);
      setNewComment(''); 
    }
  };

  
  const commentsContainerClass = `space-y-4 ${comments.length > 5 ? 'overflow-y-scroll' : 'overflow-hidden'} max-h-60 max-w-md mx-auto`;

  return (
    
    <div>
      <div className={commentsContainerClass}>
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-center gap-2 max-w-md mx-auto">
            <img src={profilePic} alt="Profile" className="w-10 h-10 rounded-full" />
            <div className="bg-gray-100 p-2 rounded-lg">
              <p className="text-sm">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 max-w-md mx-auto mb-8"> 
        <img src={profilePic} alt="Your Profile" className="w-10 h-10 rounded-full" />
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border p-2 rounded-lg flex-1"
          placeholder="Add a comment..."
        />
        <button onClick={handleSend} className="bg-blue-500 text-white p-2 rounded-lg mt-4">
          SEND
        </button>
      </div>
      <div className="my-4 flex flex-col items-center justify-center">
        <p className="text-lg mb-2">How do you rate this item?</p>
        <Rating
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
          value={rating}
          classNames="flex justify-center"
        />
      </div>

    </div>
  );
};

export default CommentSection;