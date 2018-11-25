import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { PostsRoutingModule } from './posts-routing.module';

import { AddPostComponent } from './add-post/add-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post/post.component'
import { EditPostListComponent } from './edit-post-list/edit-post-list.component';
import { EditPostComponent } from './edit-post/edit-post.component';

import { UploadModule } from 'app/shared-modules/upload/upload.module';
import { SharedModule } from '@shared/shared.module';
import { WysiwygModule } from 'app/shared-modules/wysiwyg/wysiwyg.module';
import { TableModule } from 'app/shared-modules/table/table.module';
import { MaterialModule } from './../../material/material.module';
import { ContentCreatorModule } from 'app/shared-modules/content-creator/content-creator.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PostsRoutingModule,
    MaterialModule,
    UploadModule,
    SharedModule,
    WysiwygModule,
    TableModule,
    ContentCreatorModule,
    DragDropModule
  ],
  declarations: [AddPostComponent, PostListComponent, PostComponent, EditPostListComponent, EditPostComponent],
  exports: [
    AddPostComponent,
    PostListComponent,
    PostComponent,
    EditPostListComponent,
    EditPostComponent
  ]
})
export class PostsModule { }
