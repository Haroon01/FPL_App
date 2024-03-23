import { useTheme } from '@emotion/react';
import { Container, Paper, Typography, TextField, Button, Snackbar, Alert, styled, alpha, Grid, Stack, Divider } from '@mui/material';
import axios from 'axios'
import backendUrl from '../config';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import CurrentPlayer from '../components/CurrentPlayer';
import PlayerModal from '../components/PlayerModal';

import CustomSnackbar from '../components/CustomSnackbar';

function CurrentTeam(){
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [ players, setPlayers ] = useState([]);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const [duplicateSnackbar, setDuplicateSnackbar] = useState(false);
    const [teamSavedSnackbar, setTeamSavedSnackbar] = useState(false);
    const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null);
    const [gk, setgk] = useState([]);
    const [def, setdef] = useState([]);
    const [mid, setmid] = useState([]);
    const [fw, setfw] = useState([]);
    const [bench, setBench] = useState([]);
    const [score, setScore] = useState(0);

    const StyledButton = styled(Button)(({ theme }) => ({
        color: theme.palette.secondary.main, // Set the color of the text and the outline
        borderColor: theme.palette.secondary.main,
        backgroundColor: 'transparent', // Set the background color to transparent
        '&:hover': {
          backgroundColor: alpha(theme.palette.secondary.main, 0.1), // Keep the background color transparent when hovered
          borderColor: theme.palette.secondary.main,
        },
        height: 100,
        width: 50
      }));

    const DuplicateSnackbarComponent = (
        <CustomSnackbar
            open={duplicateSnackbar}
            handleCloseSnackbar={() => {setDuplicateSnackbar(false)}}
            severity="error"
            message="You've already selected this player"
        />
    )
        // TODO: FIX THIS! make it so there isnt duplcated code for a snackbar.
    const TeamSavedSnackbarComponent = (
        <CustomSnackbar
            open={teamSavedSnackbar}
            handleCloseSnackbar={() => {setTeamSavedSnackbar(false)}}
            severity="success"
            message="Your team has been saved!"
        />
    )


    function handleClick(playerType, index){
        console.log(playerType, index)
        setSelectedPlayerIndex(index);
        axios.get(`${backendUrl}/players/type/${playerType}`, { withCredentials: true })
        .then((response) => {
            //console.log(response.data);
            setPlayers(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
        handleOpenModal();
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
            setBench(bench); // continue from here! players are set in teh state. need to amend currentTeam layout with a bench and display players
        })
        .catch((error) => {
            console.log(error);
            if (error.response.status === 404){
                navigate("/team")
            }
        })
    }

    const calculatePoints = () => { // need to move this to backend.
        console.log("calculatePoints() running")
        let points = 0;
        let startingTeam = [...gk, ...def, ...mid, ...fw];
        console.log(startingTeam)
        for (let player of startingTeam){
            points += player.points;
        }
        setScore(points);
    }

    useEffect(() => {
        fetchTeam();
        
    }, [])

    useEffect(() => {
        // Runs whenever one of these dependencies changes
        calculatePoints();
    }, [gk, def, mid, fw]);
    return (
        <Stack direction="column" spacing={1} alignItems="center" style={{ position: 'absolute', top: '10%', width: '100%' }}>
            <Paper elevation={3} style={{ padding: 20, width: 400, height: 10, backgroundColor: theme.palette.primary.main, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant="h6" style={{ color: theme.palette.secondary.main }}>Points: {score}</Typography>
            </Paper>
            <Container component="main" maxWidth="xs" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', flexDirection: 'column' }}>
                {DuplicateSnackbarComponent}
                {TeamSavedSnackbarComponent}
                <Paper elevation={3} style={{ padding: 16, width: 400, height: 600, backgroundColor: theme.palette.primary.main}}>
                    <Stack direction="column" spacing={2} alignItems="center">
                        {/** Goalkeepers */}
                        <Stack direction="row" spacing={2} justifyContent="center">
                            {gk.map((player, index) => (
                                <CurrentPlayer playerData={player} handleClick={() => {handleClick('gk', index)}} />
                            ))}
                        </Stack>

                        {/** Defenders */}
                        <Stack direction="row" spacing={2} justifyContent="center">
                            {def.map((player, index) => (
                                <CurrentPlayer playerData={player} handleClick={() => {handleClick('def', index)}} />
                            ))}
                        </Stack>

                        {/** Midfielders */}
                        <Stack direction="row" spacing={2} justifyContent="center">
                            {mid.map((player, index) => (
                                <CurrentPlayer playerData={player} handleClick={() => {handleClick('mid', index)}} />
                            ))}
                        </Stack>

                        {/** Strikers/Forwards */}
                        <Stack direction="row" spacing={2} justifyContent="center">
                            {fw.map((player, index) => (
                                <CurrentPlayer playerData={player} handleClick={() => {handleClick('fw', index)}} />
                            ))}
                        </Stack>

                        <Divider orientation="horizontal" style={{ backgroundColor: theme.palette.secondary.main, width: "100%" }}/>
                        {/** Bench */}
                        <Stack direction="row" spacing={2} justifyContent="center">
                            {bench.map((player, index) => (
                                <CurrentPlayer playerData={player} handleClick={() => {handleClick('fw', index)}} />
                            ))}
                        </Stack>
                    </Stack>
                    
                </Paper>
                <Button variant="contained" color="secondary" style={{ marginTop: 10, width: "100%" }} onClick={ () => { navigate("/currentteam/edit") } }>Make a transfer</Button>
            </Container>
        </Stack>
    )
}

export default CurrentTeam;