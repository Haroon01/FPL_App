import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Container, Paper, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import backendUrl from '../config';
import axios from 'axios'

function Signup(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [signUpFailSB, setSignUpFailSB] = useState(false); // SB = Snackbar
    const [SFMsg, setSFMsg] = useState(""); // SFMsg = Sign Up Fail Message
    const navigate = useNavigate()

    function handleSignUpSuccess(){
        navigate("/login", {state: {signUpSuccess: true}});
    }

    function handleSignUpFail(msg){
        setSFMsg(msg)
        setSignUpFailSB(true);
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSignUpFailSB(false);
    };

    const signUpFailSnackbar = (
        <Snackbar open={signUpFailSB} autoHideDuration={5000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="error" variant="filled" sx={{ width: '100%' }}>{SFMsg}</Alert>
        </Snackbar>
    )
    

    function handleSignUp(){
        if (!username || !password || !fname || !lname || !email){
            handleSignUpFail("All fields are mandatory")
        } else {
            axios.post(`${backendUrl}/signup/createaccount`, {
                username: username,
                password: password,
                first_name: fname,
                last_name: lname,
                email: email
            }).then((response) => {
                console.log(response.data)
                if (response.status === 201){
                    handleSignUpSuccess();
                } else if (response.status === 500){
                    handleSignUpFail("Internal Server Error (Code: 500)");
                }                
            }).catch((err) => {
                console.log("axios error")
                let error = err.response
                let err_field = error.data.errors[0].field
                console.log(error.data.errors[0].field)
                if (error.status === 400){
                    if (err_field == "username"){
                        handleSignUpFail("Username has been taken")
                    } else if (err_field == "email") {
                        handleSignUpFail("Email is already in use")
                    }
                }
            })
        }
    }

    return (
        <Container component="main" maxWidth="xs" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '90vh' }}>
            {signUpFailSnackbar}
            <Paper elevation={3} style={{ padding: 16, width: '100%', maxWidth: 400 }}>
                <Typography variant="h5" gutterBottom>
                    Sign up
                </Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="First Name(s)"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={fname}
                    onChange={(e) => setFName(e.target.value)}
                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={lname}
                    onChange={(e) => setLName(e.target.value)}
                />

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
                <Button variant="contained" color="primary" fullWidth onClick={handleSignUp}>
                    Create Account
                </Button>
                <Typography variant="caption">Already have an account? Click <a href="/login">here</a> to sign in</Typography>
            </Paper>
        </Container>

      );
}

export default Signup;
