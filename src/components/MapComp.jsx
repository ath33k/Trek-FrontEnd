import { useState } from "react";
import MapDetails from "./MapDetails";
import Map from "./Map";

export default function MapComp() {
  const [marker, setMarker] = useState(null);

  const [direction, setDirection] = useState({
    origin: null,
    destination: null,
    travelMode: google.maps.TravelMode.DRIVING,
  });

  function handleMapClick(e) {
    setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    console.log(e.latLng.lat() + " " + e.latLng.lng());
  }

  //sample destination...
  const destination = { lat: 6.87442, lng: 79.86682 };

  return (
    <div className="flex h-screen m-8 rounded-2xl overflow-hidden">
      <MapDetails
        marker={marker}
        setMarker={setMarker}
        direction={direction}
        setDirection={setDirection}
        destination={destination}
      />
      <Map
        location={destination}
        currMarker={marker}
        mapOnClick={handleMapClick}
        direction={direction}
      />
    </div>
  );
}
