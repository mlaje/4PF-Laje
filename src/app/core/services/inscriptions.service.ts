import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Inscription } from '../../layouts/dashboard/pages/inscriptions/models/inscription';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {

  constructor(private http: HttpClient) {}

    getInscriptions() {
      return this.http.get(
        `${environment.apiURL}/inscriptions?_embed=student&_embed=course`
      );
    }

  
} 
