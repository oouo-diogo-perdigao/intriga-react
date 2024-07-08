import React, { useState } from "react";
import axios from "axios";

const AddPersonagemCard = ({ onChange }) => {
	const [isAdding, setIsAdding] = useState(false);
	const [nome, setNome] = useState("");
	const [imagem, setImagem] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("nome", nome);
		formData.append("imagem", imagem);

		axios
			.post("http://localhost:8000/api/personagem", formData)
			.then((response) => {
				onChange();
				setNome("");
				setImagem(null);
				setIsAdding(false);
			})
			.catch((error) => console.error(error));
	};

	const handleImagemChange = (e) => {
		const file = e.target.files[0];
		setImagem(file);
		// Extrai o nome do arquivo sem a extensão
		const fileName = file.name.split(".")[0];

		// Preenche automaticamente o campo nome se estiver vazio
		if (nome.trim() === "") {
			setNome(fileName);
		}
	};

	return (
		<div className="add-personagem-card">
			{isAdding ? (
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Nome"
						value={nome}
						onChange={(e) => setNome(e.target.value)}
						required
					/>
					<input
						type="file"
						accept="image/*"
						onChange={handleImagemChange}
						required
					/>
					<button type="submit">Salvar</button>
					<button type="button" onClick={() => setIsAdding(false)}>
						Cancelar
					</button>
				</form>
			) : (
				<button onClick={() => setIsAdding(true)}>+</button>
			)}
		</div>
	);
};

export default AddPersonagemCard;
