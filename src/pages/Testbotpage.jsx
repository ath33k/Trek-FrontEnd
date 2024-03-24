import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Testbotpage() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const handletextSubmit = async () => {
    fetch("http://3.7.65.157/generate_tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sentence: prompt }),
    })
      .then((response) => {
        response.json().then((spots) => {
          console.log(spots);
          navigate("/spot/" + spots[0].id);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <h1>Testbotpage</h1>
      <input
        type="text"
        placeholder="Enter prompt"
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
        value={prompt}
      />
      <button
        onClick={() => {
          handletextSubmit(() => {});
        }}
      >
        Submit
      </button>
    </div>
  );
}
