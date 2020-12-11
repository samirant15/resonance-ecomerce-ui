import { all, fork } from 'redux-saga/effects';
import userSaga from "../user/userSaga";
import furnitureSaga from "../furniture/furnitureSaga";

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(furnitureSaga),
    ]);
}