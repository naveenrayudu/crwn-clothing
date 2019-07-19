import React from "react";
import './custom-button.styles.scss';

interface ICustomButton {
    type: "button" | "submit" | "reset",
    onClick: any,
    isGoogleSignIn? : boolean,
    disabled?: boolean
}

const CustomButton: React.FC<ICustomButton> = ({ children, isGoogleSignIn, disabled, ...otherProps }) => {
  return <button className={`${isGoogleSignIn? 'is-goolge-signin' : ''} ${ disabled ? 'disabled': ''} custom-button`} {...otherProps}>{children}</button>;
};

export default CustomButton;