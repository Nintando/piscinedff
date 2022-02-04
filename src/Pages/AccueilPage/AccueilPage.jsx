import { Container, Row, Button, Col, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function HomePage() {
	const [carnet, setCarnet] = useState([])

	let displayCarnet = carnet.map((carnetInfos, indice) => {
		const id = carnetInfos.id
		return (
			<tr key={'carnets-' + carnetInfos.id}>
				<td>{carnetInfos.titre}</td>
				<td>
					<Button variant="outline-primary" as={Link} to={`/carnet/${carnetInfos.titre}`}>
						Carnet
					</Button>
				</td>
				<td>
					<Button variant="outline-danger" onClick={() => deleteCarnetItem(indice)}>
						Supprimer le carnet
					</Button>
				</td>
			</tr>
		)
	})

	function add() {
		let titre = window.prompt("Veuillez saisir l'intitulé de votre carnet")
		if (titre !== null && titre.trim().length > 0) {
			let tmp = [...carnet]
			let id = Date.now()
			let obj = { id, titre }
			tmp.push(obj)
			setCarnet(tmp)
		}
	}

	useEffect(() => {
		let datas = localStorage.getItem(`carnets`)
		setCarnet(JSON.parse(datas))
	}, [])

	useEffect(() => {
		localStorage.setItem(`carnets`, JSON.stringify(carnet))
	}, [carnet])

	function deleteCarnetItem(i) {
		let tmp = [...carnet]
		tmp.splice(i, 1)
		setCarnet(tmp)
	}

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
							</Container>
						</div>
					</Row>
					<Row className="mb-4 float-end">
						<Col>
							<Button className="float-end mb-2" onClick={add}>
								Créer un nouveau carnet
							</Button>
						</Col>
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>Titre</th>
									<th>Aller dans le carnet</th>
									<th>Supprimer</th>
								</tr>
							</thead>
							<tbody>{displayCarnet}</tbody>
						</Table>
					</Row>
				</Container>
			</main>
		</div>
	)
}
