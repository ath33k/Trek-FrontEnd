/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion } from "framer-motion";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import noimage from "../assets/imageback.jpg";

const HeaderImageCarousel = ({
  images = [{ src: noimage }, { src: noimage }],
  className,
  hideTab = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const fshandle = useFullScreenHandle();

  return (
    <FullScreen handle={fshandle}>
      <div
        className={"relative w-full" + className}
        onDoubleClick={(e) => {
          e.preventDefault();
          if (fshandle.active) {
            fshandle.exit();
          } else {
            fshandle.enter();
          }
        }}
      >
        <div className="overflow-hidden">
          <div
            className="whitespace-nowrap transition-transform pointer-events-none duration-700"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <motion.img
                key={index}
                src={image.src}
                alt={`Slide ${index}`}
                className={`inline-block pointer-events-none w-full 
                  ${
                    !fshandle.active
                      ? "object-cover aspect-[4/3] md:aspect-video"
                      : " object-contain h-full w-full"
                  }`}
                animate={{
                  opacity: [0, 1],
                  backgroundColor: ["black", "transparent"],
                }}
              />
            ))}
          </div>
        </div>
        <div
          className={`absolute bottom-0 left-0 right-0  flex justify-center pt-4 pb-8 rounded-t-[40px] ${
            !hideTab && "bg-white"
          }`}
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
    </FullScreen>
  );
};

export default HeaderImageCarousel;
