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

  turno: any={};
  cola: number;

  createTurn(){

    this.consultasService.createTurn(1).subscribe

    this.consultasService.createTurn(this.cola).subscribe(turnos => {
      console.log(turnos);
      this.turno=turnos;
  
   });

  }


  ngOnInit(): void {
  }

}
