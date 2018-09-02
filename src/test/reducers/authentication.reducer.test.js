import { Reducer } from 'redux-testkit';
import Immutable from 'seamless-immutable';
import jwt from 'jsonwebtoken';
import authReducer from '../../redux/reducers/authentication/authentication.reducer';
import {
  loginRequest, loginFailure, setCurrentUser, clearMessages,
} from '../../redux/actions/authentication/authentication.actions';

const initState = Immutable({
  isAuthenticated: false,
  user: {
    name: '',
    id: '',
    admin: false,
    token: '',
  },
  messages: {
    error: '',
    success: '',
  },
  ui: {
    loading: false,
  },
});

describe('auth reducer tests', () => {
  it('should start loading after login req', () => {
    Reducer(authReducer).expect(loginRequest()).toReturnState({
      ...initState,
      ui: { loading: true },
    });
  });

  it('should set generic error after login failure', () => {
    Reducer(authReducer).expect(loginFailure('generico', null)).toReturnState({
      ...initState,
      messages: {
        ...initState.messages,
        error: 'generico',
      },
    });
  });

  it('should set server error after failure', () => {
    Reducer(authReducer).expect(loginFailure('generico', { message: 'errore' })).toReturnState({
      ...initState,
      messages: {
        ...initState.messages,
        error: 'errore',
      },
    });
  });

  it('should set user after login success', () => {
    const faketok = jwt.sign({ name: 'pippo', admin: true, id: '1kjkj1' }, 'secretkey');
    Reducer(authReducer).expect(setCurrentUser({ token: faketok })).toReturnState({
      ...initState,
      isAuthenticated: true,
      user: {
        ...initState.user,
        name: 'pippo',
        admin: true,
        id: '1kjkj1',
        token: faketok,
        iat: jwt.decode(faketok).iat,
      },
    });
  });

  it('should clear all error messages', () => {
    const state1 = Immutable({
      user: {
        name: '',
        id: '',
        admin: false,
        token: '',
      },
      messages: {
        error: '12',
        success: '',
      },
      ui: {
        loading: false,
      },
    });
    Reducer(authReducer).withState(state1).expect(clearMessages()).toReturnState({
      ...initState,
      messages: {
        ...initState.messages,
        error: '',
      },
    });
  });
});
