/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { HashLoader, PulseLoader } from "react-spinners";

export default function LoadingScreen({
  messages = ["Please wait", "Almost there", "Just a moment"],
  progress = null,
}) {
  const [text, setText] = useState(messages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setText((prev) => {
        const index = messages.indexOf(prev);
        if (index === messages.length - 1) {
          return messages[0];
        }
        return messages[index + 1];
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="flex items-center -z-50 justify-center h-screen w-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex flex-col items-center mb-10">
        <HashLoader
          loading={true}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
          speedMultiplier={0.5}
          className="mb-5"
        />

        <div className="flex items-baseline">
          <p className="font-mono text-sm">{text}</p>
          <PulseLoader
            loading={true}
            size={3}
            aria-label="Dots Spinner"
            data-testid="dots"
            speedMultiplier={0.4}
          />
        </div>
        {progress && (
          <span className="text-sm font-mono">
            {progress.toPrecision(3)}
            {"%"}
          </span>
        )}
      </div>
    </div>
  );
}
