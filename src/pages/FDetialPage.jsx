import Container from "../components/Container";
import ExpandableText from "../components/ExpandableText";
import HeaderImageCarousel from "../components/HeaderImageCarousel";
import sigiriya from "../assets/sigiriya.png";
import CommentSection from "../components/CommentSection";
import Chip from "../components/Chip";
import { FaMapMarkerAlt } from "react-icons/fa";
import RatingComponent from "../components/RatingSection";
import CommentSection2 from "../components/CommentSection2";
import MySlider from "../components/Slider";

const images = [{ src: sigiriya }, { src: sigiriya }, { src: sigiriya }];

const slides = [
  { id: 1, image: sigiriya, altText: "Image 1" },
  { id: 2, image: sigiriya, altText: "Image 2" },
  // Add more slide objects here
];

const commentsData = [
  {
    id: 1,
    user: "John Doe",
    date: "February 15, 2024",
    text: "Visiting Sigiriya was an extraordinary experience! The view from the top is breathtaking, and the history behind the site is fascinating. Make sure to bring water and wear comfortable shoes, as there are quite a few steps to climb. It's best to go early in the morning to avoid the heat and the crowds.",
    rating: 5,
    helpfulCount: 256,
    image: "path/to/sigiriya_image.jpg", // Replace with the path to your image
  },
  {
    id: 2,
    user: "Emma Wilson",
    date: "February 20, 2024",
    text: "Truly a marvel of ancient engineering and art. The frescoes and the Lion's Gate are highlights not to be missed. However, be prepared for the monkeys - they are everywhere and can be quite cheeky!",
    rating: 4,
    helpfulCount: 102,
    image: "path/to/sigiriya_image.jpg",
  },
];

const ratingPresentages = { 4: 25, 5: 80, 3: 3, 2: 1, 1: 1 };

const price = 2500; // Example price
const mapsUrl = "https://maps.google.com/?q=Sigiriya"; // Example Google Maps URL

export default function FDetialPage() {
  return (
    <Container className={"px-0"}>
      <div className="mb-10">
        <HeaderImageCarousel images={images} />
      </div>
      <div className="w-full h-96 rounded-t-[40px] rounded-b-none px-5 ">
        <h1 className="text-3xl  font-bold mb-3 text-gray-900 font-inter">
          Sigiriya
        </h1>
        <ExpandableText className=" text-base text-gray-800 text-justify font-inter">
          Sigiriya is an ancient rock fortress located in the northern Matale
          District near the town of Dambulla in the Central Province, Sri Lanka.
          It is a site of historical and archaeological significance that is
          dominated by a massive column of granite approximately 180 m (590 ft)
          high.
        </ExpandableText>
        <Chip
          label={"LKR 2500 per person"}
          className=" text-gray-50 bg-teal-500"
        />
        <Chip
          startIcon={<FaMapMarkerAlt />}
          label={"Map"}
          className=" text-gray-50 bg-blue-500"
        />
      </div>
      <div className="mb-10">
        <MySlider slides={slides} />
      </div>
      {/* <MySlider slides={slides}/> */}
      <div className="mb-10 ml-3 mr-3">
        <div>
          <RatingComponent
            totalRating={4.4}
            reviewsCount={"2.2"}
            ratings={ratingPresentages}
          />
        </div>
        <CommentSection2 commentsData={commentsData} />
      </div>
    </Container>
  );
}
