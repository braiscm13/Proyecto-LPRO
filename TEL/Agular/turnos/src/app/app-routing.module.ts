import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QrComponent } from './qr/qr.component';
import { MainpageComponent } from './mainpage/mainpage.component';

const routes: Routes = [
  { path: 'mainpage', component: MainpageComponent },
  { path: '', redirectTo: '/mainpage', pathMatch: 'full' },
  { path: 'qr/:turno1/:turno2/:turno3/:colas', component: QrComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
