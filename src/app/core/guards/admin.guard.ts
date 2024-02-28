import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

//import { Store } from '@ngrx/store';
//import { selectAuthUser } from '../store/auth/selectors';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.authUser?.role === 'ADMIN'
     ? true
     : router.createUrlTree(['dashboard', 'home']);

  //const store = inject(Store);
  // return authService.authUser?.role === 'ADMIN'
  //   ? true
  //   : router.createUrlTree(['dashboard', 'home']);
/*
  return store.select(selectAuthUser).pipe(
    map((user) => {
      return user?.role === 'ADMIN'
        ? true
        : router.createUrlTree(['dashboard', 'home']);
    })
  );
  */
}