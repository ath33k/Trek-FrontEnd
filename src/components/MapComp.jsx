import { useEffect, useState } from "react";
import MapDetails from "./MapDetails";
import Map from "./Map";

export default function MapComp({
  destination = { lat: 6.87442, lng: 79.86682 },
}) {
  // Use all these states when using Map component

  const [marker, setMarker] = useState(null);

  const [direction, setDirection] = useState({
    origin: null,
    destination: null,
    travelMode: window.google.maps.TravelMode.DRIVING,
  });
  const [distance, setDistance] = useState("");

  function handleMapClick(e) {
    setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    // console.log(e.latLng.lat() + " " + e.latLng.lng());
  }

  // set the geolocatioin when marker is not set
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
      fetchDirections(marker);
    },

    [marker]
  );

  // fetches direction from destination to marker
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
    <div className=" flex md:flex-row flex-col  h-[80vh] m-8 rounded-2xl overflow-hidden shadow-[0_0px_20px_5px_rgba(0,0,0,0.4)]">
      <MapDetails
        marker={marker}
        setMarker={setMarker}
        direction={direction}
        setDirection={setDirection}
        destination={destination}
        fetchDirections={fetchDirections}
        distance={distance}
      />

      <Map
        location={destination}
        currMarker={marker}
        mapOnClick={handleMapClick}
        direction={direction}
        setMarker={setMarker}
      />
    </div>
  );
}
