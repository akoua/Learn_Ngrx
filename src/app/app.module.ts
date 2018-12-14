import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";

// import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule, RouterStateSerializer } from "@ngrx/router-store";
import { reducers } from "./store";

import { AppComponent } from './app.component';
import { MyRouteStateSerializer } from './store/router.helper';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,    
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'To Do'
    }),
    RouterModule.forRoot([{
      path: '', redirectTo: 'todo', pathMatch: 'full'
    }, {
      path: 'todo', loadChildren: '../app/todo/todo.module#TodoModule',
    }
    ]),
    StoreRouterConnectingModule, //forRoot({ stateKey: 'routing name'})
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: MyRouteStateSerializer
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
