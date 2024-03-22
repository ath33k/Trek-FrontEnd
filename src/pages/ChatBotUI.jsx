import { useState } from "react";
import Container from "../components/Container";
import { FaCamera, FaCheck } from "react-icons/fa";

const ChatBotUI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isCameraClicked, setIsCameraClicked] = useState(false);

  const maxWordCount = 500;

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const handleInputChange = (e) => {
    const inputWords = e.target.value.split(/\s+/);
    if (inputWords.length <= maxWordCount) {
      setInputValue(e.target.value);
    } else {
      alert("You have reached the maximum word count of 500.");
    }
  };

  const handleCameraClick = () => {
    setIsCameraClicked(true);
    setTimeout(() => {
      setIsCameraClicked(false);
    }, 600);
  };

  return (
    <Container>
      <div className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm flex flex-col items-center justify-center">
        <div className="p-8 bg-white bg-opacity-80 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            𝗗𝗘𝗦𝗖𝗥𝗜𝗕𝗘 𝗬𝗢𝗨𝗥 𝗗𝗥𝗘𝗔𝗠 𝗗𝗘𝗦𝗧𝗜𝗡𝗔𝗧𝗜𝗢𝗡!
          </h2>
          <div className="flex justify-center w-full max-w-xl">
            <FaCamera
              className={`text-[#46B0A9] self-center mr-3 cursor-pointer transition-transform duration-300 ${
                isCameraClicked ? "scale-75" : "scale-100"
              }`}
              size={40}
              onClick={handleCameraClick}
            />
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
      </div>
    </Container>
  );
};

export default ChatBotUI;
