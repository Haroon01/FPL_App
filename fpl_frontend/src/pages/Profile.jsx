import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Box, styled, Container, useTheme } from '@mui/material';
import backendUrl from '../config';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const containerStyle = { 
    display: 'flex', 
    alignItems: 'flex-start', 
    //direction: 'column',
    justifyContent: 'space-evenly',
    minHeight: '90vh', 
    paddingTop: 16,
    //backgroundColor:'grey' 
}



const Profile = () => {
    const theme = useTheme();
    const [profileData, setProfileData] = useState({})


    function getProfileData(){
        axios.get(`${backendUrl}/profile/data`, {withCredentials: true})
        .then((response) => {
            setProfileData(response.data)
        })
    }

    useEffect(() => {
        getProfileData()
    }, [])


    return (
        <>
            <Container component="main" maxWidth="xl" style={containerStyle}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h2' color={theme.palette.text.primary}>{profileData.username}'s Profile</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>Name</Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>{profileData.first_name} {profileData.last_name}</Item>
                    </Grid>

                    <Grid item xs={4}>
                        <Item>Email</Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>{profileData.email}</Item>
                    </Grid>

                    <Grid item xs={4}>
                        <Item>User Since</Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>{new Date(profileData.user_since).toLocaleDateString('en-GB')}</Item>
                    </Grid>

                </Grid>

            </Container>
        </>

    );
};

export default Profile;