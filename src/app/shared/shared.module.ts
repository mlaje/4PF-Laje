import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './full-name.pipe';
import { EdadPipe } from './edad.pipe';
import { SizeDirective } from './size.directive';
import { MatTableModule } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatCardModule} from '@angular/material/card'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { ValidationErrorsPipe } from './validation-errors.pipe';

@NgModule({
  declarations: [
    FullNamePipe,
    EdadPipe,
    SizeDirective,
    ValidationErrorsPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FullNamePipe,
    EdadPipe,
    SizeDirective,
    MatTableModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatButtonModule,
    ValidationErrorsPipe,
    MatSelectModule
    ]
})
export class SharedModule { }
