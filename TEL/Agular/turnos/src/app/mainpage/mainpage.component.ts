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

  turnos: any={};
  cola: Number;

  createTurn(cola){
    this.cola=cola;

    this.consultasService.createTurn(this.cola).subscribe(turno => {
      console.log(turno);
      this.turnos=turno;
  
   });

  }


  ngOnInit(): void {
  }

}
