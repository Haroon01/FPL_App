import React, { useState, useEffect } from 'react';
import { Box, Stack, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
        height: "70%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        backgroundColor: theme.palette.primary.secondary
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
	
	


    const TableElement = (
            <Box sx={{ overflow: 'hidden', paddingLeft: "10px", paddingTop: "5px" }}>
				<Box sx={{display: 'flex', justifyContent: 'space-between'}}>
					<Typography variant="h4" >{playerData.first_name + " " + playerData.last_name}</Typography>
					<CloseIcon sx={{ cursor: "pointer"}} onClick={onClose}/>
				</Box>
				<Divider sx={{mt: 1}} />
                <Stack direction="row" spacing={1} alignItems="center">
					
					
					<Typography variant="h6" sx={newsSx(playerData.chance_of_playing_next_round)}>{playerData.news}</Typography>
                </Stack>
            </Box>
            
    )

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
            {TableElement}
        </Box>
      </Modal>
    </div>
  );
}