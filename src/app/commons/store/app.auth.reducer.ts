import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './app.auth.actions';

export interface AuthState {
  isLoggedIn: boolean;
  username: string;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  username: ''
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { username }) => ({ ...state, isLoggedIn: true, username })),
  // on(AuthActions.logout, state => ({ ...state, isLoggedIn: false, username: '' }))
);