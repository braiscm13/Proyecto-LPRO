import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QrComponent implements OnInit {

  etiqueta: string = '';

  colas: any;

  turno1: any;
  turno2: any;
  turno3: any;

  constructor(private _route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {


    this.colas = this._route.snapshot.paramMap.get('colas');

    if (this.colas == '1') {

      this.turno1 = this._route.snapshot.paramMap.get('turno1');
      this.etiqueta = "Número : " + this.turno1 + " en Carnicería"

    }

    if (this.colas == '2') {

      this.turno2 = this._route.snapshot.paramMap.get('turno2');
      this.etiqueta = "Número : " + this.turno2 + " en Pescadería"

    }


    if (this.colas == '3') {

      this.turno3 = this._route.snapshot.paramMap.get('turno3');
      this.etiqueta = "Número : " + this.turno3 + " en Charcutería"

    }

    if (this.colas == '12') {

      this.turno1 = this._route.snapshot.paramMap.get('turno1');
      this.turno2 = this._route.snapshot.paramMap.get('turno2');

      this.etiqueta = "Número : " + this.turno1 + " en Carnicería\nNúmero : " + this.turno2 + " en Pescadería"

    }

    if (this.colas == '13') {

      this.turno1 = this._route.snapshot.paramMap.get('turno1');
      this.turno3 = this._route.snapshot.paramMap.get('turno3');

      this.etiqueta = "Número : " + this.turno1 + " en Carnicería\nNúmero : " + this.turno3 + " en Charcutería"

    }

    if (this.colas == '23') {

      this.turno3 = this._route.snapshot.paramMap.get('turno3');
      this.turno2 = this._route.snapshot.paramMap.get('turno2');

      this.etiqueta = "Número : " + this.turno2 + " en Pescadería\nNúmero : " + this.turno3 + " en Charcutería"

    }

    if (this.colas == '123') {

      this.turno1 = this._route.snapshot.paramMap.get('turno1');
      this.turno2 = this._route.snapshot.paramMap.get('turno2');
      this.turno3 = this._route.snapshot.paramMap.get('turno3');

      this.etiqueta = "Número : " + this.turno1 + " en Carnicería\nNúmero : " + this.turno2 + " en Pescadería\nNúmero : " + this.turno3 + " en Charcutería"

    }



    setTimeout(() => {

      this.goBack();

    }, 10000);






  }


  goBack(): void {
    this.location.back();
  }


}
