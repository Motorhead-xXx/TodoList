import {tasksReducer} from "../features/TodolistsList/tasksReducer";
import {combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "./app-reduser";
import {authReducer} from "../features/authReducer";
import {configureStore} from "@reduxjs/toolkit";
import {todolistsReducer} from "../features/TodolistsList/todoListReducer";
import {useDispatch} from "react-redux";


let rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppDispatchType = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatchType>()

// @ts-ignore
window.store = store;