import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Box } from '@mui/material';

const initialData = [
    {
        id: 5,
        first_name: "Gabriel",
        last_name: "dos Santos Magalhães",
        pos: "Defender",
        points: 0,
        chance_of_playing_next_round: 75,
        chance_of_playing_this_round: 100,
        form: "3.0",
        selected_by_percent: "26.7",
        now_cost: 53,
        news: "Knock - 75% chance of playing",
        news_added: "2024-03-18T22:00:08.938811Z",
        fpl_id: 5,
        squad_number: null,
        team: 1,
        short_name: "Gabriel",
        club_name: "Arsenal",
        createdAt: "2024-03-19T14:18:09.000Z",
        updatedAt: "2024-03-19T14:18:09.000Z"
    },
    {
        id: 11,
        first_name: "Gabriel",
        last_name: "Martinelli Silva",
        pos: "Midfielder",
        points: 0,
        chance_of_playing_next_round: 75,
        chance_of_playing_this_round: 75,
        form: "5.7",
        selected_by_percent: "5.1",
        now_cost: 77,
        news: "Gashed Leg - 75% chance of playing",
        news_added: "2024-03-05T09:00:08.920090Z",
        fpl_id: 12,
        squad_number: null,
        team: 1,
        short_name: "Martinelli",
        club_name: "Arsenal",
        createdAt: "2024-03-19T14:18:09.000Z",
        updatedAt: "2024-03-19T14:18:09.000Z"
    },
    {
        id: 60,
        first_name: "Jacob",
        last_name: "Ramsey",
        pos: "Midfielder",
        points: 0,
        chance_of_playing_next_round: 50,
        chance_of_playing_this_round: 50,
        form: "1.5",
        selected_by_percent: "0.1",
        now_cost: 59,
        news: "Foot injury - 50% chance of playing",
        news_added: "2024-03-02T21:30:08.666181Z",
        fpl_id: 55,
        squad_number: null,
        team: 2,
        short_name: "J.Ramsey",
        club_name: "Aston Villa",
        createdAt: "2024-03-19T14:18:09.000Z",
        updatedAt: "2024-03-19T14:18:09.000Z"
    },
    {
        id: 87,
        first_name: "James",
        last_name: "Hill",
        pos: "Defender",
        points: 0,
        chance_of_playing_next_round: 50,
        chance_of_playing_this_round: 0,
        form: "0.2",
        selected_by_percent: "0.1",
        now_cost: 40,
        news: "Ankle injury - 50% chance of playing",
        news_added: "2024-01-26T02:00:09.620549Z",
        fpl_id: 69,
        squad_number: null,
        team: 3,
        short_name: "Hill",
        club_name: "Bournemouth",
        createdAt: "2024-03-19T14:18:09.000Z",
        updatedAt: "2024-03-19T14:18:09.000Z"
    },
    {
        id: 101,
        first_name: "Marcos",
        last_name: "Senesi",
        pos: "Defender",
        points: 0,
        chance_of_playing_next_round: 50,
        chance_of_playing_this_round: 0,
        form: "0.5",
        selected_by_percent: "2.9",
        now_cost: 45,
        news: "Hamstring injury - 50% chance of playing",
        news_added: "2024-03-03T20:30:08.710919Z",
        fpl_id: 83,
        squad_number: null,
        team: 3,
        short_name: "Senesi",
        club_name: "Bournemouth",
        createdAt: "2024-03-19T14:18:09.000Z",
        updatedAt: "2024-03-19T14:18:09.000Z"
    },
    {
        id: 141,
        first_name: "Ethan",
        last_name: "Pinnock",
        pos: "Defender",
        points: 0,
        chance_of_playing_next_round: 50,
        chance_of_playing_this_round: 0,
        form: "0.0",
        selected_by_percent: "1.6",
        now_cost: 45,
        news: "Ankle injury - 50% chance of playing",
        news_added: "2024-02-17T19:00:09.155597Z",
        fpl_id: 112,
        squad_number: null,
        team: 4,
        short_name: "Pinnock",
        club_name: "Brentford",
        createdAt: "2024-03-19T14:18:09.000Z",
        updatedAt: "2024-03-19T14:18:09.000Z"
    }
];



const SearchPlayers = () => {
    const [data, setData] = useState(initialData);
    const [search, setSearch] = useState('');

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearch(value);
        filterData(value);
    };

    const filterData = (searchValue) => {
        const filteredData = initialData.filter(item => 
            item.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setData(filteredData);
    };

    return (
        <Box sx={{ m: 3, }}>

            <TableContainer component={Paper} style={{  overflow: "auto" }}>
                <TextField 
                    label="Search"
                    variant="outlined"
                    fullWidth
                    value={search}
                    onChange={handleSearchChange}
                    sx={{ mb: 2, marginTop: 1}}
                />
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.short_name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default SearchPlayers;