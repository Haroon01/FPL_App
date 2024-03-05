// import * as React from 'react';
import React, { useState, useEffect, useCallback } from 'react'
import backendUrl from '../config';
import axios from 'axios';


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
import AdbIcon from '@mui/icons-material/Adb';
import { styled } from '@mui/material/styles';

import { Link } from 'react-router-dom';

/**
 * Pages object is written like as below:
 * {
 *     "PageTitle": "PathToPage"
 * }
 */
const pages = {
    "Home": "/",
    "My Team": "/currentteam",
    // "Login": "/login",
}

//const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const settings = {
    "Profile": "/profile",
    "Account": "/",
    "Dashboard": "/",
    "Logout": "/"
}

const StyledMenu = styled(Menu)(({ theme }) => ({
    backgroundColor: theme.palette.background.primary,
  }));

function Header({ isLoggedIn, setIsLoggedIn }) {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    function handleLogout(e){
        e.preventDefault();
        console.log("handleLogout")
        axios.post(`${backendUrl}/auth/logout`, {}, { withCredentials: true })
        .then((response) => {
            setIsLoggedIn(false);
        })
        .catch((error) => {
            console.log("couldnt log out error")
        })
        .finally(() => {
            handleCloseUserMenu()
        })
    }

    const checkLoggedIn = useCallback(() => {
        axios.get(`${backendUrl}/auth/isauth`, { withCredentials: true })
        .then((response) => {
            if (response.status === 200){
                setIsLoggedIn(true);
                console.log("setIsLoggedIn(true)")
            } else {
                console.log(`unexpected status code "${response.status}" from server.`)
            }
        })
        .catch((error) => {
            if (error.response.status === 401) {
                setIsLoggedIn(false);
            } else {
                console.log(error)
            }
        })
    }, [setIsLoggedIn])

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    useEffect(() => {
        checkLoggedIn();
        console.log(isLoggedIn)
    }, [checkLoggedIn, isLoggedIn])


    return (
      <AppBar position="static" className="navbar">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
              <StyledMenu
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
                  {
                    isLoggedIn ? (
                        Object.entries(pages).map(([page, value]) => (
                          <MenuItem key={page.toLowerCase()} onClick={handleCloseNavMenu}>
                            <Link to={value}>
                                <Typography textAlign="center">{page}</Typography>
                            </Link>
                          </MenuItem>
                        ))
                    ) : (
                        <MenuItem key="home" onClick={handleCloseNavMenu}>
                            <Link to="/">
                                <Typography textAlign="center">Home</Typography>
                            </Link>
                        </MenuItem>
                    )
                      
                  }
              </StyledMenu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {
                isLoggedIn ? (
                  Object.entries(pages).map(([page, value]) => (
                      <Button key={page.toLowerCase()} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }} href={value}>{page}</Button>
                  ))
                ) : (
                    <Button key="home" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }} href="/">Home</Button>
                )
              }
            </Box>

            <Box sx={{ flexGrow: 0 }}>
                {
                    isLoggedIn ? (
                        <>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {
                                    // settings.map((setting) => (
                                    //     <MenuItem key={setting} onClick={handleCloseUserMenu}>{setting}</MenuItem>
                                    // ))
                                    Object.entries(settings).map(([menuItem, path]) => (
                                        <MenuItem component={"a"} href={path} key={menuItem.toLowerCase()} onClick={menuItem === "Logout" ? handleLogout : handleCloseUserMenu} >
                                            {/* <Link to={path} style={{ textDecoration: 'none', outline: 'none' }}>{menuItem}</Link> */}
                                            {menuItem}
                                        </MenuItem>
                                    ))
                                }
                            </Menu>
                        </>
                    ) : (
                        // <Link to="/login">
                        //     <Typography variant='p1'>Sign In</Typography>
                        // </Link>
                        <Button key="signInBtn" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }} href="/login">Sign In</Button>
                        
                    )
                }


            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
}
export default Header;