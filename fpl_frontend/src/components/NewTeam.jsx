
import PlayerBlank from "./PlayerBlank";
import {useState, useEffect} from 'react'
import axios from 'axios'

function NewTeam(){
    const [showModal, setShowModal] = useState(false)
    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(false)

    const handleShowModal = async () => { // FIX: array empty when logging it out. need to map array to modal below
        //setShowModal(true) 

        if(!players.length && !loading){
            setLoading(true)
            try{
                let response = await axios.get("http://localhost:3001/api/players")
                //console.log(response.data)
                setPlayers(response.data)
            } finally {
                setLoading(false)
            }
        }
        setShowModal(true)
    } // handleShowModal
    const handleHideModal = ()=>{setShowModal(false)}


    const newTeamStyle = {
        height: "100%",
        width: "400px",
        backgroundColor: "#5C8374",
        padding: "20px",
        borderRadius: "20px"
    }
    const rowStyle = {
        marginBottom: "50px",
        //marginTop: "50px"
    }

    const tableStyles = {
        container: {
          maxHeight: "400px",
          overflowY: "auto",
        },
        table: {
          width: "100%",
          overflow: "auto",
        },
        th: {
          position: "-webkit-sticky",
          position: "sticky",
          top: "0",
          backgroundColor: "#fff",
          zIndex: "1",
        },
      };

      return (
        <p>NewTeam</p>
      )
    // return (
    //     <>
    //         <Container style={newTeamStyle}>
    //             <Row style={rowStyle}>
    //                 <Col>
    //                     <PlayerBlank onClick={handleShowModal}/>
    //                 </Col> 
    //                 <Col>
    //                     <PlayerBlank onClick={handleShowModal}/>
    //                 </Col> 
    //             </Row>
    //             <Row style={rowStyle}>
    //                 <Col>
    //                     <PlayerBlank onClick={handleShowModal}/>
    //                 </Col> 
    //                 <Col>
    //                     <PlayerBlank onClick={handleShowModal}/>
    //                 </Col> 
    //                 <Col>
    //                     <PlayerBlank onClick={handleShowModal}/>
    //                 </Col> 
    //                 <Col>
    //                     <PlayerBlank onClick={handleShowModal}/>
    //                 </Col> 
    //                 <Col>
    //                     <PlayerBlank onClick={handleShowModal}/>
    //                 </Col> 
                
    //             </Row>
    //             <Row style={rowStyle}>
    //                 <Col>
    //                     <PlayerBlank onClick={handleShowModal}/>
    //                 </Col> 
    //                 <Col>
    //                     <PlayerBlank onClick={handleShowModal}/>
    //                 </Col> 
    //                 <Col>
    //                     <PlayerBlank onClick={handleShowModal}/>
    //                 </Col> 
    //                 <Col>
    //                     <PlayerBlank onClick={handleShowModal}/>
    //                 </Col> 
    //                 <Col>
    //                     <PlayerBlank onClick={handleShowModal}/>
    //                 </Col> 
                
    //             </Row>
    //             <Row style={rowStyle}>
    //                 <Col>
    //                     <PlayerBlank onClick={handleShowModal}/>
    //                 </Col> 
    //                 <Col>
    //                     <PlayerBlank onClick={handleShowModal}/>
    //                 </Col> 
    //                 <Col>
    //                     <PlayerBlank onClick={handleShowModal}/>
    //                 </Col> 
    //             </Row>
    //         </Container>

    //         <Modal show={showModal} onHide={handleHideModal} >
    //             <Modal.Header closeButton>
    //                 <Modal.Title>Pick Player:</Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body style={tableStyles.container}>
    //                 <Table style={tableStyles.table}>
    //                     <thead>
    //                         <tr>
    //                             <th style={tableStyles.th}>Name</th>
    //                             <th style={tableStyles.th}>Pos</th>
    //                             <th style={tableStyles.th}>Points</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         {
    //                             players.map((player) => {
    //                                 return (
    //                                     <tr key={player.id}>
    //                                         <td>{player.first_name} {player.last_name}</td>
    //                                         <td>{player.pos}</td>
    //                                         <td>{player.points}</td>
    //                                     </tr>
    //                                 )
    //                             })
    //                         }

    //                     </tbody>
    //                 </Table>
    //             </Modal.Body>
                
    //         </Modal>
    //     </>
        
    // );
}

export default NewTeam