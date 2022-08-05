import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { loginApi, logoutApi } from '@/core/http/apis/auth';
import { ResultResponse } from '@/core/models/ResultResponse';
import { ACCESS_TOKEN_KEY } from '@/helpers/consts';
import Storage from '@/helpers/storage';

import {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutStart,
    logoutSuccess,
    logoutFailed,
} from '@/redux/slices/authSlice';

function* loginSaga(action: ReturnType<typeof loginStart>) {
    try {
        const resLogin: ResultResponse<any> = yield call(loginApi, action.payload);
        if (resLogin.success) {
            const { resource } = resLogin;
            yield Storage.set(ACCESS_TOKEN_KEY, resource.token || '');
            yield put({
                type: loginSuccess,
                payload: resource,
            });
        } else {
            yield put({ type: loginFailed, payload: resLogin.message });
        }
    } catch (error) {
        yield put({ type: loginFailed, payload: error });
    }
}

function* logoutSaga(action: ReturnType<typeof logoutStart>) {
    try {
        const resLogout: ResultResponse<any> = yield call(logoutApi, action.payload);
        if (resLogout.success) {
            yield put({
                type: logoutSuccess,
                payload: resLogout.resource,
            });
            // yield Storage.remove(ACCESS_TOKEN_KEY);
        } else {
            yield put({ type: logoutFailed, payload: resLogout.message });
        }
    } catch (error) {
        yield put({ type: logoutFailed, payload: error });
    }
}

function* watchLogin() {
    yield takeLatest(loginStart.type, loginSaga);
}
function* watchLogout() {
    yield takeLatest(logoutStart.type, logoutSaga);
}

export default function* authSaga() {
    yield all([watchLogin(), watchLogout()]);
}
