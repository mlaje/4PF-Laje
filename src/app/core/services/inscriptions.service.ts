import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CreateInscriptionData, Inscription } from '../../layouts/dashboard/pages/inscriptions/models/inscription';
import { Student } from '../../layouts/dashboard/pages/students/models';
import { catchError, concatMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {

  constructor(private http: HttpClient) {}

    getInscriptions() {
      return this.http.get<Inscription[]>(
        `${environment.apiURL}/inscriptions?_embed=student&_embed=course`
      );
    }
    
    getInscriptionsById(studentId: string | number) {
      return this.http.get<Student>(`${environment.apiURL}/students/${studentId}`).pipe(
        concatMap((student) =>
          this.http.get(`${environment.apiURL}/inscriptions?studentId=${student.id}`)
        ),  // se pueden concatenar mas concatMaps en lugar de anidar observables
        catchError((error) => {
          alert('Se produjo un error en el concatMap');
          return throwError(() => error);
        })
      );
    }
  
    createInscription(data: CreateInscriptionData) {
      return this.http.post<Inscription>(`${environment.apiURL}/inscriptions`, data);
    }
} 
