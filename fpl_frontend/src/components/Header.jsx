// import * as React from 'react';
import React, { useState, useEffect, useCallback } from 'react'
import backendUrl from '../config';
import axios from 'axios';
import logo from '../assets/logo/logo.png';

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
import { styled, alpha } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Link, useNavigate } from 'react-router-dom';

/**
 * Pages object is written like as below:
 * {
 *     "PageTitle": "PathToPage"
 * }
 */
const pages = {
	"Home": "/",
	"My Team": "/currentteam",
	"Players": "/players/search",
	// "Login": "/login",
}

//const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const settings = {
	"Profile": "/profile",
	"FAQ": "/faq",
	"Logout": "/"
}

const header_btn_sx = { // style for header buttons
	my: 2, 
	color: 'white', 
	display: 'block', 
	'&:hover': {
		transform: 'scale(1.1)',
		transition: 'transform 0.3s'
	},
	'&:active': {
		transform: 'scale(0.9)',
		transition: 'transform 0.3s'
	}
}

const StyledMenu = styled(Menu)(({ theme }) => ({
	backgroundColor: alpha(theme.palette.background.primary, 0.3),
  }));

function Header({ isLoggedIn, setIsLoggedIn }) {
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [username, setUsername] = useState("");
	const navigate = useNavigate();

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
			navigate("/")
		})
	}

	const checkLoggedIn = useCallback(() => {
		axios.get(`${backendUrl}/auth/isauth`, { withCredentials: true })
		.then((response) => {
			if (response.status === 200){
				setIsLoggedIn(true);
				//console.log(response.data.user.username)
				setUsername(response.data.user.username)
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

	const isMobile = useMediaQuery('(max-width:900px)');

//<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
	return (
	  <AppBar position="static" className="navbar">
		<Container maxWidth="xl">
		  <Toolbar disableGutters>
			{!isMobile && (
				<Link to="/" style={{ display: 'flex' }}>
					<img 
						src={logo} 
						alt="Logo"
						style={{ height: '20px', marginRight: '10px' }} // Adjust the height as needed
					/>
				</Link>
			)}
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
				  { // These are the buttons for the mobile sized header icons
					isLoggedIn ? (
						Object.entries(pages).map(([page, value]) => (
						  <MenuItem key={page.toLowerCase()} onClick={handleCloseNavMenu}>
							<Link to={value} style={{ textDecoration: 'none', color: 'white' }}>
								<Typography style={{ color: 'white' }} textAlign="center">{page}</Typography>
							</Link>
						  </MenuItem>
						))
					) : (
						<MenuItem key="home" onClick={handleCloseNavMenu}>
							<Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
								<Typography style={{ color: 'white' }} textAlign="center">Home</Typography>
							</Link>
						</MenuItem>
					)
					  
				  }
			  </StyledMenu>
			</Box>
			<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
			  { // These are for the full sized webpage header buttons
				isLoggedIn ? (
				  Object.entries(pages).map(([page, value]) => (
					  <Button key={page.toLowerCase()} onClick={handleCloseNavMenu} disableRipple sx={header_btn_sx} href={value}>{page}</Button>
				  ))
				) : (
					// <Button key="home" onClick={handleCloseNavMenu} sx={header_btn_sx} href="/">Home</Button>
					<></>
				)
			  }
			</Box>

			<Box sx={{ flexGrow: 0 }}>
				{
					isLoggedIn ? (
						<>
							<Tooltip title="Open Menu">
								{/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
								</IconButton> */}
								<Button key="profileKey" sx={{ my: 2, color: 'white', display: 'block' }} onClick={handleOpenUserMenu}>Hello, {username}</Button>
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