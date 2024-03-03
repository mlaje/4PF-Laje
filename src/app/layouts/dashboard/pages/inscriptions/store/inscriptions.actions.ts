import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateInscriptionData, Inscription } from '../models/inscription';
import { Student } from '../../students/models';
import { Course } from '../../courses/models/course';

export const InscriptionsActions = createActionGroup({
  source: 'Inscriptions',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: Inscription[] }>(),
    'Load Inscriptions Failure': props<{ error: unknown }>(),
    'Load Students': emptyProps(),
    'Load Students Success': props<{data: Student[]}>(),
    'Load Students Failure': props<{error: unknown}>(),
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{data: Course[]}>(),
    'Load Courses Failure': props<{error: unknown}>(),
    'Create Inscription': props<{ data: CreateInscriptionData }>(),
    'Create Inscription Success': props<{ data: Inscription }>(),
    'Create Inscription Failure': props<{ error: unknown }>(),
    'Delete Inscription': props<{ inscriptionId: number }>(),
    'Delete Inscription Success': props<{ inscriptionId: number }>(),
    'Delete Inscription Failure': props<{ error: unknown }>(),
  }
});
