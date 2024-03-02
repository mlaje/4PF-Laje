import { Component } from '@angular/core';
import { Site } from './models/site';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { SitesDialogComponent } from './components/sites-dialog/sites-dialog.component';
import { SitesActions } from './store/sites.actions';
import { selectSites, selectSitesIsLoading } from './store/sites.selectors';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrl: './sites.component.scss'
})
export class SitesComponent {
  
  sites$: Observable<Site[]>; 
  isLoading$: Observable<boolean>;
  displayedColumns: string[] = ['id', 'nombre', 'calle', 'altura', 'codigoPostal', 'aulas']; 

  constructor (private store: Store,
               private matDialog: MatDialog) {

      this.sites$ = this.store.select(selectSites);
      this.isLoading$ = this.store.select(selectSitesIsLoading)
      this.store.dispatch(SitesActions.loadSites());
  }

  createSite(): void {
    this.matDialog.open(SitesDialogComponent)
  }



}