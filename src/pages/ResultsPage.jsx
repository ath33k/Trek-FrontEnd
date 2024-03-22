import Slider from "react-slick";

import QuickResult from "../components/cards/QuickResult";

export default function ResultsPage() {
  return (
    <Slider
      dots={false}
      infinite
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
      vertical={true}
      verticalSwiping={true}
      autoplay={true}
      autoplaySpeed={3000}
      className="h-screen w-screen bg-gray-100 text-gray-900"
    >
      <QuickResult
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
      />
    </Slider>
  );
}
