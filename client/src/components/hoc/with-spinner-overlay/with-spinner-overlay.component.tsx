import React from "react";
import SpinnerToDisplay from "../../spinner/spinner.component";

export type withSpinnerTypes = {
  isLoading: boolean;
};

const WithSpinnerOverlay = function(ComponentToWrap: React.ComponentType) {
  const Spinner = function(props: withSpinnerTypes) {
    const { isLoading, ...otherProps } = props;
    return (
      <div>
        {isLoading ? <SpinnerToDisplay /> : null}

        <ComponentToWrap {...otherProps} />
      </div>
    );
  };

  return Spinner;
};

export default WithSpinnerOverlay;
