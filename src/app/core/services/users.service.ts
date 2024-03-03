import { Inject, Injectable } from '@angular/core';
import { User } from '../../layouts/dashboard/pages/users/models/user';
import { Observable, catchError, delay, finalize, mergeMap, of, tap } from 'rxjs';
import { AlertsService } from './alerts.service';
import { LoadingService } from './loading.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';


const ROLES_DB: string[] = ['ADMIN', 'USER'];

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private alerts: AlertsService, 
              private loadingService: LoadingService,
              private httpClient: HttpClient) {}
  
  getUserById(idUser: number | string): Observable<User | undefined> {
    return this.httpClient.get<User>(`${environment.apiURL}/users/${idUser}`);

  }
   
  getRoles(): Observable<string[]> {
    this.loadingService.setIsLoading(true);
    return of(ROLES_DB).pipe(
      delay(800), 
      finalize(() => this.loadingService.setIsLoading(false)));
    
    }
  
  getUsers() {
    this.loadingService.setIsLoading(true);
    
    return this.httpClient.get<User[]>(`${environment.apiURL}/users`)
                          .pipe(
                              catchError((error) => {
                                  this.alerts.showError('Error al cargar los usuarios');
                                  //finalize(() => this.loadingService.setIsLoading(false));
                                  return of([]);                              
                              }))
                          .pipe(delay(1200), 
                                finalize(() => this.loadingService.setIsLoading(false)));
    
  }

  
  generateString(length: number) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
		

  createUser(payload: User) {
    return this.httpClient
      .post<User>(`${environment.apiURL}/users`, {
        ...payload,
        token: this.generateString(16),
      })
      .pipe(mergeMap(() => this.getUsers()));

  }



  deleteUserById(userId: number) {
    return this.httpClient
          .delete<User>(`${environment.apiURL}/users/${userId}`)
          .pipe(tap(() => this.alerts.showSuccess('Realizado', 'Se eliminó correctamente')) )
          .pipe(mergeMap(() => this.getUsers()));

  }
	
  updateUserById(userId: number, data: User) {
    return this.httpClient
          .patch<User>(`${environment.apiURL}/users/${userId}`,data)
          .pipe(
            catchError((error) => {
              this.alerts.showError('Error al actualizar el usuario');             
              return of([]);
            }))
          .pipe(mergeMap(() => this.getUsers()));

  }

}
