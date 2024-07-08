export const DARK = 'LOGIN';
export const LIGHT = 'LIGHT';
export const AUTO = 'AUTO';

export const colorModeDark = fav => ({
	type: DARK,
	payload: fav
});

export const colorModeLight = fav => ({
	type: LIGHT,
	payload: fav
});

export const colorModAuto = fav => ({
	type: AUTO,
	payload: fav
});
