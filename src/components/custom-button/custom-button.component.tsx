import React from "react";
// import "./custom-button.styles.scss";
import { CustomButtonContainer } from "./custom-button.styles";

interface ICustomButton {
  type: "button" | "submit" | "reset";
  onClick?: any;
  isGoogleSignIn?: boolean;
  disabled?: boolean;
  inverted?: boolean;
  className?: string
}

const CustomButton: React.FC<ICustomButton> = ({ children, ...otherProps }) => {
  return (
    <CustomButtonContainer {...otherProps}>{children}</CustomButtonContainer>
  );
};

export default CustomButton;
