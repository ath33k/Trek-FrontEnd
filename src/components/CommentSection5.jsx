// import { useState, useEffect } from "react";
// import profilePic from "../assets/No Image.jpg"; // Replace with your default profile image import
// import Rating from "react-rating-stars-component";
// import { db } from "../config/firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../config/firebase";
// import { doc, getDoc, updateDoc, arrayUnion, setDoc, arrayRemove } from "firebase/firestore";
// import LoadingScreen from "./Loading/LoadingScreen";

// const CommentSection3 = ({ pageID, onCommentSubmit }) => {
//   const [visibleComments, setVisibleComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [rating, setRating] = useState(0);
//   const [showingAllComments, setShowingAllComments] = useState(false);
//   const [user, loadingUserData] = useAuthState(auth);
//   const [commentsData, setCommentsData] = useState([]);
//   const [editingComment, setEditingComment] = useState(null);
//   const [editedText, setEditedText] = useState("");

//   const ratingChanged = (newRating) => {
//     console.log(newRating);
//     setRating(newRating);
//   };

//   const formatDate = (date) => {
//     return new Date(date.seconds * 1000).toLocaleDateString("en-US");
//   };

//   const fetchComments = async () => {
//     const commentsDocRef = doc(db, "comments", pageID);
//     const docSnapshot = await getDoc(commentsDocRef);
//     if (docSnapshot.exists()) {
//       const fetchedComments = docSnapshot.data().comments.map((comment) => ({
//         ...comment,
//         date: formatDate(comment.date),
//         photourl:
//           comment.photourl !== "N/A" && comment.photourl
//             ? comment.photourl
//             : profilePic,
//       }));
//       // Reverse the order of fetched comments
//       fetchedComments.reverse();
//       setCommentsData(fetchedComments);
//       setVisibleComments(fetchedComments.slice(0, 2));
//     } else {
//       console.log("No comments document found for this destination.");
//     }
//   };

//   useEffect(() => {
//     fetchComments();
//   }, [pageID]);

//   const handleSend = async () => {
//     if (newComment.trim() || (rating && user)) {
//       const commentToBeAdded = {
//         comment: newComment,
//         rating: rating,
//         username: user.displayName ? user.displayName : "guest",
//         date: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 }, // Adjusting to Firestore date format
//         photourl: user.photoURL,
//       };

//       const commentsRef = doc(db, "comments", pageID);

//       try {
//         const docSnapshot = await getDoc(commentsRef);

//         if (docSnapshot.exists()) {
//           // If pageID exists, update the document with the new comment
//           await updateDoc(commentsRef, {
//             comments: arrayUnion(commentToBeAdded),
//           });
//         } else {
//           // If pageID does not exist, create the document with a new comments array
//           await setDoc(commentsRef, {
//             comments: [commentToBeAdded], // Start with a new array containing the new comment
//           });
//         }

//         setNewComment("");
//         setRating(0);
//         // Re-fetch comments to include the newly added comment
//         await fetchComments();
//         onCommentSubmit();
//       } catch (error) {
//         console.error("Error writing comment: ", error);
//       }
//     }
//   };

//   const handleEdit = (comment) => {
//     setEditingComment(comment);
//     setEditedText(comment.comment);
//   };

//   const handleSaveEdit = async () => {
//     if (editedText.trim() && editingComment) {
//       const updatedComment = {
//         ...editingComment,
//         comment: editedText,
//       };

//       const commentsRef = doc(db, "comments", pageID);

//       try {
//         await updateDoc(commentsRef, {
//           comments: arrayRemove(editingComment),
//         });

//         await updateDoc(commentsRef, {
//           comments: arrayUnion(updatedComment),
//         });

//         setEditingComment(null);
//         setEditedText("");
//         // Re-fetch comments to include the edited comment
//         await fetchComments();
//       } catch (error) {
//         console.error("Error editing comment: ", error);
//       }
//     }
//   };

//   const handleToggleComments = () => {
//     setShowingAllComments(!showingAllComments);
//     if (!showingAllComments) {
//       setVisibleComments(commentsData);
//     } else {
//       setVisibleComments(commentsData.slice(0, 2));
//     }
//   };

//   if (loadingUserData)
//     return <LoadingScreen messages={["Loading user data"]} />;

