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
      <Typography variant="h6" sx={{mr: 2}}>
        <Link to="/">
          Home
        </Link>
      </Typography>
      <Typography variant="h6" sx={{mr: 2}}>
      <Link to={"/user-profile/" + allState._id} style={{ color: '#FFF' }}>
        Profile
        </Link>
      </Typography>
      <Typography variant="h6" sx={{ mr: 2 }} >
          <Link to="/all-posts" style={{ color: '#FFF' }}>
            All Posts
          </Link>
      </Typography>
      <Typography variant="h6" sx={{mr: 2}}>
          <Link to="/explore/courses" style={{ color: '#FFF' }}>
            Explore Courses
          </Link>
      </Typography>
      <Typography variant="h6" sx={{ flexGrow: 1 }} >
          <Link to="/explore/topics" style={{ color: '#FFF' }}>
            Explore Topics
          </Link>
      </Typography>
    </>

  const unauthPages = 
    <>
      <Typography variant="h6" sx={{ flexGrow: 1 }} >
        <Link to="/" style={{ color: '#FFF' }}>
          Home
        </Link>
      </Typography>
    </>

  const unauthSettings = 
    <>
      <Typography variant="h6" sx={{mr: 2}}>
          <Link to="/login" style={{ color: '#FFF' }}>
            Log in
          </Link>
      </Typography>
      <Typography variant="h6" sx={{mr: 2}}>
          <Link to="/sign-up" style={{ color: '#FFF' }} >
            Sign Up
          </Link>
      </Typography>
    </>

  const authSettings = 
    <>
      <Typography variant="h6" sx={{mr: 2}}>
          <Link to="/logout" style={{ color: '#FFF' }}>
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