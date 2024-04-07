/* eslint-disable react/prop-types */
import Slider from "react-slick";

import QuickResult from "../components/cards/QuickResult";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function ResultsPage() {
  const [resindex, setResIndex] = useState(0);
  const location = useLocation();
  const results = location.state?.results || null;

  return (
    <div className=" w-[500px] mx-auto relative">
      {results ? (
        <>
          <Slider
            dots={false}
            infinite
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={10000}
            afterChange={(index) => setResIndex(index)}
            className=" bg-black h-screen overflow-y-hidden"
            arrows={false}
            lazyLoad="ondemand"
            draggable
          >
            {results.map((result, idn) => {
              return <QuickResult key={idn} value={result} />;
            })}
            {/* <QuickResult
      value={{
        name: "Polonnaruwa Vatadageya",
        id: "8onQvGuAicMdvL77ikOi",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error natus dicta corrupti incidunt, totam laboriosam quibusdam sit, provident ullam fuga nobis ea necessitatibus ad molestiae atque! Veritatis voluptas soluta cumque!",
      }}
    />
    <QuickResult
      value={{
        name: "Galle",
        id: "HeRima8M7SPZaXowWuat",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error natus dicta corrupti incidunt, totam laboriosam quibusdam sit, provident ullam fuga nobis ea necessitatibus ad molestiae atque! Veritatis voluptas soluta cumque!",
      }}
    /> */}
          </Slider>
          <div className=" absolute top-2 right-2 sepia bg-gray-200/40 text-gray-700/50 font-semibold w-10 h-10 rounded-full shadow-lg">
            <span className="flex items-center justify-center h-full w-full">
              {resindex + 1}/{results.length}
            </span>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl font-semibold">No Results Found</p>
        </div>
      )}
    </div>
  );
}
