import {react, useState, useEffect} from 'react';

import {
    Grid,
    Typography,
    Button
} from '@material-ui/core';

import { 
    Container,
    Card,
    CardHeader,
    CardActions,
    CardContent,
    Avatar,
} from '@mui/material';

import NoImage from "../../img/ProfileImage.jpeg"

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
    }, [expanded]);

    const buildCourses = courses && courses.slice(0, numCourses).map((course, index) => {
        console.log(course);
        return (
            <Grid key = {index} item >
                    <Card sx={{ maxWidth: 350}} raised>
            <CardHeader
              avatar={
                <Avatar 
                  aria-label="profile-picture"
                  src = {NoImage}
                />
              }
              title={course.name}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {course.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
            </CardActions>
          </Card>               
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