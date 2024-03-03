import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CreateInscriptionData, Inscription } from '../../layouts/dashboard/pages/inscriptions/models/inscription';
//import { Student } from '../../layouts/dashboard/pages/students/models';
import { catchError, concatMap, mergeMap, tap, throwError } from 'rxjs';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {

  constructor(private http: HttpClient,
    private alerts: AlertsService) {}

    getInscriptions() {
      return this.http.get<Inscription[]>(
        `${environment.apiURL}/inscriptions?_embed=student&_embed=course`
      );
    }
      
    createInscription(data: CreateInscriptionData) {
      return this.http.post<Inscription>(`${environment.apiURL}/inscriptions`, data);
    }
  
    deleteInscriptionById(inscriptionId: number) {
      return this.http
        .delete<Inscription>(`${environment.apiURL}/inscriptions/${inscriptionId}`)
        .pipe(
          tap(() => this.alerts.showSuccess('Realizado', 'Se eliminó la inscripción correctamente')),
          mergeMap(() => this.getInscriptions()),
          catchError((error) => {
            return throwError(error);
          })
        );
    }      

} 
