import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { reducers } from './reducers';

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

/**
 *
 * @return {*}
 */
export const store = () => {
	const store = createStore(
		persistedReducer,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);
	const persistor = persistStore(store);
	return { store, persistor };
};
