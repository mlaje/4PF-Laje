import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionsActions } from './inscriptions.actions';
import { Inscription } from '../models/inscription';
import { Student } from '../../students/models';
import { Course } from '../../courses/models/course';

export const inscriptionsFeatureKey = 'inscriptions';

export interface State {
  inscriptions: Inscription[];
  students: Student[];
  courses: Course[];  
  loading: boolean;
  loadingStudents: boolean;
  error: unknown;
}

export const initialState: State = {
  inscriptions: [],
  students: [],
  courses: [],  
  loading: false,
  loadingStudents: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(InscriptionsActions.loadInscriptions, (state) => ({ 
                                                        ...state, 
                                                        loading: true 
  })),
  on(InscriptionsActions.loadInscriptionsSuccess, (state, action) => ({
                                                        ...state,
                                                        loading: false,
                                                        inscriptions: action.data,
  })),
  on(InscriptionsActions.loadInscriptionsFailure, (state, action) =>  ({ 
                                                        ...state,
                                                        loading: false,
                                                        error: action.error,
  })),
  on(InscriptionsActions.loadStudents, (state, action) =>  ({ 
                                                        ...state,
                                                        loadingStudents: true    
  })),
  on(InscriptionsActions.loadStudentsSuccess, (state, action) =>  ({ 
                                                        ...state,
                                                        loadingStudents: false,
                                                        students: action.data 
  })),
  on(InscriptionsActions.loadCoursesSuccess, (state, action) =>  ({ 
                                                        ...state,
                                                        courses: action.data 
  })),
);

export const inscriptionsFeature = createFeature({
  name: inscriptionsFeatureKey,
  reducer,
});

