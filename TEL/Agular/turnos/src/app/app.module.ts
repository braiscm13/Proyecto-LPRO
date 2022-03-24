import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { QRCodeModule } from 'angular2-qrcode';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { QrComponent } from './qr/qr.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { ConsultasService } from './consultas.service';
import {MatCardModule} from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    QrComponent,
    MainpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QRCodeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatCheckboxModule,
    BrowserAnimationsModule
  ],
  providers: [ConsultasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
