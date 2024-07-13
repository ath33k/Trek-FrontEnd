// import { useState } from "react";
// import { IoIosSend } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
// import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
// import { doc } from "firebase/firestore";

// import treklogo from "../assets/treklogo.svg";
// import { navlinks } from "../navlinks";
// import { collectUserPrompts } from "../firefunctions";
// import { db } from "../config/firebase";
// import LoadingScreen from "../components/Loading/LoadingScreen";
// import ErrorScreen from "../components/Errors/ErrorScreen";

// const ChatBotUI = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [inputValue, setInputValue] = useState("");
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "👋 Hi! What can I do for you today?" }
//   ]);
//   const [wcount, setWCount] = useState(0);
//   const [backendServer, loadingbackServer, errorbackserver] = useDocumentDataOnce(doc(db, "server", "backend"));

//   const maxWordCount = 500;
//   const minWordCount = 3;
//   const navigate = useNavigate();

//   const handleSubmit = () => {
//     if (inputValue.trim() === "") return;
//     setIsLoading(true);
//     const userMessage = { sender: "user", text: inputValue };

//     setMessages([...messages, userMessage]);
//     setInputValue("");

//     if (wcount < minWordCount || wcount > maxWordCount) {
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 1000);
//       return;
//     }

//     fetch(`${backendServer.path}/generate_tags`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ sentence: inputValue }),
//     })
//       .then((response) => response.json())
//       .then((spots) => {
//         const spnames = spots.map((spot) => spot.name);
//         collectUserPrompts(db, {
//           sentence: inputValue,
//           suggestions: spnames,
//         });
//         navigate(navlinks.results.path, { state: { results: spots } });
//         const botMessage = { sender: "bot", text: "Here's a response from the bot" };
//         setMessages((prevMessages) => [...prevMessages, botMessage]);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         setTimeout(() => {
//           setIsLoading(false);
//         }, 2000);
//       });
//   };

//   const handleInputChange = (e) => {
//     const inputWords = e.target.value.trim().split(/\s+/).filter((word) => word !== "");
//     setInputValue(e.target.value);
//     setWCount(inputWords.length);
//   };

//   if (loadingbackServer) return <LoadingScreen />;
//   if (errorbackserver) return <ErrorScreen />;

//   return (
//     <div className="flex flex-col items-center justify-center h-screen w-screen px-1 bg-gray-100">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 flex flex-col">
//         {/* Header */}
//         <div className="flex items-center gap-2 mb-4">
//           <img src={treklogo} alt="treklogo" className="w-12 h-12 object-contain" />
//           <div>
//             <h2 className="text-xl font-bold text-gray-700">Trek Bot</h2>
//             <p className="text-sm text-green-500">Online</p>
//           </div>
//           <button className="ml-auto text-gray-600 focus:outline-none">✖️</button>
//         </div>
//         {/* Chat Messages */}
//         <div className="flex flex-col gap-2 overflow-y-auto h-64 mb-4 p-2 bg-gray-50 rounded-lg">
//           {messages.map((message, index) => (
//             <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
//               <div className={`${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"} p-3 rounded-lg max-w-xs`}>
//                 {message.text}
//               </div>
//             </div>
//           ))}
//         </div>
//         {/* Input Area */}
//         <div className="flex gap-2 items-center">
//           <textarea
//             onChange={handleInputChange}
//             value={inputValue}
//             placeholder="Type your message here..."
//             rows={1}
//             className="resize-none p-2 flex-grow text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//           ></textarea>
//           <button
//             disabled={isLoading}
//             className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full"
//             onClick={handleSubmit}
//           >
//             {isLoading ? (
//               <svg
//                 className="animate-spin h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//               >
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
//               </svg>
//             ) : (
//               <IoIosSend className="h-5 w-5" />
//             )}
//           </button>
//         </div>
//         <div className="flex justify-between mt-2 text-xs text-gray-500">
//           <p>{wcount}/{maxWordCount}</p>
//           <p className={`${wcount < minWordCount || wcount > maxWordCount ? "text-red-500" : ""}`}>
//             {wcount < minWordCount ? "At least 3 words required" : wcount > maxWordCount ? "Maximum word count exceeded" : ""}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBotUI;





// import { useState } from 'react';
// import { IoIosSend } from 'react-icons/io';
// import { useNavigate } from 'react-router-dom';
// import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
// import { doc } from 'firebase/firestore';

// import treklogo from '../assets/treklogo.svg';
// import { navlinks } from '../navlinks';
// import { collectUserPrompts } from '../firefunctions';
// import { db } from '../config/firebase';
// import LoadingScreen from '../components/Loading/LoadingScreen';
// import ErrorScreen from '../components/Errors/ErrorScreen';
// // import Sidebar from './Sidebar';

// const ChatBotUI = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [inputValue, setInputValue] = useState('');
//   const [messages, setMessages] = useState([{ sender: 'bot', text: '👋 Hi! What can I do for you today?'}]);
//   const [wcount, setWCount] = useState(0);
//   const [chats, setChats] = useState([{ title: 'Chat 1', messages: [] }]);
//   const [selectedChatIndex, setSelectedChatIndex] = useState(0);
//   const [backendServer, loadingbackServer, errorbackserver] = useDocumentDataOnce(doc(db, 'server', 'backend'));

//   const maxWordCount = 500;
//   const minWordCount = 3;
//   const navigate = useNavigate();

//   const handleSubmit = () => {
//     if (inputValue.trim() === '') return;
//     setIsLoading(true);
//     const userMessage = { sender: 'user', text: inputValue };
  
//     const updatedChats = [...chats];
//     updatedChats[selectedChatIndex].messages.push(userMessage);
//     setChats(updatedChats);
//     setInputValue('');
  
//     if (wcount < minWordCount || wcount > maxWordCount) {
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 1000);
//       return;
//     }
  
//     fetch('http://127.0.0.1:5000/chatbot', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ query: inputValue }), // Adjusted to match your curl command
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         const botMessage = { sender: 'bot', text: data.response || "Here's a response from the bot" };
  
//         const updatedChatsWithBot = [...updatedChats];
//         updatedChatsWithBot[selectedChatIndex].messages.push(botMessage);
//         setChats(updatedChatsWithBot);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         setTimeout(() => {
//           setIsLoading(false);
//         }, 2000);
//       });
//   };

// //   const handleSubmit = () => {
// //     if (inputValue.trim() === '') return;
// //     setIsLoading(true);
// //     const userMessage = { sender: 'user', text: inputValue };

// //     const updatedChats = [...chats];
// //     updatedChats[selectedChatIndex].messages.push(userMessage);
// //     setChats(updatedChats);
// //     setInputValue('');

// //     if (wcount < minWordCount || wcount > maxWordCount) {
// //       setTimeout(() => {
// //         setIsLoading(false);
// //       }, 1000);
// //       return;
// //     }
    
