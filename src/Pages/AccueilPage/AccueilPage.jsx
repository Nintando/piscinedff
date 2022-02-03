import { Container, Row, Button } from 'react-bootstrap'

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
								<a className="btn-primary btn btn-lg" href="https://reactrouter.com/">
									Documentation React Router
								</a>
								&nbsp;
							</Container>
						</div>
					</Row>
				</Container>
			</main>
		</div>
	)
}