//   return (
//     <div className="space-y-8">
//       <div>
//         {visibleComments.length > 0 ? (
//           visibleComments.map((comment, idx) => (
//             <div key={idx} className="bg-white shadow p-4 rounded-lg mb-5">
//               <div className="flex items-center mb-4">
//                 <img
//                   src={comment.photourl || profilePic}
//                   alt="Profile"
//                   className="w-8 h-8 rounded-full mr-2"
//                 />
//                 <div>
//                   <div className="font-semibold">{comment.username}</div>
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
//                   edit={false} // Make stars read-only
//                 />
//               </div>
//               {editingComment === comment ? (
//                 <div>
//                   <textarea
//                     value={editedText}
//                     onChange={(e) => setEditedText(e.target.value)}
//                     className="border p-2 rounded-lg w-full"
//                   />
//                   <button onClick={handleSaveEdit} className="bg-blue-500 text-white p-2 rounded-lg">
//                     Save
//                   </button>
//                 </div>
//               ) : (
//                 <p className="mt-2 text-gray-600">{comment.comment}</p>
//               )}
//               <div className="mt-4 flex items-center justify-between">
//                 <span className="text-gray-500 text-sm">
//                   {comment.helpfulCount > 0
//                     ? `${comment.helpfulCount} people found this review helpful`
//                     : "Do you find this review helpful?"}
//                 </span>
//                 <div className="flex gap-4">
//                   <button className="text-blue-600">Yes</button>
//                   <button className="text-blue-600">No</button>
//                   {user && user.displayName === comment.username && (
//                     <button onClick={() => handleEdit(comment)} className="text-blue-600">
//                       Edit
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-green-600 text-lg">No comments yet.</p>
//         )}

//         {commentsData.length > 2 && (
//           <button onClick={handleToggleComments} className="text-blue-600">
//             {showingAllComments ? "Show Less" : "Show More"}
//           </button>
//         )}
//       </div>

//       <div className="flex flex-col items-center justify-center">
//         <p className="text-lg mb-2">
//           {commentsData.length === 0
//             ? "Be the first one to rate"
//             : "How do you rate this place?"}
//         </p>
//         <Rating
//           count={5}
//           onChange={ratingChanged}
//           size={24}
//           activeColor="#ffd700"
//           value={rating}
//           classNames="flex space-x-1"
//         />
//       </div>

//       <div className="flex items-center justify-between">
//         <img
//           src={user.photoURL || profilePic}
//           alt="Your Profile"
//           className="w-10 h-10 rounded-full object-cover mr-5"
//         />
//         <input
//           type="text"
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           className="border p-2 rounded-lg w-full"
//           placeholder="Add a comment..."
//         />
//         <button
//           onClick={handleSend}
//           className="bg-blue-500 text-white p-2 rounded-lg"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CommentSection3;

//<------------------------------------------------------------------------------------------------------------------>

// import { useState, useEffect } from "react";
// import profilePic from "../assets/No Image.jpg"; // Replace with your default profile image import
// import Rating from "react-rating-stars-component";
// import { db } from "../config/firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../config/firebase";
// import { doc, getDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
// import LoadingScreen from "./Loading/LoadingScreen";

// const CommentSection3 = ({ pageID, onCommentSubmit }) => {
//   const [visibleComments, setVisibleComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [rating, setRating] = useState(0);
//   const [showingAllComments, setShowingAllComments] = useState(false);
//   const [user, loadingUserData] = useAuthState(auth);
//   const [commentsData, setCommentsData] = useState([]);
//   const [editingComment, setEditingComment] = useState(null);
//   const [editedText, setEditedText] = useState("");

//   const ratingChanged = (newRating) => {
//     console.log(newRating);
//     setRating(newRating);
//   };

//   const formatDate = (date) => {
//     return new Date(date.seconds * 1000).toLocaleDateString("en-US");
//   };

//   const fetchComments = async () => {
//     const commentsDocRef = doc(db, "comments", pageID);
//     const docSnapshot = await getDoc(commentsDocRef);
//     if (docSnapshot.exists()) {
//       const fetchedComments = docSnapshot.data().comments.map((comment) => ({
//         ...comment,
//         date: formatDate(comment.date),
//         photourl:
//           comment.photourl !== "N/A" && comment.photourl
//             ? comment.photourl
//             : profilePic,
//       }));
//       // Reverse the order of fetched comments
//       fetchedComments.reverse();
//       setCommentsData(fetchedComments);
//       setVisibleComments(fetchedComments.slice(0, 2));
//     } else {
//       console.log("No comments document found for this destination.");
//     }
//   };

//   useEffect(() => {
//     fetchComments();
//   }, [pageID]);

//   const handleSend = async () => {
//     if (newComment.trim() || (rating && user)) {
//       const commentToBeAdded = {
//         comment: newComment,
//         rating: rating,
//         username: user.displayName ? user.displayName : "guest",
//         date: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 }, // Adjusting to Firestore date format
//         photourl: user.photoURL,
//       };

//       const commentsRef = doc(db, "comments", pageID);

//       try {
//         const docSnapshot = await getDoc(commentsRef);

