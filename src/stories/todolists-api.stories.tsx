import React, {ChangeEvent, ChangeEventHandler, useEffect, useState} from 'react'
import { todolistsAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    let [title, setTitle] = useState<string>("")

    const createTodo = () => {
        todolistsAPI.createTodolist(title)
            .then((res) => {
                setState(res.data);
            })
    }

    return (
        <div>
            <div> {JSON.stringify(state)}</div>
            <div>
                <input onChange={e => setTitle(e.currentTarget.value)} placeholder={"Title"} value={title}/>
                <button onClick={createTodo}>createTodo</button>
            </div>
        </div>
    )
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const deleteTodo = () => {
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistID"} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <button onClick={deleteTodo}>delete</button>
        </div>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [title, setTitle] = useState<string>("")

    const updateTitleTodo = () => {
        todolistsAPI.updateTodolistTitle(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistID"} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"title"} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
            <button onClick={updateTitleTodo}>titleUpdate</button>
        </div>
    </div>
}