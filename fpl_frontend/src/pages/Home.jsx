import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backendUrl from '../config';
import { Container, Typography, Button, Box, Paper, Grid, Card, CardContent, CardHeader, TextField, Divider, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import CurrentTeam from './CurrentTeam';
function Home(props){
	const isLoggedIn = props.isLoggedIn
	const [playerNews, setPlayerNews] = useState([])
	const [gk, setgk] = useState([]);
	const [def, setdef] = useState([]);
	const [mid, setmid] = useState([]);
	const [fw, setfw] = useState([]);
	const [bench, setBench] = useState([]);
	const [teamExists, setTeamExists] = useState(false);


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

	const fetchTeam = () => {
        axios.get(`${backendUrl}/team/getcurrent`, { withCredentials: true })
        .then((response) => {
            //console.log(response.data);
            const { gk, def, mid, fw, bench } = response.data;
            setgk(gk);
            setdef(def);
            setmid(mid);
            setfw(fw);
            setBench(bench);
			setTeamExists(true)
        })
        .catch((error) => {
            console.log(error);
            if (error.response.status === 404){
                setTeamExists(false);
            }
        })
    }

	useEffect(() => {
		getPlayerNews()
		fetchTeam();
	}, []);

	return (
		isLoggedIn ? (
			<Container maxWidth="lg" sx={{ marginTop: 4 }}>
				<Grid container spacing={3}>
					{/* Current Team Section */}
					<Grid item xs={12} md={6}>
						<Paper sx={{ padding: 2, minHeight: 500 }}>
							<Typography variant="h6" gutterBottom>
								Your Current squad
							</Typography>
							<Divider />
							{
								teamExists ? (
									<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', mt: 3 }}>
										
										<Stack direction="column" spacing={1} alignItems="center">
											<Typography variant="h5">Goalkeeper</Typography>
											{
												gk.map((player, index) => (
													<Typography key={index} variant="body1">{player.short_name}</Typography>
												))
											}
											<Typography variant="h5">Defenders</Typography>
											{
												def.map((player, index) => (
													<Typography key={index} variant="body1">{player.short_name}</Typography>
												))
											}

											<Typography variant="h5">Midfielders</Typography>
											{
												mid.map((player, index) => (
													<Typography key={index} variant="body1">{player.short_name}</Typography>
												))
											}

											<Typography variant="h5">Strikers</Typography>
											{
												fw.map((player, index) => (
													<Typography key={index} variant="body1">{player.short_name}</Typography>
												))
											}

											<Typography variant="h5">Bench</Typography>
											{
												bench.map((player, index) => (
													<Typography key={index} variant="body1">{player.short_name}</Typography>
												))
											}
										</Stack>
									</Box>

								) : (
									<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', mt: 10 }}>
										<Typography variant="h5">You don't have a squad</Typography>
									</Box>
								)
							}
							
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