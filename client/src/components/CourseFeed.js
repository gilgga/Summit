import {react, useState } from 'react';
import { v4 as uuid} from 'uuid';
import randomColor from 'randomcolor';
import { useQuery } from '@apollo/client';

import {
    Container
} from '@mui/material';

import {
    Grid,
    Button,
} from '@material-ui/core';

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
};

export default CourseFeed;