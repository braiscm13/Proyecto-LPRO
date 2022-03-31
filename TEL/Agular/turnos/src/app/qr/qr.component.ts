import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QrComponent implements OnInit {

  cola1=false;
  cola2=false;
  cola3=false;

  turno1: any;
  turno2: any;
  turno3: any;

  constructor(private _route: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit(): void {

    this.turno1= this._route.snapshot.paramMap.get('cola1');
    this.turno2= this._route.snapshot.paramMap.get('cola2');
    this.turno1= this._route.snapshot.paramMap.get('cola3');

    console.log("Prueba "+this.turno1);



  }


  goBack(): void {
    this.location.back();
  }


}
