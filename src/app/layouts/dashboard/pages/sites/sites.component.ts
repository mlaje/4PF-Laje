import { Component } from '@angular/core';
import { Site } from './models/site';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { SitesDialogComponent } from './components/sites-dialog/sites-dialog.component';
import { SitesActions } from './store/sites.actions';
import { selectSites, selectSitesIsLoading } from './store/sites.selectors';
import { User } from '../users/models/user';
import { selectAuthUser } from '../../../../core/store/auth/selectors';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrl: './sites.component.scss'
})
export class SitesComponent {
  
  sites$: Observable<Site[]>; 
  isLoading$: Observable<boolean>;
  displayedColumns: string[] = ['id', 'nombre', 'calle', 'altura', 'codigoPostal', 'aulas', 'actions']; 
  authUser$: Observable<User | null>;
  
  constructor (private store: Store,
               private matDialog: MatDialog) {

      this.sites$ = this.store.select(selectSites);
      this.isLoading$ = this.store.select(selectSitesIsLoading)
      this.store.dispatch(SitesActions.loadSites());
      this.authUser$ = this.store.select(selectAuthUser); 
  }

  createSite(): void {
    this.matDialog.open(SitesDialogComponent)
  }


  onDeleteSite(site: Site): void {
    this.store.dispatch(SitesActions.deleteSite({ siteId: site.id }));
  }


  
}