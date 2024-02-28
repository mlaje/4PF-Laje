import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { HomeComponent } from './layouts/dashboard/pages/home/home.component';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'dashboard',   
    canActivate: [authGuard],
    component: DashboardComponent,
    children: [ 
      {
        // /dashboard/home
        path: 'home',
        component: HomeComponent,
      },
      {
        // /dashboard/users
        path: 'users',
        canActivate: [adminGuard],
        loadChildren: () => 
                      import('./layouts/dashboard/pages/users/users.module').then(
                            (m) => m.UsersModule)   // LAZY LOADING
        //component: UsersComponent
      },  
      {
        // /dashboard/students
        path: 'students',
        loadChildren: () => 
                      import('./layouts/dashboard/pages/students/students.module').then(
                            (m) => m.StudentsModule)   // LAZY LOADING
        //component: StudentsComponent
      },
      { 
        // /dashboard/courses
        path: 'courses',
        loadChildren: () => 
                      import('./layouts/dashboard/pages/courses/courses.module').then(
                            (m) => m.CoursesModule)   // LAZY LOADING
        //component: CoursesComponent   
      },
      { 
        path: '**',
        redirectTo: 'home'
      },
    ]
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
 /* {
    path: 'auth/login',
    component: LoginComponent,
  }
  */
  {
    path: 'auth',
    loadChildren: () => 
                  import('./layouts/auth/auth.module').then(
                        (m) => m.AuthModule)   // LAZY LOADING
  },
  {
    path: '**',
    redirectTo: '/dashboard',
    //redirectTo: '/home',
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
