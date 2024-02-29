/* eslint-disable react/prop-types */

import { FullScreen, useFullScreenHandle } from "react-full-screen";

export default function ScrollSlider({
  images,
  title = "Carousel",
  hclass = "h-72",
  emptymessage = "No images available",
}) {
  const fshandle = useFullScreenHandle();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3 text-gray-900 font-inter">
        {title}
      </h2>
      <div className={` flex gap-2 items-center overflow-scroll  ${hclass}`}>
        {images ? (
          images.map((image, index) => {
            return (
              <FullScreen
                className={` inline-flex ${hclass} bg-black aspect-[4/3] rounded-lg justify-center`}
                handle={fshandle}
                key={index}
              >
                <img
                  onDoubleClick={() => {
                    if (fshandle.active) {
                      fshandle.exit();
                    } else {
                      fshandle.enter();
                    }
                  }}
                  src={image.src}
                  alt="carousel"
                  className=" h-full object-contain  "
                />
              </FullScreen>
            );
          })
        ) : (
          <p className="text-center text-2xl font-semibold text-gray-500">
            {emptymessage}
          </p>
        )}
      </div>
    </div>
  );
}
