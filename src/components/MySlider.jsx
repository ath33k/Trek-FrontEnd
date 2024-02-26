import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Define custom Next Arrow
const NextArrow = ({ onClick }) => (
  <div className="slick-arrow slick-next" onClick={onClick}>
    <button className="text-2xl rounded-full bg-white shadow-lg text-black p-1 ">
      {">"}
    </button>
  </div>
);

// Define custom Prev Arrow
const PrevArrow = ({ onClick }) => (
  <div className="slick-arrow slick-prev" onClick={onClick}>
    <button className="text-2xl rounded-full bg-white shadow-lg text-black p-1">
      {"<"}
    </button>
  </div>
);

const MySlider = ({ slides }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  // Container style
  const sliderContainerStyle = {
    maxWidth: "1080px", // Adjust this to set the maximum width of the slider
    margin: "0 auto", // This centers the slider horizontally
  };

  // Image style
  const imageStyle = {
    width: "auto", // Maintain the aspect ratio
    height: "300px", // Fixed height for all slides
    objectFit: "cover", // Cover the container with the image without stretching it
  };

  return (
    <div style={sliderContainerStyle}>
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <img
              src={slide.image}
              alt={slide.altText}
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MySlider;
