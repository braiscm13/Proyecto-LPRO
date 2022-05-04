import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';



import { ConsultasService } from '../consultas.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private consultasService: ConsultasService,
    private location: Location,
    private router: Router,
  ) { }


  turno: any = {};

  turno1: String = '';
  turno2: String = '';
  turno3: String = '';

  colas: String = '';
  cola1 = false;
  cola2 = false;
  cola3 = false;



  createTurn() {


    if (this.cola1 && this.cola2 && this.cola3) {

      console.log("Colas 1, 2 y 3");

      this.colas = "123";

      this.consultasService.newTurnImp(this.colas).subscribe((turnos: any) => {
        console.log(turnos);
        this.turno = turnos.vuelta;
        this.turno1 = this.turno.res[0];
        this.turno2 = this.turno.res[1];
        this.turno3 = this.turno.res[2];
        //console.log(this.turno1+this.turno2+this.turno3);


      }
      );

    }

    if (this.cola1 && !this.cola2 && !this.cola3) {

      console.log("Cola 1");

      this.colas = "1";

      this.consultasService.newTurnImp(this.colas).subscribe((turnos: any) => {
        console.log(turnos);
        this.turno = turnos.vuelta;
        this.turno1 = this.turno.res;


      }
      );

    }


    if (!this.cola1 && this.cola2 && !this.cola3) {

      console.log("Cola 2");

      this.colas = "2";

      this.consultasService.newTurnImp(this.colas).subscribe((turnos: any) => {
        console.log(turnos);
        this.turno = turnos.vuelta;
        this.turno2 = this.turno.res;

      }
      );

    }

    if (!this.cola1 && !this.cola2 && this.cola3) {

      console.log("Cola 3");

      this.colas = "3";

      this.consultasService.newTurnImp(this.colas).subscribe((turnos: any) => {
        console.log(turnos);
        this.turno = turnos.vuelta;
        this.turno3 = this.turno.res;

      }
      );

    }

    if (this.cola1 && this.cola2 && !this.cola3) {

      console.log("Colas 1 y 2");

      this.colas = "12";

      this.consultasService.newTurnImp(this.colas).subscribe((turnos: any) => {
        console.log(turnos);
        this.turno = turnos.vuelta;
        this.turno1 = this.turno.res[0];
        this.turno2 = this.turno.res[1];

      }
      );

    }

    if (this.cola1 && !this.cola2 && this.cola3) {

      console.log("Cola 1 y 3");

      this.colas = "13";

      this.consultasService.newTurnImp(this.colas).subscribe((turnos: any) => {
        console.log(turnos);
        this.turno = turnos.vuelta;
        this.turno1 = this.turno.res[0];
        this.turno3 = this.turno.res[1];

      }
      );

    }

    if (!this.cola1 && this.cola2 && this.cola3) {

      console.log("Colas 2 y 3");

      this.colas = "23";

      this.consultasService.newTurnImp(this.colas).subscribe((turnos: any) => {
        console.log(turnos);
        this.turno = turnos.vuelta;
        this.turno2 = this.turno.res[0];
        this.turno3 = this.turno.res[1];

      }
      );

    }

    setTimeout(() => {

    window.location.reload();


    }, 1500);

    

  }


  createTurnQR() {

    if (this.cola1 && this.cola2 && this.cola3) {

      console.log("Colas 1, 2 y 3");

      this.colas = "123";

      this.consultasService.newTurn(this.colas).subscribe((turnos: any) => {
        console.log(turnos);
        this.turno = turnos.vuelta;
        this.turno1 = this.turno.res[0];
        this.turno2 = this.turno.res[1];
        this.turno3 = this.turno.res[2];
        //console.log(this.turno1+this.turno2+this.turno3);


      }
      );

    }

    if (this.cola1 && !this.cola2 && !this.cola3) {

      console.log("Cola 1");

      this.colas = "1";

      this.consultasService.newTurn(this.colas).subscribe((turnos: any) => {
        console.log(turnos);
        this.turno = turnos.vuelta;
        this.turno1 = this.turno.res;


      }
      );

    }


    if (!this.cola1 && this.cola2 && !this.cola3) {

      console.log("Cola 2");

      this.colas = "2";

      this.consultasService.newTurn(this.colas).subscribe((turnos: any) => {
        console.log(turnos);
        this.turno = turnos.vuelta;
        this.turno2 = this.turno.res;

      }
      );

    }

    if (!this.cola1 && !this.cola2 && this.cola3) {

      console.log("Cola 3");

      this.colas = "3";

      this.consultasService.newTurn(this.colas).subscribe((turnos: any) => {
        console.log(turnos);
        this.turno = turnos.vuelta;
        this.turno3 = this.turno.res;

      }
      );

    }

    if (this.cola1 && this.cola2 && !this.cola3) {

      console.log("Colas 1 y 2");

      this.colas = "12";

      this.consultasService.newTurn(this.colas).subscribe((turnos: any) => {
        console.log(turnos);
        this.turno = turnos.vuelta;
        this.turno1 = this.turno.res[0];
        this.turno2 = this.turno.res[1];

      }
      );

    }

    if (this.cola1 && !this.cola2 && this.cola3) {

      console.log("Cola 1 y 3");

      this.colas = "13";

      this.consultasService.newTurn(this.colas).subscribe((turnos: any) => {
        console.log(turnos);
        this.turno = turnos.vuelta;
        this.turno1 = this.turno.res[0];
        this.turno3 = this.turno.res[1];

      }
      );

    }

    if (!this.cola1 && this.cola2 && this.cola3) {

      console.log("Colas 2 y 3");

      this.colas = "23";

      this.consultasService.newTurn(this.colas).subscribe((turnos: any) => {
        console.log(turnos);
        this.turno = turnos.vuelta;
        this.turno2 = this.turno.res[0];
        this.turno3 = this.turno.res[1];

      }
      );

    }


    setTimeout(() => {

      console.log("Turno 1 " + this.turno1);
      console.log("Turno 2 " + this.turno2);
      console.log("Turno 3 " + this.turno3);
      console.log("Colas " + this.colas);


      this.router.navigate(['/qr', this.turno1, this.turno2, this.turno3, this.colas]);


    }, 1500); //Con esto podemos hacer que espere lo suficiente como para que acabe la consulta




  }


  ngOnInit(): void {
  }

}
