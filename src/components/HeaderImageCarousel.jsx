import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const HeaderImageCarousel = ({
  images,
  className,
  smImgHeight,
  mdImgHeight,
  lgImgHeight,
  xlImgHeight,
  hideBottomTab = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 3000); // Change the image every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [images.length, activeIndex]);

  return (
    <div className={"relative w-full " + className}>
      <div className="overflow-hidden ">
        <div
          className="whitespace-nowrap transition-transform duration-700 "
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <motion.img
              key={index}
              src={image.src}
              alt={`Slide ${index}`}
              className={`inline-block w-full object-cover ${smImgHeight} ${mdImgHeight} ${lgImgHeight} ${xlImgHeight}`}
              animate={{
                opacity: [0, 1],
                backgroundColor: ["black", "transparent"],
              }}
            />
          ))}
        </div>
      </div>
      <div
        className={
          hideBottomTab
            ? "absolute bottom-0 left-0 right-0 flex justify-center pt-4 pb-4 z-20"
            : "absolute bottom-0 left-0 right-0 flex justify-center pt-4 pb-8 bg-white rounded-t-[40px]"
        }
      >
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 mx-1 rounded-full shadow-sm shadow-gray-400 ${
              index === activeIndex ? "bg-gray-200" : "bg-gray-400"
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderImageCarousel;
