import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todo.reducer';
import { MyRouterState } from './router.helper';
import * as routerReducer from '@ngrx/router-store';
import { Todo } from '../todo.model';

//Du fait qu'on a un seul Store par App, les selectors vont nous permettre de selectionner
//les grosses parties, cad les states souhaités

//Cela correspond au plus haut niveau dans notre state
export const todoSelector = createFeatureSelector<TodoState>('todos_state');
export const routeSelector = createFeatureSelector<routerReducer.RouterReducerState<MyRouterState>>('router_state');

export const todoListSelector = createSelector(
    todoSelector,
    (todoState: TodoState ) => {
        console.log(`\t>>> Selector: ${todoState} `);
        return todoState.datas;
    }
);

export const routeStateSelector = createSelector(
    routeSelector,
    (routeState) =>{
        return routeState.state;
    }
);

export const selectedTodoSelector = createSelector(
    routeStateSelector, todoListSelector,
    (routes: MyRouterState, todos: Todo[]) => {
        const todoId = routes.params.id;
        if (todoId && todos) {
            //nous permet de retourner le premier element si bcp on le même id
            //et de plus cela n'est pas optimal car si le tableau de Todo
            // est très grand le filter mettra assez de temps pour filter            
            return todos.filter( t => t.id === todoId)[0];
        } else{
            return null;
        }
    }
);