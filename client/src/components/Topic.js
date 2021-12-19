import {useState, useEffect} from 'react';
import Link from 'react-router-dom/Link';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';

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

import queries from '../queries';

const buttonWidth = "160px"

const Topic = (props) => {
  const {avatarColor, topic, maxwidth, user} = props;
  const allState = useSelector((state) => state.user);

  const [subscribed, setSubscribed] = useState(false);

  const [enrollTopic] = useMutation(queries.ENROLL_TOPIC);
  const [unenrollTopic] = useMutation(queries.UNENROLL_TOPIC);

  useEffect(() => {
    if(user && user.topics.find(element => element === topic._id)){
      setSubscribed(true)
    }
  }, [])
  useEffect(() => {
    const enrollUser = async() => {
      const data = await enrollTopic({variables: {id : allState._id, topicid : topic._id}})
      console.log(data);
    };
    const unenrollUser = async() => {
      const data = await unenrollTopic({variables: {id : allState._id, topicid : topic._id}})
      console.log(data);
    }
    if (subscribed) {
      enrollUser();
    } else if(user && user.topics.find(element => element === topic._id)){
      unenrollUser();
    }
  }, [subscribed]);

  const stringAvatar = (name) => {
    let delimited = name.split(' ');
    let symbol;
    if (delimited.length === 1) {
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
            {...stringAvatar(topic.title)}
          />
        }
        title={topic.title}
        subheader={`${topic.usersEnrolled.length} students subscribed`}
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
        <Link to={"/topics/" + topic._id}>
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