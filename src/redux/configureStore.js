import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { /* persistReducer, */ persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage/session';
import rootReducer from './reducers/reducer';


/* const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['authentication'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer); */

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk),
  ),
);

const persistor = persistStore(store);

const configureStore = () => ({ store, persistor });

export default configureStore;
