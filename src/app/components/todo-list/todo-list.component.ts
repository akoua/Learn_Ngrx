import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Todo } from '../../todo.model';
import { TodoService } from '../../todo.service';
import { Store, select } from "@ngrx/store";
import { State } from '../../store';
import * as todoClass from '../../store/todo.action';
import { TodoState } from '../../store/todo.reducer';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public todos$: Observable<Todo[]> = this.store.pipe(
    //au fond on fait appel aux clés presentes dans le niveau le plus haut de notre reducer
    select('todos_state'),
    map((todoState: TodoState) => todoState.datas)
  );
  public message: string;

  //LA SEULE SOURCE DE VERITE EST LE STORE

  constructor(private todoService: TodoService, private store: Store<State>) {}

  ngOnInit(): void{
    //depuis Effect est reconnu pour soit etre Success ou Error
    this.store.dispatch(new todoClass.FetchToDo());
  }

  public addTodo() {
    //this.todoService.addTodo({ message: this.message, done: false });
    this.store.dispatch( new todoClass.CreateTodo ( {message: this.message, done: false} )); 
  }

  public toggleTodo(index: number) {
    // this.todoService.toggleTodo(index);
    this.store.dispatch(new todoClass.ToggleTodo(index) )
  }

  public deleteTodo(index: number) {
    // this.todoService.deleteTodo(index);
    this.store.dispatch(new todoClass.DeleteTodo(index) );
  }

}
