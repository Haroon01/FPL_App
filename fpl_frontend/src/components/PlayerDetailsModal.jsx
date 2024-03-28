import React, { useState, useEffect } from 'react';
import { Box, Stack, Divider, Tooltip, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useTheme } from '@emotion/react';
import axios from 'axios';
import backendUrl from '../config';

const columns = [
    { id: 'first_name', label: 'First Name', minWidth: 170 },
    { id: 'last_name', label: 'Last Name', minWidth: 170 },
    { id: 'pos', label: 'Position', minWidth: 170 },
    { id: 'form', label: 'Form', minWidth: 170 },
    { id: 'club', label: 'Club', minWidth: 170 }
]
const rows = [
    { name: 'Mikel Arteta', pos: 'Midfielder', form: 7.5 },
    { name: 'Gabriel Martinelli', pos: 'Forward', form: 7.5 },

]



export default function PlayerDetailsModal( { open, onClose, playerData } ) {
    const theme = useTheme();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "50%",
        height: "60%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        backgroundColor: theme.palette.primary.secondary,
		overflow: "auto"
      };

	const onCloseBtnClick = () => {
		onClose()
	}

	const newsSx = (severity) => {
		let sx = {
			display: "flex",
			backgroundColor: "",
			width: "100%",
			alignContent: "center",
			justifyContent: "center"
		};
		switch (severity) {
			case 0:
				sx.backgroundColor = "#ff0000"; // red
				break;
			case 25:
				sx.backgroundColor = "#ff8800"; // darker orange
				break;
			case 50:
				sx.backgroundColor = "#ffcc00"; // lighter orange
				break;
			case 75:
				sx.backgroundColor = "#fff700"; // bright yellow
				break;

		}


		return sx;
	
	}

	// if data is 0, it comes through to the frontend as "null" so we need to handle that
	playerData.yellow_cards = playerData.yellow_cards === null ? 0 : playerData.yellow_cards;
	playerData.red_cards = playerData.red_cards === null ? 0 : playerData.red_cards;
	
	const cardIcon = (colour) => (
		<Box
        component="span"
        sx={{
          display: 'inline-block',
          backgroundColor: colour,
          width: '10px',
          height: '14px',
          marginRight: '1px',
		  marginBottom: '3px',
          verticalAlign: 'middle'
        }}
      />
	)

	const statSx = {
		display: 'flex', 
		flexDirection: "column", 
		justifyContent: 'space-between', 
		width:"100%"
	}; // for the stat elements in modal

	const InfoTooltip = ({text}) => (
		<Tooltip title={text} sx={{ mt: '-6px', ml: '-5px' }} disableRipple>
			<IconButton >
				<InfoIcon sx={{fontSize: "medium"}}/>
			</IconButton>
		</Tooltip>
	)


    const TableElement = (
            <Box sx={{ overflow: 'hidden', paddingLeft: "10px", paddingTop: "5px" }}>
				<Box sx={{display: 'flex', justifyContent: 'space-between'}}>
					<Typography variant="h4" >{playerData.first_name + " " + playerData.last_name}</Typography>
					<CloseIcon sx={{ cursor: "pointer"}} onClick={onClose}/>
				</Box>
				<Divider sx={{mt: 1}} />
                <Stack direction="column" spacing={1}>
					<Typography variant="h6" sx={newsSx(playerData.chance_of_playing_next_round)}>{playerData.news}</Typography>
					<Stack direction="column">
						<Stack direction="row" spacing={1} sx={{ width: '100%', pl:"10px", pr:"10px", pt:"5px" }}>
							<Stack direction="column" spacing={1} sx={{ flex: 1, alignItems: 'flex-start', pr:"20px" }}>
								<Box sx={statSx}>
									<Typography variant="h6">Club</Typography>
									<Divider />
									<Typography variant="body1">{playerData.club_name}</Typography>
								</Box>
								
								<Box sx={statSx}>
									<Typography variant="h6">Position</Typography>
									<Divider />
									<Typography variant="body1">{playerData.pos}</Typography>
								</Box>

								<Box sx={statSx}>
									<Typography variant="h6">Current Points</Typography>
									<Divider />
									<Typography variant="body1">{playerData.points}</Typography>
								</Box>

								<Box sx={statSx}>
									<Typography variant="h6">Goals</Typography>
									<Divider />
									<Typography variant="body1">{playerData.goals_scored}</Typography>
								</Box>

								<Box sx={statSx}>
									<Typography variant="h6">Assists</Typography>
									<Divider />
									<Typography variant="body1">{playerData.form}</Typography>
								</Box>

								<Box sx={statSx}>
									<Typography variant="h6">Goals Conceded</Typography>
									<Divider />
									<Typography variant="body1">{playerData.goals_conceded}</Typography>
								</Box>
								
								
								<Box sx={statSx}>
									<Typography variant="h6">Own Goals</Typography>
									<Divider />
									<Typography variant="body1">{playerData.own_goals}</Typography>
								</Box>
				
								
							</Stack>
							<Stack direction="column" spacing={1} sx={{ flex: 1, alignItems: 'flex-start', pl:"20px" }}>
								<Box sx={statSx}>
									<Typography variant="h6">Bookings</Typography>
									<Divider />
									<Typography variant="body1">{cardIcon("yellow")} {playerData.yellow_cards} {cardIcon("red")} {playerData.red_cards}</Typography>
								</Box>

								<Box sx={statSx}>
									<Typography variant="h6">Clean Sheets</Typography>
									<Divider />
									<Typography variant="body1">{playerData.clean_sheets}</Typography>
								</Box>

								<Box sx={statSx}>
									<Typography variant="h6">Current Form</Typography>
									<Divider />
									<Typography variant="body1">{playerData.form}</Typography>
								</Box>

								<Box sx={statSx}>
									<Typography variant="h6">
										xG
										<InfoTooltip text="Expected Goals"/>
									</Typography>
									<Divider />
									<Typography variant="body1">{playerData.expected_goals}</Typography>
								</Box>

								<Box sx={statSx}>
									<Typography variant="h6">
										xGA
										<InfoTooltip text="Expected Goals Against"/>
									</Typography>
									<Divider />
									<Typography variant="body1">{playerData.expected_goals_conceded}</Typography>
								</Box>

								<Box sx={statSx}>
									<Typography variant="h6">
										xGI
										<InfoTooltip text="Expected Goal Involvments"/>
									</Typography>
									<Divider />
									<Typography variant="body1">{playerData.expected_goal_involvements}</Typography>
								</Box>

								<Box sx={statSx}>
									<Typography variant="h6">
										xG per 90
										<InfoTooltip text="Expected Goals per 90 Minutes Played"/>
									</Typography>
									<Divider />
									<Typography variant="body1">{playerData.expected_goals_per_90}</Typography>
								</Box>

								
							</Stack>
						</Stack>
					</Stack>
                </Stack>
            </Box>
            
    )

  return (
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
            {TableElement}
        </Box>
      </Modal>
  );

  
}