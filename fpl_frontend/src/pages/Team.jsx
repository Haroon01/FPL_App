import { useTheme } from '@emotion/react';
import { Container, Paper, Typography, TextField, Button, Snackbar, Alert, styled, alpha, Grid, Stack } from '@mui/material';
import axios from 'axios'
import backendUrl from '../config';
import { useEffect, useState } from 'react';
import PlayerModal from '../components/PlayerModal';
import Player from '../components/Player';
import CustomSnackbar from '../components/CustomSnackbar';

function Team(){
    const theme = useTheme();
    const [ players, setPlayers ] = useState([]);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const [duplicateSnackbar, setDuplicateSnackbar] = useState(false);
    const [teamSavedSnackbar, setTeamSavedSnackbar] = useState(false);
    const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null);
    const [selectedGk, setSelectedGk] = useState([null, null]);
    const [selectedDef, setSelectedDef] = useState([null, null, null, null, null]);
    const [selectedMid, setSelectedMid] = useState([null, null, null, null, null]);
    const [selectedFw, setSelectedFw] = useState([null, null, null]);

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
        axios.get(`${backendUrl}/players/${playerType}`, { withCredentials: true })
        .then((response) => {
            //console.log(response.data);
            setPlayers(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
        handleOpenModal();
    }

    const handleRowClick = (playerRow) => {
        let pos = playerRow.pos;
        switch(pos){
            case "Goalkeeper":
                if (!selectedGk.some(player => player?.id === playerRow.id)) {
                    setSelectedGk(prevGk => prevGk.map((item, index) => index === selectedPlayerIndex ? playerRow : item));
                } else {
                    setDuplicateSnackbar(true);
                }
                break;
            case "Defender":
                
                if (!selectedDef.some(player => player?.id === playerRow.id)) {
                    setSelectedDef(prevDef => prevDef.map((item, index) => index === selectedPlayerIndex ? playerRow : item));
                } else {
                    setDuplicateSnackbar(true);
                }
                break;
            case "Midfielder":
                
                if (!selectedMid.some(player => player?.id === playerRow.id)) {
                    setSelectedMid(prevMid => prevMid.map((item, index) => index === selectedPlayerIndex ? playerRow : item));
                } else {
                    setDuplicateSnackbar(true);
                }
                break;
            case "Forward":
                
                if (!selectedFw.some(player => player?.id === playerRow.id)) {
                    setSelectedFw(prevFw => prevFw.map((item, index) => index === selectedPlayerIndex ? playerRow : item));
                } else {
                    setDuplicateSnackbar(true);
                }
                break;
            default:
                break;
        }
        handleCloseModal();
    }

    const handleSaveBtnClick = () => {
        const newTeamData = [selectedGk, selectedDef, selectedMid, selectedFw]
        const hasNull = newTeamData.some(arr => arr.some(player => player === null));
        if (hasNull) {
            console.log("team isnt complete")
        } else {
            axios.post(`${backendUrl}/team/newteam/save`, newTeamData, { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                setTeamSavedSnackbar(true);
            })
        }
    }

    const fetchTeam = () => {
        axios.get(`${backendUrl}/team/getteam`, { withCredentials: true })
        .then((response) => {
            console.log(response.data);
            const { gk1, gk2, def1, def2, def3, def4, def5, mid1, mid2, mid3, mid4, mid5, fw1, fw2, fw3 } = response.data;
            setSelectedGk([gk1, gk2]);
            setSelectedDef([def1, def2, def3, def4, def5]);
            setSelectedMid([mid1, mid2, mid3, mid4, mid5]);
            setSelectedFw([fw1, fw2, fw3]);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        fetchTeam();
    }, [])
    return (
        <Container component="main" maxWidth="xs" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '90vh', flexDirection: 'column' }}>
            <PlayerModal open={isModalOpen} onClose={handleCloseModal} tableData={players} onRowClick={handleRowClick}/>
            <Button variant="contained" color="secondary" style={{ margin: '10px', width: '100%' }} onClick={handleSaveBtnClick}>Save Team</Button>
            {DuplicateSnackbarComponent}
            {TeamSavedSnackbarComponent}
            <Paper elevation={3} style={{ padding: 16, width: 400, height: 500, backgroundColor: theme.palette.primary.main}}>
                <Stack direction="column" spacing={2} alignItems="center">
                    {/** Goalkeepers */}
                    <Stack direction="row" spacing={2} justifyContent="center">
                        {selectedGk.map((player, index) => (
                            <Player playerData={player} handleClick={() => {handleClick('gk', index)}} />
                        ))}
                    </Stack>

                    {/** Defenders */}
                    <Stack direction="row" spacing={2} justifyContent="center">
                        {selectedDef.map((player, index) => (
                            <Player playerData={player} handleClick={() => {handleClick('def', index)}} />
                        ))}
                    </Stack>

                    {/** Midfielders */}
                    <Stack direction="row" spacing={2} justifyContent="center">
                        {selectedMid.map((player, index) => (
                            <Player playerData={player} handleClick={() => {handleClick('mid', index)}} />
                        ))}
                    </Stack>

                    {/** Strikers/Forwards */}
                    <Stack direction="row" spacing={2} justifyContent="center">
                        {selectedFw.map((player, index) => (
                            <Player playerData={player} handleClick={() => {handleClick('fw', index)}} />
                        ))}
                    </Stack>
                </Stack>
                
            </Paper>
        </Container>
        
    )
}

export default Team;