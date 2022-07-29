import { all } from 'redux-saga/effects';
import authSaga from '@/redux/saga/authSaga';
import postSaga from '@/redux/saga/postSaga';
import userSaga from '@/redux/saga/userSaga';

export default function* rootSaga() {
    yield all([authSaga(), postSaga(), userSaga()]);
}