// //     fetch(`http://127.0.0.1:5000/chatbot`, {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({  query: inputValue }),
// //     })
// //       .then((response) => response.json())
// //       .then((spots) => {
// //         const spnames = spots.map((spot) => spot.name);
// //         collectUserPrompts(db, {
// //           sentence: inputValue,
// //           suggestions: spnames,
// //         });
// //         navigate(navlinks.results.path, { state: { results: spots } });
// //         const botMessage = { sender: 'bot', text: "Here's a response from the bot" }; //Here's a response from the bot

// //         const updatedChatsWithBot = [...updatedChats];
// //         updatedChatsWithBot[selectedChatIndex].messages.push(botMessage);
// //         setChats(updatedChatsWithBot);
// //         setIsLoading(false);
// //       })
// //       .catch((error) => {
// //         console.error('Error:', error);
// //         setTimeout(() => {
// //           setIsLoading(false);
// //         }, 2000);
// //       });
// //   };

//   const handleInputChange = (e) => {
//     const inputWords = e.target.value.trim().split(/\s+/).filter((word) => word !== '');
//     setInputValue(e.target.value);
//     setWCount(inputWords.length);
//   };

//   const handleSelectChat = (index) => {
//     setSelectedChatIndex(index);
//     setMessages(chats[index].messages);
//   };

//   const handleNewChat = () => {
//     const newChat = { title: `Chat ${chats.length + 1}`, messages: [] };
//     setChats([...chats, newChat]);
//     setSelectedChatIndex(chats.length);
//     setMessages(newChat.messages);
//   };

//   if (loadingbackServer) return <LoadingScreen />;
//   if (errorbackserver) return <ErrorScreen />;

//   return (
//     <div className="flex h-screen w-screen bg-gray-100">
//       <Sidebar chats={chats} onSelectChat={handleSelectChat} onNewChat={handleNewChat} />
//       <div className="flex flex-col w-3/4 h-full bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="flex flex-row items-center justify-between p-4 border-b border-gray-200">
//           <div className="flex items-center gap-2">
//             <img src={treklogo} alt="treklogo" className="w-10 h-10 object-contain" />
//             <h2 className="text-xl font-bold text-gray-700">Trek Bot</h2>
//           </div>
//           <p className="text-sm text-green-500">Online</p>
//         </div>
//         <div className="flex-grow p-4 overflow-y-auto">
//           {messages.map((message, index) => (
//             <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
//               <div className={`${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} p-3 rounded-lg max-w-xs`}>
//                 {message.text}
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="border-t border-gray-200 p-4 flex items-center">
//           <textarea
//             onChange={handleInputChange}
//             value={inputValue}
//             placeholder="Type your message here..."
//             rows={1}
//             className="resize-none p-2 flex-grow text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//           ></textarea>
//           <button
//             disabled={isLoading}
//             className="flex items-center justify-center w-12 h-12 ml-4 bg-blue-500 text-white rounded-full"
//             onClick={handleSubmit}
//           >
//             {isLoading ? (
//               <svg
//                 className="animate-spin h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//               >
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
//               </svg>
//             ) : (
//               <IoIosSend className="h-5 w-5" />
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBotUI;














// import { useState } from 'react';
// import { IoIosSend } from 'react-icons/io';
// import { useNavigate } from 'react-router-dom';
// import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
// import { doc } from 'firebase/firestore';

// import treklogo from '../assets/treklogo.svg';
// import { navlinks } from '../navlinks';
// import { collectUserPrompts } from '../firefunctions';
// import { db } from '../config/firebase';
// import LoadingScreen from '../components/Loading/LoadingScreen';
// import ErrorScreen from '../components/Errors/ErrorScreen';

// const ChatBotUI = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [inputValue, setInputValue] = useState('');
//   const [messages, setMessages] = useState([{ sender: 'bot', text: '👋 Hi! What can I do for you today?' }]);
//   const [wcount, setWCount] = useState(0);
//   const [chats, setChats] = useState([{ title: 'Chat 1', messages: [{ sender: 'bot', text: '👋 Hi! What can I do for you today?' }] }]);
//   const [selectedChatIndex, setSelectedChatIndex] = useState(0);
//   const [backendServer, loadingbackServer, errorbackserver] = useDocumentDataOnce(doc(db, 'server', 'backend'));

//   const maxWordCount = 500;
//   const minWordCount = 1;
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     if (inputValue.trim() === '') return;
//     setIsLoading(true);
//     const userMessage = { sender: 'user', text: inputValue };

//     const updatedChats = [...chats];
//     updatedChats[selectedChatIndex].messages.push(userMessage);
//     setMessages(updatedChats[selectedChatIndex].messages);
//     setChats(updatedChats);
//     setInputValue('');

//     if (wcount < minWordCount || wcount > maxWordCount) {
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 1000);
//       return;
//     }

//     try {
//       console.log('Sending fetch request...');
//       const response = await fetch('http://127.0.0.1:5000/chatbot', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query: userMessage.text }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       console.log('Response received:', response);

//       const data = await response.json();
//       console.log('Response data:', data);

//       const botMessage = { sender: 'bot', text: data.response || "Here's a response from the bot" };

//       updatedChats[selectedChatIndex].messages.push(botMessage);
//       setMessages(updatedChats[selectedChatIndex].messages);
//       setChats(updatedChats);
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Fetch error:', error);
//       setIsLoading(false);
//       alert(`Error: ${error.message}`);
//     }
//   };

//   const handleInputChange = (e) => {
//     const inputWords = e.target.value.trim().split(/\s+/).filter((word) => word !== '');
//     setInputValue(e.target.value);
//     setWCount(inputWords.length);
//   };

//   const handleSelectChat = (index) => {
//     setSelectedChatIndex(index);
//     setMessages(chats[index].messages);
//   };

//   const handleNewChat = () => {
//     const newChat = { title: `Chat ${chats.length + 1}`, messages: [{ sender: 'bot', text: '👋 Hi! What can I do for you today?' }] };
//     setChats([...chats, newChat]);
//     setSelectedChatIndex(chats.length);
//     setMessages(newChat.messages);
//   };

//   if (loadingbackServer) return <LoadingScreen />;
//   if (errorbackserver) return <ErrorScreen />;

