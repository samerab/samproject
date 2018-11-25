import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { MaterialModule } from 'app/material/material.module';
import { VideoComponent } from './video/video.component';
import { MainContainerDirective } from './directives/main-container.directive';
import { BreakComponent } from './break/break.component';
import { FrameModule } from '../frame/frame.module';
import { FrameContentDirective } from './frame-content.directive';
import { SharedModule } from '@shared/shared.module';
import { DivComponent } from './div/div.component';
import { BaseContentComponent } from './base-content/base-content.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ContentComponent } from './content/content.component';
import { PopupModule } from '../popup/popup.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FrameModule,
    SharedModule,
    DragDropModule,
    PopupModule
  ],
  declarations: [ContainerComponent, VideoComponent, MainContainerDirective, BreakComponent, FrameContentDirective, DivComponent, BaseContentComponent, ContentComponent],
  exports: [
    ContainerComponent,
    ContentComponent
  ]

})
export class ContentCreatorModule { }
