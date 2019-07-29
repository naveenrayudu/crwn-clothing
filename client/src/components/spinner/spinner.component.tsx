import React from "react";
import './spinner.styles.scss';

const SpinnerToDisplay: React.FC = () => {
  return (
    <div className="spinnerOverlay-container">
      <div className="spinnerOverlay">
        <div className="spinnerContainer" />
      </div>
    </div>
  );
};


export default SpinnerToDisplay;