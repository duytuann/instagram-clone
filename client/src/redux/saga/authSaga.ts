import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { loginApi } from '@/core/http/apis/auth';
// import { getOneByUserIDApi, updateAvatarUserApi } from 'core/http/apis/user';
import LoginInterface from '@/core/models/Login';
import { ResultResponse } from '@/core/models/ResultResponse';
import { ACCESS_TOKEN_KEY } from '@/helper/consts';
import Storage from '@/helper/storage';

import {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutStart,
    logoutSuccess,
    logoutFailed,
    changePasswordStart,
    changePasswordSuccess,
    changePasswordFailed,
    getInfoUserByIDStart,
    getInfoUserByIDSuccess,
    getInfoUserByIDFailed,
    // updateAvatarUserStart,
    // updateAvatarUserSuccess,
    // updateAvatarUserFailed,
} from '@/redux/slices/authSlice';

function* loginSaga(action: ReturnType<typeof loginStart>) {
    try {
        const resLogin: ResultResponse<any> = yield call(loginApi, action.payload);
        if (resLogin.isOk) {
            const {
                Object: { User, UserToken },
            } = resLogin;
            yield Storage.set(ACCESS_TOKEN_KEY, UserToken.Token || '');
            yield put({
                type: loginSuccess,
                payload: { user: User, userToken: UserToken },
            });
        } else {
            yield put({ type: loginFailed, payload: resLogin.Object });
        }
    } catch (error) {
        yield put({ type: loginFailed, payload: error });
    }
}

// function* logoutSaga(action: ReturnType<typeof logoutStart>) {
//     try {
//         const resLogout: ResultResponse<any> = yield call(logoutApi);
//         if (resLogout.isOk) {
//             yield put({
//                 type: logoutSuccess,
//                 payload: resLogout.Object,
//             });
//             yield Storage.remove(ACCESS_TOKEN_KEY);
//         } else {
//             toast.error(resLogout.Object);
//             yield put({ type: logoutFailed, payload: resLogout.Object });
//         }
//     } catch (error) {
//         yield put({ type: logoutFailed, payload: error });
//     }
// }

// function* changePasswordSaga(action: ReturnType<typeof changePasswordStart>) {
//     try {
//         const res: ResultResponse<any> = yield call(changePasswordApi, action.payload);
//         if (res.isOk) {
//             yield put({ type: changePasswordSuccess.type, payload: res.Object });
//             toast.success('Đổi mật khẩu thành công!');
//         } else {
//             toast.error(res.Object);
//             yield put({ type: changePasswordFailed.type, payload: res.Object });
//         }
//     } catch (error) {
//         yield put({ type: changePasswordFailed.type, payload: error });
//         toast.error('Có lỗi xảy ra không đổi mật khẩu được');
//     }
// }

// function* getInfoUserByIDSaga(action: ReturnType<typeof getInfoUserByIDStart>) {
//     try {
//         const res: ResultResponse<any> = yield call(getOneByUserIDApi, action.payload);
//         if (res.isOk) {
//             yield put({ type: getInfoUserByIDSuccess.type, payload: res.Object });
//         } else {
//             toast.error(res.Object);
//             yield put({ type: getInfoUserByIDFailed.type, payload: res.Object });
//         }
//     } catch (error) {
//         yield put({ type: getInfoUserByIDFailed.type, payload: error });
//         toast.error('Có lỗi xảy ra không thể lấy thông tin người dùng!');
//     }
// }

// function* updateAvatarUserSaga(action: ReturnType<typeof updateAvatarUserStart>) {
//     try {
//         const res: ResultResponse<any> = yield call(updateAvatarUserApi, action.payload);
//         if (res.isOk) {
//             yield put({ type: updateAvatarUserSuccess.type, payload: res.Object });
//             toast.success('Cập nhật ảnh đại diện thành công!');
//         } else {
//             toast.error(res.Object);
//             yield put({ type: updateAvatarUserFailed.type, payload: res.Object });
//         }
//     } catch (error) {
//         yield put({ type: updateAvatarUserFailed.type, payload: error });
//         toast.error('Có lỗi xảy ra vui lòng thử lại sau!');
//     }
// }

function* watchLogin() {
    yield takeLatest(loginStart.type, loginSaga);
}
// function* watchLogout() {
//     yield takeLatest(logoutStart.type, logoutSaga);
// }

// function* watchChangePassword() {
//     yield takeLatest(changePasswordStart.type, changePasswordSaga);
// }
// function* watchGetInfoUserByID() {
//     yield takeLatest(getInfoUserByIDStart.type, getInfoUserByIDSaga);
// }
// function* watchUpdateAvatarUser() {
//     yield takeLatest(updateAvatarUserStart.type, updateAvatarUserSaga);
// }

export default function* authSaga() {
    yield all([watchLogin()]);
}
