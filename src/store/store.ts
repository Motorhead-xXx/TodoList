import {tasksReducer} from "../reducers/tasksReducer";
import {todoListsReducer} from "../reducers/todoListReducer";
import {combineReducers, createStore} from "redux";


let rootReducer = combineReducers({
        tasks: tasksReducer,
        todoLists: todoListsReducer,
})

export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppStateType = typeof store;