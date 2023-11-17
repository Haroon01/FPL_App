import { Col, Row, Container } from "react-bootstrap";
import PlayerBlank from "./PlayerBlank";

function TeamView(){
    const teamViewStyle = {
        height: "100%",
        width: "400px",
        backgroundColor: "5C8374",
        padding: "20px"
    }
    const rowStyle = {
        marginBottom: "50px",
        //marginTop: "50px"
    }

    return (
        <Container style={teamViewStyle}>
            <Row style={rowStyle}>
                <Col>
                    <PlayerBlank/>
                </Col> 
                <Col>
                    <PlayerBlank/>
                </Col> 
            </Row>
            <Row style={rowStyle}>
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
            <Row style={rowStyle}>
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
            <Row style={rowStyle}>
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