import Container from "../components/Container";
import ExpandableText from "../components/ExpandableText";
import Carousel from "../components/HeaderImageCarousel";


const images = [
  { src:  '../assets/sigiriya.png'},
  { src: '../assets/sigiriya.png' },
  { src: '../assets/sigiriya.png'},
  
];

export default function FDetialPage() {
  return (
    <Container className={"px-0"}>
      <div><Carousel images={images} /></div>
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
      </div>
    </Container>
    
  );
}
