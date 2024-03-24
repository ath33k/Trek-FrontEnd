import { NavBar } from "../components/NavBar";
import HeaderImageCarousel from "../components/HeaderImageCarousel";

import Container from "../components/Container";
import Chip from "../components/Chip";
import BotButton from "../components/FixedIcon";
import { MdAutoAwesome } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { ImConfused } from "react-icons/im";
import { Link as LinkScroll } from "react-scroll";
import CategoryList from "../components/CategoryList";
import { useState } from "react";

const imageList = [
  {
    src: "https://s3.ap-southeast-1.amazonaws.com/localiiz-prod/uploads/_1000x1000_fit_center-center_80_none/Best-hilly-getaways-in-Sri-Lanka-Ella-Rock-Sri-Lanka-Facebook.jpg?mtime=20200911184348&focal=none&tmtime=20210606140507",
  },
  {
    src: "https://th.bing.com/th/id/R.8b3955009d6d441a7d4c0746ff47eff1?rik=iYio9tResrwULA&riu=http%3a%2f%2fwww.beach-on-map.com%2fimg%2f7%2fsri-lanka-mount-lavinia-beach-hotel-aerial-orig.jpg&ehk=uhDs4KKNKmFXY01Yaf9m%2fCVIzFPKR22FrYbL3bgniMs%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    src: "https://th.bing.com/th/id/R.c6235b4c7b695d1e828e8723f7ebdcaf?rik=HPtP%2bCyFi4wsDw&riu=http%3a%2f%2fsrilankaecotourism.lk%2flocation_img%2f1489661273meemure_1.jpg&ehk=hXpq6M1Jaie5TMWE4R7M9g9RUZ%2bldLPkiFiS5zHCUto%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    src: "https://th.bing.com/th/id/R.310ce2cd59ab7bd7bbe4fc8f6236a0d5?rik=I4482ueeTIZI1A&pid=ImgRaw&r=0",
    alt: "Jungle beach unawatuna",
  },
  {
    src: "https://th.bing.com/th/id/OIP.w4CmKSR9SKjldERInZpkcwHaE8?rs=1&pid=ImgDetMain",
  },
];

const imageForSlider = [
  {
    id: 1,
    image:
      "https://s3.ap-southeast-1.amazonaws.com/localiiz-prod/uploads/_1000x1000_fit_center-center_80_none/Best-hilly-getaways-in-Sri-Lanka-Ella-Rock-Sri-Lanka-Facebook.jpg?mtime=20200911184348&focal=none&tmtime=20210606140507",
    alt: "Sunset",
    tags: ["Family"],
  },
  {
    id: 2,
    image:
      "https://th.bing.com/th/id/R.8b3955009d6d441a7d4c0746ff47eff1?rik=iYio9tResrwULA&riu=http%3a%2f%2fwww.beach-on-map.com%2fimg%2f7%2fsri-lanka-mount-lavinia-beach-hotel-aerial-orig.jpg&ehk=uhDs4KKNKmFXY01Yaf9m%2fCVIzFPKR22FrYbL3bgniMs%3d&risl=&pid=ImgRaw&r=0",
    alt: "mount lavinia Beach",
    tags: ["Adventure", "Recommendation"],
  },
  {
    id: 3,
    image:
      "https://arenatours.com/wp-content/uploads/2018/07/rafting-sri-lanka-3.jpg",
    alt: "Rafting",
    tags: ["Adventure"],
  },

  {
    id: 4,
    image:
      "https://th.bing.com/th/id/R.310ce2cd59ab7bd7bbe4fc8f6236a0d5?rik=I4482ueeTIZI1A&pid=ImgRaw&r=0",
    alt: "Jungle beach unawatuna",
    tags: ["Adventure", "Recommendation"],
  },
  {
    id: 5,
    image:
      "https://th.bing.com/th/id/OIP.w4CmKSR9SKjldERInZpkcwHaE8?rs=1&pid=ImgDetMain",
    alt: "Nine arch bridge",
    tags: ["Family", "Adventure", "Recommendation"],
  },

  {
    id: 6,
    image:
      "https://th.bing.com/th/id/R.c6235b4c7b695d1e828e8723f7ebdcaf?rik=HPtP%2bCyFi4wsDw&riu=http%3a%2f%2fsrilankaecotourism.lk%2flocation_img%2f1489661273meemure_1.jpg&ehk=hXpq6M1Jaie5TMWE4R7M9g9RUZ%2bldLPkiFiS5zHCUto%3d&risl=&pid=ImgRaw&r=0",
    alt: "Meemure",
    tags: ["Family", "Adventure", "Recommendation"],
  },
  {
    id: 7,
    image:
      "https://th.bing.com/th/id/R.12f3006566205e9eda791a147c0dfd71?rik=1RWIcPep7vsR%2bw&riu=http%3a%2f%2flankavisit.com%2fwp-content%2fuploads%2f2019%2f07%2fAnuradhapura_logo-1.jpg&ehk=Mnhjhn2Q69t22cvkLY%2bZdRTxp62rEo%2fOqU7K6Upo55Q%3d&risl=&pid=ImgRaw&r=0",
    alt: "Anuradhapura temple",
    tags: ["Family", "Recommendation"],
  },
];

