import React from "react";
import { NavBar } from "./components/NavBar";
import Container from "./components/Container";
import HomePage from "./pages/HomePage";
import { BrowserRouter } from "react-router-dom";
import FDetialPage from "./pages/FDetialPage";

export default function App() {
  return (
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
}
