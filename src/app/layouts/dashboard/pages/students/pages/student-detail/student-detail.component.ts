import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../../../../../core/services/loading.service';
import { StudentsService } from '../../../../../../core/services/students.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent {
    constructor (private route: ActivatedRoute,
      private studentService: StudentsService, 
      private loadingService: LoadingService) {

  this.loadingService.setIsLoading(true);          
  this.studentService.getStudentById(this.route.snapshot.params['idStudent']).subscribe ({
    next:  (findedStudent) => { 

    },
   complete: () => {
      this.loadingService.setIsLoading(false); 
    }  
  });
  }
}


