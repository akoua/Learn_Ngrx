import { Action } from "@ngrx/store";
import { Todo } from "../todo.model";

export enum ACTION_TODO_TYPE  {
    Create= '[Todo] Create',
    Toggle= '[Todo] Toggle',
    Delete= '[Todo] Delete',
    Fetch = '[Todo] Fetch',
    Fetch_Success= '[Todo] Fecth Success',
    Fetch_Error = '[Todo] Fetch Error'
};

export class CreateTodo implements Action{

    readonly type= ACTION_TODO_TYPE.Create;
    constructor(public payload: Todo){};
}

export class ToggleTodo implements Action{

    readonly type= ACTION_TODO_TYPE.Toggle;
    //c'est l'index qui nous interesse afin de recuperer la Todo qui correspond
    constructor(public payload: string ){};
}

export class DeleteTodo implements Action{

    readonly type= ACTION_TODO_TYPE.Delete;
    //c'est l'index qui nous interesse
    constructor(public payload: string){};
}

export class FetchToDo implements Action {
    readonly type = ACTION_TODO_TYPE.Fetch;
    //pas besoin de constructor pour faire appel à un payload car on en a pas du tout besoin
}

export class FetchToDoSuccess implements Action {
    readonly type = ACTION_TODO_TYPE.Fetch_Success;
    constructor(public payload: Todo[]){}
}

export class FetchToDoError implements Action {
    readonly type = ACTION_TODO_TYPE.Fetch_Error;
    constructor(public payload: any){}
}

export type TodoActionType = CreateTodo | ToggleTodo | DeleteTodo |
                            FetchToDo | FetchToDoSuccess | FetchToDoError ;