import randomColor from '../utils/randomColor';
import { useQuery } from '@apollo/client';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import {
    Container
} from '@mui/material';

import {
    Grid
} from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

import Course from './Course';
import queries from '../queries';


const CourseFeed = (props) => {
    const {data, loading, error} = useQuery(queries.GET_COURSES);
    const currentUser = useSelector((state) => state.user);
    const {data: data_user, loading: loading_user, error: error_user} = useQuery(queries.GET_USER, {
        variables: {userid: currentUser._id},
        skip: !currentUser,
        fetchPolicy: "network-only"
    })
    let buildCourses = null;
    if (loading_user){}
    if (error_user){}
    if(data_user){
        console.log(data_user)
        buildCourses = data && data.getCourses && data.getCourses.map((course, index) => {
            return (
                <Grid key = {index} item xs={12}>
                    <Course 
                        key = {index} 
                        user = {data_user.getUser}
                        course={course} 
                        maxwidth = {"100%"}
                        avatarColor = {randomColor()}
                    />
                </Grid>
            )
        });
    }

    if (currentUser._id === -1) {
        return (<Redirect to='/login'/>);
    }
    
    if ( loading ) {
        return (
            <Container fixed>
                <CircularProgress />
            </Container>
        )
    } else if ( error ) {
        return (
            <Container fixed>
                <Alert severity="error">Error: 404 Not Found</Alert>
            </Container>
        )
    } else {
        return (
            <Container fixed>
                <Grid
                    container
                    spacing = {4}
                >
                    {buildCourses}
                </Grid>
            </Container>
        )
    }
};

export default CourseFeed;