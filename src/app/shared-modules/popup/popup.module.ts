import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './popup.component';
import { MaterialModule } from 'app/material/material.module';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from './message/message.component';
import { PromptComponent } from './prompt/prompt.component';
import { SharedModule } from '@shared/shared.module';
import { PhotosComponent } from './photos/photos.component';
import { FileSizePipe } from './photos/photo-list/file-size.pipe';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { SelectPhotoComponent } from './photos/select-photo/select-photo.component';
import { UploadModule } from '../upload/upload.module';
import { ComponentsComponent } from './components/components.component';
import { VideoInfoComponent } from './video-info/video-info.component';
import { ColumnsComponent } from './columns/columns.component';
import { FramePopupComponent } from './frame-popup/frame-popup.component';
import { OverlayComponent } from './overlay/overlay.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    UploadModule,
    OverlayModule,
    A11yModule
  ],
  declarations: [
    PopupComponent,
    MessageComponent, 
    PromptComponent, 
    PhotosComponent, 
    FileSizePipe, 
    PhotoListComponent, 
    SelectPhotoComponent, ComponentsComponent, VideoInfoComponent, ColumnsComponent, FramePopupComponent, OverlayComponent],
  exports: [
    PopupComponent,
    OverlayComponent,
    OverlayModule,
    A11yModule
  ]
})
export class PopupModule { }
