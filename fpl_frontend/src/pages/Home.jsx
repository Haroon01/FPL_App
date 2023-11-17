import { Container, Row } from "react-bootstrap";

function Home(){
	const containerStyle = {
		backgroundColor: 'inherit',
		//minHeight: '100vh',
		color: "rgb(147, 177, 166)" // make global
		//color: "inherit"
	
	}
    return (
		<div className="home-container" >
			
			<Container style={containerStyle}>
				<Row className="justify-content-center">
					<h1>FPL app work in progress. Homepage</h1>
				</Row>

				
			
			</Container>
	  	</div>
    )
}

export default Home