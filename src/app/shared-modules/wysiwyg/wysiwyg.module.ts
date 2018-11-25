import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WysiwygComponent } from './wysiwyg.component';
import { MaterialModule } from 'app/material/material.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { PopupModule } from '../popup/popup.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ColorPickerModule,
    PopupModule
  ],
  declarations: [WysiwygComponent],
  exports: [
    WysiwygComponent,
  ]
})
export class WysiwygModule { }
