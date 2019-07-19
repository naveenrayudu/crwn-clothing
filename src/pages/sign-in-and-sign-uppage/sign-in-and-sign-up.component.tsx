import React from "react";

import "./sign-in-and-sign-up.styles.scss";
import SignIn from "../../components/user-login/sign-in/sign-in.component";
import { ISignedInUserInfo } from "../../models/interfaces/IUserAccount";
import SignUp from "../../components/user-login/sign-up/sign-up.component";

type ISignInSignUpProps = {
  history: any;
  currentUser?: ISignedInUserInfo;
};

class SignInAndSignUp extends React.Component<ISignInSignUpProps> {
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

export default SignInAndSignUp;
