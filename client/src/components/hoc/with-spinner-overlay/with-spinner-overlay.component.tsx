import React from "react";
import './with-spinner-overlay.styles.scss';

export type withSpinnerTypes = {
  isLoading: boolean;
};

const WithSpinnerOverlay = function(ComponentToWrap: React.ComponentType) {
  const Spinner = function(props: withSpinnerTypes) {
    const { isLoading, ...otherProps } = props;
    return (
      <div>
        <div className={`${!isLoading ? "" : "spinnerOverlay-container"}`}>
          <div className={`${!isLoading ? "" : "spinnerOverlay"}`}>
            <div className={`${!isLoading ? "" : "spinnerContainer"}`} />
          </div>
        </div>

        <ComponentToWrap {...otherProps} />
      </div>
    );
  };

  return Spinner;
};

export default WithSpinnerOverlay;
