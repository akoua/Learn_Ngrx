import { Action } from "@ngrx/store";
import { Todo } from "../todo.model";
import { TodoActionType, ACTION_TODO_TYPE } from "./todo.action";

//C'est l'interface TodoReducer
export interface TodoState {
    datas: Todo[];
    loading: boolean;
    loaded: boolean;
    error: any;
}

const initialState: TodoState = {
    datas: [
        {
            message: 'initial state',
            done: false
        }
    ],
    loading: null,
    loaded: false,
    error: null
}

//Nous créeons notre Reducer
export function todosReducer(state: TodoState = initialState, action: TodoActionType): TodoState {

    console.log(state);

    switch (action.type) {
        case ACTION_TODO_TYPE.Fetch : 
            return {
                //on retourne tjrs notre état initial
                ...state,
                loading: true
            };
        case ACTION_TODO_TYPE.Fetch_Success : 
            return {
                ...state,
                datas: action.payload ,
                loading: false,
                loaded: true,
                error: null
            };
        case ACTION_TODO_TYPE.Fetch_Error : 
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            };
        case ACTION_TODO_TYPE.Create:
            return {
                ...state,
                datas: [...state.datas, action.payload]
            };
        case ACTION_TODO_TYPE.Delete: 
            return {
                ...state,
                datas: state.datas.filter((todo, index) => index != action.payload)
            };
        case ACTION_TODO_TYPE.Toggle:
            {
                //on recherche le Todo concerné
                const selectedTodo = state.datas[action.payload];
                //nous allons modifier le done
                selectedTodo.done = !selectedTodo.done;
                //copier l'integralité des Todo de notre Array de Todo
                const newTodo = [...state.datas];
                //nous allons modifier maintenant le Todo dont le done a été modifié
                newTodo[action.payload] = selectedTodo;

                return{
                    ...state,
                    datas: newTodo
                }
            }
        default:
            state;
    }
    return state;
}


