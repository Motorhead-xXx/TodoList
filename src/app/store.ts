import {TasksActionType, tasksReducer} from "../features/TodolistsList/tasksReducer";
import {combineReducers} from "redux";
import {TodolistsActionsType, todolistsReducer} from "../features/TodolistsList/todoListReducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {AppActionsType, appReducer} from "./app-reduser";
import {authReducer} from "../features/authReducer";
import {configureStore} from "@reduxjs/toolkit";


let rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

// export const store = createStore(rootReducer,applyMiddleware(thunk));

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})


export type AppRootStateType = ReturnType<typeof rootReducer>;

export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type RootAppActionType = TodolistsActionsType | TasksActionType | AppActionsType
export type AppThunkType<ReturnType = void> = ThunkAction<void, AppRootStateType, unknown, RootAppActionType>

// @ts-ignore
window.store = store;