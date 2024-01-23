import NewTeam from "../components/NewTeam";

function Team(){
    const titleStyle = {
        display: "flex",
        justifyContent: "center",
        color: "rgb(147, 177, 166)"
    }
    return (
        <div>
            <h1 style={titleStyle}>Create your team</h1>
            {/* <NewTeam /> */}
        </div>
        
    )
}

export default Team;