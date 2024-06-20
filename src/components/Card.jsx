import {useEffect, useState } from "react";

import db from './firebaseConfig';
import Newviewcard from './NewViewCard';

function Card() {
    const [cardsData, setCardsData] = useState([]);
    
    useEffect(() =>{
        const fetchData = async () => {
            const cardCollection = await db.collection('destinations').get();
            const cards = cardCollection.docs.map(doc => ({ id: doc.id, ...doc.data()}));
            setCardsData(cards);
        };
        fetchData();
    }, []);
    
    return(
        <div className="Card">
            {cardsData.length > 0 ?(
                <div className="card-container">
                    {cardsData.map(card =>(
                        <Newviewcard
                            key={card.id}
                            title={card.title}
                            backgroundImage={card.backgroundImage}
                            width={card.width}
                            height={card.height}
                            description={card.description}
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