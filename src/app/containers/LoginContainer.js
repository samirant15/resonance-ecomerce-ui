import React from 'react';
import { connect } from 'react-redux';
import * as userActions from '../redux/user/userActions';
import Login from '../screens/Login';

const LoginContainer = (props) => (
    <Login {...props} />
);

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(userActions.login(user)),
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.userReducer.loading,
        loggedUser: state.userReducer.loggedUser,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);