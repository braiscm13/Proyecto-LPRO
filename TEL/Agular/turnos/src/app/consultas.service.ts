import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno } from './interfaces/turnos';

@Injectable({
  providedIn: 'root'
})

export class ConsultasService {



  newTurn(colas: String) {
    return this.http.post('http://localhost:3000/newTurn', { cola: colas });
  }
  newTurnImp(colas: String) {
    return this.http.post('http://localhost:3000/newTurn/imp', { cola: colas });
  }

  constructor(private http: HttpClient) { }
}
