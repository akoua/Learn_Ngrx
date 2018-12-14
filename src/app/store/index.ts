import { ActionReducerMap, Action } from "@ngrx/store";
import * as todoReducerCall from './todo.reducer';
import * as routerReducer from '@ngrx/router-store';
import { MyRouterState } from "./router.helper";


//Afin de rendre notre code plus modulaire nous allons separer un peu les roles
//Ainsi l'appel de ficher depuis notre app.module lira directement ici



//C'est l'interface State qui represente l'état general de l'appli
    //les noms donnés ici sont ceux affichés dans le devtool-store
export interface State{
    todos_state: todoReducerCall.TodoState;
    router_state: routerReducer.RouterReducerState<MyRouterState>;
}

//Nous allons implementer le niveau le plus haut de notre reducer 
//qui sera une map de tous nos reducers

export const reducers: ActionReducerMap<State> = {
    todos_state: todoReducerCall.todosReducer,
    router_state: routerReducer.routerReducer,
}