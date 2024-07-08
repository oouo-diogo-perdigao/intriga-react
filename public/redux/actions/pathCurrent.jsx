export const PATH_SET = 'PATHCURRENT_SET';
export const PATH_ADD = 'PATHCURRENT_ADD';
export const PATH_REMOVE = 'PATHCURRENT_REMOVE';

export const pathSet = (fav) => ({
	type: PATH_SET,
	payload: fav,
});

export const pathAdd = (fav) => ({
	type: PATH_ADD,
	payload: fav,
});

export const pathRemove = (fav) => ({
	type: PATH_REMOVE,
	payload: fav,
});
