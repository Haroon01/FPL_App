import React, { useEffect, useState, useRef } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Box, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import backendUrl from '../config';
import PlayerDetailsModal from '../components/PlayerDetailsModal';


const SearchPlayers = () => {
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState({});

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const getPlayers = () => {
        setLoading(true);
        axios.get(`${backendUrl}/players/type/all`, { withCredentials: true })
        .then((response) => {
            setData(response.data)
            setOriginalData(response.data)
            setLoading(false);
        })
    }

    const handleSearchChange = (event) => {
        setLoading(true);
        const value = event.target.value;
        setSearch(value);
        setTimeout(() => {
            if (value === '') {
                setData(originalData);
            } else {
                filterData(value);
            }
            setLoading(false);
        }, 0);
    };


    const filterData = (searchValue) => {
        const lowercasedSearchValue = searchValue.toLowerCase();
        const filteredData = data.filter(item => 
            item.first_name.toLowerCase().includes(lowercasedSearchValue) ||
            item.last_name.toLowerCase().includes(lowercasedSearchValue)
        );
        setData(filteredData);
    };

    const handleRowClick = (row) => {
        console.log(row)
        setSelectedPlayer(row);
        setIsModalOpen(true);
    }


    useEffect(() => {
        getPlayers();
    }, []);

    return (
        <Box sx={{ m: 3, }}>
            <PlayerDetailsModal open={isModalOpen} onClose={handleCloseModal} playerData={selectedPlayer}/>
            <TableContainer component={Paper} style={{ height: "80vh", overflow: "auto" }}>
                <Box sx={{ mb: 2, marginTop: 1, position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#fff'}}>
                    <TextField 
                        label="Search"
                        variant="outlined"
                        fullWidth
                        value={search}
                        onChange={handleSearchChange}
                    />
                </Box>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', mt: -10 }}>
                        <Typography variant="h4">Please wait...</Typography>
                    </Box>
                ) : (
                    <Table aria-label="simple table">
                        <TableHead sx={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#fff' }}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Club</TableCell>
                                <TableCell>Position</TableCell>
                                <TableCell>Chance of playing next game</TableCell>
                                <TableCell>Form</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row.id} onClick={() => {handleRowClick(row)}} sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#e6e6e6" } }}>
                                    <TableCell>{row.first_name} {row.last_name}</TableCell>
                                    <TableCell>{row.club_name}</TableCell>
                                    <TableCell>{row.pos}</TableCell>
                                    <TableCell>{row.chance_of_playing_next_round !== null ? row.chance_of_playing_next_round : 100}%</TableCell>
                                    <TableCell>{row.form}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
        </Box>
    );
};

export default SearchPlayers;