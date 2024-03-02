import { Component , EventEmitter, OnInit, Output} from '@angular/core';
import { Course } from './models/course';
import { CoursesService } from '../../../../core/services/courses.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { Observable, forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { Store } from '@ngrx/store';
import { User } from '../users/models/user';
import { selectAuthUser } from '../../../../core/store/auth/selectors';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'carrera', 'categoria', 'nivel', 'dedicacion', 'precioDeLista', 'descuento', 
                                'precioFinal', 'detalles', 'rangoDeFechas', 'dias', 'horario', 'profesor', 'actions'];

  dataSource: Course[] = [];
  roles: string[] = [];

  authUser$: Observable<User | null>;
  
  constructor (private coursesService: CoursesService,
              private loadingService: LoadingService,
              public dialog: MatDialog, 
              private store: Store) {

              this.authUser$ = this.store.select(selectAuthUser); 
  } 
 
ngOnInit():void {
  this.getPageData();
}

getPageData(): void {
  this.loadingService.setIsLoading(true);
  forkJoin([
    this.coursesService.getCourses(),
  ]).subscribe({
    next: (value) => {
      this.dataSource = value[0];
    },
    complete: () => {
      this.loadingService.setIsLoading(false);
    },
    
  });
}

onCreate(): void {
  this.dialog
  .open(CourseFormComponent)
  .afterClosed()
  .subscribe({
    next: (result) => {
      if (result) {
        this.coursesService.createCourse(result).subscribe( {
          next: (courses) => (this.dataSource  = courses)
        });
      }
    }
  });
}

onEdit(course: Course) {
  this.dialog.open(CourseFormComponent, {
    data: course,
  }).afterClosed().subscribe({
    next: (result) =>  {
        if (result) {
          this.coursesService
            .updateCourseById(course.id, result)
            .subscribe({
              next: (courses) => (this.dataSource = courses)
            });
        }
    }
  })
}

onDeleteCourse(ev: Course): void {
  if(confirm('Está seguro que desea borrar el Curso?')) {
    this.loadingService.setIsLoading(true);
    this.coursesService.deleteCourseById(ev.id).subscribe({
      next: (courses) => {
        this.dataSource = [...courses];
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      },
    });
  }
}

/*
onCourseSubmitted(ev: Course): void {
  
  this.loadingService.setIsLoading(true);
  this.coursesService
    .createCourse({...ev, id: new Date().getTime()})
    .subscribe({							
      next: (courses) => {
        this.dataSource = [...courses ]; 
    },
    complete: () => {
      this.loadingService.setIsLoading(false);
    },
  });
}
*/
}
