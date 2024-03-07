import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import Chip from "../components/Chip.jsx";
import { FaSearch } from "react-icons/fa";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(null);

  // when resizing for larger screen with menu state open and after come back to the smaller screen the menu still displays open.
  // used this to fix that issue
  useEffect(() => {
    const handleResize = () => {
      let width = window.innerWidth;
      if (width >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScrollStart = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // const handleScrollEnd = () => {
    //   setIsScrolled(false);
    // };

    window.addEventListener("scroll", handleScrollStart);
    // window.addEventListener("scrollend", handleScrollEnd);
    return () => {
      window.removeEventListener("scroll", handleScrollStart);
      // window.removeEventListener("scrollend", handleScrollEnd);
    };
  }, []);
  console.log(isScrolled);

  function handleHamburgerMenu() {
    setIsOpen((curr) => !curr);
  }

  // dummies to check if it is working
  const navBarLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About us",
      path: "/",
    },
    {
      name: "Favorites",
      path: "/",
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 justify-between w-full z-50 text-black  bg-white ${
        isScrolled ? "border-gray-200 border-b-2" : ""
      }`}
    >
      <div className="flex items-center p-2 mx-4 sm:mx-8 md:mx-14 lg:mx-32">
        <div className="flex items-center justify-between  w-auto md:w-[100%]">
          <GiHamburgerMenu
            onClick={handleHamburgerMenu}
            className="text-2xl sm:text-3xl cursor-pointer md:hidden lg:hidden  mr-5"
          />

          <Logo className={"md:ml-10"} />

          <ul className="hidden md:flex lg:flex text-[16px] lg:text-[18px] font-medium">
            {navBarLinks.map((link, index) => (
              <NavLink
                to={link.path}
                className="m-2 hover:text-blue-500 hover:drop-shadow-md duration-300"
                key={index}
              >
                {link.name}
              </NavLink>
            ))}
          </ul>
          <Chip
            label={"Search"}
            endIcon={<FaSearch />}
            className=" hidden md:flex lg:flex bg-transparent border-solid border-black  border border-1  hover:bg-black hover:text-blue-300  md:mr-10 "
          />
        </div>

        {isOpen && (
          <HamburgerLinks
            navBarLinks={navBarLinks}
            onHandleMenu={handleHamburgerMenu}
          />
        )}
      </div>
    </nav>
  );
};

// Opened state of the hamburger menu... This component only used inside this navbar so there's no need of creating a seperate file
function HamburgerLinks({ navBarLinks, onHandleMenu }) {
  return (
    <div className="fixed h-full w-screen md:hidden lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0 z-[500]">
      <div
        className={
          "text-white bg-black/50 fixed p-2  z-50  h-[400px] ease-in-out left-0 top-0 duration-1000 w-full"
        }
        style={{ clipPath: "circle(65% at 50% 0)" }}
      >
        <IoCloseOutline
          onClick={onHandleMenu}
          style={{ transform: "rotate(90deg)" }}
          className="mt-2 mx-5 text-3xl sm:text-5xl cursor-pointer hover:text-blue-500"
        />
        <ul className="flex flex-col items-center text-2xl sm:text-3xl">
          {navBarLinks.map((link, index) => (
            <NavLink
              to={link.path}
              className="m-3 sm:m-5 cursor-pointer font-bold inline-block hover:text-blue-400 duration-300"
              key={index}
            >
              {link.name}
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
}
