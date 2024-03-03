import { Component , EventEmitter, Inject, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from '../../../../../../core/services/students.service';
import { LoadingService } from '../../../../../../core/services/loading.service';
import { forkJoin } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models/index';



@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss'
})
export class StudentFormComponent implements OnInit {
  /**
   * FormGroups agrupar controles y crear objetos
   * FormControl definicion de un control para capturar el valor
   * FormArray que agrupan controles y crean array
   */
  studentForm: FormGroup;  
  
  genders: string[] = [];
  countries: string[] = [];
  companyIndustries: string[] = [];
  jobDescriptions: string[] = [];

  
  @Output() 
  userSubmitted = new EventEmitter();

  constructor(private studentsService: StudentsService,
             // private loadingService: LoadingService,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<StudentFormComponent>,
              @Inject(MAT_DIALOG_DATA) private editingStudent?: Student) {    // el FormBuilder es un servicio que viene en Angular que se inyecta
    
    this.studentForm = this.fb.group(
      {
        firstName: this.fb.control('', [Validators.required, Validators.minLength(2) ] ),
        lastName: this.fb.control('', [Validators.required, Validators.minLength(2) ] ),
        dni: this.fb.control('', [Validators.required ] ),
        birthDate: this.fb.control('', [Validators.required]),
        email: this.fb.control('', [Validators.required, Validators.email ] ),
        phone: this.fb.control(''),
        gender: this.fb.control(''),
        address: this.fb.control('', [Validators.required, Validators.minLength(2) ] ),
        residenceCountry: this.fb.control(''),
        bornCountry: this.fb.control(''),
        works: this.fb.control(false),
        companyIndustry: this.fb.control(''),
        jobDescription: this.fb.control('')    
      }); 
      if (editingStudent) {
        this.studentForm.patchValue(editingStudent);
      }
  }
  
  ngOnInit():void {
    this.getPageData();
  }  

  getPageData(): void {
    //this.loadingService.setIsLoading(true);
    forkJoin([
      this.studentsService.getStudentsGenders(),
      this.studentsService.getStudentsCountries(),
      this.studentsService.getStudentsCompanyIndustries(),
      this.studentsService.getStudentsJobDescriptions()
    ]).subscribe({
      next: (value) => {
        this.genders = value[0];
        this.countries = value[1];
        this.companyIndustries = value[2];
        this.jobDescriptions = value[3];
     

      },
      complete: () => {
      //  this.loadingService.setIsLoading(false);
      },
      
    });
  }


  onSave(): void {
    this.dialogRef.close(this.studentForm.value);    
  }

}
