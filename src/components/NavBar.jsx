import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { Logo } from "./Logo";

export const NavBar = () => {
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

  const [isOpen, setIsOpen] = useState(false);

  function handleHamburgerMenu() {
    setIsOpen((curr) => !curr);
  }

  return (
    <nav className="flex justify-between items-center bg-black/10 ">
      <div className="flex items-center mx-5 p-3 md:w-[100%] lg:w-[100%]">
        <div className="flex items-center justify-between w-[100%]">
          <GiHamburgerMenu
            onClick={handleHamburgerMenu}
            className="text-2xl sm:text-3xl cursor-pointer md:hidden lg:hidden  mr-5"
          />

          <Logo />

          <ul className="hidden md:flex lg:flex md:text-1xl lg:text-2xl">
            {navBarLinks.map((link) => (
              <NavLink
                to={link.path}
                className="m-2 hover:text-blue-500 hover:drop-shadow-md duration-300"
              >
                {link.name}
              </NavLink>
            ))}
          </ul>
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
    <div className="fixed h-full w-screen md:hidden lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0">
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
        <ul className="flex flex-col items-center text-2xl sm:text-4xl md:text-4xl">
          {navBarLinks.map((link) => (
            <NavLink
              to={link.path}
              className="m-3 sm:m-5 cursor-pointer font-bold inline-block hover:text-blue-400 duration-300"
            >
              {link.name}
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
}
