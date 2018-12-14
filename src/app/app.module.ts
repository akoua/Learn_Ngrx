import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";

import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { reducers } from "./store";

import { AppComponent } from './app.component';
import { TodoEffects } from './store/todo.effect';
import { TodoListComponent } from './components/todo-list/todo-list.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TodoEffects]),
    StoreDevtoolsModule.instrument({
      name: 'To Do'
    }),
    RouterModule.forRoot([{
      path: '', redirectTo: 'todo', pathMatch: 'full'
    }, {
      path: 'todo', component: TodoListComponent
    }
    ]),
    StoreRouterConnectingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
