/* eslint-disable react/prop-types */
import Container from "../components/Container";
import ExpandableText from "../components/ExpandableText";
import HeaderImageCarousel from "../components/HeaderImageCarousel";
import Chip from "../components/Chip";
import { FaMapMarkerAlt } from "react-icons/fa";
import RatingComponent2 from "../components/RatingSection2";
import CommentSection3 from "../components/CommentSection3";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import ScrollSlider from "../components/ScrollSlider";
import LoadingScreen from "../components/Loading/LoadingScreen";
import ErrorScreen from "../components/Errors/ErrorScreen";
import { doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { getimageURL } from "../firefunctions";
import { useParams } from "react-router-dom";
import MapViewCard from "../components/MapViewCard";

//import RatingComponent from "../components/RatingSection2";

export default function FDetialPage() {
  const params = useParams();

  const [carouselImages, setCarouselImages] = useState(undefined);
  const [value, loading, error] = useDocumentDataOnce(
    doc(db, "destinations", params.id)
  );
  const [refreshRating, setRefreshRating] = useState(false);
  //const [commentsData, setCommentsData] = useState([]);
  //const [user] = useAuthState(auth);
  const onCommentSubmit = () => {
    // This will be passed down to CommentSection3 and called after a comment is submitted
    setRefreshRating((prev) => !prev); // Toggles the state to force refresh
  };
  useEffect(() => {
    if (value) {
      setCarouselImages(undefined);
      value.desktopImages.forEach((img, index) => {
        getimageURL(index, "/destinations/" + params.id + "/desktop/").then(
          (imginfo) => {
            setCarouselImages((prev) => {
              return [...(prev || []), imginfo];
            });
          }
        );
      });
    }
  }, [params.id, value]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <Container className={"px-0"}>
      <HeaderImageCarousel images={carouselImages} />

      <div className="w-full rounded-t-[40px] flex flex-col gap-4 rounded-b-none px-4 md:px-5 ">
        <h1 className="text-3xl font-bold mb-3 text-gray-900 font-inter">
          {value.name}
        </h1>
        <ExpandableText className=" text-base text-gray-800 text-justify font-inter">
          {value.description}
        </ExpandableText>
        {/* <div className="gap-1 flex">
          <Chip
            startIcon={<FaMapMarkerAlt />}
            label={"Map"}
            className=" text-gray-50 bg-emerald-600"
          />
          <Chip label={"14km"} className=" text-gray-50 bg-violet-600" />
        </div> */}
        {/* <div className="mb-10">
          <ScrollSlider
            title="Community Gallery"
            hClass="h-60"
            // images={images}
          />
        </div> */}
        <MapViewCard
          destination={{
            lat: parseFloat(value.latitude),
            lng: parseFloat(value.longitude),
          }}
        />
        <div className="mb-10 ml-3 mr-3">
          <div>
            {/* <RatingComponent
              totalRating={value.totalRating}
              reviewsCount={value.reviewsCount}
              ratings={value.ratings}
              pageID={params.id}
            /> */}
            <RatingComponent2
              pageID={params.id}
              refreshRating={refreshRating}
            />
          </div>
          <CommentSection3
            pageID={params.id}
            onCommentSubmit={onCommentSubmit}
          />
        </div>
      </div>
    </Container>
  );
}
