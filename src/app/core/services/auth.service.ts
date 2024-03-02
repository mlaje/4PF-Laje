import { Injectable } from '@angular/core';
import { User } from '../../layouts/dashboard/pages/users/models/user';
import { Router } from '@angular/router';
import { AlertsService } from './alerts.service';
import { Observable, delay, of, map, finalize, tap, catchError } from 'rxjs';
import { LoadingService } from './loading.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { AuthActions } from '../store/auth/actions';

interface LoginData {
  email: null | string;
  password: null | string;
}

/*
const MOCK_USER = {
  id: 2323,
  userName: 'kimo', 
  firstName: 'Satoshi',
  lastName: 'Nakamoto',
  email: 'satoshi@gmail.com',
  password: 'bitcoin',
  role: 'USER',
};
*/
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  //authUser: User | null = null;
  
  constructor(private router: Router, 
              private alertsService: AlertsService,
              private loadingService: LoadingService,
              private httpClient: HttpClient,
              private store: Store) {
  }

  login(data: LoginData): Observable<User[]> {
    let urlAndParametros = `${environment.apiURL}/users?email=${data.email}&password=${data.password}`;
    
    return this.httpClient
                  .get<User[]>(urlAndParametros)
                  .pipe(
                      tap((response) => {
                        if (!!response[0]) {
                                this.setAuthUser(response[0]) ;
                                this.router.navigate(['dashboard']);
                            } else {
                                this.alertsService.showError('Email o password inválidos')  
                            }
                      })
                    );
  }                    
  /*
    login(data: LoginData) : void {
        if (data.email    === MOCK_USER.email && 
            data.password === MOCK_USER.password) {
              this.setAuthUser(MOCK_USER);
              localStorage.setItem('token', 'token123');        // TOKEN siempre igual
              this.router.navigate(['dashboard']);
        } else {
              this.alertsService.showError('Email o password inválidos');
        }
    };   
  */

  logout(): void {
    //this.authUser = null;
    this.store.dispatch(AuthActions.logout());

    this.router.navigate(['auth','login']);
    localStorage.removeItem('token');
  };

  verifyToken() {
    let urlAndToken = `${environment.apiURL}/users?token=${localStorage.getItem('token')}`;
    
    return this.httpClient.get<User[]>(urlAndToken)
                          .pipe(map((response) => {
                                  if (response.length) {
                                    this.setAuthUser(response[0]);
                                    return true;
                                  } else {
                                    //this.authUser = null;
                                    this.store.dispatch(AuthActions.logout());
                                    localStorage.removeItem('token');
                                    return false;
                                  }
                                }),
                                catchError(() => of(false))
    );
  }
  /*    this.loadingService.setIsLoading(true);
      return of(localStorage.getItem('token'))
            .pipe(delay(1000), 
                  map((response) => !!response ), 
                  tap(()         => this.setAuthUser(MOCK_USER)),
                  finalize(()    => this.loadingService.setIsLoading(false)));           
    }
  */


  private setAuthUser(user: User): void {
    //this.authUser = user;
    this.store.dispatch(AuthActions.setAuthUser({user})) 
    localStorage.setItem('token', user.token); 
  }

}
