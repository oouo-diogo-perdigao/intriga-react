import { Component } from "react";
import { connect } from "react-redux";

//#region Includes Exclusivos da pagina
//https://console.developers.google.com/apis/credentials?project=travelrpg
import { GoogleLogin } from "@react-oauth/google";
import jwt from "jsonwebtoken";

import logoFull from "../img/logoFull.png";
//#endregion

//#region Redux, para setar as rotas
import { compose } from "redux";
import { loginRedux } from "../redux/actions/login";
import { userInfoSet } from "../redux/actions/userInfo";
//#endregion

//#region React-router
//#endregion

//#region Material
import {
	Button,
	TextField,
	Link,
	Box,
	Typography,
	Container,
} from "@mui/material";

//#endregion

import { withRouter } from "../config/withRouter";
import axios from "../config/axiosInstance";
import "../scss/routes/login.scss";

/**
 * Classe da tela de entrada
 */
class LoginComponent extends Component {
	/**
	 * Construtora
	 * @param {*} props
	 */
	constructor(props) {
		super(props);
		this.state = { email: "", password: "" };

		this.handleChange = this.handleChange.bind(this);
		const localLogin = localStorage.getItem("token");

		if (localLogin) {
			const decoded = jwt.decode(localLogin, { algorithms: ["RS256"] });

			if (decoded.exp > Date.now() / 1000) {
				const { router, dispatch } = this.props;
				router.navigate("/room/search");
				dispatch(loginRedux(decoded));
			}
		}
	}
	/**
	 * Chamada quando se altera os valores dos eventos
	 * @param {event} event
	 */
	handleChange(event) {
		const value =
			event.target.type === "checkbox"
				? event.target.checked
				: event.target.value;
		this.setState({
			[event.target.name]: value,
		});
	}
	/**
	 * Login pelo google
	 * @param {obj} response
	 * @param {obj} attemp tentativas
	 * @return {Promise}
	 */
	responseGoogle(response, attemp = 0) {
		const self = this;
		return new Promise((resolve, reject) => {
			const header = {
				headers: { Authorization: "Bearer " + response.credential },
			};

			axios
				.post("/login/google", {}, header)
				.then((response) => {
					self.setLogin(response.data);
					resolve();
				})
				.catch((err) => {
					console.log(err);
					if (attemp > 3) {
						reject(err);
					} else {
						setTimeout(() => {
							self
								.responseGoogle(response, attemp++)
								.then((x) => {
									resolve(x);
								})
								.catch((err) => {
									reject(err);
								});
						}, 5000);
					}
				});
		});
	}
	/**
	 * Abre url no navegador
	 * @param {*} str
	 */
	openLinkNewTab(str) {
		//TODO
		//dessa forma na versão do electron
		//require('electron').shell.openExternal(str);
	}
	/**
	 *
	 * @param {*} ret
	 */
	setLogin(ret) {
		if (ret) {
			localStorage.setItem("token", ret);
			const decoded = jwt.decode(ret, { algorithms: ["RS256"] });
			if (decoded.exp > Date.now() / 1000) {
				const { router, dispatch } = this.props;
				router.navigate("/room/search");

				axios
					.get("/api/user")
					.then((response) => {
						console.log(response);
						return response.data;
					})
					.then((user) => dispatch(userInfoSet(user)));

				dispatch(loginRedux(decoded));
			}
		}
	}
	/**
	 * Função padrão de saida
	 * @return {string} html
	 */
	render() {
		const { email, password } = this.state;

		return (
			<Container className="login" component="main" maxWidth="xs">
				<img className="logo" src={logoFull} />
				<Typography component="h1" variant="h4" align="center">
					Login
				</Typography>
				<Box mt={3}>
					<GoogleLogin
						onSuccess={(response) => {
							this.responseGoogle(response);
						}}
						onError={() => {
							console.log("Login Failed");
						}}
						useOneTap
						width="100%"
						size="large"
						// theme='filled_black'
						auto_select
					/>
				</Box>
				<Box mt={2}>
					<Link href="https://wiki.travelrpg.com/w/Travel_RPG_Wiki:Pol%C3%ADtica_de_privacidade">
						Política de privacidade
					</Link>
				</Box>
				<Box mt={2}>
					<Typography variant="body2" color="textSecondary" align="center">
						{"Copyright © "}TravelRPG {new Date().getFullYear()}
					</Typography>
				</Box>
			</Container>
		);
	}
}

//Possibilita usar o redux dentro do componente react e do theme, o truque aqui é usar o compose  para juntar os dois
//Caso contrario seria
// const LoginTemp = connect()(LoginComponent);
// export const Login = props => <LoginTemp />;

/**
 * Classe da tela de entrada
 * @class LoginComponent
 * @param {*} props
 * @return {Component}
 */
export const LoginScreen = compose(connect())(withRouter(LoginComponent));
