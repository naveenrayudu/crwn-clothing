export interface IUserSignIn {
    email: string,
    password: string
}

export interface IUserSignUp {
    email: string,
    password: string,
    fullName: string
}

export interface ISignedInUserInfo {
    displayName: string | null,
    email: string | null,
    emailVerified: boolean,
    photoUrl?: string | null,
    uid: string
}