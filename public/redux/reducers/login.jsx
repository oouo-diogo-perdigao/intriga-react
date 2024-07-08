import { LOGIN, LOGOUT } from '../actions/login';

const initialState = {
	status: 'notRegistered',
};

export const loginLogout = (state = { ...initialState }, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				status: 'registered',
				...action.payload,
			};

		case LOGOUT:
			return {
				...state,
				status: 'notRegistered',
			};
		default:
			return state;
	}
};
