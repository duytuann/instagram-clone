import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { createUserApi, followUserApi, unfollowUserApi } from '@/core/http/apis/user';
import { ResultResponse } from '@/core/models/ResultResponse';
import {
    createUserStart,
    createUserSuccess,
    createUserFailed,
    followUserStart,
    followUserSuccess,
    followUserFailed,
    unfollowUserStart,
    unfollowUserSuccess,
    unfollowUserFailed,
} from '@/redux/slices/userSlice';

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

function* followUserSaga(action: ReturnType<typeof followUserStart>) {
    try {
        const response: ResultResponse<any> = yield call(followUserApi, action.payload);
        if (response.success) {
            yield put({
                type: followUserSuccess,
            });
        } else {
            yield put({ type: followUserFailed, payload: response.message });
        }
    } catch (error) {
        yield put({ type: followUserFailed, payload: error });
    }
}

function* unfollowUserSaga(action: ReturnType<typeof unfollowUserStart>) {
    try {
        const response: ResultResponse<any> = yield call(unfollowUserApi, action.payload);
        if (response.success) {
            yield put({
                type: unfollowUserSuccess,
            });
        } else {
            yield put({ type: unfollowUserFailed, payload: response.message });
        }
    } catch (error) {
        yield put({ type: unfollowUserFailed, payload: error });
    }
}

function* watchCreateUser() {
    yield takeLatest(createUserStart.type, createUserSaga);
}
function* watchFollowUser() {
    yield takeLatest(followUserStart.type, followUserSaga);
}
function* watchUnfollowUser() {
    yield takeLatest(unfollowUserStart.type, unfollowUserSaga);
}

export default function* userSaga() {
    yield all([watchCreateUser(), watchFollowUser(), watchUnfollowUser()]);
}
