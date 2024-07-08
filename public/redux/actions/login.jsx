export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const loginRedux = (fav) => ({
	type: LOGIN,
	payload: fav,
});

export const logoutRedux = (fav) => ({
	type: LOGOUT,
	payload: fav,
});
