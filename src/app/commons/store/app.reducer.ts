import { ActionReducerMap } from '@ngrx/store';
import { AuthState, authReducer } from './app.auth.reducer';

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer
};
