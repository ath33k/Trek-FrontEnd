import React from "react";
import MapViewCard from "../components/MapViewCard";
import { useJsApiLoader } from "@react-google-maps/api";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import { navlinks } from "../navlinks";
import Chip from "../components/Chip";

export default function MapTestPage() {
  const apiKey = "AIzaSyBPaYveAngQ1IzyBvJKjPy_LpLxECZPchQ";
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Container className={"m-4"}>
      <MapViewCard destination={{ lat: 6.87442, lng: 79.86682 }} />
      <div className="text-center p-2">
        <Link to={navlinks.map.path}>
          <Chip label={"View on map"} />
        </Link>
      </div>
    </Container>
  );
}
