import {Delete} from "@material-ui/icons";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {TaskStatuses, TaskType} from "../../../../api/todolist-api";
import {removeTask, updateTask} from "../../tasksReducer";
import {useDispatch} from "react-redux";
import {TodolistDomainType} from "../../todoListReducer";

type TaskPropsType = {
    task: TaskType
    todolist: TodolistDomainType
}


export const Task = React.memo(({task, todolist,...props}: TaskPropsType) => {
    const dispatch = useDispatch()


    const removeTaskCallback = useCallback(function () {
        dispatch(removeTask({taskId: task.id, todolistId: todolist.id}));
    }, [task.id, todolist.id]);

    const changeStatus = useCallback(function (e: ChangeEvent<HTMLInputElement>) {
        let newIsDoneValue = e.currentTarget.checked? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTask({taskId:task.id , todolistId:todolist.id, domainModel: {status: newIsDoneValue} } ));
    }, [task.id, todolist.id]);

    const changeTaskTitle = useCallback(function (newTitle: string) {
        dispatch(updateTask({taskId:task.id , todolistId:todolist.id, domainModel: {title: newTitle} } ));
    }, [task.id, todolist.id]);

    return <div key={task.id} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={task.status === TaskStatuses.Completed}
            color={"success"}
            onChange={changeStatus}
            disabled={todolist.entityStatus === "loading"}
        />

        <EditableSpan value={task.title} onChange={changeTaskTitle} disabled={todolist.entityStatus === "loading"}/>
        <IconButton onClick={removeTaskCallback} disabled={todolist.entityStatus === "loading"}>
            <Delete color={"error"}/>
        </IconButton>
    </div>
})
