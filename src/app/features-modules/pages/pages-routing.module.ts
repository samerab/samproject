import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPageComponent } from './add-page/add-page.component';

const routes: Routes = [
  { path: 'pages',
    children: [ 
      {     
        path:'',
        component: AddPageComponent
      },
      {     
          path:'add',
          component: AddPageComponent
      },
      {
          path:'edit',
          component: AddPageComponent
      },
      {
          path:':id',
          component: AddPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
