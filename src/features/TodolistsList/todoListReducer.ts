import {todolistsAPI, TodolistType} from "../../api/todolist-api";
import {RequestStatusType, setAppStatus} from "../../app/app-reduser";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = [];

export const slice = createSlice({
    name: "todolists",
    initialState: initialState,
    reducers: {
        removeTodolist: (state, action:PayloadAction <{todolistId: string}>) => {
           return state.filter(tl => tl.id !== action.payload.todolistId);
        },
        addTodolist: (state, action:PayloadAction <{todolist: TodolistType}>) => {
            state.push({...action.payload.todolist, filter: 'all', entityStatus: 'idle'});
        },

        changeTodolistTitle: (state, action:PayloadAction <{todolistId: string, title: string}>) => {
           return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
        },

        changeTodolistEntityStatus: (state, action:PayloadAction <{todolistId: string, status: RequestStatusType}>) => {
           return state.map(tl => tl.id === action.payload.todolistId ? {...tl, entityStatus: action.payload.status} : tl)
        },

        changeTodolistFilter: (state, action:PayloadAction <{todolistId: string, filter: FilterValuesType}>) => {
           return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
        },

        setTodos: (state, action:PayloadAction <{todos: TodolistType[]}>) => {
           return action.payload.todos.map(m => ({...m, filter: 'all', entityStatus: 'idle'}))
        },
    }
});

export const todolistsReducer = slice.reducer
export const {removeTodolist, addTodolist, changeTodolistTitle, changeTodolistEntityStatus,changeTodolistFilter,setTodos} = slice.actions

export const getTodolistThunkTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    const res = await todolistsAPI.getTodolists();
    dispatch(setTodos({todos: res.data}));
    dispatch(setAppStatus({status: "succeeded"}));
};
export const removeTodolistTC = (id: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    dispatch(changeTodolistEntityStatus({todolistId:id, status:"loading"}))
    await todolistsAPI.deleteTodolist(id);
    dispatch(removeTodolist({todolistId:id}));
    dispatch(setAppStatus({status: "succeeded"}));
};
export const createTodolistTC = (title: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    const res = await todolistsAPI.createTodolist(title);
    dispatch(addTodolist({todolist: res.data.data.item}))
    dispatch(setAppStatus({status: "succeeded"}));

};
export const updateTitleTodolistTC = (id: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    dispatch(changeTodolistEntityStatus({todolistId:id, status:"loading"}))
    await todolistsAPI.updateTodolistTitle(id, title)
    dispatch(changeTodolistTitle({todolistId:id, title}))
    dispatch(setAppStatus({status: "succeeded"}));
    dispatch(changeTodolistEntityStatus({todolistId:id, status:"succeeded"}))
};

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType,
};