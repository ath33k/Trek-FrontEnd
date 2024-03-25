/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import profilePic from "../assets/sigiriya.png"; // Replace with your actual profile image import
import Rating from "react-rating-stars-component";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
//import { db } from "../path/to/your/firebase/config";
import { db } from "../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
const CommentSection2 = ({ commentsData = [], pageID }) => {
  // const [visibleComments, setVisibleComments] = useState(
  //   commentsData.slice(0, 2)
  // );
  const [visibleComments, setVisibleComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [showingAllComments, setShowingAllComments] = useState(false);
  const [user] = useAuthState(auth);
  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRating(newRating);
  };
  const username = user.name || "Anonymous";
  const formatDate = (date) => {
    return new Date(date.seconds * 1000).toLocaleDateString("en-US");
  };

  // Initialize visibleComments based on the passed commentsData prop
  useEffect(() => {
    const commentsWithFormattedDate = commentsData.map(comment => ({
      ...comment,
      date: formatDate(comment.date),
      photourl: comment.photourl !== 'N/A' ? comment.photourl : 'path/to/default_image.png'
    }));
    setVisibleComments(commentsWithFormattedDate.slice(0, 2));
  }, [commentsData]);

 

  const handleSend = async () => {
    if (newComment.trim() || rating || pageID && username) {
      // Create a comment object to send to Firestore
      const commentToBeAdded = {
        comment: newComment,
        rating: rating,
        username: username, // You should replace this with actual user information
        //date: {
          //seconds: Math.floor(Date.now() / 1000),
          //nanoseconds: 0, // Firestore timestamp format
        //},
        date: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
        photourl: "User's Photo URL" // Again, use actual data
      };
  
      try {
        // Reference to the Firestore document where comments are stored
        const commentsRef = doc(db, "comments", pageID); // Use actual destination ID
        
        // Update the document with the new comment
        await updateDoc(commentsRef, {
          comments: arrayUnion(commentToBeAdded)
        });
  
        // Optimistically update the visible comments state
       // setVisibleComments(prevComments => [...prevComments, commentToBeAdded]);
        setVisibleComments(prevComments => [...prevComments, {
          ...commentToBeAdded,
          date: formatDate(commentToBeAdded.date) // Format date before displaying
        }]);
        // Resetting the state for new comment input
        setNewComment("");
        setRating(0);
      } catch (error) {
        console.error("Error writing comment: ", error);
        // Handle the error (e.g., display a message to the user)
      }
    }
  };
  
  const handleToggleComments = () => {
    setShowingAllComments(!showingAllComments); // Toggle the state first
  
    if (!showingAllComments) { // After toggling, check the new state
      // Showing all comments
      setVisibleComments(commentsData.map(comment => ({
        ...comment,
        date: formatDate(comment.date),
        photourl: comment.photourl !== 'N/A' ? comment.photourl : 'path/to/default_image.png'
      })));
    } else {
      // Showing limited comments
      setVisibleComments(commentsData.slice(0, 2).map(comment => ({
        ...comment,
        date: formatDate(comment.date),
        photourl: comment.photourl !== 'N/A' ? comment.photourl : 'path/to/default_image.png'
      })));
    }
  };

  // const handleToggleComments = () => {
  //   if (!showingAllComments) {
  //     const allComments = commentsData.map((comment) => ({
  //       ...comment,
  //       date: new Date(comment.date.seconds * 1000).toLocaleDateString("en-US"),
  //       photourl: comment.photourl !== "N/A" ? comment.photourl : "path/to/default_image.png",
  //     }));
  //     setVisibleComments(allComments);
  //   } else {
  //     const initialComments = commentsData.slice(0, 2).map((comment) => ({
  //       ...comment,
  //       date: new Date(comment.date.seconds * 1000).toLocaleDateString("en-US"),
  //       photourl: comment.photourl !== "N/A" ? comment.photourl : "path/to/default_image.png",
  //     }));
  //     setVisibleComments(initialComments);
  //   }
  //   setShowingAllComments(!showingAllComments);
  // };
  return (
    <div className="space-y-8">
      <div>
        {visibleComments.length > 0 ? (
          visibleComments.map((comment, idx) => (
            <div key={idx} className="bg-white shadow p-4 rounded-lg mb-5">
              <div className="flex items-center mb-4">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                  <div className="font-semibold">{comment.username}</div>
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
                  edit={false} // Make stars read-only
                />
              </div>
              <p className="mt-2 text-gray-600">{comment.comment}</p>
              <div className="mt-4 flex items-center justify-between">
                {/* <span className="text-gray-500 text-sm">{`${comment.helpfulCount} people found this review helpful`}</span> */}
                <span className="text-gray-500 text-sm">
                  {comment.helpfulCount > 0
                  ? `${comment.helpfulCount} people found this review helpful`
                  : "Do you find this review helpful?"}
                </span>
                <div className="flex gap-4">
                  <button className="text-blue-600">Yes</button>
                  <button className="text-blue-600">No</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-green-600 text-lg">No comments yet.</p> //handle edge cases for comments
        )}

        
        {commentsData.length > 2 && (
        <button onClick={handleToggleComments} className="text-blue-600">
          {showingAllComments ? "Show Less" : "Show More"}
        </button>
      )}
      </div>

      <div className="flex flex-col items-center justify-center">
        <p className="text-lg mb-2">
          {commentsData.length === 0
            ? "Be the first one to rate"
            : "How do you rate this place?"}
        </p>
        <Rating
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
          value={rating}
          classNames="flex space-x-1"
        />
      </div>

      <div className="flex items-center justify-between">
        <img
          src={profilePic}
          alt="Your Profile"
          className="w-10 h-10 rounded-full object-cover mr-5"
        />
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border p-2 rounded-lg w-full"
          placeholder="Add a comment..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );

};

export default CommentSection2;
