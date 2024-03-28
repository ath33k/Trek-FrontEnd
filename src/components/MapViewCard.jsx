import React, { useEffect, useState } from "react";
import MapDetails from "../components/MapDetails";
import Map from "../components/Map";

export default function MapViewCard({ destination }) {
  const [marker, setMarker] = useState(null);

  const [direction, setDirection] = useState({
    origin: null,
    destination: null,
    travelMode: google.maps.TravelMode.DRIVING,
  });

  // If you want distance you push this state to parent and pass as prop
  const [distance, setDistance] = useState("");

  useEffect(() => {
    if (!marker) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        setMarker({ lat: lat, lng: lon });
      });
    }
  }, [marker, setMarker]);
  console.log(marker);

  useEffect(
    function () {
      fetchDirections(marker);
    },

    [marker]
  );

  async function fetchDirections(marker) {
    if (!marker) return;

    const service = new window.google.maps.DirectionsService();
    const result = await service.route({
      origin: marker,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    setDirection(result);
    setDistance(result.routes[0].legs[0].distance.text);
  }

  //sample destination...
  // const theDestination = destination;

  return (
    <div className="h-[20vh]  lg:h-[40vh] rounded-2xl overflow-hidden shadow-[0_0px_15px_5px_rgba(0,0,0,0.4)]">
      <Map
        location={destination}
        currMarker={marker}
        direction={direction}
        setMarker={setMarker}
      />
    </div>
  );
}
