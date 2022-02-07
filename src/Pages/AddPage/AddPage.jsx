import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import showdown from 'showdown'

export default function NotesAddPage() {
	const { group } = useParams()

	const [formAdd, setFormAdd] = useState({
		titre: '',
		categorie: '',
		note: '',
	})

	const [categ, setCateg] = useState([])

	const navigate = useNavigate()

	useEffect(() => {
		let datas = localStorage.getItem(`categorie`) ? localStorage.getItem(`categorie`) : '[]'
		datas = JSON.parse(datas)
		setCateg(datas)
	}, [])

	function add(e) {
		e.preventDefault()

		const id = Date.now()
		let tmpForm = { ...formAdd }
		tmpForm.id = id
		setFormAdd(tmpForm)

		let notes = localStorage.getItem(`notes-${group}`)
		if (notes === null) notes = '[]'
		notes = JSON.parse(notes)
		notes.push(tmpForm)
		localStorage.setItem(`notes-${group}`, JSON.stringify(notes))
		navigate(`/carnet/${group}`)
	}

	let displaySelect = categ.map(categInfos => {
		const id = categInfos.id
		return <option value={categInfos.titre}>{categInfos.titre}</option>
	})

	return (
		<>
			<Container>
				<Row>
					<Col>
						<h1>Ajouter une note</h1>
						<hr />
					</Col>
				</Row>

				<Row>
					<Col md={6}>
						<Form onSubmit={e => add(e)}>
							<Form.Group className="mb-3">
								<Form.Label>Titre</Form.Label>
								<Form.Control
									type="text"
									placeholder="Entrer un titre"
									value={formAdd.titre}
									onChange={e => {
										let tmp = { ...formAdd }
										tmp.titre = e.target.value
										setFormAdd(tmp)
									}}
									required
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label className="m-2">Catégorie : </Form.Label>
								<select
									value={formAdd.categorie}
									onChange={e => {
										let tmp = { ...formAdd }
										tmp.categorie = e.target.value
										setFormAdd(tmp)
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
									value={formAdd.note}
									onChange={e => {
										let tmp = { ...formAdd }
										tmp.note = e.target.value
										setFormAdd(tmp)
									}}
									required
								/>
								<textarea type="text" placeholder="Entrer une note" value={formAdd.note} />
							</Form.Group>

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
