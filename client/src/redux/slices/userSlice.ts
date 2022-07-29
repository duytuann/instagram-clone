import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signUpParams } from '@/core/http/apis/user/types';
import { ReduxData, ReduxStateType } from '@/redux/types';

export interface userState {}
const initialState: ReduxData<userState> = {
    data: {},
    status: ReduxStateType.INIT,
};
const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        createUserStart: (state, action: PayloadAction<signUpParams>) => {
            state.status = ReduxStateType.LOADING;
        },
        createUserSuccess: (state, action: PayloadAction<any>) => {
            state.status = ReduxStateType.SUCCESS;
            // update state
        },
        createUserFailed: (state, action: PayloadAction<Error>) => {
            state.status = ReduxStateType.ERROR;
            // update state
        },
    },
});

export const { createUserStart, createUserSuccess, createUserFailed } = userSlice.actions;
export default userSlice.reducer;