//         if (docSnapshot.exists()) {
//           // If pageID exists, update the document with the new comment
//           await updateDoc(commentsRef, {
//             comments: arrayUnion(commentToBeAdded),
//           });
//         } else {
//           // If pageID does not exist, create the document with a new comments array
//           await setDoc(commentsRef, {
//             comments: [commentToBeAdded], // Start with a new array containing the new comment
//           });
//         }

//         setNewComment("");
//         setRating(0);
//         // Re-fetch comments to include the newly added comment
//         await fetchComments();
//         onCommentSubmit();
//       } catch (error) {
//         console.error("Error writing comment: ", error);
//       }
//     }
//   };

//   const handleEdit = (comment) => {
//     setEditingComment(comment);
//     setEditedText(comment.comment);
//   };

//   const handleSaveEdit = async () => {
//     if (editedText.trim() && editingComment) {
//       const commentsRef = doc(db, "comments", pageID);

//       try {
//         const docSnapshot = await getDoc(commentsRef);
//         if (docSnapshot.exists()) {
//           const comments = docSnapshot.data().comments;
//           const updatedComments = comments.map((comment) => 
//             comment.date.seconds === editingComment.date.seconds && comment.username === editingComment.username
//               ? { ...comment, comment: editedText }
//               : comment
//           );

//           await updateDoc(commentsRef, { comments: updatedComments });

//           setEditingComment(null);
//           setEditedText("");
//           // Re-fetch comments to include the edited comment
//           await fetchComments();
//         }
//       } catch (error) {
//         console.error("Error editing comment: ", error);
//       }
//     }
//   };

//   const handleToggleComments = () => {
//     setShowingAllComments(!showingAllComments);
//     if (!showingAllComments) {
//       setVisibleComments(commentsData);
//     } else {
//       setVisibleComments(commentsData.slice(0, 2));
//     }
//   };

//   if (loadingUserData)
//     return <LoadingScreen messages={["Loading user data"]} />;

//   return (
//     <div className="space-y-8">
//       <div>
//         {visibleComments.length > 0 ? (
//           visibleComments.map((comment, idx) => (
//             <div key={idx} className="bg-white shadow p-4 rounded-lg mb-5">
//               <div className="flex items-center mb-4">
//                 <img
//                   src={comment.photourl || profilePic}
//                   alt="Profile"
//                   className="w-8 h-8 rounded-full mr-2"
//                 />
//                 <div>
//                   <div className="font-semibold">{comment.username}</div>
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
//                   edit={false} // Make stars read-only
//                 />
//               </div>
//               {editingComment === comment ? (
//                 <div>
//                   <textarea
//                     value={editedText}
//                     onChange={(e) => setEditedText(e.target.value)}
//                     className="border p-2 rounded-lg w-full"
//                   />
//                   <button onClick={handleSaveEdit} className="bg-blue-500 text-white p-2 rounded-lg">
//                     Save
//                   </button>
//                 </div>
//               ) : (
//                 <p className="mt-2 text-gray-600">{comment.comment}</p>
//               )}
//               <div className="mt-4 flex items-center justify-between">
//                 <span className="text-gray-500 text-sm">
//                   {comment.helpfulCount > 0
//                     ? `${comment.helpfulCount} people found this review helpful`
//                     : "Do you find this review helpful?"}
//                 </span>
//                 <div className="flex gap-4">
//                   <button className="text-blue-600">Yes</button>
//                   <button className="text-blue-600">No</button>
//                   {user && user.displayName === comment.username && (
//                     <button onClick={() => handleEdit(comment)} className="text-blue-600">
//                       Edit
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-green-600 text-lg">No comments yet.</p>
//         )}

//         {commentsData.length > 2 && (
//           <button onClick={handleToggleComments} className="text-blue-600">
//             {showingAllComments ? "Show Less" : "Show More"}
//           </button>
//         )}
//       </div>

//       <div className="flex flex-col items-center justify-center">
//         <p className="text-lg mb-2">
//           {commentsData.length === 0
//             ? "Be the first one to rate"
//             : "How do you rate this place?"}
//         </p>
//         <Rating
//           count={5}
//           onChange={ratingChanged}
//           size={24}
//           activeColor="#ffd700"
//           value={rating}
//           classNames="flex space-x-1"
//         />
//       </div>

//       <div className="flex items-center justify-between">
//         <img
//           src={user.photoURL || profilePic}
//           alt="Your Profile"
//           className="w-10 h-10 rounded-full object-cover mr-5"
//         />
//         <input
//           type="text"
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           className="border p-2 rounded-lg w-full"
//           placeholder="Add a comment..."
//         />
//         <button
//           onClick={handleSend}
//           className="bg-blue-500 text-white p-2 rounded-lg"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CommentSection3;

//<----------------------------------------------------------------------------------------------------------------------->

