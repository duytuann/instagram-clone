import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { getAllPostApi, createPostApi } from '@/core/http/apis/post';
import { ResultResponse } from '@/core/models/ResultResponse';
import { setShowModalPostCreator } from '@/redux/slices/globalSlice';
import {
    getAllPostStart,
    getAllPostSuccess,
    getAllPostFailed,
    createPostStart,
    createPostSuccess,
    createPostFailed,
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

function* watchGetAllPost() {
    yield takeLatest(getAllPostStart.type, getAllPostSaga);
}
function* watchCreate() {
    yield takeLatest(createPostStart.type, createPostSaga);
}

export default function* postSaga() {
    yield all([watchCreate(), watchGetAllPost()]);
}
