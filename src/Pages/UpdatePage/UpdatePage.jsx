import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Converter } from 'showdown'

export default function CarnetUpdatePage() {
	const { indice, group } = useParams()
	const converter = new Converter()

	// Récupération des notes dans le localStorage
	let notes = localStorage.getItem(`notes-${group}`)
	notes = JSON.parse(notes)

	const [formUpdate, setFormUpdate] = useState({
		id: notes[indice].id,
		titre: notes[indice].titre,
		categorie: notes[indice].categorie,
		note: notes[indice].note,
	})

	const [categ, setCateg] = useState([])

	const navigate = useNavigate()

	// Récupération des catégories dans le localStorage
	useEffect(() => {
		let datas = localStorage.getItem(`categorie`) ? localStorage.getItem(`categorie`) : '[]'
		datas = JSON.parse(datas)
		setCateg(datas)
	}, [])

	// Fonction qui permet de modifier la note
	function Update(e) {
		e.preventDefault()

		let notes = localStorage.getItem(`notes-${group}`)
		notes = JSON.parse(notes)
		notes[indice] = formUpdate
		localStorage.setItem(`notes-${group}`, JSON.stringify(notes))
		navigate(`/carnet/${group}`)
	}

	// Affichage de la liste des catégories
	let displaySelect = categ.map(categInfos => {
		const id = categInfos.id
		return <option value={categInfos.titre}>{categInfos.titre}</option>
	})

	// Permets à la conversion du MarkDown en HTML
	let text = formUpdate.note,
		htmlMD = converter.makeHtml(text)

	return (
		<>
			<Container>
				<Row>
					<Col>
						<h1>Modifier une note</h1>
						<hr />
					</Col>
				</Row>

				<Row>
					<Col md={6}>
						<Form onSubmit={e => Update(e)}>
							<Form.Group className="mb-3">
								<Form.Label>Titre</Form.Label>
								<Form.Control
									type="text"
									placeholder="Entrer un titre"
									value={formUpdate.titre}
									onChange={e => {
										let tmp = { ...formUpdate }
										tmp.titre = e.target.value
										setFormUpdate(tmp)
									}}
									required
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label className="m-2">Catégorie : </Form.Label>
								<select
									value={formUpdate.categorie}
									onChange={e => {
										let tmp = { ...formUpdate }
										tmp.categorie = e.target.value
										setFormUpdate(tmp)
									}}
									required
								>
									<option>Choisir une catégorie</option>
									{displaySelect}
								</select>
							</Form.Group>
							<Form.Group className="m-3">
								<Form.Label className="m-2">Note : </Form.Label>
								<textarea
									type="text"
									placeholder="Entrer une note"
									value={formUpdate.note}
									onChange={e => {
										let tmp = { ...formUpdate }
										tmp.note = e.target.value
										setFormUpdate(tmp)
									}}
									required
								/>
							</Form.Group>
							<h4>Prévisualition : </h4>
							<div dangerouslySetInnerHTML={{ __html: htmlMD }} />

							<hr />

							<Button variant="light" as={Link} to={'/carnet/' + group}>
								Retour
							</Button>

							<Button variant="outline-danger" className="float-end mx-2" type="reset">
								Annuler
							</Button>

							<Button variant="success" type="submit" className="float-end">
								Enregistrer
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	)
}
