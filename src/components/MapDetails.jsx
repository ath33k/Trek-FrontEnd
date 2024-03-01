import { Autocomplete } from "@react-google-maps/api";
import { useState, useRef, useEffect } from "react";
import { MdOutlineDone } from "react-icons/md";

export default function MapDetails({
  userLocation,
  setUserLocation,
  direction,
  setDirection,
  destination,
}) {
  const [distance, setDistance] = useState("");
  const inputFieldRef = useRef();

  useEffect(
    function () {
      fetchDirections(userLocation);
    },

    [userLocation]
  );

  async function fetchDirections(location) {
    if (!location) return;

    const service = new window.google.maps.DirectionsService();
    const result = await service.route({
      origin: location,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    setDirection(result);
    setDistance(result.routes[0].legs[0].distance.text);
  }

  // This function Converts address name to latitude and longtitude value.
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
    setUserLocation({ lat: lat, lng: lng });
  }

  function handleInputFieldBtn() {
    if (!inputFieldRef.current.value) return;
    convertLocationAddress(inputFieldRef.current.value, setLatLng);
    fetchDirections(inputFieldRef.current.value);
    console.log(inputFieldRef.current.value);
    inputFieldRef.current.value = "";
  }

  return (
    <div className=" w-2/5 bg-black text-white p-8 md:p-12">
      <h1 className="text-2xl font-bold mb-4">CONTROLLER</h1>
      <h2 className="font-bold">To Select your location :</h2>
      <p>Tap on the map or Type Below</p>

      <div className="flex flex-wrap mb-5 md:mb-2 md:gap-5 md:items-center ">
        <Autocomplete>
          <input
            type="text"
            placeholder="Destination"
            className="text-white rounded-sm p-1 px-4 w-[200px] bg-transparent border-2 border-solid border-white my-4 border-opacity-50 outline-none focus:border-blue-500 focus:rounded-lg"
            ref={inputFieldRef}
          />
        </Autocomplete>

        {/* below is a button which handle input field value  */}
        <span
          className="group p-1 border-2 rounded-lg cursor-pointer hover:border-blue-500 hover:text-blue-400 transition-all duration-200"
          onClick={handleInputFieldBtn}
        >
          <MdOutlineDone className=" group-hover:scale-125 text-2xl hover:scale-125 transition-all duration-300 " />
        </span>
      </div>
      {direction && <Distance distance={distance} />}
    </div>
  );
}

function Distance({ distance }) {
  return <div>Distance : {distance}</div>;
}
