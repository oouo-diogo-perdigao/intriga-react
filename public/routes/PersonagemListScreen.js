import React, { useEffect, useState } from "react";
import PersonagemCard from "../components/Personagem/PersonagemCard";
import AddPersonagemCard from "../components/Personagem/AddPersonagemCard";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "../config/axiosInstance";

const PersonagemListComponent = () => {
	const [personagem, setPersonagem] = useState([]);

	useEffect(() => {
		fetchPersonagens();
	}, []);

	const fetchPersonagens = () => {
		axios
			.get("/personagem")
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
				<AddPersonagemCard onChange={fetchPersonagens} />
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
