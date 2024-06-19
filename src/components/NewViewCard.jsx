/* eslint-disable react/prop-types */
// QuickViewCarviewdL.js
import Container from "./Container";
import ExpandableText from "./ExpandableText";
import Rating from "./Rating";

// import './QuickViewCardL.css'; // Importing CSS for styling
// eslint-disable-next-line react/prop-types
export default function Newviewcard({
  title,
  backgroundImage,
  width,
  height,
  description,
  rating,
  district,
  province,
  
}) {
  const cardStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover", // Adjust as needed
    backgroundPosition: "center", // Adjust as needed
    width: width,
    height: height,
  };

  return (
    <Container>
      <div>
        <div className="font-sans text-white" style={cardStyle}>
          <p className="p-[10px] text-[18px] bg-gradient-to-r from-black to-transparent">
            Here is the result what search
          </p>
          <div className=" absolute top-[620px] left-[40px] text-center w-[350px] rounded-[20px] translate-x-0 bg-[#ffffff0a] shadow-[35px_35px_35px_35px_rgba(0,0,0,0.3)]">
            <h3 className=" text-[50px] pb-[20px] font-bold">{title}</h3>
            <div className="flex h-[50px]">
              <span className="mr-[10px] text-[22px]">{rating}</span>
              <Rating />
            </div>
            <h3 className=" text-[50px] pb-[20px] font-bold">{district}</h3>
            <h3 className=" text-[50px] pb-[20px] font-bold">{province}</h3>
            <ExpandableText className="mt-[5px]">{description}</ExpandableText>
          </div>
        </div>
      </div>
    </Container>
  );
}
