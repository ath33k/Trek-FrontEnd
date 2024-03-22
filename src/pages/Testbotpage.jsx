export default function Testbotpage() {
  const handletextSubmit = async (e) => {
    e.preventDefault();
    const prompt = { sentence: "I want to visit beaches" };

    fetch("http://65.0.75.52/generate_tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <form onSubmit={handletextSubmit}>
      <h1>Testbotpage</h1>
      <input type="text" placeholder="Enter prompt" />
      <button type="submit">Submit</button>
    </form>
  );
}
