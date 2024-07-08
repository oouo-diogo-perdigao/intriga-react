import { combineReducers } from "redux";
import { loginLogout } from "./login";
import { colorModeChange } from "./colorMode";
import { pathCurrent } from "./pathCurrent";

export const reducers = combineReducers({
	loginLogout,
	colorModeChange,
	pathCurrent,
});
