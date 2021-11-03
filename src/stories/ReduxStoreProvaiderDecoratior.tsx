import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType} from "../store/store";
import {combineReducers, createStore} from "redux";

import {v1} from "uuid";
import {tasksReducer} from "../reducers/tasksReducer";
import {todoListsReducer} from "../reducers/todoListReducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

const initialGlobalState = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);



export const ReduxStoreProvaiderDecoratior=(storyFn:()=>React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}