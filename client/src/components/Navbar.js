import {react, useState} from 'react';
import Link from 'react-router-dom/Link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const pages = 
    [
        {
            name: "Profile",
            link: "/user-profile/1"
        },
        {
            name: 'Explore Topics',
            link: "/explore/topics"
        },
        {
            name: 'Explore Courses',
            link: '/explore/courses'
        }
    ];
const settings = [
    {
        name: 'Logout',
        link: '/logout'
    }
];


const Navbar = () => {
    const [anchorElNav, setAnchorElNav] =   useState(null);
    
const handleOpenNavMenu = (event) => {
  setAnchorElNav(event.currentTarget);
};
const handleCloseNavMenu = () => {
  setAnchorElNav(null);
};

return (
  <AppBar position="static">
    <Container maxWidth="xl" >
      <Toolbar disableGutters>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} key={"left settings"}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                <Typography key={page.name} textAlign="center">{page.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} key ={"right settings"}>
          {pages.map((page) => (
            <Link to={page.link} key={page.name}>
                <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
            </Link>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0 }} key={"settings"}>
            {settings.map((setting) => (
              <MenuItem key={setting.name} >
                <Link to={setting.link} key={setting.name}>
                <Button
                    key={setting.name}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {setting.name}
                </Button>
                </Link>
              </MenuItem>
            ))}
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
);
};
export default Navbar;