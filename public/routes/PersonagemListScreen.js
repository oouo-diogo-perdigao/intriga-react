import React, { useEffect, useState } from "react";
import PersonagemCard from "../components/Personagem/PersonagemCard";
import AddPersonagemCard from "../components/Personagem/AddPersonagemCard";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";

const PersonagemListComponent = () => {
	const [personagem, setPersonagem] = useState([]);

	useEffect(() => {
		fetchPersonagens();
	}, []);

	const fetchPersonagens = () => {
		axios
			.get("http://localhost:8000/api/personagem")
			.then((response) => setPersonagem(response.data))
			.catch((error) => console.error(error));
	};

	return (
		<Container className="personagem-list">
			<Container>
				<Row xs={1} md={2} lg={3} className="g-4">
					{personagem.map((personagem) => (
						<Col key={personagem.id}>
							<PersonagemCard
								personagem={personagem}
								onDelete={fetchPersonagens}
							/>
						</Col>
					))}
				</Row>
			</Container>
			<Container>
				<Row className="justify-content-center">
					<Col xs={12} sm={6} md={4}>
						<AddPersonagemCard onChange={fetchPersonagens} />
					</Col>
				</Row>
			</Container>
		</Container>
	);
};

/**
 * Constrói Pagina Principal
 * @class HomeComponent
 * @param {*} props
 * @return {Component}
 */
export const PersonagemListScreen = (props) => <PersonagemListComponent />;