//   return (
//     <div className="flex h-screen w-screen bg-gray-100">
//       <Sidebar chats={chats} onSelectChat={handleSelectChat} onNewChat={handleNewChat} />
//       <div className="flex flex-col w-3/4 h-full bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="flex flex-row items-center justify-between p-4 border-b border-gray-200">
//           <div className="flex items-center gap-2">
//             <img src={treklogo} alt="treklogo" className="w-10 h-10 object-contain" />
//             <h2 className="text-xl font-bold text-gray-700">Trek Bot</h2>
//           </div>
//           <p className="text-sm text-green-500">Online</p>
//         </div>
//         <div className="flex-grow p-4 overflow-y-auto">
//           {messages.map((message, index) => (
//             <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
//               <div className={`${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} p-3 rounded-lg max-w-xs`}>
//                 {message.text}
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="border-t border-gray-200 p-4 flex items-center">
//           <textarea
//             onChange={handleInputChange}
//             value={inputValue}
//             placeholder="Type your message here..."
//             rows={1}
//             className="resize-none p-2 flex-grow text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//           ></textarea>
//           <button
//             disabled={isLoading}
//             className="flex items-center justify-center w-12 h-12 ml-4 bg-blue-500 text-white rounded-full"
//             onClick={handleSubmit}
//           >
//             {isLoading ? (
//               <svg
//                 className="animate-spin h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//               >
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
//               </svg>
//             ) : (
//               <IoIosSend className="h-5 w-5" />
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Sidebar = ({ chats, onSelectChat, onNewChat }) => {
//   return (
//     <div className="bg-gray-200 w-1/4 h-full p-4 flex flex-col">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-bold">Chats</h2>
//         <button onClick={onNewChat} className="text-blue-500">New chat</button>
//       </div>
//       <div className="flex-grow overflow-y-auto">
//         {chats.map((chat, index) => (
//           <div
//             key={index}
//             className="p-2 mb-2 bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer"
//             onClick={() => onSelectChat(index)}
//           >
//             {chat.title}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChatBotUI;




// import React, { useState } from 'react';
// import { IoIosSend } from 'react-icons/io';
// import { useNavigate } from 'react-router-dom';
// import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
// import { doc, getDoc } from 'firebase/firestore';
// import { getStorage, ref, getDownloadURL } from 'firebase/storage';

// import treklogo from '../assets/treklogo.svg';
// import { db } from '../config/firebase';
// import LoadingScreen from '../components/Loading/LoadingScreen';
// import ErrorScreen from '../components/Errors/ErrorScreen';

// const ChatBotUI = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [inputValue, setInputValue] = useState('');
//   const [messages, setMessages] = useState([{ sender: 'bot', text: '👋 Hi! What can I do for you today?' }]);
//   const [wcount, setWCount] = useState(0);
//   const [chats, setChats] = useState([{ title: 'Chat 1', messages: [{ sender: 'bot', text: '👋 Hi! What can I do for you today?' }] }]);
//   const [selectedChatIndex, setSelectedChatIndex] = useState(0);
//   const [backendServer, loadingbackServer, errorbackserver] = useDocumentDataOnce(doc(db, 'server', 'backend'));

//   const maxWordCount = 500;
//   const minWordCount = 1;
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     if (inputValue.trim() === '') return;
//     setIsLoading(true);
//     const userMessage = { sender: 'user', text: inputValue };

//     const updatedChats = [...chats];
//     updatedChats[selectedChatIndex].messages.push(userMessage);
//     setMessages(updatedChats[selectedChatIndex].messages);
//     setChats(updatedChats);
//     setInputValue('');

//     if (wcount < minWordCount || wcount > maxWordCount) {
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 1000);
//       return;
//     }

//     try {
//       console.log('Sending fetch request...');
//       const response = await fetch('http://127.0.0.1:5000/chatbot', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query: userMessage.text }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       console.log('Response received:', response);

//       const data = await response.json();
//       console.log('Response data:', data);

//       const botMessage = { sender: 'bot', text: data.response || "Here's a response from the bot" };
//       updatedChats[selectedChatIndex].messages.push(botMessage);
//       setMessages(updatedChats[selectedChatIndex].messages);
//       setChats(updatedChats);

//       if (data.tags) {
//         for (const tag of data.tags) {
//           const docRef = doc(db, 'destinations', tag);
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
//             const images = docSnap.data().mobileImages;
//             const storage = getStorage();

//             for (const image of images) {
//               const imageRef = ref(storage, image);
//               const imageUrl = await getDownloadURL(imageRef);

//               const imageMessage = { sender: 'bot', text: '', imageUrl: imageUrl };
//               updatedChats[selectedChatIndex].messages.push(imageMessage);
//               setMessages(updatedChats[selectedChatIndex].messages);
//               setChats(updatedChats);
//             }
//           } else {
//             console.log("No such document!");
//             console.log(data.tags);
//           }
//         }
//       }
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Fetch error:', error);
//       setIsLoading(false);
//       alert(`Error: ${error.message}`);
//     }
//   };

//   const handleInputChange = (e) => {
//     const inputWords = e.target.value.trim().split(/\s+/).filter((word) => word !== '');
//     setInputValue(e.target.value);
//     setWCount(inputWords.length);
//   };

//   const handleSelectChat = (index) => {
//     setSelectedChatIndex(index);
//     setMessages(chats[index].messages);
//   };

//   const handleNewChat = () => {
//     const newChat = { title: `Chat ${chats.length + 1}`, messages: [{ sender: 'bot', text: '👋 Hi! What can I do for you today?' }] };
//     setChats([...chats, newChat]);
//     setSelectedChatIndex(chats.length);
//     setMessages(newChat.messages);
//   };

//   if (loadingbackServer) return <LoadingScreen />;
//   if (errorbackserver) return <ErrorScreen />;

//   return (
//     <div className="flex h-screen w-screen bg-gray-100">
//       <Sidebar chats={chats} onSelectChat={handleSelectChat} onNewChat={handleNewChat} />
//       <div className="flex flex-col w-3/4 h-full bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="flex flex-row items-center justify-between p-4 border-b border-gray-200">
//           <div className="flex items-center gap-2">
//             <img src={treklogo} alt="treklogo" className="w-10 h-10 object-contain" />
//             <h2 className="text-xl font-bold text-gray-700">Trek Bot</h2>
//           </div>
//           <p className="text-sm text-green-500">Online</p>
//         </div>
//         <div className="flex-grow p-4 overflow-y-auto">
//           {messages.map((message, index) => (
//             <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
//               <div className={`${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} p-3 rounded-lg max-w-xs`}>
//                 {message.text}
//                 {message.imageUrl && (
//                   <div className="mt-2">
//                     <img src={message.imageUrl} alt="Related visual content" className="rounded-lg" />
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="border-t border-gray-200 p-4 flex items-center">
//           <textarea
//             onChange={handleInputChange}
//             value={inputValue}
//             placeholder="Type your message here..."
//             rows={1}
//             className="resize-none p-2 flex-grow text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//           ></textarea>
//           <button
//             disabled={isLoading}
//             className="flex items-center justify-center w-12 h-12 ml-4 bg-blue-500 text-white rounded-full"
//             onClick={handleSubmit}
//           >
//             {isLoading ? (
//               <svg
//                 className="animate-spin h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//               >
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
//               </svg>
//             ) : (
//               <IoIosSend className="h-5 w-5" />
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Sidebar = ({ chats, onSelectChat, onNewChat }) => {
//   return (
//     <div className="bg-gray-200 w-1/4 h-full p-4 flex flex-col">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-bold">Chats</h2>
//         <button onClick={onNewChat} className="text-blue-500">New chat</button>
//       </div>
//       <div className="flex-grow overflow-y-auto">
//         {chats.map((chat, index) => (
//           <div
//             key={index}
//             className="p-2 mb-2 bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer"
//             onClick={() => onSelectChat(index)}
//           >
//             {chat.title}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChatBotUI;




// import React, { useState } from 'react';
// import { IoIosSend } from 'react-icons/io';
// import { useNavigate } from 'react-router-dom';
// import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
// import { doc, getDoc } from 'firebase/firestore';
// import { getimageURL } from '../firefunctions';
// import QuickResult from "../components/cards/QuickResult";

// import treklogo from '../assets/treklogo.svg';
// import { db } from '../config/firebase';
// import LoadingScreen from '../components/Loading/LoadingScreen';
// import ErrorScreen from '../components/Errors/ErrorScreen';

// const ChatBotUI = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [inputValue, setInputValue] = useState('');
//   const [messages, setMessages] = useState([{ sender: 'bot', text: '👋 Hi! What can I do for you today?' }]);
//   const [wcount, setWCount] = useState(0);
//   const [chats, setChats] = useState([{ title: 'Chat 1', messages: [{ sender: 'bot', text: '👋 Hi! What can I do for you today?' }] }]);
//   const [selectedChatIndex, setSelectedChatIndex] = useState(0);
//   const [backendServer, loadingbackServer, errorbackserver] = useDocumentDataOnce(doc(db, 'server', 'backend'));
//   const [result, setResult] = useState(null);

//   const maxWordCount = 500;
//   const minWordCount = 1;
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     if (inputValue.trim() === '') return;
//     setIsLoading(true);
//     const userMessage = { sender: 'user', text: inputValue };

//     const updatedChats = [...chats];
//     updatedChats[selectedChatIndex].messages.push(userMessage);
//     setMessages(updatedChats[selectedChatIndex].messages);
//     setChats(updatedChats);
//     setInputValue('');

//     if (wcount < minWordCount || wcount > maxWordCount) {
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 1000);
//       return;
//     }

