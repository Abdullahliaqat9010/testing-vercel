import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import logger from "redux-logger";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import rootReducer from "../reducers";
import rootSaga from "../sagas";

import { toBool } from "../utils";

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const createNoopStorage = () => {
	return {
		getItem(_key) {
			return Promise.resolve(null);
		},
		setItem(_key, value) {
			return Promise.resolve(value);
		},
		removeItem(_key) {
			return Promise.resolve();
		},
	};
};

const reduxLogger = toBool(process.env.REACT_APP_REDUX_LOGGER);
const persistConfig = {
	key: "ImmoBelgium",
	storage:
		typeof window !== "undefined"
			? createWebStorage("local")
			: createNoopStorage(),
};

const enchantedCompose =
	typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: compose;
const sagaMiddleware = createSagaMiddleware();
const middlewares = reduxLogger
	? applyMiddleware(sagaMiddleware, logger)
	: applyMiddleware(sagaMiddleware);

export const store = createStore(
	persistReducer(persistConfig, rootReducer),
	{},
	enchantedCompose(middlewares)
);
export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);
