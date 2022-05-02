import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno } from './interfaces/turnos';

@Injectable({
  providedIn: 'root'
})

export class ConsultasService {



  newTurn(colas: String) {
    return this.http.post('http://192.168.1.37:3000/newTurn', { cola: colas });
  }


  constructor(private http: HttpClient) { }
}
