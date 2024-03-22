import axios from "axios";
export default function Testbotpage() {
  const handletextSubmit = async (e) => {
    e.preventDefault();
    const prompt = { sentence: "I want to visit beaches" };

    axios
      .post("http://65.0.75.52/generate_tags", prompt, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
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
