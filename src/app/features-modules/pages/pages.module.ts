import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';

import { UploadModule } from 'app/shared-modules/upload/upload.module';
import { SharedModule } from '@shared/shared.module';
import { WysiwygModule } from 'app/shared-modules/wysiwyg/wysiwyg.module';
import { TableModule } from 'app/shared-modules/table/table.module';
import { PopupModule } from 'app/shared-modules/popup/popup.module';

import { PagesRoutingModule } from './pages-routing.module';

import { AddPageComponent } from './add-page/add-page.component';
import { ContentCreatorModule } from 'app/shared-modules/content-creator/content-creator.module';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    UploadModule,
    SharedModule,
    WysiwygModule,
    TableModule,
    MaterialModule,
    PopupModule,
    ContentCreatorModule
  ],
  declarations: [AddPageComponent],
  exports: [AddPageComponent]
})
export class PagesModule { }
