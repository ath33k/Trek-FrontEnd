import { NavBar } from "../components/NavBar";
import HeaderImageCarousel from "../components/HeaderImageCarousel";
import Container from "../components/Container";
import Chip from "../components/Chip";
import BotButton from "../components/BotButton";
import { MdAutoAwesome } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { ImConfused } from "react-icons/im";
import { Link as LinkScroll } from "react-scroll";
import CategoryList from "../components/CategoryList";
import { useState } from "react";
import wallpaper1 from "../assets/HeroImages/homepagewallpaper1.webp";
import wallpaper2 from "../assets/HeroImages/homepagewallpaper2.webp";
import wallpaper3 from "../assets/HeroImages/homepagewallpaper3.webp";
import wallpaper4 from "../assets/HeroImages/homepagewallpaper4.webp";
import wallpaper5 from "../assets/HeroImages/homepagewallpaper5.webp";
import { NavLink } from "react-router-dom";
import { navlinks } from "../navlinks";

const imageList = [
  {
    src: wallpaper1,
  },
  {
    src: wallpaper2,
  },
  {
    src: wallpaper3,
  },
  {
    src: wallpaper4,
  },
  {
    src: wallpaper5,
  },
];

export default function HomePage() {
  // Add Category List

  return (
    <div className="my-14 mx-4 sm:mx-8 md:mx-14 md:my-16 lg:mx-28">
      <BotButton />
      <NavBar />
      <div className="relative ">
        <div className=" bg-gradient-to-b from-black absolute h-[100%] w-[100%] top-0 left-0 opacity-80 z-10 "></div>
        <HeaderImageCarousel
          images={imageList}
          hideTab={true}
          className={"z-50"}
        ></HeaderImageCarousel>
        <div className="absolute top-[50%] left-[50%] text-white z-[10] translate-y-[-50%]  translate-x-[-50%] text-center">
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
            <NavLink to={navlinks.prompt.path}>
              <Chip
                endIcon={<MdAutoAwesome />}
                label={"Ai Assistance "}
                className="self-end"
              />
            </NavLink>
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
            <NavLink to={navlinks.results.path}>
              <Chip
                label={"Search"}
                className="self-end"
                endIcon={<FaSearch />}
              />
            </NavLink>
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
      <CategoryList />
    </div>
  );
}
