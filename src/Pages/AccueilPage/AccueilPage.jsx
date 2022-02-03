import { Container, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function HomePage() {
	return (
		<div className="App">
			<main>
				<Container>
					<Row>
						<div className="p-5 mb-4 bg-light rounded-3">
							<Container fluid className="py-5">
								<h1 className="display-5 fw-bold">BTC Single Page Application</h1>
								<p className="col-md-8 fs-4">Piscine ReactJs</p>
								&nbsp;
								<h1 className="display-5 fw-bold">Statistiques</h1>
								<Button className="float-end" variant="outline-primary" size="lg" as={Link} to="/carnet/:group">
									Carnet de notes
								</Button>
							</Container>
						</div>
					</Row>
				</Container>
			</main>
		</div>
	)
}
