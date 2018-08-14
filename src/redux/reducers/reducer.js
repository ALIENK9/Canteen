import { combineReducers } from 'redux';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import storage from 'redux-persist/lib/storage/session';
import { persistReducer, createTransform } from 'redux-persist';
import jwt from 'jsonwebtoken';
import { isEmpty } from 'lodash';
import reservations from './reservations/reservations.reducer'; // REDUCERS
import menus from './menus/menus.reducer';
import dishes from './dishes/dishes.reducer';
import authentication from './authentication/authentication.reducer';


const rootReducer = combineReducers({
  reservations,
  menus,
  dishes,
  authentication,
  _persist: { rehydrated: false }, // necessario come valore di default per 'rehydrated'
});

// export default rootReducer;

// NOTE: salva solo token
const transformAuth = createTransform(
  stateToBePersisted => ({
    token: stateToBePersisted.user.token,
  }),
  (stateToBeRehydrated) => {
    const { token } = stateToBeRehydrated;
    const decoded = jwt.decode(token);
    return {
      user: {
        ...stateToBeRehydrated, // token
        ...decoded, // expire time, id, name, admin
      },
      messages: {
        error: '',
        success: '',
      },
      ui: { loading: false },
      isAuthenticated: !isEmpty(decoded),
    };
  },
  { whitelist: ['authentication'] },
);


const persistConfig = {
  key: 'auth',
  storage,
  blacklist: ['reservations', 'dishes', 'menus'],
  stateReconciler: autoMergeLevel1,
  transforms: [
    transformAuth,
  ],
};

export default persistReducer(persistConfig, rootReducer);

/* TRANSFORM CHE SALVA TUTTO USER E ISAUTH (quella vecchia)
const transformAuth = createTransform(
  stateToBePersisted => ({
    isAuthenticated: stateToBePersisted.isAuthenticated,
    user: stateToBePersisted.user,
  }),
  stateToBeRehydrated => ({
    ...stateToBeRehydrated,
    messages: {
      error: '',
      success: '',
    },
    ui: { loading: false },
  }),
  { whitelist: ['authentication'] },
); */
