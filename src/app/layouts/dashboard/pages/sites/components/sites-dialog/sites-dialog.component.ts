import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { SitesActions } from '../../store/sites.actions';

@Component({
  selector: 'app-sites-dialog',
  templateUrl: './sites-dialog.component.html',
  styleUrl: './sites-dialog.component.scss'
})
export class SitesDialogComponent {

  
  siteForm: FormGroup;

  constructor(
              private store: Store,
              private formBuilder: FormBuilder,
              private matDialogRef: MatDialogRef<SitesDialogComponent>) {
      
      this.siteForm = this.formBuilder.group({
            nombre: this.formBuilder.control('', [Validators.required, Validators.minLength(3) ]),
            calle: this.formBuilder.control('', [Validators.required, Validators.minLength(1) ]),
            altura: this.formBuilder.control('', [Validators.required]),
            codigoPostal: this.formBuilder.control('', [Validators.required]),
            aulas: this.formBuilder.control('', [Validators.required])
    });

  }  

  onSubmit(): void {
    if (this.siteForm.invalid) {
      this.siteForm.markAllAsTouched();
    } else {
      this.store.dispatch(
        SitesActions.createSite({ data: this.siteForm.value })
      );
      this.matDialogRef.close();
    }
  }




}
