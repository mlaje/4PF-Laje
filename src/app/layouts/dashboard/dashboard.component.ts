import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;

  rolActual : string | undefined;                     
  // rol actual (ADMIN o USER) utitilzado para el ngIf (muestra el menú de usuarios solo a los ADMIN)
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService
    ) {
      this.rolActual = authService.authUser?.role;    // se guarda el rol del usuario
      
    }
  logout(): void {
    // /dashboard/users
    //this.router.navigate(['users'], {relativeTo: this.route} );
    //localStorage.removeItem('access-token');
    //this.router.navigate(['auth','login'] );
    this.authService.logout();
  }
}
