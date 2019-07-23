import React from "react";
import { connect } from "react-redux";
import { ReactComponent as Logo } from "../../assets/crown.svg";

// import "./header.styles.scss";
import { ISignedInUserInfo } from "../../models/interfaces/IUserAccount";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { reselectCurrentUser } from "../../store/reducers/users/userSelector";
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from "./header.styles";

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
        <OptionLink  to="/" onClick={onSignOut}>
          SIGN OUT
        </OptionLink>
      );
    }

    return (
      <OptionLink to="/signin">
        SIGN IN
      </OptionLink>
    );
  };

  return (
    <HeaderContainer>
      <LogoContainer to="/" >
        <Logo />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to="/shop">
          SHOP
        </OptionLink>
        <OptionLink to="/shop">
          CONTACT
        </OptionLink>

        {renderUserLinks()}

        <div>
          <CartIcon></CartIcon>
        </div>
      </OptionsContainer>
      
      <CartDropdown></CartDropdown>
    </HeaderContainer>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentUser: reselectCurrentUser(state)
  };
};

export default connect(mapStateToProps)(Header);
