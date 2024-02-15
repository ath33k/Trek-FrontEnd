import React, { useState } from 'react';
import profilePic from '../assets/sigiriya.png'; 

const CommentSection = () => {
  const [comments, setComments] = useState([
    { id: 1, text: 'Amazing place. Recommend to everyone.', user: 'User A' },
    { id: 2, text: 'Worth visiting this place. I love this place.', user: 'User B' },
   
  ]);
  const [newComment, setNewComment] = useState('');

  const handleSend = () => {
    if (newComment.trim()) {
      const nextId = comments.length + 1;
      setComments([...comments, { id: nextId, text: newComment, user: 'New User' }]);
      setNewComment(''); 
    }
  };

  return (
    <div>
      <div className="space-y-4">
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
        <button onClick={handleSend} className="bg-blue-500 text-white p-2 rounded-lg">
          SEND
        </button>
      </div>
    </div>
  );
};

export default CommentSection;