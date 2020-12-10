import { takeLatest, call, put, select } from "redux-saga/effects";
import * as actions from './userActions';
import * as graphqlClient from '../core/graphqlClient';
import GraphQLError from '../../exceptions/GraphQLError';
import * as selector from './userSelectors';
import history from '../../../history';
import { mainScreen } from '../../config/routeConfig'
import { notification } from "antd";

function* login(action) {
    try {
        const query = `
        {
            login(
                email: "${action.payload.user.email}",
                password: "${action.payload.user.password}"
            ) {
                id,
                firstName,
                lastName,
                email,
                username,
                password,
                token
            }
        }
        `;

        const res = yield call(graphqlClient.plainRequest, query);

        let user = res.data.data.login;
        yield localStorage.setItem('token', user.token);
        yield localStorage.setItem('user', JSON.stringify(user));
        yield put({ type: actions.USER.LOGIN.SUCCESS, payload: user });
        history.push(mainScreen);
    } catch (error) {
        yield put({ type: actions.USER.LOGIN.FAIL, payload: error.message })
        if (error instanceof GraphQLError) {
            notification.error({ message: '¡Login Error! \n ' + error.message });
            return
        }
        notification.error({ message: '¡Login Error! \n Try again later' });
    }
}

function* checkSession() {
    try {

        const token = yield localStorage.getItem('token');
        if (!token) {
            if (window.location.pathname !== '/')
                history.push('/');
            return;
        }

        const query = `
        {
            me {
                id,
                firstName,
                lastName,
                email,
                username,
                password,
                token
            }
        }
        `;

        const res = yield call(graphqlClient.requestWithAuth, query);

        let user = res.data.data.me;
        if (!user) {
            notification.error({ message: 'Please Log in' });
            yield put({ type: actions.USER.CHECK_SESSION.FAIL, payload: 'Invalid Token' })
            history.push('/');
        }

        yield put({ type: actions.USER.CHECK_SESSION.SUCCESS, payload: user });
        if (window.location.pathname === '/')
            history.push(mainScreen);

    } catch (error) {
        notification.error({ message: 'Please Log in' });
        yield localStorage.removeItem('token');
        yield localStorage.removeItem('user');
        yield put({ type: actions.USER.LOGIN.FAIL, payload: error.message })
        history.push('/');
    }
}

function* logout() {
    notification.info({ message: 'Logged out' });
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('user');
    yield put({ type: actions.USER.LOGOUT.SUCCESS })
    history.push('/');
}

function* mySaga() {
    yield takeLatest(actions.USER.LOGIN.REQUEST, login);
    yield takeLatest(actions.USER.CHECK_SESSION.REQUEST, checkSession);
    yield takeLatest(actions.USER.LOGOUT.REQUEST, logout);
}

export default mySaga;