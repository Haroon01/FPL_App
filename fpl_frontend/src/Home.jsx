import { Container, Row } from "react-bootstrap";
import Header from "./components/Header";
import PlayerBlank from './components/PlayerBlank'
import TeamView from "./components/TeamView";

function Home(){
	const containerStyle = {
		backgroundColor: 'inherit',
		minHeight: '100vh'
	}
    return (
		<div className="home-container" >
			<Header />
			<Container style={containerStyle}>
				<Row className="justify-content-center">
					<h1>FPL app work in progress. Homepage</h1>
				</Row>

				<TeamView />
			
			</Container>
	  	</div>
    )
}

export default Home