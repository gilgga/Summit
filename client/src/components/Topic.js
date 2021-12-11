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

const Topic = (props) => {
        const {topic} = props;
        return (
            <Card sx={{ maxWidth: 350}} raised>
            <CardHeader
              avatar={
                <Avatar 
                  aria-label="profile-picture"
                  src = {NoImage}
                />
              }
              title={topic.name}
            />
            <CardContent>
              <Typography variant="body2" color="textPrimary">
                {topic.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
            </CardActions>
          </Card>       
        );

};

export default Topic;