import { Component , EventEmitter, OnInit, Output} from '@angular/core';
import { User } from './models/user';
import { UsersService } from '../../../../core/services/users.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './components/user-form/user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'fullName', 'userName', 'email', 'rol', 'actions'];
  
  roles: string[] = [];
  dataSource: User[] = [];
  
  constructor (private usersService: UsersService,
               private loadingService: LoadingService,
               public dialog: MatDialog) {
  } 

  ngOnInit():void {
    this.getPageData();
  }  

  getPageData(): void {
    this.loadingService.setIsLoading(true);
    forkJoin([
      this.usersService.getRoles(),
      this.usersService.getUsers(),
    ]).subscribe({
      next: (value) => {
        this.roles = value[0];
        this.dataSource = value[1];
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      },
      
    });
  }

  onDeleteUser(ev: User): void {
    if(confirm('Está seguro que desea borrar el Usuario?')) {
      this.loadingService.setIsLoading(true);
      this.usersService.deleteUserById(ev.id).subscribe({
        next: (users) => {
          this.dataSource = [...users];
        },
        complete: () => {
          this.loadingService.setIsLoading(false);
        },
      });
    }
  }

  onCreate(): void {
    this.dialog
    .open(UserFormComponent)
    .afterClosed()
    .subscribe({
      next: (result) => {
        if (result) {
          this.usersService.createUser(result).subscribe( {
            next: (users) => (this.dataSource  = users)
          });
        }
      }
    });
  }
  
  onEdit(user: User) {
    this.dialog.open(UserFormComponent, {
      data: user,
    }).afterClosed().subscribe({
      next: (result) =>  {
          if (result) {
            this.usersService
              .updateUserById(user.id, result)
              .subscribe({
                next: (users) => (this.dataSource = users)
              });
          }
      }
    })
  }
}

