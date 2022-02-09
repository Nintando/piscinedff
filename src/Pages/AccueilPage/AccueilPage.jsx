import { Container, Row, Button, Col, Table, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function HomePage() {
	const [carnet, setCarnet] = useState([])
	const [favoris, setFavoris] = useState([])
	const [config, setConfig] = useState('')
	const [nbNotes, setNbNotes] = useState(0)

	// Affichage en liste des carnets de notes
	let displayCarnet = carnet.map((carnetInfos, indice) => {
		const id = carnetInfos.id
		const isfavoris = carnetInfos.favoris

		return (
			<tr key={'carnets-' + carnetInfos.id}>
				<td>{carnetInfos.titre}</td>
				<td>
					{isfavoris === false && (
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

					{isfavoris === true && (
						<Button
							className="mb-2"
							variant="outline-secondary"
							onClick={() => {
								deleteFavItem(id, indice)
							}}
						>
							Retirer du Favoris
						</Button>
					)}
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

	// Affichage en cards des carnets de notes
	let displayCarnetCards = carnet.map((carnetInfos, indice) => {
		const id = carnetInfos.id
		const isfavoris = carnetInfos.favoris
		return (
			<Card className="text-center m-2" style={{ width: '18rem' }} key={'carnets-' + carnetInfos.id}>
				<Card.Header as="h5">{carnetInfos.titre}</Card.Header>
				<Card.Body>
					{isfavoris === false && (
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

					{isfavoris === true && (
						<Button
							className="mb-2"
							variant="outline-secondary"
							onClick={() => {
								deleteFavItem(id, indice)
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

	// Fonction qui permet l'ajout d'un carnet de notes
	function add() {
		let titre = window.prompt("Veuillez saisir l'intitulé de votre carnet")
		if (titre !== null && titre.trim().length > 0) {
			let tmp = [...carnet]
			let id = Date.now()
			let obj = { id, titre, favoris: false }
			tmp.push(obj)
			setCarnet(tmp)
		}
	}

	// Récupération des carnets dans le localStorage
	useEffect(() => {
		let datas = localStorage.getItem(`carnets`)
		setCarnet(JSON.parse(datas))
	}, [])

	// Envoye des carnets dans le localStorage
	useEffect(() => {
		localStorage.setItem(`carnets`, JSON.stringify(carnet))

		// Permet de calculer le nombre de notes totales
		for (let i = 0; i < carnet.length; i++) {
			let total = localStorage.getItem(`notes-${carnet[i].titre}`)
			total = JSON.parse(total)
			if (total !== null) {
				let nbToto = total.length
				setNbNotes(old => old + nbToto)
			}
		}
	}, [carnet])

	// Récupération des configuration des carnets dans le localStorage
	useEffect(() => {
		let configuration = localStorage.getItem('configC')
		setConfig(configuration)
	}, [])

	// Récupération des favoris dans le localStorage
	useEffect(() => {
		let favs = localStorage.getItem(`favoris`)
		setFavoris(JSON.parse(favs))
	}, [])

	// Envoye des favoris dans le localStorage
	useEffect(() => {
		localStorage.setItem('favoris', JSON.stringify(favoris))
	}, [favoris])

	// Fonction qui permet de mettre un carnet en favoris
	function fav(i) {
		let fav = carnet[i].titre
		let id = carnet[i].id
		let tmp = [...favoris]
		let obj = { id, fav }
		tmp.push(obj)
		setFavoris(tmp)

		carnet[i].favoris = true
		setCarnet(carnet)
		localStorage.setItem('carnets', JSON.stringify(carnet))

		console.log(carnet)
	}

	// Fonction qui permet de retirer un carnet en favoris
	function deleteFavItem(id, i) {
		carnet[i].favoris = false
		setCarnet(carnet)
		localStorage.setItem('carnets', JSON.stringify(carnet))

		console.log(carnet)

		let tmp = [...favoris]
		for (let ni = 0; ni < favoris.length; ni++) {
			if (favoris[ni].id === id) {
				tmp.splice(ni, 1)
				setFavoris(tmp)
			}
		}
	}

	// Fonction qui permet de retirer un carnet
	function deleteCarnetItem(i) {
		let tmp = [...carnet]
		tmp.splice(i, 1)
		setCarnet(tmp)
	}

	return (
		<div className="App">
			<main>
				<Container style={{backgroundColor:'white'}}>
					<Row styme={{height:'75%'}}>
						<div  className="p-5 mb-4 bg-light rounded-3">
							<Container fluid style={{height:'87.5%'}} className="py-5">
								<h1  style={{fontSize:'1.5em'}} className="display-5 fw-bold">BTC Single Page Application</h1>
								<p className="col-md-8 fs-4">Piscine ReactJs</p>
								&nbsp;
								<h1 style={{fontSize:'1.5em'}} className="display-5 fw-bold">Statistiques</h1>
								<h3>Le nombre de carnets de notes : {carnet.length}</h3>
								<h3>Le nombre de notes totales : {nbNotes} </h3>
							</Container>
						</div>
						
					</Row>
					<Row className="mb-4">
						<Col>
							<Button className=" mb-2" onClick={add}>
								Créer un nouveau carnet
							</Button>
						</Col>
						{config !== 'cardsCarnets' && (
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>Titre</th>
										<th>favoris</th>
										<th>Aller dans le carnet</th>
										<th>Supprimer</th>
									</tr>
								</thead>
								<tbody style={{overflowY:'scroll'}}>{displayCarnet}</tbody>
							</Table>
						)}
						{config === 'cardsCarnets' && displayCarnetCards}
					</Row>
				</Container>
			</main>
		</div>
	)
}
