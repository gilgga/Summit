import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from 'react-router-dom';
import { useLazyQuery } from "@apollo/client";
import { Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { Paper } from '@material-ui/core';
import { Alert } from '@mui/lab';

import queries from '../queries';
import validate from '../validate';
import actions from '../actions';

function Login() {
    const [ loginError, setLoginError ]=useState(false);
    const currentUser = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [ login, { loading, error, data }] = useLazyQuery(queries.LOGIN_USER);

    const logUserIn = async (e) => {
        e.preventDefault();

        let email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Check user input
        if (!email) throw Error('Please enter an email.');
        if (!password) throw Error('Please enter a password.');
        if (!validate.email(email) || !validate.password(password)) {
            setLoginError(true);
            return;
        }

        // Authenticate user
        email = email.toLowerCase();
        login({ variables: { email: email, password: password }});
        
    }

    if (currentUser._id !== -1) {
        return (<Redirect to={`/user-profile/${currentUser._id}`}/>);
    }

    if (data) {
        dispatch(actions.logUserIn(data.loginUser));
        return (<Redirect to={`/user-profile/${data.loginUser._id}`}/>);
    }

    if (loading) {
		return (
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justifyContent="center"
				style={{ minHeight: '100vh' }}
			>
				<CircularProgress/>
			</Grid>
		);
	}

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '65vh' }}
        >
            
                    <Grid align='center'>
                    <h2>Log In</h2>
                </Grid>
                <form id='login-form' onSubmit={logUserIn}>
                    <TextField style={{paddingBottom:10}} id="email" label='Email' placeholder='Enter username' variant="standard" fullWidth required/>
                    <TextField style={{paddingBottom:10}} id="password" label='Password' placeholder='Enter password' type='password' variant="standard" fullWidth required/>
                    <Button type='submit' color='primary' variant="contained" style={{margin:'8px 0'}} fullWidth>Login</Button>
                </form>
                {(loginError || error) && <Alert severity="error">Your login credentials could not be verified, please try again.</Alert>}
                <Typography > Don't have an account? {" "}
                     <Link to="/sign-up" >
                        Sign Up here
                    </Link>
                </Typography>
        </Grid>
    )
}

export default Login;