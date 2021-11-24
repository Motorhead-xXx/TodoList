import {TasksActionType, tasksReducer} from "../features/TodolistsList/tasksReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodolistsActionsType, todolistsReducer} from "../features/TodolistsList/todoListReducer";
import thunk, {ThunkAction} from "redux-thunk";
import {AppActionsType, appReducer} from "./app-reduser";
import {ActionsAuthType, authReducer} from "../features/authReducer";


let rootReducer = combineReducers({
        tasks: tasksReducer,
        todoLists: todolistsReducer,
        app: appReducer,
        auth: authReducer,
})

export const store = createStore(rootReducer,applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppStateType = typeof store;

export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type RootAppActionType = TodolistsActionsType|TasksActionType|AppActionsType|ActionsAuthType
export type AppThunkType<ReturnType=void> = ThunkAction<void, AppRootStateType, unknown, RootAppActionType>

// @ts-ignore
window.store = store;
