import { useJsApiLoader } from "@react-google-maps/api";
import React, { useState } from "react";

import MapComp from "../components/MapComp";
import { NavBar } from "../components/NavBar";

export default function MapViewPage({ destination }) {
  const apiKey = "AIzaSyBPaYveAngQ1IzyBvJKjPy_LpLxECZPchQ";
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div>
      <NavBar />
      <div className="mt-24">
        <MapComp />
      </div>
    </div>
  );
  // pass destination prop to  MapComp destination prop
}
