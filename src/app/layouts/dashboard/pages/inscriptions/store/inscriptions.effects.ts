import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscriptionsActions } from './inscriptions.actions';
import { InscriptionsService } from '../../../../../core/services/inscriptions.service';
import { StudentsService } from '../../../../../core/services/students.service';
import { CoursesService } from '../../../../../core/services/courses.service';


@Injectable()
export class InscriptionsEffects {

  loadInscriptions$ = createEffect(() => {           // se susbscribe a las acciones
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadInscriptions),  // filtra acciones loadInscriptions únicamente
      concatMap(() =>
        /** observable API request (consulta al servicio por http) */
        this.inscriptionsService.getInscriptions().pipe(
          // ok (si la respuesta de la base es ok, transformamos "data" en una nueva accion)
          map(data => InscriptionsActions.loadInscriptionsSuccess({ data })),
          // error
          catchError(error => of(InscriptionsActions.loadInscriptionsFailure({ error }))))
      )
    );
  });

  loadStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadStudents),
      concatMap(() =>
        this.studentsService.getStudents().pipe(
          map((resp) => InscriptionsActions.loadStudentsSuccess({ data: resp })),
          catchError((error) => {
            return of(InscriptionsActions.loadStudentsFailure({ error }));
          })
        )
      )
    );
  });

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadCourses),
      concatMap(() => {
        return this.coursesService.getCourses().pipe(
          map((resp) => InscriptionsActions.loadCoursesSuccess({ data: resp })),
          catchError((error) => of(InscriptionsActions.loadCoursesFailure({ error })))
        );
      })
    );
  });

  createInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.createInscription),
      concatMap((action) => {
        return this.inscriptionsService.createInscription(action.data).pipe(
          map((resp) => InscriptionsActions.createInscriptionSuccess({ data: resp })),
          catchError((error) => of(InscriptionsActions.createInscriptionFailure({ error })))
        );
      })
    );
  });

  createInscriptionSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.createInscriptionSuccess),
      map(() => InscriptionsActions.loadInscriptions())
    );
  });

  constructor(private actions$: Actions,
              private inscriptionsService: InscriptionsService,
              private studentsService: StudentsService,
              private coursesService: CoursesService) {
  } 
}
