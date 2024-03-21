import React from 'react';

import Container from './Container';
import ExpandableText from './ExpandableText';

export default function NewCard({title, backgroundImage, width, height, description, rating, distance}){
    const cardStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: width,
        height: height
      };
  return (
    <Container>
        <div className='desktop-container md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto'>
            <div className="font-sans text-white desktop-card md:flex md:items-center" style={cardStyle}>
                <p className='p-[10px] text-[18px] bg-gradient-to-r from-black to-transparent'>Here is the result of your search</p>
                <div className="md:absolute md:top-[620px] md:left-[40px] text-center md:w-[350px] rounded-[20px] translate-x-0 bg-[#ffffff0a] shadow-[35px_35px_35px_35px_rgba(0,0,0,0.3)] md:shadow-none">
                    <h3 className='text-[50px] pb-[20px] font-bold'>{title}</h3>
                    <div className='flex h-[50px]'>
                        <span className='mr-[10px] text-[22px]'>{rating}</span>
                        <div className='w-[80px] md:relative md:left-[170px] text-[25px]'>{distance}</div>
                    </div>
                    <ExpandableText className='mt-[5px]'>
                        {description}
                    </ExpandableText>
                </div>
            </div>
        </div>
    </Container>
  );
}