//     try {
//       console.log('Sending fetch request...');
//       const response = await fetch('http://127.0.0.1:5000/chatbot', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query: userMessage.text }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       console.log('Response received:', response);

//       const data = await response.json();
//       console.log('Response data:', data);

//       const botMessage = { sender: 'bot', text: data.response || "Here's a response from the bot" };
//       updatedChats[selectedChatIndex].messages.push(botMessage);
//       setMessages(updatedChats[selectedChatIndex].messages);
//       setChats(updatedChats);

//       if (data.tags) {
//         for (const tag of data.tags) {
//           const docRef = doc(db, 'destinations', tag);
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
//             const images = docSnap.data().mobileImages;
//             if (images.length > 0) {
//               const imageUrl = await getimageURL(`destinations/${tag}/mobile/${images[0]}`);
//               const newResult = {
//                 name: docSnap.data().name,
//                 id: tag,
//                 description: docSnap.data().description,
//                 imageUrls: [imageUrl] // Use only the first image URL
//               };
//               setResult(newResult);
//               break; // Only show the first result
//             }
//           } else {
//             console.log("No such document!");
//             console.log(data.tags);
//           }
//         }
//       }
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Fetch error:', error);
//       setIsLoading(false);
//       alert(`Error: ${error.message}`);
//     }
//   };

//   const handleInputChange = (e) => {
//     const inputWords = e.target.value.trim().split(/\s+/).filter((word) => word !== '');
//     setInputValue(e.target.value);
//     setWCount(inputWords.length);
//   };

//   const handleSelectChat = (index) => {
//     setSelectedChatIndex(index);
//     setMessages(chats[index].messages);
//   };

//   const handleNewChat = () => {
//     const newChat = { title: `Chat ${chats.length + 1}`, messages: [{ sender: 'bot', text: '👋 Hi! What can I do for you today?' }] };
//     setChats([...chats, newChat]);
//     setSelectedChatIndex(chats.length);
//     setMessages(newChat.messages);
//   };

//   if (loadingbackServer) return <LoadingScreen />;
//   if (errorbackserver) return <ErrorScreen />;

//   return (
//     <div className="flex h-screen w-screen bg-gray-100">
//       <Sidebar chats={chats} onSelectChat={handleSelectChat} onNewChat={handleNewChat} />
//       <div className="flex flex-col w-3/4 h-full bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="flex flex-row items-center justify-between p-4 border-b border-gray-200">
//           <div className="flex items-center gap-2">
//             <img src={treklogo} alt="treklogo" className="w-10 h-10 object-contain" />
//             <h2 className="text-xl font-bold text-gray-700">Trek Bot</h2>
//           </div>
//           <p className="text-sm text-green-500">Online</p>
//         </div>
//         <div className="flex-grow p-4 overflow-y-auto">
//           {messages.map((message, index) => (
//             <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
//               <div className={`${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} p-3 rounded-lg max-w-xs`}>
//                 {message.text}
//               </div>
//             </div>
//           ))}
//           {result && (
//             <div className="w-full mt-4">
//               <QuickResult value={result} />
//             </div>
//           )}
//         </div>
//         <div className="border-t border-gray-200 p-4 flex items-center">
//           <textarea
//             onChange={handleInputChange}
//             value={inputValue}
//             placeholder="Type your message here..."
//             rows={1}
//             className="resize-none p-2 flex-grow text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//           ></textarea>
//           <button
//             disabled={isLoading}
//             className="flex items-center justify-center w-12 h-12 ml-4 bg-blue-500 text-white rounded-full"
//             onClick={handleSubmit}
//           >
//             {isLoading ? (
//               <svg
//                 className="animate-spin h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//               >
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
//               </svg>
//             ) : (
//               <IoIosSend className="h-5 w-5" />
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Sidebar = ({ chats, onSelectChat, onNewChat }) => {
//   return (
//     <div className="bg-gray-200 w-1/4 h-full p-4 flex flex-col">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-bold">Chats</h2>
//         <button onClick={onNewChat} className="text-blue-500">New chat</button>
//       </div>
//       <div className="flex-grow overflow-y-auto">
//         {chats.map((chat, index) => (
//           <div
//             key={index}
//             className="p-2 mb-2 bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer"
//             onClick={() => onSelectChat(index)}
//           >
//             {chat.title}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChatBotUI;





// import React, { useState } from 'react';
// import { IoIosSend } from 'react-icons/io';
// import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
// import { doc, getDoc } from 'firebase/firestore';
// import { getimageURL } from '../firefunctions';
// import QuickResult from '../components/cards/QuickResult';
// import ImageCard from '../components/ImageCard'; // Import ImageCard
// import treklogo from '../assets/treklogo.svg';
// import { db } from '../config/firebase';
// import LoadingScreen from '../components/Loading/LoadingScreen';
// import ErrorScreen from '../components/Errors/ErrorScreen';

// const ChatBotUI = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [inputValue, setInputValue] = useState('');
//   const [messages, setMessages] = useState([{ sender: 'bot', text: '👋 Hi! What can I do for you today?' }]);
//   const [wcount, setWCount] = useState(0);
//   const [chats, setChats] = useState([{ title: 'Chat 1', messages: [{ sender: 'bot', text: '👋 Hi! What can I do for you today?' }] }]);
//   const [selectedChatIndex, setSelectedChatIndex] = useState(0);
//   const [backendServer, loadingbackServer, errorbackserver] = useDocumentDataOnce(doc(db, 'server', 'backend'));
//   const [result, setResult] = useState(null);

//   const maxWordCount = 500;
//   const minWordCount = 1;

//   const handleSubmit = async () => {
//     if (inputValue.trim() === '') return;
//     setIsLoading(true);
//     const userMessage = { sender: 'user', text: inputValue };

//     const updatedChats = [...chats];
//     updatedChats[selectedChatIndex].messages.push(userMessage);
//     setMessages(updatedChats[selectedChatIndex].messages);
//     setChats(updatedChats);
//     setInputValue('');

//     if (wcount < minWordCount || wcount > maxWordCount) {
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 1000);
//       return;
//     }

