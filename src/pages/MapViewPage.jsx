import { useJsApiLoader } from "@react-google-maps/api";
import React from "react";

import MapComp from "../components/MapComp";

export default function MapViewPage() {
  const apiKey = "AIzaSyBPaYveAngQ1IzyBvJKjPy_LpLxECZPchQ";
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <MapComp />;
}
