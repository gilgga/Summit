import {useState, useEffect} from 'react';

import randomColor from 'randomcolor';

import {
    Grid,
    Button
} from '@material-ui/core';

import { 
    Container,
} from '@mui/material';

import Course from '../Course'

const Courses = (props) => {
    const {courses} = props;

    const maxCourses = 3;

    const [expanded, setExpanded] = useState(false);
    const [numCourses, setNumCourses] = useState(maxCourses);
    const [buttonText, setButtonText] = useState("See more");

    let expandButton = courses.length > maxCourses &&  
            <Grid key = "button" item>
                <Button 
                    variant = "outlined"
                    onClick = {() => setExpanded(!expanded )} 
                >
                    {buttonText}
                </Button>
            </Grid>;

    useEffect(() => {
        if (expanded) {
            setNumCourses(courses.size);
            setButtonText("See less");
        } else {
            setNumCourses(maxCourses);
            setButtonText("See More");
        }
    }, [expanded]); // eslint-disable-line

    const buildCourses = courses && courses.slice(0, numCourses).map((course, index) => {
        return (
            <Grid key = {index} item xs={4} >
                <Course 
                    key={index} 
                    course={course}
                    maxwidth={350} 
                    avatarColor = {randomColor()}    
                />
            </Grid>
        )
    });
    return (
        <Container fixed>
            <Grid
                container
                spacing = {3}
            >
                {buildCourses}
                {expandButton}
            </Grid>
        </Container>
    );
};

export default Courses;