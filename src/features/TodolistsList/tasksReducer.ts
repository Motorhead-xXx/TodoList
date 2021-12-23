import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../../api/todolist-api";
import {addTodolist, changeTodolistEntityStatus, removeTodolist, setTodos} from "./todoListReducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {setAppStatus} from "../../app/app-reduser";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TasksStateType = {
    [key: string]: Array<TaskType>
};

const initialState: TasksStateType = {};

export const slice = createSlice({
    name: "task",
    initialState: initialState,
    reducers: {
        removeTask: (state, action: PayloadAction<{ taskId: string, todolistId: string }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1);
            }
        },

        addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },

        updateTask: (state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model};
            }
        },

        getTasks: (state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) => {
            state[action.payload.todolistId] = action.payload.tasks
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolist, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(removeTodolist, (state, action) => {
            delete state[action.payload.todolistId]
        })
        builder.addCase(setTodos, (state, action) => {
            action.payload.todos.forEach((tl: any) => state[tl.id] = [])
        })
    }
})

export const tasksReducer = slice.reducer
export const {getTasks, addTask, removeTask, updateTask} = slice.actions

export const fetchTaskTC = (todolistId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    let res = await tasksAPI.getTasks(todolistId);
    dispatch(getTasks({todolistId, tasks: res.data.items}));
    dispatch(setAppStatus({status: "succeeded"}));
};

export const removeTaskTC = (taskId: string, todolistId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    dispatch(changeTodolistEntityStatus({todolistId, status: "loading"}))
    let res = await tasksAPI.deleteTask(todolistId, taskId);
    dispatch(removeTask({taskId, todolistId}));
    dispatch(setAppStatus({status: "succeeded"}));
    dispatch(changeTodolistEntityStatus({todolistId, status: "succeeded"}))
};

export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    dispatch(changeTodolistEntityStatus({todolistId, status: "loading"}))
    tasksAPI.createTask(todolistId, title).then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(addTask({task: res.data.data.item}));
            dispatch(setAppStatus({status: "succeeded"}));
            dispatch(changeTodolistEntityStatus({todolistId, status: "succeeded"}))
        } else {
            handleServerAppError(res.data, dispatch)
            dispatch(changeTodolistEntityStatus({todolistId, status: "failed"}))
        }
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
            dispatch(changeTodolistEntityStatus({todolistId, status: "failed"}))
        })
}

export const fullUpdateTask = (taskId: string, todolistId: string, domainModel: UpdateDomainTaskModelType) => (dispatch: Dispatch, getState: any) => {
    dispatch(setAppStatus({status: "loading"}));
    dispatch(changeTodolistEntityStatus({todolistId, status: "loading"}))

    const task = getState().tasks[todolistId].find((t: any) => t.id === taskId);
    if (!task) {
        console.warn('task not found in the state')
        return
    }
    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...domainModel
    }

    tasksAPI.updateTask(todolistId, taskId, apiModel)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatus({status: "loading"}));
                dispatch(updateTask({taskId, model: domainModel, todolistId}));
                dispatch(changeTodolistEntityStatus({todolistId, status: "succeeded"}))
                dispatch(setAppStatus({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
};

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}