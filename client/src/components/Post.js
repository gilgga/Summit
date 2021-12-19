import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  CircularProgress,
} from '@mui/material'

import { useQuery } from "@apollo/client";

import NoImage from "../img/ProfileImage.jpeg"
import queries from '../queries';

const Post = (props) => {
  const {post} = props;
  const resTopic = useQuery(queries.GET_TOPIC, { variables: { id: post.topic }, fetchPolicy: "network-only"});
  const resCourse = useQuery(queries.GET_COURSE, { variables: { id: post.course }, fetchPolicy: "network-only"});
  const resUser   = useQuery(queries.GET_USER, {variables: {userid: post.user}, fetchPolicy: "network-only"})
  let topic = '';
  let course = '';
  let user = {};
  let date = new Date(parseInt(post.time));

  if (resTopic.loading || resCourse.loading || resUser.loading) {
    <Card sx={{ Width: "100%"}} raised>
      <CardContent>
        <CircularProgress/>
      </CardContent>
    </Card>
  }

  if (resTopic.data) {
    topic = `Topic: ${resTopic.data.getTopic.title} | `;
  }
  if (resCourse.data) {
    course = `Course: ${resCourse.data.getCourse.title} | `;
  }
  if (resUser.data) {
    user = resUser.data.getUser;
  }

  return (
    <Card sx={{ Width: "100%"}} raised>
      <CardHeader
        avatar={
          <Avatar 
            aria-label="profile-picture"
            alt={post.title}
            src = {user && user.image ? user.image : NoImage}
            />
          }
        title={post.title}
        subheader={`${topic}${course}Posted by ${user.firstName} ${user.lastName} @ ${date}`}
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