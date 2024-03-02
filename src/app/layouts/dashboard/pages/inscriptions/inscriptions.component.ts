import { Component } from '@angular/core';
import { InscriptionsService } from '../../../../core/services/inscriptions.service';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from './store/inscriptions.actions';
import { Inscription } from './models/inscription';
import { Observable } from 'rxjs';
import { selectInscriptions, selectInscriptionsIsLoading } from './store/inscriptions.selectors';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionDialogComponent } from './components/inscription-dialog/inscription-dialog.component';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss'
})

export class InscriptionsComponent {
  inscriptions$: Observable<Inscription[]>; 
  isLoading$: Observable<boolean>;
  displayedColumns: string[] = ['id', 'courseName', 'profesor', 'studentName', 'edad', 'email', 'phone']; 
  
  constructor (
              //private inscriptionsService: InscriptionsService, 
               private store: Store,
               private matDialog: MatDialog) {
     
     //this.inscriptions$ = this.inscriptionsService.getInscriptions(); 
     this.inscriptions$ = this.store.select(selectInscriptions);
     
     this.isLoading$ = this.store.select(selectInscriptionsIsLoading)
     this.store.dispatch(InscriptionsActions.loadInscriptions());
  }

  createInscription(): void {
    this.matDialog.open(InscriptionDialogComponent)
  }

  /*
  onDeleteInscription(ins: Inscription): void {
    if(confirm('Está seguro que desea borrar la Inscripción?')) {
      this.store.dispatch(InscriptionsActions.deleteInscription({ data: this.inscriptionForm.value }));
    }
  }
  */


}
