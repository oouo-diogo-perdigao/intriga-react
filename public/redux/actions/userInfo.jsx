export const USERINFO_SET = "USERINFO_SET";
export const FAVORITES_SET = "FAVORITES_SET";
export const FAVORITES_ADD = "FAVORITES_ADD";
export const FAVORITES_REMOVE = "FAVORITES_REMOVE";

export const userInfoSet = (fav) => ({
	type: USERINFO_SET,
	payload: fav,
});

export const favoritesSet = (fav) => ({
	type: FAVORITES_SET,
	payload: fav,
});

export const favoritesAdd = (fav) => ({
	type: FAVORITES_ADD,
	payload: fav,
});

export const favoritesRemove = (fav) => ({
	type: FAVORITES_REMOVE,
	payload: fav,
});
