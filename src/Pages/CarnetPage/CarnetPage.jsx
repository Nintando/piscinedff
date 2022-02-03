import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function CarnetPages() {
	const [notes, setNotes] = useState([])

	useEffect(() => {
		let datas = localStorage.getItem('notes') ? localStorage.getItem('notes') : '[]'
		datas = JSON.parse(datas)
		setNotes(datas)
	}, [])

	function del(indice) {
		let datas = localStorage.getItem('notes')
		datas = JSON.parse(datas)
		datas.splice(indice, 1)
		localStorage.setItem('notes', JSON.stringify(datas))
		setNotes(datas)
	}

	let displayNotes = notes.map((note, indice) => {
		return (
			<tr key={'notes-' + note.id}>
				<td>{note.titre}</td>
				<td>{note.categorie}</td>
				<td>{note.note}</td>
				<td>
					<Button variant="outline-primary" as={Link} to={`/carnet/update${indice}`}>
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
	return (
		<>
			<Container>
				<Row>
					<Col>
						<h1>Gestion des notes</h1>
						<hr />
					</Col>
				</Row>

				<Row>
					<Col md={12}>
						<div className="mb-3">
							<Button as={Link} to="/carnet/add">
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
				</Row>
			</Container>
		</>
	)
}
