import {react, useEffect, useState} from 'react';
import Link from 'react-router-dom/Link';

import {
  Button,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Stack,
} from '@mui/material'

import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import NoImage from "../img/ProfileImage.jpeg"

const buttonWidth = "160px"

const Topic = (props) => {
  const {avatarColor, topic, maxwidth} = props;

  const [subscribed, setSubscribed] = useState(false);

  const stringAvatar = (name) => {
    let delimited = name.split(' ');
    let symbol;
    if (delimited.length == 1) {
      symbol = delimited[0][0];
    } else {
      symbol = `${delimited[0][0]}${delimited[1][0]}`;
    }
    return {
      sx: {
        bgcolor: avatarColor,
      },
      children: symbol,
    };
  }

  let actionButton = <></>;
  const unsubButton = 
    <Button 
    sx = {{
      maxWidth:  buttonWidth, 
      minWidth:  buttonWidth, 
      }}
      variant="outlined" 
      color="primary" 
      endIcon={<BookmarkRemoveIcon/>} 
      onClick = {() => setSubscribed(false)}
    >
      Unsubscribe
    </Button>;
  
  const subButton =
    <Button 
      sx = {{
        maxWidth:  buttonWidth, 
        minWidth:  buttonWidth, 
        }}
      variant="outlined" 
      color="primary" 
      endIcon={<BookmarkAddIcon/>} 
      onClick = {() => setSubscribed(!subscribed)}
    >
      Subscribe
    </Button>;

  actionButton = subscribed ? unsubButton : subButton;

  return (
      <Card sx={{ maxWidth: maxwidth}} raised>
      <CardHeader
        avatar={
          <Avatar 
            aria-label="profile-picture"
            {...stringAvatar(topic.name)}
          />
        }
        title={topic.name}
        subheader={`${topic.usersEnrolled} students subscribed`}
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary">
          {topic.description}
        </Typography>
      </CardContent>
      <CardActions >
        <Stack
          spacing = {3}
          direction="row"
        >
        {actionButton}
        <Link to="/explore/topics">
          <Button
            variant="outlined"
            color="primary"
            endIcon={<PeopleAltIcon/>}
          >
            See Posts
          </Button>
        </Link>
        </Stack>
      </CardActions>
    </Card>       
  );

};

export default Topic;