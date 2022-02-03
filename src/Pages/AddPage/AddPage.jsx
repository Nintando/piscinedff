import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import showdown from 'showdown'

export default function NotesAddPage() {
<<<<<<< HEAD
const [formAdd, setFormAdd] = useState({
titre: '',
categorie: '',
note: '',
})
=======
	const { group } = useParams()
	const [formAdd, setFormAdd] = useState({
		titre: '',
		categorie: '',
		note: '',
	})
>>>>>>> cb5ad44b170d87f54487c6f8943b114153674595

const navigate = useNavigate()

function add(e) {
e.preventDefault()

const id = Date.now()
let tmpForm = { ...formAdd }
tmpForm.id = id
setFormAdd(tmpForm)

<<<<<<< HEAD
let notes = localStorage.getItem('notes')
if (notes === null) notes = '[]'
notes = JSON.parse(notes)
notes.push(tmpForm)
localStorage.setItem('notes', JSON.stringify(notes))
navigate('/carnet')
=======
		let notes = localStorage.getItem(`notes-${group}`)
		if (notes === null) notes = '[]'
		notes = JSON.parse(notes)
		notes.push(tmpForm)
		localStorage.setItem(`notes-${group}`, JSON.stringify(notes))
		navigate(`/carnet/${group}`)
	}

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
									<option value="Devoir">Devoir</option>
									<option value="Jeux">Jeux</option>
									<option value="Manga">Manga</option>
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
>>>>>>> cb5ad44b170d87f54487c6f8943b114153674595
}

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
			<Form onSubmit={e=> add(e)}>
				<Form.Group className="mb-3">
					<Form.Label>Titre</Form.Label>
					<Form.Control type="text" placeholder="Entrer un titre" value={formAdd.titre} onChange={e=> {
						let tmp = { ...formAdd }
						tmp.titre = e.target.value
						setFormAdd(tmp)}}
						required/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label className="m-2">Catégorie : </Form.Label>
					<select class="form-select" value={formAdd.categorie} onChange={e=> {
						let tmp = { ...formAdd }
						tmp.categorie = e.target.value
						setFormAdd(tmp)}}
						required>
						<option>Choisir une catégorie</option>
						<option value="Devoir">Devoir</option>
						<option value="Jeux">Jeux</option>
						<option value="Manga">Manga</option>
					</select>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label className="m-2">Note : </Form.Label>
					<textarea class="form-control" type="text" placeholder="Entrer une note" value={formAdd.note}
						onChange={e=> {
						let tmp = { ...formAdd }
						tmp.note = e.target.value
						setFormAdd(tmp)}}
					required/>
				</Form.Group>
			<hr/>
				<Button variant="light" as={Link} to="/carnet">
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