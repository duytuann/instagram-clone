export interface LoginParams {
    username: string;
    password: string;
}
export interface LogOutParams {
    refresh_token: string;
    code_verifier: string;
}
export interface ForgetPasswordParams {
    masterAccount: string;
    customerId: string;
}

export interface ChangePassUserRequestParams {
    PasswordNew: string;
    PasswordOld: string;
}
