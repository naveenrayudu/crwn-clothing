import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

import "./sign-in-and-sign-up.styles.scss";
import { AppState } from "../../store/reducers/rootReducer";
import { IUserInfo } from "../../models/interfaces/IRootReducer";
import {
  reselectCurrentUser,
  reselectCurrentUserLoading
} from "../../store/reducers/users/userSelector";
import SignInConnector from "../../components/user-login/sign-in/sign-in.connector";
import SignUpConnetctor from "../../components/user-login/sign-up/sign-up.container";
import { compose } from "redux"; 
import WithSpinnerOverlay from "../../components/hoc/with-spinner-overlay/with-spinner-overlay.component";

type ISignInSignUpProps = RouteComponentProps & IUserInfo;

class SignInAndSignUp extends React.Component<ISignInSignUpProps, any> {
  componentDidMount() {
    if (this.props.currentUser && this.props.currentUser.email)
      this.props.history.push("/");
  }

  componentDidUpdate() {
    if (this.props.currentUser && this.props.currentUser.email)
      this.props.history.push("/");
  }

  render() {
    return (
      <div className="sign-up-and-sign-in">
        <SignInConnector />
        <SignUpConnetctor />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    currentUser: reselectCurrentUser(state),
    isLoading: reselectCurrentUserLoading(state)
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps),
  WithSpinnerOverlay,
  withRouter
)(SignInAndSignUp);
