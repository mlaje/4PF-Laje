import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { InscriptionsComponent } from './inscriptions.component';
import { EffectsModule } from '@ngrx/effects';
import { InscriptionsEffects } from './store/inscriptions.effects';
import { StoreModule } from '@ngrx/store';
import { inscriptionsFeature } from './store/inscriptions.reducer';
import { SharedModule } from '../../../../shared/shared.module';
import { InscriptionDialogComponent } from './components/inscription-dialog/inscription-dialog.component';


@NgModule({
  declarations: [
    InscriptionsComponent,
    InscriptionDialogComponent
  ],
  imports: [
    CommonModule,
    InscriptionsRoutingModule,
    SharedModule,
    StoreModule.forFeature(inscriptionsFeature),
    EffectsModule.forFeature([InscriptionsEffects])
  ]
})
export class InscriptionsModule { }
