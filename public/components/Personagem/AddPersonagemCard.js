import React, { useState } from "react";
import axios from "../../config/axiosInstance";
import { Row, Col, Card, Button } from "react-bootstrap";
//importar scss
import "../../scss/components/assets/AddPersonagemCard.scss";

const AddPersonagemCard = ({ onChange }) => {
	const [isAdding, setIsAdding] = useState(false);
	const [nome, setNome] = useState("");
	const [imagem, setImagem] = useState(null);
	const [cpf, setCpf] = useState("");
	const [cep, setCep] = useState("");
	const [pais, setPais] = useState("");
	const [estado, setEstado] = useState("");
	const [cidade, setCidade] = useState("");
	const [bairro, setBairro] = useState("");
	const [rua, setRua] = useState("");
	const [numero, setNumero] = useState("");
	const [complemento, setComplemento] = useState("");
	const [referencia, setReferencia] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("nome", nome);
		formData.append("imagem", imagem);
		formData.append("cpf", cpf);
		formData.append("cep", cep);
		formData.append("pais", pais);
		formData.append("estado", estado);
		formData.append("cidade", cidade);
		formData.append("bairro", bairro);
		formData.append("rua", rua);
		formData.append("numero", numero);
		formData.append("complemento", complemento);
		formData.append("referencia", referencia);

		axios
			.post("/personagem", formData)
			.then((response) => {
				onChange();
				setNome("");
				setImagem(null);

				setCpf("");
				setCep("");
				setPais("");
				setEstado("");
				setCidade("");
				setBairro("");
				setRua("");
				setNumero("");
				setComplemento("");
				setReferencia("");
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

	const handleCepBlur = () => {
		if (cep.trim() !== "") {
			axios
				.get(`/buscar-cep/${cep}`)
				.then((response) => {
					const { data } = response;
					setPais(data.pais || "");
					setEstado(data.estado || "");
					setCidade(data.cidade || "");
					setBairro(data.bairro || "");
					setRua(data.rua || "");
				})
				.catch((error) => {
					console.error(error);
					// Limpar os campos de endereço em caso de erro ou CEP inválido
					setPais("");
					setEstado("");
					setCidade("");
					setBairro("");
					setRua("");
				});
		}
	};

	return (
		<div className="add-personagem-card">
			{isAdding ? (
				<Card>
					<Card.Title>Cadastro de Personagem</Card.Title>
					<form onSubmit={handleSubmit}>
						<Row>
							<Col>
								<div className="form-floating mb-2">
									<input
										type="text"
										className="form-control"
										id="nome"
										placeholder="Nome"
										value={nome}
										onChange={(e) => setNome(e.target.value)}
										required
									/>
									<label htmlFor="nome">Nome</label>
								</div>
							</Col>
							<Col>
								<div className="form-floating mb-2">
									<input
										type="text"
										className="form-control mb-2"
										placeholder="CPF"
										value={cpf}
										onChange={(e) => setCpf(e.target.value)}
										required
									/>
									<label htmlFor="nome">CPF</label>
								</div>
							</Col>
						</Row>

						<Row>
							<Col>
								<div className="form-floating mb-2">
									<input
										type="file"
										className="form-control mb-2"
										accept="image/*"
										onChange={handleImagemChange}
										required
									/>
									<label htmlFor="nome">Imagem</label>
								</div>
							</Col>
							<Col>
								<div className="form-floating mb-2">
									<input
										type="text"
										className="form-control mb-2"
										placeholder="CEP"
										value={cep}
										onChange={(e) => setCep(e.target.value)}
										onBlur={handleCepBlur}
										required
									/>
									<label htmlFor="nome">CEP</label>
								</div>
							</Col>
						</Row>
						<Row>
							<Col>
								<div className="form-floating mb-2">
									<input
										type="text"
										className="form-control mb-2"
										placeholder="País"
										value={pais}
										onChange={(e) => setPais(e.target.value)}
										readOnly
									/>
									<label htmlFor="nome">País</label>
								</div>
							</Col>
							<Col>
								<div className="form-floating mb-2">
									<input
										type="text"
										className="form-control mb-2"
										placeholder="Estado"
										value={estado}
										onChange={(e) => setEstado(e.target.value)}
										readOnly
									/>
									<label htmlFor="nome">Estado</label>
								</div>
							</Col>
						</Row>
						<Row>
							<Col>
								<div className="form-floating mb-2">
									<input
										type="text"
										className="form-control mb-2"
										placeholder="Cidade"
										value={cidade}
										onChange={(e) => setCidade(e.target.value)}
										readOnly
									/>
									<label htmlFor="nome">Cidade</label>
								</div>
							</Col>
							<Col>
								<div className="form-floating mb-2">
									<input
										type="text"
										className="form-control mb-2"
										placeholder="Bairro"
										value={bairro}
										onChange={(e) => setBairro(e.target.value)}
										readOnly
									/>
									<label htmlFor="nome">Bairro</label>
								</div>
							</Col>
						</Row>
						<Row>
							<Col>
								<div className="form-floating mb-2">
									<input
										type="text"
										className="form-control mb-2"
										placeholder="Rua"
										value={rua}
										onChange={(e) => setRua(e.target.value)}
										readOnly
									/>
									<label htmlFor="nome">Rua</label>
								</div>
							</Col>
							<Col>
								<div className="form-floating mb-2">
									<input
										type="text"
										className="form-control mb-2"
										placeholder="Número"
										value={numero}
										onChange={(e) => setNumero(e.target.value)}
										required
									/>
									<label htmlFor="nome">Número</label>
								</div>
							</Col>
						</Row>
						<Row>
							<Col>
								<div className="form-floating mb-2">
									<input
										type="text"
										className="form-control mb-2"
										placeholder="Complemento"
										value={complemento}
										onChange={(e) => setComplemento(e.target.value)}
									/>
									<label htmlFor="nome">Complemento</label>
								</div>
							</Col>
							<Col>
								<div className="form-floating mb-2">
									<input
										type="text"
										className="form-control mb-2"
										placeholder="Referência"
										value={referencia}
										onChange={(e) => setReferencia(e.target.value)}
									/>
									<label htmlFor="nome">Referência</label>
								</div>
							</Col>
						</Row>

						<Row>
							<Col className="justify-content-center">
								<Button
									type="button"
									className="btn btn-secondary"
									onClick={() => setIsAdding(false)}
								>
									Cancelar
								</Button>
							</Col>
							<Col className="justify-content-center">
								<Button type="submit" className="btn btn-primary mr-2">
									Salvar
								</Button>
							</Col>
						</Row>
					</form>
				</Card>
			) : (
				<Row className="justify-content-center">
					<Button onClick={() => setIsAdding(true)}>+</Button>
				</Row>
			)}
		</div>
	);
};

export default AddPersonagemCard;
