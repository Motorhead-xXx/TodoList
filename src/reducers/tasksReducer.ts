import {AppActionType, AppThunkType, InferActionTypes} from "../store/store";
import {tasksAPI, TaskStatuses, TaskType} from "../api/todolist-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
};

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: AppActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)};
        }
        case 'ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            };
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
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


export const getTaskTC = (todolistId: string): AppThunkType => async dispatch => {
    let res = await tasksAPI.getTasks(todolistId);
    dispatch(actionTask.getTasks(todolistId, res.data.items));
};

export const removeTaskTC = (taskId: string, todolistId: string): AppThunkType => async dispatch => {
    let res = await tasksAPI.deleteTask(todolistId, taskId);
    dispatch(actionTask.removeTaskAC(taskId, todolistId));
};

export const createTaskTC = (todolistId: string, title: string): AppThunkType => async dispatch => {
    let res = await tasksAPI.createTask(todolistId, title);
    dispatch(actionTask.addTaskAC(res.data.data.item));
};

export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses): AppThunkType =>
    async (dispatch, getState) => {
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
        }
    };

export const titleUpdateTaskTC = (taskId: string, newTitle: string, todolistId: string): AppThunkType =>
    async (dispatch, getState) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId);
        if (task) {
            await tasksAPI.updateTask(todolistId, taskId, {
                title: newTitle,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
            });
            dispatch(actionTask.changeTaskTitleAC(taskId, newTitle, todolistId));
        }
    };
