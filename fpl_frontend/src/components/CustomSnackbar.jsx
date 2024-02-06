// const signUpSuccessSnackbar = (
//     <Snackbar open={loginSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
//         <Alert onClose={handleCloseSnackbar} severity="success" variant="filled" sx={{ width: '100%' }}>Success! You can now log in.</Alert>
//     </Snackbar>
// )

import React from "react";
import { Snackbar, Alert } from "@mui/material";


function CustomSnackbar({open, handleCloseSnackbar, severity, message}){
    return (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={severity} variant="filled" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default CustomSnackbar;