import { useState, useEffect } from "react";
import profilePic from "../assets/No Image.jpg"; // Replace with your default profile image import
import Rating from "react-rating-stars-component";
import { db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import LoadingScreen from "./Loading/LoadingScreen";

const CommentSection3 = ({ pageID, onCommentSubmit }) => {
  const [visibleComments, setVisibleComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [showingAllComments, setShowingAllComments] = useState(false);
  const [user, loadingUserData] = useAuthState(auth);
  const [commentsData, setCommentsData] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const formatDate = (date) => {
    return new Date(date.seconds * 1000).toLocaleDateString("en-US");
  };

  const fetchComments = async () => {
    const commentsDocRef = doc(db, "comments", pageID);
    const docSnapshot = await getDoc(commentsDocRef);
    if (docSnapshot.exists()) {
      const fetchedComments = docSnapshot.data().comments.map((comment) => ({
        ...comment,
        id: comment.date.seconds + comment.username, // Unique identifier
        date: formatDate(comment.date),
        photourl:
          comment.photourl !== "N/A" && comment.photourl
            ? comment.photourl
            : profilePic,
      }));
      // Reverse the order of fetched comments
      fetchedComments.reverse();
      setCommentsData(fetchedComments);
      setVisibleComments(fetchedComments.slice(0, 2));
    } else {
      console.log("No comments document found for this destination.");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [pageID]);

  const handleSend = async () => {
    if (newComment.trim() || (rating && user)) {
      const commentToBeAdded = {
        comment: newComment,
        rating: rating,
        username: user.displayName ? user.displayName : "guest",
        date: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 }, // Adjusting to Firestore date format
        photourl: user.photoURL || profilePic,
      };

      const commentsRef = doc(db, "comments", pageID);

      try {
        const docSnapshot = await getDoc(commentsRef);

        if (docSnapshot.exists()) {
          // If pageID exists, update the document with the new comment
          await updateDoc(commentsRef, {
            comments: [...docSnapshot.data().comments, commentToBeAdded],
          });
        } else {
          // If pageID does not exist, create the document with a new comments array
          await setDoc(commentsRef, {
            comments: [commentToBeAdded], // Start with a new array containing the new comment
          });
        }

        setNewComment("");
        setRating(0);
        // Re-fetch comments to include the newly added comment
        await fetchComments();
        onCommentSubmit();
      } catch (error) {
        console.error("Error writing comment: ", error);
      }
    }
  };

  const handleEdit = (commentId, commentText) => {
    setEditingCommentId(commentId);
    setEditedText(commentText);
  };

  const handleSaveEdit = async () => {
    if (editedText.trim() && editingCommentId) {
      const commentsRef = doc(db, "comments", pageID);

      try {
        const docSnapshot = await getDoc(commentsRef);
        if (docSnapshot.exists()) {
          const comments = docSnapshot.data().comments;
          const updatedComments = comments.map((comment) =>
            comment.date.seconds + comment.username === editingCommentId
              ? { ...comment, comment: editedText }
              : comment
          );

          await updateDoc(commentsRef, { comments: updatedComments });

          setEditingCommentId(null);
          setEditedText("");
          // Re-fetch comments to include the edited comment
          await fetchComments();
        } else {
          console.log("No comments document found for this destination.");
        }
      } catch (error) {
        console.error("Error editing comment: ", error);
      }
    }
  };

  const handleToggleComments = () => {
    setShowingAllComments(!showingAllComments);
    if (!showingAllComments) {
      setVisibleComments(commentsData);
    } else {
      setVisibleComments(commentsData.slice(0, 2));
    }
  };

  if (loadingUserData) return <LoadingScreen messages={["Loading user data"]} />;

  return (
    <div className="space-y-8">
      <div>
        {visibleComments.length > 0 ? (
          visibleComments.map((comment, idx) => (
            <div key={idx} className="bg-white shadow p-4 rounded-lg mb-5">
              <div className="flex items-center mb-4">
                <img
                  src={comment.photourl || profilePic}
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
              {editingCommentId === comment.id ? (
                <div>
                  <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="border p-2 rounded-lg w-full"
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="bg-blue-500 text-white p-2 rounded-lg"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p className="mt-2 text-gray-600">{comment.comment}</p>
              )}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-gray-500 text-sm">
                  {comment.helpfulCount > 0
                    ? `${comment.helpfulCount} people found this review helpful`
                    : "Do you find this review helpful?"}
                </span>
                <div className="flex gap-4">
                  <button className="text-blue-600">Yes</button>
                  <button className="text-blue-600">No</button>
                  {user &&
                    (user.displayName === comment.username || user.email === comment.email) && (
                      <button
                        onClick={() => handleEdit(comment.id, comment.comment)}
                        className="text-blue-600"
                      >
                        Edit
                      </button>
                    )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-green-600 text-lg">No comments yet.</p>
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
          src={user.photoURL || profilePic}
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

export default CommentSection3;