export default function HomePage() {
  // Add Category List
  const categoryNames = ["Recommendation", "Family", "Adventure"];
  const [selectedCategory, setSelectedCategory] = useState("Recommendation");

  const categorySliders = imageForSlider
    .map((img) => img)
    .filter((img) => img.tags.includes(selectedCategory));

  function handleCategorySelection(e) {
    setSelectedCategory(() => e.target.id);
  }

  return (
    <div className="my-14 mx-4 sm:mx-8 md:mx-14 md:my-16 lg:mx-28">
      <BotButton />
      <NavBar />
      <div className="relative ">
        <div className=" bg-gradient-to-b from-black absolute h-[100%] w-[100%] top-0 left-0 opacity-80 z-10 "></div>
        <HeaderImageCarousel
          images={imageList}
          hideTab={true}
        ></HeaderImageCarousel>
        <div className="absolute top-[50%] left-[50%] text-white z-[100] translate-y-[-50%]  translate-x-[-50%] text-center">
          <h1 className="font-semibold  text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
            UNLEASH YOUR WANDERLUST. WE&apos;LL FIND YOUR PERFECT SPOT
          </h1>
          <LinkScroll
            // href="#whereTo"
            to="whereTo"
            smooth={true}
            // spy={true}
            className="inline-block m-2 p-1 px-2 md:p-2 md:px-4 border-2 hover:bg-black hover:bg-opacity-70 hover:border-transparent cursor-pointer hover:rounded-xl transition-all duration-400 "
          >
            Get Started <span>&#10507;</span>
          </LinkScroll>
        </div>
      </div>

      <h1
        id="whereTo"
        className=" text-5xl font-bold mt-12 pt-28 mb-14 text-center"
      >
        Where To ?
      </h1>
      <Container
        className={
          "flex flex-col items-center md:flex-row md:justify-center gap-4"
        }
      >
        <Container
          className={"bg-cyan-300 w-full p-6 rounded-2xl self-stretch"}
        >
          <div className="flex flex-col items-center gap-2">
            <span>
              <ImConfused className=" text-3xl" />
            </span>
            <h2 className="text-xl font-semibold mb-2">Not sure where ?</h2>
            <p className="mb-2 font-inter">
              Feeling lost or unsure of your next destination? Do not hesitate
              to ask! Our AI is here to assist you.feel free to describe your
              situation and let our AI offer its insights and explore potential
              solutions with you. AI will help you to find your optimal
              destination.
            </p>

            <Chip
              endIcon={<MdAutoAwesome />}
              label={"Ai Assistance "}
              className="self-end"
            />
          </div>
        </Container>
        <Container
          className={"bg-green-300 w-full p-6 rounded-2xl self-stretch"}
        >
          <div className="flex flex-col items-center gap-2">
            <span>
              <MdOutlineExplore className=" text-4xl" />
            </span>
            <h2 className="text-xl font-semibold mb-2">Explore Destinations</h2>
            <p className="mb-2 font-inter">
              Dive into exploration and search your next destination right here.
              Whether you are seeking sun-drenched beaches, bustling cityscapes,
              or hidden natural wonders, our platform is your gateway to
              countless adventures waiting to be discovered.
            </p>
            <Chip
              label={"Search"}
              className="self-end"
              endIcon={<FaSearch />}
            />
          </div>
        </Container>
      </Container>
      <Container className={" p-16 my-16 md:p-24 lg:p-28 "}>
        <h2 className=" text-2xl md:text-2xl xl:text-3xl text-center font-bold">
          &rdquo;THE GREATEST JOURNEY BEGINS WITH A SINGLE STEP&ldquo;
        </h2>
        <p className="mt-2 text-xl text-center italic">~ Lao Tzu</p>
      </Container>

      {/* Sliders */}
      <CategoryList
        categoryNames={categoryNames}
        selectedCategory={selectedCategory}
        categorySliders={categorySliders}
        handleCategorySelection={handleCategorySelection}
      />
    </div>
  );
}
