import { Action } from "@ngrx/store";
import { Todo } from "../todo.model";
import { TodoActionType, ACTION_TODO_TYPE } from "./todo.action";

//C'est l'interface TodoReducer
export interface TodoState {
    data: {
        //cette annotation permet de dire que datas est un objet de type Todo et a pour
        //id todoId qui lui est de type string.
        [todoId: string]: Todo
    },
    loading: boolean;
    loaded: boolean;
    error: any;
}

const initialState: TodoState = {
    data: null,
    loading: null,
    loaded: false,
    error: null
}

//Nous créeons notre Reducer
export function todosReducer(state: TodoState = initialState, action: TodoActionType): TodoState {

    console.log(state);

    switch (action.type) {
        case ACTION_TODO_TYPE.Fetch:
            return {
                //on retourne tjrs notre état initial
                ...state,
                loading: true
            };
        case ACTION_TODO_TYPE.Fetch_Success:
            return {
                ...state,
                //action.payload est un tableau de Todo comme definit dans le FectTodoClasse
                //de ce fait appliquer reduce nous permet de retourner à chaque itération du tableau
                //l'ensemble des objets Todo ayant pour key la key du Todo courant (cur)
                //et étant lui même le Todo courant         
                data: action.payload.reduce((acc, cur) => {
                    acc[cur.id] = cur;
                        // console.log(`\t>>Todo Reducer: ${acc[cur.id]} `);
                    return acc;
                }, { ...state.data }),
                loading: false,
                loaded: true,
                error: null
            };
        case ACTION_TODO_TYPE.Fetch_Error:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            };
        case ACTION_TODO_TYPE.Create:
            return {
                ...state,
                //comme cela si nous connaissons deja l'id mais comme dans la CreateTodo on ne
                //signifie pas de id alors nous allons passer par une autre chose
                    // data: { ...state.data, [action.payload.id]: action.payload }
                data: { ...state.data, [Object.keys(state.data).length] : action.payload }
            };
        case ACTION_TODO_TYPE.Delete:
            //Nous allons copier le tableau puis supprimer l'élément concerné après cela
            //ramener le tableau dans lequel on a fait la suppression
            const remove = {...state.data}; //on obtient un remove = { {}, {}, ... }

            //ici nous nous servons du keyword delete pour delete la key action.payload correspondante
            delete remove[action.payload];
            return {
                ...state,
                data: remove
            };
        case ACTION_TODO_TYPE.Toggle:
            {
                //on créé une copie de note state.data afin de supprimer le state.data
                //concerné
                const selectedTodo = { ...state.data };
                //nous allons modifier le done
                selectedTodo[action.payload].done = !selectedTodo[action.payload].done;               

                //on retourne un objet avec toutes lespropriétés du state et remplaçons la
                //propriété data seulement
                return {
                    ...state,
                    data: selectedTodo
                }
            }
        default:
            return { ...state}           
    }
    return state;
}


