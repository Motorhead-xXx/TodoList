import {createTask, removeTask, tasksReducer, TasksStateType, updateTask} from "../TodolistsList/tasksReducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";
import {addTodolist, removeTodolist} from "../TodolistsList/todoListReducer";


let startState: TasksStateType
beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ]
    };
})

//Remove task
test('correct task should be delete from correct array', () => {
    let param = {taskId: "2", todolistId: "todolistId2"}
    const action = removeTask.fulfilled(param, "requestId", param)
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy()
});

//Add task
test('correct task must be added to the correct array', () => {
    let task = {
        id: "7",
        title: "bread",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low
    }

    const action = createTask.fulfilled(task, 'requestId', {title: task.title, todolistId: task.todoListId})
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("bread");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});

//Change status task
test('status of specified task should be changed', () => {
    let update = {taskId: '2', domainModel: {status: TaskStatuses.New}, todolistId: 'todolistId2'}
    const action = updateTask.fulfilled(update, 'requestId', update)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
});

//Change title task
test('title of specified task should be changed', () => {
    let updateModel = {taskId: "2", domainModel: {title: "kaif"}, todolistId: "todolistId2"}
    const action = updateTask.fulfilled(updateModel, 'requestId', updateModel)
    const endState = tasksReducer(startState, action)


    expect(endState['todolistId1'][1].title).toBe('JS')
    expect(endState['todolistId2'][1].title).toBe('kaif')
    expect(endState['todolistId2'][0].title).toBe('bread')
});

//Add Todolist key
test('new array should be added when new todolist is added', () => {
    const action = addTodolist({
        todolist: {
            id: "new todolist",
            title: 'What to learn',
            addedDate: '',
            order: 0
        }
    });


    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

//Delete todolist
test('property with todolistId should be deleted', () => {

    const action = removeTodolist({todolistId: "todolistId2"});
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});