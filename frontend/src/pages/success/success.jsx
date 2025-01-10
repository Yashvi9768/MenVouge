import React from "react";
import { useNavigate } from "react-router-dom";
import "./success.css"; // Optional styling

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <div className="success-container">
        <h1 className="success-title">Success!</h1>
        <p className="success-message">
          Your transaction was completed successfully. Thank you for using our service!
        </p>
        <button 
          className="success-button" 
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
