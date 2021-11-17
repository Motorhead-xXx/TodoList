import React, {useCallback} from 'react';
import {FilterValuesType} from '../App';
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {EditableSpan} from "./EditableSpan";
import {Task} from "./Task";
import {AddItemForm} from "./AddItemFormPropsType";



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeTodoFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    onChangeTaskTitle: (value: string, todolistId: string, id: string) => void
    onChangeTodoListTitle: (newValue: string, id: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log("Todolist")

    const {
        id, title, tasks, removeTask, changeTodoFilter, addTask,
        changeTaskStatus, removeTodolist, filter, onChangeTaskTitle, onChangeTodoListTitle
    } = props

    const removeTodolistHandler = useCallback(() => removeTodolist(id), [removeTodolist, id])
    const onAllClickHandler = useCallback(() => changeTodoFilter("all", id), [changeTodoFilter, id])
    const onActiveClickHandler = useCallback(() => changeTodoFilter("active", id), [changeTodoFilter, id])
    const onCompletedClickHandler = useCallback(() => changeTodoFilter("completed", id), [changeTodoFilter, id])

    const addTaskHandler = useCallback((title: string) => {
        addTask(title, id)
    }, [addTask, id])

    const onChangeTitleHandler = useCallback((newValue: string) => {
        onChangeTodoListTitle(newValue, id)
    }, [onChangeTodoListTitle, id])


    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    const removeTaskHandler = useCallback((taskId: string) => removeTask(taskId, id), [removeTask, id])
    const changeTaskTitleHandler = useCallback((taskId: string, newValue: string) => onChangeTaskTitle(taskId, newValue, id), [onChangeTaskTitle, id])
    const changeTaskStatusHandler = useCallback((newIsDoneValue: boolean, taskId: string) => changeTaskStatus(taskId, newIsDoneValue, id), [changeTaskStatus, id])


    return <div>
        <h3>
            <EditableSpan title={title} onChange={onChangeTitleHandler}/>
            <IconButton size={"small"} onClick={removeTodolistHandler}>
                <Delete color={"warning"}/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTaskHandler}/>
        <ul>
            {
                tasksForTodolist.map(t => {
                    return (
                        <li>
                            <Task
                                key={t.id}
                                task={t}
                                removeTaskCallback={removeTaskHandler}
                                onChangeTitleCallback={changeTaskTitleHandler}
                                changeTaskStatusCallback={changeTaskStatusHandler}/>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <Button color={"success"} size={"small"} variant={filter === 'all' ? "contained" : "outlined"} onClick={onAllClickHandler}>
                All
            </Button>
            <Button color={"warning"} size={"small"} variant={filter === 'active' ? "contained" : "outlined"} onClick={onActiveClickHandler}>
                Active
            </Button>
            <Button size={"small"} variant={filter === 'completed' ? "contained" : "outlined"} onClick={onCompletedClickHandler}>
                Completed
            </Button>
        </div>
    </div>
})


