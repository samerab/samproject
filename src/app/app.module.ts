import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SharedModule } from './shared-modules/shared/shared.module';

import { AppComponent } from './app.component';
import { PostsModule } from './features-modules/posts/posts.module';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundModule } from './features-modules/page-not-found/page-not-found.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    PostsModule,
    AppRoutingModule,
    PageNotFoundModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
