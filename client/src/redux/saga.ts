import { all } from 'redux-saga/effects';
import authSaga from '@/redux/saga/authSaga';
import postSaga from '@/redux/saga/postSaga';

export default function* rootSaga() {
    yield all([authSaga(), postSaga()]);
}
