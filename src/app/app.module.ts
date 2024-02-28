import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './layouts/dashboard/dashboard.module';
import { registerLocaleData } from '@angular/common';

import es from '@angular/common/locales/es';
import esAR from '@angular/common/locales/es-AR';

import { SharedModule } from './shared/shared.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';

registerLocaleData(es);
registerLocaleData(esAR);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //DashboardModule,
    //SharedModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    HttpClientModule
    
  ],
  providers: [
    {
      provide: LOCALE_ID ,
      useValue: 'es-AR'
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
      },
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
