import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './store/todo.effect';
import { StoreModule } from '@ngrx/store';
import { todosReducer } from './store/todo.reducer';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    StoreModule.forFeature('todo_state', todosReducer),
    EffectsModule.forFeature([TodoEffects]),
    RouterModule.forChild([
      {
        path:'', component: TodoComponent, children: [
          {
            path: ':id', component: TodoListComponent
          },
          {
            path: '', component: TodoListComponent
          },
        ]        
      }
    ])
  ],
  declarations: [
    TodoComponent,
    TodoListComponent
  ]
})
export class TodoModule { }
