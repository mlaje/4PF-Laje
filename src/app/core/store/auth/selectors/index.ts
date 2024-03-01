import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, featureName } from '../reducers';

export const selectAuthState = createFeatureSelector<AuthState>(featureName);

export const selectAuthUser = createSelector(
  selectAuthState,                              // nombre selector
  (state) => state.user                         // devuelve el usuario
);