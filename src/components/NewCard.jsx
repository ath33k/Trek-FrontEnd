import React from 'react';

import Container from './Container';
import ExpandableText from './ExpandableText';
import Rating from './Rating';

export default function NewCard({title, backgroundImage,description,rating,distance}) {
    

    return (
        <Container>
    <div className=" bg-center bg-cover w-full h-screen text-white" style={{backgroundImage: `url(${backgroundImage})`}}>
        <div>
            <span className='lg:text-2xl bg-gradient-to-r from-black to-transparent'>Here is the result what search</span>
            <br/>
            <div className='flex justify-center items-end '>
                
                <div className=' w-96 max-w-full md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl h-auto fixed bottom-0 mb-10 text-center rounded-[20px] translate-x bg-[#7973730a] shadow-lg bg-gradient-to-tr from-black to-transparent'>
                        <h3 className='text-[50px] pb-[20px] font-bold'>{title}</h3>
                        <div className='flex h-[50px] justify-between'>
                            <div className=' w-24 flex'>
                            <Rating/>
                            <span className='mr-[10px] ml-[10px] text-[22px]'>{rating}</span>
                            </div>
                            <div className='w-[100px] lg:w-[120px] text-[25px]'>{distance} KM</div>
                        </div>
                        <div>
                        <ExpandableText className='mt-[5px]'>
                            {description}
                        </ExpandableText>
                        </div>
                </div>
            </div>
        </div>
      
    </div>
    </Container>
    )
}
