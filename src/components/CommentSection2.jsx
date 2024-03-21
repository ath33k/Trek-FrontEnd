/* eslint-disable react/prop-types */
import { useState } from "react";
import profilePic from "../assets/sigiriya.png"; // Replace with your actual profile image import
import Rating from "react-rating-stars-component";

const CommentSection2 = ({ commentsData = [] }) => {
  const [visibleComments, setVisibleComments] = useState(
    commentsData.slice(0, 2)
  );
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRating(newRating);
  };

  const handleSend = () => {
    if (newComment.trim()) {
      // Handle sending the comment to your server or state here
      console.log("Sending comment:", newComment);
      setNewComment("");
    }
  };

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
                  edit={false} // Make stars read-only
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
          ))
        ) : (
          <p className="text-green-600 text-lg">No comments yet.</p> //handle edge cases for comments
        )}

        {commentsData.length > 2 && (
          <button
            onClick={() => {
              setVisibleComments((prev) => {
                return prev.length >= commentsData.length
                  ? commentsData.slice(0, 2)
                  : commentsData.slice(0, prev.length + 2);
              });
            }}
            className="text-blue-600"
          >
            {visibleComments.length >= commentsData.length
              ? "Show Less"
              : "Show More"}
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
          className="w-10 h-10 rounded-full object-cover"
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

  // return (
  //   <div className="space-y-8 ml-2 mr-2">
  //     <div>
  //       {visibleComments
  //         ? visibleComments.map((comment, idx) => (
  //             <div key={idx} className="bg-white shadow p-4 rounded-lg mb-5">
  //               <div className="flex items-center mb-4 ">
  //                 <img
  //                   src={profilePic}
  //                   alt="Profile"
  //                   className="w-8 h-8 rounded-full mr-2"
  //                 />
  //                 <div>
  //                   <div className="font-semibold">{comment.user}</div>
  //                   <div className="text-gray-500 text-sm">{comment.date}</div>
  //                 </div>
  //               </div>
  //               <div className="text-gray-800 text-lg">
  //                 <Rating
  //                   count={5}
  //                   onChange={() => {}}
  //                   size={24}
  //                   activeColor="#ffd700"
  //                   value={comment.rating}
  //                   edit={false} // make stars read-only
  //                 />
  //               </div>
  //               <p className="mt-2 text-gray-600">{comment.text}</p>
  //               <div className="mt-4 flex items-center justify-between">
  //                 <span className="text-gray-500 text-sm">{`${comment.helpfulCount} people found this review helpful`}</span>
  //                 <div className="flex gap-4">
  //                   <button className="text-blue-600">Yes</button>
  //                   <button className="text-blue-600">No</button>
  //                 </div>
  //               </div>
  //             </div>
  //           ))
  //         : null}
  //       <button
  //         onClick={() => {
  //           setVisibleComments((prev) => {
  //             if (visibleComments.length >= commentsData.length) {
  //               return commentsData.slice(0, 2);
  //             }

  //             return commentsData.slice(
  //               0,
  //               prev.length + 2 > commentsData.length
  //                 ? commentsData.length
  //                 : prev.length + 2
  //             );
  //           });
  //         }}
  //         className="text-blue-600"
  //       >
  //         {visibleComments.length === commentsData.length
  //           ? "Show Less"
  //           : "Show more"}
  //       </button>
  //     </div>

  //     <div className="flex flex-col items-center justify-center">
  //       <p className="text-lg mb-2">How do you rate this place?</p>
  //       <Rating
  //         count={5}
  //         onChange={ratingChanged}
  //         size={24}
  //         activeColor="#ffd700"
  //         value={rating}
  //         classNames="flex space-x-1"
  //       />
  //     </div>

  //     <div className="flex items-center gap-2 ">
  //       <img
  //         src={profilePic}
  //         alt="Your Profile"
  //         className="w-10 h-10 rounded-full"
  //       />
  //       <input
  //         type="text"
  //         value={newComment}
  //         onChange={(e) => setNewComment(e.target.value)}
  //         className="border p-2 rounded-lg flex-1"
  //         placeholder="Add a comment..."
  //       />
  //       <button
  //         onClick={handleSend}
  //         className="bg-blue-500 text-white p-2 rounded-lg"
  //       >
  //         Send
  //       </button>
  //     </div>
  //   </div>
  // );
};

export default CommentSection2;
