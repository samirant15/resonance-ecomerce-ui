import React from 'react';
import { connect } from 'react-redux';
import * as userActions from '../redux/user/userActions';
import SignUp from '../screens/SignUp';

const SignUpContainer = (props) => (
    <SignUp {...props} />
);

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (user) => dispatch(userActions.signup(user)),
    }
}

const mapStateToProps = (state) => {
    return {
        uploading: state.userReducer.uploading,
        loggedUser: state.userReducer.loggedUser,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);