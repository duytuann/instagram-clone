import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { createUserApi, followUserApi, unfollowUserApi, getProfileApi, updateAvatarApi } from '@/core/http/apis/user';
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
    getCurrentProfileStart,
    getCurrentProfileSuccess,
    getCurrentProfileFailed,
    updateAvatarStart,
    updateAvatarSuccess,
    updateAvatarFailed,
} from '@/redux/slices/userSlice';

function* getCurrentProfileSaga(action: ReturnType<typeof getCurrentProfileStart>) {
    try {
        const resLogin: ResultResponse<any> = yield call(getProfileApi, action.payload);
        if (resLogin.success) {
            const { resource } = resLogin;
            yield put({
                type: getCurrentProfileSuccess,
                payload: resource,
            });
        } else {
            yield put({ type: getCurrentProfileFailed, payload: resLogin.message });
        }
    } catch (error) {
        yield put({ type: getCurrentProfileFailed, payload: error });
    }
}

function* updateAvatarSaga(action: ReturnType<typeof updateAvatarStart>) {
    try {
        const response: ResultResponse<any> = yield call(updateAvatarApi, action.payload);
        if (response.success) {
            const { resource } = response;
            yield put({
                type: updateAvatarSuccess,
                payload: resource,
            });
        } else {
            yield put({ type: updateAvatarFailed, payload: response.message });
        }
    } catch (error) {
        yield put({ type: updateAvatarFailed, payload: error });
    }
}

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

function* watchCreate() {
    yield takeLatest(updateAvatarStart.type, updateAvatarSaga);
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
function* watchGetCurrentProfile() {
    yield takeLatest(getCurrentProfileStart.type, getCurrentProfileSaga);
}

export default function* userSaga() {
    yield all([watchCreateUser(), watchFollowUser(), watchUnfollowUser(), watchGetCurrentProfile(), watchCreate()]);
}
