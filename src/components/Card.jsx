// import {useEffect, useState } from "react";
// import Newviewcard from './NewViewCard';
// import { db } from "../config/firebase";
// function Card() {
//     const [destinationsData, setDestinationsData] = useState([]);
//     useEffect(() =>{
//         const fetchData = async () => {
//             const destinationCollection = await db.collection('destinations').get();
//             const destinations = destinationCollection.docs.map(doc => ({ id: doc.id, ...doc.data()}));
//             setDestinationsData(destinations);
//         };
//         fetchData();
//     }, []);
//     return(
//         <div className="Card">
//             {destinationsData.length > 0 ?(
//                 <div className="card-container">
//                     {destinationsData.map(destination =>(
//                         <Newviewcard
//                             key={destination.id}
//                             title={destination.title}
//                             backgroundImage={destination.backgroundImage}
//                             width={destination.width}
//                             height={destination.height}
//                             description={destination.description}
//                             city={destination.city}
//                             district={destination.district}
//                         />
//                     ))}
//                 </div>    
//             ) : (
//                 <div className="text-center text-xl">Loading.....</div>
//             )}
//         </div>
//     );
// }
// export default Card;
import  { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import Container from './Container';
import { db } from "../config/firebase";
import { getimageURL } from "../firefunctions";

function Card() {
  const [destinations, setDestinations] = useState([]);
  useEffect(() => {
    const fetchDestinations = async () => {
      const querySnapshot = await getDocs(collection(db, "destinations"));
      const destinationList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDestinations(destinationList);
    };
    fetchDestinations();
  }, []);
  return (
    <div>
      <h1>Destinations</h1>
      <Container>
      <ul>
        {destinations.map(destination => (
          <li key={destination.id}>
            <h2>{destination.name}</h2>
            <p><strong>District:</strong> {destination.district}</p>
            <p><strong>City:</strong> {destination.city}</p>
            <p><strong>Description:</strong> {destination.description}</p>
            <p><strong>Province:</strong> {destination.province}</p>
            <p><strong>DestopImage:</strong></p>
            {/* {destination.desktopImages && destination.desktopImages.length > 0 ? (
              <figure>
                <img src={destination.getimageURL} alt="Destination" style={{ maxWidth: '200px', height: '200px' }} />
              </figure>
            ) : (
              <p>No images available</p>
            )} */}
            {destination.desktopImages && destination.desktopImages.length > 0 ? (
              <>
                <p>Image URL: {destination.desktopImages[0]}</p> {/* Debugging: Display URL */}
                <figure>
                  <img 
                    src={destination.desktopImages[0]} 
                    alt="Destination" 
                    style={{ maxWidth: '200px', height: '100px' }} 
                    onError={(e) => {
                      console.error("Image load error:", e);  // Debugging: Log image load error
                      e.target.src = '';  // Handle error (optional)
                    }}
                  />
                </figure>
              </>
            ) : (
              <p>No images available</p>
            )}
          
        
          </li>
        ))}
      </ul>
      </Container>
    </div>
  );
}
export default Card;
