import { all } from 'redux-saga/effects';
import authSaga from '@/redux/saga/authSaga';
// import userSaga from "..."

export default function* rootSaga() {
    yield all([authSaga()]);
}
