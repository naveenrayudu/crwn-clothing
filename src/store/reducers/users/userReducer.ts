import IDefaultAction from "../../../models/interfaces/IActions";
import { SET_SIGN_IN_USER } from "../../actions/actionTypes";
import { IUserInfo } from "../../../models/interfaces/IRootReducer";

let INITIAL_USER_STATE  = {} as IUserInfo;
INITIAL_USER_STATE.currentUser = undefined;

export default (state= INITIAL_USER_STATE, action: IDefaultAction) => {
    switch (action.type) {
        case SET_SIGN_IN_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}