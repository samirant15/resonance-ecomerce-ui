import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../redux/user/userActions';
import AppLayout from '../screens/AppLayout';

const AppLayoutContainer = (props) => {

    useEffect(() => {
        props.checkSession();
    }, []);

    return <AppLayout {...props} />
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkSession: () => dispatch(userActions.checkSession()),
        logout: () => dispatch(userActions.logout()),
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.userReducer.loading,
        loggedUser: state.userReducer.loggedUser,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppLayoutContainer);