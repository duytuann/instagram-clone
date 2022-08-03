import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { createPostApi } from '@/core/http/apis/post';
import { ResultResponse } from '@/core/models/ResultResponse';
import { setShowModalPostCreator } from '@/redux/slices/globalSlice';
import { createPostStart, createPostSuccess, createPostFailed } from '@/redux/slices/postSlice';

function* createPostSaga(action: ReturnType<typeof createPostStart>) {
    try {
        const resLogin: ResultResponse<any> = yield call(createPostApi, action.payload);
        if (resLogin.success) {
            const { resource } = resLogin;
            yield put({
                type: createPostSuccess,
                payload: resource,
            });
            yield put({
                type: setShowModalPostCreator,
                payload: false,
            });
        } else {
            yield put({ type: createPostFailed, payload: resLogin.message });
        }
    } catch (error) {
        yield put({ type: createPostFailed, payload: error });
    }
}

function* watchCreate() {
    yield takeLatest(createPostStart.type, createPostSaga);
}

export default function* postSaga() {
    yield all([watchCreate()]);
}
