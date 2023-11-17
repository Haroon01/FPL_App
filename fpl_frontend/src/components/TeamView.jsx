import { Col, Row, Container } from "react-bootstrap";
import PlayerBlank from "./PlayerBlank";

function TeamView(){
    const teamViewStyle = {
        height: "600px",
        width: "400px",
        backgroundColor: "lightblue",
    }
    return (
        <Container style={teamViewStyle}>
            <Row>
                <Col>
                    <PlayerBlank/>
                </Col> 
                <Col>
                    <PlayerBlank/>
                </Col> 
            </Row>
            <Row>
                <Col>
                    <PlayerBlank/>
                </Col> 
                <Col>
                    <PlayerBlank/>
                </Col> 
                <Col>
                    <PlayerBlank/>
                </Col> 
                <Col>
                    <PlayerBlank/>
                </Col> 
                <Col>
                    <PlayerBlank/>
                </Col> 
            
            </Row>
            <Row>
                <Col>
                    <PlayerBlank/>
                </Col> 
                <Col>
                    <PlayerBlank/>
                </Col> 
                <Col>
                    <PlayerBlank/>
                </Col> 
                <Col>
                    <PlayerBlank/>
                </Col> 
                <Col>
                    <PlayerBlank/>
                </Col> 
            
            </Row>
            <Row>
                <Col>
                    <PlayerBlank/>
                </Col> 
                <Col>
                    <PlayerBlank/>
                </Col> 
                <Col>
                    <PlayerBlank/>
                </Col> 
            </Row>
        </Container>
    );
}

export default TeamView