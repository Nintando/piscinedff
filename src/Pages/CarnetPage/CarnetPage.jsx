import { Container, Row, Col, Button, Table, Form, FormControl, Card } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function CarnetPages(props) {
	const { group } = useParams()
	const [notes, setNotes] = useState([])
	const [notesFilter, setNotesFilter] = useState([])
	const [search, setSearch] = useState('')

	useEffect(() => {
		let datas = localStorage.getItem(`notes-${group}`) ? localStorage.getItem(`notes-${group}`) : '[]'
		datas = JSON.parse(datas)
		setNotes(datas)
	}, [])

	function del(indice) {
		let datas = localStorage.getItem(`notes-${group}`)
		datas = JSON.parse(datas)
		datas.splice(indice, 1)
		localStorage.setItem(`notes-${group}`, JSON.stringify(datas))
		setNotes(datas)
	}

	let displayNotes = notesFilter.map((note, indice) => {
		return (
			<tr key={'notes-' + note.id}>
				<td>{note.titre}</td>
				<td>{note.categorie}</td>
				<td>{note.note}</td>
				<td>
					<Button variant="outline-primary" as={Link} to={`update-${indice}`}>
						Modifier
					</Button>
				</td>
				<td>
					<Button variant="outline-danger" onClick={() => del(indice)}>
						Supprimer
					</Button>
				</td>
			</tr>
		)
	})

	let displayCardsNotes = notesFilter.map((note, indice) => {
		return (
			<Card className="text-center" style={{ width: '18rem' }} key={'notes-' + note.id}>
				<Card.Header as="h5">{note.titre}</Card.Header>
				<Card.Body>
					<Card.Subtitle className="mb-2 text-muted">{note.categorie}</Card.Subtitle>
					<hr
						style={{
							color: '#000000',
							backgroundColor: '#000000',
							height: 0.5,
							borderColor: '#000000',
						}}
					/>
					<Card.Text>{note.note}</Card.Text>
					<Button variant="outline-primary" as={Link} to={`update-${indice}`}>
						Modifier
					</Button>
					<Button variant="outline-danger" onClick={() => del(indice)}>
						Supprimer
					</Button>
				</Card.Body>
			</Card>
		)
	})

	useEffect(() => {
		setNotesFilter(notes)
		if (search.length > 0) {
			let lowerSearch = search.toLowerCase()
			let res = notes.filter(item => {
				let lowerItem = item.note.toLowerCase()
				if (lowerItem.indexOf(lowerSearch) > -1) return item
				return null
			})
			setNotesFilter(res)
		}
	}, [search, notes])

	return (
		<>
			<Container>
				<Row>
					<Col>
						<h1>Gestion des notes</h1>
						<hr />
						<Form className="d-flex mb-4">
							<FormControl
								type="search"
								placeholder="Rechercher une note"
								className="me-2"
								value={search}
								onChange={e => {
									setSearch(e.target.value)
								}}
							/>
							<Button variant="secondary">Rehercher</Button>
						</Form>
					</Col>
				</Row>

				<Row>
					<Col md={12}>
						<div className="mb-3">
							<Button as={Link} to={'/carnet/' + group + '/add'}>
								Ajouter une note
							</Button>
						</div>

						<Table striped bordered hover>
							<thead>
								<tr>
									<th>Titre</th>
									<th>Catégorie</th>
									<th>Note</th>
									<th>Modifier</th>
									<th>Supprimer</th>
								</tr>
							</thead>
							<tbody>{displayNotes}</tbody>
						</Table>
					</Col>
					{displayCardsNotes}
				</Row>
			</Container>
		</>
	)
}
