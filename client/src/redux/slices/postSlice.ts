import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '@/core/models/Post';
import { ReduxData, ReduxStateType } from '@/redux/types';

export type CurrentAction = 'create' | 'update' | 'delete' | null;

export interface postState {
    posts: Post[];
}
const initialState: ReduxData<postState> = {
    data: {
        posts: [],
        // cursor: null,
        // selectedPost: null,
        // currentAction: null,
    },
    status: ReduxStateType.INIT,
};
const postSlice = createSlice({
    name: 'postSlice',
    initialState,
    reducers: {
        getAllPostStart: (state, action: PayloadAction) => {
            state.status = ReduxStateType.LOADING;
        },
        getAllPostSuccess: (state, action: PayloadAction<any>) => {
            state.status = ReduxStateType.SUCCESS;
            state.data.posts = action.payload;
        },
        getAllPostFailed: (state, action: PayloadAction<Error>) => {
            state.status = ReduxStateType.ERROR;
        },
        createPostStart: (state, action: PayloadAction<FormData>) => {
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

export const {
    getAllPostStart,
    getAllPostSuccess,
    getAllPostFailed,
    createPostStart,
    createPostSuccess,
    createPostFailed,
} = postSlice.actions;
export default postSlice.reducer;
