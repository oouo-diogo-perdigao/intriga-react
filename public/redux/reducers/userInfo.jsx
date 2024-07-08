import {
	USERINFO_SET,
	FAVORITES_SET,
	FAVORITES_ADD,
	FAVORITES_REMOVE,
} from "../actions/userInfo";

import axios from "../../config/axiosInstance";

const initialState = {
	userInfo: {
		email: null,
		nick: null,
		createdate: null,
		name: null,
		language: "",
		avatar: "",
	},
};

export const userInfo = (state = { ...initialState }, action) => {
	let favorites = state.favorites;

	switch (action.type) {
		case USERINFO_SET: {
			return { ...state, ...action.payload };
		}

		case FAVORITES_SET: {
			state.favorites = action.payload;
			return { ...state };
		}

		case FAVORITES_ADD: {
			//Assegura que nao vai re-adicionar objeto com id repetido
			if (!favorites.includes(action.payload)) {
				//Tem que criar um novo objeto para atualizar
				favorites = [...favorites, action.payload];
				// favorites.push(action.payload);
			}
			axios.patch("/api/user/favorite", { favorites });

			state.favorites = favorites;
			return { ...state };
		}

		case FAVORITES_REMOVE: {
			favorites = favorites.filter((e) => e != action.payload);
			axios.patch("/api/user/favorite", { favorites });

			state.favorites = favorites;
			return { ...state };
		}

		default:
			return state;
	}
};
