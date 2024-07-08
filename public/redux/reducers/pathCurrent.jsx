import { PATH_SET, PATH_ADD, PATH_REMOVE } from '../actions/pathCurrent';

const initialState = [{ url: '/room/search', name: 'TravelRPG', level: 0 }];

export const pathCurrent = (state = initialState, action) => {
	switch (action.type) {
		case PATH_SET:
			state = action.payload;
			return [...state];

		case PATH_ADD:
			//Só pode have um level
			if (action.payload.level) {
				state = state.filter(
					(element) => element.level != action.payload.level,
				);
			}
			state = state.filter((element) => element.url != action.payload.url);

			state.push(action.payload);
			return [...state];

		case PATH_REMOVE:
			if (action.payload.url) {
				state = state.filter((element) => element.url != action.payload.url);
			}
			if (action.payload.level) {
				state = state.filter(
					(element) => element.level <= action.payload.level,
				);
			}
			return state;
		default:
			return state;
	}
};
