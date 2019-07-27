import { Dispatch } from "redux";
import { SET_USER_SIGN_UP_START } from "../../../store/actions/actionTypes";
import { connect } from "react-redux";
import SignUp from "./sign-up.component";

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    signInWithEmail: (
      email: string,
      password: string,
      displayName: string,
      errorCallback: any
    ) =>
      dispatch({
        type: SET_USER_SIGN_UP_START,
        payload: {
          email,
          password,
          displayName,
          errorCallback
        }
      })
  };
};

export default connect(
    null,
    mapDispatchToProps
  )(SignUp);
