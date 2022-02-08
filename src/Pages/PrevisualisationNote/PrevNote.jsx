import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Converter } from 'showdown'

export default function CarnetUpdatePage() {
	const { indice, group } = useParams()
	const converter = new Converter()

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

	useEffect(() => {
		let datas = localStorage.getItem(`categorie`) ? localStorage.getItem(`categorie`) : '[]'
		datas = JSON.parse(datas)
		setCateg(datas)
	}, [])

	function Update(e) {
		e.preventDefault()

		let notes = localStorage.getItem(`notes-${group}`)
		notes = JSON.parse(notes)
		notes[indice] = formUpdate
		localStorage.setItem(`notes-${group}`, JSON.stringify(notes))
		navigate(`/carnet/${group}`)
	}

	let displaySelect = categ.map(categInfos => {
		const id = categInfos.id
		return <option value={categInfos.titre}>{categInfos.titre}</option>
	})

	let text = formUpdate.note,
		htmlMD = converter.makeHtml(text)

	return (
		<>
			<Container>
				<Row>
					<Col>
						<h1>Prévisualisation de la note</h1>
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
