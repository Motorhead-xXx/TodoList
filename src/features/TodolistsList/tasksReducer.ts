import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../../api/todolist-api";
import {addTodolist, changeTodolistEntityStatus, removeTodolist, setTodos} from "./todoListReducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {setAppStatus} from "../../app/app-reduser";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AppRootStateType} from "../../app/store";

const initialState: TasksStateType = {};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}));
    const res = await tasksAPI.getTasks(todolistId)
    thunkAPI.dispatch(setAppStatus({status: "succeeded"}));
    return {todolistId, tasks: res.data.items}
})

export const removeTask = createAsyncThunk('tasks/removeTask', async (param: { taskId: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}));
    thunkAPI.dispatch(changeTodolistEntityStatus({todolistId: param.todolistId, status: "loading"}))
    await tasksAPI.deleteTask(param.taskId, param.todolistId,)
    thunkAPI.dispatch(setAppStatus({status: "succeeded"}));
    thunkAPI.dispatch(changeTodolistEntityStatus({todolistId: param.todolistId, status: "succeeded"}))
    return {taskId: param.taskId, todolistId: param.todolistId}
})

export const createTask = createAsyncThunk('tasks/createTask', async (param: { todolistId: string, title: string }, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: "loading"}));
    dispatch(changeTodolistEntityStatus({todolistId: param.todolistId, status: "loading"}))
    try {
        const res = await tasksAPI.createTask(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: "succeeded"}));
            dispatch(changeTodolistEntityStatus({todolistId: param.todolistId, status: "succeeded"}))
            return res.data.data.item
        } else {
            handleServerAppError(res.data, dispatch)
            dispatch(changeTodolistEntityStatus({todolistId: param.todolistId, status: "failed"}))
            return rejectWithValue(null)
        }
    } catch (error: unknown) {
        let result = error as string;
        handleServerNetworkError({message: result}, dispatch)
        dispatch(changeTodolistEntityStatus({todolistId: param.todolistId, status: "failed"}))
        return rejectWithValue(null)
    }
})


export const updateTask = createAsyncThunk('tasks/updateTask',
    async (param: { taskId: string, todolistId: string, domainModel: UpdateDomainTaskModelType }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: "loading"}));
        thunkAPI.dispatch(changeTodolistEntityStatus({todolistId: param.todolistId, status: "loading"}))
        const state = thunkAPI.getState() as AppRootStateType
        const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
        if (!task) {
            return thunkAPI.rejectWithValue('task not found in the state')
        }
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...param.domainModel
        }
        const res = await tasksAPI.updateTask(param.todolistId, param.taskId, apiModel)
        try {
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatus({status: "loading"}));
                thunkAPI.dispatch(changeTodolistEntityStatus({todolistId: param.todolistId, status: "succeeded"}))
                thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
                return param
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue(null)
            }
        } catch (error: unknown) {
            let err = error as string
            handleServerNetworkError({message: err}, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    })

export const slice = createSlice({
    name: "task",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTodolist, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(removeTodolist, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(setTodos, (state, action) => {
                action.payload.todos.forEach((tl: any) => state[tl.id] = [])
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                if (index > -1) {
                    tasks.splice(index, 1);
                }
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state[action.payload.todoListId].unshift(action.payload)
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                if (index > -1) {
                    tasks[index] = {...tasks[index], ...action.payload.domainModel};
                }
            })
    }
});


export const tasksReducer = slice.reducer

export type TasksStateType = {
    [key: string]: Array<TaskType>
};

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}