import React from "react";

import "./sign-in-and-sign-up.styles.scss";
import SignIn from "../../components/user-login/sign-in/sign-in.component";
import { ISignedInUserInfo } from "../../models/interfaces/IUserAccount";

type ISignInSignUpProps = {
  history: any;
  currentUser?: ISignedInUserInfo;
};

class SignInAndSignUp extends React.Component<ISignInSignUpProps> {
  componentDidMount() {
    debugger;
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
      </div>
    );
  }
}

export default SignInAndSignUp;