//     try {
//       console.log('Sending fetch request...');
//       const response = await fetch('http://127.0.0.1:5000/chatbot', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query: userMessage.text }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       console.log('Response received:', response);

//       const data = await response.json();
//       console.log('Response data:', data);

//       const botMessage = { sender: 'bot', text: data.response || "Here's a response from the bot" };
//       updatedChats[selectedChatIndex].messages.push(botMessage);
//       setMessages(updatedChats[selectedChatIndex].messages);
//       setChats(updatedChats);

//       if (data.tags) {
//         for (const tag of data.tags) {
//           const docRef = doc(db, 'destinations', tag);
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
//             const images = docSnap.data().mobileImages;
//             const imageUrls = await Promise.all(images.map(image => getimageURL(`destinations/${tag}/mobile/${image}`)));
//             const newResult = {
//               name: docSnap.data().name,
//               id: tag,
//               description: docSnap.data().description,
//               imageUrls: imageUrls // Use all image URLs
//             };
//             setResult(newResult);
//             break; // Only show the first result
//           } else {
//             console.log("No such document!");
//             console.log(data.tags);
//           }
//         }
//       }
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Fetch error:', error);
//       setIsLoading(false);
//       alert(`Error: ${error.message}`);
//     }
//   };

//   const handleInputChange = (e) => {
//     const inputWords = e.target.value.trim().split(/\s+/).filter((word) => word !== '');
//     setInputValue(e.target.value);
//     setWCount(inputWords.length);
//   };

//   const handleSelectChat = (index) => {
//     setSelectedChatIndex(index);
//     setMessages(chats[index].messages);
//   };

//   const handleNewChat = () => {
//     const newChat = { title: `Chat ${chats.length + 1}`, messages: [{ sender: 'bot', text: '👋 Hi! What can I do for you today?' }] };
//     setChats([...chats, newChat]);
//     setSelectedChatIndex(chats.length);
//     setMessages(newChat.messages);
//   };

//   if (loadingbackServer) return <LoadingScreen />;
//   if (errorbackserver) return <ErrorScreen />;

//   return (
//     <div className="flex h-screen w-screen bg-gray-100">
//       <Sidebar chats={chats} onSelectChat={handleSelectChat} onNewChat={handleNewChat} />
//       <div className="flex flex-col w-3/4 h-full bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="flex flex-row items-center justify-between p-4 border-b border-gray-200">
//           <div className="flex items-center gap-2">
//             <img src={treklogo} alt="treklogo" className="w-10 h-10 object-contain" />
//             <h2 className="text-xl font-bold text-gray-700">Trek Bot</h2>
//           </div>
//           <p className="text-sm text-green-500">Online</p>
//         </div>
//         <div className="flex-grow p-4 overflow-y-auto">
//           {messages.map((message, index) => (
//             <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
//               <div className={`${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} p-3 rounded-lg max-w-xs`}>
//                 {message.text}
//               </div>
//             </div>
//           ))}
//           {result && (
//             <div className="w-full mt-4">
//               <ImageCard value={result} /> {/* Use ImageCard here */}
//             </div>
//           )}
//         </div>
//         <div className="border-t border-gray-200 p-4 flex items-center">
//           <textarea
//             onChange={handleInputChange}
//             value={inputValue}
//             placeholder="Type your message here..."
//             rows={1}
//             className="resize-none p-2 flex-grow text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//           ></textarea>
//           <button
//             disabled={isLoading}
//             className="flex items-center justify-center w-12 h-12 ml-4 bg-blue-500 text-white rounded-full"
//             onClick={handleSubmit}
//           >
//             {isLoading ? (
//               <svg
//                 className="animate-spin h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//               >
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
//               </svg>
//             ) : (
//               <IoIosSend className="h-5 w-5" />
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Sidebar = ({ chats, onSelectChat, onNewChat }) => {
//   return (
//     <div className="bg-gray-200 w-1/4 h-full p-4 flex flex-col">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-bold">Chats</h2>
//         <button onClick={onNewChat} className="text-blue-500">New chat</button>
//       </div>
//       <div className="flex-grow overflow-y-auto">
//         {chats.map((chat, index) => (
//           <div
//             key={index}
//             className="p-2 mb-2 bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer"
//             onClick={() => onSelectChat(index)}
//           >
//             {chat.title}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChatBotUI;




// import React, { useState } from 'react';
// import { IoIosSend } from 'react-icons/io';
// import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
// import { doc, getDoc } from 'firebase/firestore';
// import { getimageURL } from '../firefunctions';
// import QuickResult from '../components/cards/QuickResult';
// import ImageCard from '../components/ImageCard'; // Import ImageCard
// import treklogo from '../assets/treklogo.svg';
// import { db } from '../config/firebase';
// import LoadingScreen from '../components/Loading/LoadingScreen';
// import ErrorScreen from '../components/Errors/ErrorScreen';

// const ChatBotUI = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [inputValue, setInputValue] = useState('');
//   const [messages, setMessages] = useState([{ sender: 'bot', text: '👋 Hi! What can I do for you today?' }]);
//   const [wcount, setWCount] = useState(0);
//   const [chats, setChats] = useState([{ title: 'Chat 1', messages: [{ sender: 'bot', text: '👋 Hi! What can I do for you today?' }] }]);
//   const [selectedChatIndex, setSelectedChatIndex] = useState(0);
//   const [backendServer, loadingbackServer, errorbackserver] = useDocumentDataOnce(doc(db, 'server', 'backend'));
//   const [result, setResult] = useState(null);

//   const maxWordCount = 500;
//   const minWordCount = 1;

//   const handleSubmit = async () => {
//     if (inputValue.trim() === '') return;
//     setIsLoading(true);
//     const userMessage = { sender: 'user', text: inputValue };

//     const updatedChats = [...chats];
//     updatedChats[selectedChatIndex].messages.push(userMessage);
//     setMessages(updatedChats[selectedChatIndex].messages);
//     setChats(updatedChats);
//     setInputValue('');

//     if (wcount < minWordCount || wcount > maxWordCount) {
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 1000);
//       return;
//     }

//     try {
//       console.log('Sending fetch request...');
//       const response = await fetch('http://127.0.0.1:5000/chatbot', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query: userMessage.text }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       console.log('Response received:', response);

