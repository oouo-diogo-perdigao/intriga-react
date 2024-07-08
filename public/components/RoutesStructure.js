import { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { withRouter } from "../config/withRouter";
import { pathSet } from "../redux/actions/pathCurrent";

import { LoginScreen, PersonagemListScreen } from "../routes";
//#endregion

/**
 *
 * @class RoutesStructureComponent
 * @extends {Component}
 */
class RoutesStructureComponent extends Component {
	/**
	 * Construtora
	 * @param {*} props
	 */
	constructor(props) {
		super(props);
	}

	/**
	 *
	 */
	componentDidMount() {
		this.mount();
	}
	/**
	 */
	mount() {
		const { dispatch } = this.props;
		dispatch(pathSet([{ url: "/room/search", name: "TravelRPG", level: 0 }]));
	}

	/**
	 * Um wrapper para <Route> que redireciona a /login se não autenticado
	 * @return {Route}
	 */
	routeLogoff() {
		return (
			<Routes>
				<Route path="/login" element={<LoginScreen />} />
				<Route exact={true} path="/" element={<LoginScreen />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		);
	}
	/**
	 * Um wrapper para <Route> que redireciona a /login se não autenticado
	 * @return {Route}
	 */
	routeLogin() {
		return (
			<Routes>
				<Route path="/" element={<PersonagemListScreen />} />
			</Routes>
		);
	}
	/**
	 *
	 * @return {*}
	 */
	render() {
		const { loginLogout } = this.props;
		const login =
			loginLogout.status == "registered" &&
			loginLogout.exp * 1000 > +new Date();

		if (login) {
			return this.routeLogin();
		} else {
			return this.routeLogoff();
		}
	}
}

RoutesStructureComponent.propTypes = {};

/**
 * Permite acessar e transferir para a classe o estado do redux
 * usado como this.props.userInfo
 * @param {*} state
 * @return {Object}
 */
const mapStateToProps = (state) => {
	const loginLogout = state.loginLogout || {};
	return { loginLogout };
};

/**
 * Mostra uma sala
 * @class RoomIconComponent
 * @param {*} props
 * @return {Component}
 */
export const RoutesStructure = compose(connect(mapStateToProps))(
	withRouter(RoutesStructureComponent)
);
