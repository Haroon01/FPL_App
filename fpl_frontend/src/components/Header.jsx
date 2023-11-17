import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//bg-body-tertiary className="navbar"

function Header(){
    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="dark" fixed="top">
            <Container>
                <Navbar.Brand href="/">FPL Reloaded</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" className='navItem'>Home</Nav.Link>
                        <Nav.Link href="/team" className='navItem'>Team</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default Header;