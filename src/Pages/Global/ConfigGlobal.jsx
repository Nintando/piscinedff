import { Container, Row, Button, Col, Table } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function ConfigGlobal() {
	const { indice } = useParams()
	const [categorie, setCategorie] = useState([])

	let displayCate = categorie.map((categorieInfos, indice) => {
		const id = categorieInfos.id
		return (
			<tr key={'categorie-' + categorieInfos.id}>
				<td>{categorieInfos.titre}</td>
				<td>
					<Button variant="outline-primary" onClick={() => updateItem(indice)}>
						modifier
					</Button>
				</td>
				<td>
					<Button variant="outline-danger" onClick={() => deleteCateItem(indice)}>
						Supprimer la catégorie
					</Button>
				</td>
			</tr>
		)
	})

	function add() {
		let titre = window.prompt("Veuillez saisir l'intitulé de votre catégorie")
		if (titre !== null && titre.trim().length > 0) {
			let tmp = [...categorie]
			let id = Date.now()
			let obj = { id, titre }
			tmp.push(obj)
			setCategorie(tmp)
		}
	}

	function updateItem() {
		let titre = window.prompt("Veuillez modifier l'intitulé de votre catégorie")
		let categ = localStorage.getItem('categorie')
		categ = JSON.parse(categ)
		if (titre !== null && titre.trim().length > 0) {
			categ[indice] = titre
			localStorage.setItem('categorie', JSON.stringify(categ))
		}
	}

	useEffect(() => {
		let datas = localStorage.getItem(`categorie`)
		setCategorie(JSON.parse(datas))
	}, [])

	useEffect(() => {
		localStorage.setItem(`categorie`, JSON.stringify(categorie))
	}, [categorie])

	function deleteCateItem(i) {
		let tmp = [...categorie]
		tmp.splice(i, 1)
		setCategorie(tmp)
	}

	return (
		<div className="App">
			<main>
				<Container>
					<Row className="mb-4">
						<Col>
							<h3>Options Notes</h3>
							<Col>
								<Button
									className="m-2"
									onClick={() => {
										localStorage.setItem('configN', 'cardsNotes')
									}}
								>
									Cards
								</Button>
								<Button
									onClick={() => {
										localStorage.setItem('configN', 'listeNotes')
									}}
								>
									Liste
								</Button>
							</Col>
						</Col>

						<Col>
							<h3>Options Carnets</h3>
							<Col>
								<Button
									className="m-2"
									onClick={() => {
										localStorage.setItem('configC', 'cardsCarnets')
									}}
								>
									Cards
								</Button>
								<Button
									onClick={() => {
										localStorage.setItem('configC', 'listeCarnets')
									}}
								>
									Liste
								</Button>
							</Col>
						</Col>
						<hr />

						<Col>
							<Button className=" mb-2" onClick={add}>
								Créer une nouvelle catégorie
							</Button>
						</Col>
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>Titre</th>
									<th>Modifier</th>
									<th>Supprimer</th>
								</tr>
							</thead>
							<tbody>{displayCate}</tbody>
						</Table>
					</Row>
				</Container>
			</main>
		</div>
	)
}
