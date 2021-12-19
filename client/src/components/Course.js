import {useEffect, useState} from 'react';
import Link from 'react-router-dom/Link';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';

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

const Course = (props) => {
  const {avatarColor, course, maxwidth, user} = props;        
  const allState = useSelector((state) => state.user);

  const [subscribed, setSubscribed] = useState(false);

  const [enrollCourse] = useMutation(queries.ENROLL_COURSE);
  const [unenrollCourse] = useMutation(queries.UNENROLL_COURSE);

  const enrollUser = async() => {
    await enrollCourse({variables: {id : allState._id, courseid : course._id}})
  };
  const unenrollUser = async() => {
    await unenrollCourse({variables: {id : allState._id, courseid : course._id}})
  }

  useEffect(() => {
    if(user && user.courses.find(element => element === course._id)){
      setSubscribed(true)
    }
  }, [])

  useEffect(() => {
    if (subscribed) {
      enrollUser();
    } else if(user && user.courses.find(element => element === course._id)){
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
    }
  };

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
            {...stringAvatar(course.title)}
          />
        }
        title={course.title}
        subheader={`${course.usersEnrolled.length} students subscribed`}
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary">
          {course.description}
        </Typography>
      </CardContent>
      <CardActions >
        <Stack
          spacing = {3}
          direction="row"
        >
        {actionButton}
        <Link to={"/courses/" + course._id}>
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

export default Course;