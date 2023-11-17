import { Button } from "react-bootstrap";

function PlayerBlank(props){
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
            <Button variant="outline-light" style={playerBlankStyle} onClick={props.onClick}>
                +
            </Button>
        </div>

    )
}

export default PlayerBlank