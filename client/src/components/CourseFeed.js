import {react } from 'react';
import { v4 as uuid} from 'uuid';
import randomColor from 'randomcolor';

import {
    Container
} from '@mui/material';

import {
    Grid,
    Button,
} from '@material-ui/core';

import Course from './Course';

const exampleCourses = [
    {
        id: uuid(),
        name: "CS 115",
        description: "Discussion for our CS Freshman",
        usersEnrolled: 90,
    },
    {
        id: uuid(),
        name: "E 101",
        description: "A super necessary course for all engineers to take",
        usersEnrolled: 1000,
    },
    {
        id: uuid(),
        name: "PE 200",
        description: "plz stevens",
        usersEnrolled: 123,
    },

];

const buildCourses = exampleCourses && exampleCourses.map((course, index) => {
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

const CourseFeed = (props) => {
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