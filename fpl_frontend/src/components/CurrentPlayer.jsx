import { useTheme } from '@emotion/react';
import { Button, styled, alpha } from '@mui/material';

function CurrentPlayer(props){
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
        fontSize: '0.6rem', // Adjust the text size
        display: 'flex', // Make the button a flex container
        justifyContent: 'center', // Center the text horizontally
        alignItems: 'flex-end', // Position the text at the bottom
        paddingBottom: '10px', // Add some padding at the bottom to give the text some space
      }));
    return (
        <StyledButton variant="outlined" onClick={handleClick}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '2em', marginBottom: "10px" }}>{playerData.points}</div>
                <div>{playerData.short_name}</div>
            </div>
        </StyledButton>

    )
}

export default CurrentPlayer