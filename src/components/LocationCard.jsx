// import { useEffect, useState } from "react";
// import Slider from "react-slick";
// import { useNavigate } from "react-router-dom";
// import { BiExpandAlt } from "react-icons/bi";
// import { getimageURL } from "../firefunctions";

// export default function LocationCard({ value }) {
//   const [images, setImages] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchImages = async () => {
//       const imagePromises = value.imageUrls.map((image, index) =>
//         getimageURL(index, `destinations/${value.id}/desktop/`)
//       );
//       const imageResults = await Promise.all(imagePromises);
//       setImages(imageResults);
//     };
//     fetchImages();
//   }, [value]);

//   const handleShowMore = () => {
//     navigate("/spot/" + value.id);
//   };

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 10000,
//     arrows: false,
//   };

//   return (
//     <div className="w-full mx-auto relative bg-black rounded-lg overflow-hidden">
//       {images.length > 0 && (
//         <Slider {...sliderSettings} className="h-64">
//           {images.map((img, index) => (
//             <div key={index} className="h-full w-full">
//               <img
//                 src={img.src}
//                 alt={`Slide ${index}`}
//                 className="object-cover h-full w-full"
//               />
//             </div>
//           ))}
//         </Slider>
//       )}
//       <nav className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full shadow-lg">
//         <ul className="flex flex-col">
//           <li>
//             <button
//               className="bg-gray-200/60 transition-colors duration-150 hover:bg-gray-300/80 p-2 backdrop-blur-sm rounded-full shadow-lg"
//               onClick={handleShowMore}
//             >
//               <BiExpandAlt className="text-white text-2xl" />
//             </button>
//           </li>
//         </ul>
//       </nav>
//       <div className="bg-gradient-to-t from-black px-2 pb-1 pt-2 bottom-0 w-full absolute">
//         <h2 className="text-white text-lg font-bold">{value.name}</h2>
//         <p className="text-white font-inter pt-1 text-sm">
//           {value.description.length > 70
//             ? value.description.substring(0, 70) + "..."
//             : value.description}
//         </p>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { BiExpandAlt } from "react-icons/bi";
import { getimageURL } from "../firefunctions";

export default function LocationCard({ value }) {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      const imagePromises = value.imageUrls.map((image, index) =>
        getimageURL(index, `destinations/${value.id}/desktop/`)
      );
      const imageResults = await Promise.all(imagePromises);
      setImages(imageResults);
    };
    fetchImages();
  }, [value]);

  const handleShowMore = () => {
    navigate("/spot/" + value.id);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    arrows: false,
  };

  return (
    <div className="w-full mx-auto relative bg-black rounded-lg overflow-hidden">
      {images.length > 0 && (
        <Slider {...sliderSettings} className="h-64">
          {images.map((img, index) => (
            <div key={index} className="h-full w-full">
              <img
                src={img.src}
                alt={`Slide ${index}`}
                className="object-cover h-full w-full"
              />
            </div>
          ))}
        </Slider>
      )}
      <nav className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full shadow-lg">
        <ul className="flex flex-col">
          <li>
            <button
              className="bg-gray-200/60 transition-colors duration-150 hover:bg-gray-300/80 p-2 backdrop-blur-sm rounded-full shadow-lg"
              onClick={handleShowMore}
            >
              <BiExpandAlt className="text-white text-2xl" />
            </button>
          </li>
        </ul>
      </nav>
      <div className="bg-gradient-to-t from-black px-2 pb-1 pt-2 bottom-0 w-full absolute">
        <h2 className="text-white text-lg font-bold">{value.name}</h2>
        <p className="text-white font-inter pt-1 text-sm">
          {value.description.length > 70
            ? value.description.substring(0, 70) + "..."
            : value.description}
        </p>
      </div>
    </div>
  );
}

