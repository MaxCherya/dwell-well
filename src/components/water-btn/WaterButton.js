import React from 'react';
import './WaterButton.css'; // Import the CSS file

function WaterButton({ children, onClick }) {
  return (
    <button className="water-button" onClick={onClick}>
      {children}
      <span className="ripple"></span>
    </button>
  );
}

export default WaterButton;