import { Col, Row, Container, Modal } from "react-bootstrap";
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
                await axios.get("http://localhost:3001/api/players").then((response) => {
                    setPlayers(response.data)
                })
            } finally {
                setLoading(false)
            }
        }
        setShowModal(true)
        console.log(players)
    }
    const handleHideModal = ()=>{setShowModal(false)}

    // useEffect(() => {
    //     axios.get("http://localhost:3001/api/players").then((response) => {
    //         setPlayers(response.data)
    //     })
    // }, [])



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

    return (
        <>
            <Container style={newTeamStyle}>
                <Row style={rowStyle}>
                    <Col>
                        <PlayerBlank onClick={handleShowModal}/>
                    </Col> 
                    <Col>
                        <PlayerBlank onClick={handleShowModal}/>
                    </Col> 
                </Row>
                <Row style={rowStyle}>
                    <Col>
                        <PlayerBlank onClick={handleShowModal}/>
                    </Col> 
                    <Col>
                        <PlayerBlank onClick={handleShowModal}/>
                    </Col> 
                    <Col>
                        <PlayerBlank onClick={handleShowModal}/>
                    </Col> 
                    <Col>
                        <PlayerBlank onClick={handleShowModal}/>
                    </Col> 
                    <Col>
                        <PlayerBlank onClick={handleShowModal}/>
                    </Col> 
                
                </Row>
                <Row style={rowStyle}>
                    <Col>
                        <PlayerBlank onClick={handleShowModal}/>
                    </Col> 
                    <Col>
                        <PlayerBlank onClick={handleShowModal}/>
                    </Col> 
                    <Col>
                        <PlayerBlank onClick={handleShowModal}/>
                    </Col> 
                    <Col>
                        <PlayerBlank onClick={handleShowModal}/>
                    </Col> 
                    <Col>
                        <PlayerBlank onClick={handleShowModal}/>
                    </Col> 
                
                </Row>
                <Row style={rowStyle}>
                    <Col>
                        <PlayerBlank onClick={handleShowModal}/>
                    </Col> 
                    <Col>
                        <PlayerBlank onClick={handleShowModal}/>
                    </Col> 
                    <Col>
                        <PlayerBlank onClick={handleShowModal}/>
                    </Col> 
                </Row>
            </Container>

            <Modal show={showModal} onHide={handleHideModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Pick Player:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        loading ? (
                            <h1>loading</h1>
                        ) : (
                            players.map((player) => {
                                <p1>{player.first_name}</p1>
                            })
                        )
                    }
                </Modal.Body>
                
            </Modal>
        </>
        
    );
}

export default NewTeam