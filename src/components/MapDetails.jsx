import { Autocomplete } from "@react-google-maps/api";
import { useState, useRef, useEffect } from "react";

export default function MapDetails({
  marker,
  setMarker,
  direction,
  setDirection,
  destination,
}) {
  const [distance, setDistance] = useState("");
  const originRef = useRef();

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

  function convertLocationAddress(location, setLatLng) {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: location }, function (result, status) {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const lat = result[0].geometry.location.lat();
        const lng = result[0].geometry.location.lng();
        setLatLng(lat, lng);
      } else {
        console.error("geocoder failed");
      }
    });
  }

  function setLatLng(lat, lng) {
    setMarker({ lat: lat, lng: lng });
  }

  function handleClick() {
    if (!originRef.current.value) return;
    convertLocationAddress(originRef.current.value, setLatLng);
    fetchDirections(originRef.current.value);
    console.log(originRef.current.value);
    originRef.current.value = "";
  }

  return (
    <div className=" w-2/5 bg-black text-white p-8 md:p-12">
      <h1 className="text-2xl font-bold">CONTROLLER</h1>
      <h2>Tap on the map Select your current location or enter below</h2>

      <div className="flex flex-wrap mb-5 md:mb-2 md:gap-5 md:items-center ">
        <Autocomplete>
          <input
            type="text"
            placeholder="Destination"
            className="text-white rounded-sm p-1 px-4 w-[200px] bg-transparent border-2 border-solid border-white my-4"
            ref={originRef}
          />
        </Autocomplete>
        <button className="rounded-xl border-2 p-1 px-2 " onClick={handleClick}>
          ✔️
        </button>
      </div>
      {direction && <Distance dist={distance} />}
    </div>
  );
}

function Distance({ dist }) {
  return <div>Distance : {dist}</div>;
}
