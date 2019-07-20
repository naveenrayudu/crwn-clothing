import React from "react";
import { Switch, Route } from "react-router-dom";
import { auth, createOrSetUpUserBySignIn } from "./firebase/firebase.util";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shoppage/shoppage.component";
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-uppage/sign-in-and-sign-up.component";
import IDefaultComponentProps from "./models/interfaces/IDefaultComponentProps";
import { ISignedInUserInfo } from "./models/interfaces/IUserAccount";
import { setSignInUser, setSignOutUser } from "./store/actions/userAction";
import CheckoutPage from "./pages/checkoutpage/checkout.component";

const NotFoundPage: React.FC = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(../images/PageNotFound.jpg)`,
          backgroundRepeat: "no-repeat",
          height: "60vh",
          backgroundPosition: "center",
          backgroundSize: "contain"
        }}
      />
    </div>
  );
};

interface IAppComponentProps extends IDefaultComponentProps {
  setSignInUser: any;
  setSignOutUser: any;
}

class App extends React.Component<IAppComponentProps> {
  unSubscribeAuth: any = null;
  unSubscribeUserSnapShot: any = null;

  componentDidMount() {
    this.unSubscribeAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        const currentUser = {} as ISignedInUserInfo;
        currentUser.displayName = user.displayName;
        currentUser.email = user.email;
        currentUser.emailVerified = user.emailVerified;
        currentUser.photoUrl = user.photoURL;
        currentUser.uid = user.uid;

        const userRef = await createOrSetUpUserBySignIn(currentUser, {});
        if (userRef) {
          this.unSubscribeUserSnapShot = userRef.onSnapshot(snapShot => {
            this.props.setSignInUser(snapShot.data() as ISignedInUserInfo);
          });
        }
      } else {
        this.props.setSignOutUser();
      }
    });
  }

  onSignOut = () => {
    auth.signOut();
  };

  componentWillMount() {
    if (this.unSubscribeAuth) this.unSubscribeAuth();
    if (this.unSubscribeUserSnapShot) this.unSubscribeUserSnapShot();
  }

  render() {
    return (
      <div className="app-container">
        <Header onSignOut={this.onSignOut} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signin" component={SignInAndSignUp} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route component={NotFoundPage} />
        </Switch>

        <ToastContainer
          className="toast-container"
          toastClassName="dark-toast"
          newestOnTop
          pauseOnHover={false}
          autoClose={3000}
          position="top-right"
          draggable={false}
        />
      </div>
    );
  }
}

export default connect(
  null,
  {
    setSignInUser,
    setSignOutUser
  }
)(App);
