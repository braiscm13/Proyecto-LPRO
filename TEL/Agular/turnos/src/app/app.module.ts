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
    HttpClientModule
  ],
  providers: [ConsultasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
