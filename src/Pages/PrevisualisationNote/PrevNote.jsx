import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { Converter } from 'showdown'

export default function CarnetUpdatePage() {
	const { indice, group } = useParams()
	const converter = new Converter()

	let notes = localStorage.getItem(`notes-${group}`)
	notes = JSON.parse(notes)

	const [formUpdate] = useState({
		id: notes[indice].id,
		titre: notes[indice].titre,
		note: notes[indice].note,
	})

	let text = formUpdate.note,
		htmlMD = converter.makeHtml(text)

	return (
		<>
			<Container>
				<Row>
					<Col>
						<h1>Prévisualisation de la note de {formUpdate.titre}</h1>
						<hr />
					</Col>
				</Row>

				<Row>
					<Col md={6}>
						<Form>
							<div dangerouslySetInnerHTML={{ __html: htmlMD }} />

							<hr />

							<Button variant="light" as={Link} to={'/carnet/' + group}>
								Retour
							</Button>

							<Button className="float-end" variant="outline-primary" as={Link} to={`/carnet/${group}/update-${indice}`}>
								Modifier
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	)
}
