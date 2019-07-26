import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shoppage/shoppage.component";
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-uppage/sign-in-and-sign-up.component";
import IDefaultComponentProps from "./models/interfaces/IDefaultComponentProps";
import CheckoutPage from "./pages/checkoutpage/checkout.component";
import { Dispatch } from "redux";
import { SET_USER_SIGN_OUT_START, VERIFY_USER_SESSION as VERIFY_USER_SESSION_START } from "./store/actions/actionTypes";

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
  setSignOutUser: any;
  verifyUserSession: any;

}

const App: React.FC<IAppComponentProps> = ({ setSignOutUser, verifyUserSession }) => {
  verifyUserSession();
  
  return (
    <div className="app-container">
      <Header onSignOut={setSignOutUser} />
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
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setSignOutUser: () => {
      dispatch({
        type: SET_USER_SIGN_OUT_START,
        payload: undefined
      });
    },
    verifyUserSession: () => {
      dispatch({
        type: VERIFY_USER_SESSION_START
      })
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
