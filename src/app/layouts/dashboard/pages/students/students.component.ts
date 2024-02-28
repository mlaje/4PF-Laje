import { Component , EventEmitter, Output} from '@angular/core';
import { Student } from './models';
import { StudentsService } from '../../../../core/services/students.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from './components/student-form/student-form.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  displayedColumns: string[] = ['id', 'fullName', 'dni', 'birthDate', 'edad', 'email', 'phone', 'gender', 'address', 
  'residenceCountry', 'bornCountry', 'works', 'companyIndustry', 'jobDescription', 'actions'];


  dataSource: Student[] = [];
  
  constructor (private studentsService: StudentsService,
               private loadingService: LoadingService,
               public dialog: MatDialog) {
  } 

  ngOnInit():void {
    this.getPageData();
  }
  

  getPageData(): void {
    this.loadingService.setIsLoading(true);
    forkJoin([
      this.studentsService.getStudents(),
    ]).subscribe({
      next: (value) => {
        this.dataSource = value[0];
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      },
     
    });
  }

  onDeleteStudent(ev: Student): void {
    if(confirm('Está seguro que desea borrar el Estudiante?')) {
      this.loadingService.setIsLoading(true);
      this.studentsService.deleteStudentById(ev.id).subscribe({
        next: (students) => {
          this.dataSource = [...students];
        },
        complete: () => {
          this.loadingService.setIsLoading(false);
        },
      });
    }
  }

  onCreate(): void {
    this.dialog
    .open(StudentFormComponent)
    .afterClosed()
    .subscribe({
      next: (result) => {
        if (result) {
          this.studentsService.createStudent(result).subscribe( {
            next: (students) => (this.dataSource  = students)
          });
        }
      }
    });
  }
/*
	onStudentSubmitted(ev: Student): void {
    
    this.loadingService.setIsLoading(true);
    this.studentsService
      .createStudent({...ev, id: new Date().getTime()})
      .subscribe({							
        next: (students) => {
          this.dataSource = [...students ]; 
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      },
    });
  }
*/
  @Output() 
  userSubmitted = new EventEmitter();

  onEdit(student: Student) {
    this.dialog.open(StudentFormComponent, {
      data: student,
    }).afterClosed().subscribe({
      next: (result) =>  {
          if (result) {
            this.studentsService
              .updateStudentById(student.id, result)
              .subscribe({
                next: (students) => (this.dataSource = students)
              });
          }
      }
    })
  }
 
}
