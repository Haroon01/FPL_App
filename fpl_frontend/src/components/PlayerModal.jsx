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



export default function PlayerModal( { open, onClose, tableData, onRowClick } ) {
    // const [ page, setPage ] = useState(0);
    // const [ rowsPerPage, setRowsPerPage ] = useState(10);
    const [ playerSearch, setPlayerSearch ] = useState("");
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

    // const searchStyle = {
    //     width: '100%',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center'
    // }

    // const getPlayers = () => {
    //     axios.get(`${backendUrl}/players/${playerType}`, { withCredentials: true })
    //     .then((response) => {
    //         console.log(response.data)
    //     })
    // }

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };
    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(+event.target.value);
    //     setPage(0);
    // };

    // useEffect(() => {
    //     console.log(tableData)
    // }, [])

    const handleSearch = (e) => {
        setPlayerSearch(e.target.value);
    }

    let searchResults = tableData;
    if (playerSearch !== "") {
        searchResults = tableData.filter((row) => {
            return row.first_name.toLowerCase().includes(playerSearch.toLowerCase()) || row.last_name.toLowerCase().includes(playerSearch.toLowerCase())
        })
    }

    const handleRowClick = (row) => {
        if (onRowClick){
            onRowClick(row);
            setPlayerSearch("");
        }
    }

    const TableElement = (
        <Paper sx={{ width: '100%', height: "100%", overflow: 'hidden' }}>
            <Box sx={{ overflow: 'hidden', paddingLeft: "10px", paddingTop: "5px" }}>
                <TextField id="txtPlayerSearch" label="Search Players" variant="standard" onChange={handleSearch}/>
            </Box>
            
            <TableContainer sx={{ height: "90%" }}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth}}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {searchResults
                    .map((row) => {
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={() => handleRowClick(row)}>
                            {columns.map((column) => {
                            const value = row[column.id];
                            return (
                                <TableCell key={column.id} align={column.align} style={{ cursor: "pointer" }}>
                                {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                            );
                            })}
                        </TableRow>
                        );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            {/* <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
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