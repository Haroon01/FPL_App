import { useTheme } from '@emotion/react';
import { Container, Paper, Typography, TextField, Button, Snackbar, Alert, styled, alpha, Grid } from '@mui/material';

function Team(){
    const theme = useTheme();
    const StyledButton = styled(Button)(({ theme }) => ({
        color: theme.palette.secondary.main, // Set the color of the text and the outline
        borderColor: theme.palette.secondary.main,
        backgroundColor: 'transparent', // Set the background color to transparent
        '&:hover': {
          backgroundColor: alpha(theme.palette.secondary.main, 0.1), // Keep the background color transparent when hovered
          borderColor: theme.palette.secondary.main,
        },
        height: 100,
        width: 50
      }));

    function handleClick(playerType){
        console.log(playerType)
    }
    return (
        <Container component="main" maxWidth="xs" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '90vh' }}>
            <Paper elevation={3} style={{ padding: 16, width: 400, height: 500, backgroundColor: theme.palette.primary.main}}>
                <Grid container spacing={2} sx={{ width: '100%', height:'100%', justifyContent: 'space-between' }}>
                    {/** Goalkeepers */}
                    <Grid item xs={2.4} />
                    <Grid item xs={2.4}>
                        <StyledButton variant="outlined" onClick={() => {handleClick("gk")}}>+</StyledButton>
                    </Grid>
                    <Grid item xs={2.4} />
                    <Grid item xs={2.4}>
                        <StyledButton variant="outlined" onClick={() => {handleClick("gk")}}>+</StyledButton>
                    </Grid>
                    <Grid item xs={2.4} />

                    {/** Defenders */}
                    <Grid item xs={2.4}>
                        <StyledButton variant="outlined" onClick={() => (handleClick("def"))}>+</StyledButton>
                    </Grid>
                    <Grid item xs={2.4}>
                        <StyledButton variant="outlined" onClick={() => {handleClick("def")}}>+</StyledButton>
                    </Grid>
                    <Grid item xs={2.4}>
                        <StyledButton variant="outlined" onClick={() => {handleClick("def")}}>+</StyledButton>
                    </Grid>
                    <Grid item xs={2.4}>
                        <StyledButton variant="outlined" onClick={() => {handleClick("def")}}>+</StyledButton>
                    </Grid>
                    <Grid item xs={2.4}>
                        <StyledButton variant="outlined" onClick={() => {handleClick("def")}}>+</StyledButton>
                    </Grid>

                    {/** Midfielders */}
                    <Grid item xs={2.4}>
                        <StyledButton variant="outlined" onClick={() => {handleClick("mid")}}>+</StyledButton>
                    </Grid>
                    <Grid item xs={2.4}>
                        <StyledButton variant="outlined" onClick={() => {handleClick("mid")}}>+</StyledButton>
                    </Grid>
                    <Grid item xs={2.4}>
                        <StyledButton variant="outlined" onClick={() => {handleClick("mid")}}>+</StyledButton>
                    </Grid>
                    <Grid item xs={2.4}>
                        <StyledButton variant="outlined" onClick={() => {handleClick("mid")}}>+</StyledButton>
                    </Grid>
                    <Grid item xs={2.4}>
                        <StyledButton variant="outlined" onClick={() => {handleClick("mid")}}>+</StyledButton>
                    </Grid>

                    {/** Strikers/Forwards */}
                    <Grid item xs={2.4}>
                        <StyledButton variant="outlined" onClick={() => {handleClick("fw")}}>+</StyledButton>
                    </Grid>
                    <Grid item xs={2.4}>
                        <StyledButton variant="outlined" onClick={() => {handleClick("fw")}}>+</StyledButton>
                    </Grid>
                    <Grid item xs={2.4}>
                        <StyledButton variant="outlined" onClick={() => {handleClick("fw")}}>+</StyledButton>
                    </Grid>
                </Grid>
                
            </Paper>
        </Container>
        
    )
}

export default Team;