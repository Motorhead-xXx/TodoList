import axios from "axios";

type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}

export type ResponseType<T> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}


const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
        withCredentials: true,
        headers: {
            "API-KEY": "8cfe719b-61ef-4519-9519-1e1d9dd44f52"
        }
    })

export const todolistApi = {
    getTodolist(){
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title:string){
        return instance.post<ResponseType<{ item:TodolistType }>>('todo-lists', {title})
    },
    deleteTodolist(todolistId:string){
      return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId:string,title:string){
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title})
    }
}

export const taskApi = {
    getTask(todolistId:string){
        return instance.get<TaskType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId:string,title:string){
        return instance.post<TaskType>(`todo-lists/${todolistId}/tasks`,{title})
    },
    deleteTask(todolistId:string, taskID:string){
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskID}/`)
    },
    updateTask(todolistId:string,taskID:string,title:string){
        return instance.put<ResponseType<{item:TaskType}>>(`todo-lists/${todolistId}/tasks/${taskID}`,{title})
    }
}