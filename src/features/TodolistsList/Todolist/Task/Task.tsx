import {Delete} from "@material-ui/icons";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {TaskStatuses, TaskType} from "../../../../api/todolist-api";
import {fullUpdateTask, removeTaskTC} from "../../tasksReducer";
import {useDispatch} from "react-redux";
import {TodolistDomainType} from "../../todoListReducer";

type TaskPropsType = {
    task: TaskType
    todolist: TodolistDomainType
}
export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch()

    const removeTask = useCallback(function () {
        dispatch(removeTaskTC(props.task.id, props.todolist.id));
    }, [props.task.id, props.todolist.id]);

    const changeStatus = useCallback(function (e: ChangeEvent<HTMLInputElement>) {
        let newIsDoneValue = e.currentTarget.checked? TaskStatuses.Completed : TaskStatuses.New
        dispatch(fullUpdateTask(props.task.id, props.todolist.id, {status:newIsDoneValue} ));
    }, [props.task.id, props.todolist.id]);

    const changeTaskTitle = useCallback(function (newTitle: string) {
        dispatch(fullUpdateTask(props.task.id, props.todolist.id,{title:newTitle}));
    }, [props.task.id, props.todolist.id]);

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color={"success"}
            onChange={changeStatus}
            disabled={props.todolist.entityStatus === "loading"}
        />

        <EditableSpan value={props.task.title} onChange={changeTaskTitle} disabled={props.todolist.entityStatus === "loading"}/>
        <IconButton onClick={removeTask} disabled={props.todolist.entityStatus === "loading"}>
            <Delete color={"error"}/>
        </IconButton>
    </div>
})
