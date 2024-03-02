import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateSiteData, Site } from '../../layouts/dashboard/pages/sites/models/site';
import { environment } from '../../../environments/environment';
import { catchError, concatMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SitesService {


  constructor(private http: HttpClient) {}

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
}
