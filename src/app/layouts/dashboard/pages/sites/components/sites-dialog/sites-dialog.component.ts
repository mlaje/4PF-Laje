import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
            nombre: this.formBuilder.control(''),
            calle: this.formBuilder.control(''),
            altura: this.formBuilder.control(''),
            codigoPostal: this.formBuilder.control(''),
            aulas: this.formBuilder.control(''),
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
