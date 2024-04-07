/* eslint-disable react/prop-types */
import MapDetails from "../components/MapDetails";
import Map from "../components/Map";
import { useEffect, useState } from "react";

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

  useEffect(
    function () {
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
      fetchDirections(marker);
    },

    [destination, marker]
  );

  //sample destination...
  // const theDestination = destination;

  return (
    <div className="rounded-2xl relative h-[300px] md:h-[500px] overflow-hidden">
      <Map
        location={destination}
        currMarker={marker}
        direction={direction}
        setMarker={setMarker}
      />
      <div className="absolute top-0 right-0 bg-white p-2 rounded-bl-2xl text-black font-bold">
        {distance}
      </div>
    </div>
  );
}
