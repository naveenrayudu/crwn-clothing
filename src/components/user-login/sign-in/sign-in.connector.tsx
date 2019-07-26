import {connect} from 'react-redux';
import { SET_USER_GOOGLE_SIGN_IN_START, SET_USER_EMAIL_SIGN_IN_START } from '../../../store/actions/actionTypes';
import { Dispatch } from 'redux';
import SignIn from './sign-in.component';


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
      signInWithGoogle: () => dispatch({
        type: SET_USER_GOOGLE_SIGN_IN_START
      }),
      signInWithEmail: (email: string, password: string, errorCallback: any) => dispatch({
        type: SET_USER_EMAIL_SIGN_IN_START,
        payload: {
          email,
          password,
          errorCallback 
        }
      })
    }
  }
  

  export default connect(null, mapDispatchToProps)(SignIn);