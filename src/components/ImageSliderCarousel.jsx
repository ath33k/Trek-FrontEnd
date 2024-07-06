import { useEffect, useState } from "react";

import wallpaper1 from "../assets/HeroImages/homepagewallpaper1.webp";
import wallpaper2 from "../assets/HeroImages/homepagewallpaper2.webp";
import wallpaper3 from "../assets/HeroImages/homepagewallpaper3.webp";

const ImageSliderCarousal = () =>{
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        wallpaper1,
        wallpaper2,
        wallpaper3
    ];
    
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [slides.length]);
    return (
        <section className="w-full">
            {slides.map((slide, index) => (
                <img
                    key={index}
                    src={slide}
                    className="w-full"
                    style={{display: currentSlide ===index ? 'block' : 'none'}}
                    alt="Band"
                />
                
            ))}
        </section>
    )
    
}
export default ImageSliderCarousal;