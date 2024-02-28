import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
//import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field'; // input wrapper
import { MatInputModule } from '@angular/material/input'; // input
import { MatSelectModule } from '@angular/material/select'; // select
import { MatButtonModule } from '@angular/material/button'; // button
import { MatCheckboxModule } from '@angular/material/checkbox'; // checkbox
import { ReactiveFormsModule } from '@angular/forms';  // formularios reactivos
import { SharedModule } from '../../../../shared/shared.module';
import {Component} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core'; 
import { CoursesService } from '../../../../core/services/courses.service';
import { MatIconModule } from '@angular/material/icon';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseFormComponent,
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    SharedModule, 
    MatDatepickerModule,
    MatCheckboxModule,
    MatIconModule,
    CoursesRoutingModule
  ],
  exports: [
    CoursesComponent
  ],
})
export class CoursesModule { }
