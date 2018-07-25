import { combineReducers } from 'redux';
// import { createFilter } from 'redux-persist-transform-filter';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import storage from 'redux-persist/lib/storage/session';
import { persistReducer, createTransform } from 'redux-persist';
import reservationsReducer from './reservations/reservations.reducer';
import menusReducer from './menus/menus.reducer';
import dishesReducer from './dishes/dishes.reducer';
import authReducer from './authentication/authentication.reducer';


const rootReducer = combineReducers({
  reservations: reservationsReducer,
  menus: menusReducer,
  dishes: dishesReducer,
  authentication: authReducer,
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
/* createFilter(
  'authentication',
  ['user', 'isAuthenticated'],
); */

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['reservations', 'dishes', 'menus'],
  stateReconciler: autoMergeLevel1,
  transforms: [
    transformAuth,
  ],
};

export default persistReducer(persistConfig, rootReducer);

/* state => ({
    authentication: {
      user: state.user,
      isAuthenticated: state.isAuthenticated,
    },
  }),
  (state) => {
    console.log('rehydrating', state);
    return {
      ...state,
      messages: {
        error: '',
        success: '',
      },
      ui: {
        loading: false,
      },
    };
  },
  { whitelist: 'authReducer' },
); */
