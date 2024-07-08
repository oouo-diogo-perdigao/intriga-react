/**
 * Retorna key local do google
 * Retorna key web do google
 * @return {string}
 */
export const getGoogleKey = () => {
	if (window.location.hostname.includes('travelrpg.com')) {
		//web
		return '531587136969-fdh72m1o3l5j8so81aojkbkfb9m15mgf.apps.googleusercontent.com';
	} else if (window.location.hostname == 'localhost') {
		//Local
		return '531587136969-hhfghbs8797asgqrkv5p2ojd9c22mb9v.apps.googleusercontent.com';
	}
};
