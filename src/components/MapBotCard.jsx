// import React from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const MapBotCard = ({ value }) => {
//   const coordinates = value.coordinates.split(":").map(coord => parseFloat(coord));

//   const mapStyles = {
//     height: "400px",
//     width: "100%",
//   };

//   const defaultCenter = {
//     lat: coordinates[0],
//     lng: coordinates[1],
//   };

//   return (
//     <div className="w-full mx-auto bg-white rounded-lg shadow-lg p-4">
//       <h2 className="text-lg font-bold text-gray-700">{value.name}</h2>
//       <p className="text-sm text-gray-600">{value.description}</p>
//       <LoadScript googleMapsApiKey="AIzaSyCNeQSjjUstwvDgEFVDpWCoIxvhXyw-KaY">
//         <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter}>
//           <Marker position={defaultCenter} />
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// };

// export default MapBotCard;







// import React from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const MapBotCard = ({ value }) => {
//   const coordinates = value.coordinates.split(":").map(coord => parseFloat(coord));

//   const mapStyles = {
//     height: "400px",
//     width: "100%",
//   };

//   const defaultCenter = {
//     lat: coordinates[0],
//     lng: coordinates[1],
//   };

//   return (
//     <div className="w-full mx-auto relative bg-black rounded-lg overflow-hidden">
//       <LoadScript googleMapsApiKey="AIzaSyCNeQSjjUstwvDgEFVDpWCoIxvhXyw-KaY">
//         <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter}>
//           <Marker position={defaultCenter} />
//         </GoogleMap>
//       </LoadScript>
//       <div className="bg-gradient-to-t from-black px-2 pb-1 pt-2 bottom-0 w-full absolute">
//         <h2 className="text-white text-lg font-bold">{value.name}</h2>
//         <p className="text-white font-inter pt-1 text-sm">
//           {value.description.length > 70
//             ? value.description.substring(0, 70) + "..."
//             : value.description}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default MapBotCard;



import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const MapBotCard = ({ value }) => {
  const coordinates = value.coordinates.split(":").map(coord => parseFloat(coord));

  // Check if the coordinates are valid
  if (isNaN(coordinates[0]) || isNaN(coordinates[1])) {
    return <div>Invalid coordinate values</div>;
  }

  const mapStyles = {
    height: '300px', // Set the height to 500px
    width: '50%',
  };

  const defaultCenter = {
    lat: coordinates[0],
    lng: coordinates[1],
  };

  return (
    <div className="w-full mx-auto relative bg-white rounded-lg overflow-hidden">
      <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter}>
        <Marker position={defaultCenter} />
      </GoogleMap>
    </div>
  );
};

export default MapBotCard;


















