import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './components/app/app.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';

import { reducers, metaReducers } from './store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    QuestionFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
