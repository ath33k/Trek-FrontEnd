import { useState } from "react";

import treklogo from "../assets/treklogo.svg";
import { IoIosSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { navlinks } from "../navlinks";
import { collectUserPrompts } from "../firefunctions";
import { db } from "../config/firebase";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import LoadingScreen from "../components/Loading/LoadingScreen";
import ErrorScreen from "../components/Errors/ErrorScreen";

const ChatBotUI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [wcount, setWCount] = useState(0);
  const [backendServer, loadingbackServer, errorbackserver] =
    useDocumentDataOnce(doc(db, "server", "backend"));
  const maxWordCount = 500;
  const minWordCount = 3;

  const navigate = useNavigate();

  const handleSubmit = () => {
    setIsLoading(true);

    if (wcount < 3 || wcount > maxWordCount) {
      setInterval(() => {
        setIsLoading(false);
      }, 1000);
      return;
    }

    fetch(`${backendServer.path}/generate_tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sentence: inputValue }),
    }).then((response) => {
      response
        //  .json()
        .then((spots) => {
          const spnames = spots.map((spot) => spot.name);
          collectUserPrompts(db, {
            sentence: inputValue,
            suggestions: spnames,
          });
          navigate(navlinks.results.path, { state: { results: spots } });
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setInterval(() => {
            setIsLoading(false);
          }, 2000);
        });
    });
    setInterval(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleInputChange = (e) => {
    const inputWords = e.target.value
      .trim()
      .split(/\s+/)
      .filter((word) => word !== "");

    setInputValue(e.target.value);
    setWCount(inputWords.length);
  };

  if (loadingbackServer) return <LoadingScreen />;
  if (errorbackserver) return <ErrorScreen />;

  return (
    <div
      className="flex flex-col items-center justify-center h-screen w-screen px-1"
      style={{
        backgroundImage: `url(${"/wallpaper1.webp"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="px-2 pt-2 pb-8 bg-white bg-opacity-80 rounded-lg shadow-lg mb-4 w-full max-w-[500px]">
        <span className=" flex items-center gap-2 mb-2">
          <img
            src={treklogo}
            alt="treklogo"
            className="w-10 h-10 object-contain"
          />
          <h2 className="text-2xl font-bold font-oswald text-gray-700">Trek</h2>
        </span>
        <div className=" flex gap-2">
          <textarea
            onChange={handleInputChange}
            value={inputValue}
            placeholder="Describe your dream destination..."
            rows={3}
            className="resize-none p-2.5 flex-grow text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-[#46B0A9] focus:border-[#46B0A9] "
          ></textarea>
          <button
            disabled={isLoading}
            className=" p-0 w-10 h-10 relative min-w-0 min-h-0 text-xl rounded-full bg-[#46B0A9] text-white"
            onClick={handleSubmit}
          >
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 0116 0H4z"
                  ></path>
                </svg>
              </div>
            ) : (
              <IoIosSend className=" absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
            )}
          </button>
        </div>
        <div className="flex gap-2">
          <p
            className={`text-sm font-oswald ${
              wcount > maxWordCount ? " text-red-600" : " text-gray-500"
            }`}
          >
            {wcount}/{maxWordCount}
          </p>
          <p className=" text-sm text-red-800">
            {wcount > maxWordCount
              ? "Maximum word count exceeded"
              : wcount < minWordCount
              ? "At least 3 words required"
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBotUI;
{
  /* <div className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm flex flex-col items-center justify-center">
        <div className="p-8 bg-white bg-opacity-80 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            𝗗𝗘𝗦𝗖𝗥𝗜𝗕𝗘 𝗬𝗢𝗨𝗥 𝗗𝗥𝗘𝗔𝗠 𝗗𝗘𝗦𝗧𝗜𝗡𝗔𝗧𝗜𝗢𝗡!
          </h2>
          <div className="flex justify-center w-full max-w-xl">
            <input
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#46B0A9] focus:ring focus:ring-[#46B0A9] focus:ring-opacity-50"
              type="text"
              placeholder="𝘋𝘳𝘦𝘢𝘮. 𝘋𝘪𝘴𝘤𝘰𝘷𝘦𝘳. 𝘋𝘦𝘱𝘢𝘳𝘵."
              value={inputValue}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <button
              type="button"
              className="ml-4 inline-flex items-center justify-center px-6 py-2 bg-[#46B0A9] text-white font-semibold rounded-full hover:bg-[#3a9486] focus:outline-none focus:ring-2 focus:ring-[#46B0A9] focus:ring-opacity-50 relative"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 0116 0H4z"
                    ></path>
                  </svg>
                </div>
              ) : (
                <FaCheck className="w-6 h-5" strokeWidth="0.5" />
              )}
            </button>
          </div>
          {isLoading && (
            <div className="mt-2 text-sm font-semibold text-gray-700">
              Fetching dreamscapes...
            </div>
          )}
        </div>
      </div> */
}
