import { useEffect, useState } from "react";
import { getimageURL } from "../../firefunctions";
import { MdOutlineUnfoldMore } from "react-icons/md";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function QuickResult({ value }) {
  const [image, setImages] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    getimageURL(0, "destinations/" + value.id + "/desktop/").then((imginfo) => {
      setImages(imginfo);
    });
  }, [value]);

  const handleShowMore = () => {
    navigate("/spot/" + value.id);
  };
  return (
    <div
      className="max-w-[500px] w-screen mx-auto bg-black  h-screen min-h-[500px] relative"
      style={{
        backgroundImage: `url(${image.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <nav
        className=" absolute right-2 top-1/2 transform -translate-y-[-50%] rounded-[50px] shadow-lg
      "
      >
        <ul className="flex flex-col">
          {/* <li>
            <button className="bg-red-200/40 transition-colors duration-150 hover:bg-red-500 p-2 backdrop-blur-sm rounded-t-full">
              <MdFavoriteBorder className="text-white text-2xl" />
            </button>
          </li> */}
          <li>
            <button
              className="bg-gray-200/40 transition-colors duration-150 hover:bg-gray-300/80 p-2 backdrop-blur-sm rounded-full"
              onClick={handleShowMore}
            >
              <MdOutlineUnfoldMore className="text-white text-2xl" />
            </button>
          </li>
        </ul>
      </nav>
      <div className=" bg-gradient-to-t from-black px-4 pb-2 pt-5 bottom-0 w-full absolute">
        <h2 className="text-white text-lg font-bold ">{value.name}</h2>
        <p className="text-white font-inter pt-1 text-sm">
          {value.description.length > 70
            ? value.description.substring(0, 70) + "..."
            : value.description}
        </p>
      </div>
    </div>
  );
}
