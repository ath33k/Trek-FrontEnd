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
    <>
      <FixedIcon />
      <NavBar />
      <div className="relative">
        <div className=" bg-gradient-to-b from-black absolute h-[100%] w-[100%] top-0 left-0 opacity-65 z-10 "></div>
        <HeaderImageCarousel images={imageList}></HeaderImageCarousel>
      </div>
      <Container className={" p-10 md:p-16 lg:p-20 my-10  "}>
        <h2 className=" text-2xl md:text-3xl text-center font-bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
          praesentium mollitia assumenda quos natus voluptate veniam molestias
          vel ipsam harum.
        </h2>
      </Container>
      <Container className={"mt-10 "}>
        <h2 className="my-2">Recommendation</h2>
        <MySlider slides={imageForSlider} />
      </Container>
    </>
  );
}
