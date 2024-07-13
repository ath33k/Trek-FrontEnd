// import React, { useState } from 'react';
// import { IoIosSend } from 'react-icons/io';
// import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
// import { doc, getDoc } from 'firebase/firestore';
// import { getimageURL } from '../firefunctions';
// import treklogo from '../assets/treklogo.svg';
// import { db } from '../config/firebase';
// import LoadingScreen from '../components/Loading/LoadingScreen';
// import ErrorScreen from '../components/Errors/ErrorScreen';
// import LocationCard from '../components/LocationCard'; // Import LocationCard

// const ChatBotUI = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [inputValue, setInputValue] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [wcount, setWCount] = useState(0);
//   const [chats, setChats] = useState([{ title: 'Chat 1', messages: [] }]);
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

//       const data = await response.json();

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
//             updatedChats[selectedChatIndex].messages.push({ sender: 'location', result: newResult });
//             setMessages(updatedChats[selectedChatIndex].messages);
//             setChats(updatedChats);
//             break; // Only show the first result
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
//               {message.sender === 'location' ? (
//                 <div className="w-full">
//                   <LocationCard key={message.result.id} value={message.result} />
//                 </div>
//               ) : (
//                 <div className={`${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} p-3 rounded-lg max-w-xs`}>
//                   {message.text}
//                 </div>
//               )}
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
// import LocationCard from '../components/LocationCard'; // Import LocationCard

// const ChatBotUI = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [inputValue, setInputValue] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [wcount, setWCount] = useState(0);
//   const [chats, setChats] = useState([{ title: 'Chat 1', messages: [] }]);
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

//       const data = await response.json();

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
//             updatedChats[selectedChatIndex].messages.push({ sender: 'location', result: newResult });
//             setMessages(updatedChats[selectedChatIndex].messages);
//             setChats(updatedChats);
//             break; // Only show the first result
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
//               {message.sender === 'location' ? (
//                 <div className="w-full max-w-md">
//                   <LocationCard key={message.result.id} value={message.result} />
//                 </div>
//               ) : (
//                 <div className={`${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} p-3 rounded-lg max-w-xs`}>
//                   {message.text}
//                 </div>
//               )}
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
// import LocationCard from '../components/LocationCard'; // Import LocationCard
// import MapBotCard from '../components/MapBotCard'; // Import MapBotCard

// const ChatBotUI = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [inputValue, setInputValue] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [wcount, setWCount] = useState(0);
//   const [chats, setChats] = useState([{ title: 'Chat 1', messages: [] }]);
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

//       const data = await response.json();

//       const botMessage = { sender: 'bot', text: data.response || "Here's a response from the bot" };
//       updatedChats[selectedChatIndex].messages.push(botMessage);
//       setMessages(updatedChats[selectedChatIndex].messages);
//       setChats(updatedChats);

//       if (data.coordinates) {
//         const newResult = {
//           name: "Destination Coordinates",
//           coordinates: data.coordinates,
//           description: "Showing route to the destination."
//         };
//         updatedChats[selectedChatIndex].messages.push({ sender: 'map', result: newResult });
//         setMessages(updatedChats[selectedChatIndex].messages);
//         setChats(updatedChats);
//       }

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
//               imageUrls: imageUrls
//             };
//             setResult(newResult);
//             updatedChats[selectedChatIndex].messages.push({ sender: 'location', result: newResult });
//             setMessages(updatedChats[selectedChatIndex].messages);
//             setChats(updatedChats);
//             break; // Only show the first result
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
//               {message.sender === 'map' ? (
//                 <div className="w-full">
//                   <MapBotCard key={message.result.coordinates} value={message.result} />
//                 </div>
//               ) : message.sender === 'location' ? (
//                 <div className="w-full max-w-md">
//                   <LocationCard key={message.result.id} value={message.result} />
//                 </div>
//               ) : (
//                 <div className={`${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} p-3 rounded-lg max-w-xs`}>
//                   {message.text}
//                 </div>
//               )}
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
import LocationCard from '../components/LocationCard'; // Import LocationCard
import MapBotCard from '../components/MapBotCard'; // Import MapBotCard

const ChatBotUI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [wcount, setWCount] = useState(0);
  const [chats, setChats] = useState([{ title: 'Chat 1', messages: [] }]);
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

      const data = await response.json();

      const botMessage = { sender: 'bot', text: data.response || "Here's a response from the bot" };
      updatedChats[selectedChatIndex].messages.push(botMessage);
      setMessages(updatedChats[selectedChatIndex].messages);
      setChats(updatedChats);

      if (data.coordinates) {
        const coordinates = data.coordinates.slice(1, -1); // Remove the '<' and '>' characters
        const newResult = {
          name: 'Destination Coordinates',
          coordinates: coordinates,
          description: 'Showing route to the destination.',
        };
        updatedChats[selectedChatIndex].messages.push({ sender: 'map', result: newResult });
        setMessages(updatedChats[selectedChatIndex].messages);
        setChats(updatedChats);
      }

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
              imageUrls: imageUrls,
            };
            setResult(newResult);
            updatedChats[selectedChatIndex].messages.push({ sender: 'location', result: newResult });
            setMessages(updatedChats[selectedChatIndex].messages);
            setChats(updatedChats);
            break; // Only show the first result
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
    const inputWords = e.target.value.trim().split(/\s+/).filter(word => word !== '');
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
              {message.sender === 'map' ? (
                <div className="w-full">
                  <MapBotCard key={message.result.coordinates} value={message.result} />
                </div>
              ) : message.sender === 'location' ? (
                <div className="w-full max-w-md">
                  <LocationCard key={message.result.id} value={message.result} />
                </div>
              ) : (
                <div className={`${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} p-3 rounded-lg max-w-xs`}>
                  {message.text}
                </div>
              )}
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




























