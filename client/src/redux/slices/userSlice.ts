import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signUpParams } from '@/core/http/apis/user/types';
import { ReduxData, ReduxStateType } from '@/redux/types';

export interface userState {
    isCreateDone: boolean;
}
const initialState: ReduxData<userState> = {
    data: {
        isCreateDone: false,
    },
    status: ReduxStateType.INIT,
};
const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
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
