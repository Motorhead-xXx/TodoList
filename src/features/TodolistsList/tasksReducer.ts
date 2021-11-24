import {AppThunkType, InferActionTypes, RootAppActionType} from "../../app/store";
import {tasksAPI, TaskStatuses, TaskType} from "../../api/todolist-api";
import {actionApp} from "../../app/app-reduser";
import {actionTodo} from "./todoListReducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

export type TasksStateType = {
    [key: string]: Array<TaskType>
};

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: RootAppActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)};
        }
        case 'ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, status: action.status} : t)};
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            };
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolist.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.todolistId];
            return copyState;
        }
        case "SET-TODOS": {
            const copyState = {...state}
            action.todos.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "GET-TASKS": {
            let stateCop = {...state}
            stateCop[action.todolistId] = action.tasks;
            return stateCop
        }
        default:
            return state;
    }
};

export type TasksActionType = InferActionTypes<typeof actionTask>;

export const actionTask = {
    removeTaskAC: (taskId: string, todolistId: string) =>
        ({type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const),

    addTaskAC: (task: TaskType) =>
        ({type: 'ADD-TASK', task} as const),

    changeTaskStatusAC: (taskId: string, status: TaskStatuses, todolistId: string) =>
        ({type: 'CHANGE-TASK-STATUS', status, todolistId, taskId} as const),

    changeTaskTitleAC: (taskId: string, title: string, todolistId: string) =>
        ({type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const),

    getTasks: (todolistId: string, tasks: TaskType[]) =>
        ({type: "GET-TASKS", tasks, todolistId} as const),

};

export const fetchTaskTC = (todolistId: string): AppThunkType => async dispatch => {
    dispatch(actionApp.setAppStatus("loading"));
    let res = await tasksAPI.getTasks(todolistId);
    dispatch(actionTask.getTasks(todolistId, res.data.items));
    dispatch(actionApp.setAppStatus("succeeded"));
};

export const removeTaskTC = (taskId: string, todolistId: string): AppThunkType => async dispatch => {
    dispatch(actionApp.setAppStatus("loading"));
    dispatch(actionTodo.changeTodolistEntityStatusAC(todolistId, "loading"))
    let res = await tasksAPI.deleteTask(todolistId, taskId);
    dispatch(actionTask.removeTaskAC(taskId, todolistId));
    dispatch(actionApp.setAppStatus("succeeded"));
    dispatch(actionTodo.changeTodolistEntityStatusAC(todolistId, "succeeded"))
};

export const createTaskTC = (todolistId: string, title: string): AppThunkType => dispatch => {
    dispatch(actionApp.setAppStatus("loading"));
    dispatch(actionTodo.changeTodolistEntityStatusAC(todolistId, "loading"))
    tasksAPI.createTask(todolistId, title).then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(actionTask.addTaskAC(res.data.data.item));
            dispatch(actionApp.setAppStatus("succeeded"));
            dispatch(actionTodo.changeTodolistEntityStatusAC(todolistId, "succeeded"))
        } else {
            handleServerAppError(res.data, dispatch)
            dispatch(actionTodo.changeTodolistEntityStatusAC(todolistId, "failed"))
        }
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
            dispatch(actionTodo.changeTodolistEntityStatusAC(todolistId, "failed"))
        })
}

export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses): AppThunkType =>
    async (dispatch, getState) => {
        dispatch(actionApp.setAppStatus("loading"));
        dispatch(actionTodo.changeTodolistEntityStatusAC(todolistId, "loading"))
        const task = getState().tasks[todolistId].find(t => t.id === taskId);
        if (task) {
            await tasksAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status,
            })
            dispatch(actionTask.changeTaskStatusAC(taskId, status, todolistId));
            dispatch(actionApp.setAppStatus("succeeded"));
            dispatch(actionTodo.changeTodolistEntityStatusAC(todolistId, "succeeded"))
        }
    };

export const titleUpdateTaskTC = (taskId: string, newTitle: string, todolistId: string): AppThunkType =>
    (dispatch, getState) => {
        dispatch(actionApp.setAppStatus("loading"));
        const task = getState().tasks[todolistId].find(t => t.id === taskId);
        if (task) {
            tasksAPI.updateTask(todolistId, taskId, {
                title: newTitle,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
            })
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(actionTask.changeTaskTitleAC(taskId, newTitle, todolistId));
                        dispatch(actionApp.setAppStatus("succeeded"));
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                })
                .catch((error) => {
                    handleServerNetworkError(error, dispatch)
                })
        }
    };
