import React from "react";
import {Provider} from "react-redux";
import {combineReducers} from "redux";
import {tasksReducer} from "../features/TodolistsList/tasksReducer";
import {todolistsReducer} from "../features/TodolistsList/todoListReducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";
import {AppRootStateType} from "../app/store";
import {appReducer} from "../app/app-reduser";
import {authReducer} from "../features/authReducer";
import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import {HashRouter} from "react-router-dom";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

const initialGlobalState: AppRootStateType = {
    todoLists: [
        {id: "todolistId1", title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: "todolistId2", title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'loading'}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ],
        ["todolistId2"]: [
            {
                id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ]
    },
    app: {
        errorMessage: null,
        status: "succeeded",
        initialized: true,
    },
    auth: {
        isLoggedIn: true
    }
};

export const storyBookStore = configureStore({
    reducer:rootReducer,
    preloadedState: initialGlobalState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});

export const ReduxStoreProvaiderDecoratior = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>
        {storyFn()}</Provider>
}

export const BrowserRouterDecorator = (storyFn: any) => (
    <HashRouter>{storyFn()}
    </HashRouter>)