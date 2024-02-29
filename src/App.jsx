import React from "react";
import FDetialPage from "./pages/FDetialPage";
import { BrowserRouter } from "react-router-dom";
import { NavBar } from "./components/NavBar";

export default function App() {
  return (
    <>
      <BrowserRouter>
        {/* <NavBar />  */}
        <FDetialPage />;
      </BrowserRouter>
    </>
  );
}
