import React from 'react';
import './Footer.css';
import l_img from '../logo.png';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-img'>
                <img src={l_img} alt='Logo' style={{ width: '150px' }} />
            </div>
            <ul className='footer-links'>
                <li><a href='/allproduct'>Products</a></li>
                <li><a href='/about'>About</a></li>
                <li><a href='/contact'>Contact</a></li>
            </ul>
            <div className='footer-copyright'>
                <hr />
                <p>Copyright &copy; 2024 - All Rights Reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
