import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateSiteData, Site } from '../../layouts/dashboard/pages/sites/models/site';
import { environment } from '../../../environments/environment';
import { catchError, concatMap, mergeMap, tap, throwError } from 'rxjs';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root'
})
export class SitesService {


  constructor(private http: HttpClient,
    private alerts: AlertsService) {}

    getSites() {
      return this.http.get<Site[]>(
        `${environment.apiURL}/sites`
      );
    }
    
    getSitesById(siteId: string | number) {
      return this.http.get<Site>(`${environment.apiURL}/sites/${siteId}`);
    }
  
    createSite(data: CreateSiteData) {
      return this.http.post<Site>(`${environment.apiURL}/sites`, data);
    }

    deleteSiteById(siteId: number) {
      return this.http
        .delete<Site>(`${environment.apiURL}/sites/${siteId}`)
        .pipe(
          tap(() => this.alerts.showSuccess('Realizado', 'Se eliminó la sede correctamente')),
          mergeMap(() => this.getSites()),
          catchError((error) => {
            return throwError(error);
          })
        );
    }      


}
