import { combineReducers } from 'redux';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import storage from 'redux-persist/lib/storage/session';
import { persistReducer, createTransform } from 'redux-persist';
import reservations from './reservations/reservations.reducer'; // REDUCERS
import menus from './menus/menus.reducer';
import dishes from './dishes/dishes.reducer';
import authentication from './authentication/authentication.reducer';


const rootReducer = combineReducers({
  reservations,
  menus,
  dishes,
  authentication,
  _persist: { rehydrated: false }, // sembra necessario come valore di default per 'rehydrated'
});

// export default rootReducer;

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

/* TRANSFORM BUONA MA CHE NON FUNZIONA

  const transformAuth = createTransform(
  (stateToBePersisted) => {
    console.log('Persisting', stateToBePersisted);
    return {
      token: stateToBePersisted.user.token,
    };
  },
  (stateToBeRehydrated) => {
    // console.debug('Reh');
    // console.log('Rehydrating', stateToBeRehydrated, typeof stateToBeRehydrated);
    const { token } = stateToBeRehydrated.user;
    // console.debug('Reh1', token);
    // console.debug('Reh2');
    // console.debug(token);
    try {
      console.debug('Reh2');
      // const decoded = 0;
      const decoded = jwt.verify(token, 'secret');
      const { name, admin } = decoded;
      return {
        user: {
          ...stateToBeRehydrated,
          name,
          admin,
        },
        messages: {
          error: '',
          success: '',
        },
        ui: { loading: false },
        isAuthenticated: name && token,
      };
    } catch (err) {
      console.debug('CATCH transform:', err.name, err.message);
      return {
        user: {
          name: '', admin: false, token: '',
        },
        messages: {
          error: '',
          success: '',
        },
        ui: { loading: false },
        isAuthenticated: false,
      };
    }
  },
  { whitelist: ['authentication'] },
); */
