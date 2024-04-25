import { useTheme, useState } from '@emotion/react';
import { Button, styled, alpha, Typography } from '@mui/material';

function CurrentPlayer(props){
    // const {propName, propName2} = props <-- this is how to access props.
    const { handleClick, playerData, isSelected, isDisabled } = props;
    //console.log(isSelected)
    const theme = useTheme();
    const playerStyle = {
        height: "50px",
        width: "50px"
    }

    const StyledButton = styled(Button)(({ theme }) => ({
        color: isDisabled && !isSelected ? alpha(theme.palette.secondary.main, 0.5) : theme.palette.secondary.main, // Set the color of the text and the outline
        borderColor: isDisabled && !isSelected ? alpha(theme.palette.secondary.main, 0.5) : theme.palette.secondary.main,
        backgroundColor: isSelected ? alpha(theme.palette.secondary.main, 0.5) : 'transparent', // Set the background color to transparent
        '&:hover': isSelected ? {
            borderColor: theme.palette.secondary.main,
            backgroundColor: isSelected ? alpha(theme.palette.secondary.main, 0.5) : 'transparent', // Set the background color to transparent
        } : {
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
        pointerEvents: isDisabled && !isSelected ? 'none' : ''
      }));

    const posAbbreviation = (player) => {
        switch(player.pos){
            case "Goalkeeper":
                return "GK";
            case "Defender":
                return "DEF";
            case "Midfielder":
                return "MID";
            case "Forward":
                return "FWD";
            default:
                return "N/A";
        }

    }
    return (
        <StyledButton variant="outlined" onClick={handleClick}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', height: '100%' }}>
                <Typography variant={"caption"} style={{ position: 'absolute', top: 0, opacity: 0.5 }}>{posAbbreviation(playerData)}</Typography>
                <div style={{ margin: 'auto', fontSize: '2em' }}>{playerData.points}</div>
                <div style={{ position: 'absolute', bottom: -7 }}>{playerData.short_name}</div>
            </div>
        </StyledButton>

    )
}

export default CurrentPlayer