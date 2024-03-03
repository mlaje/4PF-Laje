import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from './pages/users/models/user';
import { selectAuthUser } from '../../core/store/auth/selectors';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;

  authUser$: Observable<User | null>;
  //rolActual : string | undefined;                     
  // rol actual (ADMIN o USER) utitilzado para el ngIf (muestra el menú de usuarios solo a los ADMIN)
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private store: Store
    ) {
      //this.rolActual = authService.authUser?.role;    // se guarda el rol del usuario
      
      this.authUser$ = this.store.select(selectAuthUser); 
      

    }
  logout(): void {

    this.authService.logout();
  }
}
