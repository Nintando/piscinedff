import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function AppNavbar() {
	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<Navbar.Brand href="/">App Carnet de Note</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/">
							Accueil
						</Nav.Link>
						<Nav.Link as={Link} to="/carnet/add">
							Créer une note
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}
