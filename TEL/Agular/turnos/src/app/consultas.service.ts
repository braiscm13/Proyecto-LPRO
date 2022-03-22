import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Turnos} from './interfaces/turnos';

@Injectable({
  providedIn: 'root'
})

export class ConsultasService {



  //Zona animales

  getAnimales(){
    return this.http.get<Turnos>('http://localhost:3000/read/All');
  }

  getAnimal(){


      return this.http.post<Turnos>('http://localhost:3000/read/One',{});


 
  }


  deleteAnimal(){

   
      return this.http.post<Turnos>('http://localhost:3000/delete/one',{});


  
  }


  updateAnimal(){

    return this.http.post<Turnos>('http://localhost:3000/update/All' ,{});


  }
  

  createAnimal(){
    return this.http.post<Turnos>('http://localhost:3000/create',{});
  }



  constructor(private http: HttpClient) { }
}
