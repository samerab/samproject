import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '../../node_modules/@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '',   component: AppComponent },
  // { path: '',   redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
