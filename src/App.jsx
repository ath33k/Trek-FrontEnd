import React from "react";
import { NavBar } from "./components/NavBar";
import Container from "./components/Container";
import HomePage from "./pages/HomePage";
import { Routes, Route, useNavigate } from "react-router-dom";
import FDetialPage from "./pages/FDetialPage";
import MapViewPage from "./pages/MapViewPage";
import { MdAutoAwesome } from "react-icons/md";
import FAB from "./components/FAB";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function App() {
  const navigator = useNavigate();
  return (
    <>
      {window.location.pathname !== "/" && (
        <FAB
          onClick={() => {
            if (window.location.pathname === "/") {
              return;
            }
            navigator(-1);
          }}
          className={
            "fixed top-5 duration-500 backdrop-invert bg-white/30 text-gray-800 hover:text-gray-300 hover:bg-gray-800/30 shadow-md left-2 md:left-5 z-[100] rounded-full p-3"
          }
        >
          <IoMdArrowRoundBack />
        </FAB>
      )}
      <Routes>
        <Route path="/" element={<FDetialPage />} />
        <Route path="/map" element={<MapViewPage />} />
        <Route path="/hometest" element={<HomePage />} />
      </Routes>
      <FAB
        className={
          "fixed bottom-5 transition-colors duration-500 text-cyan-200 hover:bg-cyan-800 right-5 z-[100] bg-cyan-700 rounded-full p-3"
        }
      >
        <MdAutoAwesome
          style={{
            fontSize: "28px",
          }}
        />
      </FAB>
    </>
  );
}
