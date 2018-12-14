import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Todo } from '../../todo.model';
import { TodoService } from '../../todo.service';
import { Store, select } from "@ngrx/store";
import { State } from '../../store';
import * as todoClass from '../../store/todo.action';
import { TodoState } from '../../store/todo.reducer';
import { todoListSelector, selectedTodoSelector, todoListArraySelector } from '../../store/selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public todos$: Observable<Todo[]> = this.store.pipe(select(todoListArraySelector));
  public message: string;

  selectedTodo$: Observable<Todo> = this.store.pipe(select(selectedTodoSelector));
  //LA SEULE SOURCE DE VERITE EST LE STORE

  constructor( private store: Store<State>) {}

  ngOnInit(): void{
    //depuis Effect est reconnu pour soit etre Success ou Error
    this.store.dispatch(new todoClass.FetchToDo());
  }

  public addTodo() {
    //si nous devons enregistrer dans une BD il va falloir passer par un Effect enregistrer
    //d'abord et par la suite ramener cela pour le passer comme argument      
    this.store.dispatch( new todoClass.CreateTodo ( { message: this.message, done: false} )); 
  }

  public toggleTodo(id: string) {
    // this.todoService.toggleTodo(index);
    this.store.dispatch(new todoClass.ToggleTodo(id) )
  }

  public deleteTodo(id: string) {
    // this.todoService.deleteTodo(index);
    this.store.dispatch(new todoClass.DeleteTodo(id) );
  }

}
