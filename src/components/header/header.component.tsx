import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import "./header.styles.scss";
import { ISignedInUserInfo } from "../../models/interfaces/IUserAccount";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

interface IUserHeaderProps {
  currentUser: undefined | ISignedInUserInfo;
  onSignOut?: any;
}

const Header: React.FunctionComponent<IUserHeaderProps> = ({
  currentUser,
  onSignOut
}) => {
  const renderUserLinks = () => {
    if (currentUser && currentUser.email) {
      return (
        <Link className="option" to="/" onClick={onSignOut}>
          SIGN OUT
        </Link>
      );
    }

    return (
      <Link className="option" to="/signin">
        SIGN IN
      </Link>
    );
  };

  return (
    <div className="header">
      <Link to="/" className="logo-container">
        <Logo />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/shop">
          CONTACT
        </Link>

        {renderUserLinks()}

        <div>
          <CartIcon></CartIcon>
        </div>
      </div>
      
      <CartDropdown></CartDropdown>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentUser: state.user.currentUser as ISignedInUserInfo
  };
};

export default connect(mapStateToProps)(Header);
