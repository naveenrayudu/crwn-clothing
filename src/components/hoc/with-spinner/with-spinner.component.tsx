import React from "react";
import './with-spinner.styles.scss';

type withSpinnerTypes<T> = {
  isLoading: boolean;
  otherProps: T;
};

const WithSpinner = function<P>(ComponentToWrap: React.ComponentType<P>) {
  const Spinner = function(props: withSpinnerTypes<P>) {
    return props.isLoading ? (
      <div className="spinnerOverlay">
        <div className="spinnerContainer" />
      </div>
    ) : (
      <ComponentToWrap {...props.otherProps} />
    );
  };

  return Spinner;
};

export default WithSpinner;
