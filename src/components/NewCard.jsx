import React from 'react';

import Container from './Container';

export default function NewCard({title, backgroundImage, width, height, description, rating, distance}){
  return (
    <Container>
        <div>
            <div className="font-sans text-white" style={cardStyle}>
                <p className='p-[10px] text-[18px] bg-gradient-to-r from-black to-transparent'>Here is the result of your search</p>
                <div className="absolute top-[620px] left-[40px] text-center w-[350px] rounded-[20px] translate-x-0 bg-[#ffffff0a] shadow-[35px_35px_35px_35px_rgba(0,0,0,0.3)]">
                    <h3 className='text-[50px] pb-[20px] font-bold'>{title}</h3>
                    <div className='flex h-[50px]'>
                        <span className='mr-[10px] text-[22px]'>{rating}</span>
                        <div className='w-[80px] relative left-[170px] text-[25px]'>{distance}</div>
                    </div>
                </div>
            </div>
        </div>
    </Container>
  )
}
