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

  goBack(): void {
    this.location.back();
  }



  createTurn(){


    console.log("Hola que tal");
    //console.log(cola1);



  }


  ngOnInit(): void {
  }

}
