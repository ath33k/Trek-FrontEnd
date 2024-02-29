import { useCallback, useMemo, useRef } from "react";
import { GoogleMap, MarkerF, DirectionsRenderer } from "@react-google-maps/api";
import emojiPeople from "../assets/emojiPeople.svg";

export default function Map({
  location,
  currMarker,
  direction,
  destinationMarkerOnClick,
  currMarkerOnClick,
  mapOnClick,
  className,
}) {
  const mapRef = useRef();

  const destination = useMemo(() => location, [location]);

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
    <div className={`map h-full w-4/5  ${className}`}>
      <GoogleMap
        zoom={10}
        center={destination}
        mapContainerClassName="map-container w-full h-full"
        options={options}
        onLoad={onLoad}
        onClick={mapOnClick}
      >
        <MarkerF position={destination} />

        {currMarker && <MarkerF position={currMarker} icon={emojiPeople} />}

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
