import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backendUrl from '../config';
import { Container, Typography, Button, Box, Paper, Grid, Card, CardContent, CardHeader, TextField, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import CurrentTeam from './CurrentTeam';
function Home(props){
	const isLoggedIn = props.isLoggedIn
	const [playerNews, setPlayerNews] = useState([])


	let getPlayerNews = () => {
		axios.get(`${backendUrl}/players/news`, { withCredentials: true })
		.then((response) => {
			console.log(response.data)
			setPlayerNews(response.data)
		
		})
		.catch((error) => {
			console.log(error)
		})
	}

	useEffect(() => {
		getPlayerNews()
	}, []);

	return (
		isLoggedIn ? (
			<Container maxWidth="lg" sx={{ marginTop: 4 }}>
				<Grid container spacing={3}>
					{/* Current Team Section */}
					<Grid item xs={12} md={6}>
						<Paper sx={{ padding: 2 }}>
							<Typography variant="h6" gutterBottom>
								Your Current squad
							</Typography>
							<ul>
								<li key="teamkeyplaceholder">
									<Typography>Player Name</Typography>
								</li>
							</ul>
						</Paper>
					</Grid>

					{/* News Section */}
					<Grid item xs={12} md={6}>
						<Card >
							<CardHeader title="Player Injuries" />
							<Divider/>

							<CardContent style={{ overflow: 'auto', maxHeight: 200 }}>
								{ 
									playerNews.map((news, index) => (
										<Box key={index} sx={{ marginBottom: 1 }}>
											<Typography variant='overline'>{news.short_name + " - " + news.news.split("-")[1]}</Typography>
											<Typography variant='subtitle1'>{news.news.split("-")[0]}</Typography>
										</Box>
									))
								}
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Container>
		) : (
			// Content to display when the user is not logged in
			<Container maxWidth="sm" style={{ textAlign: 'center', paddingTop: '50px' }}>
				<Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
					<Typography variant="h3" gutterBottom>
						Hello!
					</Typography>
					<Typography variant="h6" color="textSecondary" paragraph>
						Welcome to FPLReloaded, a community built alternative to the original game. If you're looking for a new experience then you've come to the right place! Sign up now and get started!
					</Typography>
					<Box mt={4}>
						<Button 
							variant="contained" 
							color="primary" 
							component={Link} 
							to="/signup"
						>
							Sign Up to Get Started
						</Button>
					</Box>
					<Typography variant="caption">Note: This is currently a work in progress, this is not the final product but an early prototype.</Typography>
					<Typography variant="caption">Visit the <a href="/faq">FAQs</a> to learn more.</Typography>
				</Paper>
			</Container>
		)
	);
}

export default Home