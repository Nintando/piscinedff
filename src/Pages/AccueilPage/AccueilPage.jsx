import { Container, Row, Button, Col, Table, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function HomePage() {
	const [carnet, setCarnet] = useState([])
	const [favoris, setFavoris] = useState([])
	const [config, setConfig] = useState('')
	const [nbNotes, setNbNotes] = useState(0)
	const [nbNotesCateg, setNbNotesCateg] = useState(0)

	let displayCarnet = carnet.map((carnetInfos, indice) => {
		const id = carnetInfos.id
		return (
			<tr key={'carnets-' + carnetInfos.id}>
				<td>{carnetInfos.titre}</td>
				<td>
					<Button
						variant="outline-success"
						onClick={() => {
							fav(indice)
						}}
					>
						Favoris
					</Button>
				</td>
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

	let displayCarnetCards = carnet.map((carnetInfos, indice) => {
		const id = carnetInfos.id
		return (
			<Card className="text-center m-2" style={{ width: '18rem' }} key={'carnets-' + carnetInfos.id}>
				<Card.Header as="h5">{carnetInfos.titre}</Card.Header>
				<Card.Body>
					{favoris !== id && (
						<Button
							className="mb-2"
							variant="outline-success"
							onClick={() => {
								fav(indice)
							}}
						>
							Favoris
						</Button>
					)}

					{favoris !== id && (
						<Button
							className="mb-2"
							variant="outline-secondary"
							onClick={() => {
								deleteFavItem(indice)
							}}
						>
							Retirer du Favoris
						</Button>
					)}

					<Button className="mb-2" variant="outline-primary" as={Link} to={`/carnet/${carnetInfos.titre}`}>
						Aller dans le Carnet
					</Button>
					<Button variant="outline-danger" onClick={() => deleteCarnetItem(indice)}>
						Supprimer le carnet
					</Button>
				</Card.Body>
			</Card>
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
		for (let i = 0; i < carnet.length; i++) {
			let total = localStorage.getItem(`notes-${carnet[i].titre}`)
			total = JSON.parse(total)
			if (total !== null) {
				let nbToto = total.length
				setNbNotes(old => old + nbToto)
				console.log(nbToto)
			}
		}
	}, [carnet])

	useEffect(() => {
		let configuration = localStorage.getItem('configC')
		setConfig(configuration)
	}, [])

	useEffect(() => {
		let favs = localStorage.getItem(`favoris`)
		setFavoris(JSON.parse(favs))
	}, [])

	useEffect(() => {
		localStorage.setItem('favoris', JSON.stringify(favoris))
	}, [favoris])

	function fav(i) {
		let fav = carnet[i].titre
		let tmp = [...favoris]
		let id = Date.now()
		let obj = { id, fav }
		tmp.push(obj)
		setFavoris(tmp)

		console.log(tmp)
	}

	function deleteFavItem(i) {
		let tmp = [...favoris]
		tmp.splice(i, 1)
		setFavoris(tmp)
	}

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
								<h3>Le nombre de carnets de notes : {carnet.length}</h3>
								<h3>Le nombre de notes totales : {nbNotes} </h3>
							</Container>
						</div>
						<Col>
							<Button className=" mb-2" onClick={add}>
								Créer un nouveau carnet
							</Button>
						</Col>
					</Row>
					<Row className="mb-4 ">
						{config !== 'cardsCarnets' && (
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>Titre</th>
										<th>Mettre en favoris</th>
										<th>Aller dans le carnet</th>
										<th>Supprimer</th>
									</tr>
								</thead>
								<tbody>{displayCarnet}</tbody>
							</Table>
						)}
						{config === 'cardsCarnets' && displayCarnetCards}
					</Row>
				</Container>
			</main>
		</div>
	)
}
