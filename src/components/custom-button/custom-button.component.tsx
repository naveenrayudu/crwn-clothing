import React from "react";
import './custom-button.styles.scss';

interface ICustomButton {
    type: "button" | "submit" | "reset",
    onClick: any,
    isGoogleSignIn? : boolean
}

const CustomButtom: React.FC<ICustomButton> = ({ children, isGoogleSignIn, ...otherProps }) => {
  return <button className={`${isGoogleSignIn? 'is-goolge-signin' : ''} custom-button`} {...otherProps}>{children}</button>;
};

export default CustomButtom;