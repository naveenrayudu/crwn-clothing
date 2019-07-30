import React, { useEffect, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import Header from "./components/header/header.component";
import IDefaultComponentProps from "./models/interfaces/IDefaultComponentProps";
import { Dispatch } from "redux";
import {
  SET_USER_SIGN_OUT_START,
  VERIFY_USER_SESSION as VERIFY_USER_SESSION_START
} from "./store/actions/actionTypes";
import SpinnerToDisplay from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

const ShopPage = React.lazy(() =>
  import("./pages/shoppage/shoppage.component")
);
const SignInAndSignUp = React.lazy(() =>
  import("./pages/sign-in-and-sign-uppage/sign-in-and-sign-up.component")
);
const CheckoutPage = React.lazy(() =>
  import("./pages/checkoutpage/checkout.component")
);

export const NotFoundPage: React.FC = () => {
  return (
    <div className="notFound--page">
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

export const PagesRouting: React.FC = () => {
  return (
    <Switch>
      <ErrorBoundary>
        <Route exact path="/" component={HomePage} />
        <Suspense fallback={SpinnerToDisplay}>
          <Route path="/signin" component={SignInAndSignUp} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/checkout" component={CheckoutPage} />
        </Suspense>
      </ErrorBoundary>
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export const AppComponent: React.FC<IAppComponentProps> = ({
  setSignOutUser,
  verifyUserSession
}) => {
  useEffect(() => {
    verifyUserSession();
  }, [verifyUserSession]);

  return (
    <div className="app-container">
      <Header onSignOut={setSignOutUser} />
      <PagesRouting />>
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
      });
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AppComponent);
