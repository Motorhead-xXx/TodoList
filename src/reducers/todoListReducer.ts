import {todolistsAPI, TodolistType} from "../api/todolist-api";
import {AppThunkType, InferActionTypes} from "../store/store";

const initialState: Array<TodolistDomainType> = [

];

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
};

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolist.id,
                title: action.todolist.title,
                addedDate: action.todolist.addedDate,
                order: action.todolist.order,
                filter: 'all',
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        case 'SET-TODOS': {
            return action.todos.map(m => ({...m, filter: 'all'}))
        }
        default:
            return state;
    }
};

export type TodolistsActionsType = InferActionTypes<typeof actionTodo>;

export const actionTodo = {
    removeTodolistAC: (todolistId: string) =>
        ({type: 'REMOVE-TODOLIST', id: todolistId} as const),

    addTodolistAC: (todolist: TodolistType) =>
        ({type: 'ADD-TODOLIST', todolist} as const),

    changeTodolistTitleAC: (id: string, title: string) =>
        ({type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const),

    changeTodolistFilterAC: (id: string, filter: FilterValuesType) =>
        ({type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const),

    setTodos: (todos: TodolistType[]) => ({type: 'SET-TODOS', todos} as const),
};

export const getTodolistThunkTC = (): AppThunkType => async dispatch => {
    const res = await todolistsAPI.getTodolists();
    dispatch(actionTodo.setTodos(res.data));
};
export const removeTodolistTC = (id: string): AppThunkType => async dispatch => {
    const res = await todolistsAPI.deleteTodolist(id);
    dispatch(actionTodo.removeTodolistAC(id));
};
export const createTodolistTC = (title: string): AppThunkType => async dispatch => {
    const res = await todolistsAPI.createTodolist(title);
    dispatch(actionTodo.addTodolistAC(res.data.data.item))
};
export const updateTitleTodolistTC = (id: string, title: string): AppThunkType => async dispatch => {
    const res = await todolistsAPI.updateTodolistTitle(id, title)
    dispatch(actionTodo.changeTodolistTitleAC(id, title))
};
