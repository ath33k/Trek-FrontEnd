import Container from "../components/Container";
import ExpandableText from "../components/ExpandableText";
import HeaderImageCarousel from "../components/HeaderImageCarousel";

import Chip from "../components/Chip";
import { FaMapMarkerAlt } from "react-icons/fa";
import RatingComponent from "../components/RatingSection";
import CommentSection2 from "../components/CommentSection2";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";

import ScrollSlider from "../components/ScrollSlider";
import LoadingScreen from "../components/Loading/LoadingScreen";
import ErrorScreen from "../components/Errors/ErrorScreen";
import { doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { getimageURL } from "../firefunctions";

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
  {
    id: 2,
    user: "Bhanu Wilson",
    date: "February 20, 2024",
    text: "Truly a marvel of ancient engineering and art. The frescoes and the Lion's Gate are highlights not to be missed. However, be prepared for the monkeys - they are everywhere and can be quite cheeky!",
    rating: 4,
    helpfulCount: 102,
    image: "path/to/sigiriya_image.jpg",
  },
];

const ratingPresentages = { 4: 25, 5: 80, 3: 3, 2: 1, 1: 1 };

export default function FDetialPage() {
  const destinationID = "8onQvGuAicMdvL77ikOi"; // Replace with your destination ID from prop
  const [carouselImages, setCarouselImages] = useState(undefined);
  const [value, loading, error] = useDocumentDataOnce(
    doc(db, "destinations", destinationID)
  );

  useEffect(() => {
    if (value) {
      setCarouselImages(undefined);
      value.desktopImages.forEach((img, index) => {
        getimageURL(index, "/destinations/" + destinationID + "/desktop/").then(
          (imginfo) => {
            setCarouselImages((prev) => {
              return [...(prev || []), imginfo];
            });
          }
        );
      });
    }
  }, [value]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <Container className={"px-0"}>
      <HeaderImageCarousel images={carouselImages} />

      <div className="w-full rounded-t-[40px] flex flex-col gap-2 rounded-b-none px-4 md:px-5 ">
        <h1 className="text-3xl font-bold mb-3 text-gray-900 font-inter">
          {value.name}
        </h1>
        <ExpandableText className=" text-base text-gray-800 text-justify font-inter">
          {value.description}
        </ExpandableText>
        <div className="gap-1 flex">
          <Chip
            startIcon={<FaMapMarkerAlt />}
            label={"Map"}
            className=" text-gray-50 bg-emerald-600"
          />
          <Chip label={"14km"} className=" text-gray-50 bg-violet-600" />
        </div>
        <div className="mb-10">
          <ScrollSlider
            title="Community Gallery"
            hClass="h-60"
            // images={images}
          />
        </div>
        <div className="mb-10 ml-3 mr-3">
          <div>
            <RatingComponent
              totalRating={3}
              reviewsCount={100}
              ratings={ratingPresentages}
            />
          </div>
          <CommentSection2 commentsData={commentsData} />
        </div>
      </div>
    </Container>
  );
}
