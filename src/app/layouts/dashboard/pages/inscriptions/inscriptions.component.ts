import { Component } from '@angular/core';
import { InscriptionsService } from '../../../../core/services/inscriptions.service';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from './store/inscriptions.actions';
import { Inscription } from './models/inscription';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss'
})

export class InscriptionsComponent {
  inscriptions$: any; 

  constructor (private inscriptionsService: InscriptionsService, 
               private store: Store) {
     
     this.inscriptions$ = this.inscriptionsService.getInscriptions();          
     this.store.dispatch(InscriptionsActions.loadInscriptions());
  }

}
