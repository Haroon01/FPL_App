import { Col, Row, Container, Modal } from "react-bootstrap";
import PlayerBlank from "./PlayerBlank";
import {useState} from 'react'

function NewTeam(){
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = ()=>{setShowModal(true)}
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
                    Placeholder for the players that will be hereee!!!
                </Modal.Body>
                
            </Modal>
        </>
        
    );
}

export default NewTeam