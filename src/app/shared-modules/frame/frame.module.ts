import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrameComponent } from './frame/frame.component';
import { MaterialModule } from 'app/material/material.module';
import { SharedModule } from '@shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    DragDropModule
  ],
  declarations: [FrameComponent],
  exports: [
    FrameComponent
  ]
})
export class FrameModule { }
