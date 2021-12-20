import { useSelector } from 'react-redux';

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
} from '@mui/material'

import { Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    action: {
      active: "white",
      activeOpacity: 1,
    }
  },
});


export default function NavBar() {
  const allState = useSelector((state) => state.user);
  let authenticated = allState && allState._id !== -1;
  const authPages = 
    <>
      <Typography sx={{mr: 2}} >
        <Link to="/" style={{ color: '#FFF', paddingRight: '20px' }}>
          Home
        </Link>
      </Typography>
      <Typography sx={{mr: 2}}>
      <Link to={"/user-profile/" + allState._id} style={{ color: '#FFF', paddingRight: '20px' }}>
        Profile
        </Link>
      </Typography>
      <Typography sx={{ mr: 2 }} >
          <Link to="/all-posts" style={{ color: '#FFF', paddingRight: '20px' }}>
            All Posts
          </Link>
      </Typography>
      <Typography sx={{mr: 2}}>
          <Link to="/explore/courses" style={{ color: '#FFF', paddingRight: '20px' }}>
            Explore Courses
          </Link>
      </Typography>
      <Typography sx={{ flexGrow: 1 }} >
          <Link to="/explore/topics" style={{ color: '#FFF', paddingRight: '20px' }}>
            Explore Topics
          </Link>
      </Typography>
    </>

  const unauthPages = 
    <>
      <Typography sx={{ flexGrow: 1 }} >
        <Link to="/" style={{ color: '#FFF', paddingRight: '20px' }}>
          Home
        </Link>
      </Typography>
    </>

  const unauthSettings = 
    <>
      <Typography sx={{mr: 2}}>
          <Link to="/login" style={{ color: '#FFF', paddingRight: '20px' }}>
            Log in
          </Link>
      </Typography>
      <Typography sx={{mr: 2}}>
          <Link to="/sign-up" style={{ color: '#FFF', paddingRight: '20px' }} >
            Sign Up
          </Link>
      </Typography>
    </>

  const authSettings = 
    <>
      <Typography sx={{mr: 2}}>
          <Link to="/logout" style={{ color: '#FFF', paddingRight: '20px' }}>
            Log Out
          </Link>
      </Typography>
    </>
  return (
    <ThemeProvider theme={darkTheme}>
    <Box sx={{ flexGrow: 1 }}>  
      <AppBar position="static" color="primary">
        <Toolbar>
        {authenticated ? authPages : unauthPages}

        {authenticated ? authSettings : unauthSettings}
        </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>
  );
}