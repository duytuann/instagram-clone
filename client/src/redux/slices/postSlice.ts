import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreatePostParams } from '@/core/http/apis/post/types';
import { ReduxData, ReduxStateType } from '@/redux/types';

export type CurrentAction = 'create' | 'update' | 'delete' | null;

export interface postState {
    posts: [];
    cursor: any;
    selectedPost: any;
    currentAction: any;
}
const initialState: ReduxData<postState> = {
    data: {
        posts: [],
        cursor: null,
        selectedPost: null,
        currentAction: null,
    },
    status: ReduxStateType.INIT,
};
const postSlice = createSlice({
    name: 'postSlice',
    initialState,
    reducers: {
        setCurrentAction: (state, action: PayloadAction<CurrentAction>) => {
            state.data.currentAction = action.payload;
        },

        createPostStart: (state, action: PayloadAction<CreatePostParams>) => {
            state.status = ReduxStateType.LOADING;
        },
        createPostSuccess: (state, action: PayloadAction<any>) => {
            state.status = ReduxStateType.SUCCESS;
        },
        createPostFailed: (state, action: PayloadAction<Error>) => {
            state.status = ReduxStateType.ERROR;
        },
    },
});

export const { setCurrentAction, createPostStart, createPostSuccess, createPostFailed } = postSlice.actions;
export default postSlice.reducer;
