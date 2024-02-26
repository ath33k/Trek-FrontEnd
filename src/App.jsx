// eslint-disable-next-line no-unused-vars
import React from 'react';

// import DropdownButton from 'react-bootstrap/DropdownButton';
import Container from "./components/Container";
// import Form from './components/Form';
import QuickViewCardL from "./components/QuickViewCardL";
import image from './images/img.jpg'; // Importing the image

export default function App() {
  return (<Container>
    <QuickViewCardL title="Sigiriya" backgroundImage={image}
        width="430px" // Set your desired width
        height="932px" // Set your desired height
        description="Sigiriya or Sinhagiri  is an ancient rock fortress located in the northern Matale District near the town of Dambulla in the Central Province, Sri Lanka. "
        distance="15"
        rating="4.7"
        />
        {/* <Form></Form> */}
        
        


  </Container>);
}
