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
            +
        </div>

    )
}

export default PlayerBlank