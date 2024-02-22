import React from "react";
import { NavBar } from "../components/NavBar";
import HeaderImageCarousel from "../components/HeaderImageCarousel";

import MtLavniaBeach from "../assets/beach-view.jpg";

import AnuradhapuraTemple from "../assets/chathura-anuradha-subasinghe-isdvqf04MDk-unsplash.jpg";
import JungleBeach from "../assets/Jungle-Beach-Bay-Drone-Shot-1536x1152.jpg";

import NineArch from "../assets/yves-alarie-3R50kTNBKiE-unsplash.jpg";

import Sunset from "../assets/sunsetAtElla.jpeg";

import Container from "../components/Container";

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
  return (
    <>
      <NavBar />
      <HeaderImageCarousel images={imageList}></HeaderImageCarousel>
      <Container></Container>
    </>
  );
}
