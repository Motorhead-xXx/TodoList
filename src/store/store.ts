import {TasksActionType, tasksReducer} from "../reducers/tasksReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodolistsActionsType, todolistsReducer} from "../reducers/todoListReducer";
import thunk, {ThunkAction} from "redux-thunk";


let rootReducer = combineReducers({
        tasks: tasksReducer,
        todoLists: todolistsReducer,
})

export const store = createStore(rootReducer,applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppStateType = typeof store;

export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type AppActionType = TodolistsActionsType|TasksActionType
export type AppThunkType<ReturnType=void> = ThunkAction<void, AppRootStateType, unknown, AppActionType>
