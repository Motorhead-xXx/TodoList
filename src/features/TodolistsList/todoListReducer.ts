import {todolistsAPI, TodolistType} from "../../api/todolist-api";
import {AppThunkType, InferActionTypes} from "../../app/store";
import {actionApp, RequestStatusType} from "../../app/app-reduser";

const initialState: Array<TodolistDomainType> = [

];

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType,
};

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case 'ADD-TODOLIST': {
            return [{
                ...action.todolist,
                filter: 'all',
                entityStatus: 'idle'
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        }
        case 'SET-TODOS': {
            return action.todos.map(m => ({...m, filter: 'all', entityStatus:'idle'}))
        }
        case "CHANGE-TODOLIST-STATUS":{
            return state.map(tl => tl.id === action.todolistId ? {...tl, entityStatus: action.status} : tl)
        }
        default:
            return state;
    }
};

export type TodolistsActionsType = InferActionTypes<typeof actionTodo>;

export const actionTodo = {
    removeTodolistAC: (todolistId: string) =>
        ({type: 'REMOVE-TODOLIST', todolistId} as const),

    addTodolistAC: (todolist: TodolistType) =>
        ({type: 'ADD-TODOLIST', todolist} as const),

    changeTodolistTitleAC: (todolistId: string, title: string) =>
        ({type: 'CHANGE-TODOLIST-TITLE', todolistId, title} as const),

    changeTodolistEntityStatusAC: (todolistId: string, status: RequestStatusType) =>
        ({type: 'CHANGE-TODOLIST-STATUS', todolistId, status} as const),

    changeTodolistFilterAC: (todolistId: string, filter: FilterValuesType) =>
        ({type: 'CHANGE-TODOLIST-FILTER', todolistId, filter} as const),

    setTodos: (todos: TodolistType[]) => ({type: 'SET-TODOS', todos} as const),
};

export const getTodolistThunkTC = (): AppThunkType => async dispatch => {
    dispatch(actionApp.setAppStatus("loading"));
    const res = await todolistsAPI.getTodolists();
    dispatch(actionTodo.setTodos(res.data));
    dispatch(actionApp.setAppStatus("succeeded"));
};
export const removeTodolistTC = (id: string): AppThunkType => async dispatch => {
    dispatch(actionApp.setAppStatus("loading"));
    dispatch(actionTodo.changeTodolistEntityStatusAC(id,"loading"))
    await todolistsAPI.deleteTodolist(id);
    dispatch(actionTodo.removeTodolistAC(id));
    dispatch(actionApp.setAppStatus("succeeded"));
};
export const createTodolistTC = (title: string): AppThunkType => async dispatch => {
    dispatch(actionApp.setAppStatus("loading"));
    const res = await todolistsAPI.createTodolist(title);
    dispatch(actionTodo.addTodolistAC(res.data.data.item))
    dispatch(actionApp.setAppStatus("succeeded"));

};
export const updateTitleTodolistTC = (id: string, title: string): AppThunkType => async dispatch => {
    dispatch(actionApp.setAppStatus("loading"));
    dispatch(actionTodo.changeTodolistEntityStatusAC(id,"loading"))
    await todolistsAPI.updateTodolistTitle(id, title)
    dispatch(actionTodo.changeTodolistTitleAC(id, title))
    dispatch(actionApp.setAppStatus("succeeded"));
    dispatch(actionTodo.changeTodolistEntityStatusAC(id,"succeeded"))
};
