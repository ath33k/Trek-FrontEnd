import React, {useEffect, useState } from "react";

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
}
export default Card;