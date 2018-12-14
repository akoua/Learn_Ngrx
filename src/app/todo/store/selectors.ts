import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todo.reducer';
import { MyRouterState } from '../../store/router.helper';
import * as routerReducer from '@ngrx/router-store';
import { Todo } from '../../todo.model';

//Du fait qu'on a un seul Store par App, les selectors vont nous permettre de selectionner
//les grosses parties, cad les states souhaités

//Cela correspond au plus haut niveau dans notre state
export const todoSelector = createFeatureSelector<TodoState>('todo_state');
export const routeSelector = createFeatureSelector<routerReducer.RouterReducerState<MyRouterState>>('router_state');

export const todoListSelector = createSelector(
    todoSelector,
    (todoState: TodoState ) => {
        console.log(`\t>>> Selector: ${todoState} `);
        return todoState.data;
    }
);

export const routeStateSelector = createSelector(
    routeSelector,
    (routeState) =>{
        return routeState.state;
    }
);

export const todoListArraySelector = createSelector(
    todoSelector,
    (todoState: TodoState) => {
        if (todoState.data) {        
            //on recupere un tableau qui represente les clés puis on crée avec ces clés
            //un nouveau tableau avec les Todo et ayant pour clé les idTodo
           return Object.keys(todoState.data).map((idTodo) => todoState.data[idTodo] );
        } else {
            //comme la première fois
            return null;
        }
    }
);

export const selectedTodoSelector = createSelector(
    routeStateSelector, todoListSelector,
    (routes: MyRouterState, todos: { [todoId:string] : Todo } ) => {
        const todoId = routes.params.id;
        if (todoId && todos) {
            return todos[todoId]; 
        } else{
            return null;
        }
    }
);