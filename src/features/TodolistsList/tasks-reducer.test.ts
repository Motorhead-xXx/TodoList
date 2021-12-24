import {fetchTasks, slice, TasksStateType} from "./tasksReducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";

const {reducer: tasksReducer} = slice
// const {addTodolistTC, fetchTodolistsTC, removeTodolistTC} = todolistsAsyncActions
// const {removeTask, addTask, updateTask, fetchTasks} = asyncActions

let startState: TasksStateType = {}
beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, todoListId: 'todolistId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed, todoListId: 'todolistId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, todoListId: 'todolistId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ]
    }
})

test("task should be added for todolist", () => {
    // const action = setTaskAC({todolistId: "todolistId1", tasks: startState["todolistId1"]})
    const action = fetchTasks.fulfilled({
        tasks: startState['todolistId2'],
        todolistId: 'todolistId2'
    }, 'requestId', 'todolistId2')

    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': []
    }, action)

    expect(endState['todolistId1'].length).toBe(0)
    expect(endState['todolistId2'].length).toBe(3)
})