import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

let initialStateTodoList: TodolistType[]  = []

export const todoListsReducer = (state = initialStateTodoList,action:ActionTodoListType): TodolistType[] => {
    switch (action.type){
        case "CHANGE-TODO-FILTER":{
         return  state.map(f => f.id === action.todolistId ? {...f, filter: action.valueFilter} : f)
        }
        case "REMOVE-TODOLIST":{
            return (state.filter(tl => tl.id !== action.id))
        }
        case "ONCHANGE-TODOLIST-TITLE":{
            return state.map(m => m.id === action.id ? {...m, title:action.title} : m)
        }
        case "ADD-TODO-LIST":{
            return [{id: action.newId, title: action.title, filter: "all"},...state]
        }

        default: return state
    }
}

export type ActionTodoListType = changeTodoType|RemoveTodoType|OnChangeTodoListTitle|AddTodoListType

export type changeTodoType = ReturnType<typeof changeTodoFilterAC>
export const changeTodoFilterAC = (valueFilter: FilterValuesType, todolistId: string) => {
    return {
        type: "CHANGE-TODO-FILTER",
        valueFilter,
        todolistId
    }as const
}

export type RemoveTodoType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        id
    }as const
}

export type OnChangeTodoListTitle = ReturnType<typeof onChangeTodoListTitleAC>
export const onChangeTodoListTitleAC = (title: string, id: string) => {
    return{
        type: "ONCHANGE-TODOLIST-TITLE",
        title,
        id
    }as const
}

export type AddTodoListType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (title:string) =>{
    return{
        type:"ADD-TODO-LIST",
        title,
        newId:v1(),
    }as const
}

