import { useJsApiLoader } from "@react-google-maps/api";
import React, { useState } from "react";

import MapComp from "../components/MapComp";

export default function MapViewPage({ destination }) {
  const apiKey = "AIzaSyBPaYveAngQ1IzyBvJKjPy_LpLxECZPchQ";
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <MapComp destination={{ lat: 6.87442, lng: 79.86682 }} />;
  // pass destination prop to  MapComp destination prop
}
