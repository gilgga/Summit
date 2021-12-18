import randomColor from 'randomcolor';
import { useQuery } from '@apollo/client';

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
    const buildCourses = data && data.getCourses && data.getCourses.map((course, index) => {
        return (
            <Grid key = {index} item xs={12}>
                <Course 
                    key = {index} 
                    course={course} 
                    maxwidth = {"100%"}
                    avatarColor = {randomColor()}
                />
            </Grid>
        )
    });
    
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