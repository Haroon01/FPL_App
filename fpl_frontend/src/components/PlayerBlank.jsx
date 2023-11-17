import { Button } from "react-bootstrap";

function PlayerBlank(){
    const playerBlankStyle = {
        height: "50px",
        width: "50px"
    }
    let containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    return (
        <div style={containerStyle}>
            <Button variant="outline-light" style={playerBlankStyle}>
                +
            </Button>
        </div>

    )
}

export default PlayerBlank