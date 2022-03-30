import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QrComponent implements OnInit {


  turno: any={};

  turno1: any;
  turno2: any;
  turno3: any;

  colas:  String ='';
  cola1=false;
  cola2=false;
  cola3=false;


  constructor() { }

  ngOnInit(): void {
  }

}
