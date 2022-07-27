import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginParams, ChangePassUserRequestParams } from '@/core/http/apis/auth/types';
// import { UpdateAvatarUserParams } from '@/core/http/apis/user/types';
import { User, UserToken } from '@/core/models/User';
import { ReduxData, ReduxStateType } from '@/redux/types';

export interface AuthState {
    isAuthenticated: boolean;
    user: User;
    userToken: UserToken;
    userInfo: any;
}
const initialState: ReduxData<AuthState> = {
    data: {
        isAuthenticated: false,
        user: {},
        userToken: {},
        userInfo: {},
    },
    status: ReduxStateType.INIT,
};
const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        loginStart: (state, action: PayloadAction<LoginParams>) => {
            state.status = ReduxStateType.LOADING;
            state.error = undefined;
        },
        loginSuccess: (state, action: PayloadAction<any>) => {
            state.status = ReduxStateType.SUCCESS;
            state.data.isAuthenticated = true;
            state.data.user = action.payload;
            state.data.userToken = action.payload.token;
        },
        loginFailed: (state, action: PayloadAction<Error>) => {
            state.status = ReduxStateType.ERROR;
            state.data.isAuthenticated = false;
            state.error = action.payload;
        },

        logoutStart: (state, action: PayloadAction) => {
            state.status = ReduxStateType.LOADING;
            state.error = undefined;
        },
        logoutSuccess: (state) => {
            state.status = ReduxStateType.SUCCESS;
            state.data.isAuthenticated = false;
            state.data.user = {};
            state.data.userToken = {};
        },
        logoutFailed: (state, action: PayloadAction<Error>) => {
            state.status = ReduxStateType.ERROR;
            state.data.isAuthenticated = false;
            state.error = action.payload;
        },

        changePasswordStart: (state, action: PayloadAction<ChangePassUserRequestParams>) => {
            state.status = ReduxStateType.LOADING;
            state.error = undefined;
        },
        changePasswordSuccess: (state, action: PayloadAction) => {
            state.status = ReduxStateType.SUCCESS;
        },
        changePasswordFailed: (state, action: PayloadAction<Error>) => {
            state.status = ReduxStateType.ERROR;
            state.error = action.payload;
        },

        getInfoUserByIDStart: (state, action: PayloadAction<any>) => {
            state.status = ReduxStateType.LOADING;
            state.error = undefined;
        },
        getInfoUserByIDSuccess: (state, action: PayloadAction<any>) => {
            state.status = ReduxStateType.SUCCESS;
            state.data.userInfo = action.payload;
        },
        getInfoUserByIDFailed: (state, action: PayloadAction<Error>) => {
            state.status = ReduxStateType.ERROR;
            state.error = action.payload;
        },

        // updateAvatarUserStart: (state, action: PayloadAction<UpdateAvatarUserParams>) => {
        //     state.status = ReduxStateType.LOADING;
        //     state.error = undefined;
        // },
        // updateAvatarUserSuccess: (state, action: PayloadAction) => {
        //     state.status = ReduxStateType.SUCCESS;
        // },
        // updateAvatarUserFailed: (state, action: PayloadAction<Error>) => {
        //     state.status = ReduxStateType.ERROR;
        //     state.error = action.payload;
        // },
    },
});

export const {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutStart,
    logoutSuccess,
    logoutFailed,
    changePasswordStart,
    changePasswordSuccess,
    changePasswordFailed,
    getInfoUserByIDStart,
    getInfoUserByIDSuccess,
    getInfoUserByIDFailed,
    // updateAvatarUserStart,
    // updateAvatarUserSuccess,
    // updateAvatarUserFailed,
} = authSlice.actions;
export default authSlice.reducer;
