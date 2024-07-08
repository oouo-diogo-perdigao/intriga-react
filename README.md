# Frontend do Projeto de CRUD de Personagens

Este projeto é a interface frontend para um aplicativo de CRUD de personagens, construído usando React e Bootstrap. A aplicação permite adicionar, visualizar, editar e excluir personagens, cada um com suas informações pessoais e imagem.

## Funcionalidades

- Listagem de personagens com imagem e informações detalhadas.
- Adicionar novo personagem com campos para nome, CPF, CEP, país, estado, cidade, bairro, rua, número, complemento e referência.
- Edição e deleção de personagens.
- Integração com uma API backend para buscar informações baseadas no CEP.

## Tecnologias Utilizadas

- React
- React Bootstrap
- Axios
- 
## Instalação

1. Clone o repositório:
2. Instale as dependências: `npm install`
3. Inicie o servidor de desenvolvimento: `npm start`

A aplicação estará disponível em http://localhost:3000.

## Configuração
### Configuração do Axios
No arquivo axiosInstance.js, configure a URL base para a API backend:

```js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export default instance;
```

## Uso
### Adicionar Personagem
1. Clique no botão "+" para abrir o formulário de adição.
2. Preencha os campos necessários e clique em "Salvar".

### Editar/Excluir Personagem
1. Clique no personagem desejado para abrir as opções de edição ou exclusão.
2. Edite as informações e salve ou clique em "Excluir" para remover o personagem.

## Contribuição
Sinta-se à vontade para contribuir com este projeto. Basta fazer um fork, criar uma nova branch e enviar um pull request.

## Licença
Este projeto está licenciado sob a licença MIT.