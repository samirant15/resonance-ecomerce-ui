import * as actions from './userActions';

const INIT_STATE = {
    loading: false,
    uploading: false,
    loggedUser: null,
    user: null,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        // LOGIN
        case actions.USER.LOGIN.REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actions.USER.LOGIN.SUCCESS:
            return {
                ...state,
                loading: false,
                loggedUser: action.payload
            }
        case actions.USER.LOGIN.FAIL:
            return {
                ...state,
                loading: false,
            }
        // SIGNUP
        case actions.USER.SIGNUP.REQUEST:
            return {
                ...state,
                uploading: true,
            }
        case actions.USER.SIGNUP.SUCCESS:
            return {
                ...state,
                uploading: false,
                loggedUser: action.payload
            }
        case actions.USER.SIGNUP.FAIL:
            return {
                ...state,
                uploading: false,
            }
        default:
            return state;
    }
}