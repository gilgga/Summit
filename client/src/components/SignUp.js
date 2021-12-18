import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { Alert } from '@mui/lab';

import queries from '../queries';
import validate from '../validate';
import actions from '../actions';

function SignUp() {
    const [ emailError, setEmailError ]=useState(false);
    const [ passError, setPassError ]=useState(false);
    const currentUser = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [ createUser, { data, loading, error }] = useMutation(queries.CREATE_USER);


    const createAccount = async (e) => {
        e.preventDefault();
        setEmailError(false);
        setPassError(false);

        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        let email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Check user input
        if (!firstName) throw Error('Please enter your first name.');
        if (!lastName) throw Error('Please enter your last name.');
        if (!email) throw Error('Please enter an email.');
        if (!password) throw Error('Please enter a password.');
        if (!validate.email(email)){
            setEmailError(true);
            return;
        }
        if (!validate.password(password)) {
            setPassError(true);
            return;
        }

        // Authenticate user
        email = email.toLowerCase();
        createUser({ variables: { email: email, password: password, firstName: firstName, lastName: lastName }})
    }

    if (currentUser._id !== -1) {
        return (<Redirect to={`/user-profile/${currentUser._id}`}/>);
    }

    if (data) {
        dispatch(actions.logUserIn(data.createUser));
        return (<Redirect to={`/user-profile/${data.createUser._id}`}/>);
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
                <form id='login-form' onSubmit={createAccount}>
                <TextField style={{paddingBottom:10}} id="firstName" label='First Name' placeholder='Enter first name' variant="standard" fullWidth required/>
                    <TextField style={{paddingBottom:10}} id="lastName" label='Last Name' placeholder='Enter last name' variant="standard" fullWidth required/>
                    <TextField style={{paddingBottom:10}} id="email" label='Email' placeholder='Enter username' variant="standard" fullWidth required/>
                    <TextField style={{paddingBottom:10}} id="password" label='Password' placeholder='Enter password' type='password' variant="standard" fullWidth required/>
                    <Button type='submit' color='primary' variant="contained" style={{margin:'8px 0'}} fullWidth>Create Account</Button>
                </form>
                {emailError && <Alert severity="error">Invalid email address</Alert>}
                {passError && <Alert severity="error">Password must contain at least 8 characters long with at least 1 uppercase letter, lowercase letter, and number.</Alert>}
                {error && <Alert severity="error">Could not create account with given email.</Alert>}
                <Typography > Already have an account? 
                     <Link to="/login" >
                        Log in 
                    </Link>
                </Typography>
            </Grid>
    )
}

export default SignUp;