import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/contacts', pathMatch: 'full' },
      { path: '**', redirectTo: '/contacts' }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
