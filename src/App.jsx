import React from "react";
import { NavBar } from "./components/NavBar";
import Container from "./components/Container";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import FDetialPage from "./pages/FDetialPage";
import MapViewPage from "./pages/MapViewPage";

export default function App() {
  return (
    <Routes>
      <Route path="/details" element={<FDetialPage />} />
      <Route path="/map" element={<MapViewPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
