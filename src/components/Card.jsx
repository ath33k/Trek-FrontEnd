import {useEffect, useState } from "react";

import db from './firebaseConfig';
import Newviewcard from './NewViewCard';

function Card() {
    const [destinationsData, setDestinationsData] = useState([]);
    
    useEffect(() =>{
        const fetchData = async () => {
            const destinationCollection = await db.collection('destinations').get();
            const destinations = destinationCollection.docs.map(doc => ({ id: doc.id, ...doc.data()}));
            setDestinationsData(destinations);
        };
        fetchData();
    }, []);
    
    return(
        <div className="Card">
            {destinationsData.length > 0 ?(
                <div className="card-container">
                    {destinationsData.map(destination =>(
                        <Newviewcard
                            key={destination.id}
                            title={destination.title}
                            backgroundImage={destination.backgroundImage}
                            width={destination.width}
                            height={destination.height}
                            description={destination.description}
                            city={destination.city}
                            district={destination.district}
                        />
                            
                    ))}
                </div>    
            ) : (
                <div className="text-center text-xl">Loading.....</div>
            )}
        </div>
    );
}
export default Card;