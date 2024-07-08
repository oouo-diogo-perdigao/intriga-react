import { DARK, LIGHT, AUTO } from '../actions/colorMode';

const initialState = {
	status: 'auto',
};

export const colorModeChange = (state = { ...initialState }, action) => {
	switch (action.type) {
		case DARK:
			return {
				...state,
				status: 'dark',
			};
		case LIGHT:
			return {
				...state,
				status: 'light',
			};
		case AUTO:
			return {
				...state,
				status: 'auto',
			};
		default:
			return state;
	}
};
