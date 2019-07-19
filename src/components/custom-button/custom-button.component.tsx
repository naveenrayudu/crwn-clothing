import React from "react";
import "./custom-button.styles.scss";

interface ICustomButton {
  type: "button" | "submit" | "reset";
  onClick?: any;
  isGoogleSignIn?: boolean;
  disabled?: boolean;
  inverted?: boolean;
}

const CustomButton: React.FC<ICustomButton> = ({
  children,
  isGoogleSignIn,
  inverted,
  disabled,
  ...otherProps
}) => {
  return (
    <button
      className={
          `${inverted ? "inverted" : ""} 
          ${isGoogleSignIn ? "is-goolge-signin" : ""} 
          ${disabled ? "disabled" : ""} 
          custom-button`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default CustomButton;