//       const data = await response.json();
//       console.log('Response data:', data);

//       const botMessage = { sender: 'bot', text: data.response || "Here's a response from the bot" };
//       updatedChats[selectedChatIndex].messages.push(botMessage);
//       setMessages(updatedChats[selectedChatIndex].messages);
//       setChats(updatedChats);

//       if (data.tags) {
//         for (const tag of data.tags) {
//           const docRef = doc(db, 'destinations', tag);
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
//             const images = docSnap.data().mobileImages;
//             const imageUrls = await Promise.all(images.map(image => getimageURL(`destinations/${tag}/mobile/${image}`)));
//             const newResult = {
//               name: docSnap.data().name,
//               id: tag,
//               description: docSnap.data().description,
//               imageUrls: imageUrls // Use all image URLs
//             };
//             setResult(newResult);
//             updatedChats[selectedChatIndex].messages.push({ sender: 'bot', result: newResult });
//             setMessages(updatedChats[selectedChatIndex].messages);
//             setChats(updatedChats);
//             break; // Only show the first result
//           } else {
//             console.log("No such document!");
//             console.log(data.tags);
//           }
//         }
//       }
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Fetch error:', error);
//       setIsLoading(false);
//       alert(`Error: ${error.message}`);
//     }
//   };

//   const handleInputChange = (e) => {
//     const inputWords = e.target.value.trim().split(/\s+/).filter((word) => word !== '');
//     setInputValue(e.target.value);
//     setWCount(inputWords.length);
//   };

//   const handleSelectChat = (index) => {
//     setSelectedChatIndex(index);
//     setMessages(chats[index].messages);
//   };

//   const handleNewChat = () => {
//     const newChat = { title: `Chat ${chats.length + 1}`, messages: [{ sender: 'bot', text: '👋 Hi! What can I do for you today?' }] };
//     setChats([...chats, newChat]);
//     setSelectedChatIndex(chats.length);
//     setMessages(newChat.messages);
//   };

//   if (loadingbackServer) return <LoadingScreen />;
//   if (errorbackserver) return <ErrorScreen />;

//   return (
//     <div className="flex h-screen w-screen bg-gray-100">
//       <Sidebar chats={chats} onSelectChat={handleSelectChat} onNewChat={handleNewChat} />
//       <div className="flex flex-col w-3/4 h-full bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="flex flex-row items-center justify-between p-4 border-b border-gray-200">
//           <div className="flex items-center gap-2">
//             <img src={treklogo} alt="treklogo" className="w-10 h-10 object-contain" />
//             <h2 className="text-xl font-bold text-gray-700">Trek Bot</h2>
//           </div>
//           <p className="text-sm text-green-500">Online</p>
//         </div>
//         <div className="flex-grow p-4 overflow-y-auto flex flex-col space-y-4">
//           {messages.map((message, index) => (
//             <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
//               <div className={`${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} p-3 rounded-lg max-w-xs`}>
//                 {message.text}
//                 {message.result && <ImageCard value={message.result} />}
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="border-t border-gray-200 p-4 flex items-center">
//           <textarea
//             onChange={handleInputChange}
//             value={inputValue}
//             placeholder="Type your message here..."
//             rows={1}
//             className="resize-none p-2 flex-grow text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//           ></textarea>
//           <button
//             disabled={isLoading}
//             className="flex items-center justify-center w-12 h-12 ml-4 bg-blue-500 text-white rounded-full"
//             onClick={handleSubmit}
//           >
//             {isLoading ? (
//               <svg
//                 className="animate-spin h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//               >
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
//               </svg>
//             ) : (
//               <IoIosSend className="h-5 w-5" />
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Sidebar = ({ chats, onSelectChat, onNewChat }) => {
//   return (
//     <div className="bg-gray-200 w-1/4 h-full p-4 flex flex-col">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-bold">Chats</h2>
//         <button onClick={onNewChat} className="text-blue-500">New chat</button>
//       </div>
//       <div className="flex-grow overflow-y-auto">
//         {chats.map((chat, index) => (
//           <div
//             key={index}
//             className="p-2 mb-2 bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer"
//             onClick={() => onSelectChat(index)}
//           >
//             {chat.title}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChatBotUI;




// import React, { useState } from 'react';
// import { IoIosSend } from 'react-icons/io';
// import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
// import { doc, getDoc } from 'firebase/firestore';
// import { getimageURL } from '../firefunctions';
// import treklogo from '../assets/treklogo.svg';
// import { db } from '../config/firebase';
// import LoadingScreen from '../components/Loading/LoadingScreen';
// import ErrorScreen from '../components/Errors/ErrorScreen';
// import ImageCard from '../components/ImageCard'; // Import ImageCard

// const ChatBotUI = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [inputValue, setInputValue] = useState('');
//   const [messages, setMessages] = useState([]); // Remove initial message
//   const [wcount, setWCount] = useState(0);
//   const [chats, setChats] = useState([{ title: 'Chat 1', messages: [] }]); // Remove initial message
//   const [selectedChatIndex, setSelectedChatIndex] = useState(0);
//   const [backendServer, loadingbackServer, errorbackserver] = useDocumentDataOnce(doc(db, 'server', 'backend'));
//   const [result, setResult] = useState(null);

//   const maxWordCount = 500;
//   const minWordCount = 1;

//   const handleSubmit = async () => {
//     if (inputValue.trim() === '') return;
//     setIsLoading(true);
//     const userMessage = { sender: 'user', text: inputValue };

//     const updatedChats = [...chats];
//     updatedChats[selectedChatIndex].messages.push(userMessage);
//     setMessages(updatedChats[selectedChatIndex].messages);
//     setChats(updatedChats);
//     setInputValue('');

//     if (wcount < minWordCount || wcount > maxWordCount) {
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 1000);
//       return;
//     }

//     try {
//       console.log('Sending fetch request...');
//       const response = await fetch('http://127.0.0.1:5000/chatbot', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query: userMessage.text }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       console.log('Response received:', response);

//       const data = await response.json();
//       console.log('Response data:', data);

//       const botMessage = { sender: 'bot', text: data.response || "Here's a response from the bot" };
//       updatedChats[selectedChatIndex].messages.push(botMessage);
//       setMessages(updatedChats[selectedChatIndex].messages);
//       setChats(updatedChats);

//       if (data.tags) {
//         for (const tag of data.tags) {
//           const docRef = doc(db, 'destinations', tag);
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
//             const images = docSnap.data().mobileImages;
//             const imageUrls = await Promise.all(images.map(image => getimageURL(`destinations/${tag}/mobile/${image}`)));
//             const newResult = {
//               name: docSnap.data().name,
//               id: tag,
//               description: docSnap.data().description,
//               imageUrls: imageUrls // Use all image URLs
//             };
//             setResult(newResult);
//             updatedChats[selectedChatIndex].messages.push({ sender: 'bot', result: newResult });
//             setMessages(updatedChats[selectedChatIndex].messages);
//             setChats(updatedChats);
//             break; // Only show the first result
//           } else {
//             console.log("No such document!");
//             console.log(data.tags);
//           }
//         }
//       }
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Fetch error:', error);
//       setIsLoading(false);
//       alert(`Error: ${error.message}`);
//     }
//   };

