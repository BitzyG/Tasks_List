import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './app.auth.actions';

export interface AuthState {
  isLoggedIn: boolean;
}

export const initialState: AuthState = {
  isLoggedIn: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, state => ({ ...state, isLoggedIn: true })),
  // on(AuthActions.logout, state => ({ ...state, isLoggedIn: false }))
);
