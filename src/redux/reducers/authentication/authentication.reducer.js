import { combineReducers } from 'redux';
import user from './user.reducer';
import messages from './messages.reducer';
import ui from './ui.reducer';
import isAuthenticated from './isAuthenticated.reducer';

const authReducer = combineReducers({
  isAuthenticated,
  user,
  messages,
  ui,
  // _persist: { rehydrated: false }, // sembra necessario come valore di default per 'rehydrated'
});

export default authReducer;

/* const transformToken = createTransform(
  (stateToBePersisted) => {
    const { token } = stateToBePersisted;
    console.log('Peristing', token);
    return { token };
  },
  (stateToBeRehydrated) => {
    const { token } = stateToBeRehydrated;
    try {
      const decoded = jwt.verify(token);
      const { name, admin } = decoded;
      console.log('Rehydrting', decoded);
      return { name, admin, token };
    } catch (err) {
      console.error('CATCH transform:', err.name, err.message);
      return { }; // forse? { name: '', admin: false, token: ''}
    }
  },
  { whitelist: ['user'] },
);


const persistConfig = {
  key: 'auth',
  storage,
  blacklist: ['isAuthenticated', 'messages', 'ui'],
  stateReconciler: autoMergeLevel1,
  transforms: [
    transformToken,
  ],
}; */
