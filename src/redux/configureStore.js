import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/reducer';

export const store = createStore(rootReducer, applyMiddleware(thunk));

const configureStore = () => store;

export default configureStore;
