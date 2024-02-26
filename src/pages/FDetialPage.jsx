import Container from "../components/Container";
import ExpandableText from "../components/ExpandableText";
import HeaderImageCarousel from "../components/HeaderImageCarousel";
import sigiriya from "../assets/sigiriya.png";
import CommentSection from "../components/CommentSection";
import Chip from "../components/Chip";
import { FaMapMarkerAlt } from "react-icons/fa";

const images = [{ src: sigiriya }, { src: sigiriya }, { src: sigiriya }];

const price = 2500; // Example price
const mapsUrl = "https://maps.google.com/?q=Sigiriya"; // Example Google Maps URL

export default function FDetialPage() {
  return (
    <Container className={"px-0"}>
      <HeaderImageCarousel images={images} />
      <div className="w-full h-96 rounded-t-[40px] rounded-b-none px-5 ">
        <h1 className="text-3xl font-bold mb-3 text-gray-900 font-inter">
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
      <CommentSection />
    </Container>
  );
}
