import {TaskPriorities, TaskStatuses} from "../api/todolist-api";
import {actionTask, tasksReducer, TasksStateType} from "./tasksReducer";
import {actionTodo} from "./todoListReducer";


let startState: TasksStateType
beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            {id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            {id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
        ],
        "todolistId2": [
            {id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            {id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            {id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
        ]
    };
})

//Remove task
test('correct task should be delete from correct array', () => {

    const action = actionTask.removeTaskAC("2", "todolistId1")
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            {id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
        ],
        "todolistId2": [
            {id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            {id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            {id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
        ]
    })
});

//Add task
test('correct task must be added to the correct array', () => {

    const action = actionTask.addTaskAC({id: "7", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low })
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("bread");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});

//Change status task
test('status of specified task should be changed', () => {

    const action = actionTask.changeTaskStatusAC("2", TaskStatuses.New, "todolistId2")
    const endState = tasksReducer(startState, action)


    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId2"][1].title).toBe("milk");
});

//Change title task
test('title of specified task should be changed', () => {

    const action = actionTask.changeTaskTitleAC(  "2","Ruby","todolistId1")
    const endState = tasksReducer(startState, action)


    expect(endState["todolistId1"][1].title).toBe("Ruby");
    expect(endState["todolistId1"][1].id).toBe("2");
});

//Add Todolist key
test('new array should be added when new todolist is added', () => {

    const action = actionTodo.addTodolistAC({id: "new todolist", title: 'What to learn', addedDate: '', order: 0});

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

    const action = actionTodo.removeTodolistAC("todolistId2");
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});