import { generateTypes } from '../core/typeGenerator';

export const USER = generateTypes(['LOGIN', 'CHECK_SESSION', 'LOGOUT'], 'USER');

export const login = (user) => {
    return {
        type: USER.LOGIN.REQUEST,
        payload: { user }
    }
}

export const checkSession = () => {
    return {
        type: USER.CHECK_SESSION.REQUEST,
        payload: {}
    }
}

export const logout = () => {
    return {
        type: USER.LOGOUT.REQUEST,
        payload: {}
    }
}