import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';



import {ConsultasService} from '../consultas.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private consultasService: ConsultasService,
    private location: Location
  ) {}


  turno1: any={};
  turno2: any={};
  turno3: any={};
  cola1=false;
  cola2=false;
  cola3=false;



  createTurn(){


   if(this.cola1){

    console.log("Cola1");
    this.consultasService.createTurn(1).subscribe(turnos =>{
      console.log(turnos);
      this.turno1=turnos;

    }
    )


   }

   if(this.cola2){

    console.log("Cola2");
    this.consultasService.createTurn(2).subscribe(turnos =>{
      console.log(turnos);
      this.turno2=turnos;

    }
    )



   }

   if(this.cola3){

    console.log("Cola3");
    this.consultasService.createTurn(3).subscribe(turnos =>{
      console.log(turnos);
      this.turno3=turnos;

    }
    )




   }



  }


  ngOnInit(): void {
  }

}
