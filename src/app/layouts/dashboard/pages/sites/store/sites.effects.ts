import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { SitesActions } from './sites.actions';
import { SitesService } from '../../../../../core/services/sites.service';



@Injectable()
export class SitesEffects {

  loadSites$ = createEffect(() => {           // se susbscribe a las acciones
    return this.actions$.pipe(
      ofType(SitesActions.loadSites),       // filtra acciones loadSites únicamente
      concatMap(() =>
        /** observable API request (consulta al servicio por http) */
        this.sitesService.getSites().pipe(
          // ok (si la respuesta de la base es ok, transformamos "data" en una nueva accion)
          map(data => SitesActions.loadSitesSuccess({ data })),
          // error
          catchError(error => of(SitesActions.loadSitesFailure({ error }))))
      )
    );
  });

  createSite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SitesActions.createSite),
      concatMap((action) => {
        return this.sitesService.createSite(action.data).pipe(
          map((resp) => SitesActions.createSiteSuccess({ data: resp })),
          catchError((error) => of(SitesActions.createSiteFailure({ error })))
        );
      })
    );
  });

  createSiteSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SitesActions.createSiteSuccess),
      map(() => SitesActions.loadSites())
    );
  });

  constructor(private actions$: Actions,
              private sitesService: SitesService)  { } 

}
