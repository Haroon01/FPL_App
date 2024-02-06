import { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import backendUrl from '../config';
import { useLocation, useNavigate } from 'react-router-dom'
import CustomSnackbar from '../components/CustomSnackbar';

function Login( {setIsLoggedIn }){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginSnackbar, setLoginSnackbar] = useState(false);
    const { state } = useLocation();
    const navigate = useNavigate()



    useEffect(() => {
        if (state && state.signUpSuccess){
            setLoginSnackbar(true)
        }
    }, [state]) // [state] means it will only run once state is true. so sb gets set to true and is visible. [] means it runs when the component is mounted

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setLoginSnackbar(false);
      };

    const signUpSuccessSnackbar = (
        <CustomSnackbar
            open={loginSnackbar}
            handleCloseSnackbar={handleCloseSnackbar}
            severity="success"
            message="Success! You can now log in."
        />
    )

    function handleLogin(){
        axios.post(`${backendUrl}/auth/fetchaccount`, {
            username: username,
            password: password
        }, {
            withCredentials: true
        })
        .then((response) => {
            console.log(response.data)
            if (response.status === 200){
                console.log("Reponse was 200 and login was successful! now implement the rest!")
                setIsLoggedIn(true);
                navigate("/");

            }
        })
        .catch((error) => {
            if (error.response.status === 401){
                console.log("Login failed")
            }
            console.log(error)
        })
        return null;
    }

    return (
        <Container component="main" maxWidth="xs" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '90vh' }}>
            {signUpSuccessSnackbar}
            <Paper elevation={3} style={{ padding: 16, width: '100%', maxWidth: 400 }}>
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>
                <TextField
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                    Log In
                </Button>
                <Typography variant="caption">Dont have an account? Click <a href="/signup">here</a> to register</Typography>
            </Paper>
        </Container>

      );
}

export default Login;

{/* <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
test
</Box> */}