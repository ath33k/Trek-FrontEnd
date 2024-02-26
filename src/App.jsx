import React from "react";
import { NavBar } from "./components/NavBar";
import Container from "./components/Container";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FDetialPage from "./pages/FDetialPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<FDetialPage />} path="fdtest" />
      </Routes>
    </BrowserRouter>
  );
}
