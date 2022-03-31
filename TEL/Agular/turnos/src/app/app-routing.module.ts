import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {QrComponent} from './qr/qr.component';
import { MainpageComponent } from './mainpage/mainpage.component';

const routes: Routes = [
  { path: 'mainpage', component: MainpageComponent },
  { path: '', redirectTo: '/mainpage', pathMatch: 'full' },
  { path: 'qr/:cola1/:cola2/:cola3', component: QrComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
