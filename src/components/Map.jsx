import { useCallback, useMemo, useRef } from "react";
import { GoogleMap, MarkerF, DirectionsRenderer } from "@react-google-maps/api";
import emojiPeople from "../assets/emojiPeople.svg";
import { MdMyLocation } from "react-icons/md";

export default function Map({
  location,
  userLocation,
  direction,
  destinationMarkerOnClick,
  userLocationOnClick,
  mapOnClick,
  className,
}) {
  const mapRef = useRef();

  const currDestination = useMemo(() => location, [location]);

  const options = useMemo(
    () => ({
      mapId: "b788025203e03baf",
      disableDefaultUI: true,
      clickableIconsIcons: false,
    }),
    []
  );

  const onLoad = useCallback((map) => (mapRef.current = map), []);
  return (
    <div className={`relative map h-full w-4/5  ${className}`}>
      <div
        className="absolute bottom-14 right-5 z-50 md:right-10 cursor-pointer"
        onClick={() => mapRef.current.panTo(location)}
      >
        <MdMyLocation className="text-4xl" />
      </div>
      <GoogleMap
        zoom={10}
        center={currDestination}
        mapContainerClassName="map-container w-full h-full"
        options={options}
        onLoad={onLoad}
        onClick={mapOnClick}
      >
        <MarkerF position={currDestination} />

        {/* user location marker displays on map */}
        {userLocation && <MarkerF position={userLocation} icon={emojiPeople} />}

        {direction && (
          <DirectionsRenderer
            directions={direction}
            options={{ suppressMarkers: true }}
          />
        )}
      </GoogleMap>
    </div>
  );
}
