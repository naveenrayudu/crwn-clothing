import React from "react";
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {connect} from 'react-redux'

import "./sign-in-and-sign-up.styles.scss";
import SignIn from "../../components/user-login/sign-in/sign-in.component";
import SignUp from "../../components/user-login/sign-up/sign-up.component";
import { AppState } from "../../store/reducers/rootReducer";
import { IUserInfo } from "../../models/interfaces/IRootReducer";
import { reselectCurrentUser } from "../../store/reducers/users/userSelector";

type ISignInSignUpProps =  RouteComponentProps & IUserInfo;

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
        <SignIn />
        <SignUp />
      </div>
    );
  }
}


const mapStateToProps = (state: AppState) => {
  return {
    currentUser: reselectCurrentUser(state)
  }
}

export default connect(mapStateToProps)(withRouter(SignInAndSignUp));
