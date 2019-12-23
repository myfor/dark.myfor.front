import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTOR_PROVIDERS } from './interceptors/barrel';

import { ShareModule } from './share/share.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { NewPostComponent } from './new-post/new-post.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    NewPostComponent,
    ShareModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    HTTP_INTERCEPTOR_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
