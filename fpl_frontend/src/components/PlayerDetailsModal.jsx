import React, { useState, useEffect } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import Button from '@mui/material/Button';
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
        width: "90%",
        height: "70%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        backgroundColor: theme.palette.primary.main
      };


    const TableElement = (
        <Paper sx={{ width: '100%', height: "100%", overflow: 'hidden' }}>
            <Box sx={{ overflow: 'hidden', paddingLeft: "10px", paddingTop: "5px" }}>
                <Typography variant="h4">testmodal</Typography>
            </Box>
            
        </Paper>
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