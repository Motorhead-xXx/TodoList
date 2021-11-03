import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    task: TaskType
    onChangeTitleCallback: (title: string, todolistId: string) => void
    removeTaskCallback: (taskId: string) => void
    changeTaskStatusCallback: (isDone: boolean, todolistId: string) => void
}

export const Task = React.memo((props:TaskPropsType) =>{
const { onChangeTitleCallback,changeTaskStatusCallback,removeTaskCallback} = props
const {id,isDone,title } = props.task

    const onClickRemoveHandler = useCallback(() => removeTaskCallback(id),[removeTaskCallback,id])

    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatusCallback(newIsDoneValue, id);
    },[changeTaskStatusCallback,id])

    const onChangeTitleHandler = useCallback((newValue: string) => {
        onChangeTitleCallback(title, id)
    },[onChangeTitleCallback,id])

    return <div  className={isDone ? "is-done" : ""}>
        <input type="checkbox" onChange={onChangeStatusHandler} checked={isDone}/>
        <EditableSpan title={title} onChange={onChangeTitleHandler}/>
        <IconButton size={"small"} onClick={onClickRemoveHandler}>
            <Delete color={"error"}/>
        </IconButton>
    </div>
})