import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PopupComponent } from './shared-modules/popup/popup.component';



import { PostsModule } from './features-modules/posts/posts.module';
import { PagesModule } from './features-modules/pages/pages.module';
import { SharedModule } from './shared-modules/shared/shared.module';
import { PageNotFoundModule } from './features-modules/page-not-found/page-not-found.module';
import { UploadModule } from './shared-modules/upload/upload.module';
import { PopupModule } from './shared-modules/popup/popup.module';
import { HomeComponent } from './home/home.component';
import { LeftSidebarComponent } from './templates/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './templates/right-sidebar/right-sidebar.component';
import { VideoComponent } from './shared-modules/content-creator/video/video.component';
import { BreakComponent } from './shared-modules/content-creator/break/break.component';
import { DivComponent } from './shared-modules/content-creator/div/div.component';
import { ContentComponent } from './shared-modules/content-creator/content/content.component';
import { OverlayComponent } from './shared-modules/popup/overlay/overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    PostsModule,
    PagesModule,
    AppRoutingModule,
    PageNotFoundModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    UploadModule,
    PopupModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    PopupComponent, 
    VideoComponent, 
    BreakComponent,
    DivComponent,
    ContentComponent,
    OverlayComponent
  ]
})
export class AppModule { }
