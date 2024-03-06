import { useState } from "react";

function Imageform() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [labelTitle, setLabelTitle] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      selectedImage,
      labelTitle,
      description,
      name,
    });
  };
  return (
    <div className=" bg-aqua w-[400px] h-[600px] flex flex-col mx-auto my-150 justify-center items-center text-center">
      <div>
        <h1>Form</h1>
      </div>
      <div>
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col w-[400px] h-[400px] text-[20px]"
        >
          <div className=" bg-white w-[350px] mx-auto my-10 p-15 border-dotted border-black border-4">
            <label htmlFor="image">Upload Image</label>
            <br />
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className=""
            />
          </div>
          <div className="">
            <label htmlFor="labelTitle" className="">
              Label Title
            </label>
            <br />
            <input
              type="text"
              id="labelTitle"
              value={labelTitle}
              onChange={(e) => setLabelTitle(e.target.value)}
              className="w-[200px] h-[20px]"
            />
          </div>
          <div className="">
            <label htmlFor="description" className="">
              Description
            </label>
            <br />
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-[200px] h-[50px]"
            />
          </div>
          <div className="">
            <label htmlFor="name" className="">
              Name
            </label>
            <br />
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[200px] h-[20px]"
            />
          </div>
          <button type="submit" className="mt-40 w-[350px] h-[40px] mx-auto">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Imageform;
