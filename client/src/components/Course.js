import react from 'react';

import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Avatar,
  Typography,
} from '@mui/material'

import NoImage from "../img/ProfileImage.jpeg"

const Course = (props) => {
        const {course} = props;
        console.log(course);
        return (
            <Card sx={{ Width: "100%"}} raised>
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
        );

};

export default Course;