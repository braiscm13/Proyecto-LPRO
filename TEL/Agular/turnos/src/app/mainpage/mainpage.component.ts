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

  cola: number=0;
  cola1=false;
  cola2=false;
  cola3=false;



  createTurn(){


   if(this.cola1){

    console.log("Cola1");

    this.cola=1;

    this.consultasService.createTurn(this.cola).subscribe(turnos =>{
      console.log(turnos);
      this.turno1=turnos;
      
      this.consultasService.newTurn(this.turno1.turno, this.turno1.cola).subscribe(turnos =>{
        console.log(turnos);
        this.turno1=turnos;

    }
    );

    }
    );


    //console.log(this.turno1);
    






   }


   if(this.cola2){

    console.log("Cola2");
    this.consultasService.createTurn(2).subscribe(turnos =>{
      console.log(turnos);
      this.turno2=turnos;

      this.consultasService.newTurn(this.turno2.turno, this.turno2.cola).subscribe(turnos =>{
        console.log(turnos);
        this.turno2=turnos;

    }
    );

    }
    );



   }

   if(this.cola3){

    console.log("Cola3");
    this.consultasService.createTurn(3).subscribe(turnos =>{
      console.log(turnos);
      this.turno3=turnos;

      this.consultasService.newTurn(this.turno3.turno, this.turno3.cola).subscribe(turnos =>{
        console.log(turnos);
        this.turno3=turnos;

    }
    );

    }
    );




   }



  }


  ngOnInit(): void {
  }

}
