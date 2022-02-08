import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function AppNavbar() {
	const [favorisBar, setFavorisBar] = useState([])

	useEffect(() => {
		let datas = localStorage.getItem('favoris')
		setFavorisBar(JSON.parse(datas))
	}, [favorisBar])

	let displayFav = favorisBar.map(favBar => {
		const id = favBar.id
		return (
			<Nav.Link key={id} as={Link} to={`/carnet/${favBar.fav}`}>
				{favBar.fav}
			</Nav.Link>
		)
	})

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
						<Nav.Link as={Link} to="/config">
							Config Global
						</Nav.Link>
						{displayFav}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}
