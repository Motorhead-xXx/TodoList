import {TasksStateType, TodolistType} from "../App";
import {addTaskAC, changeStatusAC, onChangeTitleAC, removeTaskAC, tasksReducer} from "./tasksReducer";
import {addTodoListAC, removeTodolistAC, todoListsReducer} from "./todoListReducer";

let startState: TasksStateType
beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    };
})

//Remove task
test('correct task should be delete from correct array', () => {

    const action = removeTaskAC("2", "todolistId1")
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    })
});

//Add task
test('correct task must be added to the correct array', () => {

    const action = addTaskAC("meat", "todolistId2")
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("meat");
    expect(endState["todolistId2"][0].isDone).toBe(false);
});

//Change status task
test('status of specified task should be changed', () => {

    const action = changeStatusAC("2", false, "todolistId2")
    const endState = tasksReducer(startState, action)


    expect(endState["todolistId2"][1].isDone).toBe(false);
    expect(endState["todolistId2"][1].title).toBe("milk");
});

//Change title task
test('title of specified task should be changed', () => {

    const action = onChangeTitleAC("Ruby", "todolistId1", "2")
    const endState = tasksReducer(startState, action)


    expect(endState["todolistId1"][1].title).toBe("Ruby");
    expect(endState["todolistId1"][1].id).toBe("2");
});

//Add Todolist key
test('new array should be added when new todolist is added', () => {

    const action = addTodoListAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

//checking a single identifier
test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<TodolistType> = [];

    const action = addTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.newId);
    expect(idFromTodoLists).toBe(action.newId);
});

//Delete todolist
test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC("todolistId2");
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});