//   const handleInputChange = (e) => {
//     const inputWords = e.target.value.trim().split(/\s+/).filter((word) => word !== '');
//     setInputValue(e.target.value);
//     setWCount(inputWords.length);
//   };

//   const handleSelectChat = (index) => {
//     setSelectedChatIndex(index);
//     setMessages(chats[index].messages);
//   };

//   const handleNewChat = () => {
//     const newChat = { title: `Chat ${chats.length + 1}`, messages: [] };
//     setChats([...chats, newChat]);
//     setSelectedChatIndex(chats.length);
//     setMessages(newChat.messages);
//   };

//   if (loadingbackServer) return <LoadingScreen />;
//   if (errorbackserver) return <ErrorScreen />;

//   return (
//     <div className="flex h-screen w-screen bg-gray-100">
//       <Sidebar chats={chats} onSelectChat={handleSelectChat} onNewChat={handleNewChat} />
//       <div className="flex flex-col w-3/4 h-full bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="flex flex-row items-center justify-between p-4 border-b border-gray-200">
//           <div className="flex items-center gap-2">
//             <img src={treklogo} alt="treklogo" className="w-10 h-10 object-contain" />
//             <h2 className="text-xl font-bold text-gray-700">Trek Bot</h2>
//           </div>
//           <p className="text-sm text-green-500">Online</p>
//         </div>
//         <div className="flex-grow p-4 overflow-y-auto flex flex-col space-y-4">
//           {messages.map((message, index) => (
//             <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
//               <div className={`${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} p-3 rounded-lg max-w-xs`}>
//                 {message.text}
//                 {message.result && (
//                   <div className="mt-2 max-w-xs bg-gray-200 p-2 rounded-lg">
//                     <ImageCard value={message.result} />
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="border-t border-gray-200 p-4 flex items-center">
//           <textarea
//             onChange={handleInputChange}
//             value={inputValue}
//             placeholder="Type your message here..."
//             rows={1}
//             className="resize-none p-2 flex-grow text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//           ></textarea>
//           <button
//             disabled={isLoading}
//             className="flex items-center justify-center w-12 h-12 ml-4 bg-blue-500 text-white rounded-full"
//             onClick={handleSubmit}
//           >
//             {isLoading ? (
//               <svg
//                 className="animate-spin h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//               >
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
//               </svg>
//             ) : (
//               <IoIosSend className="h-5 w-5" />
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Sidebar = ({ chats, onSelectChat, onNewChat }) => {
//   return (
//     <div className="bg-gray-200 w-1/4 h-full p-4 flex flex-col">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-bold">Chats</h2>
//         <button onClick={onNewChat} className="text-blue-500">New chat</button>
//       </div>
//       <div className="flex-grow overflow-y-auto">
//         {chats.map((chat, index) => (
//           <div
//             key={index}
//             className="p-2 mb-2 bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer"
//             onClick={() => onSelectChat(index)}
//           >
//             {chat.title}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChatBotUI;


// import React, { useState } from 'react';
// import { IoIosSend } from 'react-icons/io';
// import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
// import { doc, getDoc } from 'firebase/firestore';
// import { getimageURL } from '../firefunctions';
// import treklogo from '../assets/treklogo.svg';
// import { db } from '../config/firebase';
// import LoadingScreen from '../components/Loading/LoadingScreen';
// import ErrorScreen from '../components/Errors/ErrorScreen';
// import ImageCard from '../components/ImageCard'; // Import ImageCard

// const ChatBotUI = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [inputValue, setInputValue] = useState('');
//   const [messages, setMessages] = useState([]); // Remove initial message
//   const [wcount, setWCount] = useState(0);
//   const [chats, setChats] = useState([{ title: 'Chat 1', messages: [] }]); // Remove initial message
//   const [selectedChatIndex, setSelectedChatIndex] = useState(0);
//   const [backendServer, loadingbackServer, errorbackserver] = useDocumentDataOnce(doc(db, 'server', 'backend'));
//   const [result, setResult] = useState(null);

//   const maxWordCount = 500;
//   const minWordCount = 1;

//   const handleSubmit = async () => {
//     if (inputValue.trim() === '') return;
//     setIsLoading(true);
//     const userMessage = { sender: 'user', text: inputValue };

//     const updatedChats = [...chats];
//     updatedChats[selectedChatIndex].messages.push(userMessage);
//     setMessages(updatedChats[selectedChatIndex].messages);
//     setChats(updatedChats);
//     setInputValue('');

//     if (wcount < minWordCount || wcount > maxWordCount) {
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 1000);
//       return;
//     }

//     try {
//       console.log('Sending fetch request...');
//       const response = await fetch('http://127.0.0.1:5000/chatbot', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query: userMessage.text }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       console.log('Response received:', response);

//       const data = await response.json();
//       console.log('Response data:', data);

//       const botMessage = { sender: 'bot', text: data.response || "Here's a response from the bot" };
//       updatedChats[selectedChatIndex].messages.push(botMessage);
//       setMessages(updatedChats[selectedChatIndex].messages);
//       setChats(updatedChats);

//       if (data.tags) {
//         for (const tag of data.tags) {
//           const docRef = doc(db, 'destinations', tag);
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
//             const images = docSnap.data().mobileImages;
//             const imageUrls = await Promise.all(images.map(image => getimageURL(`destinations/${tag}/mobile/${image}`)));
//             const newResult = {
//               name: docSnap.data().name,
//               id: tag,
//               description: docSnap.data().description,
//               imageUrls: imageUrls // Use all image URLs
//             };
//             setResult(newResult);
//             updatedChats[selectedChatIndex].messages.push({ sender: 'bot', result: newResult });
//             setMessages(updatedChats[selectedChatIndex].messages);
//             setChats(updatedChats);
//             break; // Only show the first result
//           } else {
//             console.log("No such document!");
//             console.log(data.tags);
//           }
//         }
//       }
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Fetch error:', error);
//       setIsLoading(false);
//       alert(`Error: ${error.message}`);
//     }
//   };

//   const handleInputChange = (e) => {
//     const inputWords = e.target.value.trim().split(/\s+/).filter((word) => word !== '');
//     setInputValue(e.target.value);
//     setWCount(inputWords.length);
//   };

//   const handleSelectChat = (index) => {
//     setSelectedChatIndex(index);
//     setMessages(chats[index].messages);
//   };

//   const handleNewChat = () => {
//     const newChat = { title: `Chat ${chats.length + 1}`, messages: [] };
//     setChats([...chats, newChat]);
//     setSelectedChatIndex(chats.length);
//     setMessages(newChat.messages);
//   };

//   if (loadingbackServer) return <LoadingScreen />;
//   if (errorbackserver) return <ErrorScreen />;

