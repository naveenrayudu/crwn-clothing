import { ISignedInUserInfo } from "./IUserAccount";

export interface IUserInfo {
    currentUser: ISignedInUserInfo | undefined,
    isUserInfoLoading: boolean
}

