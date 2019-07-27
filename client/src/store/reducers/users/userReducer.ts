import IDefaultAction from "../../../models/interfaces/IActions";
import { SET_SIGN_IN_USER, SET_USER_EMAIL_SIGN_IN_START, SET_USER_GOOGLE_SIGN_IN_START, SET_USER_SIGN_OUT_START, SET_USER_SIGN_UP_START } from "../../actions/actionTypes";
import { IUserInfo } from "../../../models/interfaces/IRootReducer";

let INITIAL_USER_STATE  = {} as IUserInfo;
INITIAL_USER_STATE.currentUser = undefined;
INITIAL_USER_STATE.isUserInfoLoading = false;

export default (state= INITIAL_USER_STATE, action: IDefaultAction) => {
    switch (action.type) {
        case SET_USER_EMAIL_SIGN_IN_START:
        case SET_USER_GOOGLE_SIGN_IN_START:
        case SET_USER_SIGN_OUT_START:
        case SET_USER_SIGN_UP_START:
            return {
                ...state,
                isUserInfoLoading: true
            }
        case SET_SIGN_IN_USER:
            return {
                ...state,
                currentUser: action.payload,
                isUserInfoLoading: false
            }
        default:
            return state;
    }
}