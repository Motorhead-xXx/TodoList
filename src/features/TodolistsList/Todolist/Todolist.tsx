import React, {useCallback, useEffect} from 'react'
import {Delete} from "@material-ui/icons";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Task} from "./Task/Task";
import {changeTodolistFilter, FilterValuesType, removeTodolistTC, TodolistDomainType, updateTitleTodolistTC} from "../todoListReducer";
import {Button, IconButton} from "@material-ui/core";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {useDispatch} from "react-redux";
import {AddItemForm} from "../../../components/AddItemFormPropsType/AddItemForm";
import {createTask, fetchTasks} from "../tasksReducer";

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {
    const dispatch = useDispatch()
    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasks(props.todolist.id))
    }, [])

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilter({todolistId, filter: value}));
    }, []);

    const changeTodolistTitle = useCallback(function (title: string) {
        dispatch(updateTitleTodolistTC(props.todolist.id, title));
    }, [props.todolist.id]);

    const removeTodolist = useCallback(function () {
        dispatch(removeTodolistTC(props.todolist.id));
    }, [props.todolist.id]);

    const addTask = useCallback(function (title: string) {
        dispatch(createTask({todolistId: props.todolist.id, title}));
    }, [props.todolist.id]);

    const onAllClickHandler = useCallback(() => changeFilter('all', props.todolist.id), [props.todolist.id, changeFilter])
    const onActiveClickHandler = useCallback(() => changeFilter('active', props.todolist.id), [props.todolist.id, changeFilter])
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', props.todolist.id), [props.todolist.id, changeFilter])

    let tasksForTodolist = props.tasks

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div>
        <h3><EditableSpan value={props.todolist.title} onChange={changeTodolistTitle} disabled={props.todolist.entityStatus === "loading"}/>
            <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === "loading"}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === "loading"}/>
        <div>
            {
                tasksForTodolist.map((t) => <Task key={t.id} task={t}
                                                todolist={props.todolist}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={props.todolist.filter === 'all' ? 'contained' : 'outlined'}
                    onClick={onAllClickHandler}
                    color={'primary'}>
                All
            </Button>
            <Button variant={props.todolist.filter === 'active' ? 'contained' : 'outlined'}
                    onClick={onActiveClickHandler}
                    color={'warning'}>Active
            </Button>
            <Button variant={props.todolist.filter === 'completed' ? 'contained' : 'outlined'}
                    onClick={onCompletedClickHandler}
                    color={'success'}>Completed
            </Button>
        </div>
    </div>
})


