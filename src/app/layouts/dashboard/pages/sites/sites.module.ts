import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitesRoutingModule } from './sites-routing.module';
import { SitesComponent } from './sites.component';
import { EffectsModule } from '@ngrx/effects';
import { SitesEffects } from './store/sites.effects';
import { StoreModule } from '@ngrx/store';
import { sitesFeature } from './store/sites.reducer';
import { SharedModule } from '../../../../shared/shared.module';
import { SitesDialogComponent } from './components/sites-dialog/sites-dialog.component';

@NgModule({
  declarations: [
    SitesComponent,
    SitesDialogComponent
  ],
  imports: [
    CommonModule,
    SitesRoutingModule,
    SharedModule,
    StoreModule.forFeature(sitesFeature),
    EffectsModule.forFeature([SitesEffects])
  ]
})
export class SitesModule { }
