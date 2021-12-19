import React from 'react';
import { useSelector } from "react-redux";
import { Redirect, Link } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { CircularProgress, Grid, Container, Button } from '@mui/material';
import { Alert } from '@mui/lab';

import queries from '../queries';
import Post from './Post';

function PostFeed() {
    const currentUser = useSelector((state) => state.user);
    const {data, loading, error} = useQuery(queries.GET_POSTS);

    const buildPosts = data && data.getPosts.map((post, index) => {
        return (
            <Grid key = {index} item xs={12}>
                <Post key = {index} post={post}/>
            </Grid>
        );
    });

    if (currentUser._id === -1) {
        return (<Redirect to='/login'/>);
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

    if (error) {
        return (
            <Container fixed>
                <Alert severity="error">Error: 404 Not Found</Alert>
            </Container>
        );
    }

    return (
    <Container fixed>
        <h1 style={{textAlign: 'center'}}>All Posts</h1>
        <Button
                    variant="outlined"
                    color="primary"
                >   
                    <Link to="/new-post">
                    Make a New Post
                    </Link>
                </Button>
        <br></br>
        <Grid
            container
            spacing = {4}
        >
            {buildPosts}
        </Grid>
    </Container>);
}

export default PostFeed;