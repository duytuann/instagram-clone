import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signUpParams } from '@/core/http/apis/user/types';
import { ReduxData, ReduxStateType } from '@/redux/types';

export interface userState {
    isCreateDone: boolean;
    currentProfile: any;
    currentUserNameProfile: string | null;
}
const initialState: ReduxData<userState> = {
    data: {
        isCreateDone: false,
        currentProfile: {},
        currentUserNameProfile: null,
    },
    status: ReduxStateType.INIT,
};
const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        changeCurrentUserNameProfile: (state, action: PayloadAction<string>) => {
            state.data.currentUserNameProfile = action.payload;
        },
        createUserReset: (state, action: PayloadAction<signUpParams>) => {
            state.data.isCreateDone = false;
        },
        createUserStart: (state, action: PayloadAction<signUpParams>) => {
            state.status = ReduxStateType.LOADING;
        },
        createUserSuccess: (state, action: PayloadAction<any>) => {
            state.status = ReduxStateType.SUCCESS;
            state.data.isCreateDone = true;
        },
        createUserFailed: (state, action: PayloadAction<Error>) => {
            state.status = ReduxStateType.ERROR;
            state.data.isCreateDone = false;
        },
        getCurrentProfileStart: (state, action: PayloadAction<string>) => {
            state.status = ReduxStateType.LOADING;
            state.data.currentProfile = {};
        },
        getCurrentProfileSuccess: (state, action: PayloadAction<any>) => {
            state.status = ReduxStateType.SUCCESS;
            state.data.currentProfile = action.payload;
        },
        getCurrentProfileFailed: (state, action: PayloadAction<Error>) => {
            state.status = ReduxStateType.ERROR;
        },
        followUserStart: (state, action: PayloadAction<any>) => {
            state.status = ReduxStateType.LOADING;
        },
        followUserSuccess: (state, action: PayloadAction<any>) => {
            state.status = ReduxStateType.SUCCESS;
        },
        followUserFailed: (state, action: PayloadAction<Error>) => {
            state.status = ReduxStateType.ERROR;
        },
        unfollowUserStart: (state, action: PayloadAction<any>) => {
            state.status = ReduxStateType.LOADING;
        },
        unfollowUserSuccess: (state, action: PayloadAction<any>) => {
            state.status = ReduxStateType.SUCCESS;
        },
        unfollowUserFailed: (state, action: PayloadAction<Error>) => {
            state.status = ReduxStateType.ERROR;
        },
    },
});

export const {
    changeCurrentUserNameProfile,
    createUserReset,
    getCurrentProfileStart,
    getCurrentProfileSuccess,
    getCurrentProfileFailed,
    createUserStart,
    createUserSuccess,
    createUserFailed,
    followUserStart,
    followUserSuccess,
    followUserFailed,
    unfollowUserStart,
    unfollowUserSuccess,
    unfollowUserFailed,
} = userSlice.actions;
export default userSlice.reducer;
