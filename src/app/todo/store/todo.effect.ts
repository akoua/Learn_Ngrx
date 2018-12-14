import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { Action } from "@ngrx/store";
import { ACTION_TODO_TYPE, FetchToDo, FetchToDoSuccess, FetchToDoError } from "./todo.action";
import { switchMap, map, catchError } from "rxjs/operators";
import { TodoService } from "../../todo.service";
import { Todo } from "../../todo.model";

//c'est cette classe que nous allons appeler depuis le forRoot du module
@Injectable()
export class TodoEffects {
    @Effect()
    public _fetchTodo: Observable<Action> = this._actions.pipe(
        ofType(ACTION_TODO_TYPE.Fetch),
        switchMap((fetchTodo: FetchToDo) => {
            return this.todoService.getTodo();
        }),
        map( (todos: Todo[]) => {
            return new FetchToDoSuccess(todos);
        }),
        catchError( (err: any) => {
            return of(new FetchToDoError(err))
        })
    );

    // _actions contient toutes les actions
    constructor(private _actions: Actions, private todoService: TodoService){};
}