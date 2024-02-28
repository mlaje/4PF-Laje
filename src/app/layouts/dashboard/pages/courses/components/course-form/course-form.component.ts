import { Component , EventEmitter, Inject, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../../../../../../core/services/courses.service';
import { LoadingService } from '../../../../../../core/services/loading.service';
import { forkJoin } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../models/course';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;

  // ahora se levantan del servicio courses.service  
  categorias: string[] = [];
  carreras: string[] = [];
  niveles: string[] = [];
  dedicaciones: string[] = [];

  @Output() 
  userSubmitted = new EventEmitter();

  constructor(private coursesService: CoursesService,
            // private loadingService: LoadingService,
             private fb: FormBuilder,
             private dialogRef: MatDialogRef<CourseFormComponent>,
             @Inject(MAT_DIALOG_DATA) private editingCourse?: Course) {    // el FormBuilder es un servicio que viene en Angular que se inyecta              

    this.courseForm = this.fb.group(
      {
        nombre: this.fb.control('', [Validators.required, Validators.minLength(2) ] ),
        carrera: this.fb.control('', [Validators.required] ),
        categoria: this.fb.control('', [Validators.required ] ),
        nivel: this.fb.control('', [Validators.required]),
        dedicacion: this.fb.control('', [Validators.required] ),
        precioDeLista: this.fb.control(''),
        descuento: this.fb.control(''),
        precioFinal: this.fb.control('', [Validators.required ] ),
        detalles: this.fb.control(''),
        rangoDeFechas: this.fb.control('', [Validators.required ]),
        dias: this.fb.control('', [Validators.required ]),
        horario: this.fb.control('', [Validators.required ]),
        profesor: this.fb.control('', [Validators.required ])    
      }); 
    if (editingCourse) {
      this.courseForm.patchValue(editingCourse);
    }

  }

  
  ngOnInit():void {
    this.getPageData();
  }  
  
  getPageData(): void {
    //this.loadingService.setIsLoading(true);
    forkJoin([
      this.coursesService.getCourseCategories(),
      this.coursesService.getCourseCareers(),
      this.coursesService.getCourseLevels(),
      this.coursesService.getCourseDedications()
    ]).subscribe({
      next: (value) => {
        this.categorias = value[0];
        this.carreras = value[1];
        this.niveles = value[2];
        this.dedicaciones = value[3];
      },
      complete: () => {
       // this.loadingService.setIsLoading(false);
      },
      
    });
  }
  /* El formulario no se hace submit, se usa el boton Guardar que llama a onSave()
  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
        this.userSubmitted.emit(this.courseForm.value);
        this.courseForm.reset();        
    }
  }
  */

  onSave(): void {
    this.dialogRef.close(this.courseForm.value);    
  }

}

