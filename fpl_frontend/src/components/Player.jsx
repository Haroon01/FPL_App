import { useTheme } from '@emotion/react';
import { Button, styled, alpha } from '@mui/material';

function Player(props){
    // const {propName, propName2} = props <-- this is how to access props.
    const { handleClick, playerData } = props;
    const theme = useTheme();
    const playerStyle = {
        height: "50px",
        width: "50px"
    }

    const StyledButton = styled(Button)(({ theme }) => ({
        color: theme.palette.secondary.main, // Set the color of the text and the outline
        borderColor: theme.palette.secondary.main,
        backgroundColor: 'transparent', // Set the background color to transparent
        '&:hover': {
          backgroundColor: alpha(theme.palette.secondary.main, 0.1), // Keep the background color transparent when hovered
          borderColor: theme.palette.secondary.main,
        },
        height: 100,
        width: 50,
      }));
    return (
        <StyledButton variant="outlined" onClick={handleClick}>{playerData ? `${playerData.short_name}` : "+"}</StyledButton>

    )
}

export default Player