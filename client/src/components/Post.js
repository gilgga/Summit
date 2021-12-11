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

const Post = (props) => {
        const {post} = props;
        return (
            <Card sx={{ Width: "100%"}} raised>
            <CardHeader
              avatar={
                <Avatar 
                  aria-label="profile-picture"
                  src = {NoImage}
                />
              }
              title={post.title}
              subheader={`Posted by ${post.userPosted} @ ${post.time}`}
            />
            <CardContent>
              <Typography variant="body2" color="textPrimary">
                {post.content}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
            </CardActions>
          </Card>       
        );

};

export default Post;