import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { MaterialModule } from 'app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [TableComponent],
  exports: [
    TableComponent,
    MaterialModule
  ]
})
export class TableModule { }
