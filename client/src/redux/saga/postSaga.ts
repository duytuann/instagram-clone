import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { getAllPostApi, createPostApi, likePostApi, unlikePostApi, commentPostApi } from '@/core/http/apis/post';
import { ResultResponse } from '@/core/models/ResultResponse';
import { setShowModalPostCreator } from '@/redux/slices/globalSlice';
import {
    getAllPostStart,
    getAllPostSuccess,
    getAllPostFailed,
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
} from '@/redux/slices/postSlice';

function* getAllPostSaga(action: ReturnType<typeof getAllPostStart>) {
    try {
        const response: ResultResponse<any> = yield call(getAllPostApi);
        if (response.success) {
            const { resource } = response;
            yield put({
                type: getAllPostSuccess,
                payload: resource,
            });
        } else {
            yield put({ type: getAllPostFailed, payload: response.message });
        }
    } catch (error) {
        yield put({ type: getAllPostFailed, payload: error });
    }
}

function* createPostSaga(action: ReturnType<typeof createPostStart>) {
    try {
        const response: ResultResponse<any> = yield call(createPostApi, action.payload);
        if (response.success) {
            const { resource } = response;
            yield put({
                type: createPostSuccess,
                payload: resource,
            });
            yield put({
                type: setShowModalPostCreator,
                payload: false,
            });
        } else {
            yield put({ type: createPostFailed, payload: response.message });
        }
    } catch (error) {
        yield put({ type: createPostFailed, payload: error });
    }
}

function* createCommentSaga(action: ReturnType<typeof createCommentStart>) {
    try {
        const response: ResultResponse<any> = yield call(commentPostApi, action.payload);
        if (response.success) {
            const { resource } = response;
            yield put({
                type: createCommentSuccess,
                payload: resource,
            });
        } else {
            yield put({ type: createCommentFailed, payload: response.message });
        }
    } catch (error) {
        yield put({ type: createCommentFailed, payload: error });
    }
}

function* likePostSaga(action: ReturnType<typeof likePostStart>) {
    try {
        const response: ResultResponse<any> = yield call(likePostApi, action.payload);
        if (response.success) {
            yield put({
                type: likePostSuccess,
            });
        } else {
            yield put({ type: likePostFailed, payload: response.message });
        }
    } catch (error) {
        yield put({ type: likePostFailed, payload: error });
    }
}

function* unlikePostSaga(action: ReturnType<typeof unlikePostStart>) {
    try {
        const response: ResultResponse<any> = yield call(unlikePostApi, action.payload);
        if (response.success) {
            yield put({
                type: unlikePostSuccess,
            });
        } else {
            yield put({ type: unlikePostFailed, payload: response.message });
        }
    } catch (error) {
        yield put({ type: unlikePostFailed, payload: error });
    }
}

function* watchGetAllPost() {
    yield takeLatest(getAllPostStart.type, getAllPostSaga);
}
function* watchCreate() {
    yield takeLatest(createPostStart.type, createPostSaga);
}
function* watchCreateComment() {
    yield takeLatest(createCommentStart.type, createCommentSaga);
}
function* watchLikePost() {
    yield takeLatest(likePostStart.type, likePostSaga);
}
function* watchUnlikePost() {
    yield takeLatest(unlikePostStart.type, unlikePostSaga);
}

export default function* postSaga() {
    yield all([watchCreate(), watchGetAllPost(), watchLikePost(), watchUnlikePost(), watchCreateComment()]);
}
