import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../../courses/models/course';
import { Student } from '../../../students/models/index';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material/dialog';
import { InscriptionsActions } from '../../store/inscriptions.actions';
import { selectInscriptionsCourses, selectInscriptionsStudents } from '../../store/inscriptions.selectors';

@Component({
  selector: 'app-inscription-dialog',
  templateUrl: './inscription-dialog.component.html',
  styleUrl: './inscription-dialog.component.scss'
})
export class InscriptionDialogComponent {
  students$: Observable<Student[]>;
  courses$: Observable<Course[]>;

  inscriptionForm: FormGroup;

  constructor(
              private store: Store,
              private formBuilder: FormBuilder,
              private matDialogRef: MatDialogRef<InscriptionDialogComponent>) {
      
      this.inscriptionForm = this.formBuilder.group({
            courseId: this.formBuilder.control(''),
            studentId: this.formBuilder.control(''),
    });

    this.store.dispatch(InscriptionsActions.loadStudents());
    this.store.dispatch(InscriptionsActions.loadCourses());

    this.courses$ = this.store.select(selectInscriptionsCourses);
    this.students$ = this.store.select(selectInscriptionsStudents);
  }  

  onSubmit(): void {
    if (this.inscriptionForm.invalid ||  
        !this.inscriptionForm.get('studentId')?.value || 
        !this.inscriptionForm.get('courseId')?.value ) {
      this.inscriptionForm.markAllAsTouched();
    } else {
      this.store.dispatch(
        InscriptionsActions.createInscription({ data: this.inscriptionForm.value })
      );
      this.matDialogRef.close();
    }
  }

}
