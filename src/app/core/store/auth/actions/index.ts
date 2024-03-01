import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../../../layouts/dashboard/pages/users/models/user';

export const AuthActions = createActionGroup({
  source: 'Auth',                                   // nombre del grupo de acciones
  events: {
    'Set auth user': props<{ user: User }>(),
    logout: emptyProps(),
  },
});