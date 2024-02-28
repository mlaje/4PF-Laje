import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon'; 

import {MatCheckboxModule} from '@angular/material/checkbox'; 

import { StudentsModule } from './pages/students/students.module';
import { SharedModule } from '../../shared/shared.module';
import { UsersModule } from './pages/users/users.module';
import { CoursesModule } from './pages/courses/courses.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { StudentsComponent } from './pages/students/students.component';
import { CoursesComponent } from './pages/courses/courses.component';
import {MatListModule} from '@angular/material/list'; 

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule, 
    MatSidenavModule,
    MatButtonModule, 
    MatToolbarModule,
    MatIconModule ,
    StudentsModule, 
    SharedModule,
    UsersModule,
    CoursesModule,
    RouterModule,
    MatListModule
     // /dashboard
     /*
    RouterModule.forChild([
      {
        // /dashboard/home
        path: 'home',
        component: HomeComponent,
      },
      {
        // /dashboard/users
        path: 'users',
        component: UsersComponent
      },
      {
        // /dashboard/students
        path: 'students',
        component: StudentsComponent
      },
      {
        // /dashboard/courses
        path: 'courses',
        component: CoursesComponent
      },
      
      {
        path: '**',
        redirectTo: 'home',
      },
    ]),*/
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
