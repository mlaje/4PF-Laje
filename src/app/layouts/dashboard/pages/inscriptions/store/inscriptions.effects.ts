import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscriptionsActions } from './inscriptions.actions';
import { InscriptionsService } from '../../../../../core/services/inscriptions.service';


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


  constructor(private actions$: Actions, private inscriptionsService: InscriptionsService) {

  } 
}
