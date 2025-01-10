import React from 'react';
import './AboutUs.css';
import backgroundImage from '../Admin/Dashbord/assets/aboutus.jpeg';

const About = () => {
    return (
        <div className="about">
            <div className="about-content">
                <h1>About Us</h1>
                <p>
                    Welcome to MenVouge, your one-stop destination for premium men's grooming and fitness products. We are dedicated to empowering men to look and feel their best, whether they're prepping for an important event or reaching their peak performance in the gym.
                </p>
                <p>
                    Our mission is to provide top-quality products that cater to every aspect of men's self-care and fitness journey. We carefully curate our selection to offer the latest innovations and trusted brands in grooming and fitness. Our focus is on excellence, sustainability, and customer satisfaction.
                </p>
                <p>
                    At MenVouge, we are committed to providing you with an exceptional shopping experience. Our knowledgeable team is here to help you find the perfect products for your needs. We believe in transparency, quality, and integrity in everything we do.
                </p>
                <p>
                    Thank you for choosing MenVouge as your trusted partner in grooming and fitness. Join our community and experience the difference today!
                </p>
            </div>
        </div>
    );
};

export default About;