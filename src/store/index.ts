import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

import { toBool } from '../utils';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const reduxLogger = toBool(process.env.REACT_APP_REDUX_LOGGER);
const persistConfig = {
  key: 'ImmoBelgium',
  storage,
};

const enchantedCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const middlewares = reduxLogger ? applyMiddleware(sagaMiddleware, logger) : applyMiddleware(sagaMiddleware);

export const store = createStore(persistReducer(persistConfig, rootReducer), enchantedCompose(middlewares));
export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);