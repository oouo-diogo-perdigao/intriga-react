import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
//importar scss
import "../../scss/components/assets/PersonagemCard.scss";

const PersonagemCard = ({ personagem, onDelete }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [nome, setNome] = useState(personagem.nome);

	const deletePersonagem = (id) => {
		axios
			.delete(`/personagem/${id}`)
			.then(() => {
				onDelete();
			})
			.catch((error) => console.error(error));
	};

	const handleDoubleClick = () => {
		setIsEditing(true);
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			updatePersonagem();
		}
	};

	const updatePersonagem = () => {
		const updatedPersonagem = { nome: nome };

		axios
			.put(`/personagem/${personagem.id}`, updatedPersonagem)
			.then(() => {
				setIsEditing(false);
				onDelete();
			})
			.catch((error) => console.error(error));
	};

	const handleNomeChange = (e) => {
		setNome(e.target.value);
	};

	return (
		<Card className="personagem-card">
			<Card.Img
				className="personagem-img"
				variant="top"
				src={personagem.imagem}
			/>
			<Card.Body className="personagem-card-body">
				{isEditing ? (
					<input
						type="text"
						className="personagem-edit-input"
						value={nome}
						onChange={handleNomeChange}
						onKeyDown={handleKeyDown}
						onBlur={updatePersonagem}
						autoFocus
					/>
				) : (
					<Card.Title
						className="personagem-title"
						onDoubleClick={handleDoubleClick}
					>
						{personagem.nome}
					</Card.Title>
				)}

				<Button
					className="personagem-delete"
					variant="danger"
					onClick={() => deletePersonagem(personagem.id)}
				>
					X
				</Button>
			</Card.Body>
		</Card>
	);
};

export default PersonagemCard;