//   return (
//     <div className="flex h-screen w-screen bg-gray-100">
//       <Sidebar chats={chats} onSelectChat={handleSelectChat} onNewChat={handleNewChat} />
//       <div className="flex flex-col w-3/4 h-full bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="flex flex-row items-center justify-between p-4 border-b border-gray-200">
//           <div className="flex items-center gap-2">
//             <img src={treklogo} alt="treklogo" className="w-10 h-10 object-contain" />
//             <h2 className="text-xl font-bold text-gray-700">Trek Bot</h2>
//           </div>
//           <p className="text-sm text-green-500">Online</p>
//         </div>
//         <div className="flex-grow p-4 overflow-y-auto flex flex-col space-y-4">
//           {messages.map((message, index) => (
//             <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
//               <div className={`${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} p-3 rounded-lg max-w-xs`}>
//                 {message.text}
//                 {message.result && (
//                   <div className="mt-2 max-w-xs">
//                     <ImageCard key={message.result.id} value={message.result} />
//                   </div>
//                )}
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="border-t border-gray-200 p-4 flex items-center">
//           <textarea
//             onChange={handleInputChange}
//             value={inputValue}
//             placeholder="Type your message here..."
//             rows={1}
//             className="resize-none p-2 flex-grow text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//           ></textarea>
//           <button
//             disabled={isLoading}
//             className="flex items-center justify-center w-12 h-12 ml-4 bg-blue-500 text-white rounded-full"
//             onClick={handleSubmit}
//           >
//             {isLoading ? (
//               <svg
//                 className="animate-spin h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//               >
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
//               </svg>
//             ) : (
//               <IoIosSend className="h-5 w-5" />
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Sidebar = ({ chats, onSelectChat, onNewChat }) => {
//   return (
//     <div className="bg-gray-200 w-1/4 h-full p-4 flex flex-col">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-bold">Chats</h2>
//         <button onClick={onNewChat} className="text-blue-500">New chat</button>
//       </div>
//       <div className="flex-grow overflow-y-auto">
//         {chats.map((chat, index) => (
//           <div
//             key={index}
//             className="p-2 mb-2 bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer"
//             onClick={() => onSelectChat(index)}
//           >
//             {chat.title}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChatBotUI;



import React, { useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { getimageURL } from '../firefunctions';
import treklogo from '../assets/treklogo.svg';
import { db } from '../config/firebase';
import LoadingScreen from '../components/Loading/LoadingScreen';
import ErrorScreen from '../components/Errors/ErrorScreen';
import ImageCard from '../components/ImageCard'; // Import ImageCard

const ChatBotUI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]); // Remove initial message
  const [wcount, setWCount] = useState(0);
  const [chats, setChats] = useState([{ title: 'Chat 1', messages: [] }]); // Remove initial message
  const [selectedChatIndex, setSelectedChatIndex] = useState(0);
  const [backendServer, loadingbackServer, errorbackserver] = useDocumentDataOnce(doc(db, 'server', 'backend'));
  const [result, setResult] = useState(null);

  const maxWordCount = 500;
  const minWordCount = 1;

  const handleSubmit = async () => {
    if (inputValue.trim() === '') return;
    setIsLoading(true);
    const userMessage = { sender: 'user', text: inputValue };

    const updatedChats = [...chats];
    updatedChats[selectedChatIndex].messages.push(userMessage);
    setMessages(updatedChats[selectedChatIndex].messages);
    setChats(updatedChats);
    setInputValue('');

    if (wcount < minWordCount || wcount > maxWordCount) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      console.log('Sending fetch request...');
      const response = await fetch('http://127.0.0.1:5000/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userMessage.text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Response received:', response);

      const data = await response.json();
      console.log('Response data:', data);

      const botMessage = { sender: 'bot', text: data.response || "Here's a response from the bot" };
      updatedChats[selectedChatIndex].messages.push(botMessage);
      setMessages(updatedChats[selectedChatIndex].messages);
      setChats(updatedChats);

      if (data.tags) {
        for (const tag of data.tags) {
          const docRef = doc(db, 'destinations', tag);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const images = docSnap.data().mobileImages;
            const imageUrls = await Promise.all(images.map(image => getimageURL(`destinations/${tag}/mobile/${image}`)));
            const newResult = {
              name: docSnap.data().name,
              id: tag,
              description: docSnap.data().description,
              imageUrls: imageUrls // Use all image URLs
            };
            setResult(newResult);
            updatedChats[selectedChatIndex].messages.push({ sender: 'bot', result: newResult });
            setMessages(updatedChats[selectedChatIndex].messages);
            setChats(updatedChats);
            break; // Only show the first result
          } else {
            console.log("No such document!");
            console.log(data.tags);
          }
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
      setIsLoading(false);
      alert(`Error: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const inputWords = e.target.value.trim().split(/\s+/).filter((word) => word !== '');
    setInputValue(e.target.value);
    setWCount(inputWords.length);
  };

  const handleSelectChat = (index) => {
    setSelectedChatIndex(index);
    setMessages(chats[index].messages);
  };

  const handleNewChat = () => {
    const newChat = { title: `Chat ${chats.length + 1}`, messages: [] };
    setChats([...chats, newChat]);
    setSelectedChatIndex(chats.length);
    setMessages(newChat.messages);
  };

  if (loadingbackServer) return <LoadingScreen />;
  if (errorbackserver) return <ErrorScreen />;

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      <Sidebar chats={chats} onSelectChat={handleSelectChat} onNewChat={handleNewChat} />
      <div className="flex flex-col w-3/4 h-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-row items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <img src={treklogo} alt="treklogo" className="w-10 h-10 object-contain" />
            <h2 className="text-xl font-bold text-gray-700">Trek Bot</h2>
          </div>
          <p className="text-sm text-green-500">Online</p>
        </div>
        <div className="flex-grow p-4 overflow-y-auto flex flex-col space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
              <div className={`${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} p-3 rounded-lg max-w-xs`}>
                {message.text}
                {message.result && (
                  <div className="mt-2 max-w-xs">
                    <ImageCard key={message.result.id} value={message.result} />
                  </div>
               )}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 p-4 flex items-center">
          <textarea
            onChange={handleInputChange}
            value={inputValue}
            placeholder="Type your message here..."
            rows={1}
            className="resize-none p-2 flex-grow text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
          <button
            disabled={isLoading}
            className="flex items-center justify-center w-12 h-12 ml-4 bg-blue-500 text-white rounded-full"
            onClick={handleSubmit}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
              </svg>
            ) : (
              <IoIosSend className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ chats, onSelectChat, onNewChat }) => {
  return (
    <div className="bg-gray-200 w-1/4 h-full p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Chats</h2>
        <button onClick={onNewChat} className="text-blue-500">New chat</button>
      </div>
      <div className="flex-grow overflow-y-auto">
        {chats.map((chat, index) => (
          <div
            key={index}
            className="p-2 mb-2 bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelectChat(index)}
          >
            {chat.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBotUI;









































 