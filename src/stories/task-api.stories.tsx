import React, {useEffect, useState} from "react";
import {taskApi, todolistApi} from "../api/todolist-api";

export default {
    title: 'API-task'
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)

    const getTask = () => {
        taskApi.getTask(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <br/>
            <div>
                <input placeholder={"todolistID"} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
                <button onClick={getTask}>getTASK</button>
            </div>
        </div>)
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const createTask = () => {
        taskApi.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input onChange={e => setTodolistId(e.currentTarget.value)} placeholder={"todolistID"} value={todolistId}/>
            <input onChange={e => setTitle(e.currentTarget.value)} placeholder={"Title"} value={title}/>
            <button onClick={createTask}>createTodo</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const deleteTask = () => {
        taskApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistID"} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"taskId"} value={taskId} onChange={e => setTaskId(e.currentTarget.value)}/>
            <button onClick={deleteTask}>titleUpdate</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)
    const updateTask = () => {

        taskApi.updateTask(todolistId, taskId, title)
            .then((res) => {
                setState(res.data)
            })
    };

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistID"} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"taskId"} value={taskId} onChange={e => setTaskId(e.currentTarget.value)}/>
            <input placeholder={"title"} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
            <button onClick={updateTask}>titleUpdate</button>
        </div>
    </div>
}