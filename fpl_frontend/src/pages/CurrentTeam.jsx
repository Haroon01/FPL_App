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
    const [selectedPlayer, setSelectedPlayer] = useState(null); // the first player the user clicks for subsitution
    const [selectedPlayer2, setSelectedPlayer2] = useState(null); // second player the user selects to subsitute
    // const [gk, setgk] = useState([]);
    // const [def, setdef] = useState([]);
    // const [mid, setmid] = useState([]);
    // const [fw, setfw] = useState([]);
    // const [bench, setBench] = useState([]);
    const [team, setTeam] = useState({
        gk: [],
        def: [],
        mid: [],
        fw: [],
        bench: []
    })
    const [score, setScore] = useState(0);
    const [gameweek, setGameweek] = useState("");
    const [subMode, setSubMode] = useState(false);

    const [gkDisable, setGkDisable] = useState(false); // these are used to disable buttons for players ineligible to be subsituted
    const [defDisable, setDefDisable] = useState(false);
    const [midDisable, setMidDisable] = useState(false);
    const [fwDisable, setFwDisable] = useState(false);
    const [benchDefDisable, setBenchDefDisable] = useState(false)
    const [benchMidDisable, setBenchMidDisable] = useState(false)
    const [benchFwDisable, setBenchFwDisable] = useState(false)



    // const StyledButton = styled(Button)(({ theme }) => ({
    //     color: theme.palette.secondary.main, // Set the color of the text and the outline
    //     borderColor: theme.palette.secondary.main,
    //     backgroundColor: 'transparent', // Set the background color to transparent
    //     '&:hover': {
    //       backgroundColor: alpha(theme.palette.secondary.main, 0.1), // Keep the background color transparent when hovered
    //       borderColor: theme.palette.secondary.main,
    //     },
    //     height: 100,
    //     width: 50
    //   }));

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




    function handleClick(playerType, index, playerObj){
        //console.log(playerType)
        // if player is deselected
        if (selectedPlayer && selectedPlayer.id === playerObj.id){
            setSelectedPlayer(null)
            setSelectedPlayer2(null)
            // re-enable the buttons
            setGkDisable(false)
            setDefDisable(false)
            setMidDisable(false)
            setFwDisable(false)
            setBenchDefDisable(false)
            setBenchMidDisable(false)
            setBenchFwDisable(false)
        } else if (!selectedPlayer) { // if first player is selected
            setSelectedPlayer(playerObj)
            setSelectedPlayer2(null)
            if (playerType === "gk"){
                setDefDisable(true);
                setMidDisable(true);
                setFwDisable(true);
                setBenchDefDisable(true)
                setBenchMidDisable(true)
                setBenchFwDisable(true)
            } else if (playerType === "def"){ // if player selects a starting defender AND there is only 1 defender in the starting squad....
                setGkDisable(true)
                if (Object.keys(team.def).length === 1){
                    setMidDisable(true)
                    setFwDisable(true)
                    setBenchMidDisable(true)
                    setBenchFwDisable(true)
                }

            } else if (playerType === "mid"){
                setGkDisable(true)
                if (Object.keys(team.mid).length === 1){
                    setDefDisable(true)
                    setFwDisable(true)
                    setBenchDefDisable(true)
                    setBenchFwDisable(true)
                }
            } else if (playerType === "fw"){
                setGkDisable(true)
                if (Object.keys(team.fw).length === 1){
                    setDefDisable(true)
                    setMidDisable(true)
                    setBenchDefDisable(true)
                    setBenchMidDisable(true)
                }
            }
        } else if (selectedPlayer && !selectedPlayer2){ // if the second player is selected
            if (selectedPlayer.id !== playerObj.id) {
                setSelectedPlayer2(playerObj)
            }
        }
    }

    const fetchTeam = () => {
        axios.get(`${backendUrl}/team/getcurrent`, { withCredentials: true })
        .then((response) => {
            //console.log(response.data);
            const { gk, def, mid, fw, bench } = response.data;
            setTeam({ gk, def, mid, fw, bench })
        })
        .catch((error) => {
            console.log(error);
            if (error.response.status === 404){
                navigate("/team")
            }
        })
    }

    const calculatePoints = () => { // need to move this to backend.
        //console.log("calculatePoints() running")
        let points = 0;
        let startingTeam = [...team.gk, ...team.def, ...team.mid, ...team.fw];
        //console.log(startingTeam)
        for (let player of startingTeam){
            points += player.points;
        }
        setScore(points);
    }

    const getGameweek = () => {
        axios.get(`${backendUrl}/gameweek/current`, { withCredentials: true })
        .then((response) => {
            setGameweek(response.data.id)
        })
        .catch((error) => {
            console.log(error)
        })
    
    }

    // converts position from playerObj to abbreviated form. e.g. "Goalkeeper" -> "gk"
    const posToAbbr = (pos) => { // do not delete this, it is used all over this page
        //console.log("posToAbbr: " + pos)
        switch(pos){
            case "Goalkeeper":
                return "gk"
            case "Defender":
                return "def"
            case "Midfielder":
                return "mid"
            case "Forward":
                return "fw"
        }
    }

    useEffect(() => {
        fetchTeam();
        getGameweek();
        
    }, [])

    useEffect(() => {
        // Runs whenever one of these dependencies changes
        calculatePoints();
    }, [team.gk, team.def, team.mid, team.fw]);

    useEffect(() => {
        //console.log(selectedPlayer ? "player1: " + selectedPlayer.short_name : "nothing selected (player)")
        // console.log(selectedPlayer?.pos ? selectedPlayer.pos : "nothing selected (pos)")

        if (selectedPlayer){
            setSubMode(true)
        } else {
            setSubMode(false)
        }
    }, [selectedPlayer])

    useEffect(() => {
        //console.log(selectedPlayer2 ? "player2: " + selectedPlayer2.short_name : "nothing selected (player2)")
        // console.log(selectedPlayer2?.pos ? selectedPlayer2.pos : "nothing selected (pos2)")
        let player1Type;
        let player2Type; // store the types of each player subsituted so we can access the relevant state variables

        let player1pos = selectedPlayer ? posToAbbr(selectedPlayer.pos) : null;
        let player2pos = selectedPlayer2 ? posToAbbr(selectedPlayer2.pos) : null;
        if (selectedPlayer2){
            console.log(selectedPlayer.short_name + " switched with " + selectedPlayer2.short_name)
            //if (player1pos === "gk")
        }
    }, [selectedPlayer2])


    return (
        <Stack direction="column" spacing={1} alignItems="center" style={{ position: 'absolute', top: '10%', width: '100%' }}>
            <Paper elevation={3} style={{ padding: 20, width: 400, height: 50, backgroundColor: theme.palette.primary.main, display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center'}}>
                { 
                    subMode ? (
                        <Typography variant="h6" style={{ color: theme.palette.secondary.main }}>[ Edit Mode ]</Typography> 
                    ) : (
                        <>
                            <Typography variant="h6" style={{ color: theme.palette.secondary.main }}>Gameweek: {gameweek}</Typography>
                            <Typography variant="h6" style={{ color: theme.palette.secondary.main }}>Points: {score}</Typography>
                        </>
                    )
                }

            </Paper>
            <Container component="main" maxWidth="xs" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', flexDirection: 'column' }}>
                {DuplicateSnackbarComponent}
                {TeamSavedSnackbarComponent}
                <Paper elevation={3} style={{ padding: 16, width: 400, height: 600, backgroundColor: theme.palette.primary.main}}>
                    <Stack direction="column" spacing={2} alignItems="center">
                        {/** Goalkeepers */}
                        <Stack direction="row" spacing={2} justifyContent="center">
                            {team.gk.map((player, index) => (
                                <CurrentPlayer key={player.id} isSelected={selectedPlayer?.id === player.id} isDisabled={gkDisable} playerData={player} handleClick={() => {handleClick(posToAbbr(player.pos), index, player)}} />
                            ))}
                        </Stack>

                        {/** Defenders */}
                        <Stack direction="row" spacing={2} justifyContent="center">
                            {team.def.map((player, index) => (
                                <CurrentPlayer key={player.id} isSelected={selectedPlayer?.id === player.id} isDisabled={defDisable} playerData={player} handleClick={() => {handleClick(posToAbbr(player.pos), index, player)}} />
                            ))}
                        </Stack>

                        {/** Midfielders */}
                        <Stack direction="row" spacing={2} justifyContent="center">
                            {team.mid.map((player, index) => (
                                <CurrentPlayer key={player.id} isSelected={selectedPlayer?.id === player.id} isDisabled={midDisable} playerData={player} handleClick={() => {handleClick(posToAbbr(player.pos), index, player)}} />
                            ))}
                        </Stack>

                        {/** Strikers/Forwards */}
                        <Stack direction="row" spacing={2} justifyContent="center">
                            {team.fw.map((player, index) => (
                                <CurrentPlayer key={player.id} isSelected={selectedPlayer?.id === player.id} isDisabled={fwDisable} playerData={player} handleClick={() => {handleClick(posToAbbr(player.pos), index, player)}} />
                            ))}
                        </Stack>

                        <Divider orientation="horizontal" style={{ backgroundColor: theme.palette.secondary.main, width: "100%" }}/>
                        {/** Bench */}
                        <Stack direction="row" spacing={2} justifyContent="center">
                            {team.bench.map((player, index) => {
                                let disableProp; // since i cant build a dynamic varibale, i will use a switch case
                                switch(posToAbbr(player.pos)){
                                    case "gk":
                                        disableProp = gkDisable
                                        break;
                                    case "def":
                                        disableProp = benchDefDisable;
                                        break;
                                    case "mid":
                                        disableProp = benchMidDisable;
                                        break;
                                    case "fw":
                                        disableProp = benchFwDisable;
                                }

                                return (
                                    <CurrentPlayer key={player.id} isSelected={selectedPlayer?.id === player.id} isDisabled={disableProp} playerData={player} handleClick={() => {handleClick(posToAbbr(player.pos) + "_bench", index, player)}} />
                                )
                            })}
                        </Stack>
                    </Stack>
                    
                </Paper>
                <Button variant="contained" color="secondary" style={{ marginTop: 10, width: "100%" }} onClick={ () => { navigate("/currentteam/edit") } }>Make a transfer</Button>
            </Container>
        </Stack>
    )
}

export default CurrentTeam;