import React from "react";
import { NavBar } from "./components/NavBar";
import Container from "./components/Container";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FDetialPage from "./pages/FDetialPage";
import MapViewPage from "./pages/MapViewPage";

export default function App() {
<<<<<<< HEAD
  return <FDetialPage />;
=======
  return (
    <>
      <BrowserRouter>
        {/* <NavBar />  */}
        <FDetialPage />;
      </BrowserRouter>
    </>
  );
>>>>>>> comment-section
}
