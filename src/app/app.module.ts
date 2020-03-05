import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AngularFireModule} from 'angularfire2';
import {AngularFireStorageModule} from 'angularfire2/storage'

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDGk0Ji7Yt28nrFEcdjGmhsx7LmXC3Oj6I",
      authDomain: "asia-south1",
      storageBucket: "gs://examhelp-c87f6.appspot.com/",
      projectId: "examhelp-c87f6",
    }),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
