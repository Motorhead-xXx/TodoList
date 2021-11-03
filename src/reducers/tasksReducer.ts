import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListType, RemoveTodoType} from "./todoListReducer";

const initialStateTask:TasksStateType = {}

export const tasksReducer = (state = initialStateTask, action: ActionTaskType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASKS": {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)}
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]}
        }
        case "ADD-TODO-LIST": {
            return {...state, [action.newId]: []}
        }
        case "ONCHANGE-TITLE":{
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.idTask?{...t, title: action.title} : t)}
        }
        case "CHANGE-STATUS":{
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id ? {...t,isDone: action.isDone} : t)}
        }
        case "REMOVE-TODOLIST":{
            let copyState = {...state}
            delete copyState[action.id];
            return copyState
        }
        default:
            return state
    }
}

export type ActionTaskType = RemoveTaskType | AddTaskType|OnChangeTitleType|ChangeStatusType|AddTodoListType|RemoveTodoType

export type RemoveTaskType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: "REMOVE-TASKS",
        id,
        todolistId,
    } as const
}

export type AddTaskType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: "ADD-TASK",
        title,
        todolistId
    } as const
}


export type OnChangeTitleType = ReturnType<typeof onChangeTitleAC>
export const onChangeTitleAC = (title: string, todolistId: string, idTask: string) => {
    return{
        type:"ONCHANGE-TITLE",
        title,
        todolistId,
        idTask
    }as const
}

export type ChangeStatusType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: "CHANGE-STATUS",
        id,
        isDone,
        todolistId
    }as const
}
