import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../../../../../core/services/loading.service';
import { CoursesService } from '../../../../../../core/services/courses.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent {
    constructor (private route: ActivatedRoute,
      private courseService: CoursesService, 
      private loadingService: LoadingService) {

  this.loadingService.setIsLoading(true);          
  this.courseService.getCourseById(this.route.snapshot.params['idCourse']).subscribe ({
    next:  (findedCourse) => { 
      //console.log('falta implementar details de ' + findedStudent)
      //console.log(findedCourse);
    },
   complete: () => {
      this.loadingService.setIsLoading(false); 
    }  
  });
  }
}


