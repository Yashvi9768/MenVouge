import React from 'react';
import './success.css'; // Add styles for the success page

const SuccessPage = () => {
    return (
        <div className="success-page">
            <h1>Payment Successful!</h1>
            <p>Thank you for your order. Your payment has been successfully processed.</p>
            <a href="/" className="go-home">Go to Homepage</a>
        </div>
    );
};

export default SuccessPage;
