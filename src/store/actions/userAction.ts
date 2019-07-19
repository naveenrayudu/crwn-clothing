import { ISignedInUserInfo } from "../../models/interfaces/IUserAccount";
import {Dispatch} from 'redux';
import IDefaultAction from "../../models/interfaces/IActions";
import { SET_SIGN_IN_USER } from "./actionTypes";

export const setSignInUser = (user: ISignedInUserInfo) => (dispatch: Dispatch<IDefaultAction>) => {
    dispatch({
         type: SET_SIGN_IN_USER,
         payload: user
    })
} 

export const setSignOutUser = () => (dispatch: Dispatch<IDefaultAction>) => {
    dispatch({
         type: SET_SIGN_IN_USER,
         payload: undefined
    })
} 
