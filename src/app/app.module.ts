
import { AppComponent } from './app.component';
import { ChatsComponent } from './pages/chats';
import { MessagesComponent } from './pages/messages';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing-module';

@NgModule({
  declarations: [
    AppComponent,
    ChatsComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    MomentModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
