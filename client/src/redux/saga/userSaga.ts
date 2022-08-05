import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { createUserApi } from '@/core/http/apis/user';
import { ResultResponse } from '@/core/models/ResultResponse';
import { createUserStart, createUserSuccess, createUserFailed } from '@/redux/slices/userSlice';

function* createUserSaga(action: ReturnType<typeof createUserStart>) {
    try {
        const resLogin: ResultResponse<any> = yield call(createUserApi, action.payload);
        if (resLogin.success) {
            yield put({
                type: createUserSuccess,
                payload: resLogin.message,
            });
        } else {
            yield put({ type: createUserFailed, payload: resLogin.message });
        }
    } catch (error) {
        yield put({ type: createUserFailed, payload: error });
    }
}

function* watchCreate() {
    yield takeLatest(createUserStart.type, createUserSaga);
}

export default function* userSaga() {
    yield all([watchCreate()]);
}
