import {tasksReducer} from "../features/TodolistsList/tasksReducer";
import {combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "./app-reduser";
import {authReducer} from "../features/authReducer";
import {configureStore} from "@reduxjs/toolkit";
import {todolistsReducer} from "../features/TodolistsList/todoListReducer";


let rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppRootStateType = ReturnType<typeof rootReducer>;


// @ts-ignore
window.store = store;