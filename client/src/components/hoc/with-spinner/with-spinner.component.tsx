import React from "react";
import "./with-spinner.styles.scss";

export type withSpinnerTypes = {
  isLoading: boolean;
};

const WithSpinner = function(ComponentToWrap: React.ComponentType) {
  const Spinner = function(props: withSpinnerTypes) {
    const { isLoading, ...otherProps } = props;
    return isLoading ? (
      <div className="spinnerOverlay">
        <div className="spinnerContainer" />
      </div>
    ) : (
      <ComponentToWrap {...otherProps} />
    );
  };

  return Spinner;
};

export default WithSpinner;
