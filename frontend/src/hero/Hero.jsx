import React, { useState, useEffect } from 'react';
import './Hero.css';

import img1 from '../Admin/Dashbord/assets/hero1.jpeg';
import img2 from '../Admin/Dashbord/assets/hero2.jpeg';

const images = [
    {
        src: img1,
        text: 'Discover the Best Grooming Products', // Text overlay for img1
        textStyle: 'text-overlay-1' // CSS class for img1 text overlay
    },
    {
        src: img2,
        text: 'Unlock Your Potential with Gym Equipment', // Text overlay for img2
        textStyle: 'text-overlay-2' // CSS class for img2 text overlay
    },
   
];

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hero">
            {/* Display the current image */}
            <div className="hero-img-container">
                <img src={images[currentIndex].src} alt="hero-img" className="hero-img" />
                
                {/* Text overlay */}
                <div className={`hero-text-overlay ${images[currentIndex].textStyle}`}>
                    <h2>{images[currentIndex].text}</h2>
                </div>
            </div>
        </div>
    );
}
