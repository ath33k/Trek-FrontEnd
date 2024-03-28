/* eslint-disable react/prop-types */

import Container from "../components/Container.jsx";
import { NavBar } from "../components/NavBar.jsx";
import atheekImg from "../assets/teamImages/atheekImg.jpeg";
import saarahImg from "../assets/teamImages/saarahImg.jpg";
import duvinImg from "../assets/teamImages/duvinImg.jpg";
import bhanukaImg from "../assets/teamImages/bhanukaImg.jpg";
import lakshanImg from "../assets/teamImages/lakshanImg.jpg";

export default function AboutUs() {
  const imageArr = [
    { id: 1, name: "Bhanuka Dassanayake", src: bhanukaImg },
    { id: 2, name: "Duvin Kularatne", src: duvinImg },
    { id: 3, name: "Atheek Naheem", src: atheekImg },
    { id: 4, name: "Lakshan Liyanage", src: lakshanImg },
    { id: 5, name: "Saarah Insar", src: saarahImg },
  ];

  return (
    <div>
      <NavBar />
      <div className="flex flex-col justify-between gap-4 lg:gap-8">
        <Container>
          <div className="flex justify-center items-center border-b-2   lg:border-b-4 h-[45vh]  lg:h-[60vh] ">
            <div className="flex flex-col items-center p-8  md:w-[90%] lg:w-full gap-4 lg:gap-6 ">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
                About Us
              </h1>
              <p className="text-justify text-xs md:text-base lg:text-lg">
                Unlock the doors to new discoveries and limitless possibilities
                with Trek AI. This innovative platform uses AI to provide
                personalized recommendations based on your preferences. Whether
                you are an adventurer, an explorer, or simply looking to expand
                your horizons, Trek AI empowers you to discover new experiences
                uniquely tailored to your interests. Start your journey today
                and let Trek AI unlock a world of opportunities you never knew
                existed.
              </p>
            </div>
          </div>
        </Container>
        <Container>
          <div className="flex justify-center">
            <div className="flex flex-col items-center p-8 w-[80%] md:w-[90%] lg:w-full gap-4 lg:gap-6 ">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
                Our Team
              </h1>
              <p className="text-justify text-xs md:text-base lg:text-lg">
                During our second year at IIT, we undertook a project to develop
                an application. The application was designed to address a
                specific need. Through our project, we aimed to create a
                solution that would be useful and practical for users.
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <div className="flex justify-center gap-4 flex-wrap w-[85%]  md:w-[80%] lg:w-[70%] xl:w-full pb-24 ">
              {imageArr.map((img) => (
                <ImageCards name={img.name} image={img.src} key={img.id} />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

function ImageCards({ name, image }) {
  return (
    <div className="group relative overflow-hidden rounded-xl shadow-[0_0px_10px_0px_rgba(0,0,0,0.3)] hover:scale-105 duration-500 transition-all">
      <div className="group-hover:bg-black group-hover:bg-opacity-50  absolute bg-opacity-0 left-0 top-0 right-0  bottom-0 flex justify-center duration-500 transition-all">
        <div className="opacity-0 group-hover:opacity-100 flex justify-center items-center h-full w-[50%] duration-500 ">
          <h2 className="text-white text-center text-xl">{name}</h2>
        </div>
      </div>
      <img
        src={image}
        alt=""
        className="w-[150px] h-[200px] lg:w-[180px] lg:h-[225px] object-cover object-center"
      />
    </div>
  );
}
