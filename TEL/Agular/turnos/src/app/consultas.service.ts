import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Turno} from './interfaces/turnos';

@Injectable({
  providedIn: 'root'
})

export class ConsultasService {



  createTurn(cola1: any ){
    return this.http.post<Turno>('http://localhost:3000/createTurn',{cola: cola1});
  }

  /*getAnimal(){


      return this.http.post<Turnos>('http://localhost:3000/createTurn',{});


 
  }


  deleteAnimal(){

   
      return this.http.post<Turnos>('http://localhost:3000/delete/one',{});


  
  }


  updateAnimal(){

    return this.http.post<Turnos>('http://localhost:3000/update/All' ,{});


  }
  

  createAnimal(){
    return this.http.post<Turnos>('http://localhost:3000/create',{});
  }*/



  constructor(private http: HttpClient) { }
}
