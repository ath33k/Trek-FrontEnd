// import Container from "../components/Container";
// import { FaGlobeAsia } from "react-icons/fa";
// import { navlinks } from "../navlinks";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
// import { doc } from "firebase/firestore";
// import LoadingScreen from "../components/Loading/LoadingScreen";
// import ErrorScreen from "../components/Errors/ErrorScreen";
// import { db } from "../config/firebase";

// export default function SearchPage() {
//   const [inputValue, setInputValue] = useState("");
//   const navigate = useNavigate();

//   const [backendServer, loadingbackServer, errorbackserver] =
//     useDocumentDataOnce(doc(db, "server", "backend"));

//   const handleSubmit = () => {
//     fetch(`${backendServer.path}/search`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ query: inputValue }),
//     }).then((response) => {
//       response
//         .json()
//         .then((spots) => {
//           navigate(navlinks.results.path, { state: { results: spots } });
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//     });
//   };

//   if (loadingbackServer) return <LoadingScreen />;
//   if (errorbackserver) return <ErrorScreen />;

//   return (
//     <Container>
//       <form
//         className="max-w-md mx-auto px-2 h-screen flex flex-col justify-center"
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleSubmit();
//         }}
//       >
//         <label
//           htmlFor="default-search"
//           className="mb-2 text-sm font-medium text-gray-900 sr-only "
//         >
//           Search
//         </label>
//         <div className="relative">
//           <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//             <FaGlobeAsia className="h-5 w-5 text-gray-400 dark:text-gray-300" />
//           </div>
//           <input
//             type="search"
//             id="default-search"
//             className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
//             placeholder="Search for a destination"
//             required
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//           />
//           <button
//             type="submit"
//             className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
//           >
//             Search
//           </button>
//         </div>
//       </form>
//     </Container>
//   );
// }

import React, { useState } from "react";
import Container from "../components/Container";
import { FaGlobeAsia } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import LoadingScreen from "../components/Loading/LoadingScreen";
import ErrorScreen from "../components/Errors/ErrorScreen";
import { db } from "../config/firebase";

export default function SearchPage() {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const querySnapshot = await getDocs(collection(db, "destinations"));
      const spots = [];
      const regex = new RegExp(inputValue, "i"); // Regular expression to match the input value case-insensitively

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (regex.test(data.city)) {
          spots.push({ id: doc.id, ...data });
        }
      });

      setResults(spots);
      navigate("/results", { state: { results: spots } });
    } catch (err) {
      console.error("Error fetching destinations:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen />;

  return (
    <Container>
      <form
        className="max-w-md mx-auto px-2 h-screen flex flex-col justify-center"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <FaGlobeAsia className="h-5 w-5 text-gray-400 dark:text-gray-300" />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for a destination"
            required
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>
    </Container>
  );
}


