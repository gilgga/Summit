import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import actions from '../actions';

function Logout() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user);

    if (currentUser._id === -1) {
        return (<Redirect to='/login'/>);
    } else {
        dispatch(actions.logUserOut(currentUser._id));
        return (<Redirect to='/login'/>);
    }
}

export default Logout;