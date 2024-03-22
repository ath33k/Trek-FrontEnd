export default function Testbotpage() {
  const handletextSubmit = async () => {
    //  e.preventDefault();
    const prompt = { sentence: "elephants" };

    fetch("http://15.206.164.245/generate_tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt),
    })
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <h1>Testbotpage</h1>
      <input type="text" placeholder="Enter prompt" />
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
