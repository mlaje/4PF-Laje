import { Component , EventEmitter, Inject, OnInit , Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../../../../core/services/users.service';
import { LoadingService } from '../../../../../../core/services/loading.service';
import { forkJoin } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup ; 
  
  // Roles de Usuario
  //roles: string[] = ['ADMIN', 'USER'];    // antes
  roles: string[] = [];                     // ahora los datos vienen a través del servicio (UsersService)

  constructor(
      private usersService: UsersService,
      //private loadingService: LoadingService,           // por ahora no lo voy a usar aquí sino en el users.component
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<UserFormComponent>,
      @Inject(MAT_DIALOG_DATA) private editingUser?: User
    ) {    // el FormBuilder es un servicio que viene en Angular que se inyecta
    
    this.userForm = this.fb.group(
      {
        firstName: this.fb.control('', [Validators.required, Validators.minLength(2) ] ),
        lastName: this.fb.control('', [Validators.required, Validators.minLength(2) ] ),
        userName: this.fb.control('', [Validators.required ] ),
        email: this.fb.control('', [Validators.required, Validators.email ] ),
        password: this.fb.control('', [Validators.required ] ),
        role: this.fb.control('', [Validators.required ] )
      }); 
      if (editingUser) {
        this.userForm.patchValue(editingUser);
      }
  }
  
  ngOnInit():void {
    this.getPageData();
  }

  getPageData(): void {
    //this.loadingService.setIsLoading(true);       
    forkJoin([                      // como sólo se levantan los roles, no tiene sentido el forkJoin por el momento
      this.usersService.getRoles()  // si se llegara a necesitar levantar otros datos del UsersService se invocaría para obtenerlos aquí
    ]).subscribe({
      next: (value) => {
        this.roles = value[0];
      },
      complete: () => {
       // this.loadingService.setIsLoading(false);
      },
      
    });
  }

  @Output() 
  userSubmitted = new EventEmitter();

  onSave(): void {
    this.dialogRef.close(this.userForm.value);    
  }

}
