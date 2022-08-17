import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '@/core/models/Post';
import { CreateComment, GetCommentOfPostParams } from '@/core/http/apis/post/types';
import { ReduxData, ReduxStateType } from '@/redux/types';

export type CurrentAction = 'create' | 'update' | 'delete' | null;

interface ICurrentComment {
    totalCount: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
    data: Array<any>;
}

export interface postState {
    posts: Post[];
    currentPostDetail: any;
    currentComment: ICurrentComment;
    commentPaging: any;
}
const initialState: ReduxData<postState> = {
    data: {
        posts: [],
        currentPostDetail: {},
        currentComment: {} as ICurrentComment,
        commentPaging: {
            pageNumber: 1,
            pageSize: 10,
        },
    },
    status: ReduxStateType.INIT,
};
const postSlice = createSlice({
    name: 'postSlice',
    initialState,
    reducers: {
        putLike: (state, action: PayloadAction<string>) => {
            const post = state.data.posts.find((p) => p.postId === action.payload);
            if (post) {
                post.isLiked = true;
                post.likes++;
            }
        },
        putUnlike: (state, action: PayloadAction<string>) => {
            const post = state.data.posts.find((p) => p.postId === action.payload);
            if (post) {
                post.isLiked = false;
                post.likes--;
            }
        },
        addComment: (state, action: PayloadAction<CreateComment>) => {
            const post = state.data.posts.find((p) => p.postId === action.payload.postId);
            if (post) {
                post.comments.push(action.payload);
            }
        },
        clearPostDetail: (state, action: PayloadAction) => {
            state.data.currentPostDetail = {};
            state.data.commentPaging.pageNumber = 1;
            state.data.currentComment = {} as ICurrentComment;
        },
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
        getDetailByPostIdStart: (state, action: PayloadAction<string>) => {
            state.data.currentPostDetail = {};
            state.status = ReduxStateType.LOADING;
        },
        getDetailByPostIdSuccess: (state, action: PayloadAction<any>) => {
            state.status = ReduxStateType.SUCCESS;
            state.data.currentPostDetail = action.payload;
        },
        getDetailByPostIdFailed: (state, action: PayloadAction<Error>) => {
            state.status = ReduxStateType.ERROR;
        },
        getCommentOfPostStart: (state, action: PayloadAction<GetCommentOfPostParams>) => {
            state.status = ReduxStateType.LOADING;
        },
        getCommentOfPostSuccess: (state, action: PayloadAction<any>) => {
            state.status = ReduxStateType.SUCCESS;

            let temp = state.data.currentComment.data;
            let afterFetch = {
                ...action.payload,
            };

            if (temp) {
                afterFetch.data = temp.concat(action.payload.data);
            }

            state.data.currentComment = afterFetch;

            let nextPage = state.data.commentPaging.pageNumber + 1;
            state.data.commentPaging.pageNumber = nextPage;
        },
        getCommentOfPostFailed: (state, action: PayloadAction<Error>) => {
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
        createCommentStart: (state, action: PayloadAction<CreateComment>) => {
            state.status = ReduxStateType.LOADING;
        },
        createCommentSuccess: (state, action: PayloadAction<any>) => {
            state.status = ReduxStateType.SUCCESS;
        },
        createCommentFailed: (state, action: PayloadAction<Error>) => {
            state.status = ReduxStateType.ERROR;
        },
        likePostStart: (state, action: PayloadAction<any>) => {
            state.status = ReduxStateType.LOADING;
        },
        likePostSuccess: (state, action: PayloadAction<any>) => {
            state.status = ReduxStateType.SUCCESS;
        },
        likePostFailed: (state, action: PayloadAction<Error>) => {
            state.status = ReduxStateType.ERROR;
        },
        unlikePostStart: (state, action: PayloadAction<any>) => {
            state.status = ReduxStateType.LOADING;
        },
        unlikePostSuccess: (state, action: PayloadAction<any>) => {
            state.status = ReduxStateType.SUCCESS;
        },
        unlikePostFailed: (state, action: PayloadAction<Error>) => {
            state.status = ReduxStateType.ERROR;
        },
    },
});

export const {
    clearPostDetail,
    putLike,
    putUnlike,
    addComment,
    getAllPostStart,
    getAllPostSuccess,
    getAllPostFailed,
    getDetailByPostIdStart,
    getDetailByPostIdSuccess,
    getDetailByPostIdFailed,
    getCommentOfPostStart,
    getCommentOfPostSuccess,
    getCommentOfPostFailed,
    createPostStart,
    createPostSuccess,
    createPostFailed,
    createCommentStart,
    createCommentSuccess,
    createCommentFailed,
    likePostStart,
    likePostSuccess,
    likePostFailed,
    unlikePostStart,
    unlikePostSuccess,
    unlikePostFailed,
} = postSlice.actions;
export default postSlice.reducer;
