import { createReducer, on } from '@ngrx/store';
import { User } from '../../../../layouts/dashboard/pages/users/models/user';
import { AuthActions } from '../actions';

export const featureName = 'auth';                  // nombre

export interface AuthState {
  user: User | null;                                // usuario autenticado o null
}

const initialState: AuthState = {
  user: null,
  /*user : {
    id: 10,
    userName: "pepe",
    firstName: "hola",
    lastName: "afasf",
    email: "asfasfd@gmail.com",
    password: "aaa",
    role: "que",
    token: "hola", 
    }
    */

};

export const authReducer = createReducer(
                                initialState,
                                on(AuthActions.setAuthUser, (state, action) => {
                                    return {
                                    ...state,
                                    user: action.user,
                                    };
                                }),
                                on(AuthActions.logout, () => initialState)
);