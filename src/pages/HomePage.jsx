import React from "react";
import { NavBar } from "../components/NavBar";
import HeaderImageCarousel from "../components/HeaderImageCarousel";

import MtLavniaBeach from "../assets/beach-view.jpg";

import AnuradhapuraTemple from "../assets/chathura-anuradha-subasinghe-isdvqf04MDk-unsplash.jpg";
import JungleBeach from "../assets/Jungle-Beach-Bay-Drone-Shot-1536x1152.jpg";

import NineArch from "../assets/yves-alarie-3R50kTNBKiE-unsplash.jpg";

import Sunset from "../assets/sunsetAtElla.jpeg";

import Container from "../components/Container";
import MySlider from "../components/MySlider";
import Chip from "../components/Chip";
import FixedIcon from "../components/FixedIcon";
import { MdAutoAwesome } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { ImConfused } from "react-icons/im";
import { Link as LinkScroll } from "react-scroll";

export default function HomePage() {
  const imageList = [
    {
      src: Sunset,
    },
    { src: MtLavniaBeach },
    {
      src: AnuradhapuraTemple,
    },
    {
      src: JungleBeach,
    },
    {
      src: NineArch,
    },
  ];

  const imageForSlider = [
    {
      id: 1,
      image: Sunset,
      alt: "Sunset",
    },
    {
      id: 2,
      image: MtLavniaBeach,
      alt: "mount lavinia Beach",
    },
    {
      id: 3,
      image: AnuradhapuraTemple,
      alt: "Anuradhapura temple",
    },
    {
      id: 4,
      image: JungleBeach,
      alt: "Jungle beach unawatuna",
    },
    {
      id: 5,
      image: NineArch,
      alt: "Nine arch bridge",
    },
  ];

  return (
    <div className="my-14 mx-4 sm:mx-8 md:mx-14 md:my-16 lg:mx-28">
      <FixedIcon />
      <NavBar />
      <div className="relative ">
        <div className=" bg-gradient-to-b from-black absolute h-[100%] w-[100%] top-0 left-0 opacity-80 z-10 "></div>
        <HeaderImageCarousel
          images={imageList}
          hideBottomTab={true}
          smImgHeight={"h-[420px]"}
          mdImgHeight={"md:h-[480px]"}
          lgImgHeight={"lg:h-[540px]"}
          xlImgHeight={"xl:h-[620px]"}
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
            className="inline-block m-2 p-1 px-2 md:p-2 md:px-4 border-2 hover:bg-black hover:border-transparent cursor-pointer"
          >
            Get Started
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
      <Container className={" p-16 my-28 md:p-24 lg:p-28 "}>
        <h2 className=" text-2xl md:text-2xl xl:text-3xl text-center font-bold">
          {/* UNLEASH YOUR WANDERLUST. WE'LL FIND YOUR PERFECT SPOT */}
          &rdquo;THE GREATEST JOURNEY BEGINS WITH A SINGLE STEP&ldquo;
        </h2>
        <p className="mt-2 text-xl text-center italic">~ Lao Tzu</p>
      </Container>
      <Container className={"mt-10 "}>
        <h2 className="text-lg my-2 mx-1 xl:mx-2 2xl:mx-4">Recommendations</h2>
        <MySlider slides={imageForSlider} />
      </Container>
    </div>
  );
